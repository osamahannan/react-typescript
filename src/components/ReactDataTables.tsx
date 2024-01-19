import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from "react";
import DataTables from "datatables.net-dt";
import { RootState } from '../store/configureStore';

const ReactDataTables: React.FC = () => {
  const userList = useSelector((state: RootState) => state.userList.users);
  const tableRef = useRef<HTMLTableElement>(null);

  const data = Array.isArray(userList) ? userList.map(user => ({
    name: user.name,
    "age/sex": `${user.age} / ${user.sex.charAt(0)}`,
    mobile: user.mobile,
    address: `${user.address}, ${user.city}, ${user.country} (${user.pincode})`
  })) : []

  const columns = [
    { data: "name", title: "Patient Name" },
    { data: "age/sex", title: "Age/Sex" },
    { data: "mobile", title: "Mobile" },
    { data: "address", title: "Address" },
  ];

  useEffect(() => {
    const dt = new DataTables(tableRef.current!, { data, columns });
      return () => {
        dt.destroy();
    }
  }, [JSON.stringify(userList)]);

  return (
    <table ref={tableRef}></table>
  );
};

export default ReactDataTables;
