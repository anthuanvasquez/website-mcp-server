import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { ProfessionalProfile } from '../types';
import { ProfileFormatter } from '../utils/formatter';

export const RESOURCES: Resource[] = [
  {
    uri: 'profile://bio',
    name: 'Biografía Profesional',
    mimeType: 'text/markdown',
    description: 'Resumen profesional, objetivos y valores'
  },
  {
    uri: 'profile://skills',
    name: 'Habilidades',
    mimeType: 'text/markdown',
    description: 'Lista completa de habilidades técnicas y blandas'
  },
  {
    uri: 'profile://experience',
    name: 'Experiencia Laboral',
    mimeType: 'text/markdown',
    description: 'Historial de experiencia profesional detallado'
  },
  {
    uri: 'profile://projects',
    name: 'Proyectos',
    mimeType: 'text/markdown',
    description: 'Portafolio de proyectos destacados'
  },
  {
    uri: 'profile://education',
    name: 'Educación',
    mimeType: 'text/markdown',
    description: 'Formación académica detallada'
  },
  {
    uri: 'profile://certifications',
    name: 'Certificaciones',
    mimeType: 'text/markdown',
    description: 'Certificaciones y licencias'
  },
  {
    uri: 'profile://contact',
    name: 'Información de Contacto',
    mimeType: 'text/markdown',
    description: 'Datos de contacto y enlaces a redes'
  }
];

export class ResourceHandlers {
  private profile: ProfessionalProfile;
  private formatter: ProfileFormatter;

  constructor(profile: ProfessionalProfile) {
    this.profile = profile;
    this.formatter = new ProfileFormatter(profile);
  }

  handleReadResource(uri: string) {
    switch (uri) {
      case 'profile://bio':
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: this.formatter.formatBio()
          }]
        };
      case 'profile://skills':
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: this.formatter.formatSkills()
          }]
        };
      case 'profile://experience':
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: this.formatter.formatExperiences()
          }]
        };
      case 'profile://projects':
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: this.formatter.formatProjects()
          }]
        };
      case 'profile://education':
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: this.formatter.formatEducation()
          }]
        };
      case 'profile://certifications':
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: this.formatter.formatCertifications()
          }]
        };
      case 'profile://contact':
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: this.formatter.formatPersonalInfo()
          }]
        };
      default:
        throw new Error(`Recurso no encontrado: ${uri}`);
    }
  }
}
