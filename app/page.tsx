'use client';

import { useState } from 'react';
import Image from 'next/image';
import CourseModal from './components/CourseModal';

// Örnek kurs verileri
// YouTube video ID'lerini buraya ekleyin (URL'den alınan ID, örn: https://www.youtube.com/watch?v=VIDEO_ID)
const courses = [
  {
    id: 1,
    title: 'FIRST Yarışmaları - Giriş',
    description: '',
    level: 'Başlangıç',
    duration: '11dk 36sn',
    thumbnail: '/course_content/thumbnails/FIRST Logo.png',
    youtubeId: 'iYYUc6zXnOM', // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  {
    id: 2,
    title: 'FIRST Lego League(FLL)',
    description: '',
    level: 'Başlangıç',
    duration: '26dk 40sn',
    thumbnail: '/course_content/thumbnails/FLL Logo.png',
    youtubeId: 'hNPqvuX7SS0', // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  {
    id: 3,
    title: 'FIRST Tech Challenge(FTC)',
    description: '',
    level: 'Başlangıç',
    duration: '25dk 31sn',
    thumbnail: '/course_content/thumbnails/FTC Logo.png',
    youtubeId: 'FkdzYANYdzQ', // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  {
    id: 4,
    title: 'FIRST Vakfı ve Değerleri',
    description: '',
    level: 'Başlangıç',
    duration: '12dk 8sn',
    thumbnail: '/course_content/thumbnails/FIRST Logo.png',
    youtubeId: 'A3TEmHAzog8', // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  {
    id: 5,
    title: 'FRC Gönüllülüğü ve Ödüller',
    description: '',
    level: 'Başlangıç',
    duration: '',
    thumbnail: '/course_content/thumbnails/FRC Logo.png',
    youtubeId: 'Er7A3VhBTRk', // Video henüz eklenmedi
  },
  {
    id: 6,
    title: 'FRC Takım İçi Görev Dağılımları',
    description: '',
    level: 'Başlangıç',
    duration: '3dk 57sn',
    thumbnail: '/course_content/thumbnails/FRC Logo.png',
    youtubeId: 'WvVXO31bdII', // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
];

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  const handleCourseClick = (course: typeof courses[0]) => {
    if (course.youtubeId) {
      setSelectedCourse(course);
    }
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#800020] to-[#a01e2b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FIRST Parts to Practice
          </h1>
          <p className="text-xl md:text-2xl text-[#f5f5dc] max-w-3xl">
            IMC#4191 x Khan Academy İşbirliğinde Türkçe FRC ve FIRST başlangıç dersleri.
          </p>
        </div>
      </div>

      {/* Kurs Listesi */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#212529]">Kurslar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-[#e9ecef] overflow-hidden group cursor-pointer ${
                !course.youtubeId ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <div className="h-48 relative bg-gray-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#212529] group-hover:text-[#800020] transition-colors">
                  {course.title}
                </h3>
                <p className="text-[#495057] mb-4 text-sm">
                  {course.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-[#f5f5dc] text-[#800020] px-3 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                  {course.duration && (
                    <span className="text-[#495057]">
                      ⏱️ {course.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={handleCloseModal} />
      )}
    </div>
  );
}
