// game.js

let player = {
    lvl: 1, xp: 0, xpProx: 100,
    forca: 5, poder: 5, sorte: 5, res: 5, vel: 5,
    hp: 50, hpMax: 50, pts: 0
};

let currentMob = null;
let inCombat = false;
let encounters = 0;

// Elementos da tela
const elements = {
    hp: document.getElementById('hp'),
    hpMax: document.getElementById('hpMax'),
    lvl: document.getElementById('lvl'),
    xp: document.getElementById('xp'),
    xpNext: document.getElementById('xpNext'),
    forca: document.getElementById('forca'),
    poder: document.getElementById('poder'),
    sorte: document.getElementById('sorte'),
    res: document.getElementById('res'),
    vel: document.getElementById('vel'),
    hpBar: document.getElementById('hpBar'),
    log: document.getElementById('log')
};

const btns = {
    explore: document.getElementById('exploreBtn'),
    attack: document.getElementById('attackBtn'),
    magic: document.getElementById('magicBtn'),
    flee: document.getElementById('fleeBtn')
};

function addLog(msg) {
    elements.log.innerHTML += `<br>${msg}`;
    elements.log.scrollTop = elements.log.scrollHeight;
}

function updateUI() {
    elements.hp.textContent = player.hp;
    elements.hpMax.textContent = player.hpMax;
    elements.lvl.textContent = player.lvl;
    elements.xp.textContent = player.xp;
    elements.xpNext.textContent = player.xpProx;
    elements.forca.textContent = player.forca;
    elements.poder.textContent = player.poder;
    elements.sorte.textContent = player.sorte;
    elements.res.textContent = player.res;
    elements.vel.textContent = player.vel;
    
    const percent = (player.hp / player.hpMax) * 100;
    elements.hpBar.style.width = percent + '%';
    if (percent < 30) elements.hpBar.style.background = '#ff4444';
    else if (percent < 60) elements.hpBar.style.background = '#ffaa44';
    else elements.hpBar.style.background = '#4caf50';
}

function setCombatMode(active) {
    inCombat = active;
    btns.explore.disabled = active;
    btns.attack.disabled = !active;
    btns.magic.disabled = !active;
    btns.flee.disabled = !active;
}

function rollD12() { return Math.floor(Math.random() * 12) + 1; }

// Monstros (mesma lista)
const mobs = [
    { nome: "Slime", forca: 3, poder: 2, res: 2, vel: 2, hp: 20, xp: 30, minLvl: 1 },
    { nome: "Lobo", forca: 5, poder: 3, res: 3, vel: 6, hp: 35, xp: 50, minLvl: 1 },
    { nome: "Orc", forca: 7, poder: 4, res: 6, vel: 3, hp: 55, xp: 80, minLvl: 2 },
    { nome: "Dragao", forca: 10, poder: 8, res: 7, vel: 5, hp: 90, xp: 150, minLvl: 3 }
];

function getMob() {
    const available = mobs.filter(m => m.minLvl <= player.lvl);
    const m = available[Math.floor(Math.random() * available.length)];
    return { ...m, hpAtual: m.hp };
}

function calcDmg(attacker, defender, type = "fisico") {
    let base = type === "fisico" ? attacker.forca + Math.floor(Math.random() * 6) : attacker.poder + Math.floor(Math.random() * 8);
    let reduction = defender.res / 5;
    return Math.max(1, Math.floor(base - reduction));
}

async function playerAttack(type) {
    let dmg = calcDmg(player, currentMob, type);
    currentMob.hpAtual -= dmg;
    addLog(`🗡️ Você causou ${dmg} de dano!`);
    
    if (currentMob.hpAtual <= 0) {
        addLog(`✅ Venceu! Ganhou ${currentMob.xp} XP`);
        player.xp += currentMob.xp;
        setCombatMode(false);
        currentMob = null;
        updateUI();
        await checkLevelUp();
        return;
    }
    
    // Monstro revida
    let mobDmg = calcDmg(currentMob, player);
    player.hp -= mobDmg;
    addLog(`👾 ${currentMob.nome} causou ${mobDmg} de dano!`);
    updateUI();
    
    if (player.hp <= 0) {
        addLog(`💀 Game Over! Você morreu...`);
        disableGame();
    }
}

async function tryFlee() {
    let roll = rollD12();
    let total = roll + player.sorte;
    addLog(`🎲 Sorte: ${roll} + ${player.sorte} = ${total}`);
    
    if (total > 15) {
        addLog(`🏃‍♂️ Fugiu do combate!`);
        setCombatMode(false);
        currentMob = null;
    } else {
        addLog(`😰 Falhou! O monstro ataca...`);
        let dmg = calcDmg(currentMob, player);
        player.hp -= dmg;
        addLog(`💥 Tomou ${dmg} de dano!`);
        updateUI();
        
        if (player.hp <= 0) {
            addLog(`💀 Game Over!`);
            disableGame();
        }
    }
}

async function checkLevelUp() {
    let leveled = false;
    while (player.xp >= player.xpProx) {
        player.lvl++;
        player.xp -= player.xpProx;
        player.xpProx = Math.floor(player.xpProx * 1.5);
        player.pts += 5;
        player.hpMax += 15;
        player.hp = player.hpMax;
        addLog(`🎉 SUBIU PARA NÍVEL ${player.lvl}! Ganhou 5 pontos!`);
        leveled = true;
    }
    if (leveled) {
        updateUI();
        await distributePoints();
    }
}

async function distributePoints() {
    while (player.pts > 0) {
        let opt = prompt(`Pontos restantes: ${player.pts}\nForça:${player.forca} Poder:${player.poder} Sorte:${player.sorte} Res:${player.res} Vel:${player.vel}\n\n1-Força 2-Poder 3-Sorte 4-Res 5-Vel`);
        if (opt === "1") { player.forca++; addLog("💪 +1 Força"); }
        else if (opt === "2") { player.poder++; addLog("🔮 +1 Poder"); }
        else if (opt === "3") { player.sorte++; addLog("🍀 +1 Sorte"); }
        else if (opt === "4") { player.res++; addLog("🛡️ +1 Resistência"); }
        else if (opt === "5") { player.vel++; addLog("⚡ +1 Velocidade"); }
        else continue;
        player.pts--;
        updateUI();
    }
}

async function explore() {
    if (inCombat) return;
    
    encounters++;
    addLog(`\n🏔️ Explorando (encontro ${encounters}/15)...`);
    
    let dice = rollD12();
    addLog(`🎲 Dado: ${dice}`);
    
    if (dice <= 4) {
        currentMob = getMob();
        addLog(`⚔️ Apareceu um ${currentMob.nome}! ⚔️`);
        setCombatMode(true);
        updateUI();
    } else if (dice <= 6) {
        let npcs = [
            { nome: "Velho", hp: 20, xp: 0, msg: "Tome uma poção!" },
            { nome: "Comerciante", hp: 0, xp: 40, msg: "Aceite isso!" }
        ];
        let n = npcs[Math.floor(Math.random() * npcs.length)];
        addLog(`👤 ${n.nome}: "${n.msg}"`);
        if (n.hp) { player.hp = Math.min(player.hp + n.hp, player.hpMax); addLog(`❤️ +${n.hp} HP`); }
        if (n.xp) { player.xp += n.xp; addLog(`✨ +${n.xp} XP`); }
        updateUI();
        await checkLevelUp();
    } else if (dice <= 9) {
        let loots = [
            { msg: "Poção +15 HP", hp: 15, xp: 0 },
            { msg: "Elixir +50 XP", hp: 0, xp: 50 }
        ];
        let l = loots[Math.floor(Math.random() * loots.length)];
        addLog(`🎁 ${l.msg}`);
        if (l.hp) player.hp = Math.min(player.hp + l.hp, player.hpMax);
        if (l.xp) player.xp += l.xp;
        updateUI();
        await checkLevelUp();
    } else {
        addLog(`🍃 Nada aconteceu...`);
        let heal = Math.floor(player.res / 3);
        player.hp = Math.min(player.hp + heal, player.hpMax);
        addLog(`💚 Descansou +${heal} HP`);
        updateUI();
    }
    
    if (encounters >= 15) {
        addLog(`🎉 PARABÉNS! Você completou 15 encontros e VENCEU O JOGO! 🎉`);
        disableGame();
    }
}

function disableGame() {
    btns.explore.disabled = true;
    btns.attack.disabled = true;
    btns.magic.disabled = true;
    btns.flee.disabled = true;
}

// Eventos
btns.explore.onclick = explore;
btns.attack.onclick = () => playerAttack("fisico");
btns.magic.onclick = () => playerAttack("magico");
btns.flee.onclick = tryFlee;

updateUI();
addLog("Clique em Explorar para começar sua jornada!");