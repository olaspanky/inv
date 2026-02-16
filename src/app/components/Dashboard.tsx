"use client"; // Ensure this is a client componentimport React, { useEffect, useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import Card from "./Card";  
import i1 from "../../../public/assets/i1.svg";
import i2 from "../../../public/assets/d1.svg";
import i3 from "../../../public/assets/d2.svg";
import i4 from "../../../public/assets/d3.svg";
import i5 from "../../../public/assets/d4.svg";
import i6 from "../../../public/assets/d5.svg";
import { useState, useEffect } from "react";

interface User {
  name: string;
  email?: string;
  id?: string;
  // Add other fields as per API response
}
const Dashboard: React.FC = () => {

    const cardData = [
        { title: "Disease Burden", icon: i2, description: "The disease burden analytics charts reports trend of diseases diagnosed by different physician specialities. This offers insight on flow of patients diagnosed by specialists and supports targeting of physicians for specific diseases of interest" },
        { title: "HCP Treatment Mapping", icon: i3, description: "This analytics provides insight into doctors’ treatment preference for each disease diagnosed and treated and across diseases categories. All drugs prescribed are mapped to and standardized using global best practice of the WHO Anatomical Therapeutic Chemical (ATC) classification system, from levels 1 to 5" },
        { title: "Prescription Analytics", icon: i4, description: "This analytics provides more specific insight into pattern of prescription for individual diseases or disease categories, with deeper insight into how doctors prescribe in branded or generic names and share of these for every disease. " },
        { title: "Diagnostics", icon: i5, description: "This dashboard presents analytics of clinical diagnostic test requests from anonymized real world data, providing a wide, unprecedented view of diagnostic test requests across Nigeria, Africa’s most populous country. Individual data is processed only for purpose of analysis while maintaining form as gathered in real practice." },
        { title: "Cost of Care Analytics", icon: i6, description: "The disease prevalence analytics charts reports trend of diseases diagnosed by different physician specialities. This offers insight on flow of patients diagnosed by specialists and supports targeting of physicians for specific diseases of interest" }
      ];

        const [user, setUser] = useState<User | null>(null);
      
        useEffect(() => {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              // Verify that parsedUser matches the User interface
              if (parsedUser && typeof parsedUser.name === 'string') {
                setUser(parsedUser);
              }
            } catch (error) {
              console.error('Error parsing user from localStorage:', error);
            }
          }
        }, []);


  return (
    <div className="flex-1  bg-gray-100 min-h-screen flex flex-col pb-12 gap-12">
     


 

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-20">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} icon={card.icon} />
        ))}
      </div>



    </div>
  );
};

export default Dashboard;