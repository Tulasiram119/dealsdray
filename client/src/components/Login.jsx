import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setUsername } = useAppContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleClick = async () => {
    console.log(name, password);
    setUsername(name);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password }),
      });
      console.log(response);
      if (response.status !== 200) {
        setError("invlaid Credtionals");
        return;
      }
      const data = await response.json();

      localStorage.setItem("token", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error &&
        (() => {
          alert("Invalid credentials");
          setError("");
        })()}

      <section className=" border border-black md:w-[50%] mt-[5%]  md:ml-[25%] shadow-lg bg-amber-100 border-2px">
        <div className="">
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-12">
                  <label
                    htmlFor="username"
                    className="block text-sm  text-black font-bold"
                  >
                    {" "}
                    Username{" "}
                  </label>

                  <input
                    type="username"
                    id="Username"
                    name="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm border border-black p-1"
                  />
                </div>

                <div className="col-span-12">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-bold text-black"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm border border-black p-1"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-2 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    onClick={handleClick}
                  >
                    Log in
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Create new Account?
                    <Link
                      to="/register"
                      className="text-gray-700 underline mx-1"
                    >
                      Register
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Login;
