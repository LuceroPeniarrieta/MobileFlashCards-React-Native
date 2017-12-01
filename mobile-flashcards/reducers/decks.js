import { ADD_DECK, GET_DECKS, ADD_CARD } from '../actions/decks';

export function decks(state = {}, action){
    
    switch (action.type) {

        case GET_DECKS:
            return {
                ...state, 
                ...action.decks
            }

        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }

        case ADD_CARD:
            state[action.deck.key].questions.push(action.deck.data)
            return state;
    
        default:
            return state;
    }
}