import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FeaturedBannerComponent } from '../../components/featured-banner/featured-banner.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,HeaderComponent,
    SidebarComponent,
    FeaturedBannerComponent,CourseCardComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  courses = [
    { title: 'Pekiştirmeli Öğrenme', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', views: 161 },
    { title: 'Kubernetes', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', views: 542 },
    { title: 'Sağlıkta Yapay Zeka', image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', views: 1460 },
    { title: 'Matematik 101', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', views: 3100 },
  ];
}
