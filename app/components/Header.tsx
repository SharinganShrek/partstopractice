import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-[#800020] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/FIRST_HorzRGB_reverse.png"
            alt="FIRST Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-2xl font-bold hover:text-[#f5f5dc] transition-colors">
            Parts to Practice
          </span>
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-[#f5f5dc] transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/courses" className="hover:text-[#f5f5dc] transition-colors">
            Kurslar
          </Link>
        </nav>
      </div>
    </header>
  );
}




