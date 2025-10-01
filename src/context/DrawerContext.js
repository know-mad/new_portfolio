import React, { createContext, useState, useContext } from "react";

const DrawerContext = createContext();

export function DrawerProvider({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [scrollingProgrammatically, setScrollingProgrammatically] =
    useState(false);
  const [activeLink, setActiveLink] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const scrollToSection = (sectionId, id) => {
    setIsScrolling(true)
    setScrollingProgrammatically(true)
    const element = document.getElementById(sectionId);
    if (element) {      
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
       // Delay the active link update to prevent jumping
       setTimeout(() => {
        if (id) {
          setActiveLink(id);
        }
      }, 600); // Small delay to let scroll settle
    }

    setTimeout(() => {
      setScrollingProgrammatically(false)
      setIsScrolling(false)
    }, 650) // Adjust timeout to match animation speed
  };

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        scrollToSection,
        scrollingProgrammatically,
        setActiveLink,
        activeLink,
        isScrolling
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  return useContext(DrawerContext);
}
