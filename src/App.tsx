import './scss/app.scss'
import React from 'react'
import Home from './pages/Home'
import { Routes,Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout'
import Loadable from 'react-loadable'

const Cart = Loadable({
    loader: () => import('./pages/Cart'),
    loading: () => <div>Загрузка корзины...</div>,
});
const FullPizza = Loadable({
    loader: () => import('./pages/FullPizza'),
    loading: () => <div>Загрузка пиццы...</div>,
});
const NotFound = Loadable({
    loader: () => import('./pages/NotFound'),
    loading: () => <div>Загрузка...</div>,
});


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<Home/>}/>
                <Route path='/cart' element={<Cart />}/>
                <Route path='/pizza/:id' element={<FullPizza />}/>
                <Route path='*' element={<NotFound />}/>
            </Route>
        </Routes>
    );
}

export default App;
