import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import LayoutDefault from './layouts/layout'
import Login from './views/login'
import App from './views/App'
import  DashboardLayout from './layouts/dashboardLayout'
import Dashboard from './views/dashboard'

const Rota = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LayoutDefault />}>
                <Route index element={<App />} /> 
                <Route path='login' element={<Login />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />}/>
            </Route>
        </>
    )
)

export default Rota