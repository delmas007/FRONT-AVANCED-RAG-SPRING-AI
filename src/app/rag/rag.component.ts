import { Component } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";

interface FileDetail {
  name: string;
  sizeMB: number;
  originalFile: File;
}

@Component({
  selector: 'app-rag',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './rag.component.html',
  styleUrl: './rag.component.css'
})
export class RagComponent {
  files: File[] = [];
  invalidFiles: File[] = [];
  inputLabel = 'Choisir des fichiers';

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const newFiles = Array.from(input.files);

      // Filtre les fichiers non autorisés
      const allowedExtensions = ['pdf', 'pptx', 'xlsx', 'docx'];
      this.invalidFiles = newFiles.filter(
        (file) => !allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );

      if (this.invalidFiles.length > 0) {
        // Affiche le message d'erreur pour les fichiers invalides
        console.log('Les fichiers non autorisés:', this.invalidFiles);
      }

      const validFiles = newFiles.filter(
        (file) => allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );

      this.files = [...this.files, ...validFiles];
      this.inputLabel = 'Fichiers ajoutés';
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    if (this.files.length === 0) {
      this.inputLabel = 'Choisir des fichiers';
    }
  }

  fileSizeInMb(size: number): string {
    return (size / 1_000_000).toFixed(2);
  }

  getIconClass(fileName: string): string {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return 'bi bi-file-pdf-fill';
    } else if (fileName.toLowerCase().endsWith('.pptx')) {
      return 'bi bi-file-earmark-slides-fill';
    } else if (fileName.toLowerCase().endsWith('.xlsx')) {
      return 'bi bi-file-earmark-spreadsheet-fill';
    } else if (fileName.toLowerCase().endsWith('.docx')) {
      return 'bi bi-file-earmark-word-fill';
    }
    return 'bi bi-file-earmark';
  }
}
