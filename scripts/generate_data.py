#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把 3500/7000 字表 + 开源字典(chinese-xinhua) 烘焙为网站批量数据 generated.json"""
import xlrd, json, re, os
from pypinyin import pinyin, Style
from cnradical import Radical, RunOption

# 部首兜底（chinese-xinhua 字表有缺漏，用 cnradical 补部首）
_rd = Radical([RunOption.Radical])

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F3500 = r"C:\Users\zhuxy607\Downloads\3500常用汉字.xls"
F7000 = r"C:\Users\zhuxy607\Downloads\7000通用汉字.xls"
DICT = os.path.join(ROOT, "scripts", "word.json")
OUT = os.path.join(ROOT, "src", "data", "generated.json")
HANZI_TS = os.path.join(ROOT, "src", "data", "hanzi.ts")

# ---------- 1) 字典 ----------
with open(DICT, encoding="utf-8") as f:
    word = json.load(f)
dmap = {}
for r in word:
    c = r.get("word")
    if c and c not in dmap:
        dmap[c] = r

# ---------- 2) 读取字表 ----------
def read_xls(path, col, encoding=None):
    wb = xlrd.open_workbook(path, encoding_override=encoding)
    sh = wb.sheets()[0]
    out = []
    for r in range(1, sh.nrows):
        v = sh.cell_value(r, col)
        v = str(v).strip()
        if v:
            out.append(v)
    return out

common3500 = read_xls(F3500, 0)            # 单列 hz
all7000 = read_xls(F7000, 1, encoding="gbk")  # 双列 xh,hz

# ---------- 3) 现有精选字（避免重复）----------
with open(HANZI_TS, encoding="utf-8") as f:
    src = f.read()
curated = set(re.findall(r"^\s*\['([\u4e00-\u9fff])',", src, re.M))

# ---------- 4) 计算批量集合 ----------
common_set = set(common3500)
bulk_common = [c for c in common3500 if c not in curated]
bulk_uncommon = [c for c in all7000 if c not in curated and c not in common_set]

# ---------- 5) 生成行 ----------
def norm_pinyin(py):
    if not py:
        return ""
    py = py.replace("\u0261", "g").replace("\u0260", "G")  # ɡ/ɠ -> g/G
    toks = py.split()
    return toks[0].strip() if toks else py.strip()

def clean_meaning(expl):
    if not expl:
        return []
    lines = [l.strip() for l in expl.replace("\r", "\n").split("\n")]
    lines = [l for l in lines if l]
    lines = [(l[:50] + "…") if len(l) > 50 else l for l in lines]
    return lines[:6]

def make_row(c):
    rec = dmap.get(c)
    if rec:
        py = norm_pinyin(rec.get("pinyin", ""))
        rad = (rec.get("radicals") or "").strip()
        try:
            st = int(str(rec.get("strokes", "")).strip())
        except Exception:
            st = 0
        meanings = clean_meaning(rec.get("explanation", ""))
    else:
        py, rad, st, meanings = "", "", 0, []
    if not py:
        try:
            py = pinyin(c, style=Style.TONE, heteronym=False)[0][0]
        except Exception:
            py = ""
    if not rad:
        try:
            r = _rd.trans_ch(c)
            rad = r if isinstance(r, str) and r else "—"
        except Exception:
            rad = "—"
    return [c, py, rad, st, "", meanings, [], []]

common_rows = [make_row(c) for c in bulk_common]
uncommon_rows = [make_row(c) for c in bulk_uncommon]

with open(OUT, "w", encoding="utf-8") as f:
    json.dump({"common": common_rows, "uncommon": uncommon_rows},
              f, ensure_ascii=False, separators=(",", ":"))

# ---------- 6) 统计 ----------
missing = [c for c in bulk_common + bulk_uncommon if c not in dmap]
print("common3500:", len(common3500), "| bulk_common:", len(bulk_common))
print("all7000:", len(all7000), "| bulk_uncommon:", len(bulk_uncommon))
print("curated:", len(curated))
print("dict coverage missing:", len(missing), missing[:30])
print("generated.json size(KB):", round(os.path.getsize(OUT) / 1024, 1))
