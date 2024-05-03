import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host = 'http://localhost:7788';

  constructor(private http: HttpClient) {}

  envoyerFichiersWord(formData: FormData): Observable<any> {
    console.log(formData)// La méthode accepte FormData
    return this.http.post<any>(`${this.host}/fichier/word`,formData); // Envoyer avec POST
  }

  envoyerFichiersExcel(fichiers: File[]): Observable<any> {
    const formData = new FormData();
    fichiers.forEach((fichier, index) => {
      formData.append(`excel_${index}`, fichier);
    });

    return this.http.post<any>(`${this.host}/fichier/excel`, formData);
  }

  envoyerFichiersPowerPoint(fichiers: File[]): Observable<any> {
    const formData = new FormData();
    fichiers.forEach((fichier, index) => {
      formData.append(`powerpoint_${index}`, fichier);
    });

    return this.http.post<any>(`${this.host}/fichier/powerpoint`, formData);
  }

  envoyerFichiersPDF(fichiers: File[]): Observable<any> {
    const formData = new FormData();
    fichiers.forEach((fichier, index) => {
      formData.append(`pdf_${index}`, fichier);
    });

    return this.http.post<any>(`${this.host}/fichier/pdf`, formData);
  }
}
