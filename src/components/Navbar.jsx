import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Navbar() {
  const { user, signOut } = useAuth();
  console.log(user)

  const authNavigation = useMemo(
    () => [
      {
        name: "Sign in",
        href: "signin",
        current: true,
        className: "whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
      },
      {
        name: "Sign up",
        href: "signup",
        current: false,
        className:
          "ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      }
    ],
    []
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav className="flex justify-between px-3 mt-2 mb-5">
      <div className="logo">
        <Link
          to="/"
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Firebase Authentication
        </Link>
      </div>
      {user ? (
        <div className="flex items-center">
          <div className="flex flex-col">
            <strong className="leading-5">{user.displayName}</strong>
            <span className="leading-5">{user.email}</span>
          </div>
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
                <span className="sr-only">Open user menu</span>
                <img className="h-9 w-9 rounded-full" src={user.photoURL} alt="" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/update-user"
                      className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                    >
                      Update User
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/update-password"
                      className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                    >
                      Change Password
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={signOut}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 w-full text-start"
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className="navigation">
          {authNavigation.map((item, key) => (
            <Link to={item.href} key={key} className={item.className}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
