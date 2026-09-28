export type Category = 'common' | 'uncommon' | 'rare'

export interface Hanzi {
  /** 汉字本身 */
  char: string
  /** 拼音（含声调） */
  pinyin: string
  /** 部首 */
  radical: string
  /** 笔画数 */
  strokes: number
  /** 字形结构：独体 / 左右 / 上下 / 包围 / 品字 等 */
  structure: string
  /** 释义（可多条） */
  meanings: string[]
  /** 组词 / 常用搭配 */
  words: string[]
  /** 成语或典故（可选） */
  idioms?: string[]
  /** 所属分类 */
  category: Category
}

export interface CategoryMeta {
  key: Category
  title: string
  subtitle: string
  description: string
  /** 印章配色 */
  accent: string
  /** 难度提示 */
  level: string
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  common: {
    key: 'common',
    title: '常用字',
    subtitle: '日用所及 · 百姓口中',
    description: '最常用的基础汉字，日用起居、书报文辞之中最常见，是为识字之根基。',
    accent: '#9e2b25',
    level: '入门',
  },
  uncommon: {
    key: 'uncommon',
    title: '非常用字',
    subtitle: '典雅生辉 · 文辞所尚',
    description: '日常较少出现，却常见于诗词文章、姓名雅号之中，意境悠远，最见文心。',
    accent: '#3f6b5e',
    level: '进阶',
  },
  rare: {
    key: 'rare',
    title: '生僻字',
    subtitle: '三叠叠字 · 字书奇珍',
    description: '极为罕见的三叠字与古字，多为会意，一字之中藏着天地万象，识之者寡。',
    accent: '#7a5b9e',
    level: '探奇',
  },
}
