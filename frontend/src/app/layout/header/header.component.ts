import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Top Contact Bar (Clean, Minimal, Non-intrusive) -->
    <div class="top-bar">
      <div class="header-container top-bar-inner">
        <div class="top-info-left">
          <a href="tel:+51995800077" class="top-item">
            <svg class="top-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>+51 995 800 077 / 930 435 273</span>
          </a>
          <span class="top-sep">|</span>
          <span class="top-item top-location">
            <svg class="top-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Av. Collahuas 101, Yanque - Valle del Colca</span>
          </span>
        </div>

        <div class="top-info-right">
          <span class="top-item top-hours">
            <svg class="top-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{{ lang() === 'es' ? 'Salidas todos los días: 07:00 - 16:30' : 'Daily departures: 07:00 - 16:30' }}</span>
          </span>
          <span class="top-sep">|</span>
          <!-- Language Toggle Pill -->
          <button class="lang-switch-btn" (click)="toggleLanguage()" [title]="lang() === 'es' ? 'Switch to English' : 'Cambiar a Español'">
            <span class="lang-globe">🌐</span>
            <span class="lang-text">{{ lang() === 'es' ? 'ES | EN' : 'EN | ES' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="main-header" [class.scrolled]="isScrolled()">
      <div class="header-container header-inner">
        <!-- Brand Logo & Identity -->
        <a routerLink="/" class="brand-link">
          <div class="logo-medallion">
            <img src="/assets/images/logo-kgoriwayra.jpg" alt="Cabalgatas Kgoriwayra" class="logo-img" />
          </div>
          <div class="brand-titles">
            <span class="title-script">Kgoriwayra</span>
            <span class="title-sub">{{ lang() === 'es' ? 'AGENCIA DE VIAJES • CABALGATAS' : 'TRAVEL AGENCY • HORSE TOURS' }}</span>
          </div>
        </a>

        <!-- Desktop Navigation Links (Spacious & Clean) -->
        <nav class="nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            {{ lang() === 'es' ? 'Inicio' : 'Home' }}
          </a>
          <a href="#rutas" class="nav-item">
            {{ lang() === 'es' ? 'Circuitos' : 'Circuits' }}
          </a>
          <a href="#actividades" class="nav-item">
            {{ lang() === 'es' ? 'Actividades' : 'Activities' }}
          </a>
          <a href="#don-wilbert" class="nav-item">
            {{ lang() === 'es' ? 'Nosotros' : 'About Us' }}
          </a>
          <a href="#testimonios" class="nav-item">
            {{ lang() === 'es' ? 'Testimonios' : 'Reviews' }}
          </a>
          <a href="#reservar" class="nav-item">
            {{ lang() === 'es' ? 'Contacto' : 'Contact' }}
          </a>
        </nav>

        <!-- Right Side Actions -->
        <div class="header-actions">
          <!-- WhatsApp Contact Button -->
          <a href="https://wa.me/51995800077?text=Hola%20Cabalgatas%20Kgoriwayra,%20deseo%20informaci%C3%B3n%20sobre%20los%20circuitos%20a%20caballo." 
             target="_blank" 
             rel="noopener" 
             class="btn-wa-header" 
             [title]="lang() === 'es' ? 'Consultar por WhatsApp' : 'Chat on WhatsApp'">
            <svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19.53-.98.98-1.39 1.01-.39.03-.89.04-1.45-.14-.34-.11-.78-.26-1.33-.5-2.35-1.02-3.88-3.39-3.99-3.55-.12-.15-.96-1.28-.96-2.44s.61-1.74.83-1.97c.21-.24.47-.3.63-.3.16 0 .32.01.45.01.14.01.34-.05.53.41.19.46.66 1.62.72 1.74.06.12.1.26.02.42-.08.17-.12.27-.24.41-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.36 1.69.94.84 1.73 1.1 1.97 1.22.25.12.39.1.53-.06.15-.17.63-.73.8-1 .17-.26.34-.22.58-.13.24.09 1.51.71 1.77.84.26.13.43.19.49.3.07.1.07.61-.12 1.14z"/>
            </svg>
            <span class="wa-label">WhatsApp</span>
          </a>

          <!-- Primary Booking CTA -->
          <a href="#reservar" class="btn-book-cta">
            <span>{{ lang() === 'es' ? 'Reservar Cabalgata' : 'Book a Tour' }}</span>
          </a>

          <!-- Mobile Menu Hamburger -->
          <button class="mobile-toggle" (click)="toggleMobileMenu()" [class.active]="mobileMenuOpen()" aria-label="Menú">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      @if (mobileMenuOpen()) {
        <div class="mobile-dropdown">
          <div class="header-container mobile-dropdown-content">
            <nav class="mobile-nav-links">
              <a routerLink="/" (click)="closeMobileMenu()" class="mobile-nav-item">
                {{ lang() === 'es' ? 'Inicio' : 'Home' }}
              </a>
              <a href="#rutas" (click)="closeMobileMenu()" class="mobile-nav-item">
                {{ lang() === 'es' ? 'Circuitos a Caballo (12)' : 'Horseback Circuits (12)' }}
              </a>
              <a href="#actividades" (click)="closeMobileMenu()" class="mobile-nav-item">
                {{ lang() === 'es' ? 'Actividades Complementarias' : 'Complementary Activities' }}
              </a>
              <a href="#don-wilbert" (click)="closeMobileMenu()" class="mobile-nav-item">
                {{ lang() === 'es' ? 'Sobre Don Wilbert Málaga' : 'About Wilbert Málaga' }}
              </a>
              <a href="#testimonios" (click)="closeMobileMenu()" class="mobile-nav-item">
                {{ lang() === 'es' ? 'Testimonios Reales' : 'Traveler Reviews' }}
              </a>
              <a href="#reservar" (click)="closeMobileMenu()" class="mobile-nav-item">
                {{ lang() === 'es' ? 'Contacto & Reservas' : 'Contact & Booking' }}
              </a>
            </nav>

            <div class="mobile-bottom-actions">
              <a href="#reservar" class="btn-book-cta btn-block" (click)="closeMobileMenu()">
                {{ lang() === 'es' ? 'Reservar mi Cabalgata' : 'Book Your Horse Tour' }}
              </a>
              <button class="lang-switch-btn btn-block" (click)="toggleLanguage()">
                {{ lang() === 'es' ? 'Switch to English (EN)' : 'Cambiar a Español (ES)' }}
              </button>
            </div>
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    // Outer Width Container for Clean Spacing
    .header-container {
      width: 100%;
      max-width: 1420px;
      margin: 0 auto;
      padding: 0 1.5rem;

      @include respond-to(lg) {
        padding: 0 2.5rem;
      }
    }

    // --- 1. Top Contact Bar ---
    .top-bar {
      background: #140A04;
      color: rgba(250, 246, 238, 0.78);
      font-size: 0.8rem;
      font-family: 'Outfit', sans-serif;
      padding: 0.45rem 0;
      border-bottom: 1px solid rgba(209, 148, 52, 0.2);
      position: relative;
      z-index: 1001;
    }

    .top-bar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top-info-left, .top-info-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .top-item {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: rgba(250, 246, 238, 0.85);
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #D19434;
      }
    }

    .top-svg {
      width: 13px;
      height: 13px;
      color: #D19434;
      flex-shrink: 0;
    }

    .top-sep {
      color: rgba(209, 148, 52, 0.3);
      font-size: 0.75rem;
    }

    .top-location {
      display: none;
      @include respond-to(md) {
        display: inline-flex;
      }
    }

    .top-hours {
      display: none;
      @include respond-to(lg) {
        display: inline-flex;
      }
    }

    .lang-switch-btn {
      background: rgba(209, 148, 52, 0.12);
      border: 1px solid rgba(209, 148, 52, 0.35);
      color: #FAF6EE;
      border-radius: 20px;
      padding: 0.2rem 0.65rem;
      font-size: 0.76rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.25s ease;

      .lang-globe {
        font-size: 0.8rem;
      }

      &:hover {
        background: #D19434;
        color: #140A04;
        border-color: #D19434;
      }
    }

    // --- 2. Main Navigation Header ---
    .main-header {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      background: rgba(20, 10, 5, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(209, 148, 52, 0.18);
      transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;

      &.scrolled {
        background: rgba(14, 7, 3, 0.98);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        border-bottom-color: rgba(209, 148, 52, 0.3);
      }
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 78px;
    }

    // Brand Identity (Left)
    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      text-decoration: none;
      flex-shrink: 0;
      margin-right: 1.5rem;

      .logo-medallion {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #D19434;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
        background: #FAF6EE;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;

        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &:hover .logo-medallion {
        transform: scale(1.05);
      }

      .brand-titles {
        display: flex;
        flex-direction: column;

        .title-script {
          font-family: 'Great Vibes', cursive;
          font-size: 2.1rem;
          color: #D19434;
          line-height: 0.95;
          letter-spacing: 0.5px;
        }

        .title-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          color: rgba(250, 246, 238, 0.85);
          letter-spacing: 1.8px;
          margin-top: 0.15rem;
        }
      }
    }

    // Navigation Menu (Center - Spacious & Elegant)
    .nav-menu {
      display: none;
      align-items: center;
      gap: 2.2rem;

      @include respond-to(lg) {
        display: flex;
      }

      @media (min-width: 1280px) {
        gap: 2.8rem;
      }

      .nav-item {
        font-family: 'Outfit', sans-serif;
        font-size: 0.96rem;
        font-weight: 500;
        letter-spacing: 0.4px;
        color: rgba(250, 246, 238, 0.85);
        text-decoration: none;
        padding: 0.5rem 0;
        position: relative;
        transition: color 0.25s ease;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #D19434;
          border-radius: 2px;
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &:hover, &.active {
          color: #D19434;

          &::after {
            width: 100%;
          }
        }
      }
    }

    // Header Actions (Right)
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-left: auto;

      @include respond-to(lg) {
        margin-left: 1.5rem;
      }

      // WhatsApp Pill
      .btn-wa-header {
        display: none;
        align-items: center;
        gap: 0.45rem;
        background: rgba(37, 211, 102, 0.14);
        border: 1px solid rgba(37, 211, 102, 0.4);
        color: #25D366;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-family: 'Outfit', sans-serif;
        font-size: 0.84rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.25s ease;

        @include respond-to(md) {
          display: inline-flex;
        }

        .wa-icon {
          width: 17px;
          height: 17px;
        }

        &:hover {
          background: #25D366;
          color: #140A04;
          border-color: #25D366;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
        }
      }

      // Booking CTA Button
      .btn-book-cta {
        display: none;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #D19434 0%, #A45222 100%);
        color: #FFFFFF;
        font-family: 'Outfit', sans-serif;
        font-size: 0.88rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        padding: 0.6rem 1.4rem;
        border-radius: 50px;
        text-decoration: none;
        box-shadow: 0 4px 16px rgba(209, 148, 52, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.15);
        transition: all 0.25s ease;

        @include respond-to(sm) {
          display: inline-flex;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(209, 148, 52, 0.5);
          filter: brightness(1.08);
        }

        &.btn-block {
          display: flex;
          width: 100%;
          padding: 0.85rem 1.5rem;
        }
      }

      // Mobile Hamburger
      .mobile-toggle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 38px;
        height: 32px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 5px 4px;

        @include respond-to(lg) {
          display: none;
        }

        .bar {
          width: 100%;
          height: 2px;
          background: #FAF6EE;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        &.active {
          .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
            background: #D19434;
          }
          .bar:nth-child(2) {
            opacity: 0;
          }
          .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
            background: #D19434;
          }
        }
      }
    }

    // --- 3. Mobile Dropdown ---
    .mobile-dropdown {
      background: #1A0E07;
      border-top: 1px solid rgba(209, 148, 52, 0.2);
      border-bottom: 2px solid #D19434;
      padding: 1.5rem 0 2rem 0;
      animation: navSlideDown 0.25s ease-out;

      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1.5rem;

        .mobile-nav-item {
          font-family: 'Outfit', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #FAF6EE;
          text-decoration: none;
          padding: 0.65rem 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;

          &:hover {
            color: #D19434;
            background: rgba(209, 148, 52, 0.08);
            padding-left: 0.8rem;
          }
        }
      }

      .mobile-bottom-actions {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .btn-block {
          width: 100%;
          justify-content: center;
          text-align: center;
          padding: 0.75rem 1rem;
        }
      }
    }

    @keyframes navSlideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeaderComponent {
  private readonly langService = inject(LanguageService);

  readonly lang = this.langService.currentLang;
  readonly mobileMenuOpen = signal(false);
  readonly isScrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  toggleLanguage(): void {
    this.langService.toggleLanguage();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
