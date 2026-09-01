import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  Tool,
  Resource,
  Prompt
} from '@modelcontextprotocol/sdk/types.js';
import { ProfessionalProfile } from './types';
import { professionalProfile } from './content';
import { TOOLS } from './tools/index';
import { ToolHandlers } from './tools/handlers';
import { RESOURCES, ResourceHandlers } from './resources/index';
import { PROMPTS, PromptHandlers } from './prompts/index';

export class ProfessionalProfileServer {
  private server: Server;
  private profile: ProfessionalProfile;
  private toolHandlers: ToolHandlers;
  private resourceHandlers: ResourceHandlers;
  private promptHandlers: PromptHandlers;

  constructor() {
    this.profile = professionalProfile;
    this.toolHandlers = new ToolHandlers(this.profile);
    this.resourceHandlers = new ResourceHandlers(this.profile);
    this.promptHandlers = new PromptHandlers(this.profile);

    this.server = new Server(
      {
        name: 'website-mcp-server',
        version: '0.1.0',
        description: 'Servidor MCP para compartir información profesional con LLMs'
      },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        }
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // Tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'get_profile':
          return this.toolHandlers.handleGetProfile(args);
        case 'search_profile':
          return this.toolHandlers.handleSearchProfile(args);
        case 'get_experience_details':
          return this.toolHandlers.handleGetExperienceDetails(args);
        case 'get_project_details':
          return this.toolHandlers.handleGetProjectDetails(args);
        case 'get_skills_by_category':
          return this.toolHandlers.handleGetSkillsByCategory(args);
        default:
          throw new Error(`Herramienta desconocida: ${name}`);
      }
    });

    // Resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: RESOURCES
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      return this.resourceHandlers.handleReadResource(request.params.uri);
    });

    // Prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
      prompts: PROMPTS
    }));

    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      return this.promptHandlers.handleGetPrompt(request.params.name, request.params.arguments);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Servidor MCP Iniciado en stdio');
  }
}
