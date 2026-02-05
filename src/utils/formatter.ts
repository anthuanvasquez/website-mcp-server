import { ProfessionalProfile, Experience, Project, Skill } from '../types';

export class ProfileFormatter {
  private profile: ProfessionalProfile;

  constructor(profile: ProfessionalProfile) {
    this.profile = profile;
  }

  formatPersonalInfo(): string {
    const { personalInfo } = this.profile;
    return `# Información Personal

**Nombre:** ${personalInfo.name}
**Título:** ${personalInfo.title}
**Ubicación:** ${personalInfo.location}
**Email:** ${personalInfo.email}
${personalInfo.phone ? `**Teléfono:** ${personalInfo.phone}` : ''}
${personalInfo.linkedin ? `**LinkedIn:** ${personalInfo.linkedin}` : ''}
${personalInfo.github ? `**GitHub:** ${personalInfo.github}` : ''}
${personalInfo.website ? `**Sitio Web:** ${personalInfo.website}` : ''}`;
  }

  formatBio(): string {
    const { bio } = this.profile;
    return `# Biografía Profesional

## Resumen
${bio.summary}

## Objetivos Profesionales
${bio.objectives.map(obj => `• ${obj}`).join('\n')}

## Valores
${bio.values.map(value => `• ${value}`).join('\n')}`;
  }

  formatSkills(): string {
    const skillsByCategory = this.profile.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);

    let result = '# Habilidades\n\n';

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      const categoryName = {
        technical: 'Técnicas',
        soft: 'Blandas',
        language: 'Idiomas',
        tool: 'Herramientas'
      }[category] || category;

      result += `## ${categoryName}\n`;
      skills.forEach(skill => {
        result += `• **${skill.name}** - ${skill.level}${skill.yearsOfExperience ? ` (${skill.yearsOfExperience} años)` : ''}\n`;
      });
      result += '\n';
    });

    return result;
  }

  formatExperiences(): string {
    let result = '# Experiencia Profesional\n\n';

    this.profile.experiences.forEach(exp => {
      const endDate = exp.current ? 'Presente' : exp.endDate;
      result += `## ${exp.position} - ${exp.company}\n`;
      result += `**Período:** ${exp.startDate} - ${endDate}\n`;
      result += `**Ubicación:** ${exp.location || 'No especificada'}\n\n`;
      result += `${exp.description}\n\n`;

      if (exp.achievements.length > 0) {
        result += '**Logros principales:**\n';
        exp.achievements.forEach(achievement => {
          result += `• ${achievement}\n`;
        });
        result += '\n';
      }

      if (exp.technologies.length > 0) {
        result += `**Tecnologías:** ${exp.technologies.join(', ')}\n\n`;
      }

      result += '---\n\n';
    });

    return result;
  }

  formatProjects(): string {
    let result = '# Proyectos\n\n';

    this.profile.projects.forEach(project => {
      result += `## ${project.name}\n`;
      result += `**Estado:** ${project.status}\n`;
      result += `**Período:** ${project.startDate}${project.endDate ? ` - ${project.endDate}` : ' - En progreso'}\n`;
      if (project.role) result += `**Rol:** ${project.role}\n`;
      result += `\n${project.description}\n\n`;

      if (project.highlights.length > 0) {
        result += '**Aspectos destacado:**\n';
        project.highlights.forEach(highlight => {
          result += `• ${highlight}\n`;
        });
        result += '\n';
      }

      result += `**Tecnologías:** ${project.technologies.join(', ')}\n`;
      if (project.url) result += `**URL:** ${project.url}\n`;
      if (project.repository) result += `**Repositorio:** ${project.repository}\n`;

      result += '\n---\n\n';
    });

    return result;
  }

  formatEducation(): string {
    let result = '# Educación\n\n';

    this.profile.education.forEach(edu => {
      result += `## ${edu.degree} en ${edu.field}\n`;
      result += `**Institución:** ${edu.institution}\n`;
      result += `**Período:** ${edu.startDate} - ${edu.endDate || 'En progreso'}\n`;
      if (edu.gpa) result += `**GPA:** ${edu.gpa}\n`;

      if (edu.honors && edu.honors.length > 0) {
        result += `**Honores:** ${edu.honors.join(', ')}\n`;
      }

      if (edu.relevant_coursework && edu.relevant_coursework.length > 0) {
        result += '**Cursos relevantes:**\n';
        edu.relevant_coursework.forEach(course => {
          result += `• ${course}\n`;
        });
      }

      result += '\n---\n\n';
    });

    return result;
  }

  formatCertifications(): string {
    let result = '# Certificaciones\n\n';

    this.profile.certifications.forEach(cert => {
      result += `## ${cert.name}\n`;
      result += `**Emisor:** ${cert.issuer}\n`;
      result += `**Fecha de obtención:** ${cert.dateObtained}\n`;
      if (cert.expirationDate) result += `**Fecha de expiración:** ${cert.expirationDate}\n`;
      if (cert.credentialId) result += `**ID de credencial:** ${cert.credentialId}\n`;
      if (cert.url) result += `**Verificación:** ${cert.url}\n`;

      result += '\n---\n\n';
    });

    return result;
  }

  formatLanguages(): string {
    let result = '# Idiomas\n\n';

    this.profile.languages.forEach(lang => {
      const levelText = {
        basic: 'Básico',
        conversational: 'Conversacional',
        fluent: 'Fluido',
        native: 'Nativo'
      }[lang.proficiency];

      result += `• **${lang.language}:** ${levelText}\n`;
    });

    return result;
  }

  formatCompleteProfile(): string {
    return `${this.formatPersonalInfo()}\n\n${this.formatBio()}\n\n${this.formatSkills()}\n\n${this.formatExperiences()}\n\n${this.formatProjects()}\n\n${this.formatEducation()}\n\n${this.formatCertifications()}\n\n${this.formatLanguages()}`;
  }

  formatProfileSummary(): string {
    return `# Resumen del Perfil Profesional

${this.formatPersonalInfo()}

## Resumen Ejecutivo
${this.profile.bio.summary}

## Habilidades Principales
${this.profile.skills.filter(s => s.level === 'expert' || s.level === 'advanced').slice(0, 8).map(s => `• ${s.name}`).join('\n')}

## Experiencia Reciente
${this.profile.experiences.slice(0, 2).map(exp => `• ${exp.position} en ${exp.company} (${exp.startDate} - ${exp.current ? 'Presente' : exp.endDate})`).join('\n')}

*Use get_profile con section específica para obtener información detallada de cada sección.*`;
  }

  formatExperienceDetail(experience: Experience): string {
    const endDate = experience.current ? 'Presente' : experience.endDate;
    return `# ${experience.position} - ${experience.company}

**Período:** ${experience.startDate} - ${endDate}
**Ubicación:** ${experience.location || 'No especificada'}

## Descripción
${experience.description}

## Logros Principales
${experience.achievements.map(achievement => `• ${achievement}`).join('\n')}

## Tecnologías Utilizadas
${experience.technologies.join(', ')}`;
  }

  formatProjectDetail(project: Project): string {
    return `# ${project.name}

**Estado:** ${project.status}
**Período:** ${project.startDate}${project.endDate ? ` - ${project.endDate}` : ' - En progreso'}
${project.role ? `**Rol:** ${project.role}` : ''}

## Descripción
${project.description}

## Aspectos Destacados
${project.highlights.map(highlight => `• ${highlight}`).join('\n')}

## Tecnologías
${project.technologies.join(', ')}

${project.url ? `**URL del proyecto:** ${project.url}` : ''}
${project.repository ? `**Repositorio:** ${project.repository}` : ''}`;
  }

  formatSkillsByCategory(skills: Skill[], category: string): string {
    const categoryName = {
      technical: 'Técnicas',
      soft: 'Blandas',
      language: 'Idiomas',
      tool: 'Herramientas'
    }[category] || category;

    let result = `# Habilidades ${categoryName}\n\n`;

    skills.forEach(skill => {
      result += `• **${skill.name}** - ${skill.level}${skill.yearsOfExperience ? ` (${skill.yearsOfExperience} años de experiencia)` : ''}\n`;
    });

    return result;
  }
}
