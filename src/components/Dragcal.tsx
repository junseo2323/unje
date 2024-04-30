'use client'
import React, {Suspense, useEffect, useState} from "react"

let dummydata = {
    day : -1, // 최대 7일
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
    count : number;
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

let isMouseDown = false;
let isTouching = false;

document.addEventListener('touchstart', function() {
  isTouching = true;
});

document.addEventListener('touchend', function() {
  isTouching = false;
});

document.addEventListener('mousedown', function() {
  isMouseDown = true;
});

document.addEventListener('mouseup', function() {
  isMouseDown = false;
});

const Clicked: React.FC<ClickedType> = ({id,data}) => {
    const [isClicked, setIsClicked] = useState(false);
   
    const handleClick = () => {
        if(isMouseDown || isTouching){
        setIsClicked(!isClicked);
        updateGlobalObject(id,!isClicked,data);
        }
    }
    const handleDownClick = () => {
        setIsClicked(!isClicked);
        updateGlobalObject(id,!isClicked,data);
    }
    const [isTouched, setIsTouched] = useState(false);

  


    return(
            <button 
                id={id} 
                className={`w-full h-10 ${isClicked?'bg-lime-500':'bg-white'} border border-black`} 
                onMouseOver={handleClick}
                onMouseDown={handleDownClick}
                
            ></button>        
    )
}


const Showclicked: React.FC<ShowClickedType> = ({id,init,clicked,count}) => {
    let clickmem: number = init ? (init[id]/count)*100 || 0 : 0;
    const key = Math.floor((clickmem + 1) / 20) - 1;

    const colorVariants: ColorVariants = {
        0 : 'bg-lime-100',
        1 : 'bg-lime-200',
        2 : 'bg-lime-300',
        3 : 'bg-lime-400',
        4 : 'bg-lime-500', 
    }
    return(
            <button 
                id={id} 
                className={`w-full h-10 ${colorVariants[key]} border border-black ${clicked&&clicked.includes(id)&&'border-red-500'}`} 
            ></button>
    )
}

const Finalclicked: React.FC<FinalClickedType> = ({id,init,data,count}) => {
    let clickmem: number = init ? (init[id]/count)*100 || 0 : 0;
    const key = Math.floor((clickmem + 1) / 20) - 1;

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
                className={`w-full h-10 ${colorVariants[key]} border border-black ${isClicked&&'border-red-500'}`} 
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
    const [dummydata,setDummydata] = useState<dummydataType>({
        day : -1, // 최대 7일
        startweek : 0, //0 : sun
        endweek : 0, //6 : sat
        startday: 0,
        endday : 0,
        starttime: "",
        endtime: "",
        startDate: new Date(),
        endDate: new Date()    
    });
    
    useEffect(()=>{ 
        setDummydata({
            day : getDateDifference(roomdata.start_date, roomdata.end_date), // 최대 7일
            startweek : getDayOfWeek(roomdata.start_date), //0 : sun
            endweek : getDayOfWeek(roomdata.end_date), //6 : sat
            startday: parseInt(((roomdata.start_date).split('-'))[2]),
            endday : parseInt(((roomdata.end_date).split('-'))[2]),
            starttime: roomdata.start_time,
            endtime: roomdata.end_time,
            startDate: new Date(),
            endDate: new Date()    
    
        });
    },[])


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
      
    const colscount: { [key: number]: string } = {
        0: 'grid-cols-1',
        1: 'grid-cols-2',
        2: 'grid-cols-3',
        3: 'grid-cols-4',
        4: 'grid-cols-5',
        5: 'grid-cols-6',
        6: 'grid-cols-7',
        7: 'grid-cols-8'
    };
    const colClass = colscount[day] || '';
    
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
        <div className={`grid  ${colClass}`}>
            <div></div>
            {
                weeks.map((week,index) => (
                    <p key={index} className="text-center font-thin text-sm">{week}</p>
                ))
            }

            <div></div>
            {
                days.map((day, index) => (
                    <p key={index} className="text-center font-normal text-sm">{day}</p>
                ))
            }
            {
                times.map((time,index)=>(
                    <>
                    <p key={index} className="font-thin text-sm text-center">{time}</p>
                    {
                        days.map((day,index)=>(
                            <Clicked key={index} id={day+':'+time} data={getdata}/>
                        ))
                    }
                    </>

                ))
            }

        </div>
    )
}

interface dummydataType {
    day: number;
    starttime: string;
    startday: number;
    endtime: string;
    endday: number;
    startweek: number;
    endweek: number;
    startDate: Date;
    endDate: Date;
  }
  
export const Dragcal: React.FC<DragcalProps> = ({roomdata,clicked}) => {
    const [dummydata,setDummydata] = useState<dummydataType>({
        day : -1, // 최대 7일
        startweek : 0, //0 : sun
        endweek : 0, //6 : sat
        startday: 0,
        endday : 0,
        starttime: "",
        endtime: "",
        startDate: new Date(),
        endDate: new Date()    
    });
    
    useEffect(()=>{ 
        setDummydata({
            day : getDateDifference(roomdata.start_date, roomdata.end_date), // 최대 7일
            startweek : getDayOfWeek(roomdata.start_date), //0 : sun
            endweek : getDayOfWeek(roomdata.end_date), //6 : sat
            startday: parseInt(((roomdata.start_date).split('-'))[2]),
            endday : parseInt(((roomdata.end_date).split('-'))[2]),
            starttime: roomdata.start_time,
            endtime: roomdata.end_time,
            startDate: new Date(),
            endDate: new Date()    
    
        });
    },[])

    const {day,startweek,endweek,startday,starttime,endtime} = dummydata;

    const initialdata = countTimeOccurrences(roomdata.members);
    let clickeddata: string[] = [];
    
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
      
    const colscount: { [key: number]: string } = {
        0: 'grid-cols-1',
        1: 'grid-cols-2',
        2: 'grid-cols-3',
        3: 'grid-cols-4',
        4: 'grid-cols-5',
        5: 'grid-cols-6',
        6: 'grid-cols-7',
        7: 'grid-cols-8'
    };
    const colClass = colscount[day] || '';


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


    // Check if the key exists before accessing it
    
    return(
        <Suspense fallback={<div>로딩중</div>}>
            {day !== -1 &&
                <div className={`grid w-80 ${colClass}`}>
                <div></div>
                {
                    weeks.map((week,index) => (
                        <p key={index} className="text-center font-thin text-sm">{week}</p>
                    ))
                }
    
                <div></div>
                {
                    days.map((day, index) => (
                        <p key={index} className="text-center font-normal text-sm">{day}</p>
                    ))
                }
                {
                    times.map((time,index)=>(
                        <>
                        <p key={index} className="font-thin text-sm text-center">{time}</p>
                        {
                            days.map((day,index)=>(
                                <Showclicked key={index} id={day+':'+time} count={roomdata.members.length} init={initialdata} clicked={clickeddata}/>
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
    
    const [dummydata,setDummydata] = useState<dummydataType>({
        day : -1, // 최대 7일
        startweek : 0, //0 : sun
        endweek : 0, //6 : sat
        startday: 0,
        endday : 0,
        starttime: "",
        endtime: "",
        startDate: new Date(),
        endDate: new Date()    
    });
    
    useEffect(()=>{ 
        setDummydata({
            day : getDateDifference(roomdata.start_date, roomdata.end_date), // 최대 7일
            startweek : getDayOfWeek(roomdata.start_date), //0 : sun
            endweek : getDayOfWeek(roomdata.end_date), //6 : sat
            startday: parseInt(((roomdata.start_date).split('-'))[2]),
            endday : parseInt(((roomdata.end_date).split('-'))[2]),
            starttime: roomdata.start_time,
            endtime: roomdata.end_time,
            startDate: new Date(),
            endDate: new Date()    
    
        });
    },[])

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
      
    const colscount: { [key: number]: string } = {
        0: 'grid-cols-1',
        1: 'grid-cols-2',
        2: 'grid-cols-3',
        3: 'grid-cols-4',
        4: 'grid-cols-5',
        5: 'grid-cols-6',
        6: 'grid-cols-7',
        7: 'grid-cols-8'
    };
    const colClass = colscount[day] || '';
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
                <div className={`grid w-80 ${colClass}`}>
                <div></div>
                {
                    weeks.map((week,index) => (
                        <p key={index} className="text-center font-thin text-sm">{week}</p>
                    ))
                }
    
                <div></div>
                {
                    days.map((day,index) => (
                        <p key={index} className="text-center font-normal text-sm">{day}</p>
                    ))
                }
                {
                    times.map((time,index)=>(
                        <>
                        <p key={index} className="font-thin text-sm text-center">{time}</p>
                        {
                            days.map((day,index)=>(
                                <Finalclicked key={index} id={day+':'+time} init={initialdata} data={getdata} count={roomdata.members.length}/>
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