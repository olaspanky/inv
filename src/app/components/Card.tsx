import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string | React.ReactNode; // Allow JSX
  icon: any;
  backgroundImage?: string; // Optional background image prop
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  icon, 
  backgroundImage = '/assets/boxes.png' // Default background if none provided
}) => {
  return (
    <div 
      className="bg-white p-5 2xl:p-12   text-[#3D84ED] flex flex-col gap-3 rounded-[20px] bg-contain bg-no-repeat bg-right lg:w-[46%] "  
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    > 
      <div className="flex items-center gap-2">
       
        <h2 className="text-md lg:text-md 2xl:text-2xl  text-[#000A48] font-extrabold">{title}</h2>
      </div>
     
     <div className="  text-[#1D242E] mt-2 lg:mt-5">
  {description}
</div>

    </div>
  );
};

export default Card;