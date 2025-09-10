import { Component } from '@angular/core';
import { RagService } from '../../services/rag.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  standalone: true,
  styleUrl: './file-upload.css'
})
export class FileUpload {
  selectedFiles: File[] = [];
  isDragOver = false;
  isUploading = false;

  constructor(private ragService: RagService, private state: StateService) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const files = Array.from(event.dataTransfer?.files || []);
    this.addFiles(files);
  }

  onFileSelect(event: any): void {
    const files: any = Array.from(event.target.files);
    this.addFiles(files);
  }

  private addFiles(files: File[]): void {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    const validFiles = files.filter(file =>
      allowedTypes.includes(file.type) ||
      file.name.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i)
    );

    this.selectedFiles = [...this.selectedFiles, ...validFiles];
  }

  removeFile(fileToRemove: File): void {
    this.selectedFiles = this.selectedFiles.filter(file => file !== fileToRemove);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) return;

    this.isUploading = true;
    this.ragService.uploadFiles(this.selectedFiles).subscribe({
      next: () => {
        this.isUploading = false;
        this.selectedFiles = [];
        this.state.setAuthState({ fileUploaded: true }); // Mise à jour directe de l'état
      },
      error: (error) => {
        this.isUploading = false;
        console.error('Erreur lors du téléchargement:', error);
        alert('Erreur lors du téléchargement des fichiers');
      }
    });
  }
}
