import { getDecksAction, addDeckAction, addCardAction } from './decks';
import { getDecksApi, addDeckApi, addCardApi } from '../utils/api'

export function getDecks() {
    
    return (dispatch) => {
        getDecksApi()
        .then((decks) => { dispatch(getDecksAction(JSON.parse(decks))) }) 
        .catch((error) => console.warn(error));
    }
} 

export function addDeck(key, data) {
    return (dispatch) => {
        addDeckApi({key, data}) 
        dispatch(addDeckAction({
            [key]: data
        }))
    }
}

export function addCard(key, data) {
    return (dispatch) => {
        addCardApi({key, data}) 
        dispatch(addCardAction({key, data}))
    }
}