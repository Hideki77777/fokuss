const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise0part-one.mp3');

function alterarContexto(contexto){
    botoes.forEach((botao) => {
        botao.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade, <br>
                <strong class="app__title-strong" > mergulhe no que importa! </strong>
            `;
            break;
        case 'descanso-curto': 
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
                <strong class="app__title-strong"> Faça uma pausa curta! </strong>
            `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície. 
            <strong  class="app__title-strong"git > Faça uma pausa longa.</strong>`;
            break;
    }
}

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});