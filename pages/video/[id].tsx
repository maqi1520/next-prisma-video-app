import React, { useRef, useEffect } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/util";
import { Video, User, Chapter } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import useOnScreen from "@/hooks/useOnScreen";

type Props = {
  video: Video & {
    author: User;
  };
};

type Result = { data: Chapter[]; nextCursor: number };

const getKey = (pageIndex, previousPageData, videoId) => {
  // reached the end
  if (previousPageData && !previousPageData.data) return null;

  // 首页，没有 `previousPageData`
  if (pageIndex === 0) return `/api/chapter?videoId=${videoId}`;

  // 将游标添加到 API
  return `/api/chapter?cursor=${previousPageData.nextCursor}&videoId=${videoId}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ video }: Props) {
  const ref: any = useRef<HTMLDivElement>();
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref);

  const { data, error, size, setSize } = useSWRInfinite<Result>(
    (...args) => getKey(...args, video.id),
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const hasNext = data && data[data.length - 1].nextCursor;
  const isLoadingInitialData = !data && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  useEffect(() => {
    if (onScreen && hasNext) {
      setSize(size + 1);
    }
  }, [onScreen, hasNext]);

  return (
    <div className="max-w-5xl px-3 mx-auto pb-5">
      <h1 className="text-3xl my-4 text-center">{video.title}</h1>
      <div className="text-center">
        <Image src={video.pic} width={320} height={180} alt={video.title} />
      </div>
      <div className="p-3">{video.desc}</div>
      <h2 className="text-xl my-2">章节视频</h2>
      <div>
        <main className="grid min-h-screen grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
          {data &&
            data.map((pageData, index) => {
              // `data` 是每个页面 API 响应的数组。
              return pageData.data.map((item) => (
                <div
                  className="ring-1 ring-gray-200 p-2 flex flex-col justify-center"
                  key={item.id}
                >
                  <Link href={`/video/chapter/${item.id}`}>
                    <a className="mx-auto">
                      <Image
                        className="aspect-video"
                        src={item.cover}
                        width={160}
                        height={90}
                        alt={item.title}
                      />
                      <div className="mt-2 h-12 text-ellipsis overflow-hidden">
                        {item.title}
                      </div>
                    </a>
                  </Link>
                </div>
              ));
            })}
        </main>
        <div className="text-center p-3" ref={ref}>
          {isLoadingMore ? "Loading..." : hasNext ? "加载更多" : "没有数据了"}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const video = await prisma.video.findUnique({
    include: {
      author: true,
    },
    where: {
      id: Number(context.params.id),
    },
  });

  return {
    props: {
      video: makeSerializable(video),
    },
  };
};
