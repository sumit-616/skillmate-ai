"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { useEffect, useState } from "react";
import { UserContext } from "./_context/UserContext";

const AuthProvider = ({ children }) => {
  const user = useUser();
  const CreateUser = useMutation(api.users.CreateUser);
  const [userData, setUserData] = useState();

  useEffect(() => {
    // console.log(user);
    CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (!user?.primaryEmail) return;

    const result = await CreateUser({
      name: user?.displayName ?? "Anonymous",
      email: user.primaryEmail,
    });

    setUserData(result);
  };

  return (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default AuthProvider;
