const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const frontendSrc = path.join(rootDir, 'frontend');
const tempBuildDir = path.join(rootDir, 'rebuild_temp');
const targetDir = path.join(rootDir, 'mohalla-app');
const finalZip = path.join(rootDir, 'MahallaHub_Rebuilt_Perfect.zip');

function run(cmd, cwd) {
    console.log(`Running: ${cmd} (CWD: ${cwd})`);
    try {
        execSync(cmd, { cwd, stdio: 'inherit' });
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
}

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

// 1. Prepare temp directory
console.log('--- Step 1: Preparing temp directory ---');
if (fs.existsSync(tempBuildDir)) fs.rmSync(tempBuildDir, { recursive: true, force: true });
fs.mkdirSync(tempBuildDir, { recursive: true });

// Copy essential source (ignoring node_modules, out, .next)
console.log('--- Step 2: Copying source files ---');
const excludes = ['node_modules', 'out', '.next', 'rebuild_temp', 'mohalla-app', 'empty_dir'];
fs.readdirSync(frontendSrc).forEach(item => {
    if (!excludes.includes(item)) {
        fs.cpSync(path.join(frontendSrc, item), path.join(tempBuildDir, item), { recursive: true });
    }
});

// 3. Reinstall and Build
console.log('--- Step 3: Installing dependencies and building ---');
run('npm install --prefer-offline --no-audit --no-fund', tempBuildDir);
run('npm run build', tempBuildDir);

// 4. Transform and Move
console.log('--- Step 4: Transforming build to mohalla-app ---');
const outDir = path.join(tempBuildDir, 'out');
if (!fs.existsSync(outDir)) {
    console.error('CRITICAL: Build failed, no out folder found!');
    process.exit(1);
}

if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(outDir, targetDir, { recursive: true });

// Apply standard transformations
console.log('--- Step 5: Applying asset transformations ---');

// Rename _next to next
const oldNext = path.join(targetDir, '_next');
const newNext = path.join(targetDir, 'next');
if (fs.existsSync(oldNext)) {
    fs.renameSync(oldNext, newNext);
}

// Extract main.css
const chunksDir = path.join(newNext, 'static', 'chunks');
let mainCss = '';
if (fs.existsSync(chunksDir)) {
    const files = fs.readdirSync(chunksDir);
    const cssFile = files.find(f => f.endsWith('.css'));
    if (cssFile) {
        const content = fs.readFileSync(path.join(chunksDir, cssFile), 'utf8');
        fs.writeFileSync(path.join(targetDir, 'main.css'), content.replace(/\.\.\/media\//g, 'next/static/media/'));
        mainCss = 'main.css';
        console.log('Extracted main.css');
    }
}

// Relativize all links
walkDir(targetDir, (filePath) => {
    if (!filePath.endsWith('.html') && !filePath.endsWith('.js') && !filePath.endsWith('.css')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(targetDir, filePath);
    const depth = relPath.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : './';

    content = content.replace(/_next\//g, 'next/');
    content = content.replace(/\/+mahalla-app\/+/g, '/');
    content = content.replace(/\/+mohalla-app\/+/g, '/');

    content = content.replace(/([\"\'])\/next\//g, `$1${prefix}next/`);
    content = content.replace(/([\"\'])\/main\.css/g, `$1${prefix}main.css`);
    content = content.replace(/([\"\'])\/logo\.png/g, `$1${prefix}logo.png`);
    content = content.replace(/([\"\'])\/favicon\.ico/g, `$1${prefix}favicon.ico`);

    // Link main.css in HTML
    if (filePath.endsWith('.html') && mainCss) {
        content = content.replace(/href=\"[^\"]*?next\/static\/chunks\/[a-f0-9]+\.css\"/g, `href="${prefix}main.css"`);
    }

    // Dots and slashes cleanup
    content = content.replace(/\.{3,}/g, '..');
    content = content.replace(/\/\//g, '/').replace(/http:\//g, 'http://').replace(/https:\//g, 'https://');

    fs.writeFileSync(filePath, content, 'utf8');
});

// .htaccess
fs.writeFileSync(path.join(targetDir, '.htaccess'), `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /mohalla-app/
  RewriteRule ^next/(.*)$ next/$1 [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
<IfModule mod_mime.c>
  AddType text/css .css
  AddType application/javascript .js
</IfModule>
`);

// 6. Zip and Cleanup
console.log('--- Step 6: Finalizing package ---');
run(`powershell -Command "Compress-Archive -Path '${targetDir}\\*' -DestinationPath '${finalZip}' -Force"`, rootDir);
fs.rmSync(tempBuildDir, { recursive: true, force: true });

console.log(`REBUILD SUCCESSFUL: ${finalZip}`);
