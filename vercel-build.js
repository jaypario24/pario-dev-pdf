const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy package.json to dist
fs.copyFileSync('package.json', 'dist/package.json');

// Create a temporary package.json with correct dependencies
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Replace local file dependencies with npm versions
packageJson.dependencies = {
  ...packageJson.dependencies,
  "@pdfme/common": "^2.0.0", 
  "@pdfme/converter": "^2.0.0",
  "@pdfme/generator": "^2.0.0",
  "@pdfme/schemas": "^2.0.0",
  "@pdfme/ui": "^2.0.0",
  "@pdfme/manipulator": "^2.0.0"
};

// Save the modified package.json
fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));

// Run npm install in the dist directory
console.log('Installing dependencies in dist directory...');
execSync('npm install --production', { cwd: 'dist', stdio: 'inherit' });

// Clean up
console.log('Cleaning up...');
fs.unlinkSync('dist/package.json');