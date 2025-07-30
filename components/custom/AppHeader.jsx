import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const AppHeader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 bg-white w-full p-3 shadow-sm flex justify-between items-center">
      <Link href={"/dashboard"} className="flex cursor-pointer">
        <Image
          src="/latest-logo.png"
          alt="logo"
          width={80}
          height={50}
          className="w-12 h-9"
        />
        <span className="text-2xl md:text-3xl font-bold font-sans leading-none bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text relative top-[4px] md:top-[6px]">
          Skillmate Ai
        </span>
      </Link>
      <UserButton />
    </div>
  );
};

export default AppHeader;
