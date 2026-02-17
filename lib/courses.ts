export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  thumbnail: string;
  youtubeId: string | null;
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'FIRST Yarışmaları - Giriş',
    description: '',
    level: 'Başlangıç',
    duration: '11dk 36sn',
    thumbnail: '/course_content/thumbnails/FIRST Logo.png',
    youtubeId: 'iYYUc6zXnOM',
  },
  {
    id: 2,
    title: 'FIRST Lego League(FLL)',
    description: '',
    level: 'Başlangıç',
    duration: '26dk 40sn',
    thumbnail: '/course_content/thumbnails/FLL Logo.png',
    youtubeId: 'hNPqvuX7SS0',
  },
  {
    id: 3,
    title: 'FIRST Tech Challenge(FTC)',
    description: '',
    level: 'Başlangıç',
    duration: '25dk 31sn',
    thumbnail: '/course_content/thumbnails/FTC Logo.png',
    youtubeId: 'FkdzYANYdzQ',
  },
  {
    id: 4,
    title: 'FIRST Vakfı ve Değerleri',
    description: '',
    level: 'Başlangıç',
    duration: '12dk 8sn',
    thumbnail: '/course_content/thumbnails/FIRST Logo.png',
    youtubeId: 'A3TEmHAzog8',
  },
  {
    id: 5,
    title: 'FRC Gönüllülüğü ve Ödüller',
    description: '',
    level: 'Başlangıç',
    duration: '',
    thumbnail: '/course_content/thumbnails/FRC Logo.png',
    youtubeId: 'Er7A3VhBTRk',
  },
  {
    id: 6,
    title: 'FRC Takım İçi Görev Dağılımları',
    description: '',
    level: 'Başlangıç',
    duration: '3dk 57sn',
    thumbnail: '/course_content/thumbnails/FRC Logo.png',
    youtubeId: 'WvVXO31bdII',
  },
];

export function getCourseById(id: number | string): Course | undefined {
  const courseId = typeof id === 'string' ? parseInt(id, 10) : id;
  return courses.find((c) => c.id === courseId);
}
