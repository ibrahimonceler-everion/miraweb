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
        <h1>Mira Çenge | Yazar</h1>
        <p>Sözcüklerin kalbinde ipeksi bir sakinlik…</p>
      </header>
      <main>
        <p>Mira Çenge için edebiyat ruhun özgürce hayallerle buluştuğu bir sığınaktır. Sanatın estetik bakış açısı ve zarafetin büyüsü edebiyatla taçlanır. Edebiyat bizi anlamlı bir hayata davet eder. Sarıldığımız kelimeler, mısralar, cümleler bir pencere olur. Her söz bir nefes gibi kalbimizde derinlik ve mana sunar.</p>
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
        <h1>Mira Çenge | Yazar</h1>
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
        <h1>Mira Çenge | Yazar</h1>
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

  '/serbest': `
    <div class="seo-fallback">
      <header>
        <h1>Mira Çenge | Yazar</h1>
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
