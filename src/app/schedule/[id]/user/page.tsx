'use client'

import { UserDragcal } from "@/components/Dragcal"
import axios from "axios";
import { useState,ChangeEvent, useEffect,Suspense } from "react";
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import fetchRoomdata from "@/util/fetchdata";
import { Button } from "@/components/Button";

let clickedArray: string[] = [];

export default function User({ params }: { params: { id: string } }) {
    const router = useRouter()

    const [name,setName] = useState('');
    const [roomdata,setRoomdata] = useState<any>(null);

    useEffect(()=>{
      fetchRoomdata(params.id)
        .then((data) => {
          setRoomdata(data);
        })
        .catch((error)=> {
          console.error(error);
        })
    }, [params.id])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    }
    const clickhandle = () => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    
      const data = {
        id: params.id,
        member: {
          name: name,
          time: clickedArray
        }
      }
      
      if(name==='') Toast.fire({
        icon: 'error',
        title: '이름을 입력해주세요!!!'
      })
      else if(clickedArray.length === 0) Toast.fire({
        icon: 'error',
        title: '시간을 하나 이상 입력해주세요!!!'
      })
      else Swal.fire({
        icon: 'info',
        title: '등록하기',
        text: '등록하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '예', 
        cancelButtonText: '아니오',
        confirmButtonColor: '#429f50',
        cancelButtonColor: '#d33',
      })
      .then(result => {
        if (result.isConfirmed) {
          axios.post("https://unje.vercel.app/api/usercreate",data)
          .then(res => {
            console.log("call finish", res.data);
          })
          .catch(error => {
            console.error("Error handle", error);
          })
          router.push('/schedule/'+params.id);
        }
      })

        
    }

    return(
      <Suspense fallback={<div>로딩중</div>}>

      {roomdata &&
        <main>
        <div className="grid place-items-left p-[35px]">
            <p className="font-semibold">{roomdata.id}</p>
            <h1 className="font-thin text-2xl mb-5">{roomdata.room_title}</h1>
            <p className="font-thin text-base mb-5">{roomdata.room_description}</p>
            <input onChange={handleChange} placeholder="이름을 입력해주세요!" className="mb-5 mt-5 border-b-2 w-60 border-black outline-none pb-1 font-thin text-2xl" />
            <h1 className="font-semibold text-2xl mt-5 mb-5">가능한 시간을 알려주세요!</h1>
            <div className="mb-5">
              <UserDragcal getdata={clickedArray} roomdata={roomdata}/>
            </div>
        </div>
        <Button link={'/schedule/'+params.id} color="bg-[#FF6F6F] fixed bottom-16 mb-4" text="돌아가기"/>
        <button 
                onClick={clickhandle} 
                className={`bg-[#76885B] fixed bottom-0 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`}>
        일정 생성하기
        </button>
      </main>
      }
      </Suspense>
    )
}