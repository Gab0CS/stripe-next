"use client"
import { use, useState } from "react";
import { supabase } from "@/utils/supabase/client";

import React from 'react'

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    const randomEmail = `${Math.random().toString(36).substring(7)}@example.com`;
    const password = 'Password69420'

    const {data, error} = await supabase.auth.signUp({
      email: randomEmail,
      password,
    })

    if(error){
      console.log(error)
    } else {
      console.log("user created and logged in:", data);
    }

    setLoading(false)
  };


  return (
    <button
    onClick={handleSignUp}
    disabled={loading}
    className="mt-5 border rounded-full py-5 px-10 
    hover:bg-white hover:text-black"
    >
      {loading ? "Sign up" : "Sign up with random email and password"}
    </button>
  )
}

export default LoginForm