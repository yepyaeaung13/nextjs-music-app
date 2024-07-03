"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();
      if (await data.message) {
        setLoginError(data.message);
      } else {
        localStorage.setItem("AUTH", JSON.stringify(data[0]));
        location.pathname = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SignUpHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirm_password");
    if (password === confirmPassword) {
      if (
        password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        )
      ) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-create`,
            {
              method: "POST",
              headers: {
                content: "application/json",
              },
              body: JSON.stringify({
                id: crypto.randomUUID(),
                name: name,
                email: email,
                password: password,
              }),
            }
          );

          const data = await res.json();
          if (await data.message) {
            setSignUpError(data.message);
          } else {
            setSignUpSuccess("Your Account has been created successfully.");
            e.target.reset();
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setSignUpError(
          "Password must contain at least one lowercase letter, Uppercase letter, number and minimum 8 characters"
        );
      }
    } else {
      setSignUpError("Passwords don't match");
    }
  };
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 h-screen w-screen bg-primary flex justify-center items-center">
        <Link href={"/"} className="fixed top-10 md:left-10 left-8 flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <span>back to home</span>
        </Link>
        <div className="md:w-96 w-80 h-96 flex flex-col">
          <div className="w-full flex">
            <h2
              className={`w-1/2 py-2 text-center cursor-pointer duration-300 rounded-t-lg ${
                isSignIn ? "bg-secondary" : ""
              }`}
              onClick={toggleSignIn}
            >
              Sign In
            </h2>
            <h2
              className={`w-1/2 py-2 text-center cursor-pointer duration-300 rounded-t-lg ${
                !isSignIn ? "bg-secondary" : ""
              }`}
              onClick={toggleSignIn}
            >
              Sign Up
            </h2>
          </div>
          <div className={`${isSignIn ? "block" : "hidden"}`}>
            <form
              method="post"
              className="p-5 flex flex-col items-center gap-3 bg-secondary rounded-b-lg"
              onSubmit={LoginHandler}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="rounded-md px-2 py-1 w-full bg-primary border border-primary focus:outline-none focus:border-green-600"
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="rounded-md px-2 py-1 w-full bg-primary border border-primary focus:outline-none focus:border-green-600"
                required
              />
              <span className="w-full text-left text-sm text-red-500 px-3">
                {loginError == null ? "" : loginError}
              </span>
              <input
                type="submit"
                value="Sign In"
                className="rounded-md cursor-pointer bg-green-600 py-1 mt-5 w-2/3"
              />
            </form>
          </div>
          <div className={`${!isSignIn ? "block" : "hidden"}`}>
            <form
              method="post"
              className="p-5 flex flex-col items-center gap-3 bg-secondary rounded-b-lg"
              onSubmit={SignUpHandler}
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="rounded-md px-2 py-1 w-full bg-primary border border-primary focus:outline-none focus:border-green-600"
                required
              />
              <input
                type="email"
                name="email"
                id="signup_email"
                placeholder="Email"
                className="rounded-md px-2 py-1 w-full bg-primary border border-primary focus:outline-none focus:border-green-600"
                required
              />
              <input
                type="password"
                name="password"
                id="signup_password"
                placeholder="Password"
                className="rounded-md px-2 py-1 w-full bg-primary border border-primary focus:outline-none focus:border-green-600"
                required
              />
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                className="rounded-md px-2 py-1 w-full bg-primary border border-primary focus:outline-none focus:border-green-600"
                required
              />
              <span className="w-full text-left px-3 text-sm text-red-500">
                {signUpError == null ? "" : signUpError}
              </span>
              <span className="w-full text-left px-3 text-sm text-green-500">
                {signUpSuccess == null ? "" : signUpSuccess}
              </span>
              <input
                type="submit"
                value="Sign Up"
                className="rounded-md cursor-pointer bg-green-600 py-1 mt-5 w-2/3"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
