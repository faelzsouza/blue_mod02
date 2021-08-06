const inputNome = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const textArea = document.querySelector('#message');
const sendButton = document.querySelector('#send');
const form = document.querySelector('form');
const divForm = document.querySelector('#form');
const divCarregamento = document.querySelector('#carregamento');
const spanLoad = document.querySelectorAll('div > span')
let inputNomeOk = false
let inputEmailOk = false
let textAreaOk = false
// cria um observer
const observer = new IntersectionObserver(entries => {
    // Loop nos entries
    entries.forEach(entry => {
        // Se a section habilidades estiver visível
        if (entry.isIntersecting) {
            // Adiciona a classe de animação
            spanLoad.forEach(span => {
                span.classList.add('load')
            });
        } else {
            // Quando sair da section, a classe é removida para que se repita a animação se a section estiver visível novamente
            spanLoad.forEach(span => {
                span.classList.remove('load')
            });
        }
    });
});

// Coloca o observer para observar a section habilidades
observer.observe(document.querySelector('#habilidades'))

// Validação para o input do nome
inputNome.addEventListener('keyup', () => {
    if(inputNome.value.length < 2){
        // inputNome.style.borderColor = 'red';
        inputNomeOk = false
    } else {
        // inputNome.style.borderColor = 'green';
        inputNomeOk = true
    }
    buttonCheck()
})

// Validação para o input do e-mail
inputEmail.addEventListener('keyup', () => {
    if(inputEmail.value.indexOf('@') == -1 || inputEmail.value.indexOf('.') == -1){
        /* inputEmail.style.borderColor = 'red'; */
        inputEmailOk = false
    } else {
        /* inputEmail.style.borderColor = 'green'; */
        inputEmailOk = true
    }
    buttonCheck()
})

// Validação para o text area com no mínimo 10 caracteres e no máximo 100
textArea.addEventListener('keyup', () => {
    if(textArea.value.length <= 100 && textArea.value.length > 10){
        /* textArea.style.borderColor = 'green'; */
        textAreaOk = true;
    } else {
        /* textArea.style.borderColor = 'red'; */
        textAreaOk = false
    }
    buttonCheck()
})

// Quando o form for submetido, oculta o form e mostra a animação de envio
form.addEventListener('submit', () => {
    divForm.style.display = 'none'
    divCarregamento.style.display = 'block'
})

// Função para validação para habilitar ou desabilitar o botão de submit do form
function buttonCheck(){
    if(inputNomeOk && inputEmailOk && textAreaOk){
        sendButton.disabled = false
        sendButton.className = "btn-enabled"
    } else {
        sendButton.disabled = true
        sendButton.className = ""
    }
}

// inicia o materialize assim que carrega a página
M.AutoInit();
// funcionalidade do carousel da seção de projetos
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {numVisible: 3, indicators: true, shift: 100});
  });