import React, { useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "./themeContext";
function Header(){
    const{theme}=useContext(ThemeContext)
    useEffect(()=>{
     if(theme==="dark")
     {
        document.documentElement.classList.add("dark")
     }
     else{
        document.documentElement.classList.remove("dark")
     }
    },[theme])
    return(
        <div className=" dark:bg-darkModeColor  mt-5">
            <div className=" ml-10 ">
                <img src="https://prime.rw/public/themes//assets/img/svg/nav-logo-icon.svg" alt="" />
            </div>
        <div className=" flex justify-center font-myfontfamily text-myfontsize font-myfontweight tracking-myletterspacing text-mycolor ">
            TARIFFS
        </div>
        </div>
    )
}
export default Header