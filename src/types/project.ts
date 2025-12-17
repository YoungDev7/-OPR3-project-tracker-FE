/**
 * Task status enum matching backend values
 */
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

/**
 * Task interface matching backend API response
 */
export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Project interface matching backend API response
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

/**
 * Create project request payload
 */
export interface CreateProjectRequest {
  title: string;
  description: string;
  dueDate: string;
}

/**
 * Update project request payload
 */
export interface UpdateProjectRequest {
  title: string;
  description: string;
  dueDate: string;
}

/**
 * Create task request payload
 */
export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  status?: TaskStatus;
}

/**
 * Update task request payload
 */
export interface UpdateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

/**
 * Update task status request payload
 */
export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}
