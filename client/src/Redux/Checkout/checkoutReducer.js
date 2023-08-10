import { POST_BILL, GET_ALL_BILLS } from "./checkoutActions"

const initialState = {
    bill: {},
    allBills: [],
}

const checkoutReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case POST_BILL:
            return{
                ...state,
                bill: action.payload,
                
            };

        case GET_ALL_BILLS:
            return {
                ...state,
                allBills: action.payload
            }

        default:
            return {...state}
    }
}

export default checkoutReducer;