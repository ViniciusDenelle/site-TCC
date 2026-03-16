import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import LayoutDefault from './layouts/layout'
import App from './views/App'
import Login from './views/login'

const Rota = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<LayoutDefault />}>
            <Route index element={<App />} /> 
            <Route path="/login" element={<Login />} /> 
        </Route>
    )
)

export default Rota