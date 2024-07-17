import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Toaster } from "sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster position="top-right" richColors />
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  );
};

export default Provider;
