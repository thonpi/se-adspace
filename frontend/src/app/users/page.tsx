'use client'

import { Search } from 'lucide-react';
import { getUsers } from '@/api-services/user'
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function User() {
  const { token } = useAppContext();
  console.log('token', token);

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(token);
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUsers()
    }
  }, [token])

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-around">
        <h4 className="font-bold pr-2 text-2xl">User listing</h4>
        <div className="flex items-center border rounded-lg overflow-hidden bg-yellow-50">
          <Search className='text-black ml-0.5' />
          <input type="text" placeholder="Search..." className="flex-grow p-2 focus:outline-none text-black" />
          {/* <button className="bg-blue-500 text-white p-2 hover:bg-blue-600">
              Search
            </button> */}
        </div>
      </div>
      <table className="border-collapse border border-gray-400 m-auto mt-10 w-full">
        <thead>
          <tr className='bg-blue-400'>
            <th className="border border-gray-300 p-5">FistName</th>
            <th className="border border-gray-300 p-5">LastName</th>
            <th className="border border-gray-300 p-5">Phone number</th>
            <th className="border border-gray-300 p-5">Roles</th>
            <th className="border border-gray-300 p-5">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-5">{user.firstName}</td>
              <td className="border border-gray-300 p-5">{user.lastName}</td>
              <td className="border border-gray-300 p-5">{user.phoneNumber}</td>
              <td className="border border-gray-300 p-5">{user.roles.join(', ')}</td>
              <td className={`border border-gray-300 p-5 ${
                user.status ? 'text-green-600' : 'text-red-500'}`
              }>
                {user.status ? 'Active' : 'Deactive'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
};