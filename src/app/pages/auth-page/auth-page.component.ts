import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastType } from '../../components/toast/toast.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTooltipModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  isSignIn: boolean = true;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) { }

  // Toggle between Sign In and Sign Up
  toggleAuth(): void {
    this.isSignIn = !this.isSignIn;
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  // Handle Sign In
  onSignIn(): void {
    if (!this.email || !this.password) return;
    this.authService.signIn(this.email, this.password).subscribe({
      next: (response) => this.onSuccess(response),
      error: (err) => this.onError(err),
    });
  }

  onSuccess(response: any) {
    let user = response['detail'];
    this.toastService.show(response['message']);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/home']);
  }

  onError(err: any) {
    this.toastService.show(err.error.message, ToastType.ERROR);
  }

  // Handle Sign Up
  onSignUp(): void {
    if (this.password !== this.confirmPassword) {
      this.toastService.show('Passwords do not match', ToastType.WARNING);
      return;
    }
    this.authService.signUp(this.name, this.email, this.password).subscribe({
      next: (response) => this.onSuccess(response),
      error: (err) => this.onError(err),
    });
  }
}
