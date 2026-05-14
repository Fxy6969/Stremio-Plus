const fs = require('fs');
const path = require('path');

// Copy .html and .js files from src/components/** to dist/components/**
function copyFiles(srcDir, destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    
    const items = fs.readdirSync(srcDir);
    
    items.forEach(item => {
        const srcPath = path.join(srcDir, item);
        const destPath = path.join(destDir, item);
        
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) {
            copyFiles(srcPath, destPath);
        } else if (stat.isFile() && !srcPath.endsWith('.ts')) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} to ${destPath}`);
        }
    });
}

// Copy the 'version' file from the root directory
const versionFileSrc = path.join(__dirname, 'version');
const versionFileDest = path.join(__dirname, 'dist', 'version');

if (fs.existsSync(versionFileSrc)) {
    fs.copyFileSync(versionFileSrc, versionFileDest);
    console.log(`Copied: ${versionFileSrc} to ${versionFileDest}`);
} else {
    console.log('No version file found in the root directory.');
}

// Copy the UI panel script
const panelSrc  = path.join(__dirname, 'src/ui/panel.js');
const panelDest = path.join(__dirname, 'dist/ui/panel.js');
if (!fs.existsSync(path.dirname(panelDest))) fs.mkdirSync(path.dirname(panelDest), { recursive: true });
if (fs.existsSync(panelSrc)) {
    fs.copyFileSync(panelSrc, panelDest);
    console.log(`Copied: ${panelSrc} to ${panelDest}`);
}

const srcDir  = 'src/ui/components';
const destDir = 'dist/ui/components';

copyFiles(srcDir, destDir);