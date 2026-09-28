import data from './generated.json'
import type { Row } from './hanzi'

/**
 * 由 scripts/generate_data.py 从「3500/7000 字表 + chinese-xinhua 开源字典」烘焙生成。
 * 仅含字表中有、但手工精选（hanzi.ts 中）未覆盖的批量条目。
 */
export const commonBulkRows: Row[] = data.common as unknown as Row[]
export const uncommonBulkRows: Row[] = data.uncommon as unknown as Row[]
