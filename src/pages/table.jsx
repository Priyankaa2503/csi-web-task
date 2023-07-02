import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { database } from "../firebase/config";
import Link from "next/link";
import * as XLSX from "xlsx";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

function Table() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(excelData)

      const db = getDatabase();
      const contactsRef = ref(db, `${user.uid}`);

      // Start from row 1 (index 1) to skip the header row
      for (let i = 1; i < excelData.length; i++) {
        const newRow = {
          Contact: excelData[i][2],
          Email: excelData[i][1],
          JobDescription: {
            Department: excelData[i][4],
            JobTitle: excelData[i][3],
          },
          PersonalDetails: {
            Name: excelData[i][0],
            Gender: excelData[i][5],
            Age: excelData[i][6],
          },
        };

        await push(contactsRef, newRow);
      }

      console.log("Excel data added to Firebase");
    };

    reader.readAsBinaryString(uploadedFile);

    e.target.value = null;
  };

  useEffect(() => {
    if (user) {
      const contactsRef = ref(database, `${user.uid}`); // Use UID to retrieve user-specific data
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
    }
  }, [user]);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const contactRef = ref(database, `${user.uid}/${id}`); // Use UID to create a unique reference for the contact
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
    <div className="bg-[#022532] min-h-screen">
      <div className="mx-auto p-8 md:p-32 ">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <label
            htmlFor="fileInput"
            className="text-lg text-white font-semibold mb-2"
          >
            Upload Data via Excel:
          </label>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />

          <Button
            onClick={() => document.getElementById("fileInput").click()}
            variant="contained"
            style={{ backgroundColor: "gray" }}
          >
            Select File
          </Button>
          <Link href="/adddata/add">
            <Button variant="contained" style={{ backgroundColor: "gray" }}>
              ADD DATA
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="contained"
            style={{ backgroundColor: "gray" }}
          >
            Logout
          </Button>
        </div>

        <h2 className="text-2xl font-semibold text-white my-4">
          Employee Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Contact</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id) => (
                <tr className="text-center" key={id}>
                  <td className="py-2 px-4 border-b">
                    {data[id].PersonalDetails.Name}
                  </td>
                  <td className="py-2 px-4 border-b">{data[id].Email}</td>
                  <td className="py-2 px-4 border-b">{data[id].Contact}</td>
                  <td className="py-2 px-4 border-b">
                    {data[id].JobDescription.Department}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {data[id].JobDescription.JobTitle}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {data[id].PersonalDetails.Gender}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {data[id].PersonalDetails.Age}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-4 text-center justify-center">
                      <Link href={`/adddata/${id}`}>
                        <button className="text-green-500 font-medium py-2 px-4 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="text-red-700 font-bold py-2 px-4 rounded"
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
      </div>
    </div>
  );
}

export default Table;
