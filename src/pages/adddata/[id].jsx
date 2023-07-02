import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { database } from '@/firebase/config';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';

function EditContact() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    contact: ''
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
            name: '',
            email: '',
            contact: ''
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
        console.log('Updated data');
      }
    });
    setTimeout(() => router.push('/table'), 500);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  return (
    <div className="bg-[#022532] h-screen  flex justify-center items-center">
      <div className="p-16 w-2/6 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit Contact</h2>
        <form className='w-full' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className=" border-gray-900 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={handleInput}
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
              name="email"
              value={contact.email}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block border-gray-900 font-medium text-gray-700">
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={contact.contact}
              onChange={handleInput}
              className="mt-1 px-2 py-2 w-full border border-gray-900 rounded-md"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-gray-600 text-white rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
