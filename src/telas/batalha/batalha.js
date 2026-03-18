// Tela de Batalha (Raid) JS

console.log("Tela de batalha carregada");

// ==========================================
// CONFIGURAÇÕES E DADOS (DATABASE)
// ==========================================
const monstros = {
    "Slime": { nome: "Slime", vida: 18, dano: 5, XP: 4, ouro: 5, sprite: '/imagens/monstros/slime.png' },
    "Aranha": { nome: "Aranha", vida: 30, dano: 8, XP: 12, ouro: 10, sprite: '/imagens/monstros/spider.png' },
    "Goblin": { nome: "Goblin", vida: 24, dano: 4, XP: 20, ouro: 15, sprite: '/imagens/monstros/goblinE.png' },
};

const cenarios = {
    "Floresta": { nivel: 1 },
    "Cavernas": { nivel: 5 },
    "Deserto": { nivel: 10 },
};

// ==========================================
// ESTADO DO JOGO (STATE)
// ==========================================
let monstrosAtual = null;
let QuantidadeMonstro = 1;
let numberAliados = null;
let turno = "plr"; // "plr" ou "mon"

// Variáveis de HP Global para os inimigos (atualizadas por nvlMonsters)
let nvlInimigo1 = 1, nvlInimigo2 = 1, nvlInimigo3 = 1;
let inimigoHP1 = 0, inimigoHP2 = 0, inimigoHP3 = 0;

// O player vem do main.js ou é definido aqui para teste
const player = window.player || {
    nome: "Player",
    vida: 32,
    vidaMax: 32,
    ataque: 6,
    mana: 15,
    level: 1,
    xp: 0,
    xpMax: 100,
    ouro: 0
};

// ==========================================
// LÓGICA DE GERAÇÃO (LOGIC)
// ==========================================

window.nvlMonsters = function () {
    // Pega o cenário atual (pode vir de uma variável global de mapa no futuro)
    const cenarioAtual = window.cenario || "Floresta";
    
    if (cenarioAtual === "Floresta") {
        nvlInimigo1 = Math.floor(Math.random() * 4) + 1;
        nvlInimigo2 = Math.floor(Math.random() * 4) + 1;
        nvlInimigo3 = Math.floor(Math.random() * 4) + 1;
    } else if (cenarioAtual === "Cavernas") {
        nvlInimigo1 = Math.floor(Math.random() * 5) + 5;
        nvlInimigo2 = Math.floor(Math.random() * 5) + 5;
        nvlInimigo3 = Math.floor(Math.random() * 5) + 5;
    }

    if (monstrosAtual) {
        inimigoHP1 = monstrosAtual.vidaBase + (20 * (nvlInimigo1 - 1));
        inimigoHP2 = monstrosAtual.vidaBase + (20 * (nvlInimigo2 - 1));
        inimigoHP3 = monstrosAtual.vidaBase + (20 * (nvlInimigo3 - 1));
    }
};

window.NumberMonstros = function () {
    QuantidadeMonstro = Math.floor(Math.random() * 3) + 1;
    // alert("Número de monstros gerados: " + QuantidadeMonstro);
};

// ==========================================
// INTERFACE (UI UPDATES)
// ==========================================

window.atualizarSpriteMonstro = function () {
    if (!monstrosAtual) return;
    const imagemCerta = monstros[monstrosAtual.nome].sprite;

    for (let i = 1; i <= 6; i++) {
        const img = document.getElementById("Preview-Inimigo" + i);
        if (img) img.src = imagemCerta;
    }
};

window.trocarClassDasDivs = function () {
    // Esconde todos primeiro
    for (let i = 2; i <= 3; i++) {
        document.getElementById("Pe" + i)?.classList.add("esconder");
        document.getElementById("EnemySprite" + i)?.classList.add("esconder");
    }

    // Mostra conforme a quantidade
    if (QuantidadeMonstro >= 2) {
        document.getElementById("Pe2")?.classList.remove("esconder");
        document.getElementById("EnemySprite2")?.classList.remove("esconder");
    }
    if (QuantidadeMonstro === 3) {
        document.getElementById("Pe3")?.classList.remove("esconder");
        document.getElementById("EnemySprite3")?.classList.remove("esconder");
    }
};

window.VerificarAliados = function () {
    // Lógica similar para aliados se houver no futuro
    if (numberAliados === 1) {
        document.getElementById("AliadoSprite")?.classList.remove("esconder");
        document.getElementById("Py2")?.classList.remove("esconder");
    } else if (numberAliados === 2) {
        document.getElementById("AliadoSprite")?.classList.remove("esconder");
        document.getElementById("AliadoSprite2")?.classList.remove("esconder");
        document.getElementById("Py2")?.classList.remove("esconder");
        document.getElementById("Py3")?.classList.remove("esconder");
    }
};

function atualizarInterfaceBatalha() {
    // Atualiza Player
    const divPlayerNome = document.getElementById('bar-nome-player');
    const divPlayerHP = document.getElementById("bar-life-player");
    const divPlayerMana = document.getElementById("bar-mana-player");

    if (divPlayerNome) {
        divPlayerNome.innerHTML = `
            <span class="u-nome">${player.nome}</span>
            <span class="u-label">Nível:</span>
            <span class="u-valor">${player.level}</span>
        `;
    }

    if (divPlayerHP) {
        divPlayerHP.innerHTML = `
            <span class="u-label">HP:</span>
            <span class="u-valor-hp">${player.vida}/${player.vidaMax}</span>
        `;
    }

    if (divPlayerMana) {
        divPlayerMana.innerHTML = `
            <span class="u-label">MANA:</span>
            <span class="u-valor-mana">${player.mana}/${player.mana || 15}</span>
        `;
    }

    // Atualiza Inimigos
    if (!monstrosAtual) return;

    for (let i = 1; i <= 3; i++) {
        const divEnemyNome = document.getElementById("NomeEnemy" + i);
        const divEnemyLevel = document.getElementById("LevelEnemy" + i);
        const divEnemyHP = document.getElementById("HPEnemy" + i);

        const nvl = (i === 1) ? nvlInimigo1 : (i === 2 ? nvlInimigo2 : nvlInimigo3);
        const hpAtual = monstrosAtual["hp" + i];
        const hpMax = monstrosAtual["hpMax" + i]; // Agora usa o valor salvo no início

        if (divEnemyNome) divEnemyNome.innerHTML = `<span class="e-nome">${monstrosAtual.nome}</span>`;
        if (divEnemyLevel) divEnemyLevel.innerHTML = `<span class="e-label">Nível:</span> <span class="e-valor">${nvl}</span>`;
        if (divEnemyHP) {
            divEnemyHP.innerHTML = `
                <span class="e-label">HP:</span> 
                <span class="e-valor-hp">${hpAtual}/${hpMax}</span>
            `;
        }
    }
}

// ==========================================
// FUNÇÕES DE AÇÃO (ACTIONS)
// ==========================================

window.entrarEmBatalha = function (nomeDoMonstro) {
    const monstroData = monstros[nomeDoMonstro];

    // Reset de estado da batalha
    monstrosAtual = {
        nome: nomeDoMonstro,
        vidaBase: monstroData.vida,
        ataque: monstroData.dano,
        XP: monstroData.XP,
        ouro: monstroData.ouro
    };

    turno = "plr";
    NumberMonstros();
    nvlMonsters();

    // Atribui HPs calculados ao objeto da batalha
    monstrosAtual.hp1 = inimigoHP1;
    monstrosAtual.hpMax1 = inimigoHP1;
    monstrosAtual.hp2 = inimigoHP2;
    monstrosAtual.hpMax2 = inimigoHP2;
    monstrosAtual.hp3 = inimigoHP3;
    monstrosAtual.hpMax3 = inimigoHP3;

    console.log(`Batalha iniciada contra ${QuantidadeMonstro}x ${nomeDoMonstro}`);

    // Atualiza Visual
    atualizarSpriteMonstro();
    trocarClassDasDivs();
    VerificarAliados();
    atualizarInterfaceBatalha();
};

window.atacar = function () {
    if (!monstrosAtual) return;

    if (turno === "plr") {
        // Por enquanto ataca o primeiro inimigo ativo
        let alvo = 1;
        console.log(`Você atacou o ${monstrosAtual.nome} ${alvo} com ${player.ataque} de dano!`);
        
        monstrosAtual["hp" + alvo] -= player.ataque;

        if (monstrosAtual["hp" + alvo] <= 0) {
            monstrosAtual["hp" + alvo] = 0;
            alert("Você derrotou o " + monstrosAtual.nome + "!");
            
            // Ganho de recompensa
            player.xp += monstrosAtual.XP;
            player.ouro += monstrosAtual.ouro;
            
            // Se derrotou o último/único monstro, volta
            if (QuantidadeMonstro === 1 || alvo === QuantidadeMonstro) {
                window.mudarTela('tela-batalha');
                return;
            }
        }

        atualizarInterfaceBatalha();
        turno = "mon";

        setTimeout(() => {
            monstroAtacar();
        }, 1000);
    }
};

window.monstroAtacar = function () {
    if (turno === "mon") {
        console.log("O " + monstrosAtual.nome + " atacou!");
        player.vida -= monstrosAtual.ataque;

        if (player.vida <= 0) {
            player.vida = 0;
            alert("VOCÊ MORREU!");
            // Lógica de Game Over aqui
        }

        atualizarInterfaceBatalha();
        turno = "plr";
    }
};

window.fugir = function () {
    let chance = Math.floor(Math.random() * 5) + 1;
    if (chance <= 3) {
        alert("Você fugiu com sucesso!");
        window.mudarTela('tela-batalha');
    } else {
        alert("Falha ao fugir!");
        turno = "mon";
        setTimeout(monstroAtacar, 1000);
    }
};

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    atualizarInterfaceBatalha();
});