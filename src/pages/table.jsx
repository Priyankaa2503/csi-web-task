import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue,remove  } from 'firebase/database';
import { database } from '@/firebase/config';
import Link from 'next/link';


function table() {
    const [data,setData] =useState({});
    // const db = getDatabase();

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

      const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
          const contactRef = ref(database, `contacts/${id}`);
          remove(contactRef, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Data deleted');
            }
          });
        }
      };
  return (
    <div className="max-w-2xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Contact List</h2>
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Sr. No.</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Contact</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((id, index) => (
          <tr key={id}>
            <td className="py-2 px-4 border-b">{index + 1}</td>
            <td className="py-2 px-4 border-b">{data[id].name}</td>
            <td className="py-2 px-4 border-b">{data[id].email}</td>
            <td className="py-2 px-4 border-b">{data[id].contact}</td>
            <td className="py-2 px-4 border-b">
              {/* Actions */}
              <td>
                <Link href={`/adddata/${id}`}>
                    <button>Edit</button>
                </Link>
               
                    <button onClick={()=>onDelete(id)}>Delete</button>
              </td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default table