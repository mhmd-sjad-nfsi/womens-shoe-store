const fs = require('fs');
const path = require('path');

const outputFile = 'all_project_code.txt';
const ignoredDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.turbo', 'coverage'];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        walkDir(filepath, callback);
      }
    } else {
      callback(filepath);
    }
  });
}

const output = [];

walkDir('.', (filepath) => {
  const relativePath = path.relative('.', filepath);
  const ext = path.extname(filepath);
  const isTextFile = ['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css', '.env', '.md'].includes(ext);
  if (isTextFile) {
    const content = fs.readFileSync(filepath, 'utf8');
    output.push(`\n\n--- FILE: ${relativePath} ---\n\n${content}`);
  }
});

fs.writeFileSync(outputFile, output.join('\n'), 'utf8');
console.log(`✅ کدهای پروژه در فایل '${outputFile}' ذخیره شد.`);
