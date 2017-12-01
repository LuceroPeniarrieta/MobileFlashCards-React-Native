export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function getDecksAction(decks) {
    
    return {
        type: GET_DECKS,
        decks
    }
}

export function addDeckAction(deck) {
    
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCardAction(deck) {
    console.log('CARDDDD ACTIONSSS', deck )
    return {
        type: ADD_CARD,
        deck
    }
}