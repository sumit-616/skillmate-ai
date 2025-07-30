"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";

export default function Home() {
  return (
    <div>
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

        <Link href="/dashboard">
          <Button className="cursor-pointer">Get Started!</Button>
        </Link>
      </div>

      <div className="flex flex-col items-center mt-20 px-10 md:px-20 lg:px-36 xl:px-52 text-center">
        <div className="group relative max-w-md mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span className="absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]" />
          🎉
          <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:300%_100%] bg-clip-text text-transparent text-sm font-medium">
            Introducing Magic UI
          </span>
          <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-center mt-5">
          Revolutionize Learning with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            AI-Powered Voice Agent
          </span>{" "}
          🎙️📚
        </h1>

        {/* CTA Button */}
        <Link href="/dashboard">
          <Button className="group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 px-8 py-2 font-medium text-primary-foreground mt-7">
            Get Started!
          </Button>
        </Link>

        <div className="w-full flex justify-center mt-12 mb-10">
          <div className="w-[90%] max-w-6xl">
            <div className="relative block dark:hidden">
              <Image
                src="/image.png"
                alt="Hero Preview"
                width={2400}
                height={2400}
                className="w-full h-auto rounded-md border shadow-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
