
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Droplets, 
  Info, 
  Shield, 
  Sun, 
  Thermometer, 
  Timer, 
  Umbrella, 
  Wind 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { BadgeCheck, Clock } from "lucide-react";

export default function MyShieldPage() {
  const [uvIndex, setUvIndex] = useState<number>(0);
  const [aqiIndex, setAqiIndex] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [shieldScore, setShieldScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock user data
  const userData = {
    name: "Guest User",
    skinType: "Unknown",
    location: "New York, USA",
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Generate random data for demo purposes
      setUvIndex(Math.floor(Math.random() * 11));
      setAqiIndex(Math.floor(Math.random() * 300));
      setTemperature(Math.floor(Math.random() * 35) - 5);
      setHumidity(Math.floor(Math.random() * 100));
      setLastUpdated(new Date());
      
      // Calculate shield score based on conditions
      const score = Math.floor(Math.random() * 5) + 1;
      setShieldScore(score);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getUVLevel = (index: number) => {
    if (index <= 2) return { level: "Low", color: "bg-green-500", textColor: "text-green-600" };
    if (index <= 5) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-600" };
    if (index <= 7) return { level: "High", color: "bg-orange-500", textColor: "text-orange-600" };
    if (index <= 10) return { level: "Very High", color: "bg-red-500", textColor: "text-red-600" };
    return { level: "Extreme", color: "bg-purple-600", textColor: "text-purple-600" };
  };

  const getAQILevel = (index: number) => {
    if (index <= 50) return { level: "Good", color: "bg-green-500", textColor: "text-green-600" };
    if (index <= 100) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-600" };
    if (index <= 150) return { level: "Unhealthy for Sensitive Groups", color: "bg-orange-500", textColor: "text-orange-600" };
    if (index <= 200) return { level: "Unhealthy", color: "bg-red-500", textColor: "text-red-600" };
    if (index <= 300) return { level: "Very Unhealthy", color: "bg-purple-600", textColor: "text-purple-600" };
    return { level: "Hazardous", color: "bg-rose-800", textColor: "text-rose-800" };
  };

  const getRecommendations = (uvIndex: number, aqiIndex: number) => {
    const recommendations = [];
    
    // UV recommendations
    if (uvIndex <= 2) {
      recommendations.push("Low UV risk. No special protection needed unless you're outside for extended periods.");
    } else if (uvIndex <= 5) {
      recommendations.push("Moderate UV risk. Stay in shade during midday hours. Wear sun-protective clothing and SPF 30+ sunscreen.");
    } else if (uvIndex <= 7) {
      recommendations.push("High UV risk! Minimize sun exposure between 10am and 4pm. Wear protective clothing, wide-brimmed hat, and SPF 30+ sunscreen.");
    } else {
      recommendations.push("Extreme UV risk! Avoid sun exposure during midday hours. Wear protective clothing, sunglasses, and apply SPF 50+ sunscreen every 2 hours.");
    }
    
    // AQI recommendations
    if (aqiIndex <= 50) {
      recommendations.push("Air quality is good. Enjoy outdoor activities.");
    } else if (aqiIndex <= 100) {
      recommendations.push("Air quality is acceptable. Consider reducing prolonged outdoor exertion if you're sensitive to pollution.");
    } else if (aqiIndex <= 150) {
      recommendations.push("Unhealthy for sensitive groups. People with respiratory or heart conditions should limit outdoor exertion.");
    } else {
      recommendations.push("Unhealthy air quality. Everyone should reduce or avoid outdoor activities. Consider wearing an N95 mask outdoors.");
    }
    
    // General recommendations
    recommendations.push("Stay hydrated, regardless of conditions. Dehydration can make you more vulnerable to environmental harms.");
    
    return recommendations;
  };

  const uvLevel = getUVLevel(uvIndex);
  const aqiLevel = getAQILevel(aqiIndex);
  
  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold">MyShield</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Your personal environmental protection dashboard. Monitor conditions and get personalized recommendations.
        </p>
        {!userData.skinType && (
          <Alert className="max-w-lg mx-auto mt-6 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Complete your profile</AlertTitle>
            <AlertDescription>
              For personalized protection recommendations, please{" "}
              <Link to="/signup" className="font-medium underline underline-offset-4">
                sign up
              </Link>{" "}
              and complete your profile.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-muted h-64 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          {/* Shield Score */}
          <div className="mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Your EcoShield Score</CardTitle>
                <CardDescription>
                  Based on current environmental conditions and your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 w-full md:w-auto flex flex-col items-center">
                    <div className="flex items-center justify-center w-40 h-40 rounded-full border-8 border-muted mb-4">
                      <span className="text-5xl font-bold">{shieldScore}/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Shield 
                          key={i} 
                          className={`h-6 w-6 ${i < shieldScore ? "text-ecoshield-sky-blue" : "text-muted"}`} 
                          fill={i < shieldScore ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-start gap-4">
                      <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full flex-shrink-0">
                        <Info className="h-5 w-5 text-ecoshield-sky-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">What this means</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Your EcoShield score represents the level of environmental protection you need today.
                          A higher score means you need to take more precautions to protect yourself.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full flex-shrink-0">
                        <BadgeCheck className="h-5 w-5 text-ecoshield-sky-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Today's recommendation</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {shieldScore <= 2 
                            ? "Low risk day! Basic protection should be sufficient for most activities." 
                            : shieldScore <= 3 
                            ? "Moderate risk day. Take standard precautions when outdoors."
                            : shieldScore <= 4
                            ? "High risk day! Carefully follow all protection recommendations."
                            : "Extreme risk day! Consider limiting outdoor activities and take maximum precautions."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/40 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Environmental Data */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Current Environmental Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* UV Index */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-amber-500" />
                    <CardTitle>UV Index</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full ${uvLevel.color} flex items-center justify-center mb-4`}>
                      <span className="text-3xl font-bold text-white">{uvIndex}</span>
                    </div>
                    <span className={`font-semibold ${uvLevel.textColor}`}>{uvLevel.level}</span>
                  </div>
                </CardContent>
              </Card>

              {/* AQI */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-blue-500" />
                    <CardTitle>Air Quality</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full ${aqiLevel.color} flex items-center justify-center mb-4`}>
                      <span className="text-3xl font-bold text-white">{aqiIndex}</span>
                    </div>
                    <span className={`font-semibold ${aqiLevel.textColor} text-center text-sm`}>{aqiLevel.level}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Temperature */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <CardTitle>Temperature</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">{temperature}°C</span>
                    </div>
                    <span className="font-semibold">
                      {temperature < 10 ? "Cool" : temperature < 25 ? "Mild" : "Hot"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Humidity */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <CardTitle>Humidity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">{humidity}%</span>
                    </div>
                    <span className="font-semibold">
                      {humidity < 30 ? "Dry" : humidity < 60 ? "Comfortable" : "Humid"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Protection Recommendations */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Your Protection Plan</h2>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Umbrella className="h-5 w-5 text-ecoshield-sky-blue" />
                  <CardTitle>Personalized Recommendations</CardTitle>
                </div>
                <CardDescription>
                  Based on current conditions in {userData.location} and your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getRecommendations(uvIndex, aqiIndex).map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full flex-shrink-0 mt-1">
                        <Timer className="h-4 w-4 text-ecoshield-sky-blue" />
                      </div>
                      <p>{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span>Protection profile: {userData.skinType || "Generic recommendations (create an account for personalized advice)"}</span>
                </div>
                <Button asChild>
                  <Link to="/signup">Get Personalized Advice</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
