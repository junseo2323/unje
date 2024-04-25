'use client'

import { Button } from "@/components/Button";
import fetchRoomdata from "@/util/fetchdata";
import axios from "axios";
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form"
import Swal from "sweetalert2";

type Inputs = {
  room_title: string,
  room_description: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
}

export default function Create({ params }: { params: { id: string } }) {
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    const body = {
      id : params.id,
      newData : data
    }

    Swal.fire({
      icon: 'info',
      title: '수정하기',
      text: '방 정보를 등록하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '예', 
      cancelButtonText: '아니오',
      confirmButtonColor: '#429f50',
      cancelButtonColor: '#d33',
    })
    .then(result => {
      if (result.isConfirmed) {
        axios.put("http://localhost:3000/api/modifyroom",body)
        .then(res => {
          console.log("call finish", res.data);
        })
        .catch(error => {
          console.error("Error handle", error);
        })  
        router.push('/schedule/'+params.id);
      }
    })
  };

  const {
    register,
    handleSubmit
  } = useForm<Inputs>();

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

  const handleDeleteClick = () => {
    Swal.fire({
      icon: 'error',
      title: '방 삭제하기',
      text: '방 정보를 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '예', 
      cancelButtonText: '아니오',
      confirmButtonColor: '#429f50',
      cancelButtonColor: '#d33',
    })
    .then(result => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:3000/api/deleteroom",{
          params: {
            id : params.id
          }
        })
        .then(res => {
          console.log("call finish", res.data);
        })
        .catch(error => {
          console.error("Error handle", error);
        })  
        router.push('/main');
      }
    })
  };


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

  

    return (
      <Suspense fallback={<div>로딩중</div>}>
        {
          roomdata && <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid place-items-left p-[35px]">
              <input defaultValue={roomdata.room_title} {...register("room_title")} className="mt-5 border-b-2 w-60 border-black outline-none pb-1 font-thin text-2xl" />
              <h1 className="mt-10 font-semibold text-2xl">자세한 정보를 알려주세요</h1>
              <textarea defaultValue={roomdata.room_description} {...register("room_description")} className="border-b-2 w-80 border-black outline-none pb-1 font-thin text-base h-14" />
  
              <h1 className="mt-10 font-semibold text-2xl">몇일날 만나고 싶으신가요?</h1>
              <div className="mt-5">
                  <input type="date" className="w-40" defaultValue={roomdata.start_date} {...register("start_date")}/>
                  <span className="pl-10 font-bold">부터</span>
              </div>
              <div>
                  <input type="date" className="w-40" defaultValue={roomdata.end_date} {...register("end_date")}/>
                  <span className="pl-10 font-bold">까지</span>
              </div>
              <h1 className="mt-10 font-semibold text-2xl">몇시에 만나고 싶으신가요?</h1>
              
              <div className="mt-5">
                  <select
                      {...register("start_time")}
                  >
                      <option value={roomdata.start_time}>{roomdata.start_time}</option>
                      {starttimes.map((time) => (
                      <option key={time} value={time}>
                          {time}
                      </option>
                      ))}
                  </select>
                  <span>부터</span>
  
                  <select
                      {...register("end_time")}
                  >
                      <option value={roomdata.end_time}>{roomdata.end_time}</option>
                      {times.map((time) => (
                      <option key={time} value={time}>
                          {time}
                      </option>
                      ))}
                  </select>
                  <span>까지</span>
              </div>
  
          </div>
          <input type="submit" className={`bg-[#76885B] fixed bottom-0 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`} value="수정하기"/>
        </form>
        <Button link={"/schedule/"+params.id+"/finish"} color="bg-[#6F98FF] fixed bottom-32 mb-4" text="완료하기"/>
        <button
              onClick={handleDeleteClick} 
              className={`bg-[#FF6F6F] fixed bottom-16 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`}>
          삭제하기
        </button>
</>        
        }
      </Suspense>
    );
  }
  