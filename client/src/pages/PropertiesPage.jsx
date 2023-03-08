import React from "react";
import { Link, useParams } from "react-router-dom";
import NewPropertyForm from "../NewPropertyForm";

const PropertiesPage = () => {
  const {action} = useParams();

  return (
    <div>
      {action !== 'new' && (
             <div className="text-center">
             <Link
               className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-2"
               to={"/account/properties/new"}
             >
               Add new property
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 className="w-6 h-6"
               >
                 <path
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   d="M12 4.5v15m7.5-7.5h-15"
                 />
               </svg>
             </Link>
           </div>
      )}
      {action === 'new' && <NewPropertyForm />}
    </div>
  );
};

export default PropertiesPage;
