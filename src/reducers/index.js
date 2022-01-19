const initialState = {
    menu: [],
    cartList: [],
    loading: true,
    error: false,
    total: 0
};
const reducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch (type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: payload,
                loading: false
            };
    
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true,
                error: false
            };
    
        case 'MENU_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };
        case 'MENU_SUCCESS':
            return {
                ...state,
                cartList: [],
                loading: false,
                error: false
            };

        case 'ADDED_TO_CART':
            const index = state.cartList
            .findIndex(it => it.id === payload);
            if (index < 0) {
                const newItem = {
                    ...state.menu.filter(el=> el.id === payload)[0],
                    count: 1
                }
                return {
                    ...state,
                    cartList: [
                        ...state.cartList,
                        newItem
                    ],
                    total: state.total += newItem.price
                };
            };
            const newItem = {
                ...state.cartList.find(el=> el.id === payload),
                count: state.cartList[index].count + 1
            };
            return {
                ...state,
                cartList: [
                    ...state.cartList.filter(el=> el.id !== payload),
                    newItem
                ],
                total: state.total += newItem.price
            };
            
        case 'DELETE_TO_CART':
            const item = state.cartList.find(item => item.id === payload);
            const sum = item.count*item.price;
            return {
                ...state,
                cartList: state.cartList.filter(item => item.id !== payload),
                total: state.total - sum
            };

        // case 'SET_TOTAL':
        //     return {
        //         ...state,
        //         total: state.total += payload
        //     }
        default:
            return state;
    }
}

export default reducer;