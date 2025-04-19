/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */

"use client"

import React, { useEffect, useState } from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import axios from 'axios'
import { useRouter } from 'next/navigation'; 



export default function Page() {

   const router = useRouter(); 

  useEffect(()=>{
    if(!localStorage.getItem('userdetail')){
      router.push('/login'); 
    }
  })

  const[popup,setPopup]=useState(false);

  const[post,setPost]=useState('');

      const [allPost,setAllPost]= useState([]);
  


  const [user, setUser] = useState({
    username: '',
    profileImage: '',
    name: '',
    friends:0
  });

  useEffect(() => {
    // Retrieve user details from localStorage
    const userDetail = JSON.parse(localStorage.getItem('userdetail'));

    if (userDetail) {
      // Set the retrieved user data to state
      setUser({
        username: userDetail.username || '',
        profileImage: userDetail.image || '',
        name: userDetail.name || '',
        friends:userDetail.friends
      });
    }


  }, []);




  const showPopup = () =>{
    setPopup(true)
  }

  const handlePost = (e) =>{
    setPost(e.target.value)
  }

  useEffect(()=>{
    const Posts = async()=>{
      try{
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/post`);
      console.log(response)
      setAllPost(response.data)
    }
    catch(err){
      console.log(err)
    }
    }
    Posts()
    },[popup])


  const addPost = async (e) => {
    e.preventDefault();
    const userDetail = JSON.parse(localStorage.getItem('userdetail'));
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
        name: userDetail.name,
        image: userDetail.image,  // Use profileImage instead of image
        post: post,
      });

      console.log(response);
      setPost(''); // Reset the post content after submission
      setPopup(false); // Close the popup after posting
    } catch (err) {
      console.log('Error adding post:', err);
    }
  };

  return (
    <div className='loggedPages'>
      <Header/>

<div className='myProfile'>
  
  {user.profileImage &&
  <img className='profileImg' src={user.profileImage}/>
}

<div className='profileDetail'>
  <h3 className='profileName'>{user.name}</h3>
  <p className='profileUsername'>{user.username}</p>
  <p className='profileFriends'>
  {Array.isArray(user.friends) 
    ? user.friends.filter(friend => friend.requestStatus === 'accepted').length 
    : 0} Friends
</p>

</div>

<button className='addPostBtn' onClick={showPopup}>Add Post</button>


</div>


<div className='allPosts'>


{allPost && allPost.map((item,index)=>(
<div className='post' key={item._id}>
  
  <div className='postHeader'>
    <img className='postProfileImg' src={item.image}/>
<p className='postProfileName'>{item.name}</p>
<p className='postTime'>Posted on {item.date}</p>
  </div>

  <div className='postDetail'>
  {item.post}
  </div>

</div>

))}



</div>

{popup && 
<div className='popup'>
  <form>
    <textarea onChange={handlePost} placeholder='Type here...'> 

    </textarea>
    <button type='submit' onClick={addPost}>Post Now</button>
  </form>
</div>
}



<Footer/>

    </div>
  )
}
