"use client"

import { Button } from "@/components/Button"
import { UserDragcal } from "@/components/Dragcal"
import fetchRoomdata from "@/util/fetchdata";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

let clickedArray: string[] = [];

export default function User({ params }: { params: { id: string, name:string } }) {
    const [roomdata,setRoomdata] = useState<any>(null);
    const [getdata,setGetdata] = useState<any>(null);

    const pathname = usePathname();
    
    useEffect(()=>{
      fetchRoomdata(params.id)
        .then((data) => {
          setRoomdata(data);
          const members = data.members;
          const member = members.find((m:any) => m.name === decodeURI(params.name));
          if (member) {
            console.log(member.time);
            setGetdata(member.time);
          } else {
            setGetdata([]);
          }
      
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
              <p className="font-semibold">{roomdata.id}</p>
              <h1 className="font-thin text-2xl mb-5">{roomdata.room_title}</h1>
              <p className="font-thin text-base mb-5">{roomdata.room_description}</p>
              <input value={decodeURI(params.name)} className="mb-5 mt-5 border-b-2 w-60 border-black outline-none pb-1 font-thin text-2xl" />
              <h1 className="font-semibold text-2xl mt-5 mb-5">가능한 시간을 알려주세요!</h1>
              <div className="mb-5">
                <UserDragcal roomdata={roomdata} getdata={clickedArray}/>
              </div> 
          </div>
          <Button link="/main" color="bg-[#FF6F6F] fixed bottom-16 mb-4" text="삭제하기"/>
          <Button link={"/schedule/"+params.id} color="bg-[#76885B] fixed bottom-0 mb-4" text="일정 수정하기"/>
        </main>  
        }
      </Suspense>
    )
}