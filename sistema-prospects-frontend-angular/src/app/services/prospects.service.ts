import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* ============================================
   INTERFACE - Modelo do Prospect
   ============================================ */
export interface Prospect {
  id: number;
  username: string;
  name: string | null;
  avatarUrl: string | null;
  bio: string | null;
  email: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  githubId: number | null;
  githubUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/* ============================================
   INTERFACE - DTO para criar prospect
   ============================================ */
export interface CreateProspectDto {
  username: string;
}

/* ============================================
   INTERFACE - DTO para atualizar prospect
   ============================================ */
export interface UpdateProspectDto {
  name?: string;
  bio?: string;
  email?: string;
  location?: string;
  company?: string;
  blog?: string;
}

/* ============================================
   SERVIÇO - Comunicação com API de Prospects
   ============================================ */
@Injectable({
  providedIn: 'root',
})
export class ProspectsService {
  // URL base da API
  private readonly apiUrl = 'http://localhost:3000/api/prospects';

  constructor(private http: HttpClient) {}

  /* ============================================
     GET - Lista todos os prospects
     ============================================ */
  getAll(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(this.apiUrl);
  }

  /* ============================================
     GET - Busca prospect por ID
     ============================================ */
  getById(id: number): Observable<Prospect> {
    return this.http.get<Prospect>(`${this.apiUrl}/${id}`);
  }

  /* ============================================
     GET - Busca prospects por termo
     ============================================ */
  search(query: string): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${this.apiUrl}?search=${query}`);
  }

  /* ============================================
     POST - Cria novo prospect via username GitHub
     ============================================ */
  create(dto: CreateProspectDto): Observable<Prospect> {
    return this.http.post<Prospect>(this.apiUrl, dto);
  }

  /* ============================================
     PUT - Atualiza dados de um prospect
     ============================================ */
  update(id: number, dto: UpdateProspectDto): Observable<Prospect> {
    return this.http.put<Prospect>(`${this.apiUrl}/${id}`, dto);
  }

  /* ============================================
     POST - Atualiza dados do GitHub
     ============================================ */
  refresh(id: number): Observable<Prospect> {
    return this.http.post<Prospect>(`${this.apiUrl}/${id}/refresh`, {});
  }

  /* ============================================
     DELETE - Remove um prospect
     ============================================ */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
