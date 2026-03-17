// ==========================================
// SISTEMA DE TROCA EQUIVALENTE (LOJA DE TRAÇOS E MALDIÇÕES)
// ==========================================

const listaTracos = [
    { id: 1, nome: "Carga Pesada", valor: 4, tipo: "buff", icone: "🎒" },
    { id: 2, nome: "Pele de Ferro", valor: 2, tipo: "buff", icone: "🛡️" },
    { id: 3, nome: "Mente Rápida", valor: 1, tipo: "buff", icone: "🧠" }
];

const listaMaldicoes = [
    { id: 4, nome: "Fome Constante", valor: 4, tipo: "debuff", icone: "🍖" },
    { id: 5, nome: "Medo de Escuro", valor: 2, tipo: "debuff", icone: "🌑" },
    { id: 6, nome: "Perna Curta", valor: 1, tipo: "debuff", icone: "🦵" }
];

let buffsEscolhidos = [];
let debuffsEscolhidos = [];

function verificarPendencia() {
    let vB = buffsEscolhidos.map(b => b.valor);
    let vD = debuffsEscolhidos.map(d => d.valor);

    // Pareia os que possuem exatamente o mesmo valor
    for (let i = vB.length - 1; i >= 0; i--) {
        let idx = vD.indexOf(vB[i]);
        if (idx !== -1) {
            vB.splice(i, 1);
            vD.splice(idx, 1);
        }
    }

    // Se sobrar algum sem par, força o jogador a pegar um oposto de mesmo valor
    if (vB.length > 0) return { tipo: 'debuff', valorFaltando: vB[0] };
    if (vD.length > 0) return { tipo: 'buff', valorFaltando: vD[0] };

    return null; // Tudo equilibrado!
}

function renderizarLoja() {
    const divBuffs = document.getElementById('lista-buffs-disponiveis');
    const divDebuffs = document.getElementById('lista-maldicoes-disponiveis');
    if (!divBuffs || !divDebuffs) return;

    divBuffs.innerHTML = "";
    divDebuffs.innerHTML = "";

    let pendencia = verificarPendencia();

    function renderizarLista(lista, escolhidos, tipoPendente, divContainer) {
        lista.forEach(item => {
            let botao = document.createElement('button');
            botao.className = 'item-btn';
            botao.innerHTML = `<div class="item-icone">${item.icone}</div><div>${item.nome}</div><div>(${item.valor})</div>`;

            let bloqueado = false;
            if (escolhidos.includes(item)) {
                bloqueado = true; // Não pode escolher repetido idêntico
            } else if (pendencia) {
                if (pendencia.tipo === tipoPendente && item.valor === pendencia.valorFaltando) {
                    bloqueado = false;
                    botao.classList.add('destaque-pagamento');
                } else {
                    bloqueado = true;
                }
            } else if (escolhidos.length >= 4) {
                bloqueado = true;
            }

            botao.disabled = bloqueado;
            botao.onclick = () => {
                escolhidos.push(item);
                window.atualizarInterfaceTracos();
            };
            divContainer.appendChild(botao);
        });
    }

    renderizarLista(listaTracos, buffsEscolhidos, 'buff', divBuffs);
    renderizarLista(listaMaldicoes, debuffsEscolhidos, 'debuff', divDebuffs);
}

function desenharSlotsEscolhidos() {
    const slotBuffs = document.getElementById('slot-buffs');
    const slotDebuffs = document.getElementById('slot-debuffs');
    if (!slotBuffs || !slotDebuffs) return;

    slotBuffs.innerHTML = "";
    slotDebuffs.innerHTML = "";

    function renderizarSlots(escolhidos, slotContainer, tipoArrayConfig) {
        escolhidos.forEach(item => {
            let slot = document.createElement('div');
            slot.className = 'slot-item clicavel';
            slot.title = "Clique para remover";
            slot.innerHTML = item.icone;
            slot.onclick = () => {
                if (tipoArrayConfig === 'buffs') {
                    buffsEscolhidos = buffsEscolhidos.filter(b => b.id !== item.id);
                } else {
                    debuffsEscolhidos = debuffsEscolhidos.filter(d => d.id !== item.id);
                }
                window.atualizarInterfaceTracos();
            };
            slotContainer.appendChild(slot);
        });

        for (let i = escolhidos.length; i < 4; i++) {
            let slot = document.createElement('div');
            slot.className = 'slot-item';
            slotContainer.appendChild(slot);
        }
    }

    renderizarSlots(buffsEscolhidos, slotBuffs, 'buffs');
    renderizarSlots(debuffsEscolhidos, slotDebuffs, 'debuffs');
}

// Expõe a função globalmente para que o main.js consiga atualizar a interface ao mudar de tela
window.atualizarInterfaceTracos = function () {
    let pendencia = verificarPendencia();

    const balanco = document.getElementById('ponto-balanco');
    if (balanco) {
        if (pendencia) {
            balanco.innerText = "!";
            balanco.classList.add('devedor');
        } else {
            balanco.innerText = "OK";
            balanco.classList.remove('devedor');
        }
    }

    // Botão fica livre se tudo estiver equilibrado (Não há pendências)
    const btn = document.getElementById('btn-confirmar');
    if (btn) btn.disabled = (pendencia !== null);

    renderizarLoja();
    desenharSlotsEscolhidos();
};

window.salvarPersonagem = function () {
    window.heroi.passivas = buffsEscolhidos;
    window.heroi.debuffs = debuffsEscolhidos;

    console.log("Personagem Completo:", window.heroi);
    window.mudarTela('tela-jogo');
    document.getElementById('dialogo').innerText = `Bem-vindo, ${window.heroi.nome} o ${window.heroi.classe}! 
    Você começa a jornada em Arton com ${buffsEscolhidos.length} traço(s) e ${debuffsEscolhidos.length} maldição(ões).`;
};

document.addEventListener("DOMContentLoaded", () => {
    window.atualizarInterfaceTracos();
});
