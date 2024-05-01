import React from "react";
import { Button } from "@/components/ui/button"


const Navbar = () => {
  return <div>
    <nav className="bg-white-800 p-4 border-2 border-slate-300 flex justify-between items-center">
      <div className="flex-shrink-0">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjqiVMSOfnA6XA2eRaWctM8n-kl-JxHKjhMw&s" alt="Logo" className="h-8" />
      </div>
      <div className="ml-auto">
      <Button variant="default">Sign in</Button>
      </div>
    </nav>
  </div>;
};

export default Navbar;
