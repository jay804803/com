import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Products', exact: true },
    { path: '/addProduct', label: 'Add Product' },
    { path: '/category', label: 'Categories' },
    { path: '/brand', label: 'Brands' },
  ];

  return (
    <div className="absolute top-0 left-0 h-[10%] w-full px-12 py-2 flex items-center justify-between  bg-[#161D29]">
      <h1 className="text-3xl text-white font-bold">ENACTION</h1>
      <div className="flex gap-3 p-1 rounded-full">
        {navItems.map(({ path, label, exact }) => (
          <NavLink
            key={path}
            to={path}
            end={exact}
            className={({ isActive }) =>
              `p-2 font-light rounded-xl transition-colors duration-300 ${
                isActive
                  ? ' text-white border-2 border-white '
                  : ' border-2 text-white border-[#161D29] '
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
