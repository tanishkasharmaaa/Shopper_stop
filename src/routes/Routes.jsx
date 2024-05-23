import {Routes,Route} from 'react-router-dom'
import { SignUp } from '../pages/signup'
import { Login } from '../pages/login'
import { Home } from '../pages/home'
import { About } from '../pages/about'
import { Products } from '../pages/products '
import { Cart } from '../pages/Cart'
import { Payment } from '../pages/payment'
export function RoutesItem(){
    return(
        <Routes>
<Route path='/' element={<SignUp/>}></Route>
<Route path='/login' element={<Login/>}></Route>

<Route path='/home' element={<Home/>}></Route>
<Route path='/about' element={<About/>}></Route>
<Route path='/products' element={<Products/>}></Route>
<Route path='/cart' element={<Cart/>}></Route>
<Route path='/:id' element={<Payment/>}></Route>
        </Routes>
    )
}