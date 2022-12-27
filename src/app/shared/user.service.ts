import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject,Observable,observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) { }
  public subject=new BehaviorSubject<any>('');
  getallusers() {
    return this.http.get('https://api.github.com/users')
  }
  getuser(USERNAME: any) {

    return this.http.get('https://api.github.com/users/' + USERNAME)
  }
  searchuser(name: any,ishistory:any) {
    let searcharray = [];
    let queryParams = new HttpParams();
    let url = "https://api.github.com/search/users?q=" + name
    queryParams = queryParams.append('q', name);
   
    if (localStorage.getItem('searched')) {
      searcharray = JSON.parse(localStorage.getItem('searched') as string);
      searcharray = [...searcharray, { name, url }]
    } else {
      searcharray = [{ name, url }]
    }
    if(!ishistory){
      localStorage.setItem('searched', JSON.stringify(searcharray))

    }
    return this.http.get('https://api.github.com/search/users', { params: queryParams })

  }

  emit<t>(data:any,name:any){
    this.subject.next({data:data,name:name})
  }
  on<t>():Observable<t>{
    return this.subject.asObservable();
  }

}
