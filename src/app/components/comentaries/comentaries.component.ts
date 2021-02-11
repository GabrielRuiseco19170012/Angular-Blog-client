import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ComentariesService} from '../../services/comentaries/comentaries.service';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {PublicationInterface} from '../../interfaces/publication-interface';
import {Publication} from '../../classes/publication';
import {Commentary} from '../../classes/comment';
import {openClose, showHide} from '../../animations/open-close';

@Component({
  selector: 'app-comentaries',
  templateUrl: './comentaries.component.html',
  styleUrls: ['./comentaries.component.css'],
  animations: [
    openClose,
    showHide
  ]
})
export class ComentariesComponent implements OnInit, OnChanges {

  @Input() data: Array<PublicationInterface>;
  @Input() details: Publication;

  comment: Commentary = new Commentary();

  status = true;
  statusCom = false;
  formComment = new FormControl('');

  comms: Array<Commentary>;

  constructor(private commentaryService: ComentariesService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getUserDetails().subscribe(data => {
      this.comment.user_id = data.id;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.details.currentValue !== changes.details.previousValue) {
      this.getCommentariesByP();
    }
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

        this.getCommentariesByP();
      },
      err => console.log(err)
    );
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
