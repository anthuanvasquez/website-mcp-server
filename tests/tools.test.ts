import { describe, it, expect } from 'vitest';
import { ToolHandlers } from '../src/tools/handlers';
import { ProfessionalProfile } from '../src/types';

const mockProfile: ProfessionalProfile = {
  personalInfo: {
    name: 'Test User',
    title: 'Test Title',
    location: 'Test Loc',
    email: 'test@test.com'
  },
  bio: {
    summary: 'Summary',
    objectives: [],
    values: []
  },
  skills: [
    { name: 'React', category: 'technical', level: 'expert' }
  ],
  experiences: [],
  projects: [],
  education: [],
  certifications: [],
  languages: []
};

describe('ToolHandlers', () => {
  const handlers = new ToolHandlers(mockProfile);

  it('handleGetProfile return specific section', async () => {
    const result = await handlers.handleGetProfile({ section: 'personal' });
    expect(result.content[0].text).toContain('Test User');
  });

  it('handleSearchProfile returns matches', async () => {
    const result = await handlers.handleSearchProfile({ query: 'React' });
    expect(result.content[0].text).toContain('React');
  });

  it('handleSearchProfile returns message when no matches', async () => {
     const result = await handlers.handleSearchProfile({ query: 'Java' });
     expect(result.content[0].text).toContain('No se encontraron resultados');
  });
});
