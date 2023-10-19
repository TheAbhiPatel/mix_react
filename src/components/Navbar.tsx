import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between px-16 bg-gray-700 p-3">
      <div className="logo ">
        <NavLink to={"/"}>
          <span>Mix React</span>
        </NavLink>
      </div>
      <div>
        <ul className="flex gap-5">
          <li>
            <NavLink to={"/"} className={"hover:text-gray-400 duration-300"}>
              Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={"hover:text-gray-400 duration-300"}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              className={"hover:text-gray-400 duration-300"}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/more"}
              className={"hover:text-gray-400 duration-300"}
            >
              More
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
