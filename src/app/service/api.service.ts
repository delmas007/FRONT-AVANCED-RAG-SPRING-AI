import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {Utilisateur} from "../Model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Affquestion: boolean = false;

  private host = 'http://localhost:7788';

  constructor(private http: HttpClient) {}

  envoyerFichiers(formData: FormData,extension:String): Observable<any> {
    return this.http.post<any>(`${this.host}/fichier/${extension}`,formData);
  }

  // async question(question: String){
  //   return await firstValueFrom(this.http.get<any>(`${this.host}/rag/?query=${question}`));
  // }

  // async question(question: String) {
  //   return await firstValueFrom(
  //     this.http.get<string>(`${this.host}/rag/?query=${question}`, {
  //       responseType: 'json', // Corrigez ici
  //     })
  //   );
  // }
  async question(question: string) {
    return await firstValueFrom(
      this.http.get<any>(`${this.host}/rag/?query=${encodeURIComponent(question)}`, {
        responseType: 'json',
      })
    );
  }

  async Login(username: string, password: string): Promise<any> {
    const body = { username: username, password: password };

    return await firstValueFrom(
      this.http.post<any>(`${this.host}/connexion`, body)
    );
  }

  async registration(donnee:Utilisateur): Promise<any> {
    return await firstValueFrom(
      this.http.post<Utilisateur>(`${this.host}inscription?role=USER`, donnee)
    );
  }
}
