import {environment} from '../../../environments/environment';
import {PublicationInterface} from '../../interfaces/publication-interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Publication} from '../../classes/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  path = environment.apiRoutes;

  constructor(private Http: HttpClient) {
  }

  public getUserID(): Observable<any> {
    return this.Http.get(this.path + `getId`);
  }

  public getAllPosts(): Observable<any> {
    return this.Http.get(this.path + 'show/publication');
  }

  public getPostID(publicacion: { user_id: number; id: number; title: string; content: string }): Observable<any> {
    return this.Http.get<PublicationInterface[]>(this.path + `show/publication/id?id=${publicacion.id}`);
  }

  public getPostTitle(publicacion: { user_id: number; id: number; title: string; content: string }): Observable<any> {
    return this.Http.get<PublicationInterface[]>(this.path + `show/publication/title?title=${publicacion.title}`);
  }

  public addNewtPost(publicacion: PublicationInterface): Observable<any> {
    return this.Http.post(environment.apiRoutes + `insert/publication`, publicacion);
  }

  public upTitlePost(publicacion: PublicationInterface): Observable<any> {
    const path = environment.apiRoutes + `update/publication/title/`;
    return this.Http.put<PublicationInterface>(path, publicacion);
  }

  public upContentPost(publicacion: PublicationInterface): Observable<any> {
    const path = environment.apiRoutes + `update/publication/text/`;
    return this.Http.put<PublicationInterface>(path, publicacion);
  }

  public deletePost(publicacion: Publication): Observable<any> {
    const path = environment.apiRoutes + `delete/publication?id=${publicacion.id}`;
    return this.Http.delete(path);
  }
}
