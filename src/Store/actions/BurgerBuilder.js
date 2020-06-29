import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = (igName) =>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:igName,
    }
}


export const removeIngredient = (igName) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:igName,
    }
}

// export const fetchIngredients = (ings) =>{
//     return{
//         type:actionTypes.FETCH_INGREDIENTS,
//         ingredients:ings
//     }
// }

// this above method is when we don't use asyn code in the reducer 

const setIngredients = (ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients, 
    }
}

const fetchIngredientsFailed = () =>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}
export const initIngredients = () =>{
    return dispatch =>{
                axios.get('/ingredients.json')
            .then(response=>{
                dispatch(setIngredients(response.data))
            })
            .catch( error =>{
                dispatch(fetchIngredientsFailed());
            })
    }
}