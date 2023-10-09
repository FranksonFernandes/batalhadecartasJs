//Array inicial de cartas 1 - 50
var baralho = Array.from({ length: 50 }, (_, index) => index + 1);
var sorteados = [];

var imagemAtiva = null;
var btnIniciar = document.getElementById("btnIniciar");
var btnCartaMaquina = document.getElementById("btnCartaMaquina");
var btnAtacar = document.getElementById("btnCartaMaquina");
var btnNovaJogada = document.getElementById("btnNovaJogada");
var btnJogarNovamente = document.getElementById("btnJogarNovamente");
//Imagens:
var imagemCartaMaquina = document.getElementById("outra-carta-jogador-sorteada");
var imagemCartaSelecionada = document.getElementById("sexta-imagem-carta-selecionada");
var imagemCarta1 = document.getElementById("carta-jogador-sorteada1");
var imagemCarta2 = document.getElementById("carta-jogador-sorteada2");
var imagemCarta3 = document.getElementById("carta-jogador-sorteada3");
var imagemCarta4 = document.getElementById("carta-jogador-sorteada4");
var imagemCarta5 = document.getElementById("carta-jogador-sorteada5");
var divMensagemJogador = document.getElementById('mensagemCartaJogador');
var divMensagemMaquina = document.getElementById('mensagemCartaMaquina');


// Variáveis globais para armazenar os valores das imagens
var NumeroSorteadoJogador;
var NumeroSorteadoMaquina;
var rodadas = 0;

var pontosJogador = 0;
var pontosMaquina = 0;

var divPlacar = document.getElementById("placar");
var htmlmsgInicial = 'Clique em "Inciar" para começar a batalha!';
divPlacar.innerHTML = htmlmsgInicial;

configuracaoIncialPartida();
estilizarBotoes();




function novaPartida(){
  btnIniciar.textContent = "Reiniciar"
  btnIniciar.disabled = false;
  baralho = Array.from({ length: 50 }, (_, index) => index + 1);
  sorteados = [];
  pontosJogador = 0;
  pontosMaquina = 0; 
  sortearNumeroJogador();       
}

function sortearNumeroJogador(){

    if (baralho.length < 5) {
        console.log("Não há números suficientes para sortear.");
        var divPlacar = document.getElementById("placar");
        if(pontosJogador > pontosMaquina){
          console.log("final de jogada");
          var htmlmsgVencedor = "Você venceu!!!";
          divPlacar.innerHTML = htmlmsgVencedor;
          btnJogarNovamente.style.display = 'block';
          return;
          
          //novaPartida();
          
          //desativarImagensCartasSeleconais();
        }
        else{
          var htmlmsgVencedor = "Máquina Venceu!";
          divPlacar.innerHTML = htmlmsgVencedor;
          console.log("final de jogada");
          btnJogarNovamente.style.display = 'block';
          //desativarImagensCartasSeleconais();
          return;
        }
        
      }
    
      // Sorteia cinco números únicos
      const numerosSorteados = [];
      while (numerosSorteados.length < 5) {
        const indiceSorteado = Math.floor(Math.random() * baralho.length);
        const numeroSorteado = baralho.splice(indiceSorteado, 1)[0];
        numerosSorteados.push(numeroSorteado);
      }
      for (let i = 0; i < 5; i++) {
        const idElemento = `carta-jogador-sorteada${i + 1}`;
        const elementoImagem = document.getElementById(idElemento);
        if (elementoImagem) {
          elementoImagem.src = `assets/imgs/Cards/${numerosSorteados[i]}.png`; // Define o src da imagem com base no número sorteado
          elementoImagem.alt = `Imagem ${numerosSorteados[i]}`; // Define um atributo alt para acessibilidade
          
        }
      }

    
      // Adiciona os números sorteados ao array sorteados
      sorteados.push(...numerosSorteados);
      btnIniciar.disabled = true;
      btnNovaJogada.disabled = true;
      btnAtacar.disabled = true;

      console.log("Números sorteados:", numerosSorteados);
      mensagens("Selecione uma carta para desafiar!");
      // Chame a função para verificar e habilitar as imagens
      verificarImagensOcultasEhabilitar();
      estilizarBotoes();
      mostrarImagens();
      rodadas += 1;

      }

function sortearNumeroMaquina(){

    if (baralho.length < 1) {
        console.log("Não há números suficientes para sortear.");
        return;
      }
    
      // Sorteia 
      const numerosSorteados = [];
      while (numerosSorteados.length < 1) {
        const indiceSorteado = Math.floor(Math.random() * baralho.length);
        const numeroSorteado = baralho.splice(indiceSorteado, 1)[0];
        numerosSorteados.push(numeroSorteado);
        imagemCartaMaquina.src = `assets/imgs/Cards/${numerosSorteados}.png`;
        NumeroSorteadoMaquina = numerosSorteados;
      }
    
      // Adiciona os números sorteados ao array sorteados
      sorteados.push(...numerosSorteados);
    
      console.log("Números sorteados:", numerosSorteados);
      
      extrairENumeroDasImagens();
      atualizaPlacar();
      btnAtacar.disabled = true;
      btnNovaJogada.disabled = false;
      estilizarBotoes();
      
      
      

      
  }

  function validarSeEstaSemCartasParaSelecionar(){
    var idsImagens = [
      'carta-jogador-sorteada1',
      'carta-jogador-sorteada2',
      'carta-jogador-sorteada3',
      'carta-jogador-sorteada4',
      'carta-jogador-sorteada5'
    ];
  
    // Variável para rastrear se todas as imagens estão ocultas
    var todasOcultas = true;
  
    for (var i = 0; i < idsImagens.length; i++) {
      var imagem = document.getElementById(idsImagens[i]);
  
      // Verifica se a imagem não está oculta
      if (imagem.style.display !== "none") {
        todasOcultas = false;
        break; // Se uma imagem não estiver oculta, não é necessário verificar as outras
      }
    }
  
    // Verifica se todas as imagens estão ocultas
    if (todasOcultas) {
        if(pontosJogador > 0 || pontosMaquina > 0){
          mensagens('Clique em "Comprar" para obter novas cartas.' + ' Rodada ' + rodadas + '/5')
        }
        else{
          return null;
        }
      
      }
  
  }

  function novaJogada(){
    imagemCartaMaquina.src = `assets/imgs/Cards/fundo-carta.jpg`;
    imagemCartaSelecionada.src = `assets/imgs/Cards/fundo-carta.jpg`;
    btnNovaJogada.disabled = true;
    if(verificarImagensOcultas()){
      btnIniciar.disabled = false;
    }
    mensagens("Selecone uma carta para desafiar!")
    validarSeEstaSemCartasParaSelecionar();
    divMensagemJogador.innerHTML = "";
    divMensagemMaquina.innerHTML = "";
    
  }

function selecionarImagem(carta) {
  // Obtém o src da imagem clicada
  var srcClicada = carta.src;

  // Define o src da sexta imagem com o src clicado
  var sextaImagem = document.getElementById("sexta-imagem-carta-selecionada");
  if (sextaImagem) {
      sextaImagem.src = srcClicada;
  }
  
}


function atualizarImagem(idClicado) {
  var imagemClicada = document.getElementById(idClicado);
  var imagem6 = document.getElementById('sexta-imagem-carta-selecionada');

  //validar se a sexta carta "desafio" está com fundo
  //Se estiver pode selecionar caso contrário não pode:
  
    // Verifica se o src da imagem não contém "fundo-carta.jpg"
    if (imagem6.src.indexOf("fundo-carta.jpg") === -1) {
      // Implemente a ação personalizada aqui se a condição for verdadeira
      console.log("A imagem contém 'fundo-carta.jpg'.");
      alert("Voce já seleciou uma carta, clique em atacar!");
      
    } else {
      

      // Oculta a imagem clicada definindo a propriedade display como "none"
      imagemClicada.style.display = "none";
      // Define a imagem 6 com a mesma source da imagem clicada
      imagem6.src = imagemClicada.src;
      btnAtacar.disabled = false;
      mensagens('Clique em "Atacar" para desafiar a máquina!');
      estilizarBotoes();

      
      
    }
  
  }



function extrairEConverterNumeroDaImagem(element, variavelGlobal) {
  if (element) {
    // Obtenha o atributo "src" do elemento da imagem
    var src = element.src;

    // Use uma expressão regular para extrair o número do nome do arquivo da imagem
    var matches = src.match(/\/(\d+)\.png$/);

    if (matches && matches.length > 1) {
      // Extraia o número e converta-o em um número inteiro
      var numero = parseInt(matches[1], 10);

      // Armazene o número na variável global especificada
      window[variavelGlobal] = numero;
    }
  }
}

function extrairENumeroDasImagens() {
  // Suponha que você tenha os elementos de imagem com os IDs fornecidos
  var imagemCartaMaquina = document.getElementById("outra-carta-jogador-sorteada");
  var imagemCartaSelecionada = document.getElementById("sexta-imagem-carta-selecionada");

  // Função para extrair e converter o nome da imagem em um número
  function extrairEConverterNumeroDaImagem(element, variavelGlobal) {
    if (element) {
      // Obtenha o atributo "src" do elemento da imagem
      var src = element.src;

      // Use uma expressão regular para extrair o número do nome do arquivo da imagem
      var matches = src.match(/\/(\d+)\.png$/);

      if (matches && matches.length > 1) {
        // Extraia o número e converta-o em um número inteiro
        var numero = parseInt(matches[1], 10);

        // Armazene o número na variável global especificada
        window[variavelGlobal] = numero;
      }
    }
  }

  // Chame a função para cada imagem e armazene o número em variáveis globais
  extrairEConverterNumeroDaImagem(imagemCartaMaquina, "NumeroSorteadoMaquina");
  extrairEConverterNumeroDaImagem(imagemCartaSelecionada, "NumeroSorteadoJogador");
  console.log("Número Sorteado Maquina:", NumeroSorteadoMaquina);
  console.log("Número Sorteado Jogador:", NumeroSorteadoJogador);
  if(NumeroSorteadoJogador > NumeroSorteadoMaquina){
    console.log('Jogador Venceu!');
    tremerImagem("outra-carta-jogador-sorteada");
    pontosJogador += 1;
    //Informativo de vencedor:
    
    var mensagemJogador = "Vencedor(a)!";
    var mensagemCarta = "Carta Destruída!"
    divMensagemJogador.innerHTML = mensagemJogador;
    divMensagemMaquina.innerHTML = mensagemCarta;

  }
  else{
    console.log('Máquina Venceu!')
    tremerImagem("sexta-imagem-carta-selecionada");
    pontosMaquina +=1;
    var mensagemJogador = "Carta Destruída!";
    var mensagemCarta = "Vencedor(a)!"
    divMensagemJogador.innerHTML = mensagemJogador;
    divMensagemMaquina.innerHTML = mensagemCarta;

  }
}

function atualizaPlacar(){
  estilizarBotoes(); 
  var divPlacar = document.getElementById("placar")
  var html = "Jogador " + pontosJogador + " x " + pontosMaquina + " Máquina"
  divPlacar.innerHTML = html
  //validarFundoCarta();
  
}

function configuracaoIncialPartida(){
  btnAtacar.disabled = true;
  btnNovaJogada.disabled = true;
}



function verificarImagensOcultas() {
  var idsImagens = [
    'carta-jogador-sorteada1',
    'carta-jogador-sorteada2',
    'carta-jogador-sorteada3',
    'carta-jogador-sorteada4',
    'carta-jogador-sorteada5'
  ];

  // Variável para rastrear se todas as imagens estão ocultas
  var todasOcultas = true;

  // Loop através dos IDs das imagens
  for (var i = 0; i < idsImagens.length; i++) {
    var imagem = document.getElementById(idsImagens[i]);

    // Verifica se a imagem não está oculta
    if (imagem.style.display !== "none") {
      todasOcultas = false;
      break; // Se uma imagem não estiver oculta, não é necessário verificar as outras
    }
  }

  // Verifica se todas as imagens estão ocultas
  if (todasOcultas) {
    // Implemente a ação específica aqui quando todas as imagens estiverem ocultas
    console.log("Todas as imagens estão ocultas. Executar ação específica.");
    btnIniciar.textContent = 'Comprar cartas';
    btnIniciar.disabled = false;

  }
}


function verificarImagensOcultasEhabilitar() {
  var idsImagens = [
    'carta-jogador-sorteada1',
    'carta-jogador-sorteada2',
    'carta-jogador-sorteada3',
    'carta-jogador-sorteada4',
    'carta-jogador-sorteada5'
  ];

  // Variável para rastrear se todas as imagens estão ocultas
  var todasOcultas = true;

  // Loop através dos IDs das imagens
  for (var i = 0; i < idsImagens.length; i++) {
    var imagem = document.getElementById(idsImagens[i]);

    // Verifica se a imagem não está oculta
    if (imagem.style.display !== "none") {
      todasOcultas = false;
      break; // Se uma imagem não estiver oculta, não é necessário verificar as outras
    }
  }

  // Verifica se todas as imagens estão ocultas
  if (todasOcultas) {
    // Habilita novamente as imagens para visualização
    for (var i = 0; i < idsImagens.length; i++) {
      var imagem = document.getElementById(idsImagens[i]);
      imagem.style.display = "block"; // Ou "inline", ou o valor apropriado para torná-las visíveis
    }
  }
}

function aplicarEstilosClique(nomeVariavel) {
  var botao = botoes[nomeVariavel];
  
  // Adicione a classe que contém os estilos de clique
  botao.classList.add("button-clicked");
  
  // Defina um tempo limite para remover a classe após o clique
  setTimeout(function() {
      botao.classList.remove("button-clicked");
  }, 300); // Tempo em milissegundos (300ms neste exemplo)

  // Crie um objeto que armazena todas as variáveis dos botões
var botoes = {
  meuBotao1: document.getElementById("btnIniciar"),
  meuBotao2: document.getElementById("btnCartaMaquina"),
  meuBotao2: document.getElementById("btnNovaJogada"),
};
}

  function estilizarBotoes() {
    estilizarBotao(btnIniciar, 'button-success', 'button');
    estilizarBotao(btnNovaJogada, 'warning-button', 'button');
    estilizarBotao(btnAtacar, 'button-danger', 'button');
    
}

function estilizarBotao(botao, classeHabilitado, classeDesabilitado) {
    if (botao.disabled === false) {
        botao.classList.add(classeHabilitado); // Adiciona a classe de sucesso
        botao.classList.remove(classeDesabilitado); // Remove a classe desabilitada (se houver)
    } else {
        botao.classList.remove(classeHabilitado); // Remove a classe de sucesso (se houver)
        botao.classList.add(classeDesabilitado); // Adiciona a classe desabilitada
    }
}


function mostrarImagens(){
  var carta1 = document.getElementById('carta-jogador-sorteada1');
  var carta2 = document.getElementById('carta-jogador-sorteada2');
  var carta3 = document.getElementById('carta-jogador-sorteada3');
  var carta4 = document.getElementById('carta-jogador-sorteada4');
  var carta5 = document.getElementById('carta-jogador-sorteada5');

  carta1.style.visibility = 'visible';
  carta2.style.visibility = 'visible';
  carta3.style.visibility = 'visible';
  carta4.style.visibility = 'visible';
  carta5.style.visibility = 'visible';

}

function mensagens(texto){
  var divPlacar = document.getElementById("placar");
  var mensagem = texto;
  divPlacar.innerHTML = mensagem;
}




// Imagem treme quando perde:
function tremerImagem(id) {
  const imagem = document.getElementById(id);

  if (imagem) {
      imagem.classList.add('shaking-image');

      // Remova a classe 'shaking-image' após um período de tempo para parar a animação
      setTimeout(() => {
          imagem.classList.remove('shaking-image');
      }, 500); // 500 milissegundos (ajuste conforme necessário)
  }
}

function reiniciarJogo(){
  location.reload();
}



