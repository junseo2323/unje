'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Header = () => {
    const path = usePathname();
    return(
        <> 
        {
            path==='/about'?
            <div className="w-screen bg-[#a29fe4] fixed pl-12 pr-12 h-12 text-white">
                <Link href='/main' className="float-left">
                    <h1 className="text-2xl pt-2">UNJE</h1>
                </Link>
                <Link href='/about' className="float-right">
                    <h1 className="pt-3">사용하는법</h1>
                </Link>
            </div>
            :        
<>
            <div className="w-screen fixed pl-12 pr-12 bg-[#76885B] h-12 text-white">
                        <Link href='/main' className="float-left">
                            <h1 className="text-2xl pt-2">UNJE</h1>
                        </Link>
                        <Link href='/about' className="float-right">
                            <h1 className="pt-3">사용하는법</h1>
                        </Link>
                    </div>
                            <div className="h-7"/>
            </>

        }
        </>
    )
} 