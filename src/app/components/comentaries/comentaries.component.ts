import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ComentariesService} from '../../services/comentaries/comentaries.service';
import {Comentary} from '../../interfaces/comentary';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {PublicationInterface} from '../../interfaces/publication-interface';
import {Publication} from '../../classes/publication';
import {Commentary} from '../../classes/comment';

@Component({
  selector: 'app-comentaries',
  templateUrl: './comentaries.component.html',
  styleUrls: ['./comentaries.component.css']
})
export class ComentariesComponent implements OnInit {
  //
  // @HostBinding('class') classes = 'row';
  @Input() data: Array<PublicationInterface>;
  @Input() details: Publication;

  comment: Commentary = new Commentary();

  status = true;
  formComment = new FormControl('');

  comms: Array<Commentary>;

  constructor(private commentaryService: ComentariesService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getUserDetails().subscribe(data => {
      this.comment.user_id = data.id;
    });
  }

  getCommentariesByP(): void {
    this.commentaryService.getCommentaryByPub(this.details.id).subscribe(data => {
        this.comms = data;
        console.log(data);
      },
      err => console.log(err)
    );
  }

  savedCommentary(): void {
    delete this.comment.id;
    this.comment.publication_id = this.details.id;
    this.commentaryService.createCommentary(this.comment).subscribe(
      resp => {
        console.log(resp);
      },
      err => console.log(err)
    );
    this.getCommentariesByP();
  }

  getAllCommentaries(): void {
    this.commentaryService.showCommentary().subscribe(
      res => {
        this.comms = res;
        console.log(this.comms);
      },
      erro => console.log(erro)
    );
  }
}
