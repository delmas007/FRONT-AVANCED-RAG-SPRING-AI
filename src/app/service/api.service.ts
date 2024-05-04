import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host = 'http://localhost:7788';

  constructor(private http: HttpClient) {}

  envoyerFichiers(formData: FormData,extension:String): Observable<any> {
    return this.http.post<any>(`${this.host}/fichier/${extension}`,formData);
  }

  question(question: String): Observable<any> {
    return this.http.get<any>(`${this.host}/rag/?query=${question}`);
  }

}
