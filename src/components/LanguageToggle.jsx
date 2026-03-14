import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import './LanguageToggle.css'

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang()

  return (
    <motion.button
      className="lang-toggle"
      onClick={toggleLang}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      title={lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
    >
      <span className={`lang-toggle__option ${lang === 'tr' ? 'lang-toggle__option--active' : ''}`}>
        TR
      </span>
      <span className="lang-toggle__separator">&#183;</span>
      <span className={`lang-toggle__option ${lang === 'en' ? 'lang-toggle__option--active' : ''}`}>
        EN
      </span>
    </motion.button>
  )
}
