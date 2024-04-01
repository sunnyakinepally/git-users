import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'git-users', component: HomeComponent },
  { path: 'git-users/search', component: SearchComponent },
  { path: 'git-users/History', component: HistoryComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
