
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Earth, Shield, Thermometer, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("Detecting location...");
  const [showPulse, setShowPulse] = useState(true);

  // Simulate fetching UV index based on location
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulated UV index for demo
      setUvIndex(Math.floor(Math.random() * 11));
      setLocation("New York, USA");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Pulse animation effect
  useEffect(() => {
    if (uvIndex !== null) {
      const interval = setInterval(() => {
        setShowPulse(prev => !prev);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [uvIndex]);

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
    <div className="container py-12">
      <motion.div 
        className="space-y-4 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold">Protect Yourself, Protect Earth</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          EcoShield empowers you with knowledge and tools to safeguard yourself 
          from UV radiation while promoting environmental awareness.
        </p>
      </motion.div>

      {/* UV Index Section */}
      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Current UV Index</h2>
          <p className="text-muted-foreground max-w-2xl">
            Check the current UV index in your area to better prepare and protect yourself.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle>UV Index for {location}</CardTitle>
                <CardDescription>Updated just now</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {uvIndex !== null ? (
                  <>
                    <motion.div 
                      className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${getUVClass(uvIndex)}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <motion.span 
                        className="text-4xl font-bold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {uvIndex}
                      </motion.span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold">{getUVText(uvIndex)}</h3>
                      <p className="text-muted-foreground mt-2 text-center">
                        {uvIndex <= 2 
                          ? "Low risk of harm from UV rays." 
                          : uvIndex <= 5 
                          ? "Moderate risk. Wear sunscreen and protective clothing." 
                          : "High risk! Take extra precautions."}
                      </p>
                    </motion.div>
                  </>
                ) : (
                  <motion.div 
                    className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-6"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      scale: [0.98, 1, 0.98]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 1.5
                    }}
                  >
                    <span className="text-lg text-gray-400">Loading...</span>
                  </motion.div>
                )}
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full"
                >
                  <Button className="w-full" asChild>
                    <Link to="/my-shield">View Detailed Protection Advice</Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How EcoShield Helps You</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our platform provides comprehensive tools and resources to keep you informed and protected.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCards.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <Card className="h-full">
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
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="rounded-lg bg-ecoshield-sky-blue text-white p-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Protection Journey?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join our community today and get personalized recommendations to protect yourself and contribute to environmental awareness.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="secondary" asChild className="bg-ecoshield-deep-green hover:bg-ecoshield-deep-green/90">
              <Link to="/signup">Create Your Account</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
