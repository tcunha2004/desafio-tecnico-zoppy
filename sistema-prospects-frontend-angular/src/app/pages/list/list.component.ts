import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* ============================================
   INTERFACE - Definição do tipo Prospect (List)
   ============================================ */
interface ProspectItem {
  username: string;
  avatarUrl: string;
  name?: string;
  bio?: string;
  email?: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  // Valor do campo de busca
  searchQuery: string = '';

  /* ============================================
     ESTADO DO MODAL - Detalhes do Prospect
     ============================================ */
  isDetailsModalOpen: boolean = false;
  selectedProspect: ProspectItem | null = null;

  /* ============================================
     DADOS - Lista de prospects
     ============================================ */
  prospects: ProspectItem[] = [
    {
      username: 'tcunha2004',
      avatarUrl: 'https://github.com/tcunha2004.png',
      name: 'Thiago Cunha',
      bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovação.',
      email: 'thiago.cunha@email.com',
    },
    {
      username: 'arturssmirnovs',
      avatarUrl: 'https://github.com/arturssmirnovs.png',
      name: 'Arturs Smirnovs',
      bio: 'Software Engineer | Open Source Enthusiast',
      email: 'arturs@email.com',
    },
  ];

  constructor(private router: Router) {}

  /* ============================================
     NAVEGAÇÃO - Volta para a página inicial
     ============================================ */
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  /* ============================================
     MODAL DETALHES - Abre o modal com detalhes do prospect
     ============================================ */
  openDetailsModal(prospect: ProspectItem): void {
    this.selectedProspect = prospect;
    this.isDetailsModalOpen = true;
  }

  /* ============================================
     MODAL DETALHES - Fecha o modal de detalhes
     ============================================ */
  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedProspect = null;
  }
}
