import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {QueryDTO} from '../component/models/message.model';
import {Utilisateur2} from "../component/models/utilisateur2";
import {Utilisateur} from "../component/models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private readonly baseUrl = '/host/api/v1/rag';
  private readonly baseUrlAuth = '/host/api/v1/auth';

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[]): Observable<void> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    console.log(formData.get('files'));
    return this.http.post<void>(`${this.baseUrl}/file`, formData);
  }

  askQuestion(query: string): Observable<string> {
    const queryDTO: QueryDTO = { query };
    return this.http.post(`${this.baseUrl}/ask`, queryDTO, {
      responseType: 'text'
    });
  }

  async registration(donnee : Utilisateur2): Promise<any> {
    return await firstValueFrom(
      this.http.post<Utilisateur>(`${this.baseUrlAuth}/inscription`, donnee)
    );
  }

  async resendMail(email: string):Promise<any> {
    return await firstValueFrom (
        this.http.post<any>(`${this.baseUrlAuth}/resendMail`,email)
    );
  }

  async Verification(code: string): Promise<any> {
    const body = { code: code };

    return await firstValueFrom(
        this.http.post<any>(`${this.baseUrlAuth}/activation`, body)
    );
  }

  async Login(username: string, password: string): Promise<any> {
    const body = { username: username, password: password };

    return await firstValueFrom(
        this.http.post<any>(`${this.baseUrlAuth}/connexion`, body)
    );
  }

  async codeMotDePasse(email: string): Promise<any> {
    const body = { email: email };

    return await firstValueFrom(
        this.http.post<any>(`${this.baseUrlAuth}/modifierMotDePasse`, body)
    );
  }

  async nouveauMotDePasse(email: string,code :string,password :string): Promise<any> {
    const body = {
      email: email,
      code: code,
      password: password
    };

    return await firstValueFrom(
        this.http.post<any>(`${this.baseUrlAuth}/NouveauMotDePasse`, body)
    );
  }
}
