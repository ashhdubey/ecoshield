import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bell, CheckCircle, FileText, Globe, HandHeart, Info, Leaf, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RegenEarthPage() {
  const [joinedMissions, setJoinedMissions] = useState<number[]>([]);

  const handleJoinMission = (missionId: number) => {
    if (joinedMissions.includes(missionId)) {
      setJoinedMissions(joinedMissions.filter(id => id !== missionId));
    } else {
      setJoinedMissions([...joinedMissions, missionId]);
    }
  };

  const preventionTips = [
    {
      title: "Reduce CFC Usage",
      description: "Choose appliances that don't use CFCs. Check labels on aerosols and avoid products containing harmful chemicals.",
      icon: <CheckCircle className="h-5 w-5 text-ecoshield-deep-green" />,
    },
    {
      title: "Energy Conservation",
      description: "Use energy-efficient appliances and reduce electricity consumption to lower carbon footprint.",
      icon: <CheckCircle className="h-5 w-5 text-ecoshield-deep-green" />,
    },
    {
      title: "Sustainable Transportation",
      description: "Use public transport, carpool, or switch to electric vehicles to reduce emissions.",
      icon: <CheckCircle className="h-5 w-5 text-ecoshield-deep-green" />,
    },
    {
      title: "Proper Waste Disposal",
      description: "Dispose of old refrigerators, ACs, and aerosols through appropriate recycling programs.",
      icon: <CheckCircle className="h-5 w-5 text-ecoshield-deep-green" />,
    },
    {
      title: "Support Eco-Friendly Companies",
      description: "Choose products from companies committed to environmental protection.",
      icon: <CheckCircle className="h-5 w-5 text-ecoshield-deep-green" />,
    },
    {
      title: "Plant Trees",
      description: "Trees absorb CO2 and help reduce the overall greenhouse effect.",
      icon: <CheckCircle className="h-5 w-5 text-ecoshield-deep-green" />,
    },
  ];

  const ecoMissions = [
    {
      id: 1,
      title: "Community Cleanup",
      description: "Join or organize a cleanup event in your local community to remove waste and reduce pollution.",
      difficulty: "Easy",
      impact: "Medium",
      participants: 1243,
      progress: 68,
    },
    {
      id: 2,
      title: "Tree Planting Campaign",
      description: "Participate in or initiate a tree planting event to increase oxygen production and carbon absorption.",
      difficulty: "Medium",
      impact: "High",
      participants: 867,
      progress: 45,
    },
    {
      id: 3,
      title: "Zero Waste Challenge",
      description: "Reduce your household waste to almost zero for one month by minimizing packaging and recycling properly.",
      difficulty: "Hard",
      impact: "Medium",
      participants: 562,
      progress: 32,
    },
    {
      id: 4,
      title: "Eco-Friendly Transportation",
      description: "Use only sustainable transportation methods (walking, cycling, public transport) for one week.",
      difficulty: "Medium",
      impact: "Medium",
      participants: 1598,
      progress: 89,
    },
  ];

  const monthlyReports = [
    {
      month: "April 2025",
      highlights: [
        "Global ozone layer thickness improved by 0.5% compared to last year",
        "CFC emissions reduced by 12% worldwide",
        "23 countries strengthened environmental legislation",
      ],
      challengeAreas: [
        "Illegal CFC production detected in certain regions",
        "UV radiation levels increased in equatorial areas",
      ],
    },
    {
      month: "March 2025",
      highlights: [
        "Antarctic ozone hole showed signs of recovery with 7% size reduction",
        "Public awareness campaigns reached over 200 million people",
        "New international agreement on phasing out HCFCs signed",
      ],
      challengeAreas: [
        "Skin cancer cases increased by 3% globally",
        "Harmful UV-B radiation affecting crop yields in southern hemisphere",
      ],
    },
  ];

  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container py-12">
      <motion.div 
        className="space-y-4 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold">RegenEarth</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Join our collective effort to regenerate and protect our environment. Learn what you can do 
          to prevent further ozone depletion and participate in community initiatives.
        </p>
      </motion.div>

      {/* Social Preventions Section */}
      <motion.section 
        className="mb-16"
        variants={containerAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
            <Globe className="h-6 w-6 text-ecoshield-sky-blue" />
          </div>
          <h2 className="text-2xl font-semibold">Social Preventions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preventionTips.map((tip, index) => (
            <motion.div 
              key={index}
              variants={itemAnimation}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-border hover:border-ecoshield-sky-blue/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{tip.icon}</div>
                <div>
                  <h3 className="font-medium mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* EcoMissions Section */}
      <motion.section 
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
              <HandHeart className="h-6 w-6 text-ecoshield-sky-blue" />
            </div>
            <h2 className="text-2xl font-semibold">EcoMissions</h2>
          </div>
          <motion.div 
            className="flex items-center gap-2"
            animate={{ 
              scale: joinedMissions.length > 0 ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="font-medium">Your Missions: {joinedMissions.length}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ecoMissions.map((mission) => (
            <Card key={mission.id} className="eco-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{mission.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-muted/50">{mission.difficulty}</Badge>
                    <Badge 
                      variant="outline" 
                      className={
                        mission.impact === "High" 
                          ? "bg-ecoshield-deep-green/20 text-ecoshield-deep-green border-ecoshield-deep-green/50" 
                          : "bg-ecoshield-sky-blue/20 text-ecoshield-sky-blue border-ecoshield-sky-blue/50"
                      }
                    >
                      {mission.impact} Impact
                    </Badge>
                  </div>
                </div>
                <CardDescription>{mission.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mission progress</span>
                    <span className="font-medium">{mission.progress}%</span>
                  </div>
                  <Progress value={mission.progress} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{mission.participants.toLocaleString()} participants</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={joinedMissions.includes(mission.id) ? "bg-ecoshield-deep-green hover:bg-ecoshield-deep-green/90" : ""}
                  onClick={() => handleJoinMission(mission.id)}
                >
                  {joinedMissions.includes(mission.id) ? "Leave Mission" : "Join Mission"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.section>

        {/* Monthly Reports Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
              <FileText className="h-6 w-6 text-ecoshield-sky-blue" />
            </div>
            <h2 className="text-2xl font-semibold">Monthly Environmental Reports</h2>
          </div>

          <div className="space-y-8">
            {monthlyReports.map((report, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{report.month} Report</CardTitle>
                      <Badge className="bg-ecoshield-sky-blue hover:bg-ecoshield-sky-blue/90">Latest</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Leaf className="h-5 w-5 text-ecoshield-deep-green" />
                        <h3 className="font-medium">Highlights</h3>
                      </div>
                      <ul className="list-disc pl-10 space-y-2 text-muted-foreground">
                        {report.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="h-5 w-5 text-amber-500" />
                        <h3 className="font-medium">Challenge Areas</h3>
                      </div>
                      <ul className="list-disc pl-10 space-y-2 text-muted-foreground">
                        {report.challengeAreas.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Download Full Report
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.section>
    </div>
  );
}
