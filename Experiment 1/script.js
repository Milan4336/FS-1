document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.experiment-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => {
                s.classList.remove('active');
                if (s.id === targetId) s.classList.add('active');
            });
        });
    });

    // --- Sub-Experiment 1.1: Registration Logic ---
    const regForm = document.getElementById('reg-form');
    const feedback = document.getElementById('form-feedback');

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        feedback.innerText = "✓ Registration successful! (Validated by HTML5)";
        regForm.reset();
        setTimeout(() => feedback.innerText = "", 3000);
    });

    // --- Sub-Experiment 1.2: Banking Logic ---
    let balance = 1000;
    const balanceEl = document.getElementById('balance');
    const amountInput = document.getElementById('amount');
    const historyList = document.getElementById('history-list');

    function updateUI() {
        balanceEl.innerText = `$${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    }

    function addHistory(type, amount) {
        const li = document.createElement('li');
        li.className = `history-item ${type}`;
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        li.innerHTML = `<span>${type.charAt(0).toUpperCase() + type.slice(1)}</span> <span>$${amount} (${time})</span>`;
        historyList.prepend(li);
        if (historyList.children.length > 5) historyList.lastChild.remove();
    }

    document.getElementById('deposit-btn').addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) return;
        balance += amount;
        updateUI();
        addHistory('deposit', amount);
        amountInput.value = "";
    });

    document.getElementById('withdraw-btn').addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) return;
        if (amount > balance) {
            alert("Insufficient funds!");
            return;
        }
        balance -= amount;
        updateUI();
        addHistory('withdrawal', amount);
        amountInput.value = "";
    });

    // --- Sub-Experiment 1.3: Admin Theme Logic ---
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('light-theme')) {
            themeBtn.innerText = "Switch to Dark";
        } else {
            themeBtn.innerText = "Switch to Light";
        }
    });

    // Initialize UI
    updateUI();
});
