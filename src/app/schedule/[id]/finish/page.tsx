'use client'

import { Button } from "@/components/Button"
import { FinalDragcal } from "@/components/Dragcal"
import fetchRoomdata from "@/util/fetchdata";
import { Suspense, useEffect, useState } from "react";

let clickedArray: string[] = [];
interface TimeRange {
  startDate: string;
  startTime: string;
  endTime: string;
}


function getTimeRanges(inputArray: string[]): TimeRange[] {
  // 입력된 배열을 날짜별로 그룹화
  const groupedByDate: { [date: string]: string[] } = {};
  inputArray.forEach(dateTimeStr => {
      const [date, hour,minute] = dateTimeStr.split(':');
      if (!groupedByDate[date]) {
          groupedByDate[date] = [];
      }
      groupedByDate[date].push(hour+":"+minute);
  });

  // 각 날짜별로 시작 시간과 끝 시간을 추출하여 TimeRange 객체 생성
  const timeRanges: TimeRange[] = [];
  for (const date in groupedByDate) {
      const times = groupedByDate[date];
      const sortedTimes = times.sort();
      const startDate = date;
      const startTime = sortedTimes[0];
      const endDate = date;
      const tempTime = sortedTimes[sortedTimes.length - 1];
      const endTime = (tempTime.split(':')[1] === "00")?(tempTime.split(':')[0])+":30":(parseInt(tempTime.split(':')[0])+1)+":00";
      timeRanges.push({ startDate, startTime, endTime });
  }

  return timeRanges;
}

export default function User({ params }: { params: { id: string } }) {
  const [roomdata,setRoomdata] = useState<any>(null);
  const [final, setFinal] = useState<TimeRange[]>([]);


  const clickHandle = () => {
    const timeRanges = getTimeRanges(clickedArray);
    const updatedFinal: TimeRange[] = timeRanges.map(range => ({
      startDate: range.startDate,
      startTime: range.startTime,
      endTime: range.endTime,
    }));
    setFinal(updatedFinal);
  }
  
  useEffect(()=>{
    fetchRoomdata(params.id)
      .then((data) => {
        setRoomdata(data);
      })
      .catch((error)=> {
        console.error(error);
      })
  }, [params.id])

    return(
      <Suspense fallback={<div>로딩중</div>}>
        {
          roomdata &&         
          <main>
          <div className="grid place-items-left p-[35px]">
              <p className="font-semibold">D236X1</p>
              <h1 className="font-thin text-2xl mb-5">오준서의 밥약</h1>
              <p className="font-thin text-base mb-5">MRA 동아리에서 함께하는 밥약입니다.</p>
              <h1 className="font-semibold text-2xl mb-5">언제 만날까요?</h1>
              <div className="mb-5">
                  <FinalDragcal getdata={clickedArray} roomdata={roomdata} />
              </div>
          </div>
          <button
              onClick={clickHandle} 
              className={`bg-[#6F98FF] fixed bottom-0 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`}>
              완료하기
          </button>
        </main>
  
        }
      </Suspense>
    )
}