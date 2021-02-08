import {environment} from './../../../environments/environment';
import {PublicationInterface} from './../../interfaces/publication-interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  path = environment.apiRoutes;

  constructor(private Http: HttpClient) {
  }

  public getAllPosts(): Observable<any> {
    return this.Http.get<PublicationInterface[]>(this.path + 'show/publication');
  }

  /*public addNewtPost(publication:PublicationInterface){
    return this.Http.post(this.path+`insert/publication`,publication);
  }*/
  public getPostTitle(publication: PublicationInterface): Observable<any> {
    return this.Http.get(environment.apiRoutes + `show/publication/title`);
  }

  public addNewtPost(publication: PublicationInterface): Observable<any> {
    return this.Http.post(environment.apiRoutes + `insert/publication`, publication);
  }

  public upTitlePost(publication: PublicationInterface): Observable<any> {
    const path = environment.apiRoutes + `update/publication/title/`;
    return this.Http.put<PublicationInterface>(path, publication);
  }

  public upContentPost(publication: PublicationInterface): Observable<any> {
    const path = environment.apiRoutes + `update/publication/text/`;
    return this.Http.put<PublicationInterface>(path, publication);
  }

  public deletePost(publication: PublicationInterface): Observable<any> {
    const path = environment.apiRoutes + `delete/publication/`;
    return this.Http.delete(path);
  }
}
