const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read the package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Replace local file dependencies with npm versions
const dependencies = {
  ...packageJson.dependencies,
  "@pdfme/common": "^2.0.0",
  "@pdfme/converter": "^2.0.0",
  "@pdfme/generator": "^2.0.0", 
  "@pdfme/schemas": "^2.0.0",
  "@pdfme/ui": "^2.0.0",
  "@pdfme/manipulator": "^2.0.0"
};

// Create a temporary package.json for deployment
const tempPackageJson = {
  ...packageJson,
  dependencies,
  workspaces: packageJson.workspaces // Preserve the workspaces configuration
};

// Write the temporary package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(tempPackageJson, null, 2));

// Build the packages
console.log('Building packages...');
execSync('npm run build:common', { stdio: 'inherit' });
execSync('npm run build:converter', { stdio: 'inherit' });
execSync('npm run build:schemas', { stdio: 'inherit' });
execSync('npm run build:generator', { stdio: 'inherit' });
execSync('npm run build:ui', { stdio: 'inherit' });
execSync('npm run build:manipulator', { stdio: 'inherit' });

console.log('Package.json updated for Vercel deployment');