import * as actionTypes from '../actions/actionTypes';


const initialState = {
    ingredients:null,
    totalPrice :4,
    error:false,
}

const INTGREDIENT_PRICES ={
    salad:0.5,
    meat:1.3,
    cheese:0.4,
    bacon:0.7,
}


const reducer = (state=initialState,action)=>{

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:{
            let UpdatedIngredients  = {...state.ingredients};
            UpdatedIngredients[action.ingredientName] +=1;
            return{
                ...state,
                ingredients:UpdatedIngredients,
                totalPrice:state.totalPrice+INTGREDIENT_PRICES[action.ingredientName],

            }
        }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1,
                },
                totalPrice:state.totalPrice-INTGREDIENT_PRICES[action.ingredientName],
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients:action.ingredients,
                totalPrice:4,
                error:false,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true,
            }
        // this is the case for the fetching ingredients from component itself without using 
        // asyn calling in redux
        // case actionTypes.FETCH_INGREDIENTS:
        //     return{
        //         ...state,
        //         ingredients:{
        //             ...action.ingredients,
        //         },
                
        //     }
            
        
        default:
            return state;
    }
}


export default reducer;