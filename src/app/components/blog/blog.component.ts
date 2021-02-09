import { Component, OnInit } from '@angular/core';
import {Publication} from '../../classes/publication';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  data: Publication;
  id: number;

  constructor() { }

  ngOnInit(): void {
  }

  sendData(details: Publication): void {
    this.data = details;
  }
}
