import { ProfessionalProfile } from '../types';
import { ProfileFormatter } from '../utils/formatter';
import { 
  GetProfileArgsSchema, 
  SearchArgsSchema, 
  GetExperienceDetailsArgsSchema, 
  GetProjectDetailsArgsSchema, 
  GetSkillsByCategoryArgsSchema 
} from './schemas';
import { z } from 'zod';

export class ToolHandlers {
  private profile: ProfessionalProfile;
  private formatter: ProfileFormatter;

  constructor(profile: ProfessionalProfile) {
    this.profile = profile;
    this.formatter = new ProfileFormatter(profile);
  }

  async handleGetProfile(args: any) {
    const { section } = GetProfileArgsSchema.parse(args);

    switch (section) {
      case 'personal':
        return {
          content: [{ type: 'text', text: this.formatter.formatPersonalInfo() }]
        };
      case 'bio':
        return {
          content: [{ type: 'text', text: this.formatter.formatBio() }]
        };
      case 'skills':
        return {
          content: [{ type: 'text', text: this.formatter.formatSkills() }]
        };
      case 'experience':
        return {
          content: [{ type: 'text', text: this.formatter.formatExperiences() }]
        };
      case 'projects':
        return {
          content: [{ type: 'text', text: this.formatter.formatProjects() }]
        };
      case 'education':
        return {
          content: [{ type: 'text', text: this.formatter.formatEducation() }]
        };
      case 'certifications':
        return {
          content: [{ type: 'text', text: this.formatter.formatCertifications() }]
        };
      case 'languages':
        return {
          content: [{ type: 'text', text: this.formatter.formatLanguages() }]
        };
      case 'all':
        return {
          content: [{ type: 'text', text: this.formatter.formatCompleteProfile() }]
        };
      default:
        return {
          content: [{ type: 'text', text: this.formatter.formatProfileSummary() }]
        };
    }
  }

  async handleSearchProfile(args: any) {
    const { query, section } = SearchArgsSchema.parse(args);
    const results = this.searchInProfile(query, section);

    return {
      content: [
        {
          type: 'text',
          text: `Resultados de búsqueda para "${query}":\n\n${results}`
        }
      ]
    };
  }

  async handleGetExperienceDetails(args: any) {
    const { experienceId } = GetExperienceDetailsArgsSchema.parse(args);
    const experience = this.profile.experiences.find(exp => exp.id === experienceId);

    if (!experience) {
      throw new Error(`Experiencia con ID ${experienceId} no encontrada`);
    }

    return {
      content: [
        {
          type: 'text',
          text: this.formatter.formatExperienceDetail(experience)
        }
      ]
    };
  }

  async handleGetProjectDetails(args: any) {
    const { projectId } = GetProjectDetailsArgsSchema.parse(args);
    const project = this.profile.projects.find(proj => proj.id === projectId);

    if (!project) {
      throw new Error(`Proyecto con ID ${projectId} no encontrado`);
    }

    return {
      content: [
        {
          type: 'text',
          text: this.formatter.formatProjectDetail(project)
        }
      ]
    };
  }

  async handleGetSkillsByCategory(args: any) {
    const { category } = GetSkillsByCategoryArgsSchema.parse(args);
    const skills = this.profile.skills.filter(skill => skill.category === category);

    return {
      content: [
        {
          type: 'text',
          text: this.formatter.formatSkillsByCategory(skills, category)
        }
      ]
    };
  }

  private searchInProfile(query: string, section?: string): string {
    const searchTerm = query.toLowerCase();
    const results: string[] = [];

    // Buscar en habilidades
    if (!section || section === 'skills' || section === 'all') {
      const matchingSkills = this.profile.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm)
      );

      if (matchingSkills.length > 0) {
        results.push('**Habilidades encontradas:**');
        matchingSkills.forEach(skill => {
          results.push(`• ${skill.name} - ${skill.level} (${skill.category})`);
        });
        results.push('');
      }
    }

    // Buscar en experiencias
    if (!section || section === 'experience' || section === 'all') {
      const matchingExperiences = this.profile.experiences.filter(exp =>
        exp.company.toLowerCase().includes(searchTerm) ||
        exp.position.toLowerCase().includes(searchTerm) ||
        exp.description.toLowerCase().includes(searchTerm) ||
        exp.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
        exp.achievements.some(achievement => achievement.toLowerCase().includes(searchTerm))
      );

      if (matchingExperiences.length > 0) {
        results.push('**Experiencias encontradas:**');
        matchingExperiences.forEach(exp => {
          results.push(`• ${exp.position} en ${exp.company} (${exp.startDate} - ${exp.current ? 'Presente' : exp.endDate})`);
          results.push(`  Descripción: ${exp.description.substring(0, 100)}...`);
        });
        results.push('');
      }
    }

    // Buscar en proyectos
    if (!section || section === 'projects' || section === 'all') {
      const matchingProjects = this.profile.projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
        project.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm))
      );

      if (matchingProjects.length > 0) {
        results.push('**Proyectos encontrados:**');
        matchingProjects.forEach(project => {
          results.push(`• ${project.name} (${project.status})`);
          results.push(`  Descripción: ${project.description.substring(0, 100)}...`);
          results.push(`  Tecnologías: ${project.technologies.join(', ')}`);
        });
        results.push('');
      }
    }

    return results.length > 0 ? results.join('\n') : `No se encontraron resultados para "${query}" en ${section || 'todas las secciones'}.`;
  }
}
