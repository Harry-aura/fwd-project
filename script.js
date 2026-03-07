const appsList = ["Instagram", "Facebook", "Snapchat", "FreeFire", "PUBG", "TikTok", "YouTube"];

// --- INIT ---
window.onload = function() {
    const container = document.getElementById('app-selection');
    appsList.forEach(app => {
        container.innerHTML += `
            <div style="background:rgba(255,255,255,0.05); padding:10px; border:1px solid #333;">
                <label style="color:white; font-weight:bold;">
                    <input type="checkbox" id="chk-${app}" style="width:auto; margin-right:5px;"> ${app}
                </label>
                <input type="text" id="url-${app}" placeholder="Profile URL to Block" style="font-size:12px; padding:5px; margin-bottom:5px;">
                <div style="display:flex; gap:5px;">
                    <input type="number" id="allow-${app}" placeholder="Hrs Allow" style="font-size:12px; padding:5px; margin-bottom:0;">
                    <input type="number" id="block-${app}" placeholder="Hrs Block" style="font-size:12px; padding:5px; margin-bottom:0;">
                </div>
            </div>
        `;
    });
    
    // Fake Terminal Log Animation
    setInterval(() => {
        const log = document.getElementById('term-log');
        const msgs = ["SCANNING PROCESSES...", "OPTIMIZING MEMORY...", "NETWORK SECURE...", "DATA SYNCED...", "NO THREATS FOUND..."];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        log.innerHTML += `> ${msg} [${new Date().toLocaleTimeString()}]<br>`;
        log.scrollTop = log.scrollHeight;
    }, 2000);
};

// --- NAVIGATION ---
function switchView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(id).classList.add('active-view');
}

function toggleFullscreen() {
    const panel = document.getElementById('main-panel');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.log(e));
        panel.classList.add('fullscreen');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            panel.classList.remove('fullscreen');
        }
    }
}

// --- LOGIC ---
function register() {
    const u = document.getElementById('reg-name').value;
    const p = document.getElementById('reg-pass').value;
    if(!u || !p) return alert("MISSING DATA");

    const rules = [];
    appsList.forEach(app => {
        if(document.getElementById(`chk-${app}`).checked) {
            rules.push({
                name: app,
                url: document.getElementById(`url-${app}`).value,
                allow: document.getElementById(`allow-${app}`).value || 0,
                block: document.getElementById(`block-${app}`).value || 0
            });
        }
    });

    const user = {
        pass: p,
        grade: document.getElementById('reg-grade').value,
        goal: document.getElementById('reg-goal').value,
        rules: rules
    };
    
    localStorage.setItem(u, JSON.stringify(user));
    alert("CALIBRATION COMPLETE.");
    switchView('view-login');
}

function login() {
    const u = document.getElementById('log-user').value;
    const p = document.getElementById('log-pass').value;
    const data = JSON.parse(localStorage.getItem(u));

    if(data && data.pass === p) {
        // POPULATE DASHBOARD
        document.getElementById('dash-user').innerText = "OPERATOR: " + u.toUpperCase();
        document.getElementById('dash-goal').innerText = data.goal || "NO GOAL SET";
        document.getElementById('dash-grade').innerText = data.grade || "N/A";

        const appListDiv = document.getElementById('dash-apps-list');
        appListDiv.innerHTML = "";
        
        if(data.rules.length === 0) appListDiv.innerHTML = "<div style='padding:20px; color:#666;'>NO RESTRICTIONS APPLIED</div>";

        data.rules.forEach(r => {
            appListDiv.innerHTML += `
                <div class="app-row">
                    <div>
                        <b style="color:white; font-size:16px;">${r.name.toUpperCase()}</b>
                        <div style="font-size:10px; color:#888;">ALLOW: ${r.allow}H | BLOCK: ${r.block}H</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="color:var(--red); font-weight:bold;">LOCKED</span>
                        <div class="progress-bar"><div class="progress-fill" style="width:100%"></div></div>
                    </div>
                </div>
            `;
        });
        switchView('view-dash');
    } else {
        document.getElementById('msg-login').innerText = "AUTHENTICATION FAILED";
    }
}
function logout() {
    location.reload();
}