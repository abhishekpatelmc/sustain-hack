import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";

const DeatilsPage = ({}) => {
  return (
    <div>
      <div>
        <Navbar />
        <div className="my-10 text-center text-4xl font-bold uppercase text-slate-700">
          Post Details
        </div>
        <div className="flex justify-evenly sm:mx-10">
          {/* Left side */}
          <div className="">
            <div className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Title
            </div>
            <div className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Description
            </div>
            <div className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Address
            </div>
            <div className="my-4 flex justify-evenly text-lg">
              {/* {isActive ? ( */}
              <div className="mr-4 rounded-2xl border  border-green-700 px-2 py-1 capitalize  hover:bg-green-700 hover:text-white">
                Active
              </div>
              {/* ) : ( */}
              <div className="mr-4 rounded-2xl border border-rose-700 px-2 py-1  capitalize hover:bg-rose-700 hover:text-white ">
                Inactive
              </div>
              {/* )} */}
            </div>
          </div>
          {/* Right side */}
          <div className="mt-10">
            <div className="max-w-xl">
              <Image
                width={300}
                height={300}
                alt="Picture of the post"
                src=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeatilsPage;
