import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import authorImg from '../assets/author2.jpeg'
import './InnerPage.css'

const paragraphs = [
  'Boğaz’ın hafızasını taşıyan Beykoz’da başlayan bir hayat, zamanla kelimelerin ve insanların hikâyelerine yöneldi. Çocukluk yıllarında dalga sesleriyle kurulan o görünmez bağ, edebiyatın sesine dönüştü; denizin ufkunda aranan anlam, zamanla insan ruhunun hikâyesinde karşılık buldu.',
  'Türk Dili ve Edebiyatı öğretmeni, yazar ve şair olan Mira Çenge, kalemi yalnızca anlatmak için değil; anlamak, hissetmek ve hissettirmek için kullanmaktadır. Onun dünyasında edebiyat, insan ruhları arasında kurulan en zarif temaslardan biridir. Şiirleri ve seslendirmeleriyle kelimelere yalnızca anlam değil, duygu da kazandırmaktadır.',
  'Mira Çenge’nin kalemini, duruşunu ve insanlara yaklaşımını şekillendiren iki değer vardır: zarafet ve nezaket.',
  'Meslek yaşamı boyunca gençlerin gelişimine katkı sunarken, özel eğitim alanındaki çalışmalarıyla özel bireylerin hayatlarına dokunmuş; toplumsal sorumluluğu bireysel başarının önünde tutmuştur. Kadınların güçlenmesine ve toplumsal dayanışmaya duyduğu inanç, çalışmalarına olduğu kadar eserlerine de yansımaktadır. Edebiyat, eğitim ve sosyal sorumluluk alanlarında ortaya koyduğu çalışmalar; Altın Zirve Kariyer Ödülleri’nde “Yılın İlham Veren Kadın Yazarı”, Uluslararası Kariyer Ödülleri’nde ise “Yılın En İyi Çıkış Yapan Yazarı” unvanlarıyla takdir edilmiştir.',
  'Kalp hafızasına inanan Mira Çenge için insanı insan yapan şey, hatırladıkları değil; kalbinde yaşatmayı seçtikleridir. Sevgiyle söylenen bir söz, iyilikle dokunulan bir hayat ve samimiyetle kurulan bir bağ… Zamanın silemediği bütün güzellikler, onun satırlarında yeniden hayat bulur.',
  'Kelimelerinin sınırları aşarak farklı coğrafyalardaki insanlara ulaşmasını ve umuda ihtiyaç duyan her kalbe dokunmasını amaçlayan Mira Çenge için edebiyat, zamana bırakılmış zarif bir izdir; yıllar sonra bile bir kalpte yeniden çiçek açabilen bir iz…',
]

const closing =
  'Boğaz’ın kıyılarında başlayan bu hikâye, bugün Mira Çenge’nin kaleminde; insan ruhuna umut, kalplere sevgi ve zamana iz bırakma yolculuğu olarak devam etmektedir.'

export default function BiyografiPage({ onBack }) {
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
        <h2 className="inner-page__title">Biyografi</h2>
        <p className="inner-page__subtitle">
          Sezgisel bir dokunuş, hissel bir karşılaşma…
        </p>
        <div className="inner-page__title-rule" />
      </motion.div>

      <motion.div
        className="inner-page__portrait"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        <div className="inner-page__portrait-frame">
          <img src={authorImg} alt="Mira Çenge - Şair ve Yazar" loading="lazy" />
          <div className="inner-page__portrait-overlay" />
        </div>
      </motion.div>

      <motion.div
        className="yazilar-prose"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8 }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={i === 0 ? 'yazilar-prose__dropcap' : 'yazilar-prose__paragraph'}
          >
            {p}
          </p>
        ))}

        <p className="yazilar-prose__closing">{closing}</p>

        <div className="yazilar-prose__signature">
          <div className="yazilar-prose__signature-line" />
          <span>Mira Çenge</span>
        </div>
      </motion.div>

      <div className="inner-page__page-number">
        <span>07</span>
      </div>
    </div>
  )
}
