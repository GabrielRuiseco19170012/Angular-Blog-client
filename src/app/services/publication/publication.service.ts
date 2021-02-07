import {environment} from './../../../environments/environment';
import {PublicationInterface} from './../../interfaces/publication-interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  path = environment.api
  constructor(private Http: HttpClient) { }
  public getUserID(){
    return this.Http.get(this.path+`api/v1/getId`)
  }
  public getAllPosts() {
    return this.Http.get<PublicationInterface[]>(this.path + 'api/v1/show/publication');
  }
  public getPostID(publicacion: PublicationInterface) {
    return this.Http.get<PublicationInterface[]>(this.path + `api/v1/show/publication/id?id=${publicacion.id}`);
  }
  public getPostTitle(publicacion: PublicationInterface) {
    return this.Http.get<PublicationInterface[]>(this.path + `api/v1/show/publication/title?title=${publicacion.title}`)
  }
  public addNewtPost(publicacion: PublicationInterface) {
    return this.Http.post(environment.api + `api/v1/insert/publication`, publicacion);
  }
  public upTitlePost(publicacion: PublicationInterface) {
    const path = environment.api + `api/v1/update/publication/title/`
    return this.Http.put<PublicationInterface>(path, publicacion)
  }
  public upContentPost(publicacion: PublicationInterface) {
    const path = environment.api + `api/v1/update/publication/text/`
    return this.Http.put<PublicationInterface>(path, publicacion)
  }
  public deletePost(publicacion: PublicationInterface) {
    const path = environment.api + `api/v1/delete/publication?id=${publicacion.id}`
    return this.Http.delete(path)
  }
}