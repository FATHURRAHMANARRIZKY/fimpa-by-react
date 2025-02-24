import React, { useState } from "react";

export default function Navbar({ activeLink, handleNavLinkClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // bg-opacity-30 backdrop-filter backdrop-blur-lg
  return (
    <nav className="fixed w-full top-0 z-10 right-0 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="flex justify-between items-center h-16 mx-auto max-w-7xl">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <img
                className="w-8 h-8"
                src="assets/logo.ico"
                alt="Your Company"
              />
              <h3 className="ml-2 font-bold text-xl leading-none translate-y-1 font-playfair">
                FIMPA
              </h3>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="hidden md:flex space-x-4">
                <a
                  href="#home"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "home"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={activeLink === "home" ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("home");
                  }}
                >
                  Home
                </a>
                <a
                  href="#product"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "product"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("product");
                  }}
                >
                  Product
                </a>
                <a
                  href="#contact"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "contact"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("contact");
                  }}
                >
                  Contact
                </a>
                <a
                  href="#reviews"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "reviews"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("reviews");
                  }}
                >
                  Reviews
                </a>
                <a
                  href="#about"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "about"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("about");
                  }}
                >
                  About
                </a>
              </div>
            </div>
            <div className="relative ml-3 space-x-4 lg:flex hidden">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>

              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-5 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none menu-connector"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile sidebar */}
            <div
              className={`fixed top-0 right-0 w-64 h-full bg-blue-950 bg-opacity-90 backdrop-blur-sm transition-transform transform ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
              id="mobile-menu"
            >
              {/* Tambahkan tombol X di sudut kanan atas */}
              <button
                type="button"
                className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-gray-700 p-2 text-gray-400 hover:text-white focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Home content */}
              <div className="mt-16 space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <a
                  href="#"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "Home"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={activeLink === "Home" ? "page" : undefined}
                  onClick={() => handleNavLinkClick("Home")}
                >
                  Home
                </a>
                <a
                  href="#"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "Product"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleNavLinkClick("Product")}
                >
                  Product
                </a>
                <a
                  href="#"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "Contact"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleNavLinkClick("Contact")}
                >
                  Contact
                </a>
                <a
                  href="#"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "Reviews"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleNavLinkClick("Reviews")}
                >
                  Reviews
                </a>
                <a
                  href="#"
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    activeLink === "About"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleNavLinkClick("About")}
                >
                  About
                </a>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-3">
                  <div className="shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
