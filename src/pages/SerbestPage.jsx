import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import './InnerPage.css'

const paragraphs = [
  'Nasıl bir yaşam? Bir idealler sarmalı mı? Yoksa bir boşlukta yuvarlanan taş gibi yaşamak mı? Dengeyi bulan rölantide ilerleyen bir hayat mı? Kendimizi tanıma süreci bu soruların da cevabını bulmamızı sağlayacaktır. Bulduğumuz cevap şüphesiz ki yaşamımız için en değerli cevaplardan biridir…',
  'Bu süreçte cevaba bizi ulaştıracak önemli bir soru da "Neyi özlüyoruz?" sorusudur. İnsan özlemlediği bazı duygu, durum ya da zamana aittir… Belki geçmişi, belki geleceği, belki de yaşayamadığımız tüm anlar bütününü özleriz…',
  'Özlemimiz ruhsal olarak yakın bulduğumuz temalara bizi yaklaştırır. Gözlerimizi kapattığımızda kendimizi nerede hissediyoruz? Burası nasıl bir yer? Burada olma amacımız ne? Özlemimiz hayalimizse, hayalimiz gerçeğimiz olsa nasıl hissederdik?',
  'Her zaman dört duvar arasında geçen bir hayatın aslında tek ihtiyacının yemyeşil bir bahçe olduğunu düşünelim. O bahçeye kavuşamadan geçen zaman ziyan değil midir?',
  'Oysa ki bahçeyi bulan ruh tamamlanmış hissedecektir. Herkesin ruhuna uygun bir yer mutlaka vardır. Önemli olan bunun tespitidir. Bu tespiti yaparken hislerimiz ve mantığımız dengede olursa tutarlı olmuş oluruz.',
]

export default function SerbestPage({ onBack }) {
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
        <h2 className="inner-page__title">Düşünceler</h2>
        <p className="inner-page__subtitle">
          Zamansız düşünceler, sınırsız kelimeler
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
        <span>04</span>
      </div>
    </div>
  )
}
