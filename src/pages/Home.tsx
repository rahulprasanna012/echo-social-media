import MainContent from "@/components/home/MainContent";
import Navbar from "@/components/home/Navbar";
import Sidebar from "@/components/home/Sidebar";
import MainLayout from "@/layout/MainLayout";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((v) => !v);
  const handleClose = () => setIsOpen(false);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <MainLayout
      isOpen={isOpen}
      handleClose={handleClose}
      navbar={<Navbar handleClick={handleClick} />}
      sidebar={<Sidebar />}
      main={<MainContent />}
    />
  );
};

export default Home;
