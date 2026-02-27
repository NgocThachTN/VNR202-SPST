'use client';

import { useEffect, useRef, useState } from 'react';
import { clientDb } from '@/lib/firebaseClient';
import { doc, onSnapshot } from 'firebase/firestore';
// Dùng màu tailwind mặc định để tránh purge/safelist bị mất màu
const PLAYER_COLORS = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];

interface QuestionEvent {
  question: {
    index: number;
    total: number;
    prompt: string;
    options: string[];
    deadline?: number;
    durationMs?: number;
    correctIndex?: number;
  };
}

interface LeaderboardEvent {
  leaderboard: Array<{ id: string; name: string; score: number }>;
  answeredCount: number;
  playerCount: number;
}

export default function PlayerView() {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [question, setQuestion] = useState<QuestionEvent['question'] | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEvent['leaderboard']>([]);
  const [status, setStatus] = useState<'lobby' | 'in-progress' | 'finished'>('lobby');
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const lastQuestionIndexRef = useRef<number>(-1);
  const showResultTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rejoinAttemptedRef = useRef(false);
  const missingRoomSinceRef = useRef<number | null>(null);

  // Khi hết giờ hoặc host kết thúc, hiển thị kết quả (tô xanh đáp án đúng, đỏ đáp án sai) trong 3s
  useEffect(() => {
    if (!question) return;

    const shouldShowResult = timeLeft === 0 || showingResult;
    if (!shouldShowResult) return;

    // Kích hoạt chế độ hiển thị kết quả
    setShowingResult(true);
    if (question.correctIndex !== undefined) {
      setCorrectIndex(question.correctIndex);
    }

    // Đảm bảo chỉ tạo một timer hiển thị 3s
    if (!showResultTimerRef.current) {
      showResultTimerRef.current = setTimeout(() => {
        showResultTimerRef.current = null;
      }, 3000);
    }

    return () => {
      if (showResultTimerRef.current) {
        clearTimeout(showResultTimerRef.current);
        showResultTimerRef.current = null;
      }
    };
  }, [question, timeLeft, showingResult]);

  // Polling fallback nếu realtime bị gián đoạn
  useEffect(() => {
    if (!joined || !roomCodeInput) return;

    const code = roomCodeInput.toUpperCase();

    const poll = async () => {
      try {
        const res = await fetch(`/api/rooms/${code}/state`);
        const data = await res.json();
        if (res.ok) {
          setStatus(data.status ?? 'lobby');
          // Cập nhật leaderboard
          if (Array.isArray(data.leaderboard)) {
            setLeaderboard(data.leaderboard);
          }
          // Cập nhật trạng thái hiện kết quả
          setShowingResult(data.showingResult ?? false);
          // Nếu có câu hỏi mới
          if (data.currentQuestion && data.currentQuestion.index !== lastQuestionIndexRef.current) {
            lastQuestionIndexRef.current = data.currentQuestion.index;
            setQuestion(data.currentQuestion);
            setHasAnswered(false);
            setSelectedAnswer(null);
            setCorrectIndex(null);
            setShowingResult(false);
            // Cập nhật timer
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            if (data.currentQuestion.deadline && data.currentQuestion.durationMs) {
              const tick = () => {
                const msLeft = Math.max(0, data.currentQuestion.deadline - Date.now());
                setTimeLeft(Math.ceil(msLeft / 1000));
              };
              tick();
              timerRef.current = setInterval(tick, 500);
            } else {
              setTimeLeft(null);
            }
          }
          // Cập nhật đáp án đúng khi hết giờ
          if (data.currentQuestion?.correctIndex !== undefined) {
            setCorrectIndex(data.currentQuestion.correctIndex);
          }
          // Nếu game kết thúc
          if (data.status === 'finished') {
            setQuestion(null);
            setTimeLeft(null);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
          }
        } else if (res.status === 404) {
          if (!rejoinAttemptedRef.current && playerId && playerName) {
            rejoinAttemptedRef.current = true;
            const joinRes = await fetch(`/api/rooms/${code}/join`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ playerId, playerName, code }),
            });
            if (joinRes.ok) {
              setError(null);
              missingRoomSinceRef.current = null;
              return;
            }
          }
          if (!missingRoomSinceRef.current) {
            missingRoomSinceRef.current = Date.now();
          }
          const elapsed = Date.now() - (missingRoomSinceRef.current || Date.now());
          if (elapsed > 5000) {
            setError('Đang chờ host khôi phục phòng... Nếu quá lâu, hãy kiểm tra mã phòng.');
          }
        }
      } catch (err) {
        console.warn('Poll room state failed', err);
      }
    };

    poll();
    pollRef.current = setInterval(poll, 1500); // Poll mỗi 1.5s

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [joined, roomCodeInput]);

  useEffect(() => {
    if (!joined || !roomCodeInput) return;

    const code = roomCodeInput.toUpperCase();
    const roomRef = doc(clientDb, 'rooms', code);
    const unsubscribe = onSnapshot(
      roomRef,
      (snap) => {
        if (!snap.exists()) {
          setError('Phòng không tồn tại hoặc đã hết hạn. Vui lòng kiểm tra mã phòng.');
          return;
        }

      const room = snap.data() as any;
      setStatus(room.status ?? 'lobby');
      setLeaderboard(
        Object.entries(room.leaderboard || {})
          .map(([id, entry]: any) => ({ id, ...entry }))
          .sort((a: any, b: any) => b.score - a.score || (a.lastAnswerAt || 0) - (b.lastAnswerAt || 0))
      );
      setShowingResult(false);
      setError(null);

      if (room.status === 'finished') {
        setQuestion(null);
        setTimeLeft(null);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      if (room.status === 'in-progress' && room.currentQuestionIndex >= 0 && room.currentQuestionIndex < room.quiz.length) {
        const q = room.quiz[room.currentQuestionIndex];
        if (room.currentQuestionIndex !== lastQuestionIndexRef.current) {
          lastQuestionIndexRef.current = room.currentQuestionIndex;
          setQuestion({
            index: room.currentQuestionIndex,
            total: room.quiz.length,
            prompt: q.question,
            options: q.options,
            deadline: room.questionDeadline ?? undefined,
            durationMs: room.questionDurationMs ?? undefined,
            correctIndex: undefined,
          });
          setHasAnswered(false);
          setSelectedAnswer(null);
          setCorrectIndex(null);
          setShowingResult(false);
        }

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (room.questionDeadline && room.questionDurationMs) {
          const tick = () => {
            const msLeft = Math.max(0, room.questionDeadline - Date.now());
            setTimeLeft(Math.ceil(msLeft / 1000));
          };
          tick();
          timerRef.current = setInterval(tick, 500);
        } else {
          setTimeLeft(null);
        }

        if (room.questionDeadline && Date.now() > room.questionDeadline) {
          setCorrectIndex(q.correctIndex);
          setShowingResult(true);
        }
      }
    },
      (err) => {
        console.warn('Player snapshot error', err);
        setError('Mất kết nối realtime, đang thử lại...');
      }
    );

    return () => {
      unsubscribe();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [joined, roomCodeInput]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    rejoinAttemptedRef.current = false;
    if (!roomCodeInput.trim() || !playerName.trim()) {
      setError('Nhập mã phòng và tên');
      return;
    }

    const code = roomCodeInput.toUpperCase();
    const id = Math.random().toString(36).slice(2, 9);
    try {
      const res = await fetch(`/api/rooms/${code}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: id, playerName, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Không thể tham gia');
      setPlayerId(id);
      setJoined(true);
      setStatus(data.status || 'lobby');
    } catch (err: any) {
      setError(err?.message || 'Không thể tham gia');
    }
  };

  const handleAnswer = async (index: number) => {
    if (!playerId || !roomCodeInput || hasAnswered || status !== 'in-progress' || showingResult) return;
    setHasAnswered(true);
    setSelectedAnswer(index);
    setError(null);
    const code = roomCodeInput.toUpperCase();
    const res = await fetch(`/api/rooms/${code}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId, playerName, answerIndex: index, code }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || 'Không gửi được đáp án');
    }
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-brand-purple">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-2xl">
          <form onSubmit={handleJoin} className="space-y-4">
            <input
              type="text"
              placeholder="Mã phòng"
              className="w-full p-3 text-xl font-bold text-center text-black border-2 border-gray-300 rounded"
              value={roomCodeInput}
              onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
              maxLength={6}
            />
            <input
              type="text"
              placeholder="Tên của bạn"
              className="w-full p-3 text-xl font-bold text-center text-black border-2 border-gray-300 rounded"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={12}
            />
            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-gray-900 rounded hover:bg-gray-800"
            >
              Tham gia
            </button>
            {error && <div className="text-sm font-semibold text-center text-red-600">{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  if (status === 'lobby') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-brand-green">
        <div className="mb-4 text-2xl font-bold">Bạn đã tham gia!</div>
        <div className="text-xl">Chờ giáo viên bắt đầu.</div>
        <div className="mt-8 text-4xl font-black animate-bounce">{playerName}</div>
        {error && <div className="mt-4 text-red-200">{error}</div>}
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="flex flex-col min-h-screen p-6 text-white bg-gray-900">
        <div className="text-3xl font-black">Kết thúc!</div>
        <div className="mt-4 text-lg">Cảm ơn đã tham gia {playerName}.</div>
        <div className="mt-6 space-y-2">
          {leaderboard.map((entry, idx) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 text-center text-white rounded-full bg-brand-purple">{idx + 1}</span>
                <span className="font-bold">{entry.name}</span>
              </div>
              <span className="font-black">{entry.score}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (question) {
    const renderOptions = (disabled: boolean) => (
      <div className="grid min-h-screen grid-cols-2 grid-rows-2 gap-4 p-4 bg-white">
        {question.options.map((opt, idx) => {
          const isSelected = idx === selectedAnswer;
          const isCorrectOpt = correctIndex !== null && idx === correctIndex;
          return (
            <button
              key={idx}
              onClick={() => !disabled && handleAnswer(idx)}
              disabled={disabled}
              className={`relative rounded-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center ${
                showingResult
                  ? isCorrectOpt
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : PLAYER_COLORS[idx % PLAYER_COLORS.length]
              } ${disabled ? 'opacity-90 cursor-default' : ''}`}
            >
              <div className="flex flex-col items-center justify-center text-white">
                <span className="text-3xl font-black">{idx === 0 ? '▲' : idx === 1 ? '♦' : idx === 2 ? '●' : '■'}</span>
                <span className="px-2 mt-2 text-lg font-bold text-center break-words">{opt}</span>
              </div>
              {timeLeft !== null && !showingResult && <span className="absolute text-sm font-bold top-2 right-2 text-white/80">{timeLeft}s</span>}
              {isCorrectOpt && showingResult && <span className="absolute text-2xl top-2 right-2">✓</span>}
              {isSelected && showingResult && !isCorrectOpt && <span className="absolute text-2xl top-2 right-2">✗</span>}
            </button>
          );
        })}
      </div>
    );

    // Hiển thị kết quả với đáp án đúng
    if (showingResult && correctIndex !== null) {
      const isCorrect = selectedAnswer === correctIndex;
      return (
        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="p-6 m-4 text-center bg-white shadow rounded-2xl">
            <div className={`text-3xl font-black ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '🎉 Chính xác!' : '❌ Sai rồi!'}
            </div>
            <div className="mt-2 text-gray-600">Đáp án đúng là:</div>
            <div className="mt-2 text-xl font-bold text-brand-purple">{question.options[correctIndex]}</div>
          </div>
          {renderOptions(true)}
          <div className="pb-6 text-center text-gray-500">Chờ câu hỏi tiếp theo...</div>
        </div>
      );
    }

    // Đã chọn câu trả lời, vẫn hiện ô đã chọn với màu
    if (hasAnswered) {
      return (
        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="p-4 m-4 font-bold text-center text-gray-700 bg-white shadow rounded-xl">Đã gửi câu trả lời</div>
          {renderOptions(true)}
          {error && <div className="mt-4 text-center text-red-500">{error}</div>}
        </div>
      );
    }

    // Đang trả lời
    return renderOptions(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-brand-purple">
      <div className="text-center">
        <div className="text-3xl font-black">Chờ câu hỏi tiếp theo...</div>
        {error && <div className="mt-4 text-red-200">{error}</div>}
      </div>
    </div>
  );
}