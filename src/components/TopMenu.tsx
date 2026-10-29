import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import Image from "next/image";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[50px] bg-white border-b border-gray-200 flex flex-row items-center justify-between px-5 sticky top-0 z-30">
      <div className="flex flex-row items-center space-x-6">
        {session ? (
          <Link href="/api/auth/signout" className="text-cyan-600 hover:underline text-sm font-semibold">
            Sign-Out
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="text-cyan-600 hover:underline text-sm font-semibold">
            Sign-In
          </Link>
        )}
        <Link href="/mybooking" className="text-cyan-600 hover:underline text-sm font-semibold">
          My Booking
        </Link>
      </div>
      <div className="flex flex-row items-center space-x-6">
        <Link href="/booking" className="text-gray-600 hover:underline text-sm font-semibold">
          Booking
        </Link>
        <Image
          src="/img/logo.png"
          alt="logo"
          width={35}
          height={35}
          className="h-[35px] w-auto"
        />
      </div>
    </div>
  );
}
