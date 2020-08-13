import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() first: Boolean;
  @Input() last: Boolean;
  @Input() totalPages: Number;
  @Input() currentPage: Number;

  pages = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.first);
    console.log(this.last);
    console.log(this.totalPages);
    console.log(this.currentPage);
    this.pages = Array(5).fill(1).map((value, index) => index + 1);
    console.log(this.pages);
  }

  isSelectedPage(page) {
    return page == this.currentPage ? 'selected' : '';
  }

}
