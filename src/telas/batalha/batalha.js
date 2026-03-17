// Tela de Batalha (Raid) JS

console.log("Tela de batalha carregada");

const monstros = {
    "Slime": { nome: "Slime", vida: 18, dano: 5, XP: 4, ouro: 5, sprite: '/imagens/monstros/slime.png' },
    "Aranha": { nome: "Aranha", vida: 30, dano: 8, XP: 12, ouro: 10, sprite: '/imagens/monstros/spider.png' },
    "Goblin": { nome: "Goblin", vida: 24, dano: 4, XP: 20, ouro: 15, sprite: '/imagens/monstros/goblinE.png' },
}

const player = {
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

let monstrosAtual = null;
let QuantidadeMonstro = null;
let numberAliados = null;

const cenarios = {
    "Floresta": { nivel: 1, },
    "Cavernas": { nivel: 5, },
    "Deserto": { nivel: 10, },
}

let nvlInimigo1 = null;
let nvlInimigo2 = null;
let nvlInimigo3 = null;

window.nvlMonsters = function () {

    if (cenario === "Floresta") {
        nvlInimigo1 = Math.floor(Math.random() * 4) + 1;
        nvlInimigo2 = Math.floor(Math.random() * 4) + 1;
        nvlInimigo3 = Math.floor(Math.random() * 4) + 1;
    }
    if (cenario === "Cavernas") {
        nvlInimigo1 = Math.floor(Math.random() * 5) + 5;
        nvlInimigo2 = Math.floor(Math.random() * 5) + 5;
        nvlInimigo3 = Math.floor(Math.random() * 5) + 5;
    }

    let inimigoHP1 = monstrosAtual.vida + (20 * (nvlInimigo1 - 1));
    let inimigoHP2 = monstrosAtual.vida + (20 * (nvlInimigo2 - 1));
    let inimigoHP3 = monstrosAtual.vida + (20 * (nvlInimigo3 - 1));
}

window.NumberMonstros = function () {
    QuantidadeMonstro = Math.floor(Math.random() * 3) + 1;
    alert("Número de monstros gerados: " + QuantidadeMonstro);
};

window.trocarClassDasDivs = function () {

    if (QuantidadeMonstro === 1) {
    }

    if (QuantidadeMonstro === 2) {
        const Enemy1 = document.getElementById("Pe2");
        const Enemy1Sprite = document.getElementById("EnemySprite2");
        Enemy1.classList.remove("esconder");
        Enemy1.classList.add("mostrar");
        Enemy1Sprite.classList.remove("esconder");
        Enemy1Sprite.classList.add("mostrar");
    }

    if (QuantidadeMonstro === 3) {
        const Enemy1 = document.getElementById("Pe2");
        const Enemy2 = document.getElementById("Pe3");
        const Enemy1Sprite = document.getElementById("EnemySprite2");
        const Enemy2Sprite = document.getElementById("EnemySprite3");
        Enemy1.classList.remove("esconder");
        Enemy1.classList.add("mostrar");
        Enemy2.classList.remove("esconder");
        Enemy2.classList.add("mostrar");
        Enemy1Sprite.classList.remove("esconder");
        Enemy1Sprite.classList.add("mostrar");
        Enemy2Sprite.classList.remove("esconder");
        Enemy2Sprite.classList.add("mostrar");
    }
};

window.VerificarAliados = function () {

    if (numberAliados === null) {
    }

    if (numberAliados === 1) {
        const Aliado1 = document.getElementById("AliadoSprite");
        Aliado1.classList.remove("esconder");
        Aliado1.classList.add("mostrar");
    }

    if (numberAliados === 2) {
        const Aliado1 = document.getElementById("AliadoSprite");
        const Aliado2 = document.getElementById("AliadoSprite2");
        Aliado1.classList.remove("esconder");
        Aliado1.classList.add("mostrar");
        Aliado2.classList.remove("esconder");
        Aliado2.classList.add("mostrar");
    }
};

window.atualizarSpriteMonstro = function () {
    const imagemCerta = monstros[monstrosAtual.nome].sprite;

    const img1 = document.getElementById("Preview-Inimigo1");
    const img2 = document.getElementById("Preview-Inimigo2");
    const img3 = document.getElementById("Preview-Inimigo3");
    const img4 = document.getElementById("Preview-Inimigo4");
    const img5 = document.getElementById("Preview-Inimigo5");
    const img6 = document.getElementById("Preview-Inimigo6");

    if (img1) img1.src = imagemCerta;
    if (img2) img2.src = imagemCerta;
    if (img3) img3.src = imagemCerta;
    if (img4) img4.src = imagemCerta;
    if (img5) img5.src = imagemCerta;
    if (img6) img6.src = imagemCerta;
};

window.entrarEmBatalha = function (nomeDoMonstro) {
    const monstro = monstros[nomeDoMonstro];

    monstrosAtual = {
        nome: nomeDoMonstro,
        vida: monstro.vida,
        vidaMax: monstro.vida,
        ataque: monstro.dano,
        nivel: monstro.nivel
    };

    console.log("Iniciando batalha contra: " + monstrosAtual.nome);

    atualizarSpriteMonstro();
    NumberMonstros();
    trocarClassDasDivs();
    VerificarAliados();

    // ==========================================
    // O LOOP MÁGICO (Reduzindo 60 linhas para 15)
    // ==========================================

    for (let i = 1; i <= 3; i++) {

        const divEnemyNome = document.getElementById("NomeEnemy" + i);
        const divEnemyLevel = document.getElementById("LevelEnemy" + i);
        const divEnemyHP = document.getElementById("HPEnemy" + i);

        if (divEnemyNome) {
            divEnemyNome.innerHTML = `
                <span style="color: #53dd5fff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
                    ${monstrosAtual.nome}
                </span>`;
        }

        if (divEnemyLevel) {
            divEnemyLevel.innerHTML = `
                <span style="color: #0f0f0fff; font-size: 16px; font-weight: bold; margin-right: 8px;">
                    Nível: 
                </span>
                <span style="color: #53dd5fff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
                    ${monstrosAtual.nivel}
                </span>`;
        }

        if (divEnemyHP) {
            divEnemyHP.innerHTML = `
                <span style="color: #0f0f0fff; font-size: 16px; font-weight: bold; margin-right: 8px;">
                    HP: 
                </span>
                <span style="color: #53dd5fff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
                    ${monstrosAtual.vida}/${monstrosAtual.vidaMax}
                </span>`;
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const divPlayerNome = document.getElementById('bar-nome-player');
    const divPlayerHP = document.getElementById("bar-life-player");
    const divPlayermana = document.getElementById("bar-mana-player");

    if (divPlayerHP) {
        const player_batle = {
            vida: player.vida,
            vidaMax: player.vida,
            ataque: player.ataque,
            mana: player.mana,
            manaMax: player.mana,
            level: player.level
        }

        divPlayerNome.innerHTML = `
         <span style="color: #313531ff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;  margin-right: 8px;">
            ${player.nome}
        </span>
        <span style="color: #0f0f0fff; font-size: 16px; font-weight: bold; margin-right: 8px;">
            Nivel: 
        </span>
         <span style="color: #191b1aff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
            ${player.level}
        </span>
    `;

        divPlayerHP.innerHTML = `
        <span style="color: #0f0f0fff; font-size: 16px; font-weight: bold; margin-right: 8px;">
            HP: 
        </span>
         <span style="color: #53dd5fff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
            ${player_batle.vida}/${player_batle.vidaMax}
        </span>
    `;
        if (divPlayermana) {
            divPlayermana.innerHTML = `
            <span style="color: #0f0f0fff; font-size: 16px; font-weight: bold; margin-right: 8px;">
                MANA:
            </span>
            <span style="color: #4da6ff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
                ${player_batle.mana}/${player_batle.manaMax}
            </span>
    `;
        }
    }
});

let turno = "plr";

function atualizarTelaBatalha() {
    const divEnemyHP = document.getElementById("HPEnemy1");

    if (divEnemyHP && monstrosAtual) {
        divEnemyHP.innerHTML = `
        <span style="color: #0f0f0fff; font-size: 16px; font-weight: bold; margin-right: 8px;">
            HP: 
        </span>
         <span style="color: #ff4c4c; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
            ${monstrosAtual.vida}/${monstrosAtual.vidaMax}
        </span>
        `;
    }
}

function atualizarTelaBatalhaMonstro() {
    const divPlayerHP = document.getElementById("bar-life-player");
    if (divPlayerHP) {
        divPlayerHP.innerHTML = `
        <span style="color: #0f0f0fff; font-size: 16px; font-weight: bold; margin-right: 8px;">
            HP: 
        </span>
         <span style="color: #53dd5fff; font-size: 16px; font-weight: bold; -webkit-text-stroke: 1px black;">
            ${player.vida}/${player.vidaMax}
        </span>
    `;
    }
    turno = "plr";
}

window.atacar = function () {
    if (monstrosAtual === null) {
        console.log("Não tem nenhum monstro aqui!");
        return;
    }

    if (turno === "plr") {
        console.log("Você atacou o " + monstrosAtual.nome + " com " + player.ataque + " de dano!");
        monstrosAtual.vida -= player.ataque;

        if (monstrosAtual.vida <= 0) {
            monstrosAtual.vida = 0;
            alert("Você derrotou o " + monstrosAtual.nome + "!");
            // AQUI VOCÊ GANHA XP E FECHA A TELA DE BATALHA NO FUTURO
            player.xp += monstrosAtual.XP;
            player.ouro += monstrosAtual.ouro;
            window.mudarTela('tela-batalha');
            return;
        }

        atualizarTelaBatalha();
        turno = "mon";

        setTimeout(() => {
            monstroAtacar();
        }, 1000);
    }
};

window.monstroAtacar = function () {
    if (turno === "mon") {
        console.log("O " + monstrosAtual.nome + " atacou e causou " + monstrosAtual.ataque + " de dano!");
        player.vida -= monstrosAtual.ataque;

        if (player.vida < 0) {
            player.vida = 0;
            alert("VOCÊ MORREU!");
        }

        atualizarTelaBatalhaMonstro();
    }
};

window.fugir = function () {
    let chance = Math.floor(Math.random() * 5) + 1;
    if (chance <= 3) {
        alert("Você fugiu do " + monstrosAtual.nome + "!");
        window.mudarTela('tela-batalha');
    } else {
        alert("Você não conseguiu fugir do " + monstrosAtual.nome + "!");
        turno = "mon";

        setTimeout(() => {
            monstroAtacar();
        }, 1000);
    }
};