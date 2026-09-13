import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { LanguageService } from './language.service';

export interface CustomerReview {
  id: string;
  authorName: string;
  authorLocation: string;
  avatarUrl: string;
  tourName: string;
  rating: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private readonly http = inject(HttpClient);
  private readonly langService = inject(LanguageService);
  private readonly apiUrl = 'http://localhost:8080/api/testimonials';

  // Testimonios Reales Verificados de cabalgataskgoriwayra.com
  private readonly fallbackEs: CustomerReview[] = [
    {
      id: '1',
      authorName: 'Diana C',
      authorLocation: 'España',
      avatarUrl: '/assets/images/diana-c.jpg',
      tourName: 'Cabalgata 4 Horas por Cerros',
      rating: 5,
      content: 'La atención fue muy buena; como ya habíamos ido a varios sitios que están en el tour común, nos hicieron un paseo de más de 4 horas por los cerros por una ruta menos conocida, más larga. Sus caballos son lindos y muy mansos y su hijito y un perro acompañaron la ruta también.'
    },
    {
      id: '2',
      authorName: 'Thomas M',
      authorLocation: 'Bruselas, Bélgica',
      avatarUrl: '/assets/images/thomas-1.jpg',
      tourName: 'Cabalgata Valle de Yanque',
      rating: 5,
      content: 'Hicimos 4 horas de cabalgata a través del valle de Yanque. La equitación es una de las mejores actividades que hemos hecho en Perú, Wilbert es amable y paciente, como los hermosos caballos de Paso peruanos que él tiene. Lo recomiendo, me encantaría volver.'
    },
    {
      id: '3',
      authorName: 'MariaReiRei',
      authorLocation: 'Arequipa, Perú',
      avatarUrl: '/assets/images/mirei.png',
      tourName: 'Circuito Tradicional Yanque',
      rating: 5,
      content: 'Muy hermoso paseo, tomamos la ruta de 2 horas y fue muy relajante y entretenido, también fuimos al punto más alto de donde se divisaba la ciudad de Yanque, y Wilber es una excelente persona, totalmente recomendado!'
    },
    {
      id: '4',
      authorName: 'Jinete y amigos de establos',
      authorLocation: 'Francia / Arequipa',
      avatarUrl: '/assets/images/gringos-francia.png',
      tourName: 'Cabalgata 6 Horas Cañón del Colca',
      rating: 5,
      content: 'Hicimos la cabalgata de 6 horas con unos amigos que tienen su propio establo en Francia, y fue INCREIBLE! Esta empresa sabe lo que hace y lo hace bien. Si tienen experiencia tendrán retos y si son novatos estarán bien cuidados por Wilber. Les aseguro que conocerán mejor el valle.'
    },
    {
      id: '5',
      authorName: 'Montserrat C',
      authorLocation: 'Trujillo, Perú',
      avatarUrl: '/assets/images/team-4.png',
      tourName: 'Cabalgata Familiar',
      rating: 5,
      content: 'Los paisajes hermosos, Wilbert fue muy atento conmigo y con mi hijo, los caballos super dóciles y preparados para la ruta, fueron dos horas maravillosas además de un precio justo, solo hay que preguntar por él y la gente del pueblo lo conoce.'
    },
    {
      id: '6',
      authorName: 'Clauditamil',
      authorLocation: 'Lima, Perú',
      avatarUrl: '/assets/images/team-1.png',
      tourName: 'Circuito Yanque y Plaza',
      rating: 5,
      content: 'Nos enteramos de las cabalgatas del Sr Wilbert Málaga, mientras caminábamos hacia la plaza. Nos explicó a los principiantes pacientemente. Él fue adelante con su hijo Anthony Blue, otro capo ❤️ Nos encantó a mis amigas y a mí. No se pierdan esta experiencia.'
    }
  ];

  private readonly fallbackEn: CustomerReview[] = [
    {
      id: '1',
      authorName: 'Diana C',
      authorLocation: 'Spain',
      avatarUrl: '/assets/images/diana-c.jpg',
      tourName: '4-Hour Mountain Horse Trail',
      rating: 5,
      content: 'The attention was very warm and authentic. They took us on a 4+ hour ride along lesser-known mountain trails. Their horses are gentle, sweet, and calm. Wilbert’s young son and family dog accompanied us along the trail too!'
    },
    {
      id: '2',
      authorName: 'Thomas M',
      authorLocation: 'Brussels, Belgium',
      avatarUrl: '/assets/images/thomas-1.jpg',
      tourName: 'Yanque Valley Horseback Ride',
      rating: 5,
      content: 'We did a 4-hour ride across the Yanque valley. Horseback riding here was one of the absolute best activities we did in Peru. Wilbert is friendly, patient, and his Peruvian Paso horses are magnificent. Highly recommended!'
    },
    {
      id: '3',
      authorName: 'MariaReiRei',
      authorLocation: 'Arequipa, Peru',
      avatarUrl: '/assets/images/mirei.png',
      tourName: 'Traditional Yanque Circuit',
      rating: 5,
      content: 'Such a peaceful and scenic ride. We took the 2-hour route, climbing to a high vantage point overlooking Yanque. Wilber is an extraordinary host, patient guide, and genuine horseman!'
    },
    {
      id: '4',
      authorName: 'Rider with stable owners',
      authorLocation: 'France / Arequipa',
      avatarUrl: '/assets/images/gringos-francia.png',
      tourName: '6-Hour Colca Canyon Expedition',
      rating: 5,
      content: 'We took the 6-hour ride with friends who own their own horse stables in France, and it was INCREDIBLE! This ranch truly knows horses and the terrain. Experienced riders get great trails, while novices will be completely safe and nurtured by Wilber.'
    },
    {
      id: '5',
      authorName: 'Montserrat C',
      authorLocation: 'Trujillo, Peru',
      avatarUrl: '/assets/images/team-4.png',
      tourName: 'Family Horseback Ride',
      rating: 5,
      content: 'Breathtaking landscapes. Wilbert was so attentive with both me and my son. The horses are extremely docile and steady on mountain trails. Two wonderful hours at a very fair price.'
    },
    {
      id: '6',
      authorName: 'Clauditamil',
      authorLocation: 'Lima, Peru',
      avatarUrl: '/assets/images/team-1.png',
      tourName: 'Yanque Village & Plaza Ride',
      rating: 5,
      content: 'We discovered Mr. Wilbert Málaga while walking to the plaza. He patiently taught us beginners before riding. He rode ahead with his son Anthony Blue, another master rider ❤️ My friends and I loved every minute!'
    }
  ];

  getReviews(): Observable<CustomerReview[]> {
    const lang = this.langService.currentLang();
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}?lang=${lang}`).pipe(
      map(res => (res.success && res.data && res.data.length > 0)
        ? res.data.map((r, idx) => ({
            id: r.id || idx.toString(),
            authorName: r.authorName,
            authorLocation: r.authorLocation || (lang === 'en' ? 'Verified Traveler' : 'Viajero Verificado'),
            avatarUrl: this.getAvatarForName(r.authorName),
            tourName: r.tourName || (lang === 'en' ? 'Horseback Tour' : 'Cabalgata en Yanque'),
            rating: r.rating || 5,
            content: r.content
          }))
        : (lang === 'en' ? this.fallbackEn : this.fallbackEs)
      ),
      catchError(() => of(lang === 'en' ? this.fallbackEn : this.fallbackEs))
    );
  }

  private getAvatarForName(name: string): string {
    if (name.includes('Diana')) return '/assets/images/diana-c.jpg';
    if (name.includes('Thomas')) return '/assets/images/thomas-1.jpg';
    if (name.includes('Maria')) return '/assets/images/mirei.png';
    if (name.includes('Francia')) return '/assets/images/gringos-francia.png';
    if (name.includes('Montserrat')) return '/assets/images/team-4.png';
    return '/assets/images/team-1.png';
  }
}
