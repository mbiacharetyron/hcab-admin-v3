import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AdminLayout = ({ children, className }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={cn(
        "lg:ml-64 transition-all duration-300",
        "pt-16 lg:pt-0", // Account for mobile header
        className
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};