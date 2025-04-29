
import { FileText, Globe, HandHeart } from "lucide-react";
import { ReactNode } from "react";

export interface PreventionTip {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface EcoMission {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  impact: string;
  participants: number;
  progress: number;
}

export interface MonthlyReport {
  month: string;
  highlights: string[];
  challengeAreas: string[];
}

export const preventionTips: PreventionTip[] = [
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

export const ecoMissions: EcoMission[] = [
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

export const monthlyReports: MonthlyReport[] = [
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
export const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const sectionIcons = {
  socialPrevention: <Globe className="h-6 w-6 text-ecoshield-sky-blue" />,
  ecoMissions: <HandHeart className="h-6 w-6 text-ecoshield-sky-blue" />,
  monthlyReports: <FileText className="h-6 w-6 text-ecoshield-sky-blue" />
};
