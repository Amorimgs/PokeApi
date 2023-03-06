let imgPokemon = document.querySelector('.fotoPokemon');
let namePokemon = document.querySelector('.namePokemon');
let btns = document.querySelectorAll('.btn');
url = 'https://pokeapi.co/api/v2/pokemon/';

let respos = '';
let nameP = [];
let ids = [];
let newId = [];
let acertos = 0;
let erros = 0;
let imgP = '';
function ContadorAcertos() {
  acertos++;
  document.querySelector('.acertos').innerText = `Acertos = ${acertos}`;
}
function ContadorErros() {
  erros++;
  document.querySelector('.erros').innerText = `Erros = ${erros}`;
}

function ResetaDados() {
  nameP = [];
  ids = [];
  newId = [];
}
function gerarNumero() {
  for (i = 0; i < 4; i++) {
    ids.push(Math.floor(Math.random() * 905));
  }
}
gerarNumero();

let escolhido = ids[0];

function newIds() {
  newId = ids.sort();
}

newIds();

async function buscaPokemon() {
  const resposta = await fetch(url + escolhido);
  const jsonBody = await resposta.json();

  respos = jsonBody.species.name;
  imgPokemon.src = jsonBody.sprites.front_default;
  imgP = jsonBody.sprites.front_default;

  nameP = [];
  for (let i = 0; i < 4; i++) {
    const resposta = await fetch(url + newId[i]);
    const jsonBody = await resposta.json();
    nameP.push(jsonBody.species.name);
  }
}

async function AdicionaAlternativa() {
  await buscaPokemon();
  btns.forEach(function alteraNome(a, index) {
    a.innerText = nameP[index];
  });
}
AdicionaAlternativa();

btns.forEach(function VerificaAlternativa(a) {
  a.addEventListener('click', function Verifica(e) {
    if (respos === e.target.textContent) {
      let div = document.createElement('div');
      div.innerHTML = `
                <div class="Resposta">
                <h2>Você Acertou!!!</h2>
                <p>Parabêns!</p>
                <button class="btnNovoPokemon" onClick="NewPokemon()">Novo Pokemon</button>
            </div>
            `;
      document.body.appendChild(div);
      document.querySelector('.container').style.visibility = 'hidden';
      ContadorAcertos();
      const relatorio = document.querySelector('.relatorio');
      const li = document.createElement('li');

      li.innerHTML = `<li style="color: green;">${respos.toUpperCase()}!</li>`;
      relatorio.appendChild(li);
    } else {
      let div = document.createElement('div');
      div.innerHTML = `
                <div class="Resposta">
                <h2>Você Errou!!!</h2>
                <img src="${imgP}"/>
                <p>O Pokemon é ${respos.toUpperCase()}!</p>
                <button class="btnNovoPokemon" onClick="NewPokemon()">Novo Pokemon</button>
            </div>
            `;
      document.body.appendChild(div);

      document.querySelector('.container').style.visibility = 'hidden';
      ContadorErros();
      const relatorio = document.querySelector('.relatorio');
      const li = document.createElement('li');

      li.innerHTML = `<li style="color: red;">${respos.toUpperCase()}!</li>`;
      relatorio.appendChild(li);
    }
  });
});
function NewPokemon() {
  btns.forEach((a) => (a.innerText = '...'));
  document.querySelector('.container').style.visibility = 'visible';
  let EleRemove = document.querySelector('.Resposta');
  EleRemove.parentNode.removeChild(EleRemove);

  ResetaDados();
  gerarNumero();
  escolhido = ids[0];
  newIds();
  AdicionaAlternativa();
}

document
  .querySelector('.start')
  .addEventListener('click', function IniciarGame() {
    this.style.visibility = 'hidden';
    document.querySelector('.game').style.visibility = 'visible';
    document.querySelector('.game').style.animation = 'ApareceGame 1s forwards';
    document.querySelector('.relatorio').style.visibility = 'visible';
    document.querySelector('.relatorio').style.animation =
      'ApareceGame 1s forwards';
  });
