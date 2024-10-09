// Array contendo as cores disponíveis
const cores = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo', 'laranja'];

// Variáveis para armazenar a sequência do jogo e do jogador, o nível atual e o estado do jogo
let sequencia = [];
let sequenciaDoJogo = [];
let nivel = 1; 
let jogando = false;

// Seleciona os botões de cores e os elementos do DOM
const botoesCores = cores.map(cor => document.getElementById(cor));
const starButton = document.getElementById('star-button');
const nivelTexto = document.getElementById('nivel');

// Adiciona um listener ao botão de iniciar, que chama a função iniciarJogo
starButton.addEventListener('click', iniciarJogo);

// Função que inicia o jogo
function iniciarJogo() {
    sequencia = [];  // Reseta a sequência do jogo
    sequenciaDoJogo = [];  // Reseta a sequência do jogador
    nivel = 1;  // Reseta o nível para 1
    jogando = true;  // Define o estado do jogo como ativo
    nivelTexto.textContent = `Nível: ${nivel}`;  // Atualiza o texto do nível
    proximoNivel();  // Chama a função para iniciar o próximo nível
}

// Função que gera a sequência de cores para o nível atual
function proximoNivel() {
    sequenciaDoJogo = [];  // Reseta a sequência do jogador para o novo nível
    let numeroDeCores = 1 + (nivel - 1);  // Define quantas cores serão mostradas

    // Gera uma nova sequência de cores aleatórias
    for (let i = 0; i < numeroDeCores; i++) {
        const novaCor = cores[Math.floor(Math.random() * cores.length)];
        sequencia.push(novaCor);
    }

    nivelTexto.textContent = `Nível: ${nivel}`;  // Atualiza o texto do nível
    tocarSequencia();  // Chama a função para tocar a sequência
}

// Função que toca a sequência de cores
function tocarSequencia() {
    let i = 0;
    const intervalo = setInterval(() => {
        ativarBotao(sequencia[i]);  // Ativa o botão da cor na sequência
        i++;  // Avança para a próxima cor

        // Verifica se todas as cores foram mostradas
        if (i >= sequencia.length) {
            clearInterval(intervalo);  // Para o intervalo se todas as cores foram tocadas
        }
    }, 1000);  // Intervalo de 1 segundo entre as cores
}

// Função que ativa o botão da cor
function ativarBotao(cor) {
    const botao = document.getElementById(cor);  // Seleciona o botão da cor
    botao.classList.add('active');  // Adiciona a classe 'active' para destacar
    setTimeout(() => {
        botao.classList.remove('active');  // Remove a classe 'active' após 500ms
    }, 500);
}

// Adiciona listeners de clique a cada botão de cor
botoesCores.forEach(botao => {
    botao.addEventListener('click', (e) => {
        if (!jogando) return;  // Se não está jogando, não faz nada
        const corSelecionada = e.target.id;  // Obtém a cor do botão clicado

        sequenciaDoJogo.push(corSelecionada);  // Adiciona a cor selecionada à sequência do jogador
        ativarBotao(corSelecionada);  // Ativa o botão da cor selecionada
        verificarResposta();  // Verifica se a resposta está correta
    });
});

// Função que verifica a resposta do jogador
function verificarResposta() {
    const indiceAtual = sequenciaDoJogo.length - 1;  // Índice da última cor selecionada
    // Se a cor selecionada não corresponder à cor da sequência
    if (sequenciaDoJogo[indiceAtual] !== sequencia[indiceAtual]) {
        alert('Você errou! Tente novamente');  // Mensagem de erro
        jogando = false;  // Define o estado do jogo como não ativo
        return;
    }
    }

    // Verifica se todas as cores foram selecionadas corretamente
    if (sequenciaDoJogo.length === sequencia.length){
        // Se o jogador completou todos os níveis
        if (nivel === 5) {
            alert('Parabéns! Você completou todos os níveis! Que incrível capacidade de memorização!');
            jogando = false;  // Define o estado do jogo como não ativo
        } else {
            nivel++;  // Avança para o próximo nível
            setTimeout(proximoNivel, 1000);  // Chama a função para o próximo nível após 1 segundo
        }

    }