"use client";

import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import { signIn,signOut,useSession,getProviders } from 'next-auth/react'
import { assetPrefix } from "@next.config";

const Nav = () => {

  const { data: session } = useSession();

  const [ providers, setProviders ] = useState(null);
  const [toggleDropdown, setToogleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () =>{0
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg" 
          alt="Promptpulse Logo" 
          width={40} height={40} 
          className="object-contain mt-2" 
        />
        <p className="logo_text">PromptPulse</p>
      </Link>

      

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
         {session?.user ? (
            // User has been logged
            <div className="flex gap3 md:gap-5"> 
              <Link href='/create-prompt' className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="Profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>

          ):(
            // User is not logged in 
            <>
            { 
              providers && 
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
            </>
          )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flexx relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() =>setToogleDropdown((prev)=>!prev)} 
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={()=> setToogleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={()=> setToogleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToogleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          
        ):(
          <>
            { 
              providers && 
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  )
}
export default Nav