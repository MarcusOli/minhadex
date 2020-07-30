

// endereço da API: usado para fazer as requisições
const api = 'https://pokeapi.co/api/v2/';

// pega todos os elementos HTML que serão necessários
const listEl = document.querySelector('#list');
const detailEl = document.querySelector('#detail-section');
const backEl = document.querySelector('.back-to-list');
const avatarImgEl = document.querySelector('#avatar-img');
const detailAvatarImgEl = detailEl.querySelector('.item-avatar-img');
const detailNumberEl = detailEl.querySelector('.number');
const detailNameEl = detailEl.querySelector('.name');
const detailTitleEl = detailEl.querySelector('#detail-title');
const detailWeightEl = detailEl.querySelector('#detail-weight');
const detailHeightEl = detailEl.querySelector('#detail-height');
const detailTypesEl = detailEl.querySelector('#detail-types');
const waiter = document.querySelector(".waiter")

// lista com todos os pokemons
let pokemons = [];
let pokemon_desc = [];

// SEU CÓDIGO PODE VIR AQUI
getpokemons(api+"pokemon")
async function getpokemons(url){
  let pokeresults =  await friendlyFetch(url+"?limit=151")
  let result = pokeresults.results
  let pokemonr
  result.map(pokemon =>{
    getpokemon(pokemon.url)
  })
}
async function getpokemon(url){
  let poke = await friendlyFetch(url)
  getDesc(poke.species.url)
  pokemons.push(poke)
}
async function getDesc(url) {
  let desc = await friendlyFetch(url)
  pokemon_desc.push(desc)
}

 getPokeTimer = setInterval(() => {
  if(pokemons.length==151 && pokemon_desc.length==151){
    console.log(pokemon_desc)
    sortPoke()
    BuildInterface()
  }else{
    if(waiter.innerHTML.length == 19){
      waiter.innerHTML = "Waiting for data"
    }else{
      waiter.innerHTML += "."
    }
  }
}, 50);

function sortPoke() {
  pokemons.sort(comparison)
  pokemon_desc.sort(comparison)
}

function comparison(a,b){
 if(a.id>b.id){
   return 1
 }else{
   return -1
 }
}


function BuildInterface(){
  clearInterval(getPokeTimer)
  console.log(pokemons)
  console.log(pokemon_desc)
  listEl.innerHTML  = ' '
  pokemons.map( pokemon =>{
    listEl.innerHTML += listItemTemplate(pokemon)
  })
  let lis = document.querySelectorAll("li")
  console.log(lis[1].children[0].children[1].innerHTML)
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click',function(){
      Details(i,lis[i])
    })
  }  
}

function Details(i,element) {
  let selected = document.querySelector(".selected")
  if(selected!=undefined){
    selected.classList.remove("selected")
  }
  element.classList.add("selected")
  BuildDetail(i)
  showDetail()
}
function getFirst(desc){
  array = desc.flavor_text_entries
  for(let i=0; i<array.length;i++){
       console.log(array[i])
      if(array[i].language.name=="en"){
        return array[i].flavor_text
    }
  }
}

function BuildDetail(i){
  document.querySelector("#detail-section .item-avatar-img").src = pokemons[i].sprites.front_default
  document.querySelector("#detail-section .number").innerHTML = pokemons[i].id
  document.querySelector("#detail-section .name").innerHTML = pokemons[i].name
  document.querySelector("#detail-title").innerHTML = getFirst(pokemon_desc[i])
  let types = document.querySelector("#detail-types")
  types.innerHTML = ' '
  console.log(types)
  pokemons[i].types.map( type=>{
     console.log(type)
     types.innerHTML += typeTemplate(type.type.name)
  })
  document.querySelector("#detail-height").innerHTML = pokemons[i].height
  document.querySelector("#detail-weight").innerHTML = pokemons[i].weight
}

let backbutton  = document.querySelector(".back-to-list")
backbutton.addEventListener('click',showList)
// ao fazer requisições Ajax, em vez do fetch(...), opte pela função exportada por data.js
// chamada friendlyFetch(...) - ela faz a requisição igual a fetch, mas armazena a resposta
// em um cache local (para evitar sobrecarregar a API)