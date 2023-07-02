import React, { useEffect, useState } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import * as XLSX from 'xlsx';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function Table() {
  const [data, setData] = useState({});
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(excelData);

      // Add the Excel data to Firebase
      const db = getDatabase();
      const contactsRef = ref(db, 'contacts');
      const promises = excelData.map((row) => push(contactsRef, { name: row[0], email: row[1], contact: row[2] }));
      Promise.all(promises)
        .then(() => console.log('Excel data added to Firebase'))
        .catch((error) => console.log('Error adding Excel data to Firebase:', error));
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    const contactsRef = ref(database, 'contacts');
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

  return (
    <div className="max-w-2xl mt-20 mx-auto">
      <input type="file" onChange={handleFileUpload} />
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              <td className="border border-gray-300 px-4 py-2">{data[key].name}</td>
              <td className="border border-gray-300 px-4 py-2">{data[key].email}</td>
              <td className="border border-gray-300 px-4 py-2">{data[key].contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {excelData.length > 0 && (
        <table className="mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row[0]}</td>
                <td className="border border-gray-300 px-4 py-2">{row[1]}</td>
                <td className="border border-gray-300 px-4 py-2">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
