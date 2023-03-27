import React from "react";
import { GiWashingMachine } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import {
  FaParking,
  FaSwimmingPool,
  FaAccessibleIcon,
  FaGripfire,
} from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { MdWifiPassword, MdCommute, MdFax, MdPets } from "react-icons/md";

import { IconContext } from "react-icons";

const PropertiesFeatures = ({ selected, onChange }) => {
  const handleCbClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter((feature) => feature !== name));
    }
  };
  return (
    <>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("wifi")}
              name="wifi"
              onChange={handleCbClick}
            />
            <span className="ml-2">Wifi</span>
            <MdWifiPassword />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("phone")}
              name="phone"
              onChange={handleCbClick}
            />
            <span className="ml-2">Telephone</span>
            <MdFax />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("access")}
              name="access"
              onChange={handleCbClick}
            />
            <span className="ml-2">Accesible</span>
            <FaAccessibleIcon />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("pets")}
              name="pets"
              onChange={handleCbClick}
            />
            <span className="ml-2">Pets Allowed</span>
            <MdPets />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("dishwasher")}
              name="dishwasher"
              onChange={handleCbClick}
            />
            <span className="ml-2">Dishwasher</span>
            <GiWashingMachine />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("transportation")}
              name="transportation"
              onChange={handleCbClick}
            />
            <span className="ml-2">Public Transportation</span>
            <MdCommute />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("fireplace")}
              name="fireplace"
              onChange={handleCbClick}
            />
            <span className="ml-2">Fireplace</span>
            <FaGripfire />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("gym")}
              name="gym"
              onChange={handleCbClick}
            />
            <span className="ml-2">Gym</span>
            <CgGym />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("parking")}
              name="parking"
              onChange={handleCbClick}
            />
            <span className="ml-2">Parking</span>
            <FaParking />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("pool")}
              name="pool"
              onChange={handleCbClick}
            />
            <span className="ml-2">Pool</span>
            <FaSwimmingPool />
          </label>
          <label className="border p-2 flex rounded-2-xl gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes("tv")}
              name="tv"
              onChange={handleCbClick}
            />
            <span className="ml-2">TV</span>
            <RiComputerFill />
          </label>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default PropertiesFeatures;
