/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios, { all } from 'axios';

export default function Page() {
  const [allUser, setAllUser] = useState([]);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    // Fetch user details from localStorage (client only)
    const storedUser = localStorage.getItem('userdetail');
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/register`);
        setAllUser(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);




  const AddFriend = async (item) => {
    console.log(item.image)
    const userDetail = JSON.parse(localStorage.getItem('userdetail'));
  
    try {
      const response = await axios.put(
        `/register/${item._id}`,
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
    }
  };
  
  


  return (
    <div className='loggedPages'>
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
