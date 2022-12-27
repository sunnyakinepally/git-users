import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any;
  historylist: any;
  data: any;
  ishistory: boolean = true;
  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
    this.history = localStorage.getItem('searched')
    this.historylist = JSON.parse(this.history)

  }

  send(name: any) {
    // console.log("name",name)
    this.userservice.searchuser(name, this.ishistory).subscribe((res: any) => {
      this.data = res
      this.userservice.emit(this.data,name)
      this.router.navigate(['/search'])

    })
  }
  Clearsearchdata() {
    localStorage.removeItem('searched')
    window.location.reload()
  }
 
  onsubmit(i:any){
    let index = this.historylist.findIndex((e: any) => e.name == i);
    console.log("selected",i)
    if (index !== -1) {
      this.historylist.splice(index, 1)
    }
    this.historylist = [...this.historylist]
    localStorage.setItem('searched', JSON.stringify(this.historylist))
    window.location.reload()

  }

}
