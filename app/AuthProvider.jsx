"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react';
import React, { useEffect } from 'react'

const AuthProvider = ({children}) => {
  const user = useUser();
  const CreateUser = useMutation(api.users.CreateUser);

  useEffect(()=>{
    console.log(user);
    CreateNewUser();
  },[user]);


  const CreateNewUser = async () =>{
    const result = await CreateUser({
      name:user?.displayName,
      email: user?.primaryEmail,
    })
    console.log(result);
  }

  return (
    <div>
      {children}
    </div>
  ) 
}

export default AuthProvider;
