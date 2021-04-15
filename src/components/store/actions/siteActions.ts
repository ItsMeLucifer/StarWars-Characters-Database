import STARWARSAPI from '../../utils/starWarsApi';

interface Character {
    birth_year: string,
    films: Array<string>,
    films_data: Array<Film>
    name: string,
    height: string,
    visible: boolean,
    gender: string
}
interface Film {
    characters: Array<string>,
    title: string,
    episode_id: number
}
interface CharactersResult {
    data: Array<Character>
}
interface FilmResult {
    data: Film
}
export const getCharacters = (page: number) => {
    return (dispatch: any) => {
        STARWARSAPI.getCharacters(page, (res: CharactersResult) => {
            dispatch({
                type: 'GOT_CHARACTERS',
                payload: res.data
            });
        });
    }
}
export const getFilm = (name: string, film: number) => {
    return (dispatch: any) => {
        STARWARSAPI.getFilm(film, (res: FilmResult) => {
            dispatch({
                type: 'GOT_FILM',
                payload: {
                    film: res.data,
                    characterName: name
                }
            })
        })
    }
}
export const sortCharactersByName = () => {
    return (dispatch: any) => {
        dispatch({
            type: 'SORT_CHARACTERS_BY_NAME'
        })
    }
}

export const searchName = (name: string) => {
    return (dispatch: any) => {
        dispatch({
            type: 'SEARCH_NAME',
            payload: {
                name: name
            }
        })
    }
}

export const searchFilm = (film_number: number) => {
    return (dispatch: any) => {
        dispatch({
            type: 'SEARCH_FILM',
            payload: {
                film_number: film_number
            }
        })
    }
}