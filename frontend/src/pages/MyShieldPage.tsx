// src/pages/MyShieldPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from 'axios';
import {
  Sun,
  Wind,
  Thermometer,
  Droplets,
  Shield,
  Info,
  BadgeCheck,
  Clock,
  Timer,
  Umbrella,
  AlertTriangle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { log } from "console";

// ---------- Utility functions ----------
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

const getRecommendations = (uv: number, aqi: number): string[] => {
  const recs: string[] = [];

  // UV
  if (uv <= 2) recs.push("Low UV risk. No special protection needed.");
  else if (uv <= 5) recs.push("Moderate UV risk. Wear SPF 30+ sunscreen and stay in shade midday.");
  else if (uv <= 7) recs.push("High UV risk. Wear protective clothing and limit sun exposure 10am–4pm.");
  else recs.push("Extreme UV risk. Avoid going out midday. Use SPF 50+ and full protection gear.");

  // AQI
  if (aqi <= 50) recs.push("Air quality is good. Enjoy outdoor activities.");
  else if (aqi <= 100) recs.push("Air quality acceptable. Reduce prolonged outdoor exertion if sensitive.");
  else if (aqi <= 150) recs.push("Unhealthy for sensitive groups. Limit exertion if you have respiratory issues.");
  else recs.push("Unhealthy air. Everyone should reduce or avoid outdoor activity.");

  recs.push("Stay hydrated throughout the day.");
  return recs;
};

// ---------- Main Component ----------
export default function MyShieldPage() {
  const [uvIndex, setUvIndex] = useState(0);
  const [aqiIndex, setAqiIndex] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [shieldScore, setShieldScore] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [UData, setUserData] = useState(null);



  const userData = {
    name: "Guest User",
    skinType: "Unknown",
    location: "New York, USA",
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/myshield");
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();

    const fetchData = async () => {
      setIsLoading(true);








      // Simulate delay
      await new Promise((r) => setTimeout(r, 1000));

      // Mock environmental data
      const mockUV = Math.floor(Math.random() * 11);
      const mockAQI = Math.floor(Math.random() * 300);
      // const mockTemp = Math.floor(Math.random() * 35) - 5;
      // const mockHumidity = Math.floor(Math.random() * 100);
      const mockScore = Math.floor(Math.random() * 5) + 1;

      setUvIndex(mockUV);
      setAqiIndex(mockAQI);
      // setTemperature(mockTemp);
      // setHumidity(mockHumidity);
      setShieldScore(mockScore);
      setLastUpdated(new Date());

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const uvLevel = getUVLevel(uvIndex);
  const aqiLevel = getAQILevel(aqiIndex);
  const recommendations = getRecommendations(uvIndex, aqiIndex);

  return (
    <div className="container py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">MyShield</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your personal environmental protection dashboard.
        </p>
        {!userData.skinType && (
          <Alert className="max-w-lg mx-auto bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Complete your profile</AlertTitle>
            <AlertDescription>
              For personalized recommendations, please{" "}
              <Link to="/signup" className="underline">
                sign up
              </Link>
              .
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-muted h-64 rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          {/* EcoShield Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your EcoShield Score</CardTitle>
              <CardDescription>
                Based on today's environmental conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-8 border-muted flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold">{shieldScore}/5</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Shield
                      key={i}
                      className={`h-6 w-6 ${i < shieldScore ? "text-blue-500" : "text-muted"
                        }`}
                      fill={i < shieldScore ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex gap-3">
                  <Info className="text-blue-500" />
                  <p>
                    This score reflects how much protection you need today based on UV,
                    AQI, temperature, and humidity.
                  </p>
                </div>
                <div className="flex gap-3">
                  <BadgeCheck className="text-blue-500" />
                  <p>
                    {shieldScore <= 2
                      ? "Low risk: Minimal protection needed."
                      : shieldScore <= 3
                        ? "Moderate risk: Take standard precautions."
                        : shieldScore <= 4
                          ? "High risk: Limit outdoor time and use protection."
                          : "Extreme risk: Avoid outdoor exposure if possible."}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              Last updated: {lastUpdated?.toLocaleTimeString()}
            </CardFooter>
          </Card>

          {/* Environmental Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* UV Index */}
            <EnvironmentalStat
              icon={<Sun className="text-amber-500" />}
              title="UV Index"
              value={uvIndex}
              level={uvLevel.level}
              color={uvLevel.color}
              textColor={uvLevel.textColor}
            />
            {/* AQI */}
            <EnvironmentalStat
              icon={<Wind className="text-blue-500" />}
              title="Air Quality"
              value={aqiIndex}
              level={aqiLevel.level}
              color={aqiLevel.color}
              textColor={aqiLevel.textColor}
            />
            {/* Temperature */}
            <EnvironmentalStat
              icon={<Thermometer className="text-red-500" />}
              title="Temperature"
              value={`${temperature}°C`}
              level={
                temperature < 10 ? "Cool" : temperature < 25 ? "Mild" : "Hot"
              }
              color="bg-red-400"
            />
            {/* Humidity */}
            <EnvironmentalStat
              icon={<Droplets className="text-blue-500" />}
              title="Humidity"
              value={`${humidity}%`}
              level={
                humidity < 30 ? "Dry" : humidity < 60 ? "Comfortable" : "Humid"
              }
              color="bg-blue-400"
            />
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Umbrella className="text-blue-500" />
                <CardTitle>Protection Plan</CardTitle>
              </div>
              <CardDescription>
                Based on conditions in {userData.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Timer className="text-blue-500 mt-1" />
                  <p>{rec}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <span>Profile: {userData.skinType}</span>
              <Button asChild>
                <Link to="/signup">Get Personalized Advice</Link>
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}

// ---------- Stat Card ----------
type StatProps = {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  level: string;
  color: string;
  textColor?: string;
};

function EnvironmentalStat({ icon, title, value, level, color, textColor }: StatProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex gap-2 items-center">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 rounded-full ${color} flex items-center justify-center mb-4`}>
            <span className="text-3xl font-bold text-white">{value}</span>
          </div>
          <span className={`font-semibold text-center ${textColor || ""}`}>{level}</span>
        </div>
      </CardContent>
    </Card>
  );
}
