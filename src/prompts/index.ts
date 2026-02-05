import { Prompt } from '@modelcontextprotocol/sdk/types.js';
import { ProfessionalProfile } from '../types';
import { ProfileFormatter } from '../utils/formatter';

export const PROMPTS: Prompt[] = [
  {
    name: 'summarize_experience',
    description: 'Genera un resumen de la experiencia enfocado en un tema específico',
    arguments: [
      {
        name: 'topic',
        description: 'Tema o tecnología específica (ej: React, Liderazgo)',
        required: true
      }
    ]
  },
  {
    name: 'explain_project',
    description: 'Explica un proyecto detalladamente para una entrevista técnica',
    arguments: [
      {
        name: 'projectName',
        description: 'Nombre del proyecto',
        required: true
      }
    ]
  },
  {
    name: 'cover_letter_context',
    description: 'Provee contexto para generar una carta de presentación para un rol específico',
    arguments: [
      {
        name: 'role',
        description: 'Rol al que se aplica',
        required: true
      },
      {
        name: 'company',
        description: 'Empresa a la que se aplica',
        required: true
      }
    ]
  }
];

export class PromptHandlers {
  private profile: ProfessionalProfile;
  private formatter: ProfileFormatter;

  constructor(profile: ProfessionalProfile) {
    this.profile = profile;
    this.formatter = new ProfileFormatter(profile);
  }

  async handleGetPrompt(name: string, args: any) {
    switch (name) {
      case 'summarize_experience':
        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Por favor, revisa mi experiencia profesional y genera un resumen enfocado en "${args.topic}".
                
Aquí están mis experiencias:
${this.formatter.formatExperiences()}

Y mis habilidades:
${this.formatter.formatSkills()}

El resumen debe destacar cómo mi experiencia con ${args.topic} aporta valor.`
              }
            }
          ]
        };
      
      case 'explain_project':
        const project = this.profile.projects.find(p => p.name.toLowerCase().includes(args.projectName.toLowerCase()));
        if (!project) {
             throw new Error(`Proyecto "${args.projectName}" no encontrado.`);
        }

        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Estoy en una entrevista técnica. Necesito explicar mi proyecto "${project.name}".
                
Aquí están los detalles del proyecto:
${this.formatter.formatProjectDetail(project)}

Por favor, ayúdame a estructurar una explicación que cubra:
1. El problema que resolví.
2. La arquitectura técnica y por qué elegí esas tecnologías (${project.technologies.join(', ')}).
3. Los desafíos más grandes (Highlights: ${project.highlights.join('; ')}).
4. El impacto del proyecto.`
              }
            }
          ]
        };

      case 'cover_letter_context':
        return {
          messages: [
             {
              role: 'user',
              content: {
                type: 'text',
                text: `Estoy aplicando para el rol de ${args.role} en ${args.company}.
                
Necesito que uses mi perfil profesional para generar una carta de presentación convincente.

Aquí está mi información:
${this.formatter.formatCompleteProfile()}

La carta debe ser profesional, destacar mis habilidades relevantes para ${args.role} y mencionar por qué encajo bien en la cultura de ingeniería basada en mis valores.`
              }
            }
          ]
        }

      default:
        throw new Error(`Prompt desconocido: ${name}`);
    }
  }
}
