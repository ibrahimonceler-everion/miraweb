import { useState } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import PageLogo from '../components/PageLogo'
import './InnerPage.css'

const dek =
  'Ödüllü yazar Mira Çenge ile sizin için konuştuk. Gazeteci yazar Cihat Dündar’ın sorularını yanıtlayan Mira Çenge, yazarlık kariyerini ve yakında okuyucu ile buluşacak olan eseri ile ilgili merak edilenleri anlattı. İnsanın insana iyi gelmesi gerektiğine olan inancını kalemine de yansıttığını dile getiren Çenge, alanında layık görüldüğü ödül ile ilgili duygularını da paylaştı. İşte keyifli sohbetimiz.'

const qa = [
  {
    q: 'Sizi güçlü kaleminiz ve ödülleriniz ile büyük bir kitle tanıyor. Peki siz kendinizi nasıl tanımlarsınız? Mira Çenge kendi içinde kimdir?',
    a: [
      'Ben kendi içimde kelimelerle düşünen, duygularla büyüyen ve hayata anlam arayan bir yolcuyum. Yazmak benim için sadece bir meslek ya da üretim biçimi değil; insan ruhuna dokunmanın en zarif yollarından biri. Bu yüzden kendimi, çağın karmaşası içinde inceliği, vicdanı ve umudu korumaya çalışan bir kalem olarak görüyorum.',
      'Mira Çenge kendi içinde; güçlü görünse de kalbinde hâlâ hayalleriyle konuşan o küçük kız çocuğunu taşıyan biridir. Boğaz’ın kıyısında denize bakıp hayaller kuran, bir cümlenin insan hayatını değiştirebileceğine inanan biri… Belki de bugün yazdığım her şeyin temelinde, insanın insana iyi gelmesi gerektiğine olan inancım var.',
    ],
  },
  {
    q: 'Yakın zamanda kitabınız okuyucu ile buluşacak. Eserinizden biraz bahseder misiniz?',
    a: [
      'Yakın zamanda okuyucuyla buluşacak olan eserim, aslında hayata dair uzun yıllar içimde biriktirdiğim düşüncelerin ve gözlemlerin bir yansıması. Türkiye’nin seçkin ve çok tercih edilen yayınevlerinden biriyle son derece titiz bir süreç yürütüyoruz. Kitabın yalnızca içeriği değil; kapağından sayfa tasarımına, dokusundan estetik diline kadar her ayrıntısı büyük bir özenle hazırlanıyor. Çünkü ben bir kitabın sadece okunmasını değil, hissedilmesini de çok önemsiyorum.',
      'Eserimi, yaşamın güzelliği üzerine kurulmuş modern bir manifesto olarak tanımlayabilirim. İçinde insanın kendine, hayata, değişime, cesarete, sevgiye ve anlam arayışına dair birçok kavram yer alıyor. Okuyucu yalnızca satırlarla değil, kendi iç dünyasıyla da karşılaşacak. Bazı sayfalarda kendini bulacak, bazı cümlelerde uzun zamandır cevap aradığı duygularla yüzleşecek.',
    ],
  },
  {
    q: 'Altın Zirve ve Kariyer Ödülleri’nde Yılın İlham Veren Kadın Yazarı ödülünü aldınız. Biraz duygularınızı alabilir miyiz?',
    a: [
      'Altın Zirve ve Kariyer Ödülleri’nde “Yılın İlham Veren Kadın Yazarı” ödülünü almak benim için yalnızca bir başarı değil, aynı zamanda çok derin bir manevi anlam taşıyan özel bir yolculuğun karşılığıydı. Büyük bir gurur ve onur hissettim. Çünkü insan, kalbinden çıkan cümlelerin başka kalplere ulaştığını gördüğünde, emeğin gerçekten görünür olduğuna inanıyor.',
      'O gece sahnede hissettiğim şey sadece mutluluk değildi… İçimde, yıllardır kelimelere tutunarak büyüyen hayallerimin sessizce bana gülümsediğini hissettim. Yazmaya inandığım, vazgeçmediğim, bazen yalnızca iç sesime güvenerek yürüdüğüm tüm yollar gözümün önünden geçti.',
      'Bu ödül benim için bir son değil; tam aksine daha büyük hayallerin başlangıcı. Bundan sonra da kalemiyle insan ruhuna dokunan, umut veren ve iz bırakan eserler üretmek istiyorum. Çünkü ben edebiyatın yalnızca bir sanat değil, aynı zamanda insanı iyileştiren güçlü bir ışık olduğuna inanıyorum.',
    ],
  },
]

const pullQuote =
  'Benim en büyük hedefim; yıllar sonra bile bir cümleyle bir insanın kalbinde yaşamaya devam edebilmek.'

export default function RoportajPage({ onBack }) {
  const [clipVisible, setClipVisible] = useState(true)

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
        <h2 className="inner-page__title">Röportaj</h2>
        <p className="inner-page__subtitle">
          Kelimelerin ardındaki ses
        </p>
        <div className="inner-page__title-rule" />
      </motion.div>

      <motion.div
        className="roportaj-meta"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="roportaj-meta__role">Röportaj</span>
        <span className="roportaj-meta__name">Cihat Dündar</span>
      </motion.div>

      <motion.div
        className="roportaj-content"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <p className="roportaj-dek">{dek}</p>

        {clipVisible && (
          <figure className="roportaj-clip">
            <div className="roportaj-clip__frame">
              <img
                src="/roportaj.webp"
                alt="Mira Çenge ile dergi röportajı"
                loading="lazy"
                onError={() => setClipVisible(false)}
              />
              <div className="roportaj-clip__overlay" />
            </div>
            <figcaption className="roportaj-clip__caption">
              Dergi röportajından bir kare
            </figcaption>
          </figure>
        )}

        <div className="roportaj-qa">
          {qa.map((item, i) => (
            <div key={i}>
              <motion.div
                className="roportaj-block"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              >
                <div className="roportaj-q">
                  <span className="roportaj-q__label">Soru</span>
                  <p className="roportaj-q__text">{item.q}</p>
                </div>
                <div className="roportaj-a">
                  {item.a.map((p, j) => (
                    <p
                      key={j}
                      className={
                        i === 0 && j === 0
                          ? 'roportaj-a__dropcap'
                          : 'roportaj-a__paragraph'
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>

              {i === 1 && (
                <motion.blockquote
                  className="roportaj-pullquote"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                >
                  <span className="roportaj-pullquote__mark">&ldquo;</span>
                  <p className="roportaj-pullquote__text">{pullQuote}</p>
                  <cite className="roportaj-pullquote__cite">Mira Çenge</cite>
                </motion.blockquote>
              )}
            </div>
          ))}
        </div>

        <div className="yazilar-prose__signature">
          <div className="yazilar-prose__signature-line" />
          <span>Mira Çenge</span>
        </div>
      </motion.div>

      <div className="inner-page__page-number">
        <span>06</span>
      </div>
    </div>
  )
}
