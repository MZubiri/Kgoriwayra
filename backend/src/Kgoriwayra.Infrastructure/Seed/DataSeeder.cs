using Kgoriwayra.Domain.Entities;
using Kgoriwayra.Domain.Enums;
using Kgoriwayra.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Kgoriwayra.Infrastructure.Seed;

public class DataSeeder
{
    private readonly AppDbContext _context;
    private readonly ILogger<DataSeeder> _logger;

    public DataSeeder(AppDbContext context, ILogger<DataSeeder> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task SeedAsync(string? adminEmail = null, string? adminPassword = null)
    {
        try
        {
            await SeedRolesAsync();
            await SeedAdminUserAsync(adminEmail, adminPassword);
            await SeedSiteSettingsAsync();
            await SeedCategoriesAndToursAsync();
            await SeedActivitiesAsync();
            await SeedInitialTestimonialsAsync();
            await _context.SaveChangesAsync();
            _logger.LogInformation("Database seeded successfully with initial data.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while seeding database.");
            throw;
        }
    }

    private async Task SeedRolesAsync()
    {
        if (!await _context.Roles.AnyAsync())
        {
            var roles = new List<Role>
            {
                new() { Id = 1, Name = "Admin", Description = "Acceso total a la plataforma y configuraciones" },
                new() { Id = 2, Name = "Operator", Description = "Gestión de reservas y seguimiento a clientes" },
                new() { Id = 3, Name = "Editor", Description = "Edición de contenidos, circuitos, blog y galería" }
            };
            await _context.Roles.AddRangeAsync(roles);
            await _context.SaveChangesAsync();
        }
    }

    private async Task SeedAdminUserAsync(string? email, string? password)
    {
        var targetEmail = string.IsNullOrWhiteSpace(email) ? "admin@cabalgataskgoriwayra.com" : email;
        var targetPass = string.IsNullOrWhiteSpace(password) ? "Admin123!*" : password;

        if (!await _context.Users.AnyAsync(u => u.Email == targetEmail))
        {
            var adminUser = new User
            {
                Email = targetEmail,
                FullName = "Administrador Kgoriwayra",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(targetPass),
                RoleId = 1,
                IsActive = true,
                CreatedAtUtc = DateTime.UtcNow
            };
            await _context.Users.AddAsync(adminUser);
            await _context.SaveChangesAsync();
        }
    }

    private async Task SeedSiteSettingsAsync()
    {
        if (!await _context.SiteSettings.AnyAsync())
        {
            var settings = new List<SiteSetting>
            {
                new() { Key = "ContactPhone1", Value = "+51 995 800 077", Group = "Contact", Description = "Teléfono de contacto principal" },
                new() { Key = "ContactPhone2", Value = "+51 930 435 273", Group = "Contact", Description = "Teléfono de contacto secundario" },
                new() { Key = "WhatsAppNumber", Value = "51995800077", Group = "Contact", Description = "Número de WhatsApp para reservas" },
                new() { Key = "ContactAddress", Value = "Av. Collahuas 101 - Yanque, Cañón del Colca, Arequipa, Perú", Group = "Contact", Description = "Dirección física" },
                new() { Key = "BusinessHours", Value = "07:00 - 16:00 (Lunes a Domingo)", Group = "General", Description = "Horario de atención" },
                new() { Key = "ContactEmail", Value = "reservas@cabalgataskgoriwayra.com", Group = "Contact", Description = "Email para reservas" },
                new() { Key = "FacebookUrl", Value = "https://facebook.com/cabalgataskgoriwayracolca", Group = "Social", Description = "Página de Facebook" },
                new() { Key = "InstagramUrl", Value = "https://instagram.com/cabalgataskgoriwayra", Group = "Social", Description = "Perfil de Instagram" },
                new() { Key = "WhatsAppDefaultMessage", Value = "Hola Cabalgatas Kgoriwayra, deseo información y reservar una cabalgata en el Colca.", Group = "General", Description = "Mensaje predeterminado de WhatsApp" },
                new() { Key = "SiteName", Value = "Cabalgatas Kgoriwayra", Group = "General", Description = "Nombre de la marca" },
                new() { Key = "FounderName", Value = "Wilbert Málaga", Group = "General", Description = "Fundador y Guía Principal" }
            };
            await _context.SiteSettings.AddRangeAsync(settings);
            await _context.SaveChangesAsync();
        }
    }

    private async Task SeedCategoriesAndToursAsync()
    {
        if (!await _context.TourCategories.AnyAsync())
        {
            var catTraditional = new TourCategory { NameEs = "Circuitos Tradicionales", NameEn = "Traditional Tours", Slug = "tradicionales", SortOrder = 1 };
            var catAdventure = new TourCategory { NameEs = "Aventura y Cañón", NameEn = "Adventure & Canyon", Slug = "aventura", SortOrder = 2 };
            var catScenic = new TourCategory { NameEs = "Miradores y Arqueología", NameEn = "Viewpoints & Archaeology", Slug = "miradores", SortOrder = 3 };

            await _context.TourCategories.AddRangeAsync(catTraditional, catAdventure, catScenic);
            await _context.SaveChangesAsync();

            // 1. Circuito Uyo Uyo
            var tour1 = new Tour
            {
                Slug = "circuito-uyo-uyo",
                Location = "Yanque",
                Difficulty = DifficultyLevel.Easy,
                DurationHours = 3.0m,
                PricePerPerson = null,
                CoverImageUrl = "/assets/images/circuits/uyo-uyo.jpg",
                IsFeatured = true,
                SortOrder = 1,
                CategoryId = catScenic.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Uyo Uyo",
                        ShortDescription = "Conoce de cerca el pueblo antiguo de Yanque, punto de control de todo el Valle del Colca.",
                        DetailedDescription = "Cabalgata guiada hacia el Complejo Arqueológico de Uyo Uyo, antigua sede del poder Collao e Inca en el valle. Disfruta de paisajes andinos únicos y el paso suave del caballo peruano.",
                        SeoTitle = "Circuito Uyo Uyo a Caballo | Cabalgatas Kgoriwayra",
                        SeoDescription = "Conoce de cerca el pueblo antiguo de Yanque y el complejo arqueológico de Uyo Uyo a caballo con Cabalgatas Kgoriwayra."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Uyo Uyo Circuit",
                        ShortDescription = "Discover up close the ancient village of Yanque, historic control point of the Colca Valley.",
                        DetailedDescription = "Guided horseback tour to the Uyo Uyo Archaeological Complex, ancient seat of pre-Inca and Inca culture. Enjoy unique Andean landscapes and comfortable Peruvian Paso horses.",
                        SeoTitle = "Uyo Uyo Horseback Tour Yanque | Cabalgatas Kgoriwayra",
                        SeoDescription = "Experience Uyo Uyo archaeological complex on horseback from Yanque, Colca Valley."
                    }
                }
            };

            // 2. Circuito Pueblos Antiguos
            var tour2 = new Tour
            {
                Slug = "pueblos-antiguos",
                Location = "Yanque - Coporaque",
                Difficulty = DifficultyLevel.Moderate,
                DurationHours = 3.5m,
                CoverImageUrl = "/assets/images/circuits/coporaque.png",
                IsFeatured = true,
                SortOrder = 2,
                CategoryId = catTraditional.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Pueblos Antiguos Uyo Uyo - Coporaque",
                        ShortDescription = "Un circuito espectacular donde observaremos las andenerías agrícolas del Valle del Colca.",
                        DetailedDescription = "Cabalga entre Yanque y Coporaque cruzando andenes milenarios, puentes coloniales e iglesias históricas con vistas panorámicas al valle.",
                        SeoTitle = "Circuito Pueblos Antiguos Yanque Coporaque | Cabalgatas Kgoriwayra",
                        SeoDescription = "Un circuito espectacular observando las andenerías agrícolas del Valle del Colca a caballo."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Ancient Villages Circuit (Uyo Uyo - Coporaque)",
                        ShortDescription = "A spectacular circuit where we will observe the agricultural terraces of the Colca Valley.",
                        DetailedDescription = "Ride between Yanque and Coporaque crossing ancient agricultural terraces, colonial bridges, and historical chapels.",
                        SeoTitle = "Ancient Villages Horseback Circuit Colca | Cabalgatas Kgoriwayra",
                        SeoDescription = "Ride across Yanque and Coporaque exploring pre-Inca terraces and colonial heritage."
                    }
                }
            };

            // 3. Circuito Mirador de Achomani
            var tour3 = new Tour
            {
                Slug = "mirador-achomani",
                Location = "Achoma",
                Difficulty = DifficultyLevel.Moderate,
                DurationHours = 4.0m,
                CoverImageUrl = "/assets/images/circuits/achomani.png",
                IsFeatured = true,
                SortOrder = 3,
                CategoryId = catScenic.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Mirador de Achomani",
                        ShortDescription = "Desde este punto tendremos una vista de 360 grados de todo el Valle del Colca.",
                        DetailedDescription = "Cabalgata escénica hacia el mirador natural de Achoma con una perspectiva panorámica completa del cañón, terrazas y picos nevados.",
                        SeoTitle = "Circuito Mirador de Achomani a Caballo | Colca",
                        SeoDescription = "Desde este punto tendremos una vista de 360 grados de todo el Valle del Colca a lomo de caballo."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Achomani Viewpoint Circuit",
                        ShortDescription = "From this viewpoint we will have a 360-degree panoramic view of the entire Colca Valley.",
                        DetailedDescription = "Scenic horseback ride to Achoma's natural viewpoint with complete 360-degree vistas of the canyon and agricultural terraces.",
                        SeoTitle = "Achomani Viewpoint Horseback Tour | Colca Valley",
                        SeoDescription = "360 degree panoramic view of the Colca Valley on horseback from Achoma."
                    }
                }
            };

            // 4. Circuito Mirador Kgoriwayra
            var tour4 = new Tour
            {
                Slug = "mirador-kgoriwayra",
                Location = "Yanque",
                Difficulty = DifficultyLevel.Easy,
                DurationHours = 2.5m,
                CoverImageUrl = "/assets/images/circuits/kgoriwayra.png",
                IsFeatured = true,
                SortOrder = 4,
                CategoryId = catScenic.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Mirador Kgoriwayra",
                        ShortDescription = "Circuito donde ascenderemos al Apu Sagrado Pallaclli, desde donde apreciaremos los campos agrícolas Collaguas e Incas.",
                        DetailedDescription = "Ruta insignia de la finca Kgoriwayra que asciende al Apu Pallaclli para contemplar las terrazas agrícolas vivas más hermosas del Colca.",
                        SeoTitle = "Circuito Mirador Kgoriwayra Yanque | Cabalgatas Kgoriwayra",
                        SeoDescription = "Asciende al Apu Sagrado Pallaclli a caballo y contempla los campos agrícolas Collaguas e Incas."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Kgoriwayra Viewpoint Circuit",
                        ShortDescription = "Circuit where we climb the Sacred Apu Pallaclli to appreciate the Collagua and Inca farming fields.",
                        DetailedDescription = "Kgoriwayra's signature ride ascending to Apu Pallaclli to marvel at the living agricultural terraces of the Colca.",
                        SeoTitle = "Kgoriwayra Viewpoint Horse Ride | Colca Valley",
                        SeoDescription = "Horseback tour to Sacred Apu Pallaclli and living pre-Inca terraces in Yanque."
                    }
                }
            };

            // 5. Circuito Aguas Termales
            var tour5 = new Tour
            {
                Slug = "aguas-termales",
                Location = "Yanque",
                Difficulty = DifficultyLevel.Easy,
                DurationHours = 4.5m,
                CoverImageUrl = "/assets/images/circuits/cabalgata-06horas.jpg",
                IsFeatured = true,
                SortOrder = 5,
                CategoryId = catTraditional.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Uyo Uyo - Coporaque - Aguas Termales",
                        ShortDescription = "Disfrutaremos de las construcciones Pre-Incas y las tumbas de Yuraq Qaqa y disfrutaremos de un relajante baño en las aguas termales de Umaru.",
                        DetailedDescription = "Combinación perfecta de arqueología, cabalgata relajada y aguas termales medicinales para renovar energías en el Valle del Colca.",
                        SeoTitle = "Circuito Uyo Uyo Coporaque Aguas Termales | Cabalgatas",
                        SeoDescription = "Cabalgata a ruinas pre-incas, tumbas de Yuraq Qaqa y baño termal relajante en Yanque."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Uyo Uyo - Coporaque - Hot Springs Circuit",
                        ShortDescription = "Enjoy pre-Inca ruins, Yuraq Qaqa tombs, and a relaxing bath in the thermal springs of Umaru.",
                        DetailedDescription = "Perfect combination of archaeology, gentle riding, and medicinal hot springs in the Colca Valley.",
                        SeoTitle = "Colca Horseback Ride & Hot Springs Tour | Kgoriwayra",
                        SeoDescription = "Ride through pre-Inca ruins and unwind in thermal springs near Yanque."
                    }
                }
            };

            // 6. Circuito Origen Amazonas
            var tour6 = new Tour
            {
                Slug = "origen-amazonas",
                Location = "Tuti - Lari",
                Difficulty = DifficultyLevel.Difficult,
                DurationHours = 8.0m,
                CoverImageUrl = "/assets/images/circuits/amazonas.png",
                IsFeatured = true,
                SortOrder = 6,
                CategoryId = catAdventure.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Nacimiento del Río Amazonas",
                        ShortDescription = "Circuito donde conoceremos Carhuasanta, origen del Río más largo del mundo, el Amazonas.",
                        DetailedDescription = "Expedición ecuestre de altura hacia las faldas del Nevado Mismi y la quebrada Carhuasanta, naciente oficial del Río Amazonas.",
                        SeoTitle = "Cabalgata al Nacimiento del Río Amazonas | Colca Expedición",
                        SeoDescription = "Expedición a caballo hacia Carhuasanta, origen del río más largo del mundo en el Colca."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Amazon River Source Circuit",
                        ShortDescription = "Expedition to Carhuasanta, the geographic source of the world's longest river: the Amazon.",
                        DetailedDescription = "High-altitude horseback expedition to Mount Mismi where the Amazon River begins its journey to the Atlantic.",
                        SeoTitle = "Amazon River Origin Horseback Expedition | Colca",
                        SeoDescription = "Epic horse ride to the source of the Amazon River in the Peruvian Andes."
                    }
                }
            };

            // 7. Circuito Tres Cañones de Suykutambo
            var tour7 = new Tour
            {
                Slug = "tres-canones",
                Location = "Cuzco / Espinar",
                Difficulty = DifficultyLevel.Difficult,
                DurationHours = 8.0m,
                CoverImageUrl = "/assets/images/circuits/suykutambo.png",
                IsFeatured = false,
                SortOrder = 7,
                CategoryId = catAdventure.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Tres Cañones de Suykutambo",
                        ShortDescription = "En este tour conoceremos los tres cañones de Suykutambo, un lugar mágico con mucha historia.",
                        DetailedDescription = "Cabalgata entre gigantescas paredes rocosas de más de 80 metros formadas por la confluencia de tres ríos andinos.",
                        SeoTitle = "Cabalgata Tres Cañones de Suykutambo | Kgoriwayra",
                        SeoDescription = "Conoce los mágicos tres cañones de Suykutambo a caballo con guías locales expertos."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Three Canyons of Suykutambo Circuit",
                        ShortDescription = "In this tour we will discover the Three Canyons of Suykutambo, a magical place with deep history.",
                        DetailedDescription = "Horseback journey among colossal 80-meter rock walls where three Andean rivers meet.",
                        SeoTitle = "Suykutambo Three Canyons Horseback Tour | Peru",
                        SeoDescription = "Ride through the dramatic rock formations of Suykutambo canyons on horseback."
                    }
                }
            };

            // 8. Circuito Sabancaya
            var tour8 = new Tour
            {
                Slug = "sabancaya",
                Location = "Colca",
                Difficulty = DifficultyLevel.Difficult,
                DurationHours = 7.0m,
                CoverImageUrl = "/assets/images/circuits/sabancaya.png",
                IsFeatured = false,
                SortOrder = 8,
                CategoryId = catAdventure.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Sabancaya",
                        ShortDescription = "En este tour conoceremos el Volcán Sabancaya, el cual se encuentra activo.",
                        DetailedDescription = "Travesía por la alta montaña del Colca con vistas directas a las fumarolas del volcán activo Sabancaya y rebaños de camélidos.",
                        SeoTitle = "Cabalgata Volcán Sabancaya | Turismo Aventura Colca",
                        SeoDescription = "Cabalgata de altura con vistas impresionantes al volcán activo Sabancaya."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Sabancaya Volcano Circuit",
                        ShortDescription = "In this tour we will experience the Sabancaya Volcano, which is actively emitting plumes.",
                        DetailedDescription = "High-altitude mountain ride with dramatic views of active volcano Sabancaya and high Andean wildlife.",
                        SeoTitle = "Sabancaya Active Volcano Horse Ride | Colca Valley",
                        SeoDescription = "Ride through Andean plateaus with direct views of the active Sabancaya Volcano."
                    }
                }
            };

            // 9. Circuito Fortaleza de Chimpa
            var tour9 = new Tour
            {
                Slug = "fortaleza-chimpa",
                Location = "Madrigal",
                Difficulty = DifficultyLevel.Moderate,
                DurationHours = 5.0m,
                CoverImageUrl = "/assets/images/circuits/chimpa.png",
                IsFeatured = true,
                SortOrder = 9,
                CategoryId = catScenic.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Fortaleza de Chimpa",
                        ShortDescription = "En este tour tendremos una mejor visión del Cañón del Colca y los nidos de los cóndores.",
                        DetailedDescription = "Ascenso ecuestre hacia la fortaleza militar pre-inca de Chimpa en Madrigal, con el mirador natural más impresionante del cañón.",
                        SeoTitle = "Cabalgata Fortaleza de Chimpa Madrigal | Colca",
                        SeoDescription = "La mejor visión del Cañón del Colca y los nidos de cóndores desde la Fortaleza de Chimpa."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Chimpa Fortress Circuit",
                        ShortDescription = "In this tour we will have the best vantage point of the Colca Canyon and condor nests.",
                        DetailedDescription = "Ride up to the pre-Inca military fortress of Chimpa in Madrigal for the most spectacular canyon view.",
                        SeoTitle = "Chimpa Fortress Horseback Trek | Colca Canyon",
                        SeoDescription = "Unmatched panoramic view of the Colca Canyon depth and condor cliffs on horseback."
                    }
                }
            };

            // 10. Circuito de los Geiser
            var tour10 = new Tour
            {
                Slug = "geiser-pinchollo",
                Location = "C.P Pinchollo",
                Difficulty = DifficultyLevel.Moderate,
                DurationHours = 4.5m,
                CoverImageUrl = "/assets/images/circuits/geiser.png",
                IsFeatured = false,
                SortOrder = 10,
                CategoryId = catAdventure.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito de los Geiser",
                        ShortDescription = "En esta ruta viviremos una aventura inolvidable conociendo un geositio dentro del Geoparque.",
                        DetailedDescription = "Paseo a caballo hacia los géiseres de Pinchollo (Hatun Infiernillo) con aguas hirvientes emanando del suelo volcánico.",
                        SeoTitle = "Circuito Geiser de Pinchollo a Caballo | Geoparque Colca",
                        SeoDescription = "Aventura a caballo conociendo los géiseres de Pinchollo en el Geoparque Colca."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Pinchollo Geysers Circuit",
                        ShortDescription = "An unforgettable adventure discovering an authentic geosystem inside the Colca Geopark.",
                        DetailedDescription = "Horseback ride to the active thermal geysers of Pinchollo venting boiling mineral waters.",
                        SeoTitle = "Pinchollo Geysers Horse Tour | Colca Geopark",
                        SeoDescription = "Discover natural volcanic geysers on horseback in Pinchollo, Colca Canyon."
                    }
                }
            };

            // 11. Circuito Parte Profunda del Cañón
            var tour11 = new Tour
            {
                Slug = "parte-profunda-colca",
                Location = "Canco - Huambo",
                Difficulty = DifficultyLevel.Difficult,
                DurationHours = 8.0m,
                CoverImageUrl = "/assets/images/circuits/canco.png",
                IsFeatured = false,
                SortOrder = 11,
                CategoryId = catAdventure.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito conociendo la parte más profunda del Cañón del Colca",
                        ShortDescription = "En este tour conoceremos la parte más profunda del Cañón del Colca, un valle rodeado de naturaleza.",
                        DetailedDescription = "Gran expedición ecuestre hacia la garganta más profunda del planeta en Canco y Huambo, con cascadas vírgenes y huertos andinos.",
                        SeoTitle = "Cabalgata Parte Más Profunda del Cañón del Colca | Huambo",
                        SeoDescription = "Descubre la zona más profunda del Cañón del Colca a caballo en Canco y Huambo."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Deepest Part of Colca Canyon Circuit",
                        ShortDescription = "In this tour we will discover the deepest gorge of the Colca Canyon, surrounded by raw nature.",
                        DetailedDescription = "Expedition ride down to the deepest section of the Colca Canyon in Canco and Huambo, exploring hidden waterfalls.",
                        SeoTitle = "Deepest Colca Canyon Horseback Expedition | Peru",
                        SeoDescription = "Reach the deepest points of the Colca Canyon on a horseback adventure."
                    }
                }
            };

            // 12. Circuito Tradicional
            var tour12 = new Tour
            {
                Slug = "circuito-tradicional",
                Location = "Yanque",
                Difficulty = DifficultyLevel.Easy,
                DurationHours = 2.0m,
                CoverImageUrl = "/assets/images/circuits/tradicional.png",
                IsFeatured = true,
                SortOrder = 12,
                CategoryId = catTraditional.Id,
                Translations = new List<TourTranslation>
                {
                    new()
                    {
                        Language = "es",
                        Title = "Circuito Tradicional",
                        ShortDescription = "En este tour conoceremos de cerca Yanque - la antigua capital de la Cultura Collagua.",
                        DetailedDescription = "Cabalgata tranquila por la campiña de Yanque, cruzando iglesias barrocas, andenes agrícolas y caminos rurales ancestrales.",
                        SeoTitle = "Circuito Tradicional Yanque a Caballo | Cabalgatas Kgoriwayra",
                        SeoDescription = "Conoce de cerca Yanque, antigua capital Collagua, en una cabalgata tradicional para toda la familia."
                    },
                    new()
                    {
                        Language = "en",
                        Title = "Traditional Circuit",
                        ShortDescription = "In this tour we will experience Yanque up close - the ancient capital of Collagua culture.",
                        DetailedDescription = "Gentle horseback ride through Yanque's countryside, historical baroque architecture and ancient stone pathways.",
                        SeoTitle = "Traditional Yanque Horseback Tour | Colca Culture",
                        SeoDescription = "Explore Yanque, ancient capital of the Collagua people, on gentle horses for the whole family."
                    }
                }
            };

            await _context.Tours.AddRangeAsync(tour1, tour2, tour3, tour4, tour5, tour6, tour7, tour8, tour9, tour10, tour11, tour12);
            await _context.SaveChangesAsync();
        }
    }

    private async Task SeedActivitiesAsync()
    {
        if (!await _context.Activities.AnyAsync())
        {
            var activities = new List<Activity>
            {
                new()
                {
                    Slug = "trekking",
                    SortOrder = 1,
                    Translations = new List<ActivityTranslation>
                    {
                        new() { Language = "es", Title = "Trekking", ShortDescription = "Caminatas guiadas por senderos andinos y miradores profundos.", DetailedDescription = "Rutas de senderismo para todos los niveles por los cañones y valles del Colca." },
                        new() { Language = "en", Title = "Trekking", ShortDescription = "Guided hikes across Andean trails and deep canyon viewpoints.", DetailedDescription = "Hiking trails for all skill levels across the Colca Canyon and valley." }
                    }
                },
                new()
                {
                    Slug = "zip-line",
                    SortOrder = 2,
                    Translations = new List<ActivityTranslation>
                    {
                        new() { Language = "es", Title = "Zip - Line (Tirolesa)", ShortDescription = "Adrenalina sobrevolando el río y el cañón del Colca.", DetailedDescription = "Vuelo en tirolesa con los más altos estándares de seguridad y vistas impresionantes." },
                        new() { Language = "en", Title = "Zip - Line", ShortDescription = "Adrenaline flight soaring over the Colca river and canyon.", DetailedDescription = "Zip-line experience with top safety gear and breathtaking aerial views." }
                    }
                },
                new()
                {
                    Slug = "paseo-bote",
                    SortOrder = 3,
                    Translations = new List<ActivityTranslation>
                    {
                        new() { Language = "es", Title = "Paseo en bote", ShortDescription = "Navegación y aventura en las aguas del río Colca.", DetailedDescription = "Paseos en bote y canotaje seguro en tramos serenos del río Colca." },
                        new() { Language = "en", Title = "Boat Ride", ShortDescription = "Scenic boating and gentle rafting along the Colca river.", DetailedDescription = "Safe boating activities across calm stretches of the Colca River." }
                    }
                },
                new()
                {
                    Slug = "turismo-vivencial",
                    SortOrder = 4,
                    Translations = new List<ActivityTranslation>
                    {
                        new() { Language = "es", Title = "Turismo Vivencial", ShortDescription = "Conoce las costumbres, agricultura y textilería de las comunidades locales.", DetailedDescription = "Comparte experiencias auténticas con familias locales de Yanque y el valle." },
                        new() { Language = "en", Title = "Experiential Tourism", ShortDescription = "Discover local traditions, agriculture and weaving with native communities.", DetailedDescription = "Authentic cultural exchange with local families in Yanque and the Colca Valley." }
                    }
                },
                new()
                {
                    Slug = "ciclismo",
                    SortOrder = 5,
                    Translations = new List<ActivityTranslation>
                    {
                        new() { Language = "es", Title = "Ciclismo", ShortDescription = "Rutas en bicicleta de montaña por los pueblos del valle.", DetailedDescription = "Descensos y senderos de cross-country para ciclistas en el Valle del Colca." },
                        new() { Language = "en", Title = "Cycling", ShortDescription = "Mountain bike routes across picturesque Colca villages.", DetailedDescription = "Downhill and cross-country cycling adventures through the Colca Valley." }
                    }
                },
                new()
                {
                    Slug = "tours-culturales",
                    SortOrder = 6,
                    Translations = new List<ActivityTranslation>
                    {
                        new() { Language = "es", Title = "Tours Culturales", ShortDescription = "Visitas a iglesias coloniales, museos arqueológicos y sitios sagrados.", DetailedDescription = "Recorridos guiados por el patrimonio arquitectónico y cultural del Colca." },
                        new() { Language = "en", Title = "Cultural Tours", ShortDescription = "Visits to colonial churches, archaeological museums, and sacred sites.", DetailedDescription = "Guided journeys through the rich historical and architectural heritage of the Colca." }
                    }
                }
            };

            await _context.Activities.AddRangeAsync(activities);
            await _context.SaveChangesAsync();
        }
    }

    private async Task SeedInitialTestimonialsAsync()
    {
        if (!await _context.Testimonials.AnyAsync())
        {
            var testimonials = new List<Testimonial>
            {
                new()
                {
                    AuthorName = "Diana C",
                    AuthorLocation = "España",
                    Rating = 5,
                    TourName = "Cabalgata 4 Horas por Cerros",
                    ContentEs = "La atención fue muy buena; como ya habíamos ido a varios sitios que están en el tour común, nos hicieron un paseo de más de 4 horas por los cerros por una ruta menos conocida, más larga. Sus caballos son lindos y muy mansos y su hijito y un perro acompañaron la ruta también.",
                    ContentEn = "The attention was excellent! They took us on a 4+ hour scenic ride through lesser-known mountain trails. Their horses are beautiful and very gentle. Highly recommended!",
                    IsFeatured = true,
                    IsActive = true,
                    SortOrder = 1
                },
                new()
                {
                    AuthorName = "Thomas M",
                    AuthorLocation = "Bruselas, Bélgica",
                    Rating = 5,
                    TourName = "Cabalgata Valle de Yanque",
                    ContentEs = "Hicimos 4 horas de cabalgata a través del valle de Yanque. La equitación es una de las mejores actividades que hemos hecho en Perú, Wilbert es amable y paciente, como los hermosos caballos de Paso peruanos que él tiene. Lo recomiendo, me encantaría volver.",
                    ContentEn = "Horseback riding with Wilbert was one of the best activities we did in Peru. Wilbert is kind and patient, just like his beautiful Peruvian Paso horses. Truly unforgettable!",
                    IsFeatured = true,
                    IsActive = true,
                    SortOrder = 2
                },
                new()
                {
                    AuthorName = "MariaReiRei",
                    AuthorLocation = "Arequipa, Perú",
                    Rating = 5,
                    TourName = "Circuito Tradicional Yanque",
                    ContentEs = "Muy hermoso paseo, tomamos la ruta de 2 horas y fue muy relajante y entretenido, también fuimos al punto más alto de donde se divisaba la ciudad de Yanque, y Wilber es una excelente persona, totalmente recomendado!",
                    ContentEn = "Very beautiful ride, we took the 2-hour route and it was relaxing and entertaining. Wilber is a wonderful host and guide!",
                    IsFeatured = true,
                    IsActive = true,
                    SortOrder = 3
                },
                new()
                {
                    AuthorName = "Viajero Arequipeño y amigos de Francia",
                    AuthorLocation = "Francia / Arequipa",
                    Rating = 5,
                    TourName = "Cabalgata 6 Horas Cañón del Colca",
                    ContentEs = "Hicimos la cabalgata de 6 horas con unos amigos que tienen su propio establo en Francia, y fue INCREIBLE! Esta empresa sabe lo que hace y lo hace bien. Si tienen experiencia tendrán retos y si son novatos estarán bien cuidados por Wilber.",
                    ContentEn = "We did the 6-hour ride with friends who run horse stables in France, and it was INCREDIBLE! Experienced riders will find great trails and beginners will be safe and cared for.",
                    IsFeatured = true,
                    IsActive = true,
                    SortOrder = 4
                },
                new()
                {
                    AuthorName = "Montserrat C",
                    AuthorLocation = "Trujillo, Perú",
                    Rating = 5,
                    TourName = "Cabalgata Familiar",
                    ContentEs = "Los paisajes hermosos, Wilbert fue muy atento conmigo y con mi hijo, los caballos super dóciles y preparados para la ruta, fueron dos horas maravillosas además de un precio justo.",
                    ContentEn = "Stunning landscapes! Wilbert was very attentive with me and my son, the horses are gentle and very well-trained. A wonderful 2-hour ride.",
                    IsFeatured = true,
                    IsActive = true,
                    SortOrder = 5
                },
                new()
                {
                    AuthorName = "Clauditamil",
                    AuthorLocation = "Lima, Perú",
                    Rating = 5,
                    TourName = "Circuito Yanque y Plaza",
                    ContentEs = "Nos enteramos de las cabalgatas del Sr Wilbert Málaga, mientras caminábamos hacia la plaza. Nos explicó a los principiantes pacientemente. Él fue adelante con su hijo Anthony Blue, otro capo ❤️ Nos encantó a mis amigas y a mí.",
                    ContentEn = "Wilbert patiently guided us beginners. He rode ahead with his son Anthony Blue, another master rider. My friends and I loved every minute!",
                    IsFeatured = true,
                    IsActive = true,
                    SortOrder = 6
                }
            };

            await _context.Testimonials.AddRangeAsync(testimonials);
            await _context.SaveChangesAsync();
        }
    }
}
