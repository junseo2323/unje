'use client'
import React, {useState } from "react"

const dummydata = {
    day : 7, // 최대 7일
    startweek : 0, //0 : mon
    endweek : 6, //6 : sun
    startday: 11,
    endday : 17,
    starttime: "09:00",
    endtime: "12:00"
}

interface ClickedType {
    id : string;
    noclick : boolean;
}

let globalObject: { [key: string]: any } = {};
function updateGlobalObject(key: string, value: boolean): void {
    if (!(key in globalObject)) {
        globalObject[key] = value;
    }
    else if (!value) {
        delete globalObject[key];
    }
    else {
        globalObject[key] = value;
    }
}

const Clicked: React.FC<ClickedType> = ({id,noclick}) => {
    const [isClicked, setIsClicked] = useState(false);
   
    const handleClick = () => {
        setIsClicked(!isClicked);
        updateGlobalObject(id,!isClicked);
    }

    return(
            noclick?
            <button 
                id={id} 
                className={`w-full h-10 ${isClicked?'bg-lime-500':'bg-white'} border border-black`} 
            />:
            <button 
                id={id} 
                className={`w-full h-10 ${isClicked?'bg-lime-500':'bg-white'} border border-black`} 
                onClick={handleClick} 
            />        
    )
}

export const UserDragcal = () => {
    const {day,startweek,endweek,startday,starttime,endtime} = dummydata;
  
    const week = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun'];
    
    let weeks;
    if(startweek > endweek) weeks = week.slice(startweek,endweek+8);
    else weeks = week.slice(startweek, endweek+1);

    const days = Array.from({ length: day }, (_, index) => startday + index);

    const start = starttime.split(':');
    const end = endtime.split(':');

    const times: string[] = [];

    for(let hour = parseInt(start[0]); hour<=parseInt(end[0]); hour++){
        for (let minute = parseInt(start[1]); minute < 60; minute += 30) {
            if(hour === parseInt(end[0]) && minute > parseInt(end[1])) break
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            times.push(`${formattedHour}:${formattedMinute}`);
        }
    }

    return(
        <div className={`grid grid-cols-8 grid-cols-${day+1}`}>
            <div></div>
            {
                weeks.map((week) => (
                    <p className="text-center font-thin text-sm">{week}</p>
                ))
            }

            <div></div>
            {
                days.map((day) => (
                    <p className="text-center font-normal">{day}</p>
                ))
            }
            {
                times.map((time)=>(
                    <>
                    <p className="font-thin text-sm text-center">{time}</p>
                    {
                        days.map((day)=>(
                            <Clicked id={day+':'+time} noclick={false}/>
                        ))
                    }
                    </>

                ))
            }

        </div>
    )
}

export const Dragcal = () => {
    const {day,startweek,endweek,startday,starttime,endtime} = dummydata;
  
    const week = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun'];
    
    let weeks;
    if(startweek > endweek) weeks = week.slice(startweek,endweek+8);
    else weeks = week.slice(startweek, endweek+1);

    const days = Array.from({ length: day }, (_, index) => startday + index);

    const start = starttime.split(':');
    const end = endtime.split(':');

    const times: string[] = [];

    for(let hour = parseInt(start[0]); hour<=parseInt(end[0]); hour++){
        for (let minute = parseInt(start[1]); minute < 60; minute += 30) {
            if(hour === parseInt(end[0]) && minute > parseInt(end[1])) break
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            times.push(`${formattedHour}:${formattedMinute}`);
        }
    }

    return(
        <div className={`grid grid-cols-8 grid-cols-${day+1}`}>
            <div></div>
            {
                weeks.map((week) => (
                    <p className="text-center font-thin text-sm">{week}</p>
                ))
            }

            <div></div>
            {
                days.map((day) => (
                    <p className="text-center font-normal">{day}</p>
                ))
            }
            {
                times.map((time)=>(
                    <>
                    <p className="font-thin text-sm text-center">{time}</p>
                    {
                        days.map((day)=>(
                            <Clicked noclick={true} id={day+':'+time}/>
                        ))
                    }
                    </>

                ))
            }

        </div>
    )
}