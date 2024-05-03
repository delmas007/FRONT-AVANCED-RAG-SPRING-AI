import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host = 'http://localhost:7788';

  constructor(private http: HttpClient) {}

  envoyerFichiersWord(fichiers: File[]): Observable<any> {
    const formData = new FormData();
    fichiers.forEach((fichier, index) => {
      formData.append(`word_${index}`, fichier);
    });

    return this.http.post<any>(`${this.host}/fichiers/word`, formData);
  }

  envoyerFichiersExcel(fichiers: File[]): Observable<any> {
    const formData = new FormData();
    fichiers.forEach((fichier, index) => {
      formData.append(`excel_${index}`, fichier);
    });

    return this.http.post<any>(`${this.host}/fichiers/excel`, formData);
  }

  envoyerFichiersPowerPoint(fichiers: File[]): Observable<any> {
    const formData = new FormData();
    fichiers.forEach((fichier, index) => {
      formData.append(`powerpoint_${index}`, fichier);
    });

    return this.http.post<any>(`${this.host}/fichiers/powerpoint`, formData);
  }

  envoyerFichiersPDF(fichiers: File[]): Observable<any> {
    const formData = new FormData();
    fichiers.forEach((fichier, index) => {
      formData.append(`pdf_${index}`, fichier);
    });

    return this.http.post<any>(`${this.host}/fichiers/pdf`, formData);
  }
}
