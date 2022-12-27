import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnChanges {
  filtereduser: any;
@Input() user:any
changes:any
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("changes",changes)
    this.filtereduser = changes['user'].currentValue
    // console.log("changes",this.filtereduser)

  }

  ngOnInit(): void {
  }

}
