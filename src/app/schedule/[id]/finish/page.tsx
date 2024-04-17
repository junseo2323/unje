import { Button } from "@/components/Button"
import { UserDragcal } from "@/components/Dragcal"

export default function User() {
    return(
        <main>
        <div className="grid place-items-left p-[35px]">
            <p className="font-semibold">D236X1</p>
            <h1 className="font-thin text-2xl mb-5">오준서의 밥약</h1>
            <p className="font-thin text-base mb-5">MRA 동아리에서 함께하는 밥약입니다.</p>
            <h1 className="font-semibold text-2xl mb-5">언제 만날까요?</h1>
            <div className="mb-5">
              <UserDragcal />
            </div>
            <p className="mt-5 font-thin">4/11 <b className="font-semibold">에</b></p>
            <p className="font-thin">오후 02시<b className="font-semibold">부터</b> 오후 07시<b className="font-semibold">에 만납시다!</b></p>
            <p className="mt-5 font-thin">4/12 <b className="font-semibold">에</b></p>
            <p className="font-thin">오후 01시<b className="font-semibold">부터</b> 오후 04시<b className="font-semibold">에 만납시다!</b></p>
        </div>
        <Button link="" color="bg-[#6F98FF] fixed bottom-0 mb-4" text="완료하기"/>
      </main>

    )
}