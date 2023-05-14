
import { Outlet } from "react-router-dom";
import { Nav } from "./Navigation/Nav";


const RootLayout=()=>{
    return(
        <>
        <Nav/>
        <Outlet/>
        </>
    )
}

export default RootLayout;