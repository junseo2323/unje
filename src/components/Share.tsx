"use client"

import { useEffect } from "react";
import Swal from "sweetalert2"

interface shareType {
    titles: string,
    descriptions: string,
    url: string
}

export const Share = ({titles,descriptions,url}:shareType) => {
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
              title: "일정을 공유받았습니다!",
              description: "지금 접속해서 일정을 입력해주세요.",
              imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
              link: {
                mobileWebUrl: "https://unje.site"+url,
                webUrl: "https://unje.site"+url,
              },
            },
            buttons: [
              {
                title: '일정 만들기',
                link: {
                  mobileWebUrl: "https://unje.site"+url,
                  webUrl: "https://unje.site"+url,
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
            inputValue: "https://unje.site"+url,
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
                navigator.clipboard.writeText("https://unje.site"+url);
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

export const ShareButton = ({titles,descriptions,url}:shareType) => {
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
              title: "일정을 공유받았습니다!",
              description: "지금 일정을 확인해주세요.",
              imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
              link: {
                mobileWebUrl: "https://unje.site"+url,
                webUrl: "https://unje.site"+url,
              },
            },
            buttons: [
              {
                title: '일정 만들기',
                link: {
                  mobileWebUrl: "https://unje.site"+url,
                  webUrl: "https://unje.site"+url,
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
            inputValue: "https://unje.site"+url,
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
                navigator.clipboard.writeText("https://unje.site"+url);
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