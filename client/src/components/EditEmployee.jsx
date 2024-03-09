import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const EditEmployee = () => {
  const { selectedEmployee } = useAppContext();
  const [name, setName] = useState(selectedEmployee.name);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [phoneNumber, setPhoneNumber] = useState(selectedEmployee.phoneNumber);
  const [isOpen, setIsOpen] = useState(false);
  const [designation, setDesignation] = useState(selectedEmployee.designation);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setDesignation(value);
    setIsOpen(false);
  };
  const [gender, setGender] = useState(selectedEmployee.gender);
  const [course, setCourse] = useState(selectedEmployee.course);
  const [file, setFile] = useState(selectedEmployee.image);
  const postDetails = (pics) => {
    if (pics === undefined) {
      console.log("pics are required");
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setLoading(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dwfg7ie1n");
      fetch("https://api.cloudinary.com/v1_1/dwfg7ie1n/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFile(data?.url.toString());
          setLoading(false);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("select a pic");

      return;
    }
  };
  const data = JSON.parse(localStorage.getItem("token"));
  const token = data?.token;
  const handleSubmit = async () => {
    console.log(name, email, phoneNumber, designation, gender, course, file);
    const response = await fetch("http://localhost:5000/employee", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        designation,
        gender,
        course,
        image: file,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      navigate("/dashboard");
    }
  };
  return (
    <div className="w-[75%] mx-[15%] mt-[3%] bg-amber-100 p-4 rounded-md">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-xl font-large text-black">
            {" "}
            Name{" "}
          </label>

          <input
            type="text"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-black rounded-md shadow-sm sm:text-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="UserEmail"
            className="block text-xl font-large text-black"
          >
            {" "}
            Email{" "}
          </label>

          <input
            type="email"
            id="UserEmail"
            placeholder="john@rhcp.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-black rounded-md  p-2 shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="mobilenumber"
            className="block text-xl font-large text-black"
          >
            {" "}
            Mobile Number{" "}
          </label>

          <input
            type="text"
            id="mobilenumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="9573084840"
            className="mt-1 w-full rounded-md border border-black p-2  shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <div className="">
            <div className="dropdown inline-block relative w-full">
              <button
                className="bg-gray-300 text-black font-semibold px-2  rounded inline-flex items-center p-2"
                onClick={toggleDropdown}
              >
                <span className="mr-1">{designation || "Designation"}</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              {isOpen && (
                <ul className="dropdown-menu absolute text-gray-700 pt-1">
                  <li>
                    <a
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      onClick={() => handleSelect("HR")}
                    >
                      HR
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      onClick={() => handleSelect("MANAGER")}
                    >
                      MANAGER
                    </a>
                  </li>
                  <li>
                    <a
                      className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      onClick={() => handleSelect("SALES")}
                    >
                      SALES
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-black text-xl">Gender</h2>
          <div className="text-black p-2 ">
            <label>
              <input
                type="radio"
                value="Male"
                name="options"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="Female"
                name="options"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="Other"
                name="options"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>
        <div>
          <h2>Course </h2>
          <div className="p-2">
            <label>
              <input
                type="checkbox"
                value="MCA"
                name="course"
                checked={course === "MCA"}
                onChange={(e) => setCourse(e.target.value)}
              />
              MCA
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="BCA"
                name="course"
                checked={course === "BCA"}
                onChange={(e) => setCourse(e.target.value)}
              />
              BCA
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="BSC"
                name="course"
                checked={course === "BSC"}
                onChange={(e) => setCourse(e.target.value)}
              />
              BSC
            </label>
          </div>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>
      </div>
      <button
        className="bg-blue-600 px-4 py-1 mt-2 mb-2 text-white rounded-md"
        onClick={handleSubmit}
      >
        {loading? "Loading":"Save Changes"}
      </button>
    </div>
  );
};

export default EditEmployee;
