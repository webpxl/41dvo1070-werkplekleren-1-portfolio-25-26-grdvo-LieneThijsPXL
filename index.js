// Navigation en pagina switching
document.addEventListener('DOMContentLoaded', function() {
    // Alle navigatie links
    const navLinks = document.querySelectorAll('.nav-link, [data-page]');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Functie om pagina te wisselen
    function switchPage(pageId) {
        // Verwijder active class van alle pagina's en links
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Voeg active class toe aan geselecteerde pagina
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
        }

        // Voeg active class toe aan corresponderende nav link
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // Scroll naar top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Sluit mobile menu
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    // Event listeners voor navigatie
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
                // Update URL zonder page reload
                history.pushState(null, '', `#${pageId}`);
            }
        });
    });

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Check URL bij laden
    const hash = window.location.hash.substring(1);
    if (hash) {
        switchPage(hash);
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class van alle buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    // Fade in effect
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Project Modal
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    const viewDetailsButtons = document.querySelectorAll('.view-details');

    // Project data
    const projectData = {
        '1': {
            title: 'Mond tekening',
            category: 'School project',
            vak: ' Waarnemings tekenen',
            beschrijving: 'Voor dit project werkte ik rond het thema realistic . Ik koos voor een close‑up van een mond met ijs tussen de tanden en een druppel die naar beneden glijdt. Ik bedacht het concept, maakte de schetsen en werkte het uit met fotorealistische technieken. Het resultaat toont mijn oog voor detail, tekenvaardigheid en gevoel voor sfeer.',






        },
        '2': {
            title: 'Parfum Advertentie',
            category: 'School project',
            vak: 'etelage en publiciteit',
            beschrijving: 'Voor dit project begon ik met schetsen en brainstormen rond een advertentieconcept. Daarna werkte ik het idee uit in een doos met een vast formaat, waarin ik een parfum als product centraal zetten. Na het bouwen en samenstellen van de advertentie werd het geheel gefotografeerd. Vervolgens heb ik de beelden in Photoshop bewerkt en afgewerkt, zodat het eindresultaat een professionele en overtuigende reclamecampagne werd',





        },
        '3': {
            title: 'Logo “We Are”',
            category: 'School project',
            vak: 'Leeronderneming',
            beschrijving: 'Voor het schoolproject Leeronderneming kregen we de naam We Are aangereikt voor een kledingwinkel. Ik ontwierp hiervoor een strak en modern logo dat typografie en vorm combineert. Mijn ontwerp werd uiteindelijk niet gekozen, maar eindigde wel op plaats 2 bij de selectie. Dat toont dat mijn werk sterk en professioneel werd beoordeeld, en dat ik een goed gevoel heb voor branding en logo‑ontwerp',





        },
        '4': {
            title: 'Strawberries in Water',
            category: 'Persoonlijk',
            vak: 'Thuis',
            beschrijving: 'Dit werk maakte ik thuis in mijn vrije tijd. Ik wilde spelen met kleur, beweging en frisheid, en koos voor een illustratie van aardbeien onder water met bubbels. Het was een leuke oefening in compositie, kleurgebruik en realisme.'


        },
        '5': {
            title: 'Italië T‑shirt Design',
            category: 'Persoonlijk',
            vak: 'Thuis',
            beschrijving: 'Voor onze reis naar Italië heb ik een speciaal T‑shirt ontworpen. Ik wilde iets maken dat ons als groep van drie liet zien, daarom staan er drie glaasjes op het ontwerp samen met het Colosseum. Ik heb dit idee zelf bedacht en uitgewerkt . Daarna liet ik het drukken op T‑shirts die we tijdens de reis hebben gedragen. ',






        },
        '6': {
            title: 'Kinderen aan de zee',
            category: 'Persoonlijk',
            vak: 'Thuis',
            beschrijving: 'Dit werk maakte ik thuis met kleurpotlood en pastel. Ik wilde een vrolijke en rustige sfeer weergeven, en koos voor een strandscène met spelende kinderen in het water.',



        }
    };

    // Open modal bij klik op "Meer info"
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <div class="modal-body">
                        <h2>${project.title}</h2>
                        <p class="project-tag">${project.category}</p>
                        
                        <div class="project-detail">
                            <h3> Vak</h3>
                            <p>${project.vak}</p>
                        </div>
                        
                        <div class="project-detail">
                            <h3> Beschrijving</h3>
                            <p>${project.beschrijving}</p>
                        </div>
                        
                    
                     
             
                    </div>
                `;
                modal.style.display = 'block';
            }
        });
    });

    // Sluit modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Sluit modal bij klik buiten content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Haal form data op
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simpele validatie
            if (name && email && message) {
                // Simuleer verzenden (in een echte app zou je hier een API call doen)
                formMessage.textContent = 'Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.';
                formMessage.className = 'form-message success';

                // Reset form
                contactForm.reset();

                // Verberg bericht na 5 seconden
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.className = 'form-message';
                }, 5000);
            } else {
                formMessage.textContent = 'Vul alle verplichte velden in.';
                formMessage.className = 'form-message error';
            }
        });
    }



    // Smooth scroll voor interne links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !this.hasAttribute('data-page')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animaties bij scrollen (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observeer sections voor scroll animaties
    document.querySelectorAll('article, .project-card').forEach(el => {
        observer.observe(el);
    });
});
