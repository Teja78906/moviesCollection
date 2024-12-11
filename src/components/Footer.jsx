import React from "react";

const Footer = () => (
    <footer className="bg-[rgb(10,10,10)] text-gray-200 py-4">
        <div className="container mx-auto text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} MovieStore. All Rights Reserved.
            </p>
            {/* <p className="text-xs mt-2">
                Built with ❤️ using React and Tailwind CSS.
            </p> */}
        </div>
    </footer>
);

export default Footer;
