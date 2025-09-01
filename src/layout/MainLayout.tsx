import React, { type FC } from "react";

type NavbarProps = { handleClick: () => void };

type MainLayoutProps = {
  isOpen: boolean;
  handleClose: () => void;

  navbar: React.ReactElement<NavbarProps>;
  sidebar: React.ReactElement;
  main: React.ReactElement;
};

const MainLayout: FC<MainLayoutProps> = ({
  isOpen,
  handleClose,
  navbar,
  sidebar,
  main,
}) => {
  return (
    <div className="relative md:h-screen flex flex-col bg-linear-to-r from-purple-50 to-indigo-50">
      {/* Top nav (mobile + desktop) */}
      {navbar}

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-72 md:flex-shrink-0 border-r bg-white">
          {sidebar}
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <button
              aria-label="Close menu"
              onClick={handleClose}               
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px] md:hidden"
            />
            {/* Drawer panel */}
            <div
              role="dialog"
              aria-modal="true"
               className={`
    fixed inset-y-0 left-0 z-40 w-72 bg-white border-r shadow-xl md:hidden
    transform transition-transform duration-700 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
            >
              {sidebar}
            </div>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 h-full overflow-y-auto">{main}</main>
      </div>
    </div>
  );
};

export default MainLayout;
