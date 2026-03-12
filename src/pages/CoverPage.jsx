import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText'
import ParallaxLayer from '../components/ParallaxLayer'
import StarMap from '../components/StarMap'
import PageLogo from '../components/PageLogo'
import authorImg from '../assets/author.jpeg'
import './CoverPage.css'

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
}

export default function CoverPage({ onNavigate }) {
  return (
    <div className="cover">
      <ParallaxLayer depth={0.8} className="cover__header-parallax">
      <header className="cover__header">
        <motion.div className="cover__header-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="cover__logo">
            <PageLogo />
          </div>
          <h1 className="cover__title">{'Mira \u00c7enge'}</h1>
          <div className="cover__title-line" />
        </motion.div>
      </header>
      </ParallaxLayer>

      <motion.div
        className="cover__motto"
        {...fadeUp}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="cover__motto-deco">&laquo;</span>
        <TypewriterText
          text={'S\u00f6zc\u00fcklerin kalbinde ipeksi bir sakinlik \u2026'}
          speed={40}
          delay={800}
          tag="p"
          className="cover__motto-text"
        />
        <span className="cover__motto-deco">&raquo;</span>
      </motion.div>

      <ParallaxLayer depth={0.3}>
      <div className="cover__divider">
        <span className="cover__divider-ornament">&#10043;</span>
      </div>
      </ParallaxLayer>

      <ParallaxLayer depth={0.5} className="cover__body-parallax">
      <div className="cover__body">
        <motion.div
          className="cover__left"
          {...fadeUp}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="cover__photo-frame">
            <div className="cover__photo">
              <img src={authorImg} alt="Mira" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="cover__mid"
          {...fadeUp}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="cover__bio-dropcap">
            {'Mira \u00c7enge i\u00e7in edebiyat ruhun \u00f6zg\u00fcrce hayallerle bulu\u015ftu\u011fu bir s\u0131\u011f\u0131nakt\u0131r. Sanat\u0131n estetik bak\u0131\u015f a\u00e7\u0131s\u0131 ve zarafetin b\u00fcy\u00fcs\u00fc edebiyatla ta\u00e7lan\u0131r. Edebiyat bizi anlam\u0131 bir hayata davet eder. Sar\u0131ld\u0131\u011f\u0131m\u0131z kelimeler, m\u0131sralar, c\u00fcmleler bir pencere olur. Her s\u00f6z bir nefes gibi solu\u011fumuzda, derinlik ve mana sunar.'}
          </p>
          <p className="cover__bio-text">
            {'\u00c7a\u011flar\u0131 a\u015fan bu soluk Mira \u00c7enge\u2019nin edebiyat resitalini olu\u015fturur.'}
          </p>
        </motion.div>

        <div className="cover__right">
          <StarMap onNavigate={onNavigate} />
        </div>
      </div>
      </ParallaxLayer>

      <motion.div
        className="cover__footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <div className="cover__footer-line" />
        <a
          href="https://www.instagram.com/mira.edebiyat/"
          target="_blank"
          rel="noopener noreferrer"
          className="cover__instagram"
          title="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          <span>@mira.edebiyat</span>
        </a>
        <span className="cover__footer-text">Est. 2026</span>
        <div className="cover__footer-line" />
      </motion.div>
    </div>
  )
}
