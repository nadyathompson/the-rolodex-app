let pokemonList = [{name: "Bulbasaur", height: 0.7, type: ['grass','poison']}, 
                   {name: "Charmander", height: 0.6, type: ['fire']}, 
                   {name: "Squirtle", height: 1.9, type: ['water']},
                   {name: "Pikachu", height: 0.4, type: ['electric']}];

for (i=0; i<pokemonList.length; i++){
    let pokemonInfo = pokemonList[i].name + ' (height: ' + pokemonList[i].height + ', ' + pokemonList[i].type + ' type)';
    if (pokemonList[i].height > 1.8) {
        pokemonInfo += ' - wow that is big';
        }
    pokemonInfo += '<br><br>';
    document.write(pokemonInfo);
}

