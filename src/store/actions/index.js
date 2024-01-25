// action types

export const FAVORILERE_EKLE = 'FAVORILERE_EKLE';
export const FAVORILERDEN_CIKAR = 'FAVORILERE_CIKAR';

export function favorilereEkle(fact) {
    return { type: FAVORILERE_EKLE, payload: fact };
}

export function favorilerdenCıkar(id) {
    return { type: FAVORILERDEN_CIKAR, payload: id };
}