import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  categories = [
    { icon: '📘', label: 'Yazılım Dünyası' },
    { icon: '💻', label: 'Sistem Dünyası' },
    { icon: '🧠', label: 'İşletme Dünyası' },
    { icon: '🏫', label: 'Kişisel Gelişim' },
    { icon: '💼', label: 'Kariyer Yolu' },
  ];
}
