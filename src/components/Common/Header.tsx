import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className=" flex justify-center items-center gap-5 py-3 text-base">
      <Link
        className=" hover:bg-[#003249] hover:text-white px-2 rounded-md"
        href="/"
      >
        Home
      </Link>
      <Link
        className=" hover:bg-[#003249] hover:text-white px-2 rounded-md"
        href="/table"
      >
        Table
      </Link>
    </div>
  );
};

export default Header;
