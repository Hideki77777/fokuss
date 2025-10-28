const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const image = document.querySelector('.app__image');

focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
    image.setAttribute('src', '/imagens/foco.png');
});

curtoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
    image.setAttribute('src', '/imagens/descanso-curto.png');
});

longoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
    image.setAttribute('src', '/imagens/descanso-longo.png');
});



