import './style.css';

// ==========================================
// ESTADO DO JOGO (STATE)
// ==========================================
const heroi = {
    nome: "",
    classe: "",
    pontosDisponiveis: 0,
    passivas: [],
    debuffs: []
};

window.heroi = heroi;

// Imports das Telas Específicas
import './telas/tracos-maldicoes/tracos-maldicoes.css';
import './telas/tracos-maldicoes/tracos-maldicoes.js';

import './telas/loja/loja.css';
import './telas/loja/loja.js';
import lojaHtml from './telas/loja/loja.html?raw';

import './telas/batalha/batalha.css';
import './telas/batalha/batalha.js';
import batalhaHtml from './telas/batalha/batalha.html?raw';

import './telas/inventario/inventario.css';
import './telas/inventario/inventario.js';
import inventarioHtml from './telas/inventario/inventario.html?raw';

// Injeção dos templates HTML
const cb = document.getElementById('container-batalha');
if (cb) cb.outerHTML = batalhaHtml;

const cl = document.getElementById('container-loja');
if (cl) cl.outerHTML = lojaHtml;

const ci = document.getElementById('container-inventario');
if (ci) ci.outerHTML = inventarioHtml;

import './telas/inventario/gears/gears.css';
import './telas/inventario/gears/gears.js';
import gearsHtml from './telas/inventario/gears/gears.html?raw';

const cg = document.getElementById('container-gears');
if (cg) cg.outerHTML = gearsHtml;

import './telas/inventario/skills/skills.css';
import './telas/inventario/skills/skills.js';
import skillsHtml from './telas/inventario/skills/skills.html?raw';

const cs = document.getElementById('container-skills');
if (cs) cs.outerHTML = skillsHtml;

import './telas/missao/missao.css';
import './telas/missao/missao.js';
import missaoHtml from './telas/missao/missao.html?raw';

import './telas/mapa/mapa.css';
import './telas/mapa/mapa.js';
import mapaHtml from './telas/mapa/mapa.html?raw';

const cm = document.getElementById('container-missao');
if (cm) cm.outerHTML = missaoHtml;

const cma = document.getElementById('container-mapa');
if (cma) cma.outerHTML = mapaHtml;

// ==========================================
// NAVEGAÇÃO E VALIDAÇÕES INICIAIS
// ==========================================
window.mudarTela = function (idParaMostrar) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => tela.classList.add('oculto'));

    const proximaTela = document.getElementById(idParaMostrar);
    if (proximaTela) {
        proximaTela.classList.remove('oculto');

        // Se a tela aberta for a de traços, atualiza a interface da loja
        if (idParaMostrar === 'tela-tracos-mmaldiçoes' && window.atualizarInterfaceTracos) {
            window.atualizarInterfaceTracos();
        }
    } else {
        console.error("A tela " + idParaMostrar + " não foi encontrada!");
    }
};

window.prosseguirParaTracos = function () {
    const nomeSelecionado = document.getElementById("input-nome").value;
    const classeSelecionada = document.getElementById("select-classe").value;

    if (nomeSelecionado.trim() === "") {
        alert("Por favor, escolha um nome para o seu herói!");
        return;
    }

    window.heroi.nome = nomeSelecionado;
    window.heroi.classe = classeSelecionada;

    window.mudarTela('tela-tracos-mmaldiçoes');
};

window.atualizarSpritePreview = function() {
    const classe = document.getElementById("select-classe").value;
    const imgPreview = document.getElementById("sprite-preview");

    // Mapeia a classe para o caminho da imagem
    const sprites = {
        'guerreiro': '/imagens/Sprites/knight_front.png',
        'mago': '/imagens/Sprites/wizard_front.png',
        'arqueiro': '/imagens/Sprites/archer_front.png'
    };

    // Troca a imagem
    if (sprites[classe]) {
        imgPreview.src = sprites[classe];
    }
};

// Chame uma vez ao carregar para garantir que o sprite inicial apareça
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("select-classe")) {
        window.atualizarSpritePreview();
    }
});