import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { LanguageService } from './language.service';

export interface ActivityItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  badge: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly http = inject(HttpClient);
  private readonly langService = inject(LanguageService);
  private readonly apiUrl = 'http://localhost:8080/api/activities';

  private readonly fallbackEs: ActivityItem[] = [
    { id: '1', slug: 'trekking', title: 'Trekking por el Cañón', shortDescription: 'Caminatas guiadas por senderos andinos ancestrales y miradores profundos.', icon: '🥾', badge: 'Senderismo' },
    { id: '2', slug: 'zip-line', title: 'Zip - Line (Tirolesa)', shortDescription: 'Adrenalina pura sobrevolando el cañón y el río Colca con equipo de alta seguridad.', icon: '🪂', badge: 'Aventura' },
    { id: '3', slug: 'paseo-bote', title: 'Paseo en Bote', shortDescription: 'Navegación y canotaje recreativo seguro en tramos serenos del río Colca.', icon: '🚣', badge: 'Río Colca' },
    { id: '4', slug: 'turismo-vivencial', title: 'Turismo Vivencial', shortDescription: 'Comparte costumbres, agricultura y textilería tradicional con familias nativas de Yanque.', icon: '🏡', badge: 'Cultura Viva' },
    { id: '5', slug: 'ciclismo', title: 'Ciclismo de Montaña', shortDescription: 'Descensos y rutas cross-country por los pueblos y andenes del valle.', icon: '🚵', badge: 'MTB' },
    { id: '6', slug: 'tours-culturales', title: 'Tours Culturales', shortDescription: 'Visitas guiadas a templos coloniales barrocos, museos locales y sitios arqueológicos.', icon: '🏛️', badge: 'Patrimonio' }
  ];

  private readonly fallbackEn: ActivityItem[] = [
    { id: '1', slug: 'trekking', title: 'Canyon Trekking', shortDescription: 'Guided hikes across ancient Andean trails and deep scenic canyon viewpoints.', icon: '🥾', badge: 'Hiking' },
    { id: '2', slug: 'zip-line', title: 'Zip - Line Adventure', shortDescription: 'Pure adrenaline soaring over the canyon and Colca river with certified safety gear.', icon: '🪂', badge: 'Adventure' },
    { id: '3', slug: 'paseo-bote', title: 'River Boating', shortDescription: 'Safe scenic boating and gentle rafting along calm sections of the Colca River.', icon: '🚣', badge: 'Colca River' },
    { id: '4', slug: 'turismo-vivencial', title: 'Experiential Tourism', shortDescription: 'Experience native customs, agriculture, and traditional weaving with local families in Yanque.', icon: '🏡', badge: 'Living Culture' },
    { id: '5', slug: 'ciclismo', title: 'Mountain Biking', shortDescription: 'Downhill and cross-country cycling trails across picturesque villages and terraces.', icon: '🚵', badge: 'MTB' },
    { id: '6', slug: 'tours-culturales', title: 'Cultural Tours', shortDescription: 'Guided journeys through baroque colonial churches, local museums, and sacred sites.', icon: '🏛️', badge: 'Heritage' }
  ];

  getActivities(): Observable<ActivityItem[]> {
    const lang = this.langService.currentLang();
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}?lang=${lang}`).pipe(
      map(res => (res.success && res.data && res.data.length > 0)
        ? res.data.map((item, idx) => ({
            id: item.id || idx.toString(),
            slug: item.slug,
            title: item.title,
            shortDescription: item.shortDescription,
            icon: this.getIconForSlug(item.slug),
            badge: this.getBadgeForSlug(item.slug, lang)
          }))
        : (lang === 'en' ? this.fallbackEn : this.fallbackEs)
      ),
      catchError(() => of(lang === 'en' ? this.fallbackEn : this.fallbackEs))
    );
  }

  private getIconForSlug(slug: string): string {
    switch (slug) {
      case 'trekking': return '🥾';
      case 'zip-line': return '🪂';
      case 'paseo-bote': return '🚣';
      case 'turismo-vivencial': return '🏡';
      case 'ciclismo': return '🚵';
      case 'tours-culturales': return '🏛️';
      default: return '✨';
    }
  }

  private getBadgeForSlug(slug: string, lang: string): string {
    const isEn = lang === 'en';
    switch (slug) {
      case 'trekking': return isEn ? 'Hiking' : 'Senderismo';
      case 'zip-line': return isEn ? 'Adventure' : 'Aventura';
      case 'paseo-bote': return isEn ? 'River' : 'Río Colca';
      case 'turismo-vivencial': return isEn ? 'Living Culture' : 'Cultura Viva';
      case 'ciclismo': return isEn ? 'MTB' : 'Ciclismo';
      case 'tours-culturales': return isEn ? 'Heritage' : 'Patrimonio';
      default: return isEn ? 'Activity' : 'Actividad';
    }
  }
}
