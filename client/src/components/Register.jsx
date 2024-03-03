import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { username, setUsername } = useAppContext();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState();
  const handleSubmit = async () => {
    console.log(username, password);
    if (password !== confirmPassword) {
      setError("Password mismatch");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log(response);
      if (response.status !== 201) {
        setError("there must be an issue with credtionals");
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
    <section className=" border border-black md:w-[50%] mt-[5%]  md:ml-[25%] shadow-lg bg-amber-100 border-2px">
      {error &&
        (() => {
          alert("Invalid credentials");
          setError("");
        })()}
      <div className="">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm border border-black p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-bold text-black"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border-black bg-white text-sm text-gray-700 shadow-sm border p-1"
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-3 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleSubmit}
                >
                  Register
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link to="/login" className="text-gray-700 underline mx-1">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
