import facebookIcon from "../../assets/facebook.png";
import linkedinIcon from "../../assets/linkedin.png";
import twitterIcon from "../../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-md text-center p-6 mt-10">
      {/* Clickable words */}
      <div className="flex justify-center space-x-6 text-gray-700 font-medium mb-4">
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Authors</a>
        <a href="#" className="hover:underline">Archive</a>
        <a href="#" className="hover:underline">Terms and Conditions</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" className="w-8 h-8 hover:opacity-75" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 hover:opacity-75" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" className="w-8 h-8 hover:opacity-75" />
        </a>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-gray-900 text-white text-sm py-3">
        © {new Date().getFullYear()} MediLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
