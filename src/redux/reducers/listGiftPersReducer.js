import { FETCH_LIST_SUCCESS,FETCH_LIST_FAIL } from "../actions/types";


const initState = [];


const listGiftPersReducer = (state = initState, action) => {
        const list = action.payload

  switch (action.type) {
        case FETCH_LIST_SUCCESS:

                // je regroupe tous les cadeaux en associants les produits
                const objetsRegroupes = list.reduce((acc, objet) => {
                const giftId = objet.gift.id;
                
                if (!acc.has(giftId)) {
                        acc.set(giftId, {
                        gift: objet.gift,
                        product: [],
                        quantity:1
                        });
                }
                
                acc.get(giftId).product.push(objet.product);
                
                return acc;
                }, new Map());
                
                const resultat = Array.from(objetsRegroupes.values());

                return resultat
                
        case FETCH_LIST_FAIL:
                return {
                        ...state
                }

        default:
        return state;
  }

};

export default listGiftPersReducer