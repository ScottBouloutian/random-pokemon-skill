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
        this.pokemonCount = 0;
    }

    /**
    * Initializes the pokedex by making a request to get the number of pokemon available from the
    * api
    * @returns {Promise} A promise that resolves when initialization is complete
    */
    initialize() {
        const params = {
            limit: 0,
            offset: 0,
        };
        return axios.get(`${this.host}/pokemon`, { params })
            .then(({ count }) => {
                this.pokemonCount = count;
            });
    }

    /**
    * Get data for a random pokemon from the api
    * @returns {Promise} A promise that resolves with pokemon data
    */
    randomPokemon() {
        const params = {
            limit: 1,
            offset: _.random(this.pokemonCount),
        };
        return Promise.resolve()
            .then(() => axios.get(`${this.host}/pokemon`, { params }))
            .then(({ results }) => axios.get(results[0].url));
    }
}

export default Pokedex;
