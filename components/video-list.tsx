import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Video, User } from "@prisma/client";

type Props = {
  className?: string;
  editable?: boolean;
  horizontal?: boolean;
  data: (Video & {
    author: User;
  })[];
};

type ItemProps = {
  editable?: boolean;
  horizontal?: boolean;
  item: Video & {
    author: User;
  };
};

function VideoItem({ item, horizontal, editable }: ItemProps) {
  return (
    <div
      className="ring-1 ring-gray-200 bg-white p-2 flex flex-col justify-center"
      key={item.id}
    >
      <div
        className={`flex gap-3 ${
          horizontal ? "flex-row test-horizontal" : "flex-col test-vertical"
        }`}
      >
        <Link href={`/video/${item.id}`}>
          <a className="flex gap-2">
            <Image src={item.pic} width={160} height={90} alt={item.title} />
          </a>
        </Link>
        <Link href={`/video/${item.id}`}>
          <a>
            <div className="mt-2">{item.title}</div>
            <div className="mt-2">{item.author.name}</div>
          </a>
        </Link>
      </div>

      {editable && (
        <div className="space-x-3 flex justify-end">
          <button
            role="edit"
            className="px-3 py-2 rounded bg-blue-600 border border-blue-600 text-white"
          >
            编辑
          </button>
          <button
            role="delete"
            className="px-3 py-2 rounded bg-gray-50 border border-gray-200 text-gray-600"
          >
            删除
          </button>
        </div>
      )}
    </div>
  );
}

export default function VideoList({
  data,
  editable,
  className,
  horizontal,
}: Props) {
  return (
    <div className={className}>
      {data.map((item) => {
        return (
          <VideoItem
            key={item.id}
            editable={editable}
            horizontal={horizontal}
            item={item}
          />
        );
      })}
    </div>
  );
}
