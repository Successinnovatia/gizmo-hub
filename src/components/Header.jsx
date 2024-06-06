import React from "react";
import { useSelector } from "react-redux";
import { useUserContext } from "../context/user_context";

const Header = () => {
  const { user } = useSelector((state) => state.userState);

  const { handleLogin, handleLogout, isLoading } = useUserContext();

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center items-center sm:justify-end">
        {isLoading ? (
          <></>
        ) : user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.name}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogin}
            >
              login/register
            </button>
          </div>
          // <div className="flex gap-x-6 justify-center items-center">
          //   <Link to="/login" className="link link-hover text-xs sm:text-sm">
          //     Sign in / Guest
          //   </Link>
          //   {/* <Link to="/register" className="link link-hover text-xs sm:text-sm">
          //     Create an Account
          //   </Link> */}
          // </div>
        )}
      </div>
    </header>
  );
};

export default Header;
