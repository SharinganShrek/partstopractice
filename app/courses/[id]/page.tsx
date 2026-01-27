'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CourseModal from '../../components/CourseModal';

// Kurs verileri
// YouTube video ID'lerini buraya ekleyin (URL'den alınan ID, örn: https://www.youtube.com/watch?v=VIDEO_ID)
const courseData: { [key: string]: any } = {
  '1': {
    id: 1,
    title: 'FIRST Yarışmaları - Giriş',
    description: '',
    level: 'Başlangıç',
    duration: '11dk 36sn',
    thumbnail: '/course_content/thumbnails/FIRST Logo.png',
    youtubeId: 'iYYUc6zXnOM', // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  '2': {
    id: 2,
    title: 'FIRST Lego League(FLL)',
    description: '',
    level: 'Başlangıç',
    duration: '26dk 40sn',
    thumbnail: '/course_content/thumbnails/FLL Logo.png',
    youtubeId: null, // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  '3': {
    id: 3,
    title: 'FIRST Tech Challenge(FTC)',
    description: '',
    level: 'Başlangıç',
    duration: '25dk 31sn',
    thumbnail: '/course_content/thumbnails/FTC Logo.png',
    youtubeId: null, // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  '4': {
    id: 4,
    title: 'FIRST Vakfı ve Değerleri',
    description: '',
    level: 'Başlangıç',
    duration: '12dk 8sn',
    thumbnail: '/course_content/thumbnails/FIRST Logo.png',
    youtubeId: null, // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
  '5': {
    id: 5,
    title: 'FRC Gönüllülüğü ve Ödüller',
    description: '',
    level: 'Başlangıç',
    duration: '',
    thumbnail: '/course_content/thumbnails/FRC Logo.png',
    youtubeId: null, // Video henüz eklenmedi
  },
  '6': {
    id: 6,
    title: 'FRC Takım İçi Görev Dağılımları',
    description: '',
    level: 'Başlangıç',
    duration: '3dk 57sn',
    thumbnail: '/course_content/thumbnails/FRC Logo.png',
    youtubeId: null, // YouTube'a yükledikten sonra video ID'sini buraya ekleyin
  },
};

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const course = courseData[courseId];

  const handleClose = () => {
    router.push('/');
  };

  // Eğer kurs bulunamazsa ana sayfaya yönlendir
  useEffect(() => {
    if (!course) {
      router.push('/');
    }
  }, [course, router]);

  if (!course) {
    return null;
  }

  return <CourseModal course={course} onClose={handleClose} />;
}


