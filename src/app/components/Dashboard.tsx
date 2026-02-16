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

interface User {
  name: string;
  email?: string;
  id?: string;
  // Add other fields as per API response
}

const Dashboard: React.FC = () => {

  const cardData = [
    { 
      title: "Disease Burden", 
      icon: i2, 
      description: "This dashboard presents analytics that display trends in diseases diagnosed across different physician specialties. This provides insight into patient distribution among specialists and enables targeted engagement of physicians for specific diseases of interest.",
      backgroundImage: "/assets/boxes.png" // First background
    },
    { 
    title: "HCP Treatment Mapping", 
    icon: i3, 
    description: (
      <>
       This dashboard presents analytics with insight into physicians’ treatment preferences for each diagnosed and treated disease, as well as across disease categories. <em>All prescribed drugs are mapped and standardized using the WHO Anatomical Therapeutic Chemical (ATC) classification system, covering Levels 1–5 in line with global best practices.</em>
      </>
    ),
    backgroundImage: "/assets/background2.png"
  },
    { 
      title: "Prescription Analytics", 
      icon: i4, 
      description: "This dashboard presents analytics with deeper insights into prescription patterns for individual diseases and disease categories, including how physicians prescribe using branded versus generic names and the share of each for every disease.",
      backgroundImage: "/assets/yell.png" // Third background
    },
    { 
      title: "Diagnostics", 
      icon: i5, 
      description: "This dashboard presents analytics on clinical diagnostic test requests derived from anonymized real-world data, providing a broad and unprecedented view of testing patterns across Nigeria, Africa’s most populous country. Individual data is processed solely for analytical purposes while preserving its real-world clinical context.",
      backgroundImage: "/assets/bla.png" // Fourth background
    },
    { 
      title: "Cost of Care Analytics", 
      icon: i6, 
      description: "This dashboard presents trends in diseases managed across different physician specialties and their associated treatment costs. This provides insight into patient distribution among specialists, cost drivers across disease areas, and supports targeted engagement and resource planning for specific diseases of interest.",
      backgroundImage: "/assets/boxes.png" // Fifth background
    }
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
    <div className="flex-1 bg-gray-100 min-h-screen flex flex-col pb-12 gap-12">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-20">
        {cardData.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            description={card.description} 
            icon={card.icon}
            backgroundImage={card.backgroundImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;