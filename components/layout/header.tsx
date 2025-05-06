import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = ({ showLogin }: { showLogin?: boolean }) => {
  return (
    <header className="border-b bg-[#003A70] text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center">
            <div className="h-12 w-12 bg-[#003A70] rounded-full flex items-center justify-center text-white font-bold text-xs">
              NAGRIK
            </div>
          </div>
          <div>
            <div className="text-xs">City Government</div>
            <div className="font-bold text-lg">
              Infrastructure Monitoring System
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showLogin && (
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white bg-inherit hover:bg-[#004d94] hover:text-white"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
