import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";
import LoginBtn from "@/components/login-btn";
import VideoList from "@/components/video-list";
import { Video, User } from "@prisma/client";

type Props = {
  data: (Video & {
    author: User;
  })[];
};

export default function Page({ data }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="flex justify-between items-center p-3 bg-white shadow">
        <h1 className="font-bold text-2xl">Next Video</h1>
        <LoginBtn />
      </header>
      <main className="px-3 mt-3">
        <VideoList className="grid grid-cols-2 gap-2" data={data} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.video.findMany({
    include: { author: true },
  });

  return {
    props: { data: makeSerializable(data) },
  };
};
