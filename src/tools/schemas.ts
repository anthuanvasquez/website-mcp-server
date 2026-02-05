import { z } from 'zod';

export const GetProfileArgsSchema = z.object({
  section: z.enum(['personal', 'bio', 'skills', 'experience', 'projects', 'education', 'certifications', 'languages', 'all']).optional()
});

export const SearchArgsSchema = z.object({
  query: z.string(),
  section: z.enum(['skills', 'experience', 'projects', 'all']).optional()
});

export const GetExperienceDetailsArgsSchema = z.object({
  experienceId: z.string()
});

export const GetProjectDetailsArgsSchema = z.object({
  projectId: z.string()
});

export const GetSkillsByCategoryArgsSchema = z.object({
  category: z.enum(['technical', 'soft', 'language', 'tool'])
});
