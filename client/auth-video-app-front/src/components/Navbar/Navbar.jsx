import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../../store/getSlices/authGetSlice";
import { useState } from "react";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const userInfo = JSON.parse(storedUser);

  const logoutHandler = async () => {
    try {
      await dispatch(logoutAuth());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <header className="bg-[#01A9DB]">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="font-semibold">VideoApp</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="/home"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </a>

            <a
              href="/profile"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Profile
            </a>
            <a
              href="/uploadvideo"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Upload Video
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userInfo ? (
              <button
                onClick={logoutHandler}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Logout <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <a
                href="/"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in<span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="font-semibold">VideoApp</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                X
              </button>
            </div>
            <div className="lg:hidden" role="dialog" aria-modal="true">
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a
                      href="/home"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </a>
                    <a
                      href="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                    <a
                      href="/uploadvideo"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Upload Video
                    </a>
                  </div>
                  <div className="py-6">
                    {userInfo ? (
                      <button
                        onClick={logoutHandler}
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Logout <span aria-hidden="true">&rarr;</span>
                      </button>
                    ) : (
                      <a
                        href="/"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Log in<span aria-hidden="true">&rarr;</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
