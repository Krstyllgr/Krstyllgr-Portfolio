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
        title: "Project One",
        description: "Your first amazing project description will go here. Showcase what technologies you used and what problems it solves.",
        category: "web",
        techStack: ["React", "Node.js", "Express", "JavaScript"],
        liveUrl: null,
        githubUrl: null,
        imageUrl: "/src/assets/portfolio-placeholder.svg",
        featured: true
      },
      {
        title: "Mobile Application",
        description: "Your mobile app project description. Highlight the key features and the technologies used to build this application.",
        category: "mobile",
        techStack: ["React Native", "JavaScript", "Node.js"],
        liveUrl: null,
        githubUrl: null,
        imageUrl: "/src/assets/portfolio-placeholder.svg",
        featured: true
      },
      {
        title: "API Development Project",
        description: "Your backend API project description. Explain the functionality and how it serves different applications.",
        category: "api",
        techStack: ["Express", "Node.js", "Prisma", "JavaScript"],
        liveUrl: null,
        githubUrl: null,
        imageUrl: "/src/assets/portfolio-placeholder.svg",
        featured: true
      },
      {
        title: "Web Application Two",
        description: "Your second web application project. Describe the unique features and technical challenges you solved.",
        category: "web",
        techStack: ["React", "JavaScript", "Node.js", "Express"],
        liveUrl: null,
        githubUrl: null,
        imageUrl: "/src/assets/portfolio-placeholder.svg",
        featured: false
      },
      {
        title: "Python Project",
        description: "Your Python-based project description. Highlight how you used Python to solve specific problems or create solutions.",
        category: "web",
        techStack: ["Python", "JavaScript", "Git"],
        liveUrl: null,
        githubUrl: null,
        imageUrl: "/src/assets/portfolio-placeholder.svg",
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
