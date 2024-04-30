"use client"

import { Button } from "@/components/Button"
import { UserDragcal } from "@/components/Dragcal"
import fetchRoomdata from "@/util/fetchdata";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";

let clickedArray: string[] = [];

export default function User({ params }: { params: { id: string, name:string } }) {
    const [roomdata,setRoomdata] = useState<any>(null);
    const [getdata,setGetdata] = useState<any>(null);
    const [name,setName] = useState(params.name);

    const router = useRouter();

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

    const handleCange = (e:ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
  
    }

    const clickhandle = () => {
    
      const data = {
        id: params.id,
        name: params.name,
        newname: name,
        time: clickedArray
      }
      
      Swal.fire({
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
          axios.put(process.env.NEXT_PUBLIC_API_TEST+"/api/usermodify",data)
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
    
  
    const clickDeletehandle = () => {
      const data = {
        id: params.id,
        name: params.name
      }
      
      Swal.fire({
        icon: 'info',
        title: '삭제하기',
        text: '삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '예', 
        cancelButtonText: '아니오',
        confirmButtonColor: '#429f50',
        cancelButtonColor: '#d33',
      })
      .then(result => {
        if (result.isConfirmed) {
          axios.delete(process.env.NEXT_PUBLIC_API_TEST+"/api/userdelete", { params: data })
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
        {
          roomdata &&
          <main>
          <div className="grid place-items-left p-[35px]">
              <p className="font-semibold">{roomdata.id}</p>
              <h1 className="font-thin text-2xl mb-5">{roomdata.room_title}</h1>
              <p className="font-thin text-base mb-5">{roomdata.room_description}</p>
              <input defaultValue={decodeURI(params.name)} onChange={handleCange} className="mb-5 mt-5 border-b-2 w-60 border-black outline-none pb-1 font-thin text-2xl" />
              <h1 className="font-semibold text-2xl mt-5 mb-5">가능한 시간을 알려주세요!</h1>
              <div className="mb-5">
                <UserDragcal roomdata={roomdata} getdata={clickedArray}/>
              </div> 
          </div>
          <button 
                onClick={clickDeletehandle} 
                className={`bg-[#FF6F6F] fixed bottom-16 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`}>
          일정 삭제하기
          </button>
          <button 
                onClick={clickhandle} 
                className={`bg-[#76885B] fixed bottom-0 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`}>
          일정 수정하기
          </button>
        </main>  
        }
      </Suspense>
    )
}