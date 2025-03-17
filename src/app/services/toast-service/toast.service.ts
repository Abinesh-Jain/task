import { Injectable } from '@angular/core';
import { Toast, ToastPosition, ToastType } from '../../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: Toast[] = [];

  show(content: string, type?: ToastType, header?: string, delay?: number, position?: ToastPosition) {
    const typeClass = this.getTypeClass(type || ToastType.INFO);
    this.toasts.push({
      content,
      classname: typeClass,
      header: header || type || 'Info',
      position: position || ToastPosition.TOP_RIGHT,
      delay: delay
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts = [];
  }

  private getTypeClass(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-success text-light';
      case ToastType.ERROR:
        return 'bg-danger text-light';
      case ToastType.WARNING:
        return 'bg-warning text-dark';
      case ToastType.INFO:
      default:
        return 'bg-info text-light';
    }
  }
}
