import React, { useRef, useEffect } from "react";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/util";
import { Chapter } from "@prisma/client";

type Props = {
  chapter: Chapter;
};

export default function Page({ chapter }: Props) {
  return (
    <div>
      <div className="aspect-video">
        <video
          width="100%"
          height="100%"
          src={chapter.url}
          controls
          poster={chapter.cover}
        >
          抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以{" "}
          <a href="videofile.ogg">下载</a>
          并用你喜欢的播放器观看！
        </video>
      </div>
      <div className="p-3">{chapter.title}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chapter = await prisma.chapter.findUnique({
    where: {
      id: Number(context.params.id),
    },
  });

  return {
    props: {
      chapter: makeSerializable(chapter),
    },
  };
};
