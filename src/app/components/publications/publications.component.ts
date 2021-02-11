import {PublicationService} from '../../services/publication/publication.service';
import {PublicationInterface} from '../../interfaces/publication-interface';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Comentary} from '../../interfaces/comentary';
import {FormControl} from '@angular/forms';
import {ComentariesService} from '../../services/comentaries/comentaries.service';
import {Publication} from '../../classes/publication';
import {openClose} from '../../animations/open-close';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  animations: [
    openClose
  ]
})
export class PublicationsComponent implements OnInit {

  buscador: boolean;
  alll: boolean;
  id: number;
  // tslint:disable-next-line:variable-name
  user_id: number;
  username: string;
  title: string;
  content: string;

  // importante
  selectedPublication: Publication = new Publication();
  //
  @Output() details = new EventEmitter<Publication>();

  commentary: Comentary =
    {
      id: 0,
      title: 'Title',
      content: '',
      publication_id: 0,
      user_id: 0,
    };
  status = true;
  formComment = new FormControl('');
  publicaciones: PublicationInterface = {
    id: 0,
    user_id: 0,
    title: '',
    content: ''
  };

  arrayByTitle: Array<Publication>;
  arrayPublicaciones: Array<Publication>;

  constructor(private commentaryService: ComentariesService, private publicationService: PublicationService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getUserDetails().subscribe(data => {
      this.user_id = data.id;
      this.username = data.username;
      this.commentary.user_id = data.id;
    });
    this.getAll();
  }

  openData(publication: Publication): void {
    this.details.emit(publication);
  }

  selectedPub(publication: Publication): void {
    this.selectedPublication = publication;
  }

  getAll(): void {
    this.publicationService.getAllPosts().subscribe(data => {
        for (const element of data) {
          this.auth.getUser(element.user_id).subscribe(d => {
            element.username = d.username;
            this.arrayPublicaciones = data;
            console.log(this.arrayPublicaciones);
          });
        }
      },
      err => console.log(err)
    );
  }

  editPublication(id): boolean {
    // tslint:disable-next-line:triple-equals
    return this.user_id == id;
  }

  getPostTitle(): void {
    const byTitle = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.buscador = true;
    this.alll = false;
    this.publicationService.getPostTitle(byTitle).subscribe(data => {
      for (const element of data) {
        this.auth.getUser(element.user_id).subscribe(d => {
          element.username = d.username;
          this.arrayByTitle = data;
          console.log(this.arrayPublicaciones);
        });
      }
    }, title => {
      console.log(title);
    });
  }

  addNewPost(): void {
    this.selectedPublication.user_id = this.user_id;
    this.publicationService.addNewtPost(this.selectedPublication).subscribe((nuevo) => {
      console.log(nuevo);
      this.getAll();
    });
    this.selectedPublication = new Publication();
  }

  upTitlePost(): void {
    this.publicationService.upTitlePost(this.selectedPublication).subscribe(nuevo => {
      console.log(nuevo);
    });
  }

  upContentPost(): void {
    this.publicationService.upContentPost(this.selectedPublication).subscribe(nuevo => {
      console.log(nuevo);
    });
  }

  deletePost(publication: Publication): void {
    this.publicationService.deletePost(publication).subscribe((borrado) => {
      console.log(borrado);
      this.arrayPublicaciones = this.arrayPublicaciones.filter(x => x !== publication);
    });
  }

}
