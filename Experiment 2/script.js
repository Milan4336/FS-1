document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.experiment-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');

            // Update Nav UI
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update Sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // --- Sub-Experiment 2.1: Character Counter ---
    const textarea = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const progressFill = document.getElementById('progress');
    const MAX_CHARS = 500;

    textarea.addEventListener('input', () => {
        const text = textarea.value;
        const length = text.length;
        
        // Update counts
        charCount.innerText = length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCount.innerText = words;

        // Update progress bar
        const percentage = Math.min((length / MAX_CHARS) * 100, 100);
        progressFill.style.width = `${percentage}%`;

        // Visual feedback if limit reached
        if (length > MAX_CHARS) {
            progressFill.style.background = 'var(--secondary)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary))';
        }
    });

    // --- Sub-Experiment 2.2: Product Filter ---
    const products = [
        { name: 'Neural Processor', category: 'tech', price: '$499' },
        { name: 'Quantum Watch', category: 'tech', price: '$299' },
        { name: 'Aero Sneakers', category: 'lifestyle', price: '$120' },
        { name: 'Minimalist Journal', category: 'lifestyle', price: '$25' },
        { name: 'VR Brush', category: 'creative', price: '$89' },
        { name: 'Synth Keyboard', category: 'creative', price: '$199' },
        { name: 'E-Ink Tablet', category: 'tech', price: '$350' },
        { name: 'Holographic Lamp', category: 'lifestyle', price: '$75' }
    ];

    const grid = document.getElementById('product-grid');
    const filterSelect = document.getElementById('category-filter');

    function renderProducts(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <span class="category-badge">${product.category.toUpperCase()}</span>
                <h3>${product.name}</h3>
                <p style="color: var(--text-muted); font-weight: 600;">${product.price}</p>
            `;
            grid.appendChild(card);
        });
    }

    filterSelect.addEventListener('change', (e) => {
        renderProducts(e.target.value);
    });

    renderProducts(); // Initial render

    // --- Sub-Experiment 2.3: SVG Drawing Tool ---
    const svg = document.getElementById('drawing-canvas');
    const colorInput = document.getElementById('stroke-color');
    const widthInput = document.getElementById('stroke-width');
    const clearBtn = document.getElementById('clear-canvas');
    const downloadBtn = document.getElementById('download-svg');

    let drawing = false;
    let currentPath = null;

    function getMousePos(evt) {
        const CTM = svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    svg.addEventListener('mousedown', (e) => {
        drawing = true;
        const pos = getMousePos(e);
        
        currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        currentPath.setAttribute('fill', 'none');
        currentPath.setAttribute('stroke', colorInput.value);
        currentPath.setAttribute('stroke-width', widthInput.value);
        currentPath.setAttribute('stroke-linecap', 'round');
        currentPath.setAttribute('stroke-linejoin', 'round');
        currentPath.setAttribute('d', `M ${pos.x} ${pos.y}`);
        
        svg.appendChild(currentPath);
    });

    svg.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        const pos = getMousePos(e);
        const d = currentPath.getAttribute('d');
        currentPath.setAttribute('d', `${d} L ${pos.x} ${pos.y}`);
    });

    window.addEventListener('mouseup', () => {
        drawing = false;
    });

    clearBtn.addEventListener('click', () => {
        const paths = svg.querySelectorAll('path');
        paths.forEach(p => p.remove());
    });

    downloadBtn.addEventListener('click', () => {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "my-sketch.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
});
