# Anthuan MCP Server

Un servidor MCP (Model Context Protocol) diseñado para compartir información profesional estructurada con LLMs. Este servidor permite a los asistentes de IA acceder a tu biografía, habilidades, experiencia, proyectos y educación de manera semántica.

## 🚀 Características

*   **Tools**: Herramientas para consultar y buscar información específica del perfil (`get_profile`, `search_profile`, etc.).
*   **Resources**: Acceso directo a secciones del perfil como recursos de lectura (`profile://bio`, `profile://skills`).
*   **Prompts**: Plantillas predefinidas para generar resúmenes o explicar proyectos (`summarize_experience`, `explain_project`).

## 🛠️ Cómo Probar (How to Test)

Para asegurarte de que tu servidor MCP funciona correctamente, tienes tres opciones principales:

### 1. Tests Unitarios (Automático)

Ejecuta los tests automáticos que hemos creado con Vitest. Esto verifica que la lógica interna funciona.

```bash
npm test
```

### 2. MCP Inspector (Interactivo)

La mejor forma de probar visualmente tus herramientas, recursos y prompts es usar el Inspector oficial de MCP.

```bash
# Construye el proyecto primero
npm run build

# Inicia el inspector
npx @modelcontextprotocol/inspector node dist/main.js
```

Esto abrirá una interfaz web en tu navegador donde podrás:
- **Tools**: Probar `get_profile` y ver la salida Markdown.
- **Resources**: Ver la lista de recursos (`profile://bio`, etc.) y leer su contenido.
- **Prompts**: Ejecutar los prompts (`summarize_experience`) y ver los mensajes generados.

### 3. Claude Desktop (Producción)

Para usarlo en tu día a día con Claude, añade la configuración a tu archivo de configuración de Claude Desktop:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "anthuan-profile": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/anthuan-mcp-server/dist/main.js"
      ]
    }
  }
}
```

(Asegúrate de reemplazar `/ABSOLUTE/PATH/TO/` con la ruta real a tu proyecto y ejecutar `npm run build` antes de usarlo).

## 📦 Instalación y Desarrollo

1.  Instalar dependencias:
    ```bash
    pnpm install
    ```

2.  Mod de desarrollo:
    ```bash
    pnpm dev
    ```

3.  Construir para producción:
    ```bash
    pnpm build
    ```
