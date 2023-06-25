import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
   const nameTrainer = useSelector(store => store.nameTrainer )
    //Lo que buscamos es ver si en nuestra store tiene nameTrainer un valor
    //recordando que "" es un falsy entonces nos aprovechamos de eso
    if(nameTrainer){
        return (
            <Outlet/>
        )
   }else{
        return <Navigate to="/"/>
   }
   
}

export default ProtectedRoute