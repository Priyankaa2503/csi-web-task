import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';

const initialState = {
  Email: '',
  Contact: '',
  PersonalDetails: {
    Name: '',
    Gender: '',
    Age: '',
  },
  JobDescription: {
    Department: '',
    JobTitle: '',
  },
};

function AddData() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [state, setState] = useState(initialState);
  const { PersonalDetails, JobDescription, Email, Contact } = state;
  const db = getDatabase();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactsRef = ref(db, `${user.uid}`);
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
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNestedInput = (e) => {
    const { name, value } = e.target;
    const field = name.split('.')[0];
    const subfield = name.split('.')[1];

    setState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [subfield]: value,
      },
    }));
  };

  return (
    <div className="bg-[#022532] py-10 flex justify-center items-center">
      <div className="px-16 py-6 w-2/6 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Add Job Details</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="border-gray-900 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="PersonalDetails.Name"
              value={PersonalDetails.Name}
              onChange={handleNestedInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block border-gray-900 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={Email}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block border-gray-900 font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="Contact"
              value={Contact}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block border-gray-900 font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="PersonalDetails.Gender"
              value={PersonalDetails.Gender}
              onChange={handleNestedInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block border-gray-900 font-medium text-gray-700">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="PersonalDetails.Age"
              value={PersonalDetails.Age}
              onChange={handleNestedInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block border-gray-900 font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="JobDescription.Department"
              value={JobDescription.Department}
              onChange={handleNestedInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block border-gray-900 font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="JobDescription.JobTitle"
              value={JobDescription.JobTitle}
              onChange={handleNestedInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <button type="submit" className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddData;
