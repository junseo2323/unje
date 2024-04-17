'use client'

import { Button } from "@/components/Button";
import { Dragcal } from "@/components/Dragcal";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Schedule() {
    const pathname = usePathname()

    return (
      <main>
        <div className="fixed right-10 top-[35px]">
            <p><Link href={pathname+'/room'} className="font-semibold text-xl">수정하기</Link></p>
            <p><Link href={pathname+'/'} className="font-semibold text-xl">공유하기</Link></p>
        </div>
        <div className="grid place-items-left p-[35px]">
            <p className="font-semibold">D236X1</p>
            <h1 className="font-thin text-2xl mb-5">오준서의 밥약</h1>
            <p className="font-thin text-base mb-5">MRA 동아리에서 함께하는 밥약입니다.</p>
            <h1 className="font-semibold text-2xl mb-5">투표된 일정</h1>
            <div className="mb-5">
              <Dragcal />
            </div>
            <h1 className="font-semibold text-2xl">가능한 사람</h1>
            <div>
                <p>오준서</p>
                <p>유동현</p>
                <p>김태우</p>
            </div>
        </div>
        <Button link={pathname+"/user"} color="bg-[#76885B] fixed bottom-0 mb-4" text="일정 생성하기"/>
      </main>
    );
  }
  