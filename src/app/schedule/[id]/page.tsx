'use client'

import { Button } from "@/components/Button";
import { Dragcal } from "@/components/Dragcal";
import fetchRoomdata from "@/util/fetchdata";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useState } from "react";

interface Member {
  name: string;
  time: any[]; 
}

export default function Schedule({ params }: { params: { id: string } }) {
    const pathname = usePathname();

    useEffect(()=>{
      fetchRoomdata(params.id)
        .then((data) => {
          setRoomdata(data);
        })
        .catch((error)=> {
          console.error(error);
        })
    }, [params.id])

    const [roomdata,setRoomdata] = useState<any>(null);
    const [clicked,setClicked] = useState<string>('');

    const handleClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
          const id = target.id;
          if(clicked===id) setClicked('');
          else setClicked(id);    
      }
    }

    return (
      <Suspense fallback={<div>로딩중</div>}>
{     roomdata && <main>
          <div className="fixed right-10 top-[35px]">
              <p><Link href={pathname+'/room'} className="font-semibold text-xl">수정하기</Link></p>
              <p><Link href={pathname+'/'} className="font-semibold text-xl">공유하기</Link></p>
          </div>
          <div className="grid place-items-left p-[35px]">
              <p className="font-semibold">{roomdata.id}</p>
              <h1 className="font-thin text-2xl mb-5">{roomdata.room_title}</h1>
              <p className="font-thin text-base mb-5">{roomdata.room_description}</p>
              <h1 className="font-semibold text-2xl mb-5">투표된 일정</h1>
              <div className="mb-5">
                <Dragcal roomdata={roomdata} clicked={clicked}/>
              </div>
              <h1 className="font-semibold text-2xl">가능한 사람</h1>
              <div className="mt-5">
                  {
                    (roomdata.members).map((data:Member)=>(
                    <button className={`w-20 text-start ${clicked===data.name&&'font-semibold'}`}
                            id={data.name}
                            onClick={handleClick}
                    >{data.name}</button>))
                  }
              </div>
          </div>
          {
            clicked?
            <Button link={pathname+"/user"} color="bg-[#6F98FF] fixed bottom-0 mb-4" text="일정 수정하기"/>
            :
            <Button link={pathname+"/user"} color="bg-[#76885B] fixed bottom-0 mb-4" text="일정 생성하기"/>
          }
        </main>
}      </Suspense>
    );
  }
  