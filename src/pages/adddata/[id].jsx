import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { database } from "@/firebase/config";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

function EditContact() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [contact, setContact] = useState({
   
    PersonalDetails: {
      Name: "",
      Email: "",
    Contact: "",
      Gender: "",
      Age: "",
    },
    JobDescription: {
      Department: "",
      JobTitle: "",
    },
  });
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      const contactRef = ref(database, `${user.uid}/${id}`);
      const onDataChange = (snapshot) => {
        if (snapshot.exists()) {
          setContact({ ...snapshot.val() });
        } else {
          setContact({
            
            PersonalDetails: {
              Name: "",
              Email: "",
              Contact: "",
              Gender: "",
              Age: "",
            },
            JobDescription: {
              Department: "",
              JobTitle: "",
            },
          });
        }
      };

      const onError = (error) => {
        console.log(error);
      };

      onValue(contactRef, onDataChange, { onlyOnce: true, onError });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactRef = ref(database, `${user.uid}/${id}`);
    set(contactRef, contact, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated data");
      }
    });
    setTimeout(() => router.push("/table"), 500);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split(".");
    setContact((prevContact) => ({
      ...prevContact,
      [parentKey]: {
        ...prevContact[parentKey],
        [childKey]: value,
      },
    }));
  };

  return (
    <div className="bg-[#022532] min-h-screen py-10 flex justify-center items-center">
      <div className="px-16 py-6 md:w-2/6 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit Job Details</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="border-gray-900 font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="PersonalDetails.Name"
              value={contact.PersonalDetails.Name}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block border-gray-900 font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="PersonalDetails.Email"
              value={contact.PersonalDetails.Email}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block border-gray-900 font-medium text-gray-700"
            >
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="PersonalDetails.Contact"
              value={contact.PersonalDetails.Contact}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block border-gray-900 font-medium text-gray-700"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="PersonalDetails.Gender"
              value={contact.PersonalDetails.Gender}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block border-gray-900 font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="PersonalDetails.Age"
              value={contact.PersonalDetails.Age}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block border-gray-900 font-medium text-gray-700"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="JobDescription.Department"
              value={contact.JobDescription.Department}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobTitle"
              className="block border-gray-900 font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="JobDescription.JobTitle"
              value={contact.JobDescription.JobTitle}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
