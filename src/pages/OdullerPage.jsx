import { useRef } from 'react'
import { motion } from 'framer-motion'
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
    id: 'uluslararasi-basari',
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
    id: 'global-world-turkiye',
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
    press: [
      { source: 'Magazin Times', url: 'https://magazintimes.com/yilin-ilham-veren-kadin-yazari-odulu-mira-cengenin-oldu/' },
      { source: 'Olay İstanbul', url: 'https://olayistanbul.com/kelimelerin-gucune-odul-mira-cenge-yilin-ilham-veren-yazari-secildi/' },
      { source: 'Türkiye Sesi', url: 'https://turkiyeses.com/mira-cengeye-edebiyat-dunyasinda-anlamli-odul/' },
      { source: 'Fox Haber Saati', url: 'https://foxhabersaati.com/113825/edebiyatta-ilham-veren-basari-mira-cengeye-anlamli-odul/' },
      { source: 'Basın Haberleri', url: 'https://basinhaberleri.com/mira-cenge-edebiyatta-ilham-veren-basariya-imza-atti/' },
      { source: 'Press Haber', url: 'https://presshaber.com.tr/mira-cengeye-edebiyat-dunyasindan-anlamli-odul/' },
      { source: 'Ajans Cep', url: 'https://ajanscep.com/mira-cenge-edebiyat-dunyasinda-ilham-veren-kadin-yazar-secildi/' },
      { source: 'Haber Bir Gün', url: 'https://haberbirgun.com/mira-cengeye-edebiyatta-ilham-veren-kadin-yazar-odulu/' },
      { source: 'Time Turks', url: 'https://timeturks.com/mira-cengeye-edebiyat-dunyasindan-anlamli-odul/' },
      { source: 'Son Haber Burada', url: 'https://sonhaberburda.com/mira-cenge-edebiyatta-ilham-veren-kadin-yazar-odulune-layik-goruldu/' },
      { source: 'Star Haber 365', url: 'https://starhaber365.com/81334/mira-cenge-edebiyatta-ilham-veren-kadin-yazar-olarak-odul-aldi/' },
      { source: 'Cine5 Magazin', url: 'https://cine5magazin.com/mira-cengeye-yilin-ilham-veren-kadin-yazari-odulu/' },
      { source: 'Manşet Net', url: 'https://mansetnet.com/sektorel/mira-cenge-edebiyatta-yilin-ilham-veren-ismi-secildi' },
      { source: 'Marmara Sesi', url: 'https://www.marmarases.com/sektor/mira-cengeye-edebiyatta-anlamli-basari-ilham-veren-kadin-yazar-odulu' },
    ],
  },
]

export default function OdullerPage({ onBack }) {
  const sectionRefs = useRef({})

  const scrollToAward = (id) => {
    const target = sectionRefs.current[id]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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

      {/* Award badges (overview of both awards) */}
      <motion.div
        className="oduller-pills"
        aria-label="Ödüller"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {awards.map((a) => (
          <button
            key={a.id}
            type="button"
            className="oduller-pill"
            onClick={() => scrollToAward(a.id)}
            aria-label={`${a.name} bölümüne git`}
          >
            <span className="oduller-pill__year">{a.year}</span>
            <span className="oduller-pill__label">{a.tabLabel}</span>
          </button>
        ))}
      </motion.div>

      {/* Stacked award sections */}
      {awards.map((award, awardIndex) => (
        <section
          key={award.id}
          id={award.id}
          ref={(el) => { sectionRefs.current[award.id] = el }}
          className="oduller-award"
        >
          {awardIndex > 0 && (
            <motion.div
              className="oduller-award-divider"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.35 + awardIndex * 0.1, duration: 0.7 }}
              aria-hidden="true"
            >
              <span className="oduller-award-divider__line" />
              <span className="oduller-award-divider__ornament">✦</span>
              <span className="oduller-award-divider__line" />
            </motion.div>
          )}

          {/* Award info */}
          <motion.div
            className="oduller-award-badge"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + awardIndex * 0.1, duration: 0.6 }}
          >
            <span className="oduller-award-badge__year">{award.year}</span>
            <span className="oduller-award-badge__name">{award.name}</span>
            <span className="oduller-award-badge__category">{award.category}</span>
          </motion.div>

          {/* Photo gallery */}
          <motion.div
            className="oduller-gallery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + awardIndex * 0.1, duration: 0.8 }}
          >
            {award.photos.map((photo, i) => (
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
            transition={{ delay: 0.6 + awardIndex * 0.1, duration: 0.8 }}
          >
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
          </motion.div>

          {/* Press coverage */}
          {award.press && award.press.length > 0 && (
            <motion.div
              className="oduller-press"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + awardIndex * 0.1, duration: 0.8 }}
            >
              <h3 className="oduller-press__title">Basın Yansımaları</h3>
              <div className="inner-page__title-rule" style={{ marginBottom: '1rem' }} />
              <p className="oduller-press__intro">
                Bu anlamlı ödül, {award.press.length} farklı yayın organında yer aldı.
              </p>
              <ul className="oduller-press__list">
                {award.press.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oduller-press__item"
                    >
                      <span className="oduller-press__source">{item.source}</span>
                      <span className="oduller-press__arrow" aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </section>
      ))}

      <div className="inner-page__page-number">
        <span>05</span>
      </div>
    </div>
  )
}
