import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../core/services/tour.service';
import { ActivityService, ActivityItem } from '../../core/services/activity.service';
import { TestimonialService, CustomerReview } from '../../core/services/testimonial.service';
import { BookingService } from '../../core/services/booking.service';
import { LanguageService } from '../../core/services/language.service';
import { TourSummary } from '../../core/models/tour.model';
import { CreateBookingRequest, BookingConfirmationResponse } from '../../core/models/booking.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- ========================================================================= -->
    <!-- 1. HERO SECTION: AUTÉNTICA IDENTIDAD ECUESTRE ANDINA -->
    <!-- ========================================================================= -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <!-- Official Logo Emblem Banner -->
        <div class="hero-brand-badge">
          <div class="badge-emblem">
            <img src="/assets/images/logo-kgoriwayra.jpg" alt="Emblema Cabalgatas Kgoriwayra" class="hero-badge-img" />
          </div>
          <div class="badge-info">
            <span class="badge-title">AGENCIA DE VIAJES OFICIAL • YANQUE</span>
            <span class="badge-subtitle">VALLE Y CAÑÓN DEL COLCA • AREQUIPA, PERÚ</span>
          </div>
        </div>

        <h1 class="hero-title">
          Cabalgatas <span class="script-accent">Kgoriwayra</span>
        </h1>
        <p class="hero-motto">
          {{ lang() === 'es' ? 'Rutas a Caballo en el Valle y Cañón del Colca' : 'Horseback Expeditions in the Colca Valley & Canyon' }}
        </p>

        <p class="hero-description">
          {{ lang() === 'es'
            ? 'Vive la experiencia más auténtica del Colca al paso noble y suave del Caballo Peruano de Paso. Descubre caminos pre-incas, andenes agrícolas milenarios, géiseres y cañones profundos guiados por Don Wilbert Málaga.'
            : 'Experience the authentic Colca Canyon on horseback with our noble Peruvian Paso horses. Discover pre-Inca trails, ancient farming terraces, geysers, and deep canyons guided by master horseman Don Wilbert Málaga.'
          }}
        </p>

        <!-- CTAs -->
        <div class="hero-cta-group">
          <a href="#rutas" class="btn btn-gold btn-lg">
            <span>🐎 {{ lang() === 'es' ? 'Ver los 12 Circuitos a Caballo' : 'Explore the 12 Horse Routes' }}</span>
          </a>
          <a href="#reservar" class="btn btn-secondary btn-lg">
            <span>📅 {{ lang() === 'es' ? 'Reservar mi Cabalgata' : 'Book a Ride' }}</span>
          </a>
        </div>

        <!-- 4 Authentic Equestrian Trust Badges -->
        <div class="hero-trust-grid">
          <div class="trust-card">
            <span class="trust-icon">🐴</span>
            <strong>{{ lang() === 'es' ? 'Caballos de Paso' : 'Peruvian Paso Horses' }}</strong>
            <small>{{ lang() === 'es' ? 'Andar suave y dócil, sin rebote' : 'Smooth, gentle gait for all levels' }}</small>
          </div>
          <div class="trust-card">
            <span class="trust-icon">🤠</span>
            <strong>{{ lang() === 'es' ? 'Don Wilbert Málaga' : 'Wilbert Málaga' }}</strong>
            <small>{{ lang() === 'es' ? 'Pionero ecuestre con +25 años' : 'Native master guide with 25+ yrs' }}</small>
          </div>
          <div class="trust-card">
            <span class="trust-icon">🗺️</span>
            <strong>{{ lang() === 'es' ? '12 Circuitos Reales' : '12 Authentic Routes' }}</strong>
            <small>{{ lang() === 'es' ? 'Desde 2 horas hasta expediciones' : 'From 2 hours to full-day treks' }}</small>
          </div>
          <div class="trust-card">
            <span class="trust-icon">🛡️</span>
            <strong>{{ lang() === 'es' ? 'Aperos y Seguridad' : 'Tack & Safety' }}</strong>
            <small>{{ lang() === 'es' ? 'Monturas de cuero y cascos' : 'Traditional leather saddles & helmets' }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 2. PILARES DE VALOR ECUESTRE -->
    <!-- ========================================================================= -->
    <section class="section section-sand">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-badge">{{ lang() === 'es' ? 'Tradición & Pasión Ecuestre' : 'Equestrian Heritage & Passion' }}</span>
          <h2>{{ lang() === 'es' ? '¿Por qué Cabalgar con Kgoriwayra?' : 'Why Ride with Kgoriwayra?' }}</h2>
          <p class="section-subtitle">
            {{ lang() === 'es'
              ? 'Nuestra agencia de viajes en Yanque combina la crianza del Caballo Peruano de Paso con un conocimiento íntimo de los senderos más hermosos y secretos del Cañón del Colca.'
              : 'Our travel agency based in Yanque combines breeding Peruvian Paso horses with intimate knowledge of the most beautiful and secret trails of the Colca Canyon.'
            }}
          </p>
        </div>

        <div class="grid-4 value-pillars">
          <div class="pillar-card">
            <div class="pillar-icon-wrap">
              <span class="pillar-icon">🏇</span>
            </div>
            <h3>{{ lang() === 'es' ? 'El Caballo Peruano de Paso' : 'Peruvian Paso Horses' }}</h3>
            <p>{{ lang() === 'es' ? 'Conocido mundialmente como la "silla de montar más suave del planeta". Su paso llano de cuatro tiempos amortigua el viaje, haciéndolo un deleite para niños y principiantes.' : 'World-famous for its ultra-smooth four-beat gait that eliminates bouncing, making it a pure joy for beginners, families, and riders of any age.' }}</p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon-wrap">
              <span class="pillar-icon">📍</span>
            </div>
            <h3>{{ lang() === 'es' ? 'Base Fija en Yanque' : 'Heart of the Colca in Yanque' }}</h3>
            <p>{{ lang() === 'es' ? 'Ubicados en Av. Collahuas 101, Yanque. Salimos directamente a caballo desde nuestra finca hacia los andenes, ruinas de Uyo Uyo, baños termales y miradores sin perder tiempo en traslados.' : 'Located at Av. Collahuas 101 in Yanque. We ride out directly into ancient pre-Inca terraces, ruins, thermal pools, and canyon viewpoints without transfer delays.' }}</p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon-wrap">
              <span class="pillar-icon">🤠</span>
            </div>
            <h3>{{ lang() === 'es' ? 'Guiado Genuino por Don Wilbert' : 'Guided by Don Wilbert Málaga' }}</h3>
            <p>{{ lang() === 'es' ? 'Nacido y criado en el Valle del Colca. Don Wilbert y su hijo Anthony guían con paciencia y respeto, transmitiendo historias, leyendas y la cultura viva de la etnia Collagua.' : 'Born and raised in the Colca Valley. Wilbert and his family personally guide each tour with endless patience, sharing local legends and living Collagua culture.' }}</p>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon-wrap">
              <span class="pillar-icon">❤️</span>
            </div>
            <h3>{{ lang() === 'es' ? 'Bienestar Animal y Aperos' : 'Horse Welfare & Quality Tack' }}</h3>
            <p>{{ lang() === 'es' ? 'Monturas ergonómicas tradicionales de cuero repujado, alforjas andinas, estribos seguros y caballos bien alimentados con rotación ética de descanso diario.' : 'Handcrafted traditional leather saddles, Andean saddlebags, certified safety helmets, and healthy, well-nourished horses on ethical daily rest rotation.' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 3. CATÁLOGO COMPLETO DE LOS 12 CIRCUITOS A CABALLO (NUESTRAS RUTAS) -->
    <!-- ========================================================================= -->
    <section id="rutas" class="section section-white">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-group">
            <span class="section-badge">🗺️ {{ lang() === 'es' ? 'Catálogo Oficial' : 'Official Catalog' }}</span>
            <span class="section-badge gold">🐎 {{ lang() === 'es' ? '12 Rutas Disponibles' : '12 Available Routes' }}</span>
          </div>
          <h2>{{ lang() === 'es' ? 'Nuestras Rutas a Caballo' : 'Our Horseback Routes' }}</h2>
          <p class="section-subtitle">
            {{ lang() === 'es'
              ? 'Con Cabalgatas Kgoriwayra conoce las mejores rutas del Cañón del Colca a caballo y disfruta de una aventura única e inolvidable.'
              : 'With Cabalgatas Kgoriwayra, discover the finest horseback routes of the Colca Canyon and enjoy a truly unique and unforgettable adventure.'
            }}
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs">
          <button class="filter-btn" [class.active]="selectedCategory() === 'all'" (click)="setCategory('all')">
            {{ lang() === 'es' ? 'Todos los Circuitos (12)' : 'All Routes (12)' }}
          </button>
          <button class="filter-btn" [class.active]="selectedCategory() === 'yanque'" (click)="setCategory('yanque')">
            {{ lang() === 'es' ? 'Yanque y Pueblos Tradicionales (4)' : 'Yanque & Traditional Villages (4)' }}
          </button>
          <button class="filter-btn" [class.active]="selectedCategory() === 'miradores'" (click)="setCategory('miradores')">
            {{ lang() === 'es' ? 'Miradores y Arqueología (4)' : 'Viewpoints & Archaeology (4)' }}
          </button>
          <button class="filter-btn" [class.active]="selectedCategory() === 'aventura'" (click)="setCategory('aventura')">
            {{ lang() === 'es' ? 'Aventura y Grandes Expediciones (4)' : 'Adventure & Grand Expeditions (4)' }}
          </button>
        </div>

        <!-- Circuits Grid -->
        <div class="grid-3 circuits-grid">
          @for (tour of filteredTours(); track tour.slug) {
            <div class="circuit-card">
              <!-- Image Cover with Badges -->
              <div class="circuit-image-wrap">
                <img [src]="tour.coverImageUrl" [alt]="tour.title" class="circuit-img" loading="lazy" />
                <div class="circuit-badges-overlay">
                  <span class="circuit-location-badge">📍 {{ tour.location }}</span>
                  <span class="circuit-duration-badge">⏱️ {{ tour.durationHours }} {{ lang() === 'es' ? 'horas' : 'hrs' }}</span>
                </div>
                <div class="circuit-difficulty-tag" [class.easy]="tour.difficulty === 'Easy'" [class.moderate]="tour.difficulty === 'Moderate'" [class.difficult]="tour.difficulty === 'Difficult'">
                  {{ getDifficultyLabel(tour.difficulty) }}
                </div>
              </div>

              <!-- Content Body -->
              <div class="circuit-body">
                <h3 class="circuit-title">{{ tour.title }}</h3>
                <p class="circuit-desc">{{ tour.shortDescription }}</p>

                <!-- Key Highlights -->
                <div class="circuit-features">
                  <span class="feature-item">🐴 {{ lang() === 'es' ? 'Caballo Asignado' : 'Assigned Horse' }}</span>
                  <span class="feature-item">🤠 {{ lang() === 'es' ? 'Guía Chalan' : 'Local Guide' }}</span>
                  <span class="feature-item">🛡️ {{ lang() === 'es' ? 'Casco y Aperos' : 'Helmet & Tack' }}</span>
                </div>

                <!-- Footer / CTA -->
                <div class="circuit-footer">
                  <button class="btn btn-outline-primary btn-sm" (click)="openTourDetailsModal(tour)">
                    {{ lang() === 'es' ? 'Ver Itinerario' : 'View Itinerary' }}
                  </button>
                  <button class="btn btn-gold btn-sm" (click)="selectTourForBooking(tour)">
                    {{ lang() === 'es' ? 'Reservar Ruta' : 'Book Ride' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 4. DON WILBERT MÁLAGA: EL ALMA DE KGORIWAYRA -->
    <!-- ========================================================================= -->
    <section id="don-wilbert" class="section section-founder">
      <div class="container">
        <div class="founder-grid">
          <div class="founder-image-col">
            <div class="founder-frame">
              <img src="/assets/images/logo-kgoriwayra.jpg" alt="Don Wilbert Málaga y Cabalgatas Kgoriwayra" class="founder-img" />
              <div class="founder-badge-overlay">
                <span class="founder-name">Wilbert Málaga</span>
                <span class="founder-role">{{ lang() === 'es' ? 'Fundador y Guía Local Principal' : 'Founder & Lead Local Horseman' }}</span>
              </div>
            </div>
          </div>

          <div class="founder-content-col">
            <span class="section-badge gold">🤠 {{ lang() === 'es' ? 'Tradición de Familia' : 'Family Heritage' }}</span>
            <blockquote class="founder-quote">
              "{{ lang() === 'es' ? 'Todos nuestros circuitos tienen secretos que el viajero desconoce.' : 'All our circuits have secrets that the casual traveler never discovers.' }}"
            </blockquote>
            <p class="founder-bio">
              {{ lang() === 'es'
                ? 'Nacido y crecido en Yanque, Don Wilbert Málaga ha dedicado su vida al cuidado de los caballos y a recorrer cada quebrada, andenería y cumbre del Cañón del Colca. Acompañado por su familia y su hijo Anthony, ofrece una hospitalidad cálida, paciente y llena de sabiduría local.'
                : 'Born and raised in Yanque, Don Wilbert Málaga has dedicated his life to horse breeding and exploring every valley, gorge, terrace, and mountain summit in the Colca Canyon. Riding with him means entering an intimate family tradition filled with Andean wisdom.'
              }}
            </p>

            <div class="founder-features-list">
              <div class="feature-row">
                <span class="feat-check">✓</span>
                <div>
                  <strong>{{ lang() === 'es' ? 'Instrucción Personalizada a Principiantes:' : 'Patient Beginner Instruction:' }}</strong>
                  <span>{{ lang() === 'es' ? 'Antes de subir al caballo te explicamos postura, riendas y confianza con el animal.' : 'Before riding, we teach posture, reins control, and building confidence with your horse.' }}</span>
                </div>
              </div>
              <div class="feature-row">
                <span class="feat-check">✓</span>
                <div>
                  <strong>{{ lang() === 'es' ? 'Cuidado y Acompañamiento en Ruta:' : 'Safety Escort Along the Trail:' }}</strong>
                  <span>{{ lang() === 'es' ? 'Don Wilbert o sus arrieros van al frente abriendo camino y asistiendo en pendientes.' : 'Wilbert or his experienced horsemen ride ahead guiding and assisting in steep sections.' }}</span>
                </div>
              </div>
              <div class="feature-row">
                <span class="feat-check">✓</span>
                <div>
                  <strong>{{ lang() === 'es' ? 'Pasión por la Tierra Andina:' : 'Deep Love for Andean Heritage:' }}</strong>
                  <span>{{ lang() === 'es' ? 'Relatos en quechua y español sobre los Apus sagrados y la historia de los pueblos.' : 'Fascinating tales in Quechua and Spanish about sacred mountain spirits and ancient peoples.' }}</span>
                </div>
              </div>
            </div>

            <div class="founder-cta-wrap">
              <a href="#reservar" class="btn btn-gold btn-md">
                <span>{{ lang() === 'es' ? 'Cabalgar con Don Wilbert' : 'Ride with Don Wilbert' }}</span>
              </a>
              <a [href]="getWhatsAppLink()" target="_blank" class="btn btn-outline-white btn-md">
                <span>💬 {{ lang() === 'es' ? 'Contactar a Wilbert por WhatsApp' : 'Chat with Wilbert' }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 5. ACTIVIDADES COMPLEMENTARIAS (DE LA PÁGINA ORIGINAL) -->
    <!-- ========================================================================= -->
    <section id="actividades" class="section section-sand">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-badge">✨ {{ lang() === 'es' ? 'Más Aventura en el Colca' : 'More Colca Adventures' }}</span>
          <h2>{{ lang() === 'es' ? 'Actividades Complementarias' : 'Complementary Activities' }}</h2>
          <p class="section-subtitle">
            {{ lang() === 'es'
              ? 'Disfruta de nuestras actividades complementarias dentro del Cañón del Colca para enriquecer tu estadía con deportes de aventura y cultura viva.'
              : 'Enjoy our complementary activities within the Colca Canyon to enrich your stay with adventure sports and living Andean culture.'
            }}
          </p>
        </div>

        <div class="grid-3 activities-grid">
          @for (act of activities(); track act.slug) {
            <div class="activity-card">
              <div class="activity-header">
                <span class="activity-icon">{{ act.icon }}</span>
                <span class="activity-badge">{{ act.badge }}</span>
              </div>
              <h3 class="activity-title">{{ act.title }}</h3>
              <p class="activity-desc">{{ act.shortDescription }}</p>
              <div class="activity-action">
                <a [href]="getWhatsAppActivityLink(act.title)" target="_blank" class="btn-activity-inquire">
                  <span>💬 {{ lang() === 'es' ? 'Consultar Actividad' : 'Inquire on WhatsApp' }}</span>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 6. TESTIMONIOS REALES Y VERIFICADOS -->
    <!-- ========================================================================= -->
    <section id="testimonios" class="section section-white">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-badge">⭐ {{ lang() === 'es' ? 'Viajeros Satisfechos' : 'Verified Travelers' }}</span>
          <h2>{{ lang() === 'es' ? 'Lo que Dicen Nuestros Jinetes' : 'What Our Riders Say' }}</h2>
          <p class="section-subtitle">
            {{ lang() === 'es'
              ? 'Opiniones y vivencias reales de visitantes de todo el Perú y el mundo que han cabalgado con Don Wilbert Málaga.'
              : 'Authentic reviews and experiences from visitors from Peru and around the world who have ridden with Don Wilbert Málaga.'
            }}
          </p>
        </div>

        <div class="grid-3 reviews-grid">
          @for (rev of reviews(); track rev.id) {
            <div class="review-card">
              <div class="review-top">
                <img [src]="rev.avatarUrl" [alt]="rev.authorName" class="review-avatar" />
                <div class="review-author-meta">
                  <h4 class="review-name">{{ rev.authorName }}</h4>
                  <span class="review-location">📍 {{ rev.authorLocation }}</span>
                  <div class="review-stars">★★★★★</div>
                </div>
              </div>
              <div class="review-tour-tag">
                <span>🏇 {{ rev.tourName }}</span>
              </div>
              <p class="review-quote">
                "{{ rev.content }}"
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 7. FORMULARIO DE RESERVA INTERACTIVO CON LOS 12 CIRCUITOS -->
    <!-- ========================================================================= -->
    <section id="reservar" class="section section-booking">
      <div class="container container-sm">
        <div class="section-header text-center">
          <span class="section-badge gold">📅 {{ lang() === 'es' ? 'Reserva Directa Sin Intermediarios' : 'Direct Booking With Us' }}</span>
          <h2 class="booking-section-title">{{ lang() === 'es' ? 'Reserva tu Cabalgata en Yanque' : 'Book Your Horseback Tour' }}</h2>
          <p class="booking-section-sub">
            {{ lang() === 'es'
              ? 'Completa el formulario y te confirmaremos disponibilidad de inmediato con mensaje personalizado para Don Wilbert en WhatsApp.'
              : 'Fill out the form to secure your horses immediately. We will generate your confirmation code and WhatsApp link.'
            }}
          </p>
        </div>

        <div class="booking-card-wrap">
          @if (bookingSuccess()) {
            <div class="booking-success-box">
              <div class="success-icon">🎉</div>
              <h3>{{ lang() === 'es' ? '¡Solicitud Generada con Éxito!' : 'Booking Request Generated!' }}</h3>
              <p>
                {{ lang() === 'es'
                  ? 'Hemos recibido tu solicitud para Cabalgatas Kgoriwayra. Tu código oficial de reserva es:'
                  : 'We have received your reservation request. Your official booking code is:'
                }}
              </p>
              <div class="booking-code-chip">{{ lastBookingConfirmation()?.bookingCode }}</div>

              <div class="booking-summary-details">
                <div class="detail-row">
                  <span>{{ lang() === 'es' ? 'Titular:' : 'Name:' }}</span>
                  <strong>{{ lastBookingConfirmation()?.customerFullName }}</strong>
                </div>
                <div class="detail-row">
                  <span>{{ lang() === 'es' ? 'Circuito:' : 'Circuit:' }}</span>
                  <strong>{{ lastBookingConfirmation()?.tourOrActivityTitle }}</strong>
                </div>
                <div class="detail-row">
                  <span>{{ lang() === 'es' ? 'Fecha:' : 'Date:' }}</span>
                  <strong>{{ lastBookingConfirmation()?.serviceDate }}</strong>
                </div>
                <div class="detail-row">
                  <span>{{ lang() === 'es' ? 'Jinetes:' : 'Riders:' }}</span>
                  <strong>{{ lastBookingConfirmation()?.numberOfParticipants }} {{ lang() === 'es' ? 'personas' : 'riders' }}</strong>
                </div>
              </div>

              <div class="success-actions">
                <a [href]="lastBookingConfirmation()?.whatsAppRedirectUrl" target="_blank" class="btn btn-whatsapp btn-lg btn-full">
                  <span>💬 Enviar Confirmación por WhatsApp a Don Wilbert</span>
                </a>
                <button class="btn btn-outline-primary btn-full mt-2" (click)="resetBookingForm()">
                  {{ lang() === 'es' ? 'Hacer otra reserva' : 'Make another booking' }}
                </button>
              </div>
            </div>
          } @else {
            <form (ngSubmit)="submitBooking()" #bookingForm="ngForm" class="booking-form">
              <!-- Select Tour -->
              <div class="form-group">
                <label>{{ lang() === 'es' ? 'Selecciona tu Circuito a Caballo' : 'Choose Your Horseback Circuit' }} <span class="required">*</span></label>
                <select class="form-control" [(ngModel)]="bookingData.tourId" name="tourId" required>
                  <option [ngValue]="undefined" disabled>{{ lang() === 'es' ? '--- Selecciona una de las 12 rutas ---' : '--- Select one of the 12 routes ---' }}</option>
                  @for (t of allTours(); track t.slug) {
                    <option [value]="t.id">{{ t.title }} ({{ t.location }} • {{ t.durationHours }} hrs)</option>
                  }
                </select>
              </div>

              <!-- Rider Experience Level -->
              <div class="form-group">
                <label>{{ lang() === 'es' ? 'Nivel de Experiencia de los Jinetes' : 'Rider Experience Level' }}</label>
                <div class="experience-chips">
                  <button type="button" class="exp-chip" [class.active]="riderExperience === 'beginner'" (click)="riderExperience = 'beginner'">
                    🌱 {{ lang() === 'es' ? 'Principiante / Primera Vez (Caballos mansos)' : 'Beginner / First Time' }}
                  </button>
                  <button type="button" class="exp-chip" [class.active]="riderExperience === 'intermediate'" (click)="riderExperience = 'intermediate'">
                    🐎 {{ lang() === 'es' ? 'Intermedio (He montado antes)' : 'Intermediate Rider' }}
                  </button>
                  <button type="button" class="exp-chip" [class.active]="riderExperience === 'advanced'" (click)="riderExperience = 'advanced'">
                    ⭐ {{ lang() === 'es' ? 'Avanzado / Jinete experimentado' : 'Advanced / Experienced' }}
                  </button>
                </div>
              </div>

              <!-- Personal Info -->
              <div class="grid-2">
                <div class="form-group">
                  <label>{{ lang() === 'es' ? 'Nombre y Apellidos' : 'Full Name' }} <span class="required">*</span></label>
                  <input type="text" class="form-control" [(ngModel)]="bookingData.customerFullName" name="customerFullName" required [placeholder]="lang() === 'es' ? 'Ej: Juan Pérez' : 'e.g. John Doe'">
                </div>

                <div class="form-group">
                  <label>{{ lang() === 'es' ? 'WhatsApp / Teléfono' : 'WhatsApp / Phone' }} <span class="required">*</span></label>
                  <input type="tel" class="form-control" [(ngModel)]="bookingData.customerPhone" name="customerPhone" required [placeholder]="lang() === 'es' ? '+51 995 800 077' : '+1 234 567 890'">
                </div>
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label>{{ lang() === 'es' ? 'Correo Electrónico' : 'Email Address' }} <span class="required">*</span></label>
                  <input type="email" class="form-control" [(ngModel)]="bookingData.customerEmail" name="customerEmail" required placeholder="tuemail@ejemplo.com">
                </div>

                <div class="form-group">
                  <label>{{ lang() === 'es' ? 'País de Residencia' : 'Country' }}</label>
                  <input type="text" class="form-control" [(ngModel)]="bookingData.customerCountry" name="customerCountry" [placeholder]="lang() === 'es' ? 'Ej: Perú, España, Francia...' : 'e.g. USA, France, Germany...'">
                </div>
              </div>

              <div class="grid-2">
                <div class="form-group">
                  <label>{{ lang() === 'es' ? 'Fecha de la Cabalgata' : 'Tour Date' }} <span class="required">*</span></label>
                  <input type="date" class="form-control" [(ngModel)]="bookingData.serviceDate" name="serviceDate" required [min]="minDate">
                </div>

                <div class="form-group">
                  <label>{{ lang() === 'es' ? 'Número de Jinetes / Personas' : 'Number of Riders' }} <span class="required">*</span></label>
                  <input type="number" class="form-control" [(ngModel)]="bookingData.numberOfParticipants" name="numberOfParticipants" min="1" max="25" required>
                </div>
              </div>

              <div class="form-group">
                <label>{{ lang() === 'es' ? 'Hotel o Lugar de Alojamiento en Yanque / Chivay' : 'Hotel or Accommodation in Colca' }}</label>
                <input type="text" class="form-control" [(ngModel)]="bookingData.hotelOrPickupLocation" name="hotelOrPickupLocation" [placeholder]="lang() === 'es' ? 'Ej: Hotel Tradición Colca, Killawasi, etc.' : 'e.g. Hotel in Yanque or Chivay'">
              </div>

              <div class="form-group">
                <label>{{ lang() === 'es' ? 'Requerimientos Especiales o Consultas' : 'Special Notes / Children Age' }}</label>
                <textarea class="form-control" [(ngModel)]="bookingData.specialRequestsOrNotes" name="specialRequestsOrNotes" [placeholder]="lang() === 'es' ? 'Indícanos si viajas con niños o si deseas un horario especial de mañana o tarde.' : 'Let us know if riding with children or special morning/afternoon timing.'"></textarea>
              </div>

              @if (errorMessage()) {
                <div class="error-banner">
                  ⚠️ {{ errorMessage() }}
                </div>
              }

              <button type="submit" class="btn btn-gold btn-lg btn-full" [disabled]="isSubmitting() || !bookingForm.form.valid">
                @if (isSubmitting()) {
                  <span>{{ lang() === 'es' ? 'Generando reserva...' : 'Processing booking...' }}</span>
                } @else {
                  <span>🐎 {{ lang() === 'es' ? 'Confirmar Solicitud y Enviar por WhatsApp' : 'Confirm Request & Send via WhatsApp' }}</span>
                }
              </button>
            </form>
          }
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 8. FAQ ECUESTRE ACCORDION -->
    <!-- ========================================================================= -->
    <section class="section section-white">
      <div class="container container-sm">
        <div class="section-header text-center">
          <span class="section-badge">❓ {{ lang() === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions' }}</span>
          <h2>{{ lang() === 'es' ? 'Todo lo que Necesitas Saber' : 'Everything You Need to Know' }}</h2>
        </div>

        <div class="faq-list">
          <div class="faq-item" [class.open]="openFaq() === 1" (click)="toggleFaq(1)">
            <div class="faq-question">
              <h4>{{ lang() === 'es' ? '¿Se necesita experiencia previa para montar a caballo en el Colca?' : 'Do I need riding experience to participate?' }}</h4>
              <span class="faq-toggle">{{ openFaq() === 1 ? '−' : '+' }}</span>
            </div>
            @if (openFaq() === 1) {
              <p class="faq-answer">
                {{ lang() === 'es'
                  ? 'No se requiere experiencia. Nuestros caballos peruanos de paso y mestizos andinos son sumamente mansos, dóciles y seguros. Antes de iniciar brindamos una breve instrucción sobre riendas y postura. Además, Don Wilbert y arrieros acompañan de cerca a cada jinete.'
                  : 'No previous riding experience is required! Our Peruvian Paso horses are exceptionally gentle, docile, and sure-footed. We provide a full safety briefing before departing, and our guides accompany you every step of the way.'
                }}
              </p>
            }
          </div>

          <div class="faq-item" [class.open]="openFaq() === 2" (click)="toggleFaq(2)">
            <div class="faq-question">
              <h4>{{ lang() === 'es' ? '¿Qué ropa y calzado debo llevar para la cabalgata?' : 'What clothing and footwear should I wear?' }}</h4>
              <span class="faq-toggle">{{ openFaq() === 2 ? '−' : '+' }}</span>
            </div>
            @if (openFaq() === 2) {
              <p class="faq-answer">
                {{ lang() === 'es'
                  ? 'Recomendamos pantalón largo cómodo (jeans o pantalón de trekking), calzado cerrado o botas, bloqueador solar, lentes de sol, sombrero para el sol y una chaqueta cortaviento o polar para cuando baje el sol.'
                  : 'We recommend comfortable long pants (jeans or hiking trousers), sturdy closed shoes or boots, sunscreen, sunglasses, a sun hat, and a warm fleece or windbreaker jacket for cooler mountain breezes.'
                }}
              </p>
            }
          </div>

          <div class="faq-item" [class.open]="openFaq() === 3" (click)="toggleFaq(3)">
            <div class="faq-question">
              <h4>{{ lang() === 'es' ? '¿Pueden participar niños y familias?' : 'Can children and families join the tours?' }}</h4>
              <span class="faq-toggle">{{ openFaq() === 3 ? '−' : '+' }}</span>
            </div>
            @if (openFaq() === 3) {
              <p class="faq-answer">
                {{ lang() === 'es'
                  ? '¡Sí! Las cabalgatas son una experiencia familiar maravillosa. Tenemos rutas tranquilas como el Circuito Tradicional o Uyo Uyo aptas para niños desde los 5 años, con un arriero a pie llevando el caballo con soga guía si los padres lo desean.'
                  : 'Absolutely! Our horseback tours are a wonderful family experience. Routes such as the Traditional Yanque or Uyo Uyo circuits are suitable for children from 5 years old, with a horseman walking alongside holding the lead rope for complete safety.'
                }}
              </p>
            }
          </div>

          <div class="faq-item" [class.open]="openFaq() === 4" (click)="toggleFaq(4)">
            <div class="faq-question">
              <h4>{{ lang() === 'es' ? '¿Dónde queda el punto de encuentro?' : 'Where is the meeting point in Yanque?' }}</h4>
              <span class="faq-toggle">{{ openFaq() === 4 ? '−' : '+' }}</span>
            </div>
            @if (openFaq() === 4) {
              <p class="faq-answer">
                {{ lang() === 'es'
                  ? 'Nuestra base principal y establos están en Av. Collahuas 101, Yanque (a 2 cuadras de la Plaza de Armas). También podemos coordinar el recojo en tu hotel en Yanque o Chivay previa coordinación.'
                  : 'Our main stables are located at Av. Collahuas 101 in Yanque (just 2 blocks from Yanque Plaza). We can also arrange pickup at your hotel in Yanque or Chivay upon advance request.'
                }}
              </p>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 9. MODAL INTERACTIVO DE DETALLES DE CIRCUITO -->
    <!-- ========================================================================= -->
    @if (selectedTourModal(); as modalTour) {
      <div class="modal-backdrop" (click)="closeTourDetailsModal()">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeTourDetailsModal()" aria-label="Cerrar">✕</button>

          <div class="modal-hero-img">
            <img [src]="modalTour.coverImageUrl" [alt]="modalTour.title" />
            <div class="modal-hero-overlay">
              <span class="modal-badge-loc">📍 {{ modalTour.location }}</span>
              <span class="modal-badge-dur">⏱️ {{ modalTour.durationHours }} {{ lang() === 'es' ? 'Horas' : 'Hours' }}</span>
            </div>
          </div>

          <div class="modal-body">
            <h2 class="modal-title">{{ modalTour.title }}</h2>
            <p class="modal-desc">{{ modalTour.shortDescription }}</p>

            <div class="modal-section-box">
              <h4>🐎 {{ lang() === 'es' ? '¿Qué Incluye Esta Cabalgata?' : 'What Is Included?' }}</h4>
              <ul class="modal-list">
                <li>✓ {{ lang() === 'es' ? 'Caballo Peruano de Paso / Mestizo Andino dócil seleccionado según tu contextura y nivel' : 'Docile Peruvian Paso horse chosen according to your height and riding level' }}</li>
                <li>✓ {{ lang() === 'es' ? 'Montura tradicional de cuero repujado, estribos de cajón y alforjas' : 'Handcrafted traditional leather saddle, stirrups, and saddlebags' }}</li>
                <li>✓ {{ lang() === 'es' ? 'Casco de seguridad certificado para cabalgata' : 'Certified riding safety helmet' }}</li>
                <li>✓ {{ lang() === 'es' ? 'Guía local chalan (Don Wilbert Málaga o arrieros expertos de Yanque)' : 'Experienced local horseman guide (Wilbert Málaga or native horsemen)' }}</li>
                <li>✓ {{ lang() === 'es' ? 'Instrucción y acompañamiento personalizado durante todo el recorrido' : 'Personal safety instruction and assistance throughout the route' }}</li>
              </ul>
            </div>

            <div class="modal-section-box">
              <h4>🎒 {{ lang() === 'es' ? '¿Qué Debes Traer?' : 'What to Bring?' }}</h4>
              <p class="modal-tips">
                {{ lang() === 'es'
                  ? 'Pantalón largo cómodo, zapatillas o botas cerradas, bloqueador solar, lentes de sol, chaqueta cortaviento y cámara fotográfica o teléfono.'
                  : 'Comfortable long pants, closed shoes or boots, sunscreen, sunglasses, a windbreaker jacket, and a camera or smartphone.'
                }}
              </p>
            </div>

            <div class="modal-footer">
              <button class="btn btn-outline-primary" (click)="closeTourDetailsModal()">
                {{ lang() === 'es' ? 'Cerrar' : 'Close' }}
              </button>
              <button class="btn btn-gold" (click)="selectTourForBooking(modalTour); closeTourDetailsModal()">
                {{ lang() === 'es' ? 'Reservar Este Circuito' : 'Book This Circuit' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- Floating WhatsApp Button -->
    <a [href]="getWhatsAppLink()" target="_blank" class="floating-whatsapp" title="Escríbenos a WhatsApp">
      <div class="pulse-ring"></div>
      <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19.53-.98.98-1.39 1.01-.39.03-.89.04-1.45-.14-.34-.11-.78-.26-1.33-.5-2.35-1.02-3.88-3.39-3.99-3.55-.12-.15-.96-1.28-.96-2.44s.61-1.74.83-1.97c.21-.24.47-.3.63-.3.16 0 .32.01.45.01.14.01.34-.05.53.41.19.46.66 1.62.72 1.74.06.12.1.26.02.42-.08.17-.12.27-.24.41-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.36 1.69.94.84 1.73 1.1 1.97 1.22.25.12.39.1.53-.06.15-.17.63-.73.8-1 .17-.26.34-.22.58-.13.24.09 1.51.71 1.77.84.26.13.43.19.49.3.07.1.07.61-.12 1.14z"/></svg>
    </a>
  `,
  styles: [`
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    // =========================================================================
    // 1. HERO SECTION STYLES
    // =========================================================================
    .hero-section {
      position: relative;
      min-height: 92vh;
      display: flex;
      align-items: center;
      background: linear-gradient(180deg, rgba(28, 16, 8, 0.82) 0%, rgba(44, 27, 18, 0.88) 100%),
                  url('/assets/images/circuits/cabalgata-06horas.jpg') center/cover no-repeat;
      padding: 6rem 0 5rem 0;
      color: #FFFFFF;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(61, 35, 20, 0.4) 0%, rgba(20, 10, 5, 0.85) 100%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 960px;
    }

    .hero-brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      background: rgba(250, 246, 238, 0.12);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(209, 148, 52, 0.45);
      border-radius: $radius-full;
      padding: 0.5rem 1.4rem 0.5rem 0.6rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

      .badge-emblem {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid $color-accent;
        flex-shrink: 0;

        .hero-badge-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .badge-info {
        display: flex;
        flex-direction: column;
        text-align: left;

        .badge-title {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.6px;
          color: $color-accent-light;
        }

        .badge-subtitle {
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.4px;
        }
      }
    }

    .hero-title {
      font-family: $font-heading;
      font-size: clamp(2.8rem, 6vw, 4.8rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 0.5rem;
      color: #FFFFFF;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);

      .script-accent {
        font-family: $font-script;
        font-weight: 400;
        color: $color-accent;
        font-size: 1.15em;
        display: inline-block;
        margin-left: 0.3rem;
      }
    }

    .hero-motto {
      font-size: clamp(1.15rem, 2.4vw, 1.6rem);
      font-weight: 600;
      color: $color-sand-dark;
      letter-spacing: 0.4px;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: clamp(1.02rem, 1.8vw, 1.25rem);
      line-height: 1.65;
      color: rgba(255, 255, 255, 0.92);
      max-width: 820px;
      margin: 0 auto 2.5rem auto;
    }

    .hero-cta-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3.5rem;

      .btn-gold {
        background: linear-gradient(135deg, $color-accent 0%, $color-accent-dark 100%);
        color: #FFFFFF;
        font-weight: 700;
        border: none;
        box-shadow: 0 4px 18px rgba(209, 148, 52, 0.45);
        &:hover {
          background: linear-gradient(135deg, $color-accent-light 0%, $color-accent 100%);
          transform: translateY(-2px);
        }
      }
    }

    .hero-trust-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.15);

      @include respond-to(md) {
        grid-template-columns: repeat(4, 1fr);
      }

      .trust-card {
        background: rgba(28, 16, 8, 0.55);
        border: 1px solid rgba(209, 148, 52, 0.25);
        border-radius: $radius-md;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        backdrop-filter: blur(6px);

        .trust-icon {
          font-size: 1.8rem;
          margin-bottom: 0.4rem;
        }

        strong {
          font-size: 0.95rem;
          color: #FFFFFF;
          margin-bottom: 0.2rem;
        }

        small {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.3;
        }
      }
    }

    // =========================================================================
    // 2. PILARES & SECTION HEADERS
    // =========================================================================
    .section-badge {
      display: inline-block;
      padding: 0.35rem 1rem;
      border-radius: $radius-full;
      background: rgba(61, 35, 20, 0.08);
      color: $color-primary;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 0.8rem;
      text-transform: uppercase;

      &.gold {
        background: rgba(209, 148, 52, 0.15);
        color: $color-accent-dark;
      }
    }

    .section-badge-group {
      display: flex;
      justify-content: center;
      gap: 0.6rem;
      margin-bottom: 0.8rem;
    }

    .section-subtitle {
      font-size: 1.15rem;
      color: $color-text-muted;
      max-width: 760px;
      margin: 0.5rem auto 2.5rem auto;
      line-height: 1.6;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @include respond-to(sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-to(lg) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .pillar-card {
      background: #FFFFFF;
      border: 1px solid rgba(61, 35, 20, 0.08);
      border-radius: $radius-lg;
      padding: 2.2rem 1.6rem;
      text-align: center;
      box-shadow: 0 4px 20px rgba(61, 35, 20, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 30px rgba(164, 82, 34, 0.14);
        border-color: rgba(209, 148, 52, 0.4);
      }

      .pillar-icon-wrap {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: $color-sand;
        border: 2px solid $color-accent;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.2rem auto;

        .pillar-icon {
          font-size: 2rem;
        }
      }

      h3 {
        font-family: $font-heading;
        font-size: 1.25rem;
        color: $color-primary;
        margin-bottom: 0.75rem;
      }

      p {
        font-size: 0.92rem;
        line-height: 1.6;
        color: $color-text-muted;
        margin: 0;
      }
    }

    // =========================================================================
    // 3. CIRCUITOS TABS & CARDS (12 RUTAS)
    // =========================================================================
    .filter-tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.6rem;
      margin-bottom: 3rem;

      .filter-btn {
        background: $color-sand;
        border: 1px solid rgba(61, 35, 20, 0.12);
        color: $color-text-main;
        padding: 0.6rem 1.4rem;
        border-radius: $radius-full;
        font-size: 0.92rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover {
          background: rgba(209, 148, 52, 0.12);
          border-color: $color-accent;
        }

        &.active {
          background: $color-primary;
          color: #FFFFFF;
          border-color: $color-primary;
          box-shadow: 0 4px 14px rgba(61, 35, 20, 0.25);
        }
      }
    }

    .circuits-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;

      @include respond-to(md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-to(lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .circuit-card {
      background: #FFFFFF;
      border-radius: $radius-lg;
      overflow: hidden;
      border: 1px solid rgba(61, 35, 20, 0.1);
      box-shadow: 0 6px 24px rgba(61, 35, 20, 0.06);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 36px rgba(61, 35, 20, 0.14);
        border-color: $color-accent;
      }

      .circuit-image-wrap {
        position: relative;
        height: 230px;
        overflow: hidden;
        background: #2C1B12;

        .circuit-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        &:hover .circuit-img {
          transform: scale(1.08);
        }

        .circuit-badges-overlay {
          position: absolute;
          bottom: 10px;
          left: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .circuit-location-badge {
          background: rgba(44, 27, 18, 0.85);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: $radius-full;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .circuit-duration-badge {
          background: rgba(209, 148, 52, 0.9);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: $radius-full;
        }

        .circuit-difficulty-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.7rem;
          border-radius: $radius-full;
          color: #FFFFFF;

          &.easy { background: #2E7D32; }
          &.moderate { background: #E67E22; }
          &.difficult { background: #C0392B; }
        }
      }

      .circuit-body {
        padding: 1.6rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .circuit-title {
          font-family: $font-heading;
          font-size: 1.35rem;
          font-weight: 700;
          color: $color-primary;
          margin: 0 0 0.75rem 0;
          line-height: 1.25;
        }

        .circuit-desc {
          font-size: 0.92rem;
          line-height: 1.55;
          color: $color-text-muted;
          margin: 0 0 1.2rem 0;
          flex-grow: 1;
        }

        .circuit-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.4rem;
          padding-top: 0.8rem;
          border-top: 1px dashed rgba(61, 35, 20, 0.12);

          .feature-item {
            font-size: 0.76rem;
            color: $color-primary-light;
            background: $color-sand;
            padding: 0.2rem 0.55rem;
            border-radius: $radius-xs;
            font-weight: 600;
          }
        }

        .circuit-footer {
          display: flex;
          gap: 0.6rem;
          justify-content: space-between;

          .btn {
            flex: 1;
            text-align: center;
          }
        }
      }
    }

    // =========================================================================
    // 4. SECCIÓN DON WILBERT MÁLAGA
    // =========================================================================
    .section-founder {
      background: $color-primary-dark;
      color: #FFFFFF;
      padding: 6rem 0;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 80% 20%, rgba(209, 148, 52, 0.15) 0%, transparent 60%);
        pointer-events: none;
      }
    }

    .founder-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3.5rem;
      align-items: center;

      @include respond-to(lg) {
        grid-template-columns: 420px 1fr;
      }
    }

    .founder-frame {
      position: relative;
      border-radius: $radius-lg;
      overflow: hidden;
      border: 3px solid $color-accent;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
      background: #2C1B12;

      .founder-img {
        width: 100%;
        height: auto;
        display: block;
      }

      .founder-badge-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(180deg, transparent 0%, rgba(20, 10, 5, 0.95) 100%);
        padding: 1.5rem 1.2rem 1rem 1.2rem;
        display: flex;
        flex-direction: column;

        .founder-name {
          font-family: $font-heading;
          font-size: 1.4rem;
          font-weight: 800;
          color: $color-accent-light;
        }

        .founder-role {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    .founder-quote {
      font-family: $font-heading;
      font-size: clamp(1.4rem, 2.6vw, 1.95rem);
      font-style: italic;
      line-height: 1.4;
      color: $color-accent-light;
      margin: 1rem 0 1.5rem 0;
      padding-left: 1.2rem;
      border-left: 4px solid $color-accent;
    }

    .founder-bio {
      font-size: 1.05rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
    }

    .founder-features-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2.5rem;

      .feature-row {
        display: flex;
        align-items: flex-start;
        gap: 0.85rem;

        .feat-check {
          background: $color-accent;
          color: $color-primary-dark;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.75rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        strong {
          color: $color-accent-light;
          display: block;
          font-size: 0.98rem;
          margin-bottom: 0.15rem;
        }

        span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }

    .founder-cta-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    // =========================================================================
    // 5. ACTIVIDADES COMPLEMENTARIAS
    // =========================================================================
    .activities-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @include respond-to(md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-to(lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .activity-card {
      background: #FFFFFF;
      border: 1px solid rgba(61, 35, 20, 0.08);
      border-radius: $radius-lg;
      padding: 1.8rem;
      box-shadow: 0 4px 16px rgba(61, 35, 20, 0.04);
      display: flex;
      flex-direction: column;
      transition: all 0.25s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(61, 35, 20, 0.1);
        border-color: $color-secondary;
      }

      .activity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        .activity-icon {
          font-size: 2.2rem;
        }

        .activity-badge {
          background: rgba(164, 82, 34, 0.1);
          color: $color-secondary;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: $radius-full;
        }
      }

      .activity-title {
        font-family: $font-heading;
        font-size: 1.3rem;
        color: $color-primary;
        margin: 0 0 0.6rem 0;
      }

      .activity-desc {
        font-size: 0.92rem;
        line-height: 1.55;
        color: $color-text-muted;
        margin: 0 0 1.4rem 0;
        flex-grow: 1;
      }

      .btn-activity-inquire {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: $color-secondary;
        font-weight: 700;
        font-size: 0.9rem;
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
          color: $color-primary-dark;
          text-decoration: underline;
        }
      }
    }

    // =========================================================================
    // 6. TESTIMONIOS REALES
    // =========================================================================
    .reviews-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @include respond-to(md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include respond-to(lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .review-card {
      background: $color-sand-light;
      border: 1px solid rgba(61, 35, 20, 0.08);
      border-radius: $radius-lg;
      padding: 1.8rem;
      box-shadow: 0 4px 16px rgba(61, 35, 20, 0.04);
      display: flex;
      flex-direction: column;

      .review-top {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.8rem;

        .review-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid $color-accent;
          flex-shrink: 0;
        }

        .review-name {
          font-family: $font-heading;
          font-size: 1.1rem;
          color: $color-primary;
          margin: 0 0 0.15rem 0;
        }

        .review-location {
          font-size: 0.78rem;
          color: $color-text-muted;
          display: block;
        }

        .review-stars {
          color: #F39C12;
          font-size: 0.85rem;
          margin-top: 0.15rem;
        }
      }

      .review-tour-tag {
        margin-bottom: 0.8rem;

        span {
          background: rgba(61, 35, 20, 0.06);
          color: $color-primary;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: $radius-xs;
        }
      }

      .review-quote {
        font-size: 0.92rem;
        line-height: 1.6;
        color: $color-text-main;
        margin: 0;
        font-style: italic;
      }
    }

    // =========================================================================
    // 7. BOOKING FORM
    // =========================================================================
    .section-booking {
      background: linear-gradient(180deg, #FAF6EE 0%, #EDE4D4 100%);
      padding: 5.5rem 0;
    }

    .booking-section-title {
      font-family: $font-heading;
      font-size: clamp(2rem, 3.8vw, 3rem);
      color: $color-primary;
      margin: 0.5rem 0;
    }

    .booking-section-sub {
      font-size: 1.1rem;
      color: $color-text-muted;
      max-width: 680px;
      margin: 0 auto 2.5rem auto;
      line-height: 1.6;
    }

    .booking-card-wrap {
      background: #FFFFFF;
      border-radius: $radius-lg;
      padding: 2.5rem 2rem;
      border: 1px solid rgba(61, 35, 20, 0.12);
      box-shadow: 0 12px 40px rgba(61, 35, 20, 0.1);

      @include respond-to(md) {
        padding: 3rem 2.8rem;
      }
    }

    .experience-chips {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      @include respond-to(md) {
        flex-direction: row;
      }

      .exp-chip {
        flex: 1;
        background: $color-sand;
        border: 1px solid rgba(61, 35, 20, 0.15);
        color: $color-text-main;
        padding: 0.65rem 0.9rem;
        border-radius: $radius-sm;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;

        &:hover {
          border-color: $color-accent;
        }

        &.active {
          background: rgba(209, 148, 52, 0.15);
          border-color: $color-accent;
          color: $color-primary-dark;
          font-weight: 700;
        }
      }
    }

    .booking-success-box {
      text-align: center;
      padding: 1.5rem 0;

      .success-icon {
        font-size: 3.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-family: $font-heading;
        font-size: 1.8rem;
        color: $color-primary;
        margin-bottom: 0.6rem;
      }

      .booking-code-chip {
        display: inline-block;
        background: $color-primary;
        color: $color-accent-light;
        font-family: monospace;
        font-size: 1.4rem;
        font-weight: 700;
        padding: 0.6rem 1.6rem;
        border-radius: $radius-md;
        margin: 1rem 0 1.8rem 0;
        letter-spacing: 2px;
      }

      .booking-summary-details {
        background: $color-sand;
        border-radius: $radius-md;
        padding: 1.2rem;
        margin-bottom: 2rem;
        text-align: left;

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          font-size: 0.95rem;
          border-bottom: 1px dashed rgba(61, 35, 20, 0.1);

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }

    .error-banner {
      background: #FDEDEB;
      color: #C0392B;
      padding: 0.8rem 1rem;
      border-radius: $radius-sm;
      margin-bottom: 1.2rem;
      font-size: 0.9rem;
    }

    // =========================================================================
    // 8. FAQ LIST
    // =========================================================================
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .faq-item {
        background: $color-sand;
        border-radius: $radius-md;
        padding: 1.3rem 1.6rem;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: #EFE7DA;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;

          h4 {
            margin: 0;
            font-size: 1.1rem;
            color: $color-primary;
          }

          .faq-toggle {
            font-size: 1.5rem;
            color: $color-accent;
            font-weight: 700;
          }
        }

        .faq-answer {
          margin-top: 0.9rem;
          margin-bottom: 0;
          font-size: 0.95rem;
          line-height: 1.65;
          color: $color-text-muted;
        }
      }
    }

    // =========================================================================
    // 9. MODAL INTERACTIVO DE DETALLES
    // =========================================================================
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(20, 10, 5, 0.75);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-dialog {
      background: #FFFFFF;
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: $radius-lg;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
      animation: scaleUp 0.25s ease-out;

      .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(0, 0, 0, 0.6);
        color: #FFFFFF;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 1.1rem;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;

        &:hover {
          background: $color-primary;
        }
      }

      .modal-hero-img {
        position: relative;
        height: 260px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-hero-overlay {
          position: absolute;
          bottom: 12px;
          left: 15px;
          display: flex;
          gap: 0.5rem;

          .modal-badge-loc, .modal-badge-dur {
            background: rgba(20, 10, 5, 0.85);
            color: #FFFFFF;
            font-size: 0.82rem;
            font-weight: 700;
            padding: 0.3rem 0.8rem;
            border-radius: $radius-full;
          }

          .modal-badge-dur {
            background: $color-accent;
            color: #FFFFFF;
          }
        }
      }

      .modal-body {
        padding: 2rem;

        .modal-title {
          font-family: $font-heading;
          font-size: 1.7rem;
          color: $color-primary;
          margin: 0 0 0.75rem 0;
        }

        .modal-desc {
          font-size: 1.02rem;
          line-height: 1.65;
          color: $color-text-main;
          margin-bottom: 1.5rem;
        }

        .modal-section-box {
          background: $color-sand;
          border-radius: $radius-md;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1.2rem;

          h4 {
            font-size: 1.05rem;
            color: $color-primary;
            margin: 0 0 0.8rem 0;
          }

          .modal-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            li {
              font-size: 0.92rem;
              color: $color-text-main;
              line-height: 1.4;
            }
          }

          .modal-tips {
            font-size: 0.92rem;
            color: $color-text-muted;
            margin: 0;
            line-height: 1.5;
          }
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.8rem;
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly tourService = inject(TourService);
  private readonly activityService = inject(ActivityService);
  private readonly testimonialService = inject(TestimonialService);
  private readonly bookingService = inject(BookingService);
  private readonly langService = inject(LanguageService);

  readonly lang = this.langService.currentLang;
  readonly allTours = signal<TourSummary[]>([]);
  readonly activities = signal<ActivityItem[]>([]);
  readonly reviews = signal<CustomerReview[]>([]);
  readonly selectedCategory = signal<string>('all');

  readonly selectedTourModal = signal<TourSummary | null>(null);
  readonly openFaq = signal<number | null>(1);

  readonly isSubmitting = signal(false);
  readonly bookingSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly lastBookingConfirmation = signal<BookingConfirmationResponse | null>(null);

  riderExperience: string = 'beginner';
  minDate: string = new Date().toISOString().split('T')[0];

  bookingData: CreateBookingRequest = {
    customerFullName: '',
    customerEmail: '',
    customerPhone: '',
    customerCountry: '',
    serviceDate: new Date().toISOString().split('T')[0],
    numberOfParticipants: 2,
    hotelOrPickupLocation: '',
    specialRequestsOrNotes: ''
  };

  readonly filteredTours = computed(() => {
    const cat = this.selectedCategory();
    const tours = this.allTours();
    if (cat === 'all') return tours;

    if (cat === 'yanque') {
      return tours.filter(t => ['circuito-uyo-uyo', 'pueblos-antiguos', 'aguas-termales', 'circuito-tradicional'].includes(t.slug));
    }
    if (cat === 'miradores') {
      return tours.filter(t => ['mirador-achomani', 'mirador-kgoriwayra', 'fortaleza-chimpa', 'geiser-pinchollo'].includes(t.slug));
    }
    if (cat === 'aventura') {
      return tours.filter(t => ['origen-amazonas', 'tres-canones', 'sabancaya', 'parte-profunda-colca'].includes(t.slug));
    }
    return tours;
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.tourService.getAllTours().subscribe(t => {
      this.allTours.set(t);
    });

    this.activityService.getActivities().subscribe(a => {
      this.activities.set(a);
    });

    this.testimonialService.getReviews().subscribe(r => {
      this.reviews.set(r);
    });
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  getDifficultyLabel(diff: string): string {
    const isEn = this.lang() === 'en';
    switch (diff) {
      case 'Easy': return isEn ? 'Beginner / Family' : 'Familiar / Principiantes';
      case 'Moderate': return isEn ? 'Intermediate' : 'Nivel Intermedio';
      case 'Difficult': return isEn ? 'Challenging Expedition' : 'Expedición de Aventura';
      default: return diff;
    }
  }

  openTourDetailsModal(tour: TourSummary): void {
    this.selectedTourModal.set(tour);
  }

  closeTourDetailsModal(): void {
    this.selectedTourModal.set(null);
  }

  selectTourForBooking(tour: TourSummary): void {
    this.bookingData.tourId = tour.id;
    const el = document.getElementById('reservar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleFaq(index: number): void {
    this.openFaq.update(current => current === index ? null : index);
  }

  getWhatsAppLink(): string {
    return this.bookingService.getWhatsAppDirectLink();
  }

  getWhatsAppActivityLink(activityTitle: string): string {
    const text = encodeURIComponent(`Hola Cabalgatas Kgoriwayra, deseo información sobre la actividad de: *${activityTitle}* en el Colca.`);
    return `https://wa.me/51995800077?text=${text}`;
  }

  submitBooking(): void {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // Append experience level to notes
    const expLabel = this.riderExperience === 'beginner'
      ? 'Principiante (primera vez)'
      : (this.riderExperience === 'intermediate' ? 'Intermedio' : 'Avanzado');

    const originalNotes = this.bookingData.specialRequestsOrNotes || '';
    this.bookingData.specialRequestsOrNotes = `[Nivel jinete: ${expLabel}] ${originalNotes}`.trim();

    this.bookingService.createBooking(this.bookingData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success && res.data) {
          this.bookingSuccess.set(true);
          this.lastBookingConfirmation.set(res.data);
        } else {
          this.errorMessage.set(res.message || 'Error al procesar la reserva.');
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        const selectedTour = this.allTours().find(t => t.id === this.bookingData.tourId);
        const tourTitle = selectedTour ? selectedTour.title : 'Cabalgata en el Colca';
        const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const mockCode = `KG-${todayStr}-77`;

        const waMsg = `*🐎 Solicitud de Cabalgata: ${mockCode}*\n` +
                      `*Jinete:* ${this.bookingData.customerFullName}\n` +
                      `*Circuito:* ${tourTitle}\n` +
                      `*Nivel de Jinete:* ${expLabel}\n` +
                      `*Fecha:* ${this.bookingData.serviceDate}\n` +
                      `*Participantes:* ${this.bookingData.numberOfParticipants}\n` +
                      `*Alojamiento:* ${this.bookingData.hotelOrPickupLocation || 'Por definir'}\n\n` +
                      `¡Hola Don Wilbert Málaga! Acabo de enviar mi solicitud de cabalgata desde la web. ¿Tiene disponibilidad?`;

        this.bookingSuccess.set(true);
        this.lastBookingConfirmation.set({
          bookingCode: mockCode,
          status: 'Pending',
          customerFullName: this.bookingData.customerFullName,
          tourOrActivityTitle: tourTitle,
          serviceDate: this.bookingData.serviceDate,
          numberOfParticipants: this.bookingData.numberOfParticipants,
          whatsAppRedirectUrl: `https://wa.me/51995800077?text=${encodeURIComponent(waMsg)}`,
          createdAtUtc: new Date().toISOString()
        });
      }
    });
  }

  resetBookingForm(): void {
    this.bookingSuccess.set(false);
    this.bookingData = {
      customerFullName: '',
      customerEmail: '',
      customerPhone: '',
      customerCountry: '',
      serviceDate: new Date().toISOString().split('T')[0],
      numberOfParticipants: 2,
      hotelOrPickupLocation: '',
      specialRequestsOrNotes: ''
    };
  }
}
