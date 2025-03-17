import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = environment.baseUrl + '/auth';

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string) {
    return this.http.post(this.endpoint + '/login', { email, password });
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post(this.endpoint + '/sign-up', { name, email, password });
  }

}
