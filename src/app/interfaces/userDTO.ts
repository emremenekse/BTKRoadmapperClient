import { EducationLevel, SkillLevel, TargetField } from "../enums/enums";

export interface UserDTO {
    name?: string;
    email?: string;
    role?: string;
    availableHoursPerDaily: number;
    interestedFields?: string;
    educationLevel: EducationLevel;
    interestedFieldSkillLevel: SkillLevel;
    targetField: TargetField;
}