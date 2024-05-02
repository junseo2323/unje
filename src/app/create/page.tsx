'use client'
import { Button } from "@/components/Button";
import { fetchGenerateId } from "@/util/fetchdata";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Inputs = {
  room_title: string,
  room_description: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
}

function generateId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
}

export default function Create() {
  const router = useRouter();
  const [usedId, setUsedId] = useState([]);
  

  useEffect(()=>{
    fetchGenerateId()
      .then((data) => {
        setUsedId(data);
      })
      .catch((error)=> {
        console.error(error);
      })
  },[])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    let newId = "";
    while(true){
      newId = generateId();
      if(newId in usedId) continue;
      else break;
    }
  
    const body = {
      id : newId,
      newData : data
    }

    Swal.fire({
      icon: 'info',
      title: '등록하기',
      text: '방 정보를 등록하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '예', 
      cancelButtonText: '아니오',
      confirmButtonColor: '#429f50',
      cancelButtonColor: '#d33',
    })
    .then(result => {
      console.log(newId);
      console.log(body);
      if (result.isConfirmed) {
        axios.post(process.env.NEXT_PUBLIC_API_TEST+"/api/createroom",body)
        .then(res => {
          console.log("call finish", res.data);
        })
        .catch(error => {
          console.error("Error handle", error);
        })  
        router.push('/schedule/'+newId);

      }
    })
  };


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
  const startDate = watch('start_date');

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid place-items-left p-[35px]">
            <input {...register('room_title',{required: true})} placeholder="어떤 만남인가요?" className="mt-5 border-b-2 w-60 border-black outline-none pb-1 font-thin text-2xl" />
            {errors?.room_title?.type === 'required' && (
                  <p>방 이름을 입력해주세요.</p>
              )}
            <h1 className="mt-10 font-semibold text-2xl">자세한 정보를 알려주세요</h1>
            <textarea {...register('room_description',{required: true})} placeholder="간단하게 한줄로 우리의 모임을 소개해주세요!" className="border-b-2 w-80 border-black outline-none pb-1 font-thin text-base h-14" />
            {errors?.room_description?.type === 'required' && (
                  <p>방 설명을 입력해주세요.</p>
              )}
            <h1 className="mt-10 font-semibold text-2xl">며칠날 만나고 싶으신가요?</h1>
            <div className="mt-5">
                <input type="date" className="w-40" {...register('start_date',{required: true})}/>
                <span className="pl-10 font-bold">부터</span>
                {errors?.start_date?.type === 'required' && (
                  <p>시작 날짜를 입력해주세요.</p>
                )}
            </div>
            <div>
                <input type="date" className="w-40" {...register('end_date',{required: true, min: startDate,}
                )}/>
                <span className="pl-10 font-bold" >까지</span>

                {errors?.end_date?.type === 'required' && (
                  <p>종료 날짜를 입력해주세요.</p>
                )}
                {errors?.end_date?.type === 'min' && (
                  <p>시작 날짜 이후로 입력해주세요.</p>
                )}
            </div>
            <h1 className="mt-10 font-semibold text-2xl">몇시에 만나고 싶으신가요?</h1>
            
            <div className="mt-5">
                <select
                    {...register('start_time',{required: true})}
                    value={selectedStarttime}
                    onChange={handleStartTimeChange}
                >
                    <option value="00:00">00:00</option>
                    {starttimes.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                    ))}
                </select>
                <span>부터</span>

                <select
                    {...register('end_time',{required: true})}
                    value={selectedTime}
                    onChange={handleTimeChange}
                >
                    <option value="23:30">23:30</option>
                    {times.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                    ))}
                </select>
                <span>까지</span>
            </div>

        </div>
        <button 
                className={`bg-[#76885B] fixed bottom-0 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`}>
        생성하기
        </button>
      </form>
    );
  }
  