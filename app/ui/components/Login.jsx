import { app } from "@/lib/config/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import React from "react";

const Login = ({ userAuth, setUserAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginHandler = async (user) => {
    await fetch("https://nextjs-music-app-w7op.vercel.app/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("AUTH", JSON.stringify(json));
        setUserAuth(json);
      })
      .catch((err) => console.error(err));
  };
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider)
      .then((userCred) => {
        loginHandler(userCred.user);
      })
      .catch((err) => console.error(err));
  };
  return (
    <button
      className={`hover:bg-secondary mt-10 rounded-md p-1 duration-200 items-start gap-2 ${
        userAuth == null ? "flex" : "hidden"
      }`}
      onClick={loginWithGoogle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 text-green-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
      <span>Login</span>
    </button>
  );
};

export default Login;
