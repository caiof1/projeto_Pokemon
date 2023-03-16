const API_URL = 'https://pokeapi.co/api/v2/';

// Estou fazendo a requisição e criando uma arrow function para facilitar as diversas requisições que possa acontecer no código futuramente
// Caso eu decida mexer e acrescentar mais alguma funcionalidade
const fetchBasic = async (endPoint) => {
    const fetchPokemon = await fetch(`${API_URL}${endPoint}`);
    const jsonPokemon = await fetchPokemon.json();
    return jsonPokemon;
}


// Nessa function, estou criando elementos para atribuir os valores e imgs de cada pokemon
const createDivPoke = async (pokeList, sectionPokemon) => {
    if(pokeList == null) {
        console.log('vazio')
    }
    // criando os elementos html
    const divPoke = document.createElement('div');
    const divImg = document.createElement('div');
    let img;
    if(pokeList['sprites']['front_default'] != null) {
        img = document.createElement('img');
    } else {
        img = document.createElement('span')
    }
    const spanInfo = document.createElement('span');
    const spanId = document.createElement('span')

    // Adicionando no escopo html
    sectionPokemon.appendChild(divPoke);
    divPoke.appendChild(divImg);
    divImg.appendChild(img);
    divPoke.appendChild(spanInfo);

    // Adicionando text antes, para que não exclua o spanID
    spanInfo.innerHTML = pokeList['name'] + ' - ';


    spanInfo.appendChild(spanId)

    // Adicionando as class nos elementos
    divPoke.classList = 'poke';
    divImg.classList = 'img__pokemon';
    spanInfo.classList = 'info';
    spanId.classList = 'id';

    // Adicionando os textos
    spanId.innerHTML = pokeList['id'];
    if(pokeList['sprites']['front_default'] != null) {
        img.src = pokeList['sprites']['front_default'];
    } else {
        img.innerHTML = 'Não existe imagem';
    }

}

// Aqui está sendo feito a renderização e o laço para que repita e crie pokemon por pokemon
const renderizarPokemon = async () => {
    // eu poderia ter feito isso pelo HTML, porém, optei por deixar assim, já que já tinha feito assim
    const center = document.querySelector('main .center');
    const pokemons = document.createElement('section');
    center.appendChild(pokemons);
    pokemons.classList = 'pokemons';
    
    // Estou puxando todos os pokemon com um intervalo entre 0 á 100000
    const lengthAllPokemon = await fetchBasic('pokemon?limit=100000&offset=0');
    // Laço de repetição se baseando no valor retornado pela requisição feita acima
    for(let i = 1; i <= lengthAllPokemon['count']; i++) {
        try {
            const pokemonAtual = await fetchBasic(`pokemon/${i}/`); 
            createDivPoke(pokemonAtual, pokemons);
        } catch(e) {
            i = lengthAllPokemon + 1;
        }

    }

}


renderizarPokemon();
