"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@stackframe/stack";
import { CoachingExpert, CoachingOptions } from "@services/Options";
import { Button } from "@components/ui/button";
import { BlurFade } from "@components/magicui/blur-fade";
import UserInputDialog from "./UserInputDialog";

const FeatureAssistant = () => {
  const user = useUser();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-gray-500">My Workspace</h2>
          <h2 className="text-3xl font-bold">
            Welcome back, {user?.displayName}
          </h2>
        </div>
        <Button className="cursor-pointer">Profile</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-10">
        {CoachingOptions.map((option, index) => (
          <BlurFade key={option.icon} delay={0.25 + index * 0.1} inView>
            <div
              key={index}
              className="py-3 px-5 bg-secondary rounded-3xl flex flex-col justify-center items-center"
            >
              <UserInputDialog coachingOption={option}>
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <Image
                    src={option.icon}
                    alt={option.name}
                    width={150}
                    height={150}
                    className="h-[70px] w-[70px] hover:rotate-12 hover:scale-3d hover:scale-105 transition-all"
                  />
                  <h2 className="mt-2">{option.name}</h2>
                </div>
              </UserInputDialog>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};

export default FeatureAssistant;
