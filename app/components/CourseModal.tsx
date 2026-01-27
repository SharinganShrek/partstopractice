'use client';

import { useEffect } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  thumbnail: string;
  youtubeId: string | null;
}

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  useEffect(() => {
    // ESC tuşu ile kapatma
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Modal açıkken scroll'u engelle

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Arka plan - karartılmış önceki sayfa (AP Classroom benzeri) */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Video Player Container - Ortada */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-lg font-semibold text-[#212529]">{course.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded"
              aria-label="Kapat"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Video Player - Ortada */}
          <div className="flex-1 flex items-center justify-center bg-black p-4 min-h-0">
            {course.youtubeId ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  className="w-full h-full max-w-full max-h-full"
                  src={`https://www.youtube.com/embed/${course.youtubeId}?autoplay=1&rel=0`}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ aspectRatio: '16/9' }}
                />
              </div>
            ) : (
              <div className="text-white text-center">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-xl mb-2">Video henüz eklenmedi</p>
                <p className="text-gray-400">Bu video yakında eklenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

