import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Importação do Swiper e seus módulos
import { register } from 'swiper/element/bundle';

// Serviço de prospects
import { ProspectsService, Prospect } from '../../services/prospects.service';

// Registra os elementos customizados do Swiper globalmente
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // Schema necessário para usar elementos customizados do Swiper
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Referência ao elemento Swiper no template
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  /* ============================================
     ESTADO DO MODAL - Adicionar Prospect
     ============================================ */
  isModalOpen: boolean = false;
  newUsername: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  /* ============================================
     ESTADO DO MODAL - Detalhes do Prospect
     ============================================ */
  isDetailsModalOpen: boolean = false;
  selectedProspect: Prospect | null = null;

  /* ============================================
     DADOS - Lista de prospects do banco
     ============================================ */
  prospects: Prospect[] = [];

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

  ngAfterViewInit(): void {
    // Configuração do Swiper após a view ser inicializada
    this.initSwiper();
  }

  /* ============================================
     SWIPER - Inicializa o carousel
     ============================================ */
  private initSwiper(): void {
    setTimeout(() => {
      const swiperEl = this.swiperContainer?.nativeElement;
      if (swiperEl) {
        const swiperParams = {
          slidesPerView: 2,
          spaceBetween: 32,
          navigation: true,
          injectStyles: [
            `
            .swiper-button-prev,
            .swiper-button-next {
              color: white;
              width: 2.75rem;
              height: 2.75rem;
            }
            .swiper-button-prev::after,
            .swiper-button-next::after {
              font-size: 1.1rem;
              font-weight: 700;
            }
            `,
          ],
        };
        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
      }
    }, 100);
  }

  /* ============================================
     API - Carrega prospects do banco de dados
     ============================================ */
  loadProspects(): void {
    this.prospectsService.getAll().subscribe({
      next: (data) => {
        this.prospects = data;
        // Reinicializa o Swiper após carregar os dados
        setTimeout(() => this.updateSwiper(), 100);
      },
      error: (err) => {
        console.error('Erro ao carregar prospects:', err);
      },
    });
  }

  /* ============================================
     SWIPER - Atualiza após mudanças nos dados
     ============================================ */
  private updateSwiper(): void {
    const swiperEl = this.swiperContainer?.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.update();
    }
  }

  /* ============================================
     NAVEGAÇÃO - Redireciona para a lista completa
     ============================================ */
  navigateToList(): void {
    this.router.navigate(['/list']);
  }

  /* ============================================
     MODAL - Abre o modal de adicionar prospect
     ============================================ */
  openModal(): void {
    this.isModalOpen = true;
    this.newUsername = '';
    this.errorMessage = '';
  }

  /* ============================================
     MODAL - Fecha o modal de adicionar
     ============================================ */
  closeModal(): void {
    this.isModalOpen = false;
    this.newUsername = '';
    this.errorMessage = '';
    this.isLoading = false;
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
     API - Salva novo prospect no banco
     ============================================ */
  saveProspect(): void {
    if (!this.newUsername.trim() || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    const isFirstProspect = this.prospects.length === 0;

    this.prospectsService
      .create({ username: this.newUsername.trim() })
      .subscribe({
        next: (newProspect) => {
          // Adiciona o novo prospect à lista
          this.prospects.unshift(newProspect);

          // Se for o primeiro prospect, inicializa o Swiper
          // Caso contrário, apenas atualiza
          if (isFirstProspect) {
            setTimeout(() => this.initSwiper(), 150);
          } else {
            setTimeout(() => this.updateSwiper(), 100);
          }

          // Fecha o modal
          this.closeModal();
        },
        error: (err) => {
          this.isLoading = false;
          // Exibe mensagem de erro
          if (err.status === 404) {
            this.errorMessage = 'Usuário não encontrado no GitHub';
          } else if (err.status === 409) {
            this.errorMessage = 'Este prospect já está cadastrado';
          } else {
            this.errorMessage = 'Erro ao adicionar prospect. Tente novamente.';
          }
        },
      });
  }
}
