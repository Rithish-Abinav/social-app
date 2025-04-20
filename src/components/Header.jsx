"use client"
import React from 'react'
import { useRouter } from 'next/navigation'; 


export default function Header() {

      const router = useRouter(); 
  

const logout = () =>{
  localStorage.clear()
        router.push('/login'); 

}

  return (
   <header>
    <div className='profile'> <img src="/assets/logo.png" alt="Logo" width='100px' /> </div>
    <button className='logout_btn' onClick={logout}>Log Out</button>
   </header>
  )
}
