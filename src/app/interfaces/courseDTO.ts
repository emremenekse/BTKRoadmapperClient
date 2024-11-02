export interface CourseDTO {
  id: number;
  courseName: string;
  category: number;
  recommendedOrder: number;
  totalRequiredTimeInSeconds: number;
  level: number;
  description: string;
  modules: ModuleDTO[];
}

export interface ModuleDTO {
  title: string;
  lessonCount: number;
}