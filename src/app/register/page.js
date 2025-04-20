/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import '../globals.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import Loader from '@/components/Loader';

export default function Register() {
  const router = useRouter(); 

  const[load,setLoad] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    image: '',
    friends: []
  });
  

  const [err, setErr] = useState("");
  const [usernameOptions, setUsernameOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'name' && value.length > 0) {
      const formattedName = value.trim().replace(/\s+/g, '-'); 
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const generatedUsername = `${formattedName}${randomSuffix}`;
      setUsernameOptions([generatedUsername]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSize = 500 * 1024; 
    if (file.size > maxSize) {
      alert("Image size should be less than 500KB");
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  

  const handleSubmit = async (e) => {


    e.preventDefault();


    if(form.password !== form.confirmPassword){
      setErr("Confrim Password Not Match")
      return
    }
    

setLoad(true)
    console.log(form)

    try {
      const response = await axios.post(
        `/api/register`,
        form
      );

      console.log(response);

      if (response.status === 201) {
        router.push('/login'); 
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
    finally{
      setLoad(false)

    }
  };

  return (


    <div id="register_module">
{load && 
       <Loader/>
}
      <div className="logo">
        <img width="100%" src="/assets/logo.png" alt="Logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        {usernameOptions.length > 0 && (
          <select
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
          >
            <option>Select suggested username</option>
            {usernameOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

<input type="file" accept="image/*" onChange={handleImageChange} />


        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {err && <p className="error">{err}</p>}

        <button type="submit">Register Now</button>
      </form>

      <p className="login_register_swap">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
