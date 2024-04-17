import { Button } from "@/components/Button"
import { UserDragcal } from "@/components/Dragcal"

export default function User() {
    return(
        <main>
        <div className="grid place-items-left p-[35px]">
            <p className="font-semibold">D236X1</p>
            <h1 className="font-thin text-2xl mb-5">오준서의 밥약</h1>
            <p className="font-thin text-base mb-5">MRA 동아리에서 함께하는 밥약입니다.</p>
            <input placeholder="이름을 입력해주세요!" className="mb-5 mt-5 border-b-2 w-60 border-black outline-none pb-1 font-thin text-2xl" />
            <h1 className="font-semibold text-2xl mt-5 mb-5">가능한 시간을 알려주세요!</h1>
            <div className="mb-5">
              <UserDragcal />
            </div>
        </div>
        <Button link="/schedule/test" color="bg-[#76885B] fixed bottom-0 mb-4" text="일정 생성하기"/>
      </main>

    )
}