"use client";
import store from "@/lib/store";
import "./globals.css";
import Player from "./ui/components/Player";
import { Provider } from "react-redux";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const NavSlibar = dynamic(() => import("./ui/components/NavSlibar"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-[100vh]`}>
        <Provider store={store}>
          <Suspense>
            <div className="w-full h-[100vh] grid grid-cols-12 bg-primary text-palette_four">
              <div className="col-span-2">
                <NavSlibar />
              </div>
              <div className="col-span-10">{children}</div>
            </div>
            <Player />
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
