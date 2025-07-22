import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Loader2, AlertCircle, CheckCircle, Download, TrendingUp, Settings } from "lucide-react";
import { Link } from "wouter";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { User } from "@shared/schema";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const typedUser = user as User | undefined;

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <div className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CardGradient className="p-8">
              <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
              <p className="mb-6">You need to be logged in to access your dashboard.</p>
              <Button asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            </CardGradient>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Welcome to Binary Baseline</span>
            </h1>
            <p className="text-gray-300">
              Your complete trading dashboard for binary options strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <CardGradient className="p-6">
              <div className="flex items-center mb-4">
                <Download className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Download Software</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Get the latest version of Binary Baseline trading software
              </p>
              <Button className="w-full" asChild>
                <Link href="/download">Download Now</Link>
              </Button>
            </CardGradient>

            <CardGradient className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Trading Strategies</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Explore our comprehensive library of trading indicators
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/strategies-library">View Strategies</Link>
              </Button>
            </CardGradient>

            <CardGradient className="p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Admin Tools</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Access administrative features and user management
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/admin">Admin Dashboard</Link>
              </Button>
            </CardGradient>
          </div>

          {/* User Info Section */}
          <CardGradient className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Account Status</span>
                  <div className="flex items-center space-x-1 text-green-500">
                    <CheckCircle size={16} />
                    <span>Active</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">User ID</span>
                  <span className="font-mono text-sm">{typedUser?.id || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email</span>
                  <span>{typedUser?.email || 'N/A'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>{typedUser?.createdAt ? new Date(typedUser.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Admin Status</span>
                  <span className={typedUser?.isAdmin ? 'text-primary' : 'text-gray-400'}>
                    {typedUser?.isAdmin ? 'Administrator' : 'Standard User'}
                  </span>
                </div>
              </div>
            </div>
          </CardGradient>

          {/* Recent Activity */}
          <CardGradient className="p-6">
            <h2 className="text-xl font-bold mb-4">Getting Started</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Quick Setup</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Download and install Binary Baseline software
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Browse available trading strategies
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Configure your preferred indicators
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Start automated trading
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Support Resources</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="/documentation">
                      📚 Documentation
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="mailto:support@binary-baseline.com">
                      📧 Contact Support
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="/strategies-library">
                      🎯 Strategy Library
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardGradient>
        </div>
      </div>
      <Footer />
    </div>
  );
}