import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailsComponent } from './features/details/details.component';
import { SearchComponent } from './features/search/search.component';
import { UserComponent } from './features/user/user.component';

export const routes: Routes = [
    {path : "", component : HomeComponent},
    {path : "details/:id", component : DetailsComponent},
    {path : "search", component : SearchComponent},
    {path : "user", component : UserComponent},
];
