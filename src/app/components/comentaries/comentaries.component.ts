import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ComentariesService} from '../../services/comentaries/comentaries.service';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {PublicationInterface} from '../../interfaces/publication-interface';
import {Publication} from '../../classes/publication';
import {Commentary} from '../../classes/comment';
import {openClose, showHide} from '../../animations/open-close';
import { PublicationService } from 'src/app/services/publication/publication.service';

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

  constructor(private commentaryService: ComentariesService, private auth: AuthService, private publicationService: PublicationService) {
  }

  ngOnInit(): void {
    this.auth.getUserDetails().subscribe(data => {
      this.comment.user_id = data.id;
    });
    this.details = {
      id: 0,
      user_id: 0,
      title: '',
      content: ''
    }
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

  deleteCommentary(id: number): void{
    this.commentaryService.deleteCommentary(id).subscribe(message =>{
      this.comms = this.comms.filter(x => x.id != id)
      console.log(message)

    })
  }

  updateCommentary(): void{
    this.commentaryService.updateCommentary(this.comment).subscribe(msg =>{
      console.log(msg)
    })
  }


  upTitlePost(): void {
    this.publicationService.upTitlePost(this.details).subscribe(nuevo => {
      console.log(nuevo);
    });
  }



}
