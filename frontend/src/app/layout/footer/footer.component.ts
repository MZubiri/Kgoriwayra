import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand & Bio -->
          <div class="footer-col brand-col">
            <div class="footer-brand">
              <div class="footer-logo-ring">
                <img src="/assets/images/logo-kgoriwayra.jpg" alt="Cabalgatas Kgoriwayra" class="footer-logo-img" />
              </div>
              <div>
                <h3 class="footer-title">Kgoriwayra</h3>
                <span class="footer-subtitle">AGENCIA DE VIAJES • RUTAS A CABALLO</span>
              </div>
            </div>
            <p class="brand-desc">
              {{ lang() === 'es'
                ? 'Emprendimiento pionero fundado por Don Wilbert Málaga en Yanque. Criadores apasionados del Caballo Peruano de Paso y guardianes de las rutas ancestrales del Cañón y Valle del Colca.'
                : 'Pioneering venture founded by Don Wilbert Málaga in Yanque. Passionate breeders of the Peruvian Paso Horse and guardians of ancient trails throughout the Colca Canyon & Valley.'
              }}
            </p>
            <div class="social-links">
              <a href="https://facebook.com/cabalgataskgoriwayracolca" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </a>
              <a href="https://instagram.com/cabalgataskgoriwayra" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/51995800077" target="_blank" rel="noopener" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19.53-.98.98-1.39 1.01-.39.03-.89.04-1.45-.14-.34-.11-.78-.26-1.33-.5-2.35-1.02-3.88-3.39-3.99-3.55-.12-.15-.96-1.28-.96-2.44s.61-1.74.83-1.97c.21-.24.47-.3.63-.3.16 0 .32.01.45.01.14.01.34-.05.53.41.19.46.66 1.62.72 1.74.06.12.1.26.02.42-.08.17-.12.27-.24.41-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.36 1.69.94.84 1.73 1.1 1.97 1.22.25.12.39.1.53-.06.15-.17.63-.73.8-1 .17-.26.34-.22.58-.13.24.09 1.51.71 1.77.84.26.13.43.19.49.3.07.1.07.61-.12 1.14z"/></svg>
              </a>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="footer-col">
            <h4>{{ lang() === 'es' ? 'Circuitos Oficiales' : 'Official Routes' }}</h4>
            <ul class="footer-links">
              <li><a href="#circuitos">Ruinas de Uyo Uyo (3h)</a></li>
              <li><a href="#circuitos">Coporaque & Tumbas (2.5h)</a></li>
              <li><a href="#circuitos">Mirador de Achoma (4h)</a></li>
              <li><a href="#circuitos">Hacienda Kgoriwayra (1.5h)</a></li>
              <li><a href="#circuitos">Valle Sagrado Colca (6h)</a></li>
              <li><a href="#circuitos">Origen Río Amazonas (3D/2N)</a></li>
            </ul>
          </div>

          <!-- Col 3: Complementary Activities -->
          <div class="footer-col">
            <h4>{{ lang() === 'es' ? 'Aventura & Cultura' : 'Adventure & Culture' }}</h4>
            <ul class="footer-links">
              <li><a href="#experiencia">{{ lang() === 'es' ? 'Trekking en el Cañón' : 'Canyon Trekking' }}</a></li>
              <li><a href="#experiencia">{{ lang() === 'es' ? 'Tirolesa / Zip-Line' : 'Zip-Line Flight' }}</a></li>
              <li><a href="#experiencia">{{ lang() === 'es' ? 'Paseo en Bote Río Colca' : 'Colca River Boating' }}</a></li>
              <li><a href="#experiencia">{{ lang() === 'es' ? 'Turismo Vivencial Yanque' : 'Yanque Rural Experience' }}</a></li>
              <li><a href="#experiencia">{{ lang() === 'es' ? 'Ciclismo de Montaña' : 'Mountain Biking' }}</a></li>
            </ul>
          </div>

          <!-- Col 4: Contact Info -->
          <div class="footer-col contact-col">
            <h4>{{ lang() === 'es' ? 'Contacto & Hacienda' : 'Contact & Ranch' }}</h4>
            <div class="contact-item">
              <span class="icon">📍</span>
              <div>
                <strong>{{ lang() === 'es' ? 'Hacienda & Establos:' : 'Ranch & Stables:' }}</strong>
                <span>Av. Collahuas 101 - Yanque, Valle del Colca, Caylloma, Arequipa, Perú</span>
              </div>
            </div>
            <div class="contact-item">
              <span class="icon">📱</span>
              <div>
                <strong>{{ lang() === 'es' ? 'Atención Directa Don Wilbert:' : 'Direct Contact Don Wilbert:' }}</strong>
                <a href="tel:+51995800077">+51 995 800 077</a> • <a href="tel:+51930435273">+51 930 435 273</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="icon">⏰</span>
              <div>
                <strong>{{ lang() === 'es' ? 'Horario de Salidas:' : 'Departure Hours:' }}</strong>
                <span>07:00 - 16:30 ({{ lang() === 'es' ? 'Todos los días' : 'Every day' }})</span>
              </div>
            </div>
            <div class="contact-item">
              <span class="icon">✉️</span>
              <div>
                <strong>Email:</strong>
                <a href="mailto:reservas@cabalgataskgoriwayra.com">reservas&#64;cabalgataskgoriwayra.com</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Sub-footer -->
        <div class="sub-footer">
          <p>© 2026 Cabalgatas Kgoriwayra. {{ lang() === 'es' ? 'Todos los derechos reservados. Yanque, Cañón del Colca, Arequipa, Perú.' : 'All rights reserved. Yanque, Colca Canyon, Arequipa, Peru.' }}</p>
          <div class="legal-links">
            <a href="#privacidad">{{ lang() === 'es' ? 'Políticas de Cabalgata' : 'Riding Policies' }}</a>
            <a href="#terminos">{{ lang() === 'es' ? 'Términos' : 'Terms' }}</a>
            <a href="#cancelacion">{{ lang() === 'es' ? 'Seguridad & Seguros' : 'Safety & Insurance' }}</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .site-footer {
      background: linear-gradient(180deg, #1b0e06 0%, #0d0603 100%);
      color: rgba(250, 246, 238, 0.75);
      padding: 5rem 0 2rem 0;
      border-top: 2px solid rgba(209, 148, 52, 0.3);

      h4 {
        color: #FAF6EE;
        font-family: $font-heading;
        font-size: 1.15rem;
        margin-bottom: 1.2rem;
        position: relative;
        padding-bottom: 0.5rem;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: #D19434;
        }
      }
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      margin-bottom: 4rem;

      @include respond-to(md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-to(lg) {
        grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
      }
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.2rem;

      .footer-logo-ring {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #D19434;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        background: #FAF6EE;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .footer-title {
        font-family: 'Great Vibes', cursive;
        font-size: 2.2rem;
        color: #D19434;
        margin: 0;
        line-height: 1;
        letter-spacing: 0.5px;
      }

      .footer-subtitle {
        display: block;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 1.5px;
        color: #A45222;
        margin-top: 0.2rem;
      }
    }

    .brand-desc {
      font-size: 0.92rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      color: rgba(250, 246, 238, 0.7);
    }

    .social-links {
      display: flex;
      gap: 0.85rem;

      a {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(209, 148, 52, 0.12);
        border: 1px solid rgba(209, 148, 52, 0.25);
        color: #D19434;
        @include flex-center;
        transition: all 0.25s ease;

        svg {
          width: 20px;
          height: 20px;
        }

        &:hover {
          background: #D19434;
          color: #1b0e06;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(209, 148, 52, 0.4);
        }
      }
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      a {
        color: rgba(250, 246, 238, 0.72);
        font-size: 0.9rem;
        transition: color 0.2s ease, padding-left 0.2s ease;

        &:hover {
          color: #D19434;
          padding-left: 5px;
        }
      }
    }

    .contact-item {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1.1rem;
      font-size: 0.9rem;
      line-height: 1.45;

      .icon {
        font-size: 1.1rem;
      }

      strong {
        display: block;
        color: #FAF6EE;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.2rem;
      }

      a {
        color: #D19434;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .sub-footer {
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 0.85rem;
      color: rgba(250, 246, 238, 0.45);

      @include respond-to(md) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      p {
        margin: 0;
      }

      .legal-links {
        display: flex;
        gap: 1.5rem;

        a {
          color: rgba(250, 246, 238, 0.55);

          &:hover {
            color: #D19434;
          }
        }
      }
    }
  `]
})
export class FooterComponent {
  private readonly langService = inject(LanguageService);
  readonly lang = this.langService.currentLang;
}
