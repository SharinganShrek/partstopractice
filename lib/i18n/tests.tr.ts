import type { CourseTest } from '../tests';

function parseOptions(
  a: string,
  b: string,
  c: string,
  d: string
): { key: string; text: string }[] {
  return [
    { key: 'A', text: a },
    { key: 'B', text: b },
    { key: 'C', text: c },
    { key: 'D', text: d },
  ];
}

const testsTr: CourseTest[] = [
  {
    courseId: 2, // FLL
    questions: [
      {
        question: "FLL'de yarışan robotlara nasıl görevler verilir?",
        options: parseOptions(
          'Rastgele seçilir',
          'Sezon temasıyla belirlenen görevler olur',
          'Takımlar görev uydurur',
          'Hakemler maç sırasında belirler'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FLL takımı nasıl kazanır?',
        options: parseOptions(
          'En büyük robotla',
          'En hızlı takım olarak',
          'Robot performansı, proje ve takım çalışmasıyla',
          'Sadece robot puanıyla'
        ),
        correctAnswer: 'C',
      },
      {
        question: 'FLL akademik anlamda nasıl bir katkı sağlayabilir?',
        options: parseOptions(
          'Sadece eğlence sağlar',
          'Spor becerisi kazandırır',
          'STEM becerilerini geliştirir',
          'Sınav başarısını düşürür'
        ),
        correctAnswer: 'C',
      },
      {
        question: "FLL'de robot tasarımı nasıl yapılır?",
        options: parseOptions(
          'Hazır alınır',
          'LEGO parçalarıyla tasarlanır',
          'Metal kesilerek yapılır',
          'Yarışmada kurulur'
        ),
        correctAnswer: 'B',
      },
      {
        question: "FLL'in oluşturduğu 4 ana bileşen nedir?",
        options: parseOptions(
          'Kod, hız, yarış, puan',
          'Robot oyunu, proje, değerler, tasarım',
          'Sadece robot yarışı',
          'Sunum ve ödül'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FLL yarışmasının amacı nedir?',
        options: parseOptions(
          'Robot dövüştürmek',
          'Problem çözme ve mühendislik öğretmek',
          'Hız yarışı yapmak',
          'Sadece ödül almak'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FLL robot maçları kaç dakika sürer?',
        options: parseOptions('1 dakika', '2 dakika 30 saniye', '5 dakika', '10 dakika'),
        correctAnswer: 'B',
      },
      {
        question: "FLL'de her sezonun ana teması neyi kapsar?",
        options: parseOptions(
          'Rastgele konular',
          'Güncel bir toplumsal problem',
          'Sadece robot hızını',
          'Oyun eğlencesini'
        ),
        correctAnswer: 'B',
      },
      {
        question: "FLL'de hangisi neden daha önemlidir: Süreç mi Sonuç mu?",
        options: parseOptions(
          'Sadece sonuç',
          'Sadece ödül',
          'Süreç ve öğrenme',
          'Robot büyüklüğü'
        ),
        correctAnswer: 'C',
      },
      {
        question: "FLL'nin küçük yaşta STEM gelişimine katkıları nelerdir?",
        options: parseOptions(
          'Yoktur',
          'Sadece eğlence sağlar',
          'Bilim ve mühendislik ilgisi oluşturur',
          'Dersleri zorlaştırır'
        ),
        correctAnswer: 'C',
      },
    ],
  },
  {
    courseId: 3, // FTC
    questions: [
      {
        question: "FTC ve FLL'in farkı nedir?",
        options: parseOptions(
          'Aynıdır',
          'FTC daha büyük ve karmaşıktır',
          'FTC daha küçüktür',
          'FTC robotsuzdur'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FTC robotları neler yapabilir?',
        options: parseOptions(
          'Sadece hareket eder',
          'Nesne toplar ve görev yapar',
          'Uçabilir',
          'Sadece döner'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FTC mekanik anlamda nasıl bir çalışma gerektirir?',
        options: parseOptions(
          'Basit montaj',
          'Ciddi mekanik tasarım',
          'Sadece yazılım',
          'Hiç tasarım yok'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Yarışmaya hazırlanma sürecinde en çok neyi dikkate almak gerekir?',
        options: parseOptions(
          'Robot rengi',
          'Takım stratejisi',
          'Takım tişörtü',
          'Sadece hız'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FTC için ne kadar kapsamlı robotik bilgisi gerekir?',
        options: parseOptions(
          'Hiç gerekmez',
          'Orta seviye mühendislik bilgisi',
          'Sadece oyun bilgisi',
          'Sadece yazılım'
        ),
        correctAnswer: 'B',
      },
      {
        question: "FTC'nin temel amacı nedir?",
        options: parseOptions(
          'Yarış kazanmak',
          'Öğrencileri mühendisliğe yönlendirmek',
          'Robot satmak',
          'Sadece eğlenmek'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FTC\'de hangi yazılım dilleri kullanılır?',
        options: parseOptions(
          'Java ve blok kodlama',
          'Sadece C++',
          'Python zorunlu',
          'Kod yok'
        ),
        correctAnswer: 'A',
      },
      {
        question: "FTC'de mekanik tasarım neden önemlidir?",
        options: parseOptions(
          'Önemli değildir',
          'Robot görevleri yerine getirir',
          'Sadece görünüş içindir',
          'Hakem ister'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FTC robotları nasıl bir yapıdadır?',
        options: parseOptions(
          'LEGO',
          'Metal kit parçalar',
          'Karton',
          'Plastik oyuncak'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FTC yarışmasına hazırlanırken strateji ve mühendislik süreci nasıl planlanmalıdır?',
        options: parseOptions(
          'Rastgele',
          'Planlı ve test ederek',
          'Son gün',
          'Sadece yazılım yaparak'
        ),
        correctAnswer: 'B',
      },
    ],
  },
  {
    courseId: 4, // FIRST
    questions: [
      {
        question: "FIRST'ün açılımı nedir?",
        options: parseOptions(
          'Future Innovation Science Teams',
          'For Inspiration and Recognition of Science and Technology',
          'Fast Robotics Initiative',
          'Federation of Robot Teams'
        ),
        correctAnswer: 'B',
      },
      {
        question: "FIRST Kurucusunun tam adı nedir?",
        options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
        correctAnswer: 'A',
      },
      {
        question: "FIRST'ün misyonu nedir?",
        options: parseOptions(
          'Robot satmak',
          'Gençleri STEM alanlarına yönlendirmek',
          'Yarışma yapmak',
          'Para kazanmak'
        ),
        correctAnswer: 'B',
      },
      {
        question: "FIRST'ün temel değerleri nelerdir?",
        options: parseOptions(
          'Hız ve rekabet',
          'Takım çalışması ve saygı',
          'Kazanmak',
          'Robot gücü'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FIRST bizden tam olarak neyi amaçlamamızı ister?',
        options: parseOptions(
          'Sadece kazanmak',
          'Öğrenmek ve paylaşmak',
          'Robot yapmak',
          'Rakibi yenmek'
        ),
        correctAnswer: 'B',
      },
      {
        question: '"Core values" kavramı neyi kapsamaktadır?',
        options: parseOptions(
          'Robot puanı',
          'Takım davranışları ve iş birliği',
          'Sadece kazanmak',
          'Hakem kuralları'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FIRST değerlerini günlük hayata nasıl adapte edebiliriz?',
        options: parseOptions(
          'Kullanamayız',
          'Saygı ve iş birliğiyle',
          'Sadece yarışmada',
          'Okul dışında gerekmez'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Takım çalışmasında FIRST değerlerini nasıl kullanırız?',
        options: parseOptions(
          'Tartışarak',
          'İş birliği yaparak',
          'Tek çalışarak',
          'Lideri dinlemeyerek'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Gracious Professionalism ne demektir?',
        options: parseOptions(
          'Sert rekabet',
          'Saygılı profesyonellik',
          'Kazanma hırsı',
          'Sessizlik'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Coopertition kavramı neyi ifade eder?',
        options: parseOptions(
          'Rakibi yenmek',
          'Rekabet ederken iş birliği yapmak',
          'Tek başına yarışmak',
          'Yarışmayı iptal etmek'
        ),
        correctAnswer: 'B',
      },
    ],
  },
  {
    courseId: 5, // FRC gönüllü ve ödül
    questions: [
      {
        question: 'FRC gönüllüsü olmak için neler yapılmalı?',
        options: parseOptions(
          'Üye olmak',
          'Gönüllü başvurusu yapmak',
          'Takım kurmak',
          'Robot yapmak'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Kimler FRC gönüllüsü olabilir?',
        options: parseOptions(
          'Sadece öğrenciler',
          'Her yaştan gönüllüler',
          'Sadece öğretmenler',
          'Sadece mühendisler'
        ),
        correctAnswer: 'B',
      },
      {
        question: "Gönüllüler FRC'de ne yapar?",
        options: parseOptions(
          'Robot sürer',
          'Organizasyona destek olur',
          'Takım kurar',
          'Yarışmayı yönetir'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Yeni başlayan takımlar stratejilerini ne yönde geliştirmelidir?',
        options: parseOptions(
          'En zor robotu yapmak',
          'Basit ve güvenilir sistem kurmak',
          'Sadece hız',
          'Büyük robot yapmak'
        ),
        correctAnswer: 'B',
      },
      {
        question: "Gönüllüler FIRST'ü yaymaya nasıl yardım eder?",
        options: parseOptions(
          'Yarışmaları destekleyerek',
          'Robot yaparak',
          'Kod yazarak',
          'Sadece izleyerek'
        ),
        correctAnswer: 'A',
      },
      {
        question: 'FRC ödülleri verilirken neye dikkat edilir?',
        options: parseOptions(
          'Sadece puana',
          'Takım çalışması ve etkiye',
          'Robot rengine',
          'Hıza'
        ),
        correctAnswer: 'B',
      },
      {
        question: "Gönüllülerin FRC ailesindeki görevi nedir?",
        options: parseOptions(
          'Sadece izlemek',
          'Organizasyonu desteklemek',
          'Robot sürmek',
          'Hakem olmak zorunda'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FRC kültürünü yaymada gönüllülerin rolü nedir?',
        options: parseOptions(
          'Yoktur',
          'Tanıtım ve destek sağlarlar',
          'Sadece ödül verirler',
          'Robot yaparlar'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Field Ressetter olmak için ne yapılmalı?',
        options: parseOptions(
          'Robot yapmak',
          'Gönüllü olarak başvurmak',
          'Takım kurmak',
          'Hakem olmak'
        ),
        correctAnswer: 'B',
      },
      {
        question: "FRC'de ödüllerin amacı sadece başarıyı mı ölçmektir?",
        options: parseOptions(
          'Evet',
          'Hayır, takım kültürünü de ölçer',
          'Sadece hız ölçer',
          'Robot gücünü ölçer'
        ),
        correctAnswer: 'B',
      },
    ],
  },
  {
    courseId: 6, // Görev dağılımı
    questions: [
      {
        question: 'FRC takımında bulunan roller nelerdir?',
        options: parseOptions(
          'Sadece sürücü',
          'Mekanik, yazılım, PR vb.',
          'Sadece yazılım',
          'Hakem'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Görev dağılımının önemi nedir?',
        options: parseOptions(
          'Yoktur',
          'Düzenli çalışma sağlar',
          'Süre kaybettirir',
          'Sadece lider çalışır'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Takımda rol dağılımı nasıl gerçekleştirilmelidir?',
        options: parseOptions('Rastgele', 'Yeteneğe göre', 'Yaşa göre', 'Boya göre'),
        correctAnswer: 'B',
      },
      {
        question: 'Takım roller arasında iletişimi nasıl yürütmelidir?',
        options: parseOptions(
          'Hiç konuşmadan',
          'Düzenli iletişimle',
          'Sadece liderle',
          'Yarışmada konuşarak'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Takım içinde neden görev dağılımı yapılmalıdır?',
        options: parseOptions(
          'Karışıklık olmaması için',
          'Eğlence için',
          'Gereksizdir',
          'Sadece formalite'
        ),
        correctAnswer: 'A',
      },
      {
        question: 'Teknik divizyonun temel görevleri nelerdir?',
        options: parseOptions(
          'Tanıtım yapmak',
          'Robot geliştirmek',
          'Video çekmek',
          'Sponsorluk bulmak'
        ),
        correctAnswer: 'B',
      },
      {
        question: "PR'ın temel görevleri nedir?",
        options: parseOptions(
          'Robot yapmak',
          'Takımı tanıtmak',
          'Kod yazmak',
          'Saha kurmak'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Mekanik ve yazılım ekipleri arasında nasıl bir koordinasyon gerekir?',
        options: parseOptions(
          'Hiç gerekmez',
          'Sürekli iletişim gerekir',
          'Ayrı çalışırlar',
          'Yarışmada birleşir'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Liderlik eksikliği takım performansını nasıl etkiler?',
        options: parseOptions(
          'Etkilemez',
          'Performansı düşürür',
          'Performansı artırır',
          'Robotu büyütür'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Doğru görev dağılımı yapılmazsa yarışma günü ne tür problemler ortaya çıkabilir?',
        options: parseOptions(
          'Sorun çıkmaz',
          'Karışıklık ve aksama olur',
          'Robot hızlanır',
          'Puan artar'
        ),
        correctAnswer: 'B',
      },
    ],
  },
  {
    courseId: 1, // FIRST yarışma
    questions: [
      {
        question: 'FIRST yarışmaları kaç ana kategoriye ayrılır?',
        options: parseOptions('2', '3', '4', '5'),
        correctAnswer: 'B',
      },
      {
        question: 'FIRST bünyesinde barındırdığı 3 yarışma hangileridir?',
        options: parseOptions(
          'FLL, FTC, FRC',
          'VEX, RoboCup, FRC',
          'FLL, VEX, FTC',
          'RoboCup, FTC, FRC'
        ),
        correctAnswer: 'A',
      },
      {
        question: 'Bir öğrencinin FIRST ile ilk tanıştığı yarışma nedir?',
        options: parseOptions('FRC', 'FTC', 'FLL', 'Üniversite ligi'),
        correctAnswer: 'C',
      },
      {
        question: 'Yarışmalar hangi yaş grupları için düzenlenir?',
        options: parseOptions(
          'Sadece lise',
          'İlkokuldan liseye kadar',
          'Sadece üniversite',
          'Sadece yetişkinler'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FRC robotlarının diğer FIRST robotlarından farkı nedir?',
        options: parseOptions(
          'Küçük olmaları',
          'Daha büyük ve güçlü olmaları',
          'LEGO olmaları',
          'Uçmaları'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'FRC robotları FTC robotlarından kaç kat büyüktür?',
        options: parseOptions('Aynı', 'Yaklaşık 2 kat', '10 kat', 'Daha küçük'),
        correctAnswer: 'B',
      },
      {
        question: 'En küçük robotların kullanıldığı yarışma hangisidir?',
        options: parseOptions('FRC', 'FTC', 'FLL', 'Hiçbiri'),
        correctAnswer: 'C',
      },
      {
        question: 'En büyük ve endüstriyel robotların kullanıldığı yarışma hangisidir?',
        options: parseOptions('FLL', 'FTC', 'FRC', 'Hepsi aynı'),
        correctAnswer: 'C',
      },
      {
        question: 'Yarışmalarda puanlama nasıl işler?',
        options: parseOptions(
          'Rastgele',
          'Görev başarılarına göre',
          'Robot büyüklüğüne göre',
          'Hakem seçer'
        ),
        correctAnswer: 'B',
      },
      {
        question: 'Yarışma anında çıkan mekanik sorunlarla nasıl başa çıkılır?',
        options: parseOptions(
          'Yarışmadan çekilerek',
          'Pit ekibi hızlı onarım yaparak',
          'Bekleyerek',
          'Maçı iptal ederek'
        ),
        correctAnswer: 'B',
      },
    ],
  },
];

export default testsTr;
