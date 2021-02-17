import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Image} from '../../classes/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  saveImage(image: FormData, id: number): Observable<FormData> {
    console.log(id);
    return this.http.post<FormData>(`${environment.apiRoutes}uploadImage?id=${id}`, image);
  }

  getFileData(id: number): Observable<Image> {
    return this.http.get<Image>(`${environment.apiRoutes}getImageID?id=${id}`);
  }

  getFile(id: number): Observable<File> {
    return this.http.get<File>(`${environment.apiRoutes}getImage?id=${id}`);
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}delete/commentary?id=${id}`);
  }

}
