
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Earth, Shield, Thermometer, Users } from "lucide-react";
import { motion } from "framer-motion";

// Animations
const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60
    }
  }
};

export default function HomePage() {
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("Detecting location...");
  const [showPulse, setShowPulse] = useState(true);

  // Simulate fetching UV index based on location
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulated UV index for demo
      setUvIndex(Math.floor(Math.random() * 11));
      setLocation("New Delhi, India");
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 md:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ecoshield-sky-blue/10 to-background" />
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="flex flex-col space-y-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Protect Yourself, <br />
                <span className="text-ecoshield-sky-blue">Protect Earth</span>
              </h1>
              <p className="text-lg text-muted-foreground">
              EcoShield protects you from harmful UV rays and the scorching heat of the sun, while also helping to preserve the Earth and support a healthier society.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/chronicle">Learn More</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                type: "spring",
                stiffness: 50
              }}
            >
              <div className="relative w-72 h-72">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-ecoshield-sky-blue/20"
                  animate={{ 
                    scale: showPulse ? 1.1 : 1,
                    opacity: showPulse ? 0.7 : 0.2
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute inset-4 rounded-full bg-ecoshield-sky-blue/30" />
                <motion.div 
                  className="absolute inset-8 rounded-full bg-ecoshield-sky-blue/50 flex items-center justify-center"
                  animate={{ 
                    rotate: 360 
                  }}
                  transition={{ 
                    duration: 20,
                    ease: "linear", 
                    repeat: Infinity
                  }}
                >
                  <Shield className="w-20 h-20 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* UV Index Section */}
      <motion.section 
        className="py-12 bg-muted/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container">
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
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16"
        variants={containerAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            variants={itemAnimation}
          >
            <h2 className="text-3xl font-bold">How EcoShield Helps You</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform provides comprehensive tools and resources to keep you informed and protected.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemAnimation}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="eco-card h-full">
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
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-ecoshield-sky-blue text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container text-center">
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
