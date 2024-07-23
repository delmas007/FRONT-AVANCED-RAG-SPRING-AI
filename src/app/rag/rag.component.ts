import {Component, inject, Injector} from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../service/api.service";
import {Utilisateur} from "../Model/utilisateur";
import {StateService} from "../service/state.service";

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
  currentAction: any = '';
  totalFileSizeExceeded: boolean = false;  // Propriété pour suivre si la taille totale dépasse la limite
  errorMessage: string = '';  // Propriété pour stocker les messages d'erreur
  private timeoutHandle: any;

  actions: Array<any> = [
    { nom: 'pdf', type: '.pdf', icon: 'bi bi-file-pdf-fill', nav: 'nav-link' },
    { nom: 'powerpoint', type: '.pptx', icon: 'bi bi-file-earmark-slides-fill', nav: 'nav-link' },
    { nom: 'excel', type: '.xlsx', icon: 'bi bi-file-earmark-spreadsheet-fill', nav: 'nav-link' },
    { nom: 'word', type: '.docx', icon: 'bi bi-file-earmark-word-fill', nav: 'nav-link' }
  ];

  constructor(private apiService: ApiService, private state: StateService, private router: Router) {}

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const newFiles = Array.from(input.files);

      // Calculer la taille totale des fichiers
      const totalSize = newFiles.reduce((sum, file) => sum + file.size, 0);
      const maxSize = 2_000_000;  // Taille maximale en octets (2 Mo)

      if (totalSize > maxSize) {
        this.totalFileSizeExceeded = true;
        this.errorMessage = 'Un ou plusieurs fichiers dépassent la taille maximale autorisée de 2 Mo.';
        this.files = [];  // Réinitialiser la liste des fichiers
        this.inputLabel = 'Choisir des fichiers';
        clearTimeout(this.timeoutHandle);
        this.timeoutHandle = setTimeout(() => {
          this.loader = false;  // Réinitialiser le loader après 30 secondes
        }, 30_000);  // 30 secondes en millisecondes
        return;  // Arrêter le traitement si la taille totale dépasse la limite
      } else {
        this.totalFileSizeExceeded = false;
        this.errorMessage = '';
      }

      // Obtenir l'extension autorisée à partir de l'action actuelle
      const allowedExtensions = [this.currentAction.type.toLowerCase()];

      // Filtrer les fichiers invalides
      this.invalidFiles = newFiles.filter(
        (file) => !allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );

      // Garder seulement les fichiers valides
      const validFiles = newFiles.filter(
        (file) => allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );

      // Ajouter les fichiers valides à la liste des fichiers
      this.files = [...this.files, ...validFiles];
      this.inputLabel = 'Fichiers ajoutés';
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    if (this.files.length === 0) {
      this.inputLabel = 'Choisir des fichiers';
      this.totalFileSizeExceeded = false;  // Réinitialiser l'état si tous les fichiers sont supprimés
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

    if (this.files && this.files.length > 0) {
      // Calculer la taille totale des fichiers
      const totalSize = this.files.reduce((sum, file) => sum + file.size, 0);
      const maxSize = 2_000_000;  // Taille maximale en octets (2 Mo)

      if (totalSize > maxSize) {
        this.errorMessage = 'Un ou plusieurs fichiers dépassent la taille maximale autorisée de 2 Mo.';
        clearTimeout(this.timeoutHandle);
        this.timeoutHandle = setTimeout(() => {
          return;  // Réinitialiser le loader après 30 secondes
        }, 50_000);  // 30 secondes en millisecondes
        return;
      }
      this.loader = true;

      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append('files', file);
      });

      let user: Utilisateur = { id: this.state.authState.id, username: '', password: '', nom: '', prenom: '', email: '' };
      this.apiService.envoyerFichiers(formData, this.currentAction.type, user).subscribe({
        next: (response) => {
          formData.delete('files');
          this.loader = false;
          this.apiService.Affquestion = true;
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.errorMessage = 'Erreur lors de l\'envoi des fichiers.';
          this.loader = false;
        },
      });
    } else {
      this.loader = false;
      this.errorMessage = 'Aucun fichier à envoyer.';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.state.setAuthState({
      iid: undefined,
      isAuthenticated: false,
      username: undefined,
      role: undefined,
      name: undefined,
      prenom: undefined,
      email: undefined,
    });
    this.router.navigate(['/connexion']);
  }
}







