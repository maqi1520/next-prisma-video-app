/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-3">
        <img
          className="w-12 h-12 rounded-full"
          src={session.user.image}
          alt="avator"
        />
        <Link href="/me">
          <a className="text-blue-600 font-medium">{session.user.name}</a>
        </Link>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => signOut()}
        >
          登出
        </button>
      </div>
    );
  }
  return (
    <button
      className="px-3 py-2 bg-blue-500 text-white rounded"
      onClick={() => signIn()}
    >
      登录
    </button>
  );
}
