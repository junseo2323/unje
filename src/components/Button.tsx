import Link from "next/link";
import React from "react";

interface ButtonbProps {
    text : string;
    color : string;
    link: string;
}

export const Button: React.FC<ButtonbProps> = ({color,text,link}) => {
    return(
        <Link href={link}><button className={`${color} w-full md:w-80 h-12 rounded-md text-white text-lg font-semibold mt-4`}>{text}</button></Link>
    )
}