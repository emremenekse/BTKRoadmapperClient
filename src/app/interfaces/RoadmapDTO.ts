import { EducationLevel, SkillLevel, TargetField } from "../enums/enums";

export interface RoadmapDTO {
  email?: string;
  name?: string;
  role?: string;
  interestedFields?: string;
  educationLevel: EducationLevel;
  interestedFieldSkillLevel: SkillLevel;
  dailyAvailableTime: number;
  targetField: TargetField;
  isUser: boolean;
  hasUserInfoChange: boolean;
}