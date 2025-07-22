import { useState } from "react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { CardGradient } from "@/components/ui/card-gradient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, ThumbsUp, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Feedback() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "suggestion",
    rating: 0,
    message: ""
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your server
    console.log("Feedback form submitted:", formData);
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    });
    
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      feedbackType: "suggestion",
      rating: 0,
      message: ""
    });
  };

  const feedbackTypes = [
    { value: "suggestion", label: "Suggestion" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "experience", label: "User Experience" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <MessageSquare className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Feedback</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            We value your input! Please share your thoughts, suggestions, or report any issues you've encountered while using Binary Baseline. Your feedback helps us improve the platform.
          </p>
          
          <CardGradient className="p-6">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Feedback Received!</h3>
                <p className="text-gray-300 mb-4">
                  Thank you for taking the time to provide feedback. We'll use your input to make Binary Baseline even better.
                </p>
                <Button onClick={() => setFormSubmitted(false)}>
                  Submit Another Response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name (Optional)
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email (Optional)
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="feedbackType" className="block text-sm font-medium mb-1">
                    Feedback Type
                  </label>
                  <select
                    id="feedbackType"
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm"
                    required
                  >
                    {feedbackTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-background text-gray-300">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rate Your Experience
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingClick(rating)}
                        className={`rounded-full p-2 transition-colors ${
                          formData.rating >= rating
                            ? "bg-primary text-background"
                            : "bg-secondary text-gray-400"
                        }`}
                        aria-label={`Rate ${rating} stars`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-400">
                      {formData.rating > 0 ? `${formData.rating}/5` : "Select a rating"}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Feedback
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please share your thoughts, suggestions, or issues..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  Submit Feedback
                </Button>
              </form>
            )}
          </CardGradient>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              We review all feedback carefully to improve Binary Baseline.
              <br />
              For urgent issues, please contact us directly via the <a href="/support" className="text-primary hover:underline">Support page</a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}