import { ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import { Shield } from "lucide-react";
import { Link } from "wouter";
import Footer from "./Footer";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AdminHeader />
      
      <main className="flex-grow pt-20 pb-16">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;