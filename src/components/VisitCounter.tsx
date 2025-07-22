import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";

interface VisitCounterProps {
  path?: string;  // Optional path to track, defaults to current path
  threshold?: number; // Optional custom threshold override
}

export const VisitCounter: React.FC<VisitCounterProps> = ({ 
  path = window.location.pathname,
  threshold 
}) => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Record the visit
    const recordVisit = async () => {
      try {
        await apiRequest("POST", "/api/visits", { path });
      } catch (error) {
        console.error("Error recording visit:", error);
      }
    };

    // Get the visit count
    const getVisitCount = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest("GET", `/api/visits?path=${path}`);
        const data = await response.json();
        
        setVisitCount(data.count);
        setShouldDisplay(data.shouldDisplay);
        
        // If a custom threshold was provided, update it in the database
        if (threshold && threshold !== data.displayThreshold) {
          await apiRequest("POST", "/api/visits/threshold", { 
            path, 
            threshold 
          });
        }
      } catch (error) {
        console.error("Error getting visit count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    recordVisit();
    getVisitCount();
  }, [path, threshold]);

  // Don't display anything while loading or if visit count is below threshold
  if (isLoading || !shouldDisplay || visitCount === null) {
    return null;
  }

  return (
    <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
      <span className="mr-1">👥</span>
      {visitCount.toLocaleString()} visits
    </Badge>
  );
};

export default VisitCounter;