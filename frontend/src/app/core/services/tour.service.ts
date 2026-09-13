import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TourDetail, TourSummary } from '../models/tour.model';
import { ApiResponse } from '../models/api-response.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private readonly http = inject(HttpClient);
  private readonly langService = inject(LanguageService);
  private readonly apiUrl = 'http://localhost:8080/api/tours';

  // 12 Circuitos Oficiales de Cabalgatas Kgoriwayra
  private readonly fallbackToursEs: TourSummary[] = [
    {
      id: 'e1000000-0000-0000-0000-000000000001',
      slug: 'circuito-uyo-uyo',
      title: 'Circuito Uyo Uyo',
      shortDescription: 'Conoce de cerca el pueblo antiguo de Yanque, punto de control de todo el Valle del Colca.',
      location: 'Yanque',
      durationHours: 3.0,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/uyo-uyo.jpg',
      isFeatured: true,
      categoryName: 'Miradores y Arqueología'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000002',
      slug: 'pueblos-antiguos',
      title: 'Circuito Pueblos Antiguos Uyo Uyo - Coporaque',
      shortDescription: 'Un circuito espectacular donde observaremos las andenerías agrícolas del Valle del Colca.',
      location: 'Yanque - Coporaque',
      durationHours: 3.5,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/coporaque.png',
      isFeatured: true,
      categoryName: 'Circuitos Tradicionales'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000003',
      slug: 'mirador-achomani',
      title: 'Circuito Mirador de Achomani',
      shortDescription: 'Desde este punto tendremos una vista de 360 grados de todo el Valle del Colca.',
      location: 'Achoma',
      durationHours: 4.0,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/achomani.png',
      isFeatured: true,
      categoryName: 'Miradores y Arqueología'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000004',
      slug: 'mirador-kgoriwayra',
      title: 'Circuito Mirador Kgoriwayra',
      shortDescription: 'Circuito donde ascenderemos al Apu Sagrado Pallaclli, desde donde apreciaremos los campos agrícolas Collaguas e Incas.',
      location: 'Yanque',
      durationHours: 2.5,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/kgoriwayra.png',
      isFeatured: true,
      categoryName: 'Miradores y Arqueología'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000005',
      slug: 'aguas-termales',
      title: 'Circuito Uyo Uyo - Coporaque - Aguas Termales',
      shortDescription: 'Disfrutaremos de las construcciones Pre-Incas y las tumbas de Yuraq Qaqa y disfrutaremos de un relajante baño en las aguas termales de Umaru.',
      location: 'Yanque',
      durationHours: 4.5,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/cabalgata-06horas.jpg',
      isFeatured: true,
      categoryName: 'Circuitos Tradicionales'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000006',
      slug: 'origen-amazonas',
      title: 'Circuito Nacimiento del Río Amazonas',
      shortDescription: 'Circuito donde conoceremos Carhuasanta, origen del Río más largo del mundo, el Amazonas.',
      location: 'Tuti - Lari',
      durationHours: 8.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/amazonas.png',
      isFeatured: true,
      categoryName: 'Aventura y Cañón'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000007',
      slug: 'tres-canones',
      title: 'Circuito Tres Cañones de Suykutambo',
      shortDescription: 'En este tour conoceremos los tres cañones de Suykutambo, un lugar mágico con mucha historia.',
      location: 'Cuzco / Espinar',
      durationHours: 8.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/suykutambo.png',
      isFeatured: false,
      categoryName: 'Aventura y Cañón'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000008',
      slug: 'sabancaya',
      title: 'Circuito Sabancaya',
      shortDescription: 'En este tour conoceremos el Volcán Sabancaya, el cual se encuentra activo.',
      location: 'Colca',
      durationHours: 7.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/sabancaya.png',
      isFeatured: false,
      categoryName: 'Aventura y Cañón'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000009',
      slug: 'fortaleza-chimpa',
      title: 'Circuito Fortaleza de Chimpa',
      shortDescription: 'En este tour tendremos una mejor visión del Cañón del Colca y los nidos de los cóndores.',
      location: 'Madrigal',
      durationHours: 5.0,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/chimpa.png',
      isFeatured: true,
      categoryName: 'Miradores y Arqueología'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000010',
      slug: 'geiser-pinchollo',
      title: 'Circuito de los Geiser',
      shortDescription: 'En esta ruta viviremos una aventura inolvidable conociendo un geositio dentro del Geoparque.',
      location: 'C.P Pinchollo',
      durationHours: 4.5,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/geiser.png',
      isFeatured: false,
      categoryName: 'Aventura y Cañón'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000011',
      slug: 'parte-profunda-colca',
      title: 'Circuito conociendo la parte más profunda del Cañón del Colca',
      shortDescription: 'En este tour conoceremos la parte más profunda del Cañón del Colca, un valle rodeado de naturaleza.',
      location: 'Canco - Huambo',
      durationHours: 8.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/canco.png',
      isFeatured: false,
      categoryName: 'Aventura y Cañón'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000012',
      slug: 'circuito-tradicional',
      title: 'Circuito Tradicional',
      shortDescription: 'En este tour conoceremos de cerca Yanque - la antigua capital de la Cultura Collagua.',
      location: 'Yanque',
      durationHours: 2.0,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/tradicional.png',
      isFeatured: true,
      categoryName: 'Circuitos Tradicionales'
    }
  ];

  private readonly fallbackToursEn: TourSummary[] = [
    {
      id: 'e1000000-0000-0000-0000-000000000001',
      slug: 'circuito-uyo-uyo',
      title: 'Uyo Uyo Circuit',
      shortDescription: 'Discover up close the ancient village of Yanque, historic control point of the Colca Valley.',
      location: 'Yanque',
      durationHours: 3.0,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/uyo-uyo.jpg',
      isFeatured: true,
      categoryName: 'Viewpoints & Archaeology'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000002',
      slug: 'pueblos-antiguos',
      title: 'Ancient Villages Circuit (Uyo Uyo - Coporaque)',
      shortDescription: 'A spectacular circuit where we will observe the agricultural terraces of the Colca Valley.',
      location: 'Yanque - Coporaque',
      durationHours: 3.5,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/coporaque.png',
      isFeatured: true,
      categoryName: 'Traditional Tours'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000003',
      slug: 'mirador-achomani',
      title: 'Achomani Viewpoint Circuit',
      shortDescription: 'From this viewpoint we will have a 360-degree panoramic view of the entire Colca Valley.',
      location: 'Achoma',
      durationHours: 4.0,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/achomani.png',
      isFeatured: true,
      categoryName: 'Viewpoints & Archaeology'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000004',
      slug: 'mirador-kgoriwayra',
      title: 'Kgoriwayra Viewpoint Circuit',
      shortDescription: 'Circuit where we climb the Sacred Apu Pallaclli to appreciate the Collagua and Inca farming fields.',
      location: 'Yanque',
      durationHours: 2.5,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/kgoriwayra.png',
      isFeatured: true,
      categoryName: 'Viewpoints & Archaeology'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000005',
      slug: 'aguas-termales',
      title: 'Uyo Uyo - Coporaque - Hot Springs Circuit',
      shortDescription: 'Enjoy pre-Inca ruins, Yuraq Qaqa tombs, and a relaxing bath in the thermal springs of Umaru.',
      location: 'Yanque',
      durationHours: 4.5,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/cabalgata-06horas.jpg',
      isFeatured: true,
      categoryName: 'Traditional Tours'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000006',
      slug: 'origen-amazonas',
      title: 'Amazon River Source Circuit',
      shortDescription: 'Expedition to Carhuasanta, the geographic source of the world\'s longest river: the Amazon.',
      location: 'Tuti - Lari',
      durationHours: 8.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/amazonas.png',
      isFeatured: true,
      categoryName: 'Adventure & Canyon'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000007',
      slug: 'tres-canones',
      title: 'Three Canyons of Suykutambo Circuit',
      shortDescription: 'In this tour we will discover the Three Canyons of Suykutambo, a magical place with deep history.',
      location: 'Cuzco / Espinar',
      durationHours: 8.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/suykutambo.png',
      isFeatured: false,
      categoryName: 'Adventure & Canyon'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000008',
      slug: 'sabancaya',
      title: 'Sabancaya Volcano Circuit',
      shortDescription: 'In this tour we will experience the Sabancaya Volcano, which is actively emitting plumes.',
      location: 'Colca',
      durationHours: 7.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/sabancaya.png',
      isFeatured: false,
      categoryName: 'Adventure & Canyon'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000009',
      slug: 'fortaleza-chimpa',
      title: 'Chimpa Fortress Circuit',
      shortDescription: 'In this tour we will have the best vantage point of the Colca Canyon and condor nests.',
      location: 'Madrigal',
      durationHours: 5.0,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/chimpa.png',
      isFeatured: true,
      categoryName: 'Viewpoints & Archaeology'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000010',
      slug: 'geiser-pinchollo',
      title: 'Pinchollo Geysers Circuit',
      shortDescription: 'An unforgettable adventure discovering an authentic geosystem inside the Colca Geopark.',
      location: 'C.P Pinchollo',
      durationHours: 4.5,
      difficulty: 'Moderate',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/geiser.png',
      isFeatured: false,
      categoryName: 'Adventure & Canyon'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000011',
      slug: 'parte-profunda-colca',
      title: 'Deepest Part of Colca Canyon Circuit',
      shortDescription: 'In this tour we will discover the deepest gorge of the Colca Canyon, surrounded by raw nature.',
      location: 'Canco - Huambo',
      durationHours: 8.0,
      difficulty: 'Difficult',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/canco.png',
      isFeatured: false,
      categoryName: 'Adventure & Canyon'
    },
    {
      id: 'e1000000-0000-0000-0000-000000000012',
      slug: 'circuito-tradicional',
      title: 'Traditional Circuit',
      shortDescription: 'In this tour we will experience Yanque up close - the ancient capital of Collagua culture.',
      location: 'Yanque',
      durationHours: 2.0,
      difficulty: 'Easy',
      priceCurrency: 'PEN',
      coverImageUrl: '/assets/images/circuits/tradicional.png',
      isFeatured: true,
      categoryName: 'Traditional Tours'
    }
  ];

  getAllTours(): Observable<TourSummary[]> {
    const lang = this.langService.currentLang();
    return this.http.get<ApiResponse<TourSummary[]>>(`${this.apiUrl}?lang=${lang}`).pipe(
      map(res => (res.success && res.data && res.data.length > 0) ? res.data : (lang === 'en' ? this.fallbackToursEn : this.fallbackToursEs)),
      catchError(() => of(lang === 'en' ? this.fallbackToursEn : this.fallbackToursEs))
    );
  }

  getFeaturedTours(): Observable<TourSummary[]> {
    return this.getAllTours();
  }

  getTourBySlug(slug: string): Observable<TourSummary | undefined> {
    const lang = this.langService.currentLang();
    return this.getAllTours().pipe(
      map(tours => tours.find(t => t.slug === slug))
    );
  }
}
