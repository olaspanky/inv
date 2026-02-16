import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import Image from "next/image";
interface CardProps {
  title: string;
  description: string;
  icon: any; // Adjust the type of `icon` if you know its specific type
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
       <div className=" bg-white p-5 2xl:p-12 pr-7 2xl:pr-20 text-[#3D84ED] rounded-[20px] bg-contain bg-no-repeat bg-right"  style={{
                backgroundImage: `url('/assets/boxes.png')`,
            }}> 
            <div className="flex items-center  gap-2 ">
              <Image
                src={icon} alt=""   />
            <h2 className="text-lg lg:text-xl font-semibold ">{title}</h2>

            </div>
     
      <p className="text-lg lg:text-xl leading-6 2xl:leading-9 text-black">{description}</p>
    </div>
  );
};

export default Card;