export default function Footer() {
  return (
    <footer className="bg-[#212529] text-[#e9ecef] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f5f5dc]">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#f5f5dc] transition-colors">Ana Sayfa</a></li>
              <li><a href="/courses" className="hover:text-[#f5f5dc] transition-colors">Tüm Kurslar</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f5f5dc]">İletişim</h3>
            <p className="text-sm">
              team4191@gmail.com
            </p>
          </div>
        </div>
        <div className="border-t border-[#495057] mt-8 pt-6 text-center text-sm">
          <p>&copy; 2026 FIRST Parts to Practice. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}




