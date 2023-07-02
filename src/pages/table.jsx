import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { database } from "../firebase/config";
import Link from "next/link";
import * as XLSX from "xlsx";

function Table() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
  
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
  
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      const db = getDatabase();
      const contactsRef = ref(db, "contacts");
  
      // Start from row 1 (index 1) to skip the header row
      for (let i = 1; i < excelData.length; i++) {
        const newRow = {
          name: excelData[i][0],
          email: excelData[i][1],
          contact: excelData[i][2],
        };
  
        await push(contactsRef, newRow);
      }
  
      console.log("Excel data added to Firebase");
    };
  
    reader.readAsBinaryString(uploadedFile);

    e.target.value = null;
  };
  

  useEffect(() => {
    const contactsRef = ref(database, "contacts");
    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    };

    onValue(contactsRef, onDataChange);

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const contactRef = ref(database, `contacts/${id}`);
      remove(contactRef, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Data deleted");
        }
      });
    }
  };

  return (
    <div className="max-w-2xl mt-20 mx-auto">
      <input type="file" onChange={handleFileUpload} />
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id) => (
            <tr key={id}>
              <td className="py-2 px-4 border-b">{data[id].name}</td>
              <td className="py-2 px-4 border-b">{data[id].email}</td>
              <td className="py-2 px-4 border-b">{data[id].contact}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex gap-2">
                  <Link href={`/adddata/${id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
