import React from "react";
import { Link } from "react-router-dom";
import meditation4 from "../../assets/meditation4.png";

const About = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="bg-transparent">
        {/* Navbar (same as Homepage) */}
        <nav className="flex justify-between p-6 px-4">
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <div className="w-1/2 xl:w-1/3">
              <Link className="block max-w-max" to="/">
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="xl:flex xl:w-1/3 xl:justify-center">
              <ul className="flex space-x-12">
                <li>
                  <Link
                    className="text-gray-500 hover:text-gray-900 font-medium"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 hover:text-gray-900 font-medium"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 hover:text-gray-900 font-medium"
                    to="/how-it-works"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 hover:text-gray-900 font-medium"
                    to="/faq"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Login & Sign Up */}
            <div className="xl:flex xl:w-1/3 xl:justify-end">
              <Link
                className="py-2 px-4 mr-2 text-gray-500 hover:text-gray-900 font-medium rounded-md"
                to="/login"
              >
                Log In
              </Link>
              <Link
                className="py-2 px-4 text-sm text-white bg-green-500 hover:bg-green-600 font-medium rounded-md"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* About Section */}
      <div className="py-10 md:py-14">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap xl:items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                About MediLink
              </h1>
              <p className="mb-8 text-lg md:text-xl text-gray-500 font-medium">
                MediLink is a comprehensive healthcare platform that connects
                patients and doctors seamlessly. Our mission is to simplify
                appointment scheduling, ensure secure access to medical records,
                and support real-time communication between healthcare providers and
                patients.
              </p>
              <p className="mb-8 text-lg md:text-xl text-gray-500 font-medium">
                We are dedicated to transforming healthcare through innovative
                technology, making it more accessible, efficient, and patient-centric.
              </p>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 px-4">
              <div className="relative mx-auto md:mr-0 max-w-max">
                <img
                  className="relative rounded-3xl"
                  src={meditation4}
                  alt="About Us"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;