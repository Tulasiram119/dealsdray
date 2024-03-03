import { Link } from "react-router-dom";
import image from "../assets/unnamed.jpg";
import { useAppContext } from "../context/AppContext";
const Header = () => {
  const { username, setUsername } = useAppContext();
  const handleLogout = () => {
    console.log("clicked");

    localStorage.clear();
    setUsername("");
  };
  return (
    <header className=" bg-whit">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <img className="w-12 h-12 rounded-md" src={image} alt="logo" />
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  to="/dashboard"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!username && (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  to={"/login"}
                >
                  Login
                </Link>
              </div>
            )}
            {username && (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  to={"/login"}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
