import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import Background from './food-bg.jpg';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader/>
            <Switch>
                <Route exact path='/' render={
                    () => {
                        return (
                            <MainPage/>
                        );
                    }
                }/>
                <Route path='/cart' render={
                    () => {
                        return (
                            <CartPage/>
                        );
                    }
                }/>
                <Route  render={
                    () => {
                        return (
                            <h1>Page not fount</h1>
                        );
                    }
                }/>
            </Switch>
        </div>
    )
}

export default App;