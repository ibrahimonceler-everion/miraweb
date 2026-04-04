import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import odul1 from '../assets/odul1.jpeg'
import odul2 from '../assets/odul2.jpeg'
import odul3 from '../assets/odul3.jpeg'
import './InnerPage.css'

const photos = [
  { src: odul1, alt: 'Mira Çenge - 12. Uluslararası Başarı ve Kariyer Ödülleri' },
  { src: odul2, alt: 'Mira Çenge - Ödül Töreni Kırmızı Halı' },
  { src: odul3, alt: 'Yılın En İyi Çıkış Yapan Kadın Yazar Ödülü - Mira Çenge' },
]

const speechParagraphs = [
  'Ben Mira Çenge\u2026 Edebiyat benim için bir tutku\u2026 Yaşamı dizelerde ve satırlarda yaşamaya küçük yaşlarda karar verdim. Bu da beni tutkunu olduğum \u201CTürk Dili ve Edebiyatı\u201D alanında eğitim almaya yöneltti. Ve minnettarım ki bu alanda öğretmen olabilme fırsatını buldum.',
  'Şimdi ise satırların ve dizelerin büyüsünde can bulan kelimelere sahibim. Amacım edebiyatseverlerle bir şiirin dizesinde, bir kitabın satırında buluşmak\u2026',
  'Kalpten kalbe yol bulmak\u2026',
  'Kelimelerin bir çağın soluğu olduğuna inanan herkes adına bu ödülü büyük bir onur ve zarafetle kabul ediyorum.',
  'Bu yolculukta bana eşlik eden herkese kalpten teşekkür ederim\u2026',
  'Ben kelimelerin izini sürmeye devam edeceğim çünkü, bazı hikayeler ancak yolda tamamlanır\u2026',
]

export default function OdullerPage({ onBack }) {
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
        <h2 className="inner-page__title">Ödüller</h2>
        <p className="inner-page__subtitle">
          Kelimelerin onurlandığı anlar
        </p>
        <div className="inner-page__title-rule" />
      </motion.div>

      {/* Award info */}
      <motion.div
        className="oduller-award-badge"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="oduller-award-badge__year">2025</span>
        <span className="oduller-award-badge__name">
          12. Uluslararası Başarı ve Kariyer Ödülleri
        </span>
        <span className="oduller-award-badge__category">
          Yılın En İyi Çıkış Yapan Kadın Yazar
        </span>
      </motion.div>

      {/* Photo gallery */}
      <motion.div
        className="oduller-gallery"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {photos.map((photo, i) => (
          <div key={i} className="oduller-gallery__item">
            <div className="oduller-gallery__frame">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="oduller-gallery__overlay" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Speech */}
      <motion.div
        className="yazilar-prose"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h3 className="oduller-speech-title">Ödül Konuşması</h3>
        <div className="inner-page__title-rule" style={{ marginBottom: '1.25rem' }} />

        {speechParagraphs.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? 'yazilar-prose__dropcap'
                : p.length < 40
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
        <span>05</span>
      </div>
    </div>
  )
}
