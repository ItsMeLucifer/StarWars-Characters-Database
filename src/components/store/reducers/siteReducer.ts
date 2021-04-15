const defaultState = {
    characters: [],
    next: '',
    previous: '',
    totalLength: 0
}
interface Payload {
    next: string,
    count: number,
    previous: string,
    results: any
    characterName: string,
    name: string,
    film_number: number,
    film: Film
}
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
interface Action {
    type: string,
    payload: Payload
}
const site = (state = defaultState, action: Action) => {
    console.log(action.type)
    switch (action.type) {
        case 'GOT_CHARACTERS':
            return {
                ...state,
                next: action.payload.next,
                totalLength: action.payload.count,
                previous: action.payload.previous,
                characters: state.characters.filter((character: Character) => character.name === action.payload.results[0].name).length > 0 ?
                    state.characters :
                    state.characters.concat(action.payload.results).map(character => ({ ...(character as object), visible: true }))
            }
        case 'GOT_FILM':
            return {
                ...state,
                characters: state.characters.map((character: Character) => {
                    if (character.name === action.payload.characterName) {
                        return {
                            ...character,
                            films_data: character.films_data ?
                                character.films_data.filter(film => film.episode_id === action.payload.film.episode_id).length > 0 ?
                                    character.films_data :
                                    character.films_data.concat(action.payload.film) : [action.payload.film]
                        }
                    } else {
                        return character
                    }
                })
            }
        case 'SORT_CHARACTERS_BY_NAME':
            return {
                ...state,
                characters: state.characters.sort((a: Character, b: Character) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) return -1
                    else return 1
                })
            }
        case 'SEARCH_NAME':
            return {
                ...state,
                characters: state.characters.map((character: Character) => {
                    if (action.payload.name === '') {
                        return {
                            ...character,
                            visible: true
                        }
                    } else {
                        if (character.name.toUpperCase().includes(action.payload.name.toUpperCase())) {
                            return {
                                ...character,
                                visible: true
                            }
                        } else {
                            return {
                                ...character,
                                visible: false
                            }
                        }
                    }
                })
            }
        case 'SEARCH_FILM':
            console.log('got film', action.payload);
            return {
                ...state,
                characters: state.characters.map((character: Character) => {
                    if (action.payload.film_number === 0) {
                        return {
                            ...character,
                            visible: true
                        }
                    } else {
                        if (character.films.filter((film: string) => parseInt(film[film.length - 2]) === action.payload.film_number).length > 0) {
                            return {
                                ...character,
                                visible: true
                            }
                        } else {
                            return {
                                ...character,
                                visible: false
                            }
                        }
                    }
                })
            }
        default:
            return state;
    }
}
export default site;