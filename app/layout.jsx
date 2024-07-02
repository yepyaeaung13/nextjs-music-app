"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import store from "@/lib/store";

const NavSlibar = dynamic(() => import("./ui/components/NavSlibar"), {
  ssr: false,
});

const Player = dynamic(() => import("./ui/components/Player"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-[100vh]">
        <Provider store={store}>
          <Suspense>
            <div className="h-screen w-full grid md:grid-cols-12 grid-rows-12 bg-primary text-palette_four">
              <div className="h-full md:col-span-2 row-span-1 md:block flex items-center justify-between md:px-0 px-2">
                <div className="flex justify-center">
                  <img src="logo.gif" alt="" className="h-10" />
                </div>

                <div className="md:hidden group">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </button>
                  <div className="hidden group-hover:block absolute top-10 right-0 w-52">
                    <NavSlibar />
                  </div>
                </div>

                <div className="md:block hidden">
                  <NavSlibar />
                </div>
              </div>
              <div className="h-full md:col-span-10 row-span-11">
                {children}
              </div>
            </div>
            <Player />
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
