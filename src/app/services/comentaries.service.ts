import { Injectable } from '@angular/core';
import { Comentary} from '../interfaces/comentary';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentariesService {

  constructor(private http: HttpClient) { }

  createCommentary(commentary:Comentary){
    return this.http.post(`${environment.api}create/commentary`,commentary)
  }

  showCommentary(){
    return this.http.get<Comentary[]>(`${environment.api}show/comments`)
  }


  getCommentary(){
    return this.http.get(`${environment.api}show/commentary` )
  }

  deleteCommentary(){
    return this.http.delete(`${environment.api}delete/commentary`)
  }

}
