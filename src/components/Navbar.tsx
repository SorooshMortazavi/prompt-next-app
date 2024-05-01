import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-600 py-2 px-2 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-4" />
        <span className="text-white text-lg font-bold">Prompts</span>
        <Link href="/login">
        <span className="ml-4 text-white text-sm font-bold">login</span>
        </Link>
      </div>
      <ul className="flex space-x-4 text-white">
        <li>
          <a href="favorites">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHeart} className="w-4 h-4 mr-1" />Favorites
            </div>
          </a>
        </li>
        <li>
          <a href="/list">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faList} className="w-4 h-4 mr-1" />List
            </div>
          </a>
        </li>
        <li>
          <Link href="/add-prompt">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-1" />Add Prompt
              </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
