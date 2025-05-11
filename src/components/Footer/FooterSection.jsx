import React from "react";
import { ConfigProvider, Image, Rate, Tabs, Typography } from "antd";
const { Text } = Typography;
const FooterSection = () => {
  return (
    <div className="flex h-[60vh] w-[100%] flex-col items-center justify-center">
      <div className="mx-auto flex grid h-[95%] w-full grid-cols-1 items-center justify-start gap-8 bg-gray-100 px-10 md:grid-cols-3">
        {/* Contact Section */}
        <div className="flex h-[200px] flex-col items-start justify-start gap-4">
          <Text className="text-lg font-semibold text-primary">Contact Us</Text>
          <ul className="mt-4 space-y-2 text-black">
            <li>Phone: +1 234 567 890</li>
            <li>Email: contact@bookstore.com</li>
            <li>Address: 123 Book Street, NY, USA</li>
          </ul>
        </div>

        {/* Navigation Links */}
        <div className="flex h-[200px] flex-col items-start justify-start">
          <Text className="text-lg font-semibold text-primary">
            Quick Links
          </Text>
          <ul className="mt-4 space-y-2 text-black">
            <li>
              <a href="/aboutus" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacypolicy" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-400">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex h-[200px] flex-col items-start justify-start">
          <Text className="text-lg font-semibold text-primary">Follow Us</Text>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Twitter page"
              className="transition-opacity duration-200 hover:opacity-75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-blue-500"
                title="Twitter"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.18 4.18 0 001.85-2.31 8.39 8.39 0 01-2.66 1.02 4.16 4.16 0 00-7.1 3.79A11.8 11.8 0 013 5.82a4.16 4.16 0 001.29 5.55 4.11 4.11 0 01-1.88-.52v.05a4.16 4.16 0 003.34 4.08 4.18 4.18 0 01-1.88.07 4.16 4.16 0 003.89 2.89A8.37 8.37 0 012 19.54 11.78 11.78 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54a8.35 8.35 0 002.05-2.12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg"
                alt="LinkedIn"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex h-[5%] w-full items-center justify-center">
        <Text className="text-xxs font-semibold text-gray-500">
          &copy; 2025 Online Bookstore. All rights reserved.
        </Text>
      </div>
    </div>
  );
};

export default FooterSection;
