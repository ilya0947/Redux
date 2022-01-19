import React, { Component } from 'react';
import * as actions from '../../actions';
import WithRestoService from '../hoc';
import MenuListItem from '../menu-list-item';
import Error from '../error';
import { connect } from 'react-redux';
import Spinner from '../spinner/spinner';

import './menu-list.scss';

class MenuList extends Component {
    action = true;
    componentDidMount() {
        const { menuLoaded, RestoService, menuError, menuRequested } = this.props;
        menuRequested();

        RestoService.getMenuItems('/menu/')
            .then(res => menuLoaded(res))
            .catch(menuError);
    }

    flyToCart = (e) => {
        if (this.action) {
            this.action = false;
            const card = e.target.parentNode;
            card.style.position = `relative`;
            const clone = card.cloneNode(card, true);
            const t = 300;
            const yCard = card.getBoundingClientRect().bottom;
            const xCard = card.getBoundingClientRect().left;
            const w = +window.getComputedStyle(card).width.replace(/px/, '') / 2 - 10;
            const h = +window.getComputedStyle(card).height.replace(/px/, '') / 2 - 10;
            const basket = document.querySelector('.header__cart');
            card.appendChild(clone)
            const yBasket = basket.getBoundingClientRect().bottom;
            const xBasket = basket.getBoundingClientRect().left;
            const x = xBasket - xCard - w;
            const y = yBasket - yCard + h;

            clone.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            transition: ${t}ms all ease;
            z-index: 10;
            transform: translate(${x}px, ${y}px) scale(.01);`;

            setTimeout(() => {
                clone.remove();
                card.removeAttribute('style');
                this.action = true;
            }, t);
        }
    }

    render() {
        const { loading, menu, err, addedToCart } = this.props;


        const content = loading ? <Spinner /> : err ? <Error /> :
            menu.map(item => {
                const { id, ...props } = item;
                return <MenuListItem key={id} addItemToCart={(e) => { this.flyToCart(e); addedToCart(id); }} {...props} />
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