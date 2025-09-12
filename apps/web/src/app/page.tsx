'use client'


import FileUpload from "@/components/file-upload/file-upload";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useRouter } from "next/navigation";
import Dashboard from "./dashboard/page";

export default function Home() {

    const navigate = useRouter()


    const  handleClick =(path:string) =>{
        navigate.push(path)
    }

  return (
    <ClerkProvider>
      <div className="min-h-full w-[100%] bg-background ">
        <div className="flex justify-center items-center">

          <SignedIn>
            <button onClick={()=>handleClick('/dashboard')}>to dash</button>
          </SignedIn>

          <SignedOut>
            <SignInButton/>
          </SignedOut>
          

        </div>
      </div>
    </ClerkProvider>
  );
}
