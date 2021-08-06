let botaoAlterarHumor = document.querySelector('#alterar-humor');
let numeroBotao = botaoAlterarHumor.value;
let fotoHumor = document.querySelector('#humor-foto');
let mensagemHumor = document.querySelector('#humor-mensagem');

botaoAlterarHumor.addEventListener('click', () => {
    let sorteio = getRandomInt(1, 9);
    while(sorteio == numeroBotao){
        sorteio = getRandomInt(1, 9);
    }
    numeroBotao = sorteio;
    if(numeroBotao == 1) {
        fotoHumor.src = './assets/img/fleabag-feliz.jpg';
        fotoHumor.alt = 'Foto da Fleabag sorrindo';
        mensagemHumor.innerHTML = 'sorridente';
    } else if(numeroBotao == 2) {
        fotoHumor.src = './assets/img/fleabag-confusa.jpg';
        fotoHumor.alt = 'Foto da Fleabag com cara de quem está confusa';
        mensagemHumor.innerHTML = 'confusa';
    } else if(numeroBotao == 3) {
        fotoHumor.src = './assets/img/fleabag-pensativa.jpg';
        fotoHumor.alt = 'Foto da Fleabag olhando para o lado com cara de quem está pensando';
        mensagemHumor.innerHTML = 'pensativa';
    } else if(numeroBotao == 4){
        fotoHumor.src = './assets/img/fleabag-rabugenta.jpg';
        fotoHumor.alt = 'Foto da Fleabag com cara de rabugenta';
        mensagemHumor.innerHTML = 'rabugenta';
    } else if(numeroBotao == 5){
        fotoHumor.src = './assets/img/fleabag-religiosa.jpg';
        fotoHumor.alt = 'Foto da Fleabag na igreja com as mãos juntas como se estivesse rezando';
        mensagemHumor.innerHTML = 'religiosa';
    } else if(numeroBotao == 6){
        fotoHumor.src = './assets/img/fleabag-surpresa.jpg';
        fotoHumor.alt = 'Foto da Fleabag com cara de quem foi surpreendida com algo';
        mensagemHumor.innerHTML = 'surpresa';
    } else if(numeroBotao == 7){
        fotoHumor.src = './assets/img/fleabag-santa.jpg';
        fotoHumor.alt = 'Foto da Fleabag fazendo alusão a imagem de uma santa de igreja católica';
        mensagemHumor.innerHTML = 'santa';
    } else if(numeroBotao == 8){
        fotoHumor.src = './assets/img/fleabag-triste.jpg';
        fotoHumor.alt = 'Foto da Fleabag com marcas de maquiagem borrada como se tivesse chorado muito';
        mensagemHumor.innerHTML = 'triste';
    }
    /* alert(sorteio); */
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }