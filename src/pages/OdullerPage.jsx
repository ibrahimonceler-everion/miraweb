import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import odul1 from '../assets/odul1.jpeg'
import odul2 from '../assets/odul2.jpeg'
import odul3 from '../assets/odul3.jpeg'
import globalworld1 from '../assets/globalworld1.jpeg'
import globalworld2 from '../assets/globalworld2.jpeg'
import globalworld3 from '../assets/globalworld3.jpeg'
import globalworld4 from '../assets/globalworld4.jpeg'
import './InnerPage.css'

const awards = [
  {
    tabLabel: 'Uluslararası Başarı',
    year: '2026',
    name: '12. Uluslararası Başarı ve Kariyer Ödülleri',
    category: 'Yılın En İyi Çıkış Yapan Kadın Yazar',
    photos: [
      { src: odul1, alt: 'Mira Çenge - 12. Uluslararası Başarı ve Kariyer Ödülleri' },
      { src: odul2, alt: 'Mira Çenge - Ödül Töreni Kırmızı Halı' },
      { src: odul3, alt: 'Yılın En İyi Çıkış Yapan Kadın Yazar Ödülü - Mira Çenge' },
    ],
    speech: [
      'Ben Mira Çenge… Edebiyat benim için bir tutku… Yaşamı dizelerde ve satırlarda yaşamaya küçük yaşlarda karar verdim. Bu da beni tutkunu olduğum “Türk Dili ve Edebiyatı” alanında eğitim almaya yöneltti. Ve minnettarım ki bu alanda öğretmen olabilme fırsatını buldum.',
      'Şimdi ise satırların ve dizelerin büyüsünde can bulan kelimelere sahibim. Amacım edebiyatseverlerle bir şiirin dizesinde, bir kitabın satırında buluşmak…',
      'Kalpten kalbe yol bulmak…',
      'Kelimelerin bir çağın soluğu olduğuna inanan herkes adına bu ödülü büyük bir onur ve zarafetle kabul ediyorum.',
      'Bu yolculukta bana eşlik eden herkese kalpten teşekkür ederim…',
      'Ben kelimelerin izini sürmeye devam edeceğim çünkü, bazı hikayeler ancak yolda tamamlanır…',
    ],
  },
  {
    tabLabel: 'Global World Türkiye',
    year: '2026',
    name: 'Global World Türkiye Altın Zirve ve Kariyer Ödülleri',
    category: 'Yılın İlham Veren Kadın Yazarı',
    photos: [
      { src: globalworld1, alt: 'Mira Çenge - Global World Türkiye Altın Zirve ve Kariyer Ödülleri' },
      { src: globalworld2, alt: 'Mira Çenge - Ödül Silüeti' },
      { src: globalworld3, alt: 'Yılın İlham Veren Kadın Yazarı Ödülü - Mira Çenge' },
      { src: globalworld4, alt: 'Mira Çenge - Global World Türkiye Kırmızı Halı' },
    ],
    speech: [
      'Ben bugün burada, kelimelerle gönül bağı kuran herkes adına duruyorum.',
      'Yazmak benim için bir anlatma biçimi değil… bir hatırlatma:',
      'İnsanın, en çok insana iyi geldiğini hatırlatma…',
      'Eğer bir cümlem birinin kalbine ulaştıysa, işte en büyük ödül budur…',
      'Bu anlamlı ödülü, büyük bir şükran ve incelikle kabul ediyorum.',
    ],
  },
]

export default function OdullerPage({ onBack }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const award = awards[activeIndex]

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

      {/* Tabs */}
      <motion.div
        className="oduller-tabs"
        role="tablist"
        aria-label="Ödüller arası geçiş"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {awards.map((a, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`oduller-tab${isActive ? ' oduller-tab--active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="oduller-tab__label">{a.tabLabel}</span>
              {isActive && (
                <motion.span
                  layoutId="oduller-tab-underline"
                  className="oduller-tab__underline"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </motion.div>

      {/* Active award content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="oduller-award"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          {/* Award info */}
          <div className="oduller-award-badge">
            <span className="oduller-award-badge__year">{award.year}</span>
            <span className="oduller-award-badge__name">{award.name}</span>
            <span className="oduller-award-badge__category">{award.category}</span>
          </div>

          {/* Photo gallery */}
          <div className="oduller-gallery">
            {award.photos.map((photo, i) => (
              <div key={i} className="oduller-gallery__item">
                <div className="oduller-gallery__frame">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <div className="oduller-gallery__overlay" />
                </div>
              </div>
            ))}
          </div>

          {/* Speech */}
          <div className="yazilar-prose">
            <h3 className="oduller-speech-title">Ödül Konuşması</h3>
            <div className="inner-page__title-rule" style={{ marginBottom: '1.25rem' }} />

            {award.speech.map((p, i) => (
              <p
                key={i}
                className={
                  p.length < 40
                    ? 'oduller-speech__accent'
                    : 'oduller-speech__paragraph'
                }
              >
                {p}
              </p>
            ))}

            <div className="yazilar-prose__signature">
              <div className="yazilar-prose__signature-line" />
              <span>Mira Çenge</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="inner-page__page-number">
        <span>05</span>
      </div>
    </div>
  )
}
