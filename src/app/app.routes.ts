import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailsComponent } from './features/details/details.component';
import { SearchComponent } from './features/search/search.component';
import { UserComponent } from './features/user/user.component';
import { TvShowsComponent } from './features/tv-shows/tv-shows.component';
import { MoviesComponent } from './features/movies/movies.component';
import { PopularComponent } from './features/popular/popular.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';
import { MoviesShowsMoreInformationModalComponent } from './shared/components/movies-shows-more-information-modal/movies-shows-more-information-modal.component';
import { TestComponent } from './shared/test/test.component';

export const routes: Routes = [
    {path : "", component : HomeComponent},
    {path : "details/:id", component : DetailsComponent},
    {path : "search", component : SearchComponent},
    {path : "user", component : UserComponent},
    {path : "tv-shows", component : TvShowsComponent},
    {path : "movies", component : MoviesComponent},
    {path : "popular", component : PopularComponent},
    {path : "watchlist", component : WatchlistComponent},

    // TEST Components
    {path: "modal-test", component: MoviesShowsMoreInformationModalComponent},
    {path: "test", component: TestComponent}
];

