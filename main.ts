const fs = require('node:fs');
const path = require('node:path');

// Entry for make.fun news-image-20261123: the front page image for
// Monday, 23 November 2026 lives in this repo as entry.png; the program
// copies it to the grader's output dir as entry.png.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const src = path.join(__dirname, 'entry.png');
const dst = path.join(outDir, 'entry.png');
fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(src, dst);
// Self-check: the gate needs a PNG of at most 1 MiB, so confirm the copy.
const buf = fs.readFileSync(dst);
const isPng = buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
if (!isPng || buf.length > 1048576) {
  throw new Error('entry.png failed its self-check (not a PNG or over 1 MiB)');
}
console.log('wrote ' + dst + ' (' + buf.length + ' bytes, PNG)');
