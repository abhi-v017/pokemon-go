const pokeimg = document.getElementById('pokeimg')
const pokemonCardsContainer = document.getElementById('pokemon-cards');

function apidata() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            console.log('data fetched successfully', data)
            const pokemonList = data.results;

            // Loop through each Pokémon and access specific data
            pokemonList.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const cardElement = document.createElement('div');
                        cardElement.className = 'card';
                        const cardContent = `
                        <img id="pokeimg" src="${pokemonData.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                        <h2 class="name">${pokemon.name}</h2>
                        <div class="content-box">
                          <span><span class="content">Height: </span><span>${pokemonData.height} dm</span></span>
                          <span><span class="content">Weight:</span><span> ${pokemonData.weight} hg</span></span>
                          <span><span class="content">Ability:</span><span> ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</span></span>
                          <span><span class="content">Type:</span> <span> ${pokemonData.types.map(type => type.type.name).join(', ')}</span></span>
                        </div>
                        `;
                        cardElement.addEventListener('click', () => {
                            window.location.href = `pokemon-details.html?name=${pokemon.name}`;
                        });
                        cardElement.innerHTML = cardContent;
                        pokemonCardsContainer.appendChild(cardElement);
                    })
                    .catch(error => {
                        console.error('Error fetching Pokemon data:', error)
                    })
            })
        })
        .catch(error => {
            console.error('An error occurred:', error.message);
        })
}
apidata()