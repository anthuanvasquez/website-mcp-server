import { ProfessionalProfile } from './types';

export const professionalProfile: ProfessionalProfile = {
  personalInfo: {
    name: "Anthuan Vasquez",
    title: "Desarrollador JavaScript Full Stack",
    location: "Santiago de los Caballeros, República Dominicana",
    email: "me@anthuanvasquez.net",
    phone: "+1-829-XXX-XXXX",
    linkedin: "https://linkedin.com/in/anthuanvasquez",
    github: "https://github.com/anthuanvasquez",
    website: "https://anthuanvasquez.net"
  },
  bio: {
    summary: "Desarrollador Full Stack con más de 8 años de experiencia creando aplicaciones web escalables y soluciones tecnológicas innovadoras. Especializado en JavaScript, TypeScript, React, Node.js y arquitecturas cloud.",
    objectives: [
      "Liderar equipos de desarrollo en proyectos de alto impacto",
      "Contribuir a la transformación digital de empresas",
      "Mentorear a desarrolladores junior y compartir conocimiento"
    ],
    values: [
      "Código limpio y mantenible",
      "Aprendizaje continuo",
      "Colaboración en equipo",
      "Innovación tecnológica"
    ]
  },
  skills: [
    { name: "JavaScript", category: "technical", level: "expert", yearsOfExperience: 5 },
    { name: "TypeScript", category: "technical", level: "advanced", yearsOfExperience: 3 },
    { name: "React", category: "technical", level: "expert", yearsOfExperience: 4 },
    { name: "Node.js", category: "technical", level: "advanced", yearsOfExperience: 4 },
    { name: "Python", category: "technical", level: "intermediate", yearsOfExperience: 2 },
    { name: "AWS", category: "tool", level: "intermediate", yearsOfExperience: 2 },
    { name: "Docker", category: "tool", level: "advanced", yearsOfExperience: 3 },
    { name: "Liderazgo de equipos", category: "soft", level: "advanced" },
    { name: "Comunicación efectiva", category: "soft", level: "advanced" },
    { name: "Resolución de problemas", category: "soft", level: "expert" },
    { name: "Español", category: "language", level: "expert" },
    { name: "Inglés", category: "language", level: "advanced" }
  ],
  experiences: [
    {
      id: "exp1",
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      startDate: "2022-03",
      current: true,
      description: "Lidero el desarrollo de aplicaciones web empresariales utilizando React, Node.js y AWS.",
      achievements: [
        "Reduje el tiempo de carga de la aplicación principal en un 40%",
        "Implementé arquitectura de microservicios que mejoró la escalabilidad",
        "Mentoré a 3 desarrolladores junior"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Redis"],
      location: "Santiago, RD"
    },
    {
      id: "exp2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      startDate: "2020-01",
      endDate: "2022-02",
      current: false,
      description: "Desarrollé desde cero la plataforma principal de la startup utilizando tecnologías modernas.",
      achievements: [
        "Construí la MVP completa en 6 meses",
        "Implementé sistema de pagos integrado con Stripe",
        "Desarrollé API RESTful con documentación completa"
      ],
      technologies: ["Vue.js", "Express.js", "MongoDB", "Stripe API"],
      location: "Remoto"
    }
  ],

  projects: [
    {
      id: "proj1",
      name: "E-commerce Platform",
      description: "Plataforma de comercio electrónico completa con panel de administración, carrito de compras y sistema de pagos.",
      technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
      startDate: "2023-01",
      endDate: "2023-06",
      status: "completed",
      url: "https://mi-ecommerce.com",
      repository: "https://github.com/usuario/ecommerce-platform",
      highlights: [
        "Procesó más de $50,000 en ventas el primer mes",
        "Implementé sistema de recomendaciones con IA",
        "Dashboard analytics en tiempo real"
      ],
      role: "Lead Developer"
    },
    {
      id: "proj2",
      name: "Task Management API",
      description: "API RESTful para gestión de tareas con autenticación JWT y notificaciones en tiempo real.",
      technologies: ["Node.js", "Express", "Socket.io", "MongoDB", "JWT"],
      startDate: "2023-08",
      status: "in-progress",
      repository: "https://github.com/usuario/task-api",
      highlights: [
        "Documentación completa con Swagger",
        "Tests automatizados con Jest",
        "Implementación de WebSockets"
      ],
      role: "Solo Developer"
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "Universidad Tecnológica de Santiago (UTESA)",
      degree: "Ingeniería",
      field: "Sistemas de Computación",
      startDate: "2005-09",
      endDate: "2012-06",
      gpa: "2.9/4.0",
      honors: ["Magna Cum Laude", "Dean's List"],
      relevant_coursework: [
        "Estructuras de Datos y Algoritmos",
        "Ingeniería de Software",
        "Bases de Datos",
        "Redes de Computadoras"
      ]
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      dateObtained: "2023-03-15",
      expirationDate: "2026-03-15",
      credentialId: "AWS-SAA-123456",
      url: "https://aws.amazon.com/verification"
    },
    {
      id: "cert2",
      name: "Meta React Developer Certificate",
      issuer: "Meta",
      dateObtained: "2022-11-20",
      credentialId: "META-REACT-789",
      url: "https://coursera.org/verify/professional-cert/abc123"
    }
  ],
  languages: [
    { language: "Español", proficiency: "native" },
    { language: "Inglés", proficiency: "conversational" },
  ]
};
