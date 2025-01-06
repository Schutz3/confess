import React from 'react';
import { Link } from 'react-router-dom';

function getYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
}

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © {getYear()} - All rights reserved by <Link to={'https://scz.my.id/'}>Han</Link></p>
      </div>
    </footer>
  );
};

export default Footer;