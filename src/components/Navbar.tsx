import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <nav className="flex justify-center border-2">
        <ul className="flex gap-10">
          <li className="p-4 text-lg ">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4  text-lg">
            <Link href="/">Post</Link>
          </li>
          <li className="p-3 text-lg">
            {!session ? (
              <button
                className="rounded-2xl border-2 border-gray-600 px-2 py-1 hover:bg-slate-700 hover:text-white"
                onClick={() => signIn()}
              >
                Login
              </button>
            ) : (
              <button onClick={() => signOut()}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
