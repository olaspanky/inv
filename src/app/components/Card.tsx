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
      className="bg-white p-5 2xl:p-12 pr-7 2xl:pr-20 text-[#3D84ED] flex flex-col gap-3 rounded-[20px] bg-contain bg-no-repeat bg-right"  
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    > 
      <div className="flex items-center gap-2">
       
        <h2 className="text-md lg:text-md 2xl:text-2xl  text-[#000A48] font-bold">{title}</h2>
      </div>
     
      <p className="text-md lg:text-sm 2xl:text-xl leading-tight text-black">
        {description}
      </p>
    </div>
  );
};

export default Card;