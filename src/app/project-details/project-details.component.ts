import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiService} from "../api.service";
import {Project} from "../../interfaces/Project.interface";

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})

export class ProjectDetailsComponent implements OnInit{
  project: Project = <Project>{};
  pageId: number = 0

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pageId = params['id']; // Access route parameters

      // Depending on the pageId, you can adjust behavior, load data, etc.
      this.apiService.getProjects().subscribe((projects: Project[]) => {
        this.project = projects.find(p => p.project_id == this.pageId)!!;
      })
    });
  }

}
