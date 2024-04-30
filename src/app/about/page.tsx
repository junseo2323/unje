"use client"

import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';
import { useEffect } from "react";

export default function About() {
    useEffect(() => {
        const image = document.querySelector('.floating-image');
        gsap.to(image, {
          y: 30, // 위 아래로 떠다니는 거리
          duration: 1.3,
          repeat: -1, // 무한 반복
          yoyo: true, // 왕복
        });
      }, []);
    
    return(
        <div className="overflow-x-hidden">
            <div className="w-screen flex justify-center h-screen  bg-gradient-to-b from-[#A09CE9] to-[#fff]">
                <Image 
                    src="/bg_img-removebg.png"
                    width={300}
                    height={300}
                    className="floating-image absolute z-10"
                    alt="Picture of the author"                    
                />
                <div className="relative z-20 mt-52">
                    <h1 className="text-5xl font-bold text-white text-center">만남의 즐거움은</h1>
                    <h1 className="text-5xl font-bold text-white text-center mt-5">약속으로부터!</h1>
                    <Link href='/main'>
                    <h1 className="text-5xl font-bold text-[#646eff] text-center mt-20">지금, 만들러 가기.</h1>
                    </Link>
                </div>
            </div>
            <div className="grid place-items-center">
                <div className="w-full">
                    <h1 className="text-4xl font-bold text-[#A09BEA] text-center">약속 만들기</h1>
                    <h1 className="text-xl font-thin text-[#939393] text-center mt-3">약속을 사람들에게 공유하세요!</h1>
                </div>
                <img src="/makeroom.gif" alt="방 만들기" className="mt-10"/>
            </div>
            <div className="grid place-items-center mt-12">
                <div className="w-full ml-32">
                    <h1 className="text-4xl font-bold text-[#A09BEA] text-left">약속 공유하기</h1>
                    <h1 className="text-xl font-thin text-[#939393] text-left mt-3">우리의 약속을 만들어볼까요?</h1>
                </div>
                <Image 
                    src="/share.png"
                    width={400}
                    height={400}
                    alt="Picture of the author"
                    className="mt-10"                    
                />
                <Image 
                    src="/share2.png"
                    width={400}
                    height={400}
                    alt="Picture of the author"
                    className="mt-20"                    
                />
                            <div className="w-full">
                    <h1 className="text-xl font-normal text-[#939393] text-center">카카오톡으로 공유하거나</h1>
                    <h1 className="text-xl font-normal text-[#939393] text-center mt-3">링크를 직접 공유하세요.</h1>
            </div>

            </div>
            <div className="grid place-items-center mt-12">
                <div className="w-full mr-32">
                    <h1 className="text-4xl font-bold text-[#A09BEA] text-right">약속 참여하기</h1>
                    <h1 className="text-xl font-thin text-[#939393] text-right mt-3">약속에 참여해보세요!</h1>
                </div>
                <img src="/participation.gif" alt="방 참여하기" className="mt-10"/>
            </div>
            <div className="grid place-items-center mt-12">
                <div className="w-full ml-32">
                    <h1 className="text-4xl font-bold text-[#A09BEA] text-left">약속 완료하기</h1>
                    <h1 className="text-xl font-thin text-[#939393] text-left mt-3">약속을 완료하세요.</h1>
                </div>
                <img src="/final.gif" alt="방 완성하기" className="mt-10"/>
            </div>
            <div className="grid place-items-center mt-12">
                <div className="w-full">
                    <h1 className="text-4xl font-bold text-[#A09BEA] text-center">완료된 약속은 그대로!</h1>
                    <h1 className="text-xl font-thin text-[#939393] text-center mt-3">주소 그대로 공유해주세요.</h1>
                </div>
                <Image 
                    src="/final.png"
                    width={400}
                    height={400}
                    alt="Picture of the author"
                    className="mt-10"                    
                />
        </div>
        <div className="bg-[#353535] h-[226px] p-10 mt-12">
            <h1 className="text-xl font-normal text-white">UNJE</h1>
            <p className="text-sm font-thin text-white">copyright 2024. UNJE. All right reserved.</p>
            <p className="text-sm font-thin text-white pt-3">본 프로젝트는 정식 출시하지 않은 베타 버전입니다.</p>
            <p className="text-sm font-thin text-white">모든 정보는 언제만날래? 프로그램 운용 외에는 사용되지 않음을 알립니다.</p>
            <p className="text-sm font-thin text-white pt-3">자세한 정보는 인스타그램 @unje_pr에서 확인할 수 있습니다. </p>
            <Link href="https://www.instagram.com">
            <Image 
                    src="/instagram.png"
                    width={18}
                    height={18}
                    alt="Picture of the author"
                    className="mt-3"                    
                />
            </Link>
        </div>
    </div>
    )
}