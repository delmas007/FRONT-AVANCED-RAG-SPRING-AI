import {Component, inject, Injector} from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ApiService} from "../service/api.service";
import {Utilisateur} from "../Model/utilisateur";

@Component({
  selector: 'app-rag',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './rag.component.html',
  styleUrl: './rag.component.css'
})
export class RagComponent {
  files: File[] = [];
  invalidFiles: File[] = [];
  inputLabel = 'Choisir des fichiers';
  loader: boolean = false;
  currentAction : any='';

  actions : Array<any> = [
    { nom : 'pdf' , type : '.pdf' , icon :'bi bi-file-pdf-fill',nav : 'nav-link'},
    { nom : 'powerpoint' , type : '.pptx' , icon :'bi bi-file-earmark-slides-fill',nav : 'nav-link'},
    { nom : 'excel' , type : '.xlsx' , icon :'bi bi-file-earmark-spreadsheet-fill',nav : 'nav-link'},
    { nom : 'word' , type : '.docx' , icon :'bi bi-file-earmark-word-fill',nav : 'nav-link'}
  ]
  constructor(private apiService: ApiService) {

  }
  setCurrentAction (action : any){
    this.currentAction=action;
  }

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const newFiles = Array.from(input.files);

      // Obtenir l'extension autorisée à partir de l'action actuelle
      const allowedExtensions = [this.currentAction.type.toLowerCase()];

      // Filtrer les fichiers non autorisés
      this.invalidFiles = newFiles.filter(
        (file) => !allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );

      if (this.invalidFiles.length > 0) {
        // Affiche le message d'erreur pour les fichiers invalides
        console.log('Les fichiers non autorisés:', this.invalidFiles);
      }

      // Garder seulement les fichiers autorisés
      const validFiles = newFiles.filter(
        (file) => allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );

      // Ajout des fichiers valides à la liste des fichiers
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
  envoyerFichiers() {
    this.loader = true;
    if (this.files && this.files.length > 0) {
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append('files', file);
      });
      let  user :Utilisateur = {id :'dda5dec1-39f5-4344-a962-dc2e7a63e546',username:'',password:'',nom:'',prenom:'',email:''}
      this.apiService.envoyerFichiers(formData,this.currentAction.type,user).subscribe({
        next: (response) => {
          console.log('Réponse:', response);
          formData.delete('files');
          this.loader = false;
          this.apiService.Affquestion = true;
        },
        error: (error) => {
          console.error('Erreur:', error); // Affichez l'erreur
          this.loader = false;
        },
      });
    }

  }
}
