import Link from 'next/link';
import Image from 'next/image';
import TurkishContentBadge from './TurkishContentBadge';

export default function Header() {
  return (
    <header className="bg-[#800020] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/FIRST_HorzRGB_reverse.png"
            alt="FIRST"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-2xl font-bold hover:text-[#f5f5dc] transition-colors">
            Parts to Practice
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <TurkishContentBadge variant="onDark" className="max-sm:text-[10px] max-sm:px-2" />
          <nav className="flex gap-5 text-sm sm:text-base">
            <Link href="/" className="hover:text-[#f5f5dc] transition-colors">
              Home
            </Link>
            <Link href="/courses" className="hover:text-[#f5f5dc] transition-colors">
              Courses
            </Link>
            <Link href="/tests" className="hover:text-[#f5f5dc] transition-colors">
              Quizzes
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
