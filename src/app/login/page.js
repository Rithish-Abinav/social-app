/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import '../globals.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 


export default function Register() {

    const router = useRouter(); 

  
    
  const [form, setForm] = useState({
    username: '',
    password: '',
  });


    const [err, setErr] = useState("");
  


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/login`,
        form
      );

      console.log(response);

      if (response.status === 200) {
        localStorage.setItem('userdetail', JSON.stringify(response.data));
        router.push('/'); 
      } else {
        setErr(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setErr(error.response.data.message);
      } else {
        setErr("An error occurred. Please try again.");
      }
    }

  };



  

  return (
    <div id='register_module'>
      <div className='logo'>
        <img width='100%' src="/assets/logo.png" alt="Logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <input type='text'
          name='username'
          placeholder='Enter Usename'
          value={form.username}
          onChange={handleChange}
        />



       

        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          value={form.password}
          onChange={handleChange}
        />

{err && <p className="error">{err}</p>}


        <button type='submit'>Login</button>
      </form>

      <p className='login_register_swap'>
        Dont have an account? <Link href='/register'>Register</Link>
      </p>
    </div>
  );
}
