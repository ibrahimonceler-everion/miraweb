import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import TypewriterText from '../components/TypewriterText'
import './GizliPage.css'

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
}

export default function GizliPage({ onBack }) {
  return (
    <div className="inner-page inner-page--gizli">
      <BackButton onClick={onBack} />

      <PageLogo />

      <motion.div className="inner-page__header" {...fadeUp} transition={{ delay: 0.2, duration: 0.8 }}>
        <span className="inner-page__page-label">Sayfa ?</span>
        <h2 className="inner-page__title">Gizli Oda</h2>
        <p className="inner-page__subtitle">Bu sayfayı buldunuz... Tebrikler.</p>
        <div className="inner-page__title-rule" />
      </motion.div>

      <motion.div className="gizli-content" {...fadeUp} transition={{ delay: 0.5, duration: 0.8 }}>
        <div className="gizli-content__poem">
          <TypewriterText
            text="Kelimeler arasında gizli bir kapı vardır..."
            speed={55}
            delay={800}
            tag="p"
            className="gizli-content__poem-line"
          />
          <TypewriterText
            text="Sadece meraklı ruhlar bulabilir onu."
            speed={55}
            delay={3500}
            tag="p"
            className="gizli-content__poem-line"
          />
          <TypewriterText
            text="Sen ki buldun, hoş geldin bu odaya."
            speed={55}
            delay={6000}
            tag="p"
            className="gizli-content__poem-line"
          />
        </div>

        <motion.div
          className="gizli-content__note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 9, duration: 1.5 }}
        >
          <h3 className="gizli-content__note-title">Yazarın Notu</h3>
          <p className="gizli-content__note-text">
            Bu sayfa, sadece kelimelerle dans etmeyi bilenler için.
            Her kitabımda gizli bir mesaj bırakırım. Onu bulan okuyucularım
            bana bir mektup yazar. Belki bir gün sen de yazarsın.
          </p>
          <p className="gizli-content__note-text">
            Edebiyat, gizli odalara açılan anahtardır.
            Her satırda bir sır, her sayfada bir keşif bekler.
          </p>
          <div className="gizli-content__signature">
            <span className="gizli-content__signature-text">— M.Ç.</span>
          </div>
        </motion.div>

        <motion.div
          className="gizli-content__hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 11, duration: 2 }}
        >
          <p>Bu sayfayı "mira" yazarak buldunuz.</p>
        </motion.div>
      </motion.div>

      <div className="inner-page__page-number"><span>?</span></div>
    </div>
  )
}
