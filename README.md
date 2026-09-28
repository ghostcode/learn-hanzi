# 典雅汉字 · 字里乾坤

> 一个以「古典、高雅」为基调的汉字学习网站。按**常用字 / 非常用字 / 生僻字**分级，内置笔顺动画与释义，让识字如展卷。

---

## 简介

本项目为汉字学习而建，目标是把「认、读、写、解」融于一方宣纸之上：

- **分级字库**：常用字、非常用字、生僻字三类清晰分览。
- **笔顺动画**：基于 [HanziWriter](https://hanziwriter.org/) 演示正确笔画顺序，支持描红练习与重置。
- **字义详解**：拼音、部首、笔画、结构、释义、组词、成语一应俱全。
- **检索**：按汉字、拼音、释义模糊搜索，字字可寻。
- **古典美学**：宣纸底纹、墨色正文、朱砂印泥红印章、衬线楷书字体。

## 特性

| 能力 | 说明 |
| --- | --- |
| 三类分级 | 常用 3497 / 非常用 3486 / 生僻 53，合计 **7036** 字（零重复） |
| 笔顺演示 | 演示 / 描红 / 重置，缺笔顺数据自动降级为大字形 |
| 详情页 | 拼音 · 部首 · 笔画 · 结构 · 释义 · 组词 · 成语 · 上下字导航 |
| 分类分页 | 每页 120 字，支持上一页 / 下一页 / 页码跳转 |
| 检索 | 跨全部字库按字 / 拼音 / 释义模糊匹配 |
| 古典 UI | 宣纸纹理、墨色、朱砂印章，思源宋体 + 楷书字体 |

## 技术栈

- **框架**：[React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **路由**：react-router-dom v6
- **笔顺动画**：hanzi-writer v3（数据由其在浏览器端从 CDN 拉取）
- **数据**：本地静态数据集（无后端，纯前端 SPA）

## 目录结构

```
learn-hanzi/
├─ index.html              # 入口 HTML（含字体与元信息）
├─ vite.config.ts          # Vite 配置
├─ tsconfig.json           # TypeScript 配置
├─ public/
│  └─ seal.svg             # 朱砂印章装饰
├─ scripts/
│  └─ generate_data.py     # 字库数据管道（xls + 字典 → generated.json）
└─ src/
   ├─ main.tsx             # 应用入口
   ├─ App.tsx              # 路由与布局
   ├─ index.css            # 古典设计系统（全站样式）
   ├─ components/          # NavBar / CharacterCard / HanziWriterCard / SearchBar
   ├─ pages/               # HomePage / CategoryPage / DetailPage / SearchPage
   └─ data/
      ├─ types.ts          # 类型定义（Hanzi、Category）
      ├─ hanzi.ts          # 精选字库（手写三元组）+ 合并导出
      ├─ generated.ts      # 批量字库桥接（import generated.json）
      └─ generated.json    # 由字表烘焙生成（拼音/部首/笔画/释义）
```

## 快速开始

> 需 Node.js 18+ 环境。

```bash
# 1. 安装依赖
npm install

# 2. 本地开发（默认 http://localhost:5173）
npm run dev

# 3. 类型检查 + 生产构建（产物在 dist/）
npm run build

# 4. 本地预览构建产物（默认 http://localhost:4173）
npm run preview
```

## 数据来源与说明

字库由两部分合并而成：

1. **精选层**（`src/data/hanzi.ts`）：手工精选 247 字，释义 / 组词 / 成语完整，覆盖常用高频字与典雅文辞、三叠生僻字。
2. **批量层**（`src/data/generated.json`）：由用户提供的两份字表烘焙生成——
   - `3500常用汉字.xls` → 常用字
   - `7000通用汉字.xls` → 常用 3500 + 非常用 3500

批量字的拼音 / 部首 / 笔画 / 释义取自开源字典数据集 **chinese-xinhua**（约 1.6 万字），缺漏字（如「铝」）以 `pypinyin` / `cnradical` 兜底，详情页标「待补充」。

### 重新生成批量字库

数据管道脚本 `scripts/generate_data.py` 可复现上述过程。运行前需准备：

- `C:\Users\zhuxy607\Downloads\3500常用汉字.xls`
- `C:\Users\zhuxy607\Downloads\7000通用汉字.xls`
- 字典数据 `scripts/word.json`（可从 chinese-xinhua 仓库下载 `data/word.json`）
- Python 依赖：`pip install xlrd pypinyin cnradical`

```bash
python scripts/generate_data.py   # 重新生成 src/data/generated.json
```

> 注：批量字库已随仓库提供（`generated.json`），日常开发无需重新生成。

## 部署

纯静态站点，`npm run build` 后直接将 `dist/` 部署至任意静态托管（Vercel / Netlify / GitHub Pages / Nginx 等）。

## 注意事项

- **笔顺动画需联网**：HanziWriter 在浏览器端从 CDN 拉取字形笔顺数据；断网或 CDN 无某字数据时，自动降级为显示大字形，不致报错。
- **生僻字笔顺**：部分三叠 / 古字 CDN 无数据，仅展示字形。
- **打包体积**：当前 JS 包约 1MB（含字库数据，gzip 约 800KB）。如需首屏更快，可后续做数据懒加载 / 代码分割。

---

_以字载道，以字养心。_
