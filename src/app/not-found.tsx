import { Button } from "@nextui-org/react";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <div className=" space-y-3">
        <h1 className=" text-center text-3xl text-red-500">Page Not Found !</h1>
        <Link href={"/"}>
          <Button startContent={<Home />}>Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
