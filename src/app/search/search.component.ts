import { Component, DoCheck, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Validators, FormGroup, FormBuilder, FormControl, } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'FindThyCity';
  searchedKeyword: any;
  filterResultDataSet: any = []
  isActive!: boolean;
  filtereduser: any;
  search!: FormGroup;
  item: any;
  selectedIcon: any;
  chosenMod: string = "";
  public clicked: { [key: number]: boolean } = {};
  favorite: any = [];
  users: any;
  found: any;
  index: any;
  filterResultDataSet2: any;
  ishistory: boolean = false
  searchname: any;
  constructor(private userservice: UserService, private fb: FormBuilder,) {

  }
  ngOnInit(): void {
    this.userservice.on<any>().subscribe(data => {
      // console.log("items", data.name)
      if(data){
        this.filterResultDataSet2 = data.data.items
        this.searchname=data.name
     }
      
    });
    this.getusers();
    this.initusernameForm();
    if(this.searchname){
      this.updatingsearchname(this.searchname)

    }
  }
 

  initusernameForm() {
    this.search = this.fb.group({
      username: ["", [Validators.required]],
    })
  }
  updatingsearchname(searchname: any) {
    this.search = this.fb.group({
      username:this.searchname,
    })
  }
  clearinputvalue() {
    this.search.controls['username'].reset()
    this.getusers()
  }

  getusers() {
    this.userservice.getallusers().subscribe((res: any) => {
      this.filterResultDataSet = res
      if (this.filterResultDataSet2) {
        this.filterResultDataSet = this.filterResultDataSet2      
      }
      
      this.checkingFavourite();
    })

  }
  searchuser() {
    let username = this.search.value.username
    // console.log("username",username)
    this.userservice.searchuser(username, this.ishistory).subscribe((res: any) => {
      console.log("username", res)
      this.filterResultDataSet = res.items
    }, (error) => {
      this.getusers()
    })

  }
  checkingFavourite() {
    this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
    this.filterResultDataSet = this.filterResultDataSet.map((data: any) => {
      this.found = this.favorite.find((element: any) => element.login == data.login)
      if (this.found) {
        if (data.login == this.found.login) {
          return { ...data, heart: true };
        }
      } else {
        return { ...data, heart: false };

      }
    })
  }
  onToggle(i: any) {
    // window.location.reload()
    setTimeout(() => {
      this.getusers()
    },100);
    this.favorite = [];
    this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
    if (localStorage.getItem('favorite')) {
      this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
      this.favorite = [...this.favorite, i]
    } else {
      this.favorite = [i]
    }
    localStorage.setItem('favorite', JSON.stringify(this.favorite))
  }


  removed(i: any) {
    this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
    let index = this.favorite.findIndex((e: any) => e.id == i.id);
    if (index !== -1) {
      this.favorite.splice(index, 1)
    }
    this.favorite = [...this.favorite]
    localStorage.setItem('favorite', JSON.stringify(this.favorite))
    window.location.reload()
  }

  getuser(USERNAME: any) {
    this.userservice.getuser(USERNAME).subscribe((res: any) => {
      this.filtereduser = res
      console.log("res", this.filtereduser)
    })
  }


  Sort() {
    switch (this.chosenMod) {
      case "All": {
        this.getusers()
        break;
      }
      case "Name": {
        this.users = this.filterResultDataSet;
        this.users.sort((a: any, b: any) => a.login < b.login ? -1 : 1)

        break;
      }
      case "Favorite": {
        this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
        this.filterResultDataSet = this.favorite
        this.checkingFavourite();
        console.log("favo", this.favorite)
        break;
      }

    }
  }



}
