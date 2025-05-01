
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { EcoMission } from "@/data/regenEarthData";

interface MissionCardProps {
  mission: EcoMission;
  isJoined: boolean;
  onJoinMission: (id: number) => void;
}

export function MissionCard({ mission, isJoined, onJoinMission }: MissionCardProps) {
  return (
    <Card className="eco-card">
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
          className={isJoined ? "bg-ecoshield-deep-green hover:bg-ecoshield-deep-green/90" : ""}
          onClick={() => onJoinMission(mission.id)}
        >
          {isJoined ? "Leave Mission" : "Join Mission"}
        </Button>
      </CardFooter>
    </Card>
  );
}
