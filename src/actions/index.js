const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    };
};

const menuError = () => {
    return {
        type: 'MENU_ERROR'
    };
};

const menuSuccess = () => {
    return {
        type: 'MENU_SUCCESS'
    };
};

const addedToCart = (id) => {
    return {
        type: 'ADDED_TO_CART',
        payload: id
    };
};

const deleteToCart = (id) => {
    return {
        type: 'DELETE_TO_CART',
        payload: id
    };
};

export {
    menuSuccess,
    menuLoaded,
    deleteToCart,
    addedToCart,
    menuRequested,
    menuError
};