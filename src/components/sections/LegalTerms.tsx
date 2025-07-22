import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardGradient } from "@/components/ui/card-gradient";

const LegalTerms = () => {
  const [activeTab, setActiveTab] = useState("terms-of-use");

  return (
    <section id="legal" className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 chart-grid opacity-10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">
              Legal Information
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Please review our terms and policies carefully before using our services.
          </p>
        </div>
        
        <CardGradient className="p-0 max-w-4xl mx-auto">
          <Tabs
            defaultValue="terms-of-use"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto p-0 bg-background/50">
              <TabsTrigger 
                value="terms-of-use" 
                className="py-3 rounded-none rounded-t-lg data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Terms of Use
              </TabsTrigger>
              <TabsTrigger 
                value="privacy-policy" 
                className="py-3 rounded-none rounded-t-lg data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Privacy Policy
              </TabsTrigger>
              <TabsTrigger 
                value="service-agreement" 
                className="py-3 rounded-none rounded-t-lg data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Service Agreement
              </TabsTrigger>
              <TabsTrigger 
                value="license-agreement" 
                className="py-3 rounded-none rounded-t-lg data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                License Agreement
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="terms-of-use" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold">Website Terms of Use</h3>
                <p className="text-sm text-muted-foreground">Effective Date: 5/7/2025</p>
                <p className="text-sm text-muted-foreground">Governing Law: State of New Mexico, United States</p>
                
                <p>By accessing and using the Binary Baseline website ("Site"), you agree to comply with and be bound by the following Terms of Use:</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Use of Website</h4>
                    <p>You may use the Site for lawful purposes only. You agree not to use the Site in any way that could harm the service, its users, or its functionality.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Intellectual Property</h4>
                    <p>All content on this Site, including text, graphics, logos, software, and designs, is owned by or licensed to Binary Baseline LLC and protected under U.S. and international copyright laws.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Prohibited Conduct</h4>
                    <p>You may not:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Modify, reverse engineer, or decompile any software associated with this Site.</li>
                      <li>Use the Site for illegal, harmful, or abusive purposes.</li>
                      <li>Attempt to gain unauthorized access to any systems or data.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Third-Party Links</h4>
                    <p>The Site may contain links to external websites. We do not endorse and are not responsible for the content or practices of those sites.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Disclaimer</h4>
                    <p>The Site is provided "as-is" and without warranties of any kind. We make no guarantees regarding uptime, availability, or the results from using our services.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Changes to Terms</h4>
                    <p>We may revise these Terms of Use at any time. Continued use of the Site signifies acceptance of updated terms.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy-policy" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold">Privacy Policy</h3>
                <p>Binary Baseline respects your privacy. This policy explains how we collect, use, and protect your personal information.</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Information We Collect</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Personal details (e.g., name, email)</li>
                      <li>Technical data (e.g., IP address, browser type)</li>
                      <li>Usage data (e.g., pages visited, time on site)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Use of Information</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>To operate and maintain the Site and services</li>
                      <li>To respond to user inquiries and support requests</li>
                      <li>To improve user experience and system performance</li>
                      <li>To send service updates and marketing communications (only with consent)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Cookies</h4>
                    <p>We use cookies and tracking technologies to enhance user experience. You can manage cookie settings through your browser.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Data Sharing</h4>
                    <p>We do not sell your personal information. We may share data with:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Service providers (e.g., hosting, analytics, payment processors)</li>
                      <li>Legal authorities if required by law</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Data Security</h4>
                    <p>We implement industry-standard security practices to protect your data. However, no online system is fully secure.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Your Rights</h4>
                    <p>You may request access, correction, or deletion of your personal data by contacting us at Binarybaseline@gmail.com.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Updates</h4>
                    <p>This Privacy Policy may be updated periodically. Continued use after changes indicates acceptance.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="service-agreement" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold">Terms and Conditions (Service Agreement)</h3>
                <p>These Terms and Conditions govern your use of the Binary Baseline trading automation software and related services.</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Eligibility</h4>
                    <p>You must be 18 years or older to use our services.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Account Responsibilities</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                      <li>You agree to provide accurate, current, and complete information.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Subscription & Payment</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Subscription fees are billed according to your selected plan.</li>
                      <li>All payments are processed via Stripe or another secure provider.</li>
                      <li>No refunds are issued unless otherwise stated in writing.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Trading Disclaimer</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Binary options trading involves risk. Past performance is not indicative of future results.</li>
                      <li>Binary Baseline does not offer financial or investment advice.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Termination</h4>
                    <p>We reserve the right to suspend or terminate accounts for any reason, including breach of these Terms.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Limitation of Liability</h4>
                    <p>Binary Baseline LLC is not liable for any damages resulting from the use or inability to use the service, including lost profits or trading losses.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="license-agreement" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold">Software License Agreement</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Grant of License</h4>
                    <p>We grant you a limited, non-transferable, revocable license to use the Binary Baseline software for your personal or business use.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Restrictions</h4>
                    <p>You may not:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Copy, distribute, or resell the software</li>
                      <li>Reverse engineer or modify any part of the code</li>
                      <li>Use the software for unlawful or unethical trading</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Ownership</h4>
                    <p>Binary Baseline retains all rights, title, and interest in the software and its underlying code.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Termination</h4>
                    <p>The license terminates automatically upon breach of any provision in this agreement.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">No Warranty</h4>
                    <p>The software is provided "as-is" with no guarantees of performance or results.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Liability Limitation</h4>
                    <p>Under no circumstances shall Binary Baseline LLC be liable for any loss or damages arising from the use of the software.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Contact Information</h4>
                    <p>Binary Baseline LLC</p>
                    <p>734 NM 170, Farmington, NM 87401</p>
                    <p>Email: Binarybaseline@gmail.com</p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardGradient>
      </div>
    </section>
  );
};

export default LegalTerms;