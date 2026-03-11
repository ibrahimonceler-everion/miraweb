import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import authorImg from '../assets/author3.jpeg'
import './InnerPage.css'

const poems = [
  {
    id: 1,
    title: 'Düş',
    lines: [
      'Soluduğum düşlerimin kıyısında',
      'Erdemli bir hayat duruyordu',
      'Minör satırlara hapsolmuş',
      'Majör zamanlar yaşıyorduk seninle…',
      '',
      'Anlamını aradığımız cümlelere',
      'Yeni manalar yüklüyorduk',
      'Zamanın ötesinde',
      'İstanbul\u2019da bir bayram sabahıydı…',
    ],
  },
  {
    id: 2,
    title: 'Zaman',
    lines: [
      'Ben koşuyorum',
      'Kendi yarışımda kimseyle yarışmıyorum',
      'Erenköy\u2019de gözyaşım aktıysa',
      'Beşiktaş\u2019ta gülümsüyorum',
      '',
      'Zamanla savaşmıyorum',
      'Sonunu bildiğim hikayeleri',
      'Aslında ben yazıyorum',
      'Sevgiye ve mutluluğa',
      'Kalbimle gülümsüyorum…',
    ],
  },
]

export default function KitaplarPage({ onBack }) {
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
        <h2 className="inner-page__title">Şiirler</h2>
        <p className="inner-page__subtitle">
          Kelimelerin dansettiği sessiz sahneler
        </p>
        <div className="inner-page__title-rule" />
      </motion.div>

      {/* Editorial author portrait */}
      <motion.div
        className="inner-page__portrait"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="inner-page__portrait-frame">
          <img src={authorImg} alt="Mira Çenge" />
          <div className="inner-page__portrait-overlay" />
        </div>
      </motion.div>

      <div className="inner-page__poems">
        {poems.map((poem, i) => (
          <motion.div
            key={poem.id}
            className="poem-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.25 }}
          >
            <h3 className="poem-card__title">{poem.title}</h3>
            <div className="poem-card__divider" />
            <div className="poem-card__body">
              {poem.lines.map((line, j) =>
                line === '' ? (
                  <div key={j} className="poem-card__stanza-break" />
                ) : (
                  <p key={j} className="poem-card__line">{line}</p>
                )
              )}
            </div>
            <span className="poem-card__author">— Mira Çenge</span>
          </motion.div>
        ))}
      </div>

      <div className="inner-page__page-number">
        <span>03</span>
      </div>
    </div>
  )
}
