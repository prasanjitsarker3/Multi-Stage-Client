import TableData from "@/components/Pages/TableData";
import React from "react";

const TablePage = async () => {
  let tableData;
  try {
    const res = await fetch("http://localhost:5000/api/v1/post", {
      next: {
        revalidate: 30,
      },
    });
    tableData = await res.json();
  } catch (err: any) {
    console.log(err.message);
  }
  const data = tableData?.data ?? [];
  return (
    <div className=" p-12">
      <div>
        <TableData data={data} />
      </div>
    </div>
  );
};

export default TablePage;
