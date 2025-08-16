const elTitulo = document.querySelector("#titulo-pergunta");
const elAlternativas = document.querySelector(".alternativas");
const elProxima = document.querySelector("#botao-proxima");
const elReiniciar = document.querySelector("#botao-reiniciar");
const elResultado = document.querySelector("#resultado");
const elResumo = elResultado.querySelector(".resumo");
const elJogarNovamente = document.querySelector("#botao-jogar-novamente");
const elProgress = document.querySelector(".progresso .barra");
const elPlacar = document.querySelector(".placar strong");
const elFeedback = document.querySelector("#feedback");

const perguntas = [
  {
    enunciado: "Quem é considerado o pai da psicanálise?",
    alternativas: ["Carl Jung", "Sigmund Freud", "Jean Piaget", "Wilhelm Wundt"],
    correta: 1,
    dica: "Ele desenvolveu conceitos como o inconsciente e os sonhos."
  },
  {
    enunciado: "Qual abordagem psicológica enfatiza o comportamento observável?",
    alternativas: ["Psicanálise", "Behaviorismo", "Gestalt", "Humanismo"],
    correta: 1,
    dica: "Watson e Skinner foram nomes importantes dessa linha."
  },
  {
    enunciado: "Jean Piaget é famoso por seus estudos em:",
    alternativas: ["Desenvolvimento cognitivo", "Psicanálise", "Terapia humanista", "Neurociência"],
    correta: 0,
    dica: "Criou estágios como o sensório-motor e operatório concreto."
  },
  {
    enunciado: "Qual psicóloga brasileira foi pioneira no estudo da psicologia escolar?",
    alternativas: ["Nise da Silveira", "Berta Lutz", "Helena Antipoff", "Maria Montessori"],
    correta: 2,
    dica: "Fundou instituições voltadas à educação especial no Brasil."
  },
  {
    enunciado: "Nise da Silveira é lembrada por seu trabalho em:",
    alternativas: ["Terapia ocupacional e arte", "Comportamento animal", "Psicanálise infantil", "Neuropsicologia"],
    correta: 0,
    dica: "Ela acreditava no poder da arte no tratamento psiquiátrico."
  },
  {
    enunciado: "Qual área da psicologia estuda a influência do grupo no indivíduo?",
    alternativas: ["Psicologia social", "Psicologia clínica", "Psicanálise", "Psicologia do desenvolvimento"],
    correta: 0,
    dica: "Analisa fenômenos como conformidade e obediência."
  },
  {
    enunciado: "O famoso experimento do pequeno Albert está ligado a:",
    alternativas: ["Carl Rogers", "John Watson", "Ivan Pavlov", "Albert Bandura"],
    correta: 1,
    dica: "Mostrou como um bebê podia ser condicionado a sentir medo."
  },
  {
    enunciado: "Qual conceito foi proposto por Abraham Maslow?",
    alternativas: ["Estágios psicossociais", "Condicionamento clássico", "Hierarquia das necessidades", "Arquétipos"],
    correta: 2,
    dica: "É uma pirâmide que começa pelas necessidades fisiológicas."
  },
  {
    enunciado: "Qual é a principal técnica utilizada na psicanálise?",
    alternativas: ["Reflexão guiada", "Experimento de laboratório", "Associação livre", "Análise estatística"],
    correta: 2,
    dica: "O paciente fala livremente tudo o que vem à mente."
  },
  {
    enunciado: "Quem foi pioneira no uso da arte como recurso terapêutico no Brasil?",
    alternativas: ["Nise da Silveira", "Clarice Lispector", "Cecília Meireles", "Helena Antipoff"],
    correta: 0,
    dica: "Criou o Museu de Imagens do Inconsciente."
  }
];

let indice = 0;
let pontuacao = 0;
let bloqueado = false;

function atualizarProgresso() {
  const perc = Math.round((indice / perguntas.length) * 100);
  elProgress.style.width = perc + "%";
}

function renderPergunta() {
  elResultado.hidden = true;
  elReiniciar.hidden = true;
  elProxima.disabled = true;
  elFeedback.textContent = "";
  elAlternativas.innerHTML = "";

  const atual = perguntas[indice];
  elTitulo.textContent = `Pergunta ${indice+1}/${perguntas.length}: ${atual.enunciado}`;

  atual.alternativas.forEach((texto, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.addEventListener("click", () => selecionar(i));
    li.appendChild(btn);
    elAlternativas.appendChild(li);
  });

  atualizarProgresso();
}

function selecionar(opcao) {
  if (bloqueado) return;
  bloqueado = true;

  const atual = perguntas[indice];
  const botoes = Array.from(elAlternativas.querySelectorAll("button"));

  botoes.forEach((btn, i) => {
    btn.disabled = true;
    if (i === atual.correta) btn.classList.add("correta");
    if (i === opcao && i !== atual.correta) btn.classList.add("errada");
  });

  if (opcao === atual.correta) {
    pontuacao++;
    elFeedback.textContent = "✔ Resposta correta!";
  } else {
    elFeedback.textContent = "✖ Errada. Dica: " + atual.dica;
  }

  elPlacar.textContent = pontuacao;
  elProxima.disabled = false;
  elReiniciar.hidden = false;
}

function proxima() {
  indice++;
  bloqueado = false;
  if (indice >= perguntas.length) {
    mostrarResultado();
  } else {
    renderPergunta();
  }
}

function mostrarResultado() {
  elResultado.hidden = false;
  let mensagem;
  if (pontuacao <= 4) mensagem = "🌸 Continue estudando! Você acertou " + pontuacao + " de " + perguntas.length;
  else if (pontuacao <= 7) mensagem = "🌷 Muito bom! Você acertou " + pontuacao + " de " + perguntas.length;
  else if (pontuacao <= 9) mensagem = "🌺 Excelente! Você acertou " + pontuacao + " de " + perguntas.length;
  else mensagem = "👑 Brilhante! Acertou todas as " + perguntas.length + " questões!";
  elResumo.textContent = mensagem;
  elTitulo.textContent = "Fim do quiz!";
  elAlternativas.innerHTML = "";
  elFeedback.textContent = "";
  elProxima.disabled = true;
  elReiniciar.hidden = true;
  atualizarProgresso();
}

function reiniciar() {
  indice = 0;
  pontuacao = 0;
  bloqueado = false;
  elPlacar.textContent = "0";
  elResultado.hidden = true;
  renderPergunta();
}

elProxima.addEventListener("click", proxima);
elReiniciar.addEventListener("click", reiniciar);
elJogarNovamente.addEventListener("click", reiniciar);

renderPergunta();
