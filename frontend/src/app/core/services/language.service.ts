import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly currentLang = signal<Language>('es');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('kgoriwayra_lang') as Language;
      if (saved === 'es' || saved === 'en') {
        this.currentLang.set(saved);
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('kgoriwayra_lang', lang);
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    const next = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(next);
  }
}
