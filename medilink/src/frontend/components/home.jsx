import React from "react";
import { Link } from "react-router-dom";
import meditation2 from "../../assets/meditation2.png";

const Homepage = () => {
  return (
    <div className="antialiased bg-body text-body font-body">
      {/* Navbar & Hero Section */}
      <section
        className="relative bg-white overflow-hidden"
        style={{
          backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-transparent">
          <nav className="flex justify-between p-6 px-4">
            <div className="flex justify-between items-center w-full">
              <div className="w-1/2 xl:w-1/3">
                <Link className="block max-w-max" to="#">
                  <img
                    className="h-8"
                    src="flex-ui-assets/logos/flex-ui-green-light.svg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="w-1/2 xl:w-1/3">
                <ul className="hidden xl:flex xl:justify-center">
                  <li className="mr-12">
                    <Link
                      className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mr-12">
                    <Link
                      className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li className="mr-12">
                    <Link
                      className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                      to="/how-it-works"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                      to="/faq"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 xl:w-1/3">
                <div className="hidden xl:flex items-center justify-end">
                  <Link
                    className="inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium rounded-md"
                    to="/login"
                  >
                    Log In
                  </Link>
                  <Link
                    className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="py-20 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap xl:items-center -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-12 md:mb-0">
                <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
                  MediLink: Empowering Patients with Secure Health Data Access
                </h1>
                <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
                  Manage, view, and securely share your medical records with ease.
                  MediLink gives you control over your health data, ensuring quick access during emergencies.
                </p>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                    <Link
                      className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-green-500 rounded-md shadow-sm"
                      to="#"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-4">
                <div className="relative mx-auto md:mr-0 max-w-max">
                  <img
                    className="relative rounded-3xl"
                    src={meditation2}
                    alt="meditation2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 bg-white"
        style={{
          backgroundImage: "url('pattern.svg')",
          backgroundPosition: "center",
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="flex -mx-4">
            {/* Feature 1: Secure Health Data Storage */}
            <div className="w-1/3 px-4">
              <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
                  {/* Updated padlock icon representing secure data storage */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9v4H3v10h18V13h-2V9c0-3.87-3.13-7-7-7zm-5 9V9c0-2.76 2.24-5 5-5s5 2.24 5 5v2H7z"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl leading-tight font-bold">
                  Secure Data Storage
                </h3>
                <p className="text-coolGray-500 font-medium">
                  Safely store and manage your medical records with robust encryption and HIPAA-compliant protocols.
                </p>
              </div>
            </div>
            {/* Feature 2: QR Code Emergency Access */}
            <div className="w-1/3 px-4">
              <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
                  {/* Icon representing QR code */}
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3h8v8H3zM3 13h8v8H3zM13 3h8v8h-8zM13 13h8v8h-8z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl leading-tight font-bold">
                  QR Code Access
                </h3>
                <p className="text-coolGray-500 font-medium">
                  Instantly share your health profile using a scannable QR code for emergency access.
                </p>
              </div>
            </div>
            {/* Feature 3: Real-Time Provider Updates */}
            <div className="w-1/3 px-4">
              <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
                  {/* Icon representing real-time updates */}
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4a8 8 0 100 16 8 8 0 000-16zm1 11h-2v-2h2v2zm0-4h-2V7h2v4z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl leading-tight font-bold">
                  Real-Time Updates
                </h3>
                <p className="text-coolGray-500 font-medium">
                  Stay informed with real-time notifications and seamless communication with healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        className="py-20 bg-white"
        style={{
          backgroundImage: "url('pattern.svg')",
          backgroundPosition: "center",
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-heading font-bold">
              Empower Your Health Journey
            </h2>
            <p className="mb-6 text-lg font-heading font-medium text-coolGray-500">
              Join MediLink today and take control of your medical records.
              Experience secure, instant access to your health data anytime, anywhere,
              and be prepared for emergencies.
            </p>
            <Link
              className="inline-block py-3 px-7 w-auto text-lg leading-7 text-green-50 bg-green-500 hover:bg-green-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm"
              to="/get-started"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;