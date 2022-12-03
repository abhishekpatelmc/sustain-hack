import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-center  align-middle">
        <ul className="flex gap-4 ">
          <li className="p-4 text-lg ">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4  text-lg">
            <Link href="/">Post</Link>
          </li>
          <li className="p-4 text-lg">
            <Link href="/">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
