import {Injectable} from '@angular/core';
import {Comentary} from '../../interfaces/comentary';
import {HttpClient} from '@angular/common/http';
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
    return this.http.get(`${environment.apiRoutes}show/comments`);
  }


  getCommentaryByPub(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}show/publication/comments?id=${id}`);
  }

  deleteCommentary(id: number): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}delete/commentary?id=${id}`);
  }

  updateCommentary(commentary: Comentary){
    return this.http.put(`${environment.apiRoutes}update/comment`,commentary)
  }

}
