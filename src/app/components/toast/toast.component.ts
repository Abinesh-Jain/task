import { Component } from '@angular/core';
import { ToastService } from '../../services/toast-service/toast.service';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


export interface Toast {
  content: string;
  classname: string;
  header: string;
  delay?: number;
  position: string;
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum ToastPosition {
  TOP_RIGHT = 'top-0 end-0',
  TOP_LEFT = 'top-0 start-0',
  BOTTOM_RIGHT = 'bottom-0 end-0',
  BOTTOM_LEFT = 'bottom-0 start-0',
  TOP_CENTER = 'top-0 start-50 translate-middle-x',
  BOTTOM_CENTER = 'bottom-0 start-50 translate-middle-x'
}


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toasts = this.toastService.toasts;
  }
}
