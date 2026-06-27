import React from 'react'
import { Outlet } from 'react-router-dom'

const TreinosLayout = () => {
  return (
    <div className="bg-base-primaria">
        <div className="container mx-auto">
            <div className="flex h-screen w-full justify-center items-center ring">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default TreinosLayout
