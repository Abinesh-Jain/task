import { Component } from '@angular/core';
import { TaskService } from '../../services/task-service/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastType } from '../../components/toast/toast.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTooltipModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  tasks: any[] = [];
  isModalVisible: boolean = false; // To toggle the modal visibility
  modalMode: 'add' | 'edit' = 'add'; // To track whether we are adding or editing a task
  taskForm = {
    name: '',
    description: '',
    status: 'pending',
  }; // To hold form data

  taskToEdit: any = null; // Task to be edited (if any)

  constructor(private taskService: TaskService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  onError(err: any) {
    this.toastService.show(err.error.message, ToastType.ERROR);
  }

  // Load tasks from the API
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: any) => {
        this.tasks = tasks['results'];
      },
      error: (err: any) => this.onError(err)
    })
  }

  // Toggle the modal for add/edit mode
  toggleTaskModal(mode: 'add' | 'edit', task: any = null): void {
    this.modalMode = mode;
    this.taskToEdit = task;
    if (mode === 'edit' && task) {
      this.taskForm = { ...task }; // Pre-fill the form with task data
    } else {
      this.taskForm = { name: '', description: '', status: 'pending' }; // Reset form
    }
    this.isModalVisible = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  // Add new task
  addTask(): void {
    if (!this.taskForm.name || !this.taskForm.description) {
      this.toastService.show('Name and Description are required', ToastType.WARNING);
      return;
    }

    let newTask = { ...this.taskForm, userId: '1' };

    this.taskService.addTask(newTask).subscribe({
      next: (task: any) => {
        this.tasks.push(task);
        this.closeModal();
      },
      error: (err: any) => this.onError(err)
    });
  }

  // Edit an existing task
  editTask(): void {
    if (!this.taskForm.name || !this.taskForm.description) {
      this.toastService.show('Name and Description are required', ToastType.WARNING);
      return;
    }

    this.taskToEdit.name = this.taskForm.name;
    this.taskToEdit.description = this.taskForm.description;
    this.taskToEdit.status = this.taskForm.status;

    this.taskService.updateTask(this.taskToEdit).subscribe({
      next: (task: any) => {
        let index = this.tasks.findIndex((t) => t._id === task._id);
        this.tasks[index] = task;
        this.closeModal();
      },
      error: (err: any) => this.onError(err)
    });
  }

  // Delete a task
  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((t) => t._id !== taskId);
        },
        error: (err: any) => this.onError(err)
      });
    }
  }
}
