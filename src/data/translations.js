export const translations = {
  tr: {
    cover: {
      title: 'Mira Çenge',
      motto: 'Sözcüklerin kalbinde ipeksi bir sakinlik \u2026',
      bio: 'Mira Çenge için edebiyat ruhun özgürce hayallerle buluştuğu bir sığınaktır. Sanatın estetik bakış açısı ve zarafetin büyüsü edebiyatla taçlanır. Edebiyat bizi anlamlı bir hayata davet eder. Sarıldığımız kelimeler, mısralar, cümleler bir pencere olur. Her söz bir nefes gibi kalbimizde derinlik ve mana sunar.',
      bioSecond: 'Çağları aşan bu his Mira Çenge\u2019nin edebiyat resitalini oluşturur.',
    },
    starMap: {
      writings: 'Yazılar',
      poetry: 'Şiirler',
      thoughts: 'Düşünceler',
    },
  },
  en: {
    cover: {
      title: 'Mira Çenge',
      motto: 'A silken calm in the heart of words \u2026',
      bio: 'For Mira Çenge, literature is a sanctuary where the soul freely meets its dreams. The aesthetic gaze of art and the enchantment of grace are crowned through literature. Literature invites us to a life of meaning. The words, verses, and sentences we embrace become a window. Each word, like a breath in our hearts, offers depth and significance.',
      bioSecond: 'This timeless feeling composes the literary recital of Mira Çenge.',
    },
    starMap: {
      writings: 'Writings',
      poetry: 'Poetry',
      thoughts: 'Reflections',
    },
  },
}

export function t(lang, path) {
  const keys = path.split('.')
  let result = translations[lang]
  for (const key of keys) {
    result = result?.[key]
  }
  return result ?? path
}
