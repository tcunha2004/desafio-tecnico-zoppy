import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Serviço e interface de Prospect
import { ProspectsService, Prospect } from '../../services/prospects.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  // Valor do campo de busca
  searchQuery: string = '';

  /* ============================================
     ESTADO DO MODAL - Detalhes do Prospect
     ============================================ */
  isDetailsModalOpen: boolean = false;
  selectedProspect: Prospect | null = null;

  /* ============================================
     ESTADO DO MODAL - Editar Prospect
     ============================================ */
  isEditModalOpen: boolean = false;
  editingProspect: Prospect | null = null;
  isUpdating: boolean = false;
  updateErrorMessage: string = '';

  /* ============================================
     ESTADO DO MODAL - Confirmar Exclusão
     ============================================ */
  isDeleteModalOpen: boolean = false;
  deletingProspect: Prospect | null = null;
  isDeleting: boolean = false;

  /* ============================================
     DADOS - Lista de prospects
     ============================================ */
  prospects: Prospect[] = [];
  allProspects: Prospect[] = []; // Lista completa para filtro
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private prospectsService: ProspectsService
  ) {}

  /* ============================================
     LIFECYCLE - Carrega dados ao iniciar
     ============================================ */
  ngOnInit(): void {
    this.loadProspects();
  }

  /* ============================================
     API - Carrega prospects do banco de dados
     ============================================ */
  loadProspects(): void {
    this.isLoading = true;
    this.prospectsService.getAll().subscribe({
      next: (data) => {
        this.allProspects = data;
        this.prospects = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar prospects:', err);
        this.isLoading = false;
      },
    });
  }

  /* ============================================
     BUSCA - Filtra prospects pelo nome/username
     ============================================ */
  filterProspects(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.prospects = this.allProspects;
      return;
    }

    this.prospects = this.allProspects.filter(
      (p) =>
        p.username.toLowerCase().includes(query) ||
        (p.name && p.name.toLowerCase().includes(query))
    );
  }

  /* ============================================
     NAVEGAÇÃO - Volta para a página inicial
     ============================================ */
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  /* ============================================
     MODAL DETALHES - Abre o modal com detalhes
     ============================================ */
  openDetailsModal(prospect: Prospect): void {
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

  /* ============================================
     MODAL EDITAR - Abre o modal de edição
     ============================================ */
  openEditModal(prospect: Prospect, event: Event): void {
    event.stopPropagation(); // Evita abrir o modal de detalhes
    this.editingProspect = { ...prospect }; // Cria uma cópia para edição
    this.isEditModalOpen = true;
    this.updateErrorMessage = '';
  }

  /* ============================================
     MODAL EDITAR - Fecha o modal de edição
     ============================================ */
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editingProspect = null;
    this.updateErrorMessage = '';
    this.isUpdating = false;
  }

  /* ============================================
     API - Atualiza prospect no banco
     ============================================ */
  updateProspect(): void {
    if (!this.editingProspect || this.isUpdating) return;

    this.isUpdating = true;
    this.updateErrorMessage = '';

    const updateData = {
      name: this.editingProspect.name || undefined,
      bio: this.editingProspect.bio || undefined,
      email: this.editingProspect.email || undefined,
      location: this.editingProspect.location || undefined,
      company: this.editingProspect.company || undefined,
    };

    this.prospectsService
      .update(this.editingProspect.id, updateData)
      .subscribe({
        next: (updatedProspect) => {
          // Atualiza na lista
          const index = this.allProspects.findIndex(
            (p) => p.id === updatedProspect.id
          );
          if (index !== -1) {
            this.allProspects[index] = updatedProspect;
          }
          this.filterProspects(); // Reaplica o filtro
          this.closeEditModal();
        },
        error: (err) => {
          this.isUpdating = false;
          this.updateErrorMessage =
            'Erro ao atualizar prospect. Tente novamente.';
        },
      });
  }

  /* ============================================
     MODAL EXCLUIR - Abre o modal de confirmação
     ============================================ */
  openDeleteModal(prospect: Prospect, event: Event): void {
    event.stopPropagation(); // Evita abrir o modal de detalhes
    this.deletingProspect = prospect;
    this.isDeleteModalOpen = true;
  }

  /* ============================================
     MODAL EXCLUIR - Fecha o modal de confirmação
     ============================================ */
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.deletingProspect = null;
    this.isDeleting = false;
  }

  /* ============================================
     API - Exclui prospect do banco
     ============================================ */
  confirmDelete(): void {
    if (!this.deletingProspect || this.isDeleting) return;

    this.isDeleting = true;

    this.prospectsService.delete(this.deletingProspect.id).subscribe({
      next: () => {
        // Remove da lista
        this.allProspects = this.allProspects.filter(
          (p) => p.id !== this.deletingProspect!.id
        );
        this.filterProspects(); // Reaplica o filtro
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Erro ao excluir prospect:', err);
        this.isDeleting = false;
      },
    });
  }

  /* ============================================
     API - Atualiza dados do GitHub
     ============================================ */
  refreshProspect(prospect: Prospect, event: Event): void {
    event.stopPropagation();

    this.prospectsService.refresh(prospect.id).subscribe({
      next: (updatedProspect) => {
        const index = this.allProspects.findIndex(
          (p) => p.id === updatedProspect.id
        );
        if (index !== -1) {
          this.allProspects[index] = updatedProspect;
        }
        this.filterProspects();
      },
      error: (err) => {
        console.error('Erro ao atualizar dados do GitHub:', err);
      },
    });
  }
}
