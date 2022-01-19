import React from 'react';
import CartTable from '../cart-table';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuError, menuSuccess, menuRequested } from '../../actions';
import Spinner from '../spinner/spinner';
import Error from '../error';

const CartPage = (props) => {
    // console.log(props)
    const {cartList, RestoService, menuError, menuSuccess, menuRequested, total, err, load} = props

    const post = () => {
        menuRequested();
        const body = {...cartList, sum: total}

        RestoService.postTotal('/total/', body)
        .then(() => alert('Good'))
        .then(menuSuccess)
        .catch(menuError)

    }

    const btn = cartList.length && !err && !load ? 
    <Button onClick={post} colir='info' className='d-block mx-auto'>Post</Button> :
    null;

    const content = load ? <Spinner/> : err ? <Error/> : <CartTable/>;

    return (
        <div className="cart"> 
            {content}
            {btn}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartList: state.cartList,
        total: state.total,
        err: state.error,
        load: state.loading
    }
}

export default WithRestoService()(connect(mapStateToProps, {menuError, menuSuccess, menuRequested})(CartPage));