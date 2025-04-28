
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Earth, Shield, Thermometer, Users } from "lucide-react";

export default function HomePage() {
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("Detecting location...");

  // Simulate fetching UV index based on location
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulated UV index for demo
      setUvIndex(Math.floor(Math.random() * 11));
      setLocation("New York, USA"); // Replace with real geolocation later
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getUVClass = (index: number | null) => {
    if (index === null) return "bg-gray-200";
    if (index <= 2) return "bg-green-500"; // Low
    if (index <= 5) return "bg-yellow-500"; // Moderate
    if (index <= 7) return "bg-orange-500"; // High
    if (index <= 10) return "bg-red-500"; // Very High
    return "bg-purple-600"; // Extreme
  };

  const getUVText = (index: number | null) => {
    if (index === null) return "Loading...";
    if (index <= 2) return "Low";
    if (index <= 5) return "Moderate";
    if (index <= 7) return "High";
    if (index <= 10) return "Very High";
    return "Extreme";
  };

  const featureCards = [
    {
      title: "Educational Resources",
      description: "Learn about ozone depletion and UV radiation through our comprehensive guides.",
      icon: Earth,
    },
    {
      title: "Personalized Protection",
      description: "Get recommendations tailored to your skin type and daily routine.",
      icon: Shield,
    },
    {
      title: "Environmental Monitoring",
      description: "Track UV index, air quality, and more in your local environment.",
      icon: Thermometer,
    },
    {
      title: "Community Actions",
      description: "Join our community efforts to promote environmental protection.",
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ecoshield-sky-blue/10 to-background" />
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6 animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Protect Yourself, <br />
                <span className="text-ecoshield-sky-blue">Protect Earth</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                EcoShield empowers you with knowledge and tools to safeguard yourself 
                from UV radiation while promoting environmental awareness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/chronicle">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72 animate-float">
                <div className="absolute inset-0 rounded-full bg-ecoshield-sky-blue/20 animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-ecoshield-sky-blue/30" />
                <div className="absolute inset-8 rounded-full bg-ecoshield-sky-blue/50 flex items-center justify-center">
                  <Shield className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UV Index Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Current UV Index</h2>
            <p className="text-muted-foreground max-w-2xl">
              Check the current UV index in your area to better prepare and protect yourself.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>UV Index for {location}</CardTitle>
                <CardDescription>Updated just now</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {uvIndex !== null ? (
                  <>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${getUVClass(uvIndex)}`}>
                      <span className="text-4xl font-bold text-white">{uvIndex}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{getUVText(uvIndex)}</h3>
                    <p className="text-muted-foreground mt-2 text-center">
                      {uvIndex <= 2 
                        ? "Low risk of harm from UV rays." 
                        : uvIndex <= 5 
                        ? "Moderate risk. Wear sunscreen and protective clothing." 
                        : "High risk! Take extra precautions."}
                    </p>
                  </>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse flex items-center justify-center mb-6">
                    <span className="text-lg text-gray-400">Loading...</span>
                  </div>
                )}
                
                <Button className="mt-6" asChild>
                  <Link to="/my-shield">View Detailed Protection Advice</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How EcoShield Helps You</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform provides comprehensive tools and resources to keep you informed and protected.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((feature, index) => (
              <Card key={index} className="eco-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-ecoshield-sky-blue/20 flex items-center justify-center mb-4">
                    <feature.icon className="text-ecoshield-sky-blue h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ecoshield-sky-blue text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Protection Journey?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join our community today and get personalized recommendations to protect yourself and contribute to environmental awareness.
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-ecoshield-deep-green hover:bg-ecoshield-deep-green/90">
            <Link to="/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
