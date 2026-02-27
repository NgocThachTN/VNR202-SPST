'use client';

import React, { useState } from 'react';
import HostView from './components/HostView';
import PlayerView from './components/PlayerView';

export default function QuizPage() {
  const [viewMode, setViewMode] = useState<'landing' | 'host' | 'player'>('landing');

  if (viewMode === 'landing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8 font-sans bg-gray-100">
        <h1 className="mb-8 text-5xl font-black text-brand-purple">VietHistory Quiz</h1>
        
        <div className="flex gap-8">
          <button 
            onClick={() => setViewMode('player')}
            className="flex flex-col items-center justify-center w-64 h-48 transition-all bg-white border-b-8 border-gray-300 shadow-xl rounded-2xl hover:translate-y-1 hover:border-b-0 group"
          >
            <span className="mb-2 text-4xl transition-transform group-hover:scale-110">📱</span>
            <span className="text-2xl font-bold text-gray-700">Người chơi</span>
            <span className="mt-2 text-sm text-gray-400">(Mở trên điện thoại)</span>
          </button>

          <button 
            onClick={() => setViewMode('host')}
            className="flex flex-col items-center justify-center w-64 h-48 transition-all bg-white border-b-8 border-gray-300 shadow-xl rounded-2xl hover:translate-y-1 hover:border-b-0 group"
          >
            <span className="mb-2 text-4xl transition-transform group-hover:scale-110">🖥️</span>
            <span className="text-2xl font-bold text-brand-purple">Màn hình chính</span>
            <span className="mt-2 text-sm text-gray-400">(Dành cho giáo viên)</span>
          </button>
        </div>
        
        <div className="max-w-md mt-12 text-sm text-center text-gray-500">
          <p>Hướng dẫn:</p>
          <ul className="mt-2 ml-8 space-y-1 text-left list-disc">
            <li>Mở 1 tab chọn "Màn hình chính" (Host).</li>
            <li>Mở 1 tab khác chọn "Người chơi".</li>
            <li>Nhập tên và tham gia. Host bấm Start để bắt đầu.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
       <button 
         onClick={() => setViewMode('landing')}
         className="fixed z-50 px-2 py-1 text-xs text-white rounded top-2 right-2 bg-black/20 hover:bg-black/40"
       >
         Thoát
       </button>
       
       {viewMode === 'host' ? <HostView /> : <PlayerView />}
    </div>
  );
}