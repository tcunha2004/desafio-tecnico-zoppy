import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Importação do Swiper e seus módulos
import { register } from 'swiper/element/bundle';

// Registra os elementos customizados do Swiper globalmente
register();

/* ============================================
   INTERFACE - Definição do tipo Prospect
   ============================================ */
interface Prospect {
  name: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  email?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // Schema necessário para usar elementos customizados do Swiper
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit {
  // Referência ao elemento Swiper no template
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  /* ============================================
     ESTADO DO MODAL - Adicionar Prospect
     ============================================ */
  isModalOpen: boolean = false;
  newUsername: string = '';

  /* ============================================
     ESTADO DO MODAL - Detalhes do Prospect
     ============================================ */
  isDetailsModalOpen: boolean = false;
  selectedProspect: Prospect | null = null;

  /* ============================================
     DADOS - Lista de prospects para exibição
     ============================================ */
  prospects: Prospect[] = [
    {
      name: 'Thiago Cunha',
      username: 'tcunha2004',
      avatarUrl: 'https://github.com/tcunha2004.png',
      bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovação.',
      email: 'thiago.cunha@email.com',
    },
    {
      name: 'Arturs Smirnovs',
      username: 'arturssmirnovs',
      avatarUrl: 'https://github.com/arturssmirnovs.png',
      bio: 'Software Engineer | Open Source Enthusiast',
      email: 'arturs@email.com',
    },
    {
      name: 'Thiago Cunha',
      username: 'tcunha2004',
      avatarUrl: 'https://github.com/tcunha2004.png',
      bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovação.',
      email: 'thiago.cunha@email.com',
    },
    {
      name: 'Arturs Smirnovs',
      username: 'arturssmirnovs',
      avatarUrl: 'https://github.com/arturssmirnovs.png',
      bio: 'Software Engineer | Open Source Enthusiast',
      email: 'arturs@email.com',
    },
  ];

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Configuração do Swiper após a view ser inicializada
    const swiperEl = this.swiperContainer.nativeElement;

    // Parâmetros do Swiper
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

    // Atribui os parâmetros e inicializa o Swiper
    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
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
  }

  /* ============================================
     MODAL - Fecha o modal de adicionar
     ============================================ */
  closeModal(): void {
    this.isModalOpen = false;
    this.newUsername = '';
  }

  /* ============================================
     MODAL DETALHES - Abre o modal com detalhes do prospect
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
     MODAL - Salva o novo prospect
     (Por enquanto apenas fecha o modal - design only)
     ============================================ */
  saveProspect(): void {
    if (this.newUsername.trim()) {
      // TODO: Implementar lógica de salvar prospect futuramente

      // Fecha o modal
      this.closeModal();
    }
  }
}
