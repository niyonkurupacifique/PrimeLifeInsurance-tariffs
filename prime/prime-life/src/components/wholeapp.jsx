import React from "react";
import Header from "./header";
import Body from "./body";
import { useState } from "react";
import { ThemeContext } from "./themeContext";
function Wholeapp(){
    const[theme,setTheme]=useState("light")
    return(
        <div>
            <ThemeContext.Provider value={{theme,setTheme}}>
         <Header></Header>
         <Body></Body>
         </ThemeContext.Provider>
        </div>
    )
}
export default Wholeapp