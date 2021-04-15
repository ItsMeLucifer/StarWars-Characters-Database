import axios from 'axios';

const host = 'https://swapi.dev'
const STARWARSAPI = {
    getCharacters: (page: number, success: any) => {
        axios.get(`${host}/api/people${page === 0 ? '' : '/?page=' + page}`)
            .then(res => {
                success(res);
            })
            .catch(res => {
                console.log(res);
            })
    },
    getFilm: (film: number, success: any) => {
        axios.get(`${host}/api/films/${film}`)
            .then(res => {
                success(res);
            })
            .catch(res => {
                console.log(res);
            })
    }
}

export default STARWARSAPI;