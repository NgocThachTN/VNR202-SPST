import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';
import { QuizQuestion, RoomState } from './quizTypes';

// Persist rooms across route reloads in dev/serverless contexts
const globalStore = globalThis as typeof globalThis & { __quizRooms?: Map<string, RoomState> };
if (!globalStore.__quizRooms) {
  globalStore.__quizRooms = new Map<string, RoomState>();
}
const rooms = globalStore.__quizRooms;

// Optional file persistence to survive dev server reloads
// Disable by default on Vercel/production to avoid fs latency/errors
const enableDiskPersistence =
  process.env.QUIZ_PERSIST_FILE === '1' ||
  (process.env.NODE_ENV !== 'production' && !process.env.VERCEL);
const persistPath = path.join(process.cwd(), '.next', 'cache', 'quiz-rooms.json');
let loaded = false;

// Optional remote persistence (Upstash Redis) for serverless environments
const enableRemotePersistence =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = enableRemotePersistence
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL as string,
      token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
    })
  : null;
const ROOM_TTL_SECONDS = Number(process.env.QUIZ_ROOM_TTL_SECONDS || 60 * 60);

function roomKey(code: string) {
  return `quiz:room:${code.toUpperCase()}`;
}

function serializeRoom(room: RoomState) {
  return {
    ...room,
    answeredThisRound: Array.from(room.answeredThisRound || []),
  };
}

function hydrateRoom(item: any): RoomState {
  return {
    ...item,
    players: item.players || {},
    leaderboard: item.leaderboard || {},
    answeredThisRound: new Set<string>(item.answeredThisRound || []),
  } as RoomState;
}

async function loadRoomsFromDisk() {
  if (!enableDiskPersistence) return;
  if (loaded) return;
  loaded = true;
  try {
    const raw = await fs.readFile(persistPath, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item?.roomCode) {
          const room: RoomState = {
            ...item,
            players: item.players || {},
            leaderboard: item.leaderboard || {},
            answeredThisRound: new Set<string>(item.answeredThisRound || []),
          };
          rooms.set(room.roomCode, room);
        }
      });
    }
  } catch {
    // ignore if not found
  }
}

async function saveRoomsToDisk() {
  if (!enableDiskPersistence) return;
  try {
    const arr = Array.from(rooms.values()).map((room) => ({
      ...room,
      answeredThisRound: Array.from(room.answeredThisRound || []),
    }));
    await fs.mkdir(path.dirname(persistPath), { recursive: true });
    await fs.writeFile(persistPath, JSON.stringify(arr), 'utf8');
  } catch (err) {
    console.warn('Persist rooms failed', err);
  }
}

async function saveRoomToRemote(room: RoomState) {
  if (!redis) return;
  await redis.set(roomKey(room.roomCode), serializeRoom(room), { ex: ROOM_TTL_SECONDS });
}

async function deleteRoomRemote(roomCode: string) {
  if (!redis) return;
  await redis.del(roomKey(roomCode));
}

const QUESTION_DURATION_MS = 15_000;

export async function createRoom(quiz: QuizQuestion[]): Promise<RoomState> {
  await loadRoomsFromDisk();
  if (!Array.isArray(quiz) || quiz.length === 0) {
    throw new Error('Quiz data is empty');
  }

  let roomCode = generateRoomCode();
  while (rooms.has(roomCode)) {
    roomCode = generateRoomCode();
  }

  const hostSecret = randomUUID();
  const room: RoomState = {
    roomCode,
    hostSecret,
    quiz,
    currentQuestionIndex: -1,
    status: 'lobby',
    leaderboard: {},
    players: {},
    answeredThisRound: new Set<string>(),
    questionDeadline: undefined,
    questionDurationMs: undefined,
  };

  rooms.set(roomCode, room);
  await saveRoomsToDisk();
  await saveRoomToRemote(room);
  return room;
}

export async function ensureRoom(options: {
  roomCode: string;
  hostSecret: string;
  quiz: QuizQuestion[];
}): Promise<RoomState> {
  const { roomCode, hostSecret, quiz } = options;
  if (!roomCode || !hostSecret) {
    throw new Error('Room code or host secret missing');
  }
  if (!Array.isArray(quiz) || quiz.length === 0) {
    throw new Error('Quiz data is empty');
  }

  const code = roomCode.toUpperCase();
  const existing = await getRoomAsync(code);
  if (existing) {
    if (existing.hostSecret !== hostSecret) {
      throw new Error('Unauthorized host');
    }
    return existing;
  }

  const room: RoomState = {
    roomCode: code,
    hostSecret,
    quiz,
    currentQuestionIndex: -1,
    status: 'lobby',
    leaderboard: {},
    players: {},
    answeredThisRound: new Set<string>(),
    questionDeadline: undefined,
    questionDurationMs: undefined,
  };

  rooms.set(code, room);
  await persistRoom(room);
  return room;
}

export function getRoom(roomCode: string): RoomState | undefined {
  if (!roomCode) return undefined;
  // Lazy load from disk if needed
  if (enableDiskPersistence && !loaded) {
    // fire and forget
    loadRoomsFromDisk();
  }
  return rooms.get(roomCode.toUpperCase());
}

export async function getRoomAsync(roomCode: string): Promise<RoomState | undefined> {
  if (!roomCode) return undefined;
  const code = roomCode.toUpperCase();
  const cached = rooms.get(code);
  if (cached) return cached;

  if (enableRemotePersistence) {
    const data = await redis?.get(roomKey(code));
    if (data) {
      const room = hydrateRoom(typeof data === 'string' ? JSON.parse(data) : data);
      rooms.set(code, room);
      return room;
    }
  }

  if (enableDiskPersistence && !loaded) {
    await loadRoomsFromDisk();
  }
  return rooms.get(code);
}

export async function assertRoom(roomCode: string): Promise<RoomState> {
  const room = await getRoomAsync(roomCode);
  if (!room) {
    throw new Error('Room not found');
  }
  return room;
}

export async function resetRoom(roomCode: string): Promise<void> {
  if (!roomCode) return;
  rooms.delete(roomCode.toUpperCase());
  if (enableDiskPersistence) {
    // fire and forget
    saveRoomsToDisk();
  }
  await deleteRoomRemote(roomCode.toUpperCase());
}

export async function persistRoom(room: RoomState): Promise<void> {
  if (!room) return;
  await saveRoomsToDisk();
  await saveRoomToRemote(room);
}

export async function advanceQuestion(roomCode: string): Promise<{ room: RoomState; question?: QuizQuestion }> {
  await loadRoomsFromDisk();
  const room = await assertRoom(roomCode);
  if (room.status === 'finished') {
    return { room };
  }

  room.currentQuestionIndex += 1;
  room.answeredThisRound = new Set<string>();

  if (room.currentQuestionIndex >= room.quiz.length) {
    room.status = 'finished';
    return { room };
  }

  room.status = 'in-progress';
  room.questionDurationMs = QUESTION_DURATION_MS;
  room.questionDeadline = Date.now() + QUESTION_DURATION_MS;
  const question = room.quiz[room.currentQuestionIndex];

  await persistRoom(room);
  return { room, question };
}

export async function recordAnswer(options: {
  roomCode: string;
  playerId: string;
  playerName: string;
  answerIndex: number;
}): Promise<{ room: RoomState; isCorrect: boolean; alreadyAnswered?: boolean; tooLate?: boolean }> {
  await loadRoomsFromDisk();
  const { roomCode, playerId, playerName, answerIndex } = options;
  const room = await assertRoom(roomCode);

  if (room.status !== 'in-progress') {
    throw new Error('Room is not accepting answers');
  }

  if (room.questionDeadline && Date.now() > room.questionDeadline) {
    return { room, isCorrect: false, tooLate: true };
  }

  if (room.answeredThisRound.has(playerId)) {
    return { room, isCorrect: false, alreadyAnswered: true };
  }

  room.answeredThisRound.add(playerId);

  const question = room.quiz[room.currentQuestionIndex];
  const isCorrect = question.correctIndex === answerIndex;
  const entry = room.leaderboard[playerId] || { name: playerName, score: 0 };
  const gain = isCorrect ? scoreWithSpeed(room.questionDeadline, room.questionDurationMs) : 0;

  room.leaderboard[playerId] = {
    name: playerName,
    score: entry.score + gain,
    lastAnswerCorrect: isCorrect,
    lastAnswerAt: Date.now(),
  };

  await persistRoom(room);
  return { room, isCorrect };
}

function generateRoomCode() {
  return Math.random().toString(36).slice(2, 7).toUpperCase();
}

function scoreWithSpeed(deadline?: number, durationMs = QUESTION_DURATION_MS) {
  if (!deadline) return 500;
  const remaining = Math.max(0, deadline - Date.now());
  const ratio = Math.min(1, remaining / durationMs);
  const base = 500;
  const bonus = Math.round(500 * ratio);
  return base + bonus;
}
