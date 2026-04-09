import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import './InnerPage.css'

const essays = [
  {
    id: 1,
    title: 'Hakikat ve Yaşam',
    paragraphs: [
      'Yaşamak nedir diye sorsalar önce hürriyet derim sonra hakikat… Her insan özgür bir ruhla doğar. Hakikatlerle büyür. Hakikatin ışığı ile yolunu çizer. Hakikat her insan için farklıdır.',
      'Peki bu yaşam yolculuğunu çizerken hangi kavram bize yön verir? Kilit nokta tam olarak burada… Hayatımızı yönlendirirken bize rehberlik eden bir fikir, bir cümle belki de bir felsefe öğretisi.',
      'Yaşamımıza kaynaklık eden bu fikir kalbimizden mi aklımızdan mı geliyor? Bunlar basit bir cümle gibi görünse de aslında bir kilidi açabilecek anahtar… Bu anahtara sahip olabilmek için neler yapabiliriz cümlesi akla geliyor. Bunlar yaşam yolculuğumuzun bir parçası…',
      'Hayat bir ağacın dalları gibi gelişip büyürken her gün yeni bir yaprak… Filizlenen yaprakları büyütmek ve yaşatmak bizim elimizde…',
      'Hakikat seçimler ve tercihler bütünüyle şekilleniyor. İşte tam da bu sonuç bizim gerçeğimiz oluyor. Kalbimizin ve aklımızın bizi getirdiği nokta yaşamımızı oluşturuyor.',
      'Ekilen her tohum büyüyor, bir mahsul olarak bize sunuluyor. Bu dengeyi anlayıp kurduğumuz da tüm taşlar yerine oturuyor…',
      'Kitabım yaşamı anlamlandırma serüveninde bize yeni bir soluk kazandırmak için yola çıktı. Yazım sürecimin ilk kitabına siz değerli okurlarıma teşekkür ederek başlıyorum… Kitabımda edebiyatın zarif çizgisi ile yaşamın ruhunu yakalamak üzere bir yolculuğa davet ediyorum sizleri…',
      'Bir sayfada, bir cümlede, bir kelimede buluşmak umuduyla…',
    ],
  },
  {
    id: 2,
    title: 'Umudun Manifestosu',
    paragraphs: [
      'Yeni bir yol ararız bazen… Tüm yollar tükenmiş gibidir. Bir son, bir çıkmaz sokak gibi. Kalbimiz hızlı hızlı çarparken biraz kırgın biraz yalnız. Tek başına olmanın o soğuk rüzgarı kalbimizde eser ama durmaz…',
      'Bu rüzgarın nasıl duracağını düşünürüz. Yaşam sarmalının içinde sıkışıp kalmış gibi hissederiz. Üstelik dışarıdan herhangi bir etkinin bizi kurtaramayacağını bile bile yaşarız bu duyguyu…',
      'Günler birbirine benzer, tuhaf ki bundan artık şikayetçi de değilizdir. Öylesine bir kabul… Artık bir çözüm yolu bile aramak gereksiz gelir…',
      'İşte orada yaşayacağımız bir kırılma bizi bekler… Herşeyin kırılıp un ufak olduğu an… Yangın sonrası yerdeki küller gibi her yer toz duman…',
      'Siz artık eski siz değilsinizdir… Yeni bir doğum başlamıştır çoktan… Ayağa kalktığımız an umudun ışığı penceremizden ışığını yansıtır. O ışık varoluşun ilk adımıdır. Kendini yeniden var etmek…',
      'Umut, inanç ve sevgi yalnızlığı, korkuyu, kaygıyı yenmek için ellerinizi tutar… Umut bakidir… Güneş hergün yeniden doğar… Belki de hikayeniz henüz hiç başlamamıştır…',
    ],
  },
]

export default function YazilarPage({ onBack }) {
  return (
    <div className="inner-page">
      <BackButton onClick={onBack} />

      <PageLogo />

      <motion.div
        className="inner-page__header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="inner-page__title">Yazılar</h2>
        <p className="inner-page__subtitle">
          Kalbin mürekkebiyle yazılmış satırlar
        </p>
        <div className="inner-page__title-rule" />
      </motion.div>

      <div className="inner-page__essays">
        {essays.map((essay, i) => (
          <motion.div
            key={essay.id}
            className="essay-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.25 }}
          >
            <h3 className="essay-card__title">{essay.title}</h3>
            <div className="essay-card__divider" />
            <div className="essay-card__body">
              {essay.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className={
                    j === 0
                      ? 'essay-card__dropcap'
                      : j === essay.paragraphs.length - 1
                        ? 'essay-card__closing'
                        : 'essay-card__paragraph'
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="essay-card__signature">
              <div className="essay-card__signature-line" />
              <span>Mira Çenge</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="inner-page__page-number">
        <span>02</span>
      </div>
    </div>
  )
}
