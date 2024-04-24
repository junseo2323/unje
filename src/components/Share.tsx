"use client"

import { useEffect } from "react";
import Swal from "sweetalert2"

interface shareType {
    title: string,
    description: string,
    url: string
}

export const Share = ({title,description,url}:shareType) => {
    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("a38ae30b1d5dcd967548bff443d5e484");
        }
      }, []);
      const handleShareKakaoClick = () => {
        if (window.Kakao) {
          const Kakao = window.Kakao;
    
          Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: title,
              description: description,
              imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
            buttons: [
              {
                title: '일정 만들기',
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              }
            ],
          });
          
        }
    }
    
    
    const handleClick = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          
        Swal.fire({
            title: "공유하기",
            input: "text",
            inputValue: url,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonColor: "#76885B",
            denyButtonColor: "#6F98FF",
            confirmButtonText: "카카오톡 공유하기",
            denyButtonText: `링크 복사하기`,
            cancelButtonText: "취소하기",          
        }).then((result) => {
            if (result.isConfirmed) {
                handleShareKakaoClick();
            }else if(result.isDenied) {
                navigator.clipboard.writeText("복사할 링크");
                Toast.fire({
                    icon: "success",
                    title: "클립보드에 복사되었습니다."
                });
            }
          });

    }
    return(
        <button className="font-semibold text-xl" onClick={handleClick}>
            공유하기
        </button>
    )
}

export const ShareButton = ({title,description,url}:shareType) => {
    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("a38ae30b1d5dcd967548bff443d5e484");
        }
      }, []);
      const handleShareKakaoClick = () => {
        if (window.Kakao) {
          const Kakao = window.Kakao;
    
          Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: title,
              description: description,
              imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
            buttons: [
              {
                title: '일정 만들기',
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              }
            ],
          });
          
        }
    }
    
    
    const handleClick = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          
        Swal.fire({
            title: "공유하기",
            input: "text",
            inputValue: url,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonColor: "#76885B",
            denyButtonColor: "#6F98FF",
            confirmButtonText: "카카오톡 공유하기",
            denyButtonText: `링크 복사하기`,
            cancelButtonText: "취소하기",          
        }).then((result) => {
            if (result.isConfirmed) {
                handleShareKakaoClick();
            }else if(result.isDenied) {
                navigator.clipboard.writeText("복사할 링크");
                Toast.fire({
                    icon: "success",
                    title: "클립보드에 복사되었습니다."
                });
            }
          });

    }
    return(
        <button 
                className={`bg-[#6F98FF] fixed bottom-0 mb-4 w-full h-12 rounded-md text-white text-lg font-semibold mt-4`} onClick={handleClick}>
        일정 공유하기
        </button>
    )
}