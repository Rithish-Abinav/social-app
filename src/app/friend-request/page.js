/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useEffect, useState } from 'react'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import axios from 'axios'

export default function Page() {
  const [friendList, setFriendList] = useState([]);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userdetail');
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (userDetail) {
      const GetFriendList = async () => {
        try {
          const response = await axios.get(
            `/api/register/${userDetail._id}`
          );
          setFriendList(response.data.friends || []);
        } catch (error) {
          console.error('Error fetching friend list:', error);
        }
      };

      GetFriendList();
    }
  }, [userDetail]);

  const changeFriendStatus = async (status, friend) => {
    try {
      const response = await axios.put(
        `/register/${userDetail._id}`,
        {
          friend: {
            id: friend._id,
            name: friend.name,
            image: friend.image,
            requestStatus: status
          }
        }
      );

      console.log("Friend request updated:", response.data);

      // Update local state and storage
      setFriendList(prev =>
        prev.map(f =>
          f._id === friend._id ? { ...f, requestStatus: status } : f
        )
      );
      localStorage.setItem('userdetail', JSON.stringify(response.data));

    } catch (error) {
      console.error('Error updating friend request:', error.response?.data || error.message);
    }
  };

  return (
    <div className='loggedPages'>
      <Header />

      <div className='allUsers'>
        {friendList.map((item) => (
          <div className='user' key={item._id}>
            <div className='userDetail'>
              <img className='postProfileImg' src={item.image || ''} />
              <p>{item.name || 'Unknown'}</p>
            </div>

            {item.requestStatus === 'pending' && (
              <div className='friendRequestBtns'>
                <button className='accept' onClick={() => changeFriendStatus('accepted', item)}>Accept</button>
                <button className='deny' onClick={() => changeFriendStatus('rejected', item)}>Deny</button>
              </div>
            )}

            {item.requestStatus === 'accepted' && <p className='status reqStatus accepted'>Friends</p>}
            {item.requestStatus === 'rejected' && <p className='status reqStatus denied'>Denied</p>}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
