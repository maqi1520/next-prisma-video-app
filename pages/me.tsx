import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { Video, User } from "@prisma/client";
import { makeSerializable } from "@/lib/util";
import VideoList from "@/components/video-list";

type Props = {
  data: (Video & {
    author: User;
  })[];
};

export default function Page({ data }) {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="flex justify-between items-center p-3  bg-white shadow">
        <h1 className="font-bold text-2xl">个人中心</h1>
      </header>
      <main className="px-3 mt-3">
        <VideoList className="space-y-3" data={data} editable horizontal />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = await prisma.video.findMany({
    where: {
      authorId: session.user.id,
    },
    include: { author: true },
  });

  return {
    props: {
      session,
      data: makeSerializable(data),
    },
  };
}
