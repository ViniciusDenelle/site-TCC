import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import LayoutDefault from './layouts/layout'
import App from './views/App'

const Rota = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<LayoutDefault />}>
            <Route index element={<App />} /> 
        </Route>
    )
)

export default Rota