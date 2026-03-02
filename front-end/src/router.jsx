import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import LayoutDefault from './layouts/layout'
import Login from './views/login'
import App from './views/App'

const Rota = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<LayoutDefault />}>
            <Route index element={<App />} /> 
            <Route path='login' element={<Login />} />
        </Route>
    )
)

export default Rota