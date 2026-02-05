import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const TOOLS: Tool[] = [
  {
    name: 'get_profile',
    description: 'Obtiene información del perfil profesional por sección',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: ['personal', 'bio', 'skills', 'experience', 'projects', 'education', 'certifications', 'languages', 'all'],
          description: 'Sección específica del perfil a obtener. Si no se especifica, devuelve resumen general.'
        }
      }
    }
  },
  {
    name: 'search_profile',
    description: 'Busca información específica en el perfil profesional',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Término de búsqueda para encontrar información relevante'
        },
        section: {
          type: 'string',
          enum: ['skills', 'experience', 'projects', 'all'],
          description: 'Sección donde buscar (opcional)'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'get_experience_details',
    description: 'Obtiene detalles específicos de una experiencia laboral',
    inputSchema: {
      type: 'object',
      properties: {
        experienceId: {
          type: 'string',
          description: 'ID de la experiencia laboral'
        }
      },
      required: ['experienceId']
    }
  },
  {
    name: 'get_project_details',
    description: 'Obtiene detalles específicos de un proyecto',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'ID del proyecto'
        }
      },
      required: ['projectId']
    }
  },
  {
    name: 'get_skills_by_category',
    description: 'Obtiene habilidades filtradas por categoría',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['technical', 'soft', 'language', 'tool'],
          description: 'Categoría de habilidades a obtener'
        }
      },
      required: ['category']
    }
  }
];
