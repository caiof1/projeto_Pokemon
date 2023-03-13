const API_URL = 'https://pokeapi.co/api/v2/';

// Estou fazendo a requisição e criando uma arrow function para facilitar as diversas requisições que possa acontecer no código futuramente
// Caso eu decida mexer e acrescentar mais alguma funcionalidade
const fetchBasic = async (endPoint) => {
    const fetchPokemon = await fetch(`${API_URL}${endPoint}`);
    const jsonPokemon = await fetchPokemon.json();
    return jsonPokemon;
}

// Definindo em um array os tipos e cores para cada tipo
// Obs: Poderia ter puxado direto da API, porém, isso acabou deixando o site muito lento e demorando para carregar os pokemons
const coresType = [
    {
        slug: 'normal',
        cor: 'white'
    },
    {
        slug: 'fire',
        cor: 'red'
    },
    {
        slug: 'water',
        cor: 'blue'
    },
    {
        slug: 'grass',
        cor: 'green'
    },
    {
        slug: 'flying',
        cor: 'skyblue'
    },
    {
        slug: 'fighting',
        cor: 'gray'
    },
    {
        slug: 'poison',
        cor: 'purple'
    },
    {
        slug: 'electric',
        cor: 'yellow'
    },
    {
        slug: 'ground',
        cor: 'saddlebrown'
    },
    {
        slug: 'rock',
        cor: '#ccc'
    },
    {
        slug: 'psychic',
        cor: 'pink'
    },
    {
        slug: 'ice',
        cor: 'rgb(62, 174, 214)'
    },
    {
        slug: 'bug',
        cor: 'greenyellow'
    },
    {
        slug: 'ghost',
        cor: 'ghostwhite'
    },
    {
        slug: 'steel',
        cor: 'steelblue'
    },
    {
        slug: 'dragon',
        cor: 'orangered'
    },
    {
        slug: 'dark',
        cor: 'black'
    },
    {
        slug: 'fairy',
        cor: 'aquamarine'
    }
]

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
        coresType.forEach(type => {
            if(type['slug'] == pokeList['types'][0]['type']['name']) {
                divImg.style.background = type['cor'];
            }
        })
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
