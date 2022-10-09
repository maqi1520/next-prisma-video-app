import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";
import { Video, User } from "@prisma/client";

type Props = {
  data: (Video & {
    author: User;
  })[];
};

export default function Page({ data }: Props) {
  console.log(data);
  return (
    <div className="max-w-5xl px-3 mx-auto">
      <h1 className="text-3xl my-4">首页</h1>
      <main className="grid grid-cols-2 gap-2">
        {data.map((item) => {
          return (
            <div
              className="ring-1 ring-gray-200 p-2 flex flex-col justify-center"
              key={item.id}
            >
              <Link href={`/video/${item.id}`}>
                <a>
                  <Image
                    src={item.pic}
                    width={160}
                    height={90}
                    alt={item.title}
                  />
                  <div className="mt-2">{item.title}</div>
                </a>
              </Link>

              <div className="mt-2">{item.author.name}</div>
            </div>
          );
        })}
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
