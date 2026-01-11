import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/* ============================================
   COMPONENTE RAIZ DA APLICAÇÃO
   Equivalente ao App.tsx do React
   ============================================ */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Sistema de Gestão de Prospects';
}
