import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const { employes, setEmployes, setSelectedEmployee } = useAppContext();
  const data = JSON.parse(localStorage.getItem("token"));
  const token = data?.token;
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const formatDate = (date) => {
    return (
      "" +
      date?.getFullYear() +
      "/" +
      (date?.getMonth() + 1) +
      "/" +
      date?.getDate()
    );
  };
  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/employee/${employeeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      setEmployes((prev) => prev?.filter((emp) => emp._id != employeeId));
    } catch (error) {
      console.log(error);
    }
  };
  const getEmployes = async () => {
    try {
      const respoonse = await fetch("http://localhost:5000/employee", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (respoonse.status === 200) {
        const data = await respoonse.json();
        console.log(data);
        setEmployes(data?.employees);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    navigate("/editemployee");
  };
  const handleSearch = () => {
    setEmployes((prev) => prev.filter((emp) => emp.name === search));
    setSearch("");
  };
  useEffect(() => {
    getEmployes();
  }, []);
  const sortByName = () => {
    setEmployes((prev) => prev.sort((a, b) => a.name.localeCompare(b.name)));
  };
  const sortByEmail = () => {
    setEmployes((prev) => prev.sort((a, b) => a.email.localeCompare(b.email)));
  };
  const sortByDate = () => {
    setEmployes((prev) =>
      prev.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    );
  };
  return (
    <div className="rounded-lg border border-blue-400 m-[2%] mt-[5%]">
      <div className="overflow-x-auto rounded-t-lg">
        <div className="flex flex-row justify-between">
          <p>Total count :{employes.length}</p>
          <button
            className="bg-blue-500 p-1 rounded-md mx-2 my-1 text-white"
            onClick={() => navigate("/addemployee")}
          >
            Create Employee
          </button>
        </div>
        <div className="flex flex-row justify-end gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-1"
            placeholder="Enter name to search"
          />
          <button
            className="bg-blue-600 rounded-md mx-2 my-1 p-0.5 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <table className="min-w-full divide-y-2 divide-gray-700 bg-amber-100 text-sm">
          <thead className="">
            <tr>
              <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium text-black">
                Image
              </th>
              <th
                className="whitespace-nowrap px-2 py-2 font-medium text-black cursor-pointer"
                onClick={sortByName}
              >
                Name
              </th>
              <th
                className="whitespace-nowrap px-2 py-2 font-medium text-black cursor-pointer"
                onClick={sortByEmail}
              >
                Email
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium text-black">
                Mobile no
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium text-black">
                Designation
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium text-black">
                Gender
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium text-black">
                Course
              </th>
              <th
                className="whitespace-nowrap px-2 py-2 font-medium text-black cursor-pointer"
                onClick={sortByDate}
              >
                Create Date
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium text-black">
                Action
              </th>
            </tr>
          </thead>

          {employes &&
            employes?.map((employee) => (
              <tbody className="divide-y divide-gray-200" key={employee._id}>
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {employee._id.substring(0, 3)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <img
                      src={employee.image}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {employee.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {employee.email}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {employee.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {employee.designation}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {employee.gender}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {employee.course}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {formatDate(new Date(employee.createdAt))}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      className="bg-blue-600 px-2 py-1 rounded-md m-1 text-white"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 px-2 py-1 rounded-md m-1"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>

      {/* <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              1
            </a>
          </li>

          <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
            2
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              3
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              4
            </a>
          </li>

          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div> */}
    </div>
  );
};

export default DashBoard;
