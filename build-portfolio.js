const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Experiment 4, 5, 6 are Express/EJS server apps — serve a static placeholder
const SERVER_ONLY_PLACEHOLDER = (expNum, title, description, tags) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Experiment ${expNum}: ${title} | Nexus Hub</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0f172a; color: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .blob { position: fixed; border-radius: 50%; filter: blur(80px); opacity: 0.3; }
        .blob-1 { width: 400px; height: 400px; background: #6366f1; top: -100px; right: -100px; }
        .blob-2 { width: 300px; height: 300px; background: #ec4899; bottom: -50px; left: -50px; }
        .glass { background: rgba(30,41,59,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 28px; padding: 3rem; max-width: 600px; width: 100%; }
        .badge-tag { background: rgba(99,102,241,0.2); border: 1px solid rgba(99,102,241,0.4); color: #a5b4fc; border-radius: 8px; padding: 4px 12px; font-size: 0.8rem; }
        .btn-home { background: linear-gradient(90deg, #6366f1, #ec4899); border: none; padding: 0.8rem 2rem; border-radius: 12px; font-weight: 700; color: white; text-decoration: none; display: inline-block; transition: 0.3s; }
        .btn-home:hover { transform: scale(1.04); color: white; }
        .exp-num { color: #6366f1; font-weight: 800; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; }
        .icon { font-size: 3rem; margin-bottom: 1rem; }
        code { background: rgba(99,102,241,0.15); padding: 2px 8px; border-radius: 6px; font-size: 0.85rem; color: #a5b4fc; }
    </style>
</head>
<body>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="glass text-center">
        <div class="icon">🖥️</div>
        <div class="exp-num mb-2">Experiment ${String(expNum).padStart(2,'0')}</div>
        <h1 class="fw-bold fs-2 mb-3">${title}</h1>
        <p class="text-muted mb-4">${description}</p>
        <div class="d-flex flex-wrap gap-2 justify-content-center mb-4">
            ${tags.map(t => `<span class="badge-tag">${t}</span>`).join('')}
        </div>
        <div class="p-3 mb-4 rounded-3 text-start" style="background: rgba(236,72,153,0.08); border: 1px solid rgba(236,72,153,0.2);">
            <p class="small mb-1" style="color:#f0abfc;">⚠️ Server-Side Application</p>
            <p class="text-muted small mb-0">This experiment runs on <code>Node.js / Express</code> and requires a live backend. It cannot be served as a static file.</p>
        </div>
        <a href="/" class="btn-home">← Back to Nexus Hub</a>
    </div>
</body>
</html>`;

const experiments = [
    { id: 1, type: 'static' },
    { id: 2, type: 'static' },
    { id: 3, type: 'vite', folder: '.' },   // Exp 3 is a Vite project at the root
    { id: 4, type: 'placeholder', title: 'Data Dashboard', description: 'A full-stack employee management system with EJS templating, Chart.js visualizations, and a MongoDB/PostgreSQL backend. Demonstrates MVC data flow with real database queries.', tags: ['Node.js', 'Express', 'EJS', 'Chart.js', 'MongoDB'] },
    { id: 5, type: 'placeholder', title: 'MVC Architecture', description: 'A student management platform built with the Model-View-Controller pattern using Express and EJS. Features include student CRUD operations, filtering, and server-rendered pages.', tags: ['MVC', 'Express', 'EJS', 'MongoDB', 'Server-Rendered'] },
    { id: 6, type: 'placeholder', title: 'API Integrations', description: 'A secure banking simulation with JWT authentication, account management, fund transfers, and an admin panel. Full REST API with role-based access control.', tags: ['JWT Auth', 'REST API', 'Express', 'MongoDB', 'RBAC'] },
    { id: 7, type: 'vite', folder: 'client' },
    { id: 8, type: 'vite', folder: 'client' },
    { id: 9, type: 'vite', folder: 'app' },
    { id: 10, type: 'vite', folder: 'client' }
];

async function build() {
    console.log('🚀 Starting Master Portfolio Build...\n');

    if (fs.existsSync(DIST_DIR)) fs.removeSync(DIST_DIR);
    fs.ensureDirSync(DIST_DIR);

    for (const exp of experiments) {
        const expPath = path.join(ROOT_DIR, `Experiment ${exp.id}`);
        const targetPath = path.join(DIST_DIR, `exp${exp.id}`);

        console.log(`📦 Processing Experiment ${exp.id} [${exp.type}]...`);

        if (exp.type === 'static') {
            fs.copySync(expPath, targetPath);
            console.log(`   ✅ Static files copied.\n`);
        }

        else if (exp.type === 'placeholder') {
            fs.ensureDirSync(targetPath);
            fs.writeFileSync(
                path.join(targetPath, 'index.html'),
                SERVER_ONLY_PLACEHOLDER(exp.id, exp.title, exp.description, exp.tags)
            );
            console.log(`   ✅ Placeholder page created.\n`);
        }

        else if (exp.type === 'vite') {
            const projectDir = exp.folder === '.'
                ? expPath
                : path.join(expPath, exp.folder);

            console.log(`   🔧 Installing dependencies in ${projectDir}...`);
            shell.cd(projectDir);
            if (shell.exec('npm install --prefer-offline --legacy-peer-deps').code !== 0) {
                console.warn(`   ⚠️  npm install had warnings (continuing)...`);
            }

            console.log(`   🛠  Building Vite project...`);
            if (shell.exec('npm run build').code !== 0) {
                console.error(`   ❌ Build FAILED for Experiment ${exp.id}! Skipping.`);
                shell.cd(ROOT_DIR);
                continue;
            }

            const buildOutput = path.join(projectDir, 'dist');
            fs.copySync(buildOutput, targetPath);
            shell.cd(ROOT_DIR);
            console.log(`   ✅ Build successful → /exp${exp.id}\n`);
        }
    }

    // Copy root gateway assets
    ['index.html', 'netlify.toml'].forEach(file => {
        const src = path.join(ROOT_DIR, file);
        if (fs.existsSync(src)) fs.copySync(src, path.join(DIST_DIR, file));
    });

    console.log('✨ Master Portfolio Build Complete!\nLocation: ./dist\n');
}

build().catch(err => { console.error('Build Error:', err); process.exit(1); });
