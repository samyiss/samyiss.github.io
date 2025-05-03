import { Routes } from '@angular/router';
import { AboutComponent } from "./about/about.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContactComponent } from "./contact/contact.component";
import { ResumeComponent } from "./resume/resume.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {ProjectsComponent} from "./projects/projects.component";
import {ErasAlbumComponent} from "./eras-album/eras-album.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:id', component: ErasAlbumComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent }
];
