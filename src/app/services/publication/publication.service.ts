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
  public getPostTitle(publicacion:PublicationInterface){
    return this.Http.get(environment.api+`api/v1/show/publication/title`)
  }
  public addNewtPost(publicacion:PublicationInterface){
    return this.Http.post(environment.api+`api/v1/insert/publication`,publicacion);
  }
  public upTitlePost(publicacion:PublicationInterface){
    const path = environment.api+`api/v1/update/publication/title/`
    return this.Http.put<PublicationInterface>(path,publicacion)
  }
  public upContentPost(publicacion:PublicationInterface){
    const path = environment.api+`api/v1/update/publication/text/`
    return this.Http.put<PublicationInterface>(path,publicacion)
  }
  //Help
  public deletePost(publicacion:PublicationInterface){
    const path = environment.api+`api/v1/delete/publication/`
    return this.Http.delete(path)
  }
}
