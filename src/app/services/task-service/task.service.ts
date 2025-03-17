import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint: string = environment.baseUrl + '/tasks';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.endpoint);
  }

  addTask(task: any) {
    return this.http.post(this.endpoint, task);
  }

  updateTask(task: any) {
    return this.http.put(this.endpoint + '/' + task._id, task);
  }

  deleteTask(task: any) {
    return this.http.delete(this.endpoint + '/' + task);
  }

}
