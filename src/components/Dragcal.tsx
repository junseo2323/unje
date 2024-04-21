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

const dummy = {
    "_id": "3DRXU1",
    "id": "3DRXU1",
    "room_title": "공부방",
    "room_description": "공부를 함께하는 방입니다.",
    "start_date": "2024-04-17",
    "end_date": "2024-04-24",
    "start_time": "14:00",
    "end_time": "18:00",
    "membercount" : 3,
    "members": [
      {
        "name": "오준서",
        "time": [
          "16:10:30",
          "15:10:30",
          "14:10:30"
        ]
      },
      {
        "name": "김태우",
        "time": [
          "16:10:30",
          "15:10:30",
          "14:10:30"
        ]
      },
      {
        "name": "유동현",
        "time": [
          "16:10:30",
          "15:10:30",
          "14:10:30"
        ]
      }
    ]
}

interface Member {
    name: string;
    time: string[];
}

interface TimeCount {
    [time: string]: number;
}

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


interface ClickedType {
    id : string;
    data: string[];
}
interface ShowClickedType {
    id : string;
    count : number;
    init?: { [key: string]: number };
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
    }

    return(
            <button 
                id={id} 
                className={`w-full h-10 ${isClicked?'bg-lime-500':'bg-white'} border border-black`} 
                onClick={handleClick} 
            />        
    )
}

const Showclicked: React.FC<ShowClickedType> = ({id,count,init}) => {
    let clickmem: number = init ? init[id] || 0 : 0;

    return(
            <button 
                id={id} 
                className={`w-full h-10 bg-lime-${clickmem}00 border border-black`} 
            />
    )
}

interface UserDragcalProps {
    getdata: string[];
}

export const UserDragcal: React.FC<UserDragcalProps> = ({getdata}) => {
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
                            <Clicked id={day+':'+time} data={getdata}/>
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

    const initialdata = countTimeOccurrences(dummy.members);
    console.log(initialdata)

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
        <div className={`grid w-80 grid-cols-8 grid-cols-${day+1}`}>
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
                            <Showclicked id={day+':'+time} count={5} init={initialdata}/>
                        ))
                    }
                    </>

                ))
            }

        </div>
    )
}