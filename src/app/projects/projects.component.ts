import { Component } from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Gallery} from "../../interfaces/Gallery.interface";
import {Project} from "../../interfaces/Project.interface";
import {LoadingComponent} from "../loading/loading.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../api.service";
import {Author} from "../../interfaces/Author.interface";
import {Tag} from "../../interfaces/Tag.interface";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  listeProjects: Project[] = [];

  constructor(private titleService: Title, public dialog: MatDialog, private apiService: ApiService) {
    this.openLoadingOverlay();
    this.titleService.setTitle("Projects - Samy Issiakhem");

    this.apiService.getProjects().subscribe((projects) => {
      this.listeProjects = projects
    })

    setTimeout(() => {
      this.closeLoadingOverlay();
    }, 1500);

  }


  openLoadingOverlay(): void {
    this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'loading-dialog-overlay'
    });
  }

  closeLoadingOverlay(): void {
    this.dialog.closeAll();
    this.scrollToTop()
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getAuthors(list: any[]): string {
    return list.map(({name}) => name).join(", ");
  }

  hasTag(tag: string, list: Tag[]): boolean {
    return list.find(({name}) => name.toLowerCase().includes(tag)) != null
  }

  redirect(id: string): void {
    return console.log(id)
  }
}
