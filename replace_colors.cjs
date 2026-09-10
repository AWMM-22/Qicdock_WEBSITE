const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const replacements = [
    // Backgrounds (Dark -> Beige)
    [/#080808/g, '#F4F0E6'],
    [/#121212/g, '#FAF7F0'],
    [/#0a0a0a/g, '#FAF7F0'],
    [/#0c0c0c/g, '#FAF7F0'],
    [/#0a0d14/g, '#FAF7F0'],
    [/#121824/g, '#FAF7F0'],
    [/#050505/g, '#EBE5D9'],
    [/\bbg-black\b/g, 'bg-[#EBE5D9]'], 
    
    // Accents (Cyan -> Navy)
    [/#04D9FF/g, '#0A1E3F'],
    
    // Borders (Dark -> Beige/Tan)
    [/#1a1a1a/g, '#E2DAC8'],
    [/#1f1f1f/g, '#E2DAC8'],
    [/#262626/g, '#E2DAC8'],
    [/#222222/g, '#E2DAC8'],
    [/\[#222\]/g, '[#E2DAC8]'],
    [/\[#333\]/g, '[#D6CDB8]'],
    [/\[#444\]/g, '[#D6CDB8]'],
    
    // Text Colors (Light -> Dark)
    [/\btext-white\b/g, 'text-[#0A1E3F]'],
    [/\btext-\[#E2E8F0\]/g, 'text-[#1A2C4F]'],
    [/\btext-\[#080808\]/g, 'text-[#F4F0E6]'],
    [/\btext-gray-200\b/g, 'text-gray-800'],
    [/\btext-gray-300\b/g, 'text-gray-700'],
    [/\btext-gray-400\b/g, 'text-gray-600'],
    [/\btext-gray-500\b/g, 'text-gray-600'],
    [/\bhover:text-white\b/g, 'hover:text-[#0A1E3F]'],
    
    // White backgrounds -> Navy variants
    [/\bbg-white\b/g, 'bg-[#152B52]'],
    [/\bhover:bg-white\b/g, 'hover:bg-[#152B52]'],
    
    // rgba for WebkitTextStroke
    [/rgba\(255,255,255,/g, 'rgba(10,30,63,'],
  ];

  let newContent = content;
  for (const [regex, replacement] of replacements) {
    newContent = newContent.replace(regex, replacement);
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

function walkSync(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      replaceInFile(filePath);
    }
  }
}

walkSync('./src');
console.log("Done.");
