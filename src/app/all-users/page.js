/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios, { all } from 'axios';
import Loader from '@/components/Loader';

export default function Page() {
  const [allUser, setAllUser] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
      const[load,setLoad] = useState(false);
  

  useEffect(() => {
    // Fetch user details from localStorage (client only)
    const storedUser = localStorage.getItem('userdetail');
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      try {
        const response = await axios.get(`/api/register`);
        setAllUser(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }finally{
      setLoad(false);
      }
    };
    fetchData();
  }, []);




  const AddFriend = async (item) => {
    setLoad(true);

    const userDetail = JSON.parse(localStorage.getItem('userdetail'));
  
    try {
      const response = await axios.put(
        `/api/register/${item._id}`,
        {
          friend: {
            id: userDetail._id,
            name: userDetail.name,
            requestStatus: 'pending',
            image:userDetail.image
          }
        }
      );
  
      console.log("Friend request sent:", response.data);
  
  
    } catch (error) {
      console.error('Error adding friend:', error.response?.data || error.message);
    }finally{
      setLoad(false)
    }
  };
  
  


  return (
    <div className='loggedPages'>

       {load && 
                         <Loader/>
                  }

      <Header />

      <div className='allUsers'>
  {userDetail && allUser
    .filter(user =>
      user.username !== userDetail.username &&
      !user.friends?.some(friend =>
        friend.id === userDetail._id && friend.requestStatus === 'accepted'
      )
    )
    .map(user => (
      <div className='user' key={user._id}>
        <div className='userDetail'>
          <img
            className='postProfileImg'
            src={user.image || ''}
            alt={user.name || 'User Profile'}
          />
          <p>{user.name || 'Unknown User'}</p>
        </div>
        <button onClick={() => AddFriend(user)} className='addFriendBtn'>
          Add Friend
        </button>
      </div>
    ))}
</div>







      <Footer />
    </div>
  );
}
