import React, { useState } from "react";
import "./Color.css";

 export const Colorran=()=>{
    // const[color,setColor]=useState('white');
    const[bgColor,setbgColor]=useState('#ffffff');


    const change=()=>{
            const color=`#${Math.floor(Math.random() * 16777215).toString(16)}`;
            // setColor(color);
            setbgColor(color);
            
    }
        const reset=()=>{
                // setColor('white');
                setbgColor('white');
        }
    return(
        <>
        <div className="App" style={{ backgroundColor: bgColor }}>
        <h1>Color Generator</h1>
            <div className="content">
                <p>color code:{bgColor}</p>
                <button className="change" onClick={change}>change color</button>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </div>

        </>
    )
};