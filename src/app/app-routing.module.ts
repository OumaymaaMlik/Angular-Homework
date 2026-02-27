import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListSuggestionComponent } from './features/suggestions/list-suggestion/list-suggestion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',component: HomeComponent},
  {path:'adduser',component:UserFormComponent},
  
{ path: 'listsugg',component: ListSuggestionComponent},
  { path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
{ path: '**',component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }