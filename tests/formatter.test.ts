import { describe, it, expect } from 'vitest';
import { ProfileFormatter } from '../src/utils/formatter';
import { ProfessionalProfile } from '../src/types';

const mockProfile: ProfessionalProfile = {
  personalInfo: {
    name: 'Test User',
    title: 'Test Developer',
    location: 'Test City',
    email: 'test@example.com',
  },
  bio: {
    summary: 'Test summary',
    objectives: ['Obj 1'],
    values: ['Value 1'],
  },
  skills: [
    { name: 'Test Skill', category: 'technical', level: 'expert' }
  ],
  experiences: [],
  projects: [],
  education: [],
  certifications: [],
  languages: []
};

describe('ProfileFormatter', () => {
  const formatter = new ProfileFormatter(mockProfile);

  it('formats personal info correctly', () => {
    const result = formatter.formatPersonalInfo();
    expect(result).toContain('Test User');
    expect(result).toContain('Test Developer');
  });

  it('formats bio correctly', () => {
    const result = formatter.formatBio();
    expect(result).toContain('Test summary');
    expect(result).toContain('Obj 1');
  });

  it('formats skills correctly', () => {
    const result = formatter.formatSkills();
    expect(result).toContain('Test Skill');
    expect(result).toContain('Técnicas');
  });
});
