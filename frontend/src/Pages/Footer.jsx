import React from "react";

function Footer() {
  return (
    <div>
      <div className="w-full px-6 md:px-24 pt-10 pb-20 bg-gray-50 flex flex-col md:flex-row justify-between items-start gap-16">
        {/* Logo and Copyright */}
        <div className="inline-flex flex-col justify-start items-start gap-10">
          <img
            className="w-24 h-24"
            src="src/assets/media/Logo(Nav).png"
            alt="Logo"
          />
          <div className="text-zinc-600 text-sm font-normal font-['Fredoka'] leading-none">
            © 2025 AcmeTrack, Inc.
            <br />
            All rights reserved.
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1 flex flex-col justify-start items-start gap-5">
          <div className="text-zinc-600 text-base font-semibold font-['Fredoka']">
            Quick Links
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Home
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            About
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Services
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Contact
          </div>
        </div>

        {/* Resources */}
        <div className="flex-1 flex flex-col justify-start items-start gap-5">
          <div className="text-zinc-600 text-base font-semibold font-['Fredoka']">
            Resources
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            FAQs
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Blog
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Reports
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Guides
          </div>
        </div>

        {/* Connect */}
        <div className="flex-1 flex flex-col justify-start items-start gap-5">
          <div className="text-zinc-600 text-base font-semibold font-['Fredoka']">
            Connect
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Facebook
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Twitter
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            LinkedIn
          </div>
          <div className="text-zinc-600 text-base font-normal font-['Fredoka'] leading-none">
            Instagram
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
