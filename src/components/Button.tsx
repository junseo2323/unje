import React from "react";

interface ButtonbProps {
    text : string;
    color : string;
}

export const Button: React.FC<ButtonbProps> = ({color,text}) => {
    return(
        <button className={`${color} w-full md:w-80 h-12 rounded-md text-white text-lg font-semibold mt-4`}>{text}</button>
    )
}