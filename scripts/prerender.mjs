/**
 * Static SEO pre-renderer for Vercel deployment.
 * Injects meaningful HTML content into <div id="root"> so that
 * search engine crawlers see real text instead of an empty shell.
 * React will hydrate/replace this content on the client side.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const seoContent = {
  '/': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Şair ve Yazar</h1>
        <p>Sözcüklerin kalbinde ipeksi bir sakinlik…</p>
      </header>
      <main>
        <p>Mira Çenge, Türk edebiyatında özgün bir ses olan şair ve yazardır. Mira Çenge için edebiyat ruhun özgürce hayallerle buluştuğu bir sığınaktır. Sanatın estetik bakış açısı ve zarafetin büyüsü edebiyatla taçlanır. Edebiyat bizi anlamlı bir hayata davet eder. Sarıldığımız kelimeler, mısralar, cümleler bir pencere olur. Her söz bir nefes gibi kalbimizde derinlik ve mana sunar.</p>
        <p>Çağları aşan bu his Mira Çenge'nin edebiyat resitalini oluşturur.</p>
        <nav>
          <ul>
            <li><a href="/yazilar">Yazılar</a></li>
            <li><a href="/siirler">Şiirler</a></li>
            <li><a href="/serbest">Düşünceler</a></li>
          </ul>
        </nav>
        <footer>
          <a href="https://www.instagram.com/mira.edebiyat/">@mira.edebiyat</a>
        </footer>
      </main>
    </div>
  `,

  '/yazilar': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Şair ve Yazar</h1>
        <h2>Yazılar</h2>
        <p>Kalbin mürekkebiyle yazılmış satırlar</p>
      </header>
      <main>
        <article>
          <p>Yaşamak nedir diye sorsalar önce hürriyet derim sonra hakikat… Her insan özgür bir ruhla doğar. Hakikatlerle büyür. Hakikatin ışığı ile yolunu çizer. Hakikat her insan için farklıdır.</p>
          <p>Peki bu yaşam yolculuğunu çizerken hangi kavram bize yön verir? Kilit nokta tam olarak burada… Hayatımızı yönlendirirken bize rehberlik eden bir fikir, bir cümle belki de bir felsefe öğretisi.</p>
          <p>Yaşamımıza kaynaklık eden bu fikir kalbimizden mi aklımızdan mı geliyor? Bunlar basit bir cümle gibi görünse de aslında bir kilidi açabilecek anahtar… Bu anahtara sahip olabilmek için neler yapabiliriz cümlesi akla geliyor. Bunlar yaşam yolculuğumuzun bir parçası…</p>
          <p>Hayat bir ağacın dalları gibi gelişip büyürken her gün yeni bir yaprak… Filizlenen yaprakları büyütmek ve yaşatmak bizim elimizde…</p>
          <p>Hakikat seçimler ve tercihler bütünüyle şekilleniyor. İşte tam da bu sonuç bizim gerçeğimiz oluyor. Kalbimizin ve aklımızın bizi getirdiği nokta yaşamımızı oluşturuyor.</p>
          <p>Ekilen her tohum büyüyor, bir mahsul olarak bize sunuluyor. Bu dengeyi anlayıp kurduğumuz da tüm taşlar yerine oturuyor…</p>
          <p>Kitabım yaşamı anlamlandırma serüveninde bize yeni bir soluk kazandırmak için yola çıktı. Yazım sürecimin ilk kitabına siz değerli okurlarıma teşekkür ederek başlıyorum… Kitabımda edebiyatın zarif çizgisi ile yaşamın ruhunu yakalamak üzere bir yolculuğa davet ediyorum sizleri…</p>
          <p>Bir sayfada, bir cümlede, bir kelimede buluşmak umuduyla…</p>
          <footer><strong>Mira Çenge</strong></footer>
        </article>
      </main>
      <nav><a href="/">Ana Sayfa</a></nav>
    </div>
  `,

  '/siirler': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Şair ve Yazar</h1>
        <h2>Şiirler</h2>
        <p>Kelimelerin dansettiği sessiz sahneler</p>
      </header>
      <main>
        <article>
          <h3>Düş</h3>
          <p>Soluduğum düşlerimin kıyısında<br>Erdemli bir hayat duruyordu<br>Minör satırlara hapsolmuş<br>Majör zamanlar yaşıyorduk seninle…</p>
          <p>Anlamını aradığımız cümlelere<br>Yeni manalar yüklüyorduk<br>Zamanın ötesinde<br>İstanbul'da bir bayram sabahıydı…</p>
          <footer>— Mira Çenge</footer>
        </article>
        <article>
          <h3>Zaman</h3>
          <p>Ben koşuyorum<br>Kendi yarışımda kimseyle yarışmıyorum<br>Erenköy'de gözyaşım aktıysa<br>Beşiktaş'ta gülümsüyorum</p>
          <p>Zamanla savaşmıyorum<br>Sonunu bildiğim hikayeleri<br>Aslında ben yazıyorum<br>Sevgiye ve mutluluğa<br>Kalbimle gülümsüyorum…</p>
          <footer>— Mira Çenge</footer>
        </article>
      </main>
      <nav><a href="/">Ana Sayfa</a></nav>
    </div>
  `,

  '/oduller': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Şair ve Yazar</h1>
        <h2>Ödüller</h2>
        <p>Kelimelerin onurlandığı anlar</p>
      </header>
      <main>
        <article>
          <h3>12. Uluslararası Başarı ve Kariyer Ödülleri - Yılın En İyi Çıkış Yapan Kadın Yazar</h3>
          <p>Ben Mira Çenge… Edebiyat benim için bir tutku… Yaşamı dizelerde ve satırlarda yaşamaya küçük yaşlarda karar verdim. Bu da beni tutkunu olduğum "Türk Dili ve Edebiyatı" alanında eğitim almaya yöneltti. Ve minnettarım ki bu alanda öğretmen olabilme fırsatını buldum.</p>
          <p>Şimdi ise satırların ve dizelerin büyüsünde can bulan kelimelere sahibim. Amacım edebiyatseverlerle bir şiirin dizesinde, bir kitabın satırında buluşmak…</p>
          <p>Kelimelerin bir çağın soluğu olduğuna inanan herkes adına bu ödülü büyük bir onur ve zarafetle kabul ediyorum.</p>
          <p>Ben kelimelerin izini sürmeye devam edeceğim çünkü, bazı hikayeler ancak yolda tamamlanır…</p>
          <footer><strong>Mira Çenge</strong></footer>
        </article>
      </main>
      <nav><a href="/">Ana Sayfa</a></nav>
    </div>
  `,

  '/soylesi': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Şair ve Yazar</h1>
        <h2>Röportaj</h2>
        <p>Kelimelerin ardındaki ses</p>
      </header>
      <main>
        <article>
          <p>Ödüllü yazar Mira Çenge ile sizin için konuştuk. Gazeteci yazar Cihat Dündar'ın sorularını yanıtlayan Mira Çenge, yazarlık kariyerini ve yakında okuyucu ile buluşacak olan eseri ile ilgili merak edilenleri anlattı.</p>
          <h3>Mira Çenge kendi içinde kimdir?</h3>
          <p>Ben kendi içimde kelimelerle düşünen, duygularla büyüyen ve hayata anlam arayan bir yolcuyum. Yazmak benim için sadece bir meslek ya da üretim biçimi değil; insan ruhuna dokunmanın en zarif yollarından biri. Mira Çenge kendi içinde; güçlü görünse de kalbinde hâlâ hayalleriyle konuşan o küçük kız çocuğunu taşıyan biridir.</p>
          <h3>Eseriniz hakkında</h3>
          <p>Yakın zamanda okuyucuyla buluşacak olan eserim, aslında hayata dair uzun yıllar içimde biriktirdiğim düşüncelerin ve gözlemlerin bir yansıması. Eserimi, yaşamın güzelliği üzerine kurulmuş modern bir manifesto olarak tanımlayabilirim. Okuyucu yalnızca satırlarla değil, kendi iç dünyasıyla da karşılaşacak.</p>
          <h3>Yılın İlham Veren Kadın Yazarı ödülü</h3>
          <p>Altın Zirve ve Kariyer Ödülleri'nde "Yılın İlham Veren Kadın Yazarı" ödülünü almak benim için yalnızca bir başarı değil, aynı zamanda çok derin bir manevi anlam taşıyan özel bir yolculuğun karşılığıydı. Bu ödül benim için bir son değil; tam aksine daha büyük hayallerin başlangıcı. Benim en büyük hedefim; yıllar sonra bile bir cümleyle bir insanın kalbinde yaşamaya devam edebilmek.</p>
          <footer><strong>Röportaj: Cihat Dündar</strong></footer>
        </article>
      </main>
      <nav><a href="/">Ana Sayfa</a></nav>
    </div>
  `,

  '/biyografi': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Şair ve Yazar</h1>
        <h2>Biyografi</h2>
        <p>Sezgisel bir dokunuş, hissel bir karşılaşma…</p>
      </header>
      <main>
        <article>
          <p>Boğaz'ın hafızasını taşıyan Beykoz'da başlayan bir hayat, zamanla kelimelerin ve insanların hikâyelerine yöneldi. Çocukluk yıllarında dalga sesleriyle kurulan o görünmez bağ, edebiyatın sesine dönüştü; denizin ufkunda aranan anlam, zamanla insan ruhunun hikâyesinde karşılık buldu.</p>
          <p>Türk Dili ve Edebiyatı öğretmeni, yazar ve şair olan Mira Çenge, kalemi yalnızca anlatmak için değil; anlamak, hissetmek ve hissettirmek için kullanmaktadır. Onun dünyasında edebiyat, insan ruhları arasında kurulan en zarif temaslardan biridir. Şiirleri ve seslendirmeleriyle kelimelere yalnızca anlam değil, duygu da kazandırmaktadır.</p>
          <p>Mira Çenge'nin kalemini, duruşunu ve insanlara yaklaşımını şekillendiren iki değer vardır: zarafet ve nezaket.</p>
          <p>Meslek yaşamı boyunca gençlerin gelişimine katkı sunarken, özel eğitim alanındaki çalışmalarıyla özel bireylerin hayatlarına dokunmuş; toplumsal sorumluluğu bireysel başarının önünde tutmuştur. Kadınların güçlenmesine ve toplumsal dayanışmaya duyduğu inanç, çalışmalarına olduğu kadar eserlerine de yansımaktadır. Edebiyat, eğitim ve sosyal sorumluluk alanlarında ortaya koyduğu çalışmalar; Altın Zirve Kariyer Ödülleri'nde "Yılın İlham Veren Kadın Yazarı", Uluslararası Kariyer Ödülleri'nde ise "Yılın En İyi Çıkış Yapan Yazarı" unvanlarıyla takdir edilmiştir.</p>
          <p>Kalp hafızasına inanan Mira Çenge için insanı insan yapan şey, hatırladıkları değil; kalbinde yaşatmayı seçtikleridir. Sevgiyle söylenen bir söz, iyilikle dokunulan bir hayat ve samimiyetle kurulan bir bağ… Zamanın silemediği bütün güzellikler, onun satırlarında yeniden hayat bulur.</p>
          <p>Kelimelerinin sınırları aşarak farklı coğrafyalardaki insanlara ulaşmasını ve umuda ihtiyaç duyan her kalbe dokunmasını amaçlayan Mira Çenge için edebiyat, zamana bırakılmış zarif bir izdir; yıllar sonra bile bir kalpte yeniden çiçek açabilen bir iz…</p>
          <p>Boğaz'ın kıyılarında başlayan bu hikâye, bugün Mira Çenge'nin kaleminde; insan ruhuna umut, kalplere sevgi ve zamana iz bırakma yolculuğu olarak devam etmektedir.</p>
          <footer><strong>Mira Çenge</strong></footer>
        </article>
      </main>
      <nav><a href="/">Ana Sayfa</a></nav>
    </div>
  `,

  '/serbest': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Şair ve Yazar</h1>
        <h2>Düşünceler</h2>
        <p>Zamansız düşünceler, sınırsız kelimeler</p>
      </header>
      <main>
        <article>
          <p>Nasıl bir yaşam? Bir idealler sarmalı mı? Yoksa bir boşlukta yuvarlanan taş gibi yaşamak mı? Dengeyi bulan rölantide ilerleyen bir hayat mı? Kendimizi tanıma süreci bu soruların da cevabını bulmamızı sağlayacaktır.</p>
          <p>Bu süreçte cevaba bizi ulaştıracak önemli bir soru da "Neyi özlüyoruz?" sorusudur. İnsan özlemlediği bazı duygu, durum ya da zamana aittir… Belki geçmişi, belki geleceği, belki de yaşayamadığımız tüm anlar bütününü özleriz…</p>
          <p>Özlemimiz ruhsal olarak yakın bulduğumuz temalara bizi yaklaştırır. Gözlerimizi kapattığımızda kendimizi nerede hissediyoruz? Burası nasıl bir yer? Burada olma amacımız ne?</p>
          <p>Her zaman dört duvar arasında geçen bir hayatın aslında tek ihtiyacının yemyeşil bir bahçe olduğunu düşünelim. O bahçeye kavuşamadan geçen zaman ziyan değil midir?</p>
          <p>Oysa ki bahçeyi bulan ruh tamamlanmış hissedecektir. Herkesin ruhuna uygun bir yer mutlaka vardır. Önemli olan bunun tespitidir.</p>
          <footer><strong>Mira Çenge</strong></footer>
        </article>
      </main>
      <nav><a href="/">Ana Sayfa</a></nav>
    </div>
  `,
}

function prerender() {
  console.log('\n🔍 Pre-rendering pages for SEO...\n')

  const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

  for (const [route, content] of Object.entries(seoContent)) {
    // Inject SEO content into the root div
    const html = baseHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${content.trim()}</div>`
    )

    // Determine output path
    const outputDir = route === '/'
      ? distDir
      : join(distDir, route.slice(1))

    if (route !== '/') {
      mkdirSync(outputDir, { recursive: true })
    }

    writeFileSync(join(outputDir, 'index.html'), html, 'utf-8')
    console.log(`  ✓ ${route === '/' ? '/index.html' : `${route}/index.html`}`)
  }

  console.log(`\n✅ Pre-rendered ${Object.keys(seoContent).length} pages!\n`)
}

prerender()
