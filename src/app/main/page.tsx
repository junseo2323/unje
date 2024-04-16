import { Button } from "@/components/Button";

export default function Main() {
    return (
    <div className="grid place-items-center">
        <input placeholder="코드를 입력해주세요" className="mt-[20rem] mb-[20rem] border-b-2 w-60 border-black outline-none pb-1 font-thin text-center" />
        <p className="font-thin text-sm self-start">일정을 만드시려면?</p>
        <Button color="bg-[#76885B]" text="생성하기"/>
        <Button color="bg-[#6F98FF]" text="참여하기"/>
      </div>
    );
  }
  