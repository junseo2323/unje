'use client'
import React, {Suspense, useEffect, useState} from "react"

let dummydata = {
    day : 0, // 최대 7일
    startweek : 0, //0 : sun
    endweek : 0, //6 : sat
    startday: 0,
    endday : 0,
    starttime: "",
    endtime: "",
    startDate: new Date(),
    endDate: new Date()
}

interface Member {
    name: string;
    time: string[];
}

interface TimeCount {
    [time: string]: number;
}

interface UserDragcalProps {
    getdata: string[];
    roomdata: roomdataType;
}

interface roomdataType {
  _id: string,
  id: string,
  room_title: string,
  room_description: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
  membercount: number,
  members: Member[]
}

interface DragcalProps {
    roomdata: roomdataType;
    clicked: string;
}

interface FinalDragcalProps {
    roomdata: roomdataType;
    getdata: string[];
}

interface ClickedType {
    id : string;
    data: string[];
}
interface ShowClickedType {
    id : string;
    count : number;
    clicked : string[];
    init?: { [key: string]: number };
}
interface FinalClickedType {
    id : string;
    init?: { [key: string]: number };
    data: string[];
}

type ColorVariants = {
    [key: number]: string;
}

/*******************************/

function countTimeOccurrences(members: Member[]): TimeCount {
    const timeCount: TimeCount = {};
    // 각 멤버의 시간 배열을 반복하여 시간의 등장 횟수를 계산합니다.
    members.forEach(member => {
        member.time.forEach(time => {
            if (timeCount[time]) {
                timeCount[time]++;
            } else {
                timeCount[time] = 1;
            }
        });
    });

    return timeCount;
}



function updateGlobalObject(key: string, value: boolean, globalArray: string[]): void {
    const index = globalArray.indexOf(key);
    if (index === -1 && value) {
        globalArray.push(key);
    } else if (index !== -1 && !value) {
        globalArray.splice(index, 1);
    }

}

const Clicked: React.FC<ClickedType> = ({id,data}) => {
    const [isClicked, setIsClicked] = useState(false);
   
    const handleClick = () => {
        setIsClicked(!isClicked);
        updateGlobalObject(id,!isClicked,data);
        console.log(id)
    }

    return(
            <button 
                id={id} 
                className={`w-full h-10 ${isClicked?'bg-lime-500':'bg-white'} border border-black`} 
                onClick={handleClick} 
            ></button>        
    )
}


const Showclicked: React.FC<ShowClickedType> = ({id,init,clicked}) => {
    let clickmem: number = init ? init[id] || 0 : 0;
    const colorVariants: ColorVariants = {
        1 : 'bg-lime-50',
        2 : 'bg-lime-100',
        3 : 'bg-lime-200',
        4 : 'bg-lime-300',
        5 : 'bg-lime-400',
        6 : 'bg-lime-500',
    }
    return(
            <button 
                id={id} 
                className={`w-full h-10 ${colorVariants[clickmem]} border border-black ${clicked&&clicked.includes(id)&&'border-red-500'}`} 
            ></button>
    )
}

const Finalclicked: React.FC<FinalClickedType> = ({id,init,data}) => {
    let clickmem: number = init ? init[id] || 0 : 0;

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if(init && id in init)
        {
            setIsClicked(!isClicked);
            updateGlobalObject(id,!isClicked,data);
        }
    }

    const colorVariants: ColorVariants = {
        1 : 'bg-lime-50',
        2 : 'bg-lime-100',
        3 : 'bg-lime-200',
        4 : 'bg-lime-300',
        5 : 'bg-lime-400',
        6 : 'bg-lime-500',
    }
    return(
            <button 
                id={id}
                onClick={handleClick} 
                className={`w-full h-10 ${colorVariants[clickmem]} border border-black ${isClicked&&'border-red-500'}`} 
            ></button>
    )
}

function getDateDifference(date1Str:string, date2Str:string) {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    
    const diffTime: number = Math.abs(date2.getTime() - date1.getTime());
    const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
    return diffDays+1;
}

function getDayOfWeek(dateStr: string): number {
    const date: Date = new Date(dateStr);
    const dayOfWeekIndex: number = date.getDay();

    return dayOfWeekIndex;
}

export const UserDragcal: React.FC<UserDragcalProps> = ({getdata,roomdata}) => {
    useEffect(()=>{
        dummydata['day'] = getDateDifference(roomdata.start_date, roomdata.end_date);
        dummydata['starttime'] = roomdata.start_time;
        dummydata['endtime'] = roomdata.end_time;
        dummydata['startday'] = parseInt(((roomdata.start_date).split('-'))[2]);
        dummydata['endday'] = parseInt(((roomdata.end_date).split('-'))[2])
        dummydata['startweek'] = getDayOfWeek(roomdata.start_date);
        dummydata['endweek'] = getDayOfWeek(roomdata.end_date);
    })

    const {day,startweek,endweek,startday,starttime,endtime} = dummydata;

    const week = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun'];
    
    
    let weeks;
    if(startweek > endweek) weeks = week.slice(startweek,endweek+8);
    else weeks = week.slice(startweek, endweek+1);

    const startDate: Date = new Date(roomdata.start_date);
    const endDate: Date = new Date(roomdata.end_date);
    const days: string[] = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const formattedDate: string = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        days.push(formattedDate);
    }
      
    const colscount = 'grid-cols-'+(day+1);

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
        <div className={`grid ${colscount}`}>
            <div></div>
            {
                weeks.map((week) => (
                    <p className="text-center font-thin text-sm">{week}</p>
                ))
            }

            <div></div>
            {
                days.map((day) => (
                    <p className="text-center font-normal text-sm">{day}</p>
                ))
            }
            {
                times.map((time)=>(
                    <>
                    <p className="font-thin text-sm text-center">{time}</p>
                    {
                        days.map((day)=>(
                            <Clicked id={day+':'+time} data={getdata}/>
                        ))
                    }
                    </>

                ))
            }

        </div>
    )
}


export const Dragcal: React.FC<DragcalProps> = ({roomdata,clicked}) => {
    
    useEffect(()=>{
        dummydata['day'] = getDateDifference(roomdata.start_date, roomdata.end_date);
        dummydata['starttime'] = roomdata.start_time;
        dummydata['endtime'] = roomdata.end_time;
        dummydata['startday'] = parseInt(((roomdata.start_date).split('-'))[2]);
        dummydata['endday'] = parseInt(((roomdata.end_date).split('-'))[2])
        dummydata['startweek'] = getDayOfWeek(roomdata.start_date);
        dummydata['endweek'] = getDayOfWeek(roomdata.end_date);
    })

    const {day,startweek,endweek,startday,starttime,endtime} = dummydata;

    const initialdata = countTimeOccurrences(roomdata.members);
    let clickeddata: string[];
    
    (roomdata.members).forEach((e) => {
        const {name,time} = e;
        if(name===clicked) clickeddata=time; 
    })

    const week = ['Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
    
    let weeks;
    if(startweek > endweek) weeks = week.slice(startweek,endweek+8);
    else weeks = week.slice(startweek, endweek+1);

    const startDate: Date = new Date(roomdata.start_date);
    const endDate: Date = new Date(roomdata.end_date);
    const days: string[] = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const formattedDate: string = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        days.push(formattedDate);
    }
      
    const colscount = 'grid-cols-'+(day+1);

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

    console.log(times)

    return(
        <Suspense fallback={<div>로딩중</div>}>
            {roomdata &&
                <div className={`grid w-80 ${colscount}`}>
                <div></div>
                {
                    weeks.map((week) => (
                        <p className="text-center font-thin text-sm">{week}</p>
                    ))
                }
    
                <div></div>
                {
                    days.map((day) => (
                        <p className="text-center font-normal text-sm">{day}</p>
                    ))
                }
                {
                    times.map((time)=>(
                        <>
                        <p className="font-thin text-sm text-center">{time}</p>
                        {
                            days.map((day)=>(
                                <Showclicked id={day+':'+time} count={5} init={initialdata} clicked={clickeddata}/>
                            ))
                        }
                        </>
    
                    ))
                }
    
            </div>
            }
        </Suspense>
    )
}

export const FinalDragcal: React.FC<FinalDragcalProps> = ({getdata,roomdata}) => {
    
    useEffect(()=>{
        dummydata['day'] = getDateDifference(roomdata.start_date, roomdata.end_date);
        dummydata['starttime'] = roomdata.start_time;
        dummydata['endtime'] = roomdata.end_time;
        dummydata['endday'] = parseInt(((roomdata.end_date).split('-'))[2])
        dummydata['startweek'] = getDayOfWeek(roomdata.start_date);
        dummydata['endweek'] = getDayOfWeek(roomdata.end_date);
    })

    const {day,startweek,endweek,starttime,endtime} = dummydata;

    const initialdata = countTimeOccurrences(roomdata.members);

    const week = ['Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat','Sun','Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
    
    let weeks;
    if(startweek > endweek) weeks = week.slice(startweek,endweek+8);
    else weeks = week.slice(startweek, endweek+1);

    const startDate: Date = new Date(roomdata.start_date);
    const endDate: Date = new Date(roomdata.end_date);
    const days: string[] = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const formattedDate: string = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        days.push(formattedDate);
    }
      
    const colscount = 'grid-cols-'+(day+1);

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
        <Suspense fallback={<div>로딩중</div>}>
            {roomdata &&
                <div className={`grid w-80 ${colscount}`}>
                <div></div>
                {
                    weeks.map((week) => (
                        <p className="text-center font-thin text-sm">{week}</p>
                    ))
                }
    
                <div></div>
                {
                    days.map((day) => (
                        <p className="text-center font-normal text-sm">{day}</p>
                    ))
                }
                {
                    times.map((time)=>(
                        <>
                        <p className="font-thin text-sm text-center">{time}</p>
                        {
                            days.map((day)=>(
                                <Finalclicked id={day+':'+time} init={initialdata} data={getdata} />
                            ))
                        }
                        </>
    
                    ))
                }
            </div>
            }
        </Suspense>
    )
}