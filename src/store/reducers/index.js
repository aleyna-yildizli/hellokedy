import { FAVORILERE_EKLE, FAVORILERDEN_CIKAR } from '../actions/index.js';

const initialState = {
    favCats: [],
  };


export default function reducer (state = initialState, action) {
    switch(action.type) {
        case FAVORILERE_EKLE:
            return {
                ...state,
                favCats: [...state.favCats, action.payload]
            }
        case FAVORILERDEN_CIKAR:
            return {
                ...state,
                favCats: state.favCats.filter((m) => m.id !== action.payload),
                }

    default:
        return state;
    }
}