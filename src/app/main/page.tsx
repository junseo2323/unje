'use client'

import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState,ChangeEvent } from "react";
import Swal from "sweetalert2";

export default function Main() {
    const [code,setCode] = useState("");
    const router = useRouter();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
    }
    const handleClick = () => {
      if(code.length < 6) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
            Toast.fire({
          icon: 'error',
          title: '코드를 6자리로 입력해주세요.'
        })
      
        } else{
          console.log(code.length);
          router.push('/schedule/'+code)
        }
      }
    return (
      <>
          <div className="grid place-items-center">
            <input placeholder="코드를 입력해주세요" required onChange={handleChange} className="mt-[20rem] mb-[20rem] border-b-2 w-60 border-black outline-none pb-1 font-thin text-center" />
          </div>
          <p className="font-thin w-full text-center text-sm  fixed bottom-32">일정을 만드시려면?</p>
          <Button link="/create" color="bg-[#76885B] fixed bottom-16 mb-4" text="생성하기"/>
            <button
                onClick={handleClick} 
                className={`bg-[#6F98FF] fixed bottom-0 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`}>
            참여하기
                </button>
      </>      
    );
  }
  