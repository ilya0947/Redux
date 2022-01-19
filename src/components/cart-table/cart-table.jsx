import React from 'react';
import { connect } from 'react-redux';
import {deleteToCart} from '../../actions'
import './cart-table.scss';

const CartTable = ({cartList, deleteToCart}) => {
    
    const content = cartList.map(item => {
        const {id, url, count, price, title } = item;

        const num = count > 1 ? count + ' x th' : null;
        return (
            <div key={id} className="cart__list">
                <div className="cart__item">
                    <img src={url} className="cart__item-img" alt={title}></img>
                    <div className="cart__item-title">{title} {num}</div>
                    <div className="cart__item-price">{price * count}$</div>
                    <div onClick={() => deleteToCart(id) } className="cart__close">&times;</div>
                </div>
            </div>
        )
    });

    const title = content.length ? 'Ваш заказ:' : 'Пусто :('
    
    return (
        <>
            <div className="cart__title">{title}</div>
            {content}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        cartList: state.cartList
    }
}



export default connect(mapStateToProps, {deleteToCart})(CartTable);