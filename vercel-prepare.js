const fs = require('fs');
const path = require('path');

// Read the package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Replace local file dependencies with npm versions
const dependencies = {
  ...packageJson.dependencies,
  "@pdfme/common": "2.0.0",
  "@pdfme/converter": "2.0.0",
  "@pdfme/generator": "2.0.0",
  "@pdfme/schemas": "2.0.0",
  "@pdfme/ui": "2.0.0",
  "@pdfme/manipulator": "2.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.18.0"
};

// Remove workspace-related configs
const tempPackageJson = {
  ...packageJson,
  dependencies,
  scripts: {
    ...packageJson.scripts,
    build: "vite build && npm run copy-vercel-config",
    "copy-vercel-config": "node -e \"require('fs').copyFileSync('vercel.json', 'dist/vercel.json')\""
  }
};

// Write the temporary package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(tempPackageJson, null, 2));

console.log('Package.json updated for Vercel deployment');