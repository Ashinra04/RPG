// Lógica da tela de Gears

window.atualizarSpritePreview = function() {
    const classe = document.getElementById("select-classe").value;
    const imgPreview = document.getElementById("personagem-preview");

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