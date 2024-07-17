"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const postCreating = async (formData: FieldValues) => {
  const res = await fetch(`http://localhost:5000/api/v1/post/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const response = await res.json();
  return response;
};
