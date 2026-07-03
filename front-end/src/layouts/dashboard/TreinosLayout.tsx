import React from 'react'
import { Outlet } from 'react-router-dom'

const TreinosLayout = () => {
  return (
    <div className="bg-base-primaria">
        <div className="container mx-auto">
            <div className="flex min-h-screen w-full justify-center items-center py-10">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default TreinosLayout
