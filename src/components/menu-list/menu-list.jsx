import React, { Component } from 'react';
import * as actions from '../../actions';
import WithRestoService from '../hoc';
import MenuListItem from '../menu-list-item';
import Error from '../error';
import { connect } from 'react-redux';

import './menu-list.scss';
import Spinner from '../spinner/spinner';

class MenuList extends Component {
    componentDidMount() {
        const { menuLoaded, RestoService, menuError, menuRequested} = this.props;
        menuRequested();

        RestoService.getMenuItems('/menu/')
        .then(res => menuLoaded(res))
        .catch(menuError);
    }

    flyToCart = (e) => {
        const card = e.target.parentNode;
        const basket = document.querySelector('.header__cart');
        const xCard = card.getBoundingClientRect().bottom;
        const yCard = card.getBoundingClientRect().left;
        const xBasket = basket.getBoundingClientRect().bottom;
        const yBasket = basket.getBoundingClientRect().left;
        const x = xBasket - xCard;
        const y =  yCard-yBasket;
        const clone = card.cloneNode(card, true);
        const t = 1000;

        // card.style.position = `relative`;
        card.appendChild(clone)
        clone.style.cssText = `
        position: absolute;
        transition: ${t}ms all ease;
        z-index: 10;`;
        clone.style.transform = `translate(${x}px, ${y}px) scale(.05)`;

        setTimeout(() => {
            // clone.remove();
        }, t);
        // const
        console.log(yBasket, xBasket)
    }
    
    render() {
        const { loading, menu, err, addedToCart } = this.props;
        
        
        const content = loading ? <Spinner /> : err ? <Error /> :
        menu.map(item => {
            const {id, ...props} = item;
                return <MenuListItem key={id} addItemToCart={() => addedToCart(id)} {...props} />
            })

        return (
            <ul className="menu__list">
                {content}
            </ul>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        loading: state.loading,
        err: state.error,
        cartList: state.cartList
    }
}


export default WithRestoService()(connect(mapStateToProps, actions)(MenuList));