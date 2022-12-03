import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className=" flex justify-center">
        <ul className="flex gap-4 ">
          <li>Home</li>
          <li>Post</li>
          <li>Login</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
