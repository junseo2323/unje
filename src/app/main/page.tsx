'use client'

import { Button } from "@/components/Button";
import { useState,ChangeEvent } from "react";

export default function Main() {
    const [code,setCode] = useState("TEST");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
    }
    return (
      <>
          <div className="grid place-items-center">
            <input placeholder="코드를 입력해주세요" onChange={handleChange} className="mt-[20rem] mb-[20rem] border-b-2 w-60 border-black outline-none pb-1 font-thin text-center" />
          </div>
          <p className="font-thin w-full text-center text-sm  fixed bottom-32">일정을 만드시려면?</p>
          <Button link="/create" color="bg-[#76885B] fixed bottom-16 mb-4" text="생성하기"/>
          <Button link={"/schedule/"+code} color="bg-[#6F98FF] fixed bottom-0 mb-4" text="참여하기"/>
      </>      
    );
  }
  