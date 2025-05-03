import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {Gallery} from '../../interfaces/Gallery.interface'
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "../api.service";
import {LoadingComponent} from "../loading/loading.component";
import { MatDialog } from '@angular/material/dialog';
import { Input } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-eras-album',
  standalone: true,
  imports: [
    NgIf, RouterLink, RouterLinkActive, NgForOf,
    NgOptimizedImage, HttpClientModule
  ],
  templateUrl: './eras-album.component.html',
  styleUrl: './eras-album.component.scss'
})

export class ErasAlbumComponent implements OnInit {
  showCount: boolean = false;

  listPictures: Gallery[] = [];
  pageId: string = ""

  previewImage: boolean = false;
  showMask: boolean = false;
  currentImage!: Gallery;
  currentIndex: number = 0;
  controls: boolean = true;
  totalImageCount: number = 0;
  constructor(private apiService: ApiService, private route: ActivatedRoute, public dialog: MatDialog, private app: AppComponent) {}

  ngOnInit(): void {
    this.openLoadingOverlay();

    this.route.params.subscribe(params => {
      this.pageId = params['id']; // Access route parameters

      // Depending on the pageId, you can adjust behavior, load data, etc.
      this.apiService.getAlbum().subscribe((gallery) => {
        this.listPictures = gallery[this.pageId]
        this.totalImageCount = this.listPictures.length;
      })
    });

    setTimeout(() => {
      this.closeLoadingOverlay();
    }, 4000);
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

  onPreviewImage(index: number): void {
    this.app.showNavbar = false;
    this.showMask = true;
    this.showCount = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentImage = this.listPictures[index];
  }

  closePreview(): void {
    this.app.showNavbar = true;
    this.showMask = false;
    this.previewImage = false;
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  next(): void {
    if (this.currentIndex < this.listPictures.length - 1) {
      this.currentIndex++;
      this.currentImage = this.listPictures[this.currentIndex];
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentImage = this.listPictures[this.currentIndex];
    }
  }
}

