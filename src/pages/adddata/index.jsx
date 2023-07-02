// components/AddData.js
import React, { useState } from 'react';
import database from '../../firebase/config';
import { getDatabase,ref,set,push } from 'firebase/database';
import { useRouter } from 'next/router';

const initialState = {
  name: '',
  email: '',
  contact: ''
};

function AddData() {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
  const db = getDatabase();
const router = useRouter();
  
const handleSubmit = (e) => {
    e.preventDefault();
    const contactsRef = ref(db, 'contacts');
    push(contactsRef, state, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Added data');
      }
    });
    setTimeout(() => router.push('/table'), 500);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto py-4 px-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInput}
            className="mt-1 px-4 py-2 w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInput}
            className="mt-1 px-4 py-2 w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block font-medium text-gray-700">
            Contact
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={contact}
            onChange={handleInput}
            className="mt-1 px-4 py-2 w-full border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddData;




