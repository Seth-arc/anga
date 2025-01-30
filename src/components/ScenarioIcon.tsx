import React from 'react';
import { Book, Users, FlaskConical, Target, Binary, Presentation, 
         UserSquare2, Brain, Workflow, Calculator, Route, School, 
         GraduationCap, UserPlus, TreePine, Lightbulb, Fingerprint, 
         UserRound, Theater, Laugh, UserCircle, Award, UsersRound, 
         FileSpreadsheet, LucideIcon } from 'lucide-react';

interface IconConfig {
  icon: LucideIcon;
  color: string;
  title: string;
}

interface ScenarioIconProps {
  scenarioId: number;
}

const scenarioIcons: Record<number, IconConfig> = {
  1: { icon: Users, color: "#1B998B", title: "Diverse Audience" },
  2: { icon: Lightbulb, color: "#FF9F1C", title: "Interactive Learning" },
  3: { icon: FlaskConical, color: "#1B998B", title: "Creative Teaching" },
  4: { icon: Target, color: "#2E294E", title: "Learning Outcomes" },
  5: { icon: Binary, color: "#4A4E69", title: "Standalone Topics" },
  6: { icon: Presentation, color: "#1B998B", title: "Visual Aids" },
  7: { icon: UserSquare2, color: "#FF9F1C", title: "Large Audience" },
  8: { icon: Brain, color: "#2E294E", title: "Lesson Planning" },
  9: { icon: Workflow, color: "#1B998B", title: "Active Learning" },
  10: { icon: Calculator, color: "#4A4E69", title: "Factual Content" },
  11: { icon: Route, color: "#2E294E", title: "Lesson Structure" },
  12: { icon: School, color: "#1B998B", title: "Research Skills" },
  13: { icon: GraduationCap, color: "#FF9F1C", title: "Teaching Certification" },
  14: { icon: UserPlus, color: "#2E294E", title: "Individual Tutoring" },
  15: { icon: TreePine, color: "#1B998B", title: "Cross-disciplinary" },
  16: { icon: Lightbulb, color: "#FF9F1C", title: "Learning Strategies" },
  17: { icon: Fingerprint, color: "#2E294E", title: "Teaching Style" },
  18: { icon: UserRound, color: "#4A4E69", title: "One-on-One Teaching" },
  19: { icon: Theater, color: "#1B998B", title: "Role-play Learning" },
  20: { icon: Laugh, color: "#FF9F1C", title: "Teaching with Humor" },
  21: { icon: UserCircle, color: "#2E294E", title: "Teaching Presence" },
  22: { icon: Award, color: "#1B998B", title: "Teaching Accreditation" },
  23: { icon: UsersRound, color: "#FF9F1C", title: "Multi-professional" },
  24: { icon: FileSpreadsheet, color: "#4A4E69", title: "Curriculum Structure" }
};

const ScenarioIcon: React.FC<ScenarioIconProps> = ({ scenarioId }) => {
  // Get icon configuration or use default
  const iconConfig = scenarioIcons[scenarioId] || {
    icon: Book,
    color: "#4A4E69",
    title: "General Teaching"
  };

  const Icon = iconConfig.icon;
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <div 
        className="p-6 rounded-full mb-4"
        style={{ backgroundColor: `${iconConfig.color}20` }}
      >
        <Icon size={48} color={iconConfig.color} />
      </div>
      <span className="text-slate-grey text-lg font-medium">
        {iconConfig.title}
      </span>
    </div>
  );
};

export default ScenarioIcon;