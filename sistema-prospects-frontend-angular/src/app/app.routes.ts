import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';

/* ============================================
   CONFIGURAÇÃO DE ROTAS
   Equivalente ao Router.tsx do React
   ============================================ */
export const routes: Routes = [
  // Rota principal - Página Home
  { path: '', component: HomeComponent },
  // Rota da lista de prospects
  { path: 'list', component: ListComponent },
];
