import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import './InnerPage.css'

const paragraphs = [
  'Yaşamak nedir diye sorsalar önce hürriyet derim sonra hakikat… Her insan özgür bir ruhla doğar. Hakikatlerle büyür. Hakikatin ışığı ile yolunu çizer. Hakikat her insan için farklıdır.',
  'Peki bu yaşam yolculuğunu çizerken hangi kavram bize yön verir? Kilit nokta tam olarak burada… Hayatımızı yönlendirirken bize rehberlik eden bir fikir, bir cümle belki de bir felsefe öğretisi.',
  'Yaşamımıza kaynaklık eden bu fikir kalbimizden mi aklımızdan mı geliyor? Bunlar basit bir cümle gibi görünse de aslında bir kilidi açabilecek anahtar… Bu anahtara sahip olabilmek için neler yapabiliriz cümlesi akla geliyor. Bunlar yaşam yolculuğumuzun bir parçası…',
  'Hayat bir ağacın dalları gibi gelişip büyürken her gün yeni bir yaprak… Filizlenen yaprakları büyütmek ve yaşatmak bizim elimizde…',
  'Hakikat seçimler ve tercihler bütünüyle şekilleniyor. İşte tam da bu sonuç bizim gerçeğimiz oluyor. Kalbimizin ve aklımızın bizi getirdiği nokta yaşamımızı oluşturuyor.',
  'Ekilen her tohum büyüyor, bir mahsul olarak bize sunuluyor. Bu dengeyi anlayıp kurduğumuz da tüm taşlar yerine oturuyor…',
  'Kitabım yaşamı anlamlandırma serüveninde bize yeni bir soluk kazandırmak için yola çıktı. Yazım sürecimin ilk kitabına siz değerli okurlarıma teşekkür ederek başlıyorum… Kitabımda edebiyatın zarif çizgisi ile yaşamın ruhunu yakalamak üzere bir yolculuğa davet ediyorum sizleri…',
  'Bir sayfada, bir cümlede, bir kelimede buluşmak umuduyla…',
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

      <motion.div
        className="yazilar-prose"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? 'yazilar-prose__dropcap'
                : i === paragraphs.length - 1
                  ? 'yazilar-prose__closing'
                  : 'yazilar-prose__paragraph'
            }
          >
            {p}
          </p>
        ))}

        <div className="yazilar-prose__signature">
          <div className="yazilar-prose__signature-line" />
          <span>Mira Çenge</span>
        </div>
      </motion.div>

      <div className="inner-page__page-number">
        <span>02</span>
      </div>
    </div>
  )
}
