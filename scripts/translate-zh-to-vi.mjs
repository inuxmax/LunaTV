import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const INCLUDE_EXT = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.md', '.txt',
  '.yml', '.yaml', '.css', '.sh',
]);
const INCLUDE_FILES = new Set([
  'Dockerfile',
  'README.md',
]);
const IGNORE_DIRS = new Set([
  '.git', 'node_modules', '.next', 'dist', 'build', 'coverage', '.cursor',
]);

const hasHan = (s) => /[\p{Script=Han}]/u.test(s);
const cache = new Map();

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!IGNORE_DIRS.has(e.name)) await walk(p, out);
      continue;
    }
    const ext = path.extname(e.name);
    if (INCLUDE_EXT.has(ext) || INCLUDE_FILES.has(e.name)) out.push(p);
  }
  return out;
}

async function translateText(text) {
  if (!hasHan(text)) return text;
  if (cache.has(text)) return cache.get(text);
  async function requestTranslate(input) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=vi&dt=t&q=${encodeURIComponent(input)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`Translate failed: ${res.status}`);
    const data = await res.json();
    return (data?.[0] || []).map((x) => x?.[0] || '').join('') || input;
  }

  try {
    const translated = await requestTranslate(text);
    cache.set(text, translated);
    await new Promise((r) => setTimeout(r, 30));
    return translated;
  } catch {
    if (text.length < 8) return text;
    const chunks = text.split(/([，。！？；：\n])/u);
    if (chunks.length <= 1) {
      const mid = Math.floor(text.length / 2);
      chunks.splice(0, chunks.length, text.slice(0, mid), text.slice(mid));
    }
    let out = '';
    for (const c of chunks) out += await translateText(c);
    cache.set(text, out);
    return out;
  }
}

function collectSegments(content, filePath) {
  const segments = new Set();
  const ext = path.extname(filePath);
  const base = path.basename(filePath);
  const isDoc = ['.md', '.txt', '.yml', '.yaml'].includes(ext) || base === 'CHANGELOG' || base === 'Dockerfile';
  if (isDoc) {
    const m = content.match(/[^\n]*[\p{Script=Han}][^\n]*/gu) || [];
    for (const s of m) segments.add(s);
    return [...segments];
  }

  const patterns = [
    /\/\/[^\n]*[\p{Script=Han}][^\n]*/gu,
    /\/\*[\s\S]*?[\p{Script=Han}][\s\S]*?\*\//gu,
    /'([^'\\]|\\.)*[\p{Script=Han}]([^'\\]|\\.)*'/gu,
    /"([^"\\]|\\.)*[\p{Script=Han}]([^"\\]|\\.)*"/gu,
    /`([^`\\]|\\.)*[\p{Script=Han}]([^`\\]|\\.)*`/gu,
  ];
  for (const re of patterns) {
    const m = content.match(re) || [];
    for (const s of m) segments.add(s);
  }
  return [...segments];
}

async function processFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  if (!hasHan(raw)) return false;
  const segments = collectSegments(raw, filePath).filter(hasHan);
  if (segments.length === 0) return false;

  let next = raw;
  for (const seg of segments.sort((a, b) => b.length - a.length)) {
    const translated = await translateText(seg);
    if (translated !== seg) next = next.split(seg).join(translated);
  }

  if (next !== raw) {
    await fs.writeFile(filePath, next, 'utf8');
    return true;
  }
  return false;
}

const files = (await walk(ROOT)).filter((f) => {
  const rel = path.relative(ROOT, f).replaceAll('\\', '/');
  if (rel.startsWith('src/')) return true;
  if (rel === 'README.md') return true;
  return false;
});
const changed = [];
for (let i = 0; i < files.length; i += 1) {
  const f = files[i];
  console.log(`[${i + 1}/${files.length}] ${path.relative(ROOT, f)}`);
  try {
    const ok = await processFile(f);
    if (ok) changed.push(path.relative(ROOT, f));
  } catch (e) {
    console.error(`Failed ${f}:`, e.message);
  }
}
console.log(`Translated files: ${changed.length}`);
for (const f of changed) console.log(f);
