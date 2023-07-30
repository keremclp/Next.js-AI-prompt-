"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    
    const getUserPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      
      setUserPosts(data);
    };
    if (params?.id) getUserPosts();
  }, [params.id]);

  return (
    //import Profile and send the props
    <Profile
      name={userName}
      desc={`Greetings to the personalized profile page of ${userName}. Delve into ${userName}'s extraordinary prompts and let the force of their creativity ignite inspiration within you.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
