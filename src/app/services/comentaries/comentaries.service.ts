import {Injectable} from '@angular/core';
import {Comentary} from '../../interfaces/comentary';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariesService {

  constructor(private http: HttpClient) {
  }

  createCommentary(commentary: Comentary): Observable<any> {
    return this.http.post(`${environment.apiRoutes}create/commentary`, commentary);
  }

  showCommentary(): Observable<any> {
    return this.http.get<Comentary[]>(`${environment.apiRoutes}show/comments`);
  }


  getCommentary(): Observable<any> {
    return this.http.get(`${environment.apiRoutes}show/commentary`);
  }

  deleteCommentary(): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}delete/commentary`);
  }

}
