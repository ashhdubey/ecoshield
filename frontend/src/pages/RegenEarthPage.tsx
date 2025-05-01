
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SocialPreventionsSection } from "@/components/regen-earth/SocialPreventionsSection";
import { EcoMissionsSection } from "@/components/regen-earth/EcoMissionsSection";
import { MonthlyReportsSection } from "@/components/regen-earth/MonthlyReportsSection";

export default function RegenEarthPage() {
  const [joinedMissions, setJoinedMissions] = useState<number[]>([]);

  const handleJoinMission = (missionId: number) => {
    if (joinedMissions.includes(missionId)) {
      setJoinedMissions(joinedMissions.filter(id => id !== missionId));
    } else {
      setJoinedMissions([...joinedMissions, missionId]);
    }
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
      <SocialPreventionsSection />

      {/* EcoMissions Section */}
      <EcoMissionsSection joinedMissions={joinedMissions} onJoinMission={handleJoinMission} />

      {/* Monthly Reports Section */}
      <MonthlyReportsSection />
    </div>
  );
}
