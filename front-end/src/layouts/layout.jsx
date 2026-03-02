import { NavLink, Outlet } from "react-router-dom"

function LayoutDefault()
{
    return (
        <>
            <header className="bg-stone-100 w-full">
                <div className="container mx-auto">
                    <nav className="flex justify-between p-3">
                        <h1 className="text-2xl">
                            site
                        </h1>

                        <ul className="flex gap-5">
                            <li>
                                <NavLink to='/login'>
                                    login
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default LayoutDefault