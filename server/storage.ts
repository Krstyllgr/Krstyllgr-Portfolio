import { users, projects, contactSubmissions, type User, type InsertUser, type Project, type InsertProject, type ContactSubmission, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample projects
    this.initializeProjects();
  }

  private initializeProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution built with React and Node.js, featuring user authentication, payment processing, and admin dashboard.",
        category: "web",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/kristyl-alegre/ecommerce",
        imageUrl: "/api/placeholder/400/300",
        featured: true
      },
      {
        title: "Task Management App",
        description: "A cross-platform mobile app for task management with real-time synchronization, built using React Native and Firebase.",
        category: "mobile",
        techStack: ["React Native", "Firebase", "Redux", "TypeScript"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/kristyl-alegre/task-app",
        imageUrl: "/api/placeholder/400/300",
        featured: true
      },
      {
        title: "RESTful API Service",
        description: "A scalable RESTful API built with Express.js and PostgreSQL, featuring JWT authentication, rate limiting, and comprehensive documentation.",
        category: "api",
        techStack: ["Express.js", "PostgreSQL", "JWT", "Swagger"],
        liveUrl: "https://api.example.com/docs",
        githubUrl: "https://github.com/kristyl-alegre/api-service",
        imageUrl: "/api/placeholder/400/300",
        featured: true
      },
      {
        title: "Analytics Dashboard",
        description: "A real-time analytics dashboard for monitoring business metrics, built with React and D3.js for data visualization.",
        category: "web",
        techStack: ["React", "D3.js", "WebSockets", "Redis"],
        liveUrl: "https://dashboard.example.com",
        githubUrl: "https://github.com/kristyl-alegre/analytics",
        imageUrl: "/api/placeholder/400/300",
        featured: false
      },
      {
        title: "Content Management System",
        description: "A headless CMS built with Node.js and GraphQL, featuring role-based access control and a modern admin interface.",
        category: "web",
        techStack: ["Node.js", "GraphQL", "MongoDB", "Apollo"],
        liveUrl: "https://cms.example.com",
        githubUrl: "https://github.com/kristyl-alegre/cms",
        imageUrl: "/api/placeholder/400/300",
        featured: false
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject,
      id, 
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      imageUrl: insertProject.imageUrl || null,
      featured: insertProject.featured || false,
      createdAt: new Date() 
    };
    this.projects.set(id, project);
    return project;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const contact: ContactSubmission = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }
}

export const storage = new MemStorage();
