"use client";

import { Search } from "lucide-react";
import { getUsers } from "@/api-services/user";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function User() {
  const {user, token } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const USERS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(token);
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || user.phoneNumber.includes(searchTerm);
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }


  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-around">
        <h4 className="font-bold pr-2 text-2xl">User listing</h4>
        <div className="flex items-center border rounded-lg overflow-hidden bg-yellow-50 w-[500px]">
          <Search className='text-gray-400 ml-0.5' />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="flex-grow p-2 focus:outline-none text-black"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* <button className="bg-blue-500 text-white p-2 hover:bg-blue-600">
              Search
            </button> */}
        </div>
      </div>
      <table className="border-collapse border border-gray-400 m-auto mt-10 w-full">
        <thead>
          <tr className="bg-blue-400">
            <th className="border border-gray-300 p-5">FistName</th>
            <th className="border border-gray-300 p-5">LastName</th>
            <th className="border border-gray-300 p-5">Phone number</th>
            <th className="border border-gray-300 p-5">Roles</th>
            <th className="border border-gray-300 p-5">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-5">{user.firstName}</td>
              <td className="border border-gray-300 p-5">{user.lastName}</td>
              <td className="border border-gray-300 p-5">{user.phoneNumber}</td>
              <td className="border border-gray-300 p-5">
                {user.roles.join(", ")}
              </td>
              <td
                className={`border border-gray-300 p-5 ${
                  user.status ? "text-green-600" : "text-red-500"
                }`}
              >
                {user.status ? "Active" : "Deactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-3 mt-6 text-black">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-black' : 'bg-gray-200'}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
