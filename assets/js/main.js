
//--- Pegando a nossa lista em html (li)
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecords = 250
const limit = 5
let offset = 0


//--- Funçoes de listas
function loadPokemonItens(offset, limit){
  
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    //Pega a lista de pokemons, mapei os pokemons, converta em uma lista de li e junte-os sem seprador.
    const newHtml = pokemons.map((pokemon) =>  ` 
    <li class="pokemon ${pokemon.type}">
    <span class="number">${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
    <ol class="types">
    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`)  .join("")}
    </ol>
    <img src="${pokemon.photo}"
    alt="${pokemon.name}">
    </div>
    
    </li> 
    `).join("")
    
    pokemonList.innerHTML += newHtml;
  })
}

loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () =>{
  offset += limit

  const qtdRecordNextPage = offset + limit

  if(qtdRecordNextPage => maxRecords){
    const newLimit = maxRecords - qtdRecordNextPage 
    loadPokemonItens(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }
  else{
    loadPokemonItens(offset, limit)

  }

})