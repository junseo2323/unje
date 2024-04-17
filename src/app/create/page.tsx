'use client'
import { Button } from "@/components/Button";
import React, { useState } from "react";

export default function Create() {
  const [selectedStarttime, setSelectedStarttime] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const starttimes: string[] = [];
  const times: string[] = [];


  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      starttimes.push(`${formattedHour}:${formattedMinute}`);
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStarttime(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };
    return (
      <main>
        <div className="grid place-items-left p-[35px]">
            <input placeholder="어떤 만남인가요?" className="mt-5 border-b-2 w-60 border-black outline-none pb-1 font-thin text-2xl" />
            <h1 className="mt-10 font-semibold text-2xl">자세한 정보를 알려주세요</h1>
            <textarea placeholder="간단하게 한줄로 우리의 모임을 소개해주세요!" className="border-b-2 w-80 border-black outline-none pb-1 font-thin text-base h-14" />

            <h1 className="mt-10 font-semibold text-2xl">몇일날 만나고 싶으신가요?</h1>
            <div className="mt-5">
                <input type="date" className="w-40"/>
                <span className="pl-10 font-bold">부터</span>
            </div>
            <div>
                <input type="date" className="w-40"/>
                <span className="pl-10 font-bold">까지</span>
            </div>
            <h1 className="mt-10 font-semibold text-2xl">몇시에 만나고 싶으신가요?</h1>
            
            <div className="mt-5">
                <select
                    value={selectedStarttime}
                    onChange={handleStartTimeChange}
                >
                    <option value="">00:00</option>
                    {starttimes.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                    ))}
                </select>
                <span>부터</span>

                <select
                    value={selectedTime}
                    onChange={handleTimeChange}
                >
                    <option value="">23:30</option>
                    {times.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                    ))}
                </select>
                <span>까지</span>
            </div>

        </div>
        <Button link="/schedule/test" color="bg-[#76885B] fixed bottom-0 mb-4" text="생성하기"/>
      </main>
    );
  }
  