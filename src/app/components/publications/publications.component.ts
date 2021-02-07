import {AuthService} from '../../services/auth/auth.service';
import {PublicationService} from '../../services/publication/publication.service';
import {PublicationInterface} from '../../interfaces/publication-interface';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  id: string;
  user_id: string;
  title: string;
  content: string;

  publicaciones: PublicationInterface = {
    id: '',
    user_id: '',
    title: '',
    content: ''
  };
  arrayPublicaciones: Array<PublicationInterface>;

  constructor(private publicationService: PublicationService, private asd: AuthService) {
  }

  ngOnInit(): void {
    this.publicationService.getAllPosts().subscribe(all => {
        this.arrayPublicaciones = all;
      }
      , error => {
        console.error(error);
      });
  }

  addNewPost(): void {
    const newPublicacion = {
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };

  }

  upTitlePost() {
    const upTitle = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
  }

  upContentPost() {
    const upContent = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };

  }

  deletePost() {
    const deleteContent = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };

  }
}
