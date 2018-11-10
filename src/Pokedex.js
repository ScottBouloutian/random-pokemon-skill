const axios = require('axios');
const _ = require('lodash');

/**
* @author Scott Bouloutian <ScottBouloutian@gmail.com>
* @class
* @classdesc Library to make requests for Pokemon data
*/
class Pokedex {
    /**
    * Initializes the Pokedex
    * @constructor
    */
    constructor() {
        this.host = 'https://pokeapi.co/api/v2';
    }

    /**
    * Get data for a random pokemon from the api
    * @returns {Promise} A promise that resolves with pokemon data
    */
    randomPokemon() {
        return axios.get(`${this.host}/pokemon`)
            .then((response) => {
                const pokemon = _.sample(response.data.results);
                return axios.get(pokemon.url);
            })
            .then(response => response.data);
    }
}

module.exports = Pokedex;
