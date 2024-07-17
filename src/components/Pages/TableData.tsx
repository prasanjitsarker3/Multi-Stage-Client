"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";

interface UserData {
  fullName: string;
  dob: string;
  nationality: string;
  email: string;
  phone: string;
  departureDate: string;
  returnDate: string;
  accommodation: string;
  specialRequests: string;
  healthDeclaration: string;
  emergencyContact: string;
  medicalConditions: string;
}

const columns = [
  { name: "NAME", uid: "fullName" },
  { name: "DATE", uid: "dob" },
  { name: "TRAVEL", uid: "returnDate" },
  { name: "MEDICAL", uid: "healthDeclaration" },
];

const TableData = ({ data }: { data: UserData[] }) => {
  const renderCell = useCallback((item: UserData, columnKey: string) => {
    const cellValue = item[columnKey as keyof UserData];

    switch (columnKey) {
      case "fullName":
        return (
          <div className="flex flex-col text-sm">
            <p className="font-medium">{item?.fullName}</p>
            <p>{item?.email}</p>
            <p>{item?.phone}</p>
          </div>
        );
      case "dob":
        return (
          <div className="flex flex-col text-sm">
            <p>{item?.dob}</p>
            <p>{item?.departureDate}</p>
            <p>{item?.returnDate}</p>
          </div>
        );
      case "returnDate":
        return (
          <div className="flex flex-col text-sm">
            <p>{item?.accommodation}</p>
            <p>{item?.specialRequests}</p>
            <p>{item?.nationality}</p>
          </div>
        );
      case "healthDeclaration":
        return (
          <div className="flex flex-col text-sm">
            <p>{item?.healthDeclaration}</p>
            <p>{item?.emergencyContact}</p>
            <p>{item?.medicalConditions}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="p-5 bg-slate-50 shadow rounded-md">
      <h1 className=" text-2xl font-semibold py-3 text-[#003249]">
        Information Table
      </h1>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Data Found"}>
          {data &&
            data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {renderCell(item, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableData;
