import React from "react"
import { Route, Routes } from "react-router-dom"
import CreateSector from "./components/CreateSector"
import UpdateSector from "./components/UpdateSector"
function Routess(){
    return(
        <Routes>
            <Route path="/" element={<CreateSector/>} />
            <Route path="user/sector/" element={<UpdateSector/>} />
        </Routes>
    )
}
export default Routess;