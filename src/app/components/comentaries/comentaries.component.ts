import { Component, HostBinding, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ComentariesService} from '../../services/comentaries.service';
import {Comentary} from '../../interfaces/comentary'
@Component({
  selector: 'app-comentaries',
  templateUrl: './comentaries.component.html',
  styleUrls: ['./comentaries.component.css']
})
export class ComentariesComponent implements OnInit {

  @HostBinding('class') classes ='row';

  commentary: Comentary =
  {
    id:0,
    title:'',
    content:'',
    publication_id:0,
    user_id:0,
  };

  comms:Array<Comentary>
  
  constructor(private commentaryService:ComentariesService) { }

  ngOnInit(): void {
   this.getAllCommentaries()
  }

  savedCommentary(): void {
    delete this.commentary.id;
    this.commentaryService.createCommentary(this.commentary).subscribe(
      resp => {console.log(resp);},
      err => console.log(err)
    )
  }

  getAllCommentaries(){
    this.commentaryService.showCommentary().subscribe(
      res => console.log(res),
      erro => console.log(erro)
    )
      /*res => {
        this.comms=res;
      },
      erro => console.log(erro)
    ) */
  }

}
