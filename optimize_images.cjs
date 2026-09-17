const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'src', 'assets', 'images');
const files = fs.readdirSync(dir);

async function convert() {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const baseName = path.basename(file, ext);
      if (!baseName || baseName === 'combined') continue;
      
      const inputPath = path.join(dir, file);
      const stat = fs.statSync(inputPath);
      if (stat.size === 0) continue;

      const outputPath = path.join(dir, `${baseName}.webp`);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 88, effort: 6 })
          .toFile(outputPath);
        
        const newStat = fs.statSync(outputPath);
        console.log(`Converted: ${file} (${Math.round(stat.size/1024)}KB) -> ${baseName}.webp (${Math.round(newStat.size/1024)}KB)`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convert();
