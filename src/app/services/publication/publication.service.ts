import { environment } from './../../../environments/environment';
import { PublicationInterface } from './../../interfaces/publication-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  path = environment.api
  constructor(private Http:HttpClient) { }
  public getAllPosts(){
    return this.Http.get<PublicationInterface[]>(this.path+'api/v1/show/publication');
  }
  /*public addNewtPost(publicacion:PublicationInterface){
    return this.Http.post(this.path+`api/v1/insert/publication`,publicacion);
  }*/
}
