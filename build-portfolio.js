const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const experiments = [
    { id: 1, type: 'static' },
    { id: 2, type: 'static' },
    { id: 3, type: 'static' },
    { id: 4, type: 'static' },
    { id: 5, type: 'static' },
    { id: 6, type: 'static' },
    { id: 7, type: 'vite', folder: 'client' },
    { id: 8, type: 'vite', folder: 'client' },
    { id: 9, type: 'vite', folder: 'app' },
    { id: 10, type: 'vite', folder: 'client' }
];

async function build() {
    console.log('🚀 Starting Master Portfolio Build...');

    // 1. Cleanup
    if (fs.existsSync(DIST_DIR)) fs.removeSync(DIST_DIR);
    fs.ensureDirSync(DIST_DIR);

    // 2. Build/Copy Experiments
    for (const exp of experiments) {
        const expPath = path.join(ROOT_DIR, `Experiment ${exp.id}`);
        const targetPath = path.join(DIST_DIR, `exp${exp.id}`);
        
        console.log(`\n📦 Processing Experiment ${exp.id}...`);

        if (exp.type === 'static') {
            fs.copySync(expPath, targetPath);
            console.log(`   ✅ Static files copied.`);
        } else {
            const projectDir = path.join(expPath, exp.folder);
            console.log(`   🛠  Building Vite project in ${projectDir}...`);
            
            shell.cd(projectDir);
            if (shell.exec('npm run build').code !== 0) {
                console.error(`   ❌ Build failed for Experiment ${exp.id}`);
                continue;
            }
            
            const buildOutput = path.join(projectDir, 'dist');
            fs.copySync(buildOutput, targetPath);
            shell.cd(ROOT_DIR);
            console.log(`   ✅ Build successful and copied to /exp${exp.id}`);
        }
    }

    // 3. Copy Root Assets (Gateway)
    if (fs.existsSync(path.join(ROOT_DIR, 'index.html'))) {
        fs.copySync(path.join(ROOT_DIR, 'index.html'), path.join(DIST_DIR, 'index.html'));
    }
    
    if (fs.existsSync(path.join(ROOT_DIR, 'netlify.toml'))) {
        fs.copySync(path.join(ROOT_DIR, 'netlify.toml'), path.join(DIST_DIR, 'netlify.toml'));
    }

    console.log('\n✨ Master Portfolio Build Complete! ✨');
    console.log('Location: ./dist');
}

build().catch(err => console.error('Build Error:', err));
