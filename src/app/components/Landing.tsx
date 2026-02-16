"use client"; // Ensure this is a client component

import React, { useEffect, useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import Card from "./Card";  
import i1 from "../../../public/assets/i1.svg";
import i2 from "../../../public/assets/d1.svg";
import i3 from "../../../public/assets/d2.svg";
import i4 from "../../../public/assets/d3.svg";
import i5 from "../../../public/assets/d4.svg";
import i6 from "../../../public/assets/d5.svg";

// Define User interface
interface User {
  name: string;
  email?: string;
  id?: string;
  // Add other fields as per API response
}

const Dashboard: React.FC = () => {
  // Type the user state to allow null or User
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

  const cardData = [
    {
      title: "INVISIO Hospital Claims",
      icon: i2,
      description:
        "The disease burden analytics charts reports trend of diseases diagnosed by different physician specialities. This offers insight on flow of patients diagnosed by specialists and supports targeting of physicians for specific diseases of interest",
    },
    {
      title: "INVISIO Hospital Direct",
      icon: i3,
      description:
        "This analytics provides insight into doctors’ treatment preference for each disease diagnosed and treated and across diseases categories. All drugs prescribed are mapped to and standardized using global best practice of the WHO Anatomical Therapeutic Chemical (ATC) classification system, from levels 1 to 5",
    },
  ];

  return (
    <div className="flex-1 bg-gray-100 min-h-screen flex flex-col pb-12 gap-12">
      <section className="flex flex-col gap-5 2xl:gap-12">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        </div>
      
      </section>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-20">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;