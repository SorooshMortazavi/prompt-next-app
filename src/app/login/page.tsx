"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/components/Toast/ToastContext";
const firebaseConfig = {
  apiKey: "AIzaSyD7eloNrmnEb2CelajgHCBx5BxV6ALcn0Y",
  authDomain: "devotel-blog.firebaseapp.com",
  projectId: "devotel-blog",
  storageBucket: "devotel-blog.appspot.com",
  messagingSenderId: "648902562176",
  appId: "1:648902562176:web:8cd56075ad168d2faf7165"
};

const app = initializeApp(firebaseConfig);

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

interface IFormInput {
  username: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const {addToast} = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {username:string,password:string}) => {
    const auth = getAuth();
    const loginResult = await signInWithEmailAndPassword(auth,data.username,data.password)
    const token = await loginResult.user.getIdToken(false)
    localStorage.setItem("token",token)
    console.log('token',token)
    addToast("Login Is Successful.","success");

    // Simulating successful login and redirection:
    router.push("/list");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-4 pt-8 pb-8 mb-8"
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Login</h2>
            <hr className="my-2 mb-4 border-gray-300" />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              {...register("username")}
            />
            <p className="text-red-500 text-xs italic">
              {errors.username?.message}
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
            <p className="text-red-500 text-xs italic">
              {errors.password?.message}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
