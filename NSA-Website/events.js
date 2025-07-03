// NSA Events Hub JavaScript
class NSAEventsHub {
    constructor() {
        this.events = [];
        this.filteredEvents = [];
        this.currentFilter = 'upcoming';
        
        this.init();
    }

    async init() {
        await this.loadEvents();
        this.setupEventListeners();
        this.updateStats();
        this.renderEvents();
        this.populateFilters();
        this.setupSmoothScrolling();
    }

    async loadEvents() {
        try {
            // Load sample events data (in a real app, this would come from an API)
            this.events = this.getSampleEvents();
            this.filteredEvents = [...this.events];
            console.log('Events loaded:', this.events.length, 'events');
        } catch (error) {
            console.error('Error loading events:', error);
            this.showError('Failed to load events. Please try again later.');
        }
    }

    getSampleEvents() {
        return [
            {
                id: 1,
                title: "Nepali Cultural Night 2024",
                type: "cultural",
                date: "2024-03-15",
                time: "18:00",
                university: "University of Texas at Arlington",
                city: "Arlington",
                state: "Texas",
                description: "Join us for an evening of traditional Nepali music, dance, and cuisine. Experience the rich cultural heritage of Nepal through performances by talented students and community members. Don't miss the fashion show featuring traditional Nepali attire!",
                registrationLink: "https://forms.google.com/cultural-night-2024",
                organizerName: "NSA UTA",
                organizerEmail: "cultural@nsauta.org",
                poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
                featured: true
            },
            {
                id: 2,
                title: "Inter-University Cricket Tournament",
                type: "sports",
                date: "2024-03-20",
                time: "09:00",
                university: "University of Maryland",
                city: "College Park",
                state: "Maryland",
                description: "Annual cricket tournament featuring teams from universities across the region. Cash prizes for winners! Registration deadline: March 10th. All skill levels welcome.",
                registrationLink: "https://forms.google.com/cricket-tournament-2024",
                organizerName: "NSA UMD",
                organizerEmail: "sports@nsaumd.org",
                poster: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop",
                featured: true
            },
            {
                id: 3,
                title: "Nepali Language Workshop",
                type: "workshop",
                date: "2024-03-25",
                time: "14:00",
                university: "UC Berkeley",
                city: "Berkeley",
                state: "California",
                description: "Learn basic Nepali phrases and cultural etiquette. Perfect for beginners and those interested in Nepali culture. Interactive sessions with native speakers.",
                registrationLink: "",
                organizerName: "NSA Berkeley",
                organizerEmail: "workshop@nsaberkeley.org",
                poster: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
            },
            {
                id: 4,
                title: "Nepali Student Leadership Conference",
                type: "conference",
                date: "2024-04-05",
                time: "10:00",
                university: "Boston University",
                city: "Boston",
                state: "Massachusetts",
                description: "Annual leadership conference bringing together NSA leaders from across the country. Workshops on community building, event planning, and cultural preservation.",
                registrationLink: "https://forms.google.com/leadership-conference-2024",
                organizerName: "NSA BU",
                organizerEmail: "conference@nsabu.org",
                poster: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
                featured: true
            },
            {
                id: 5,
                title: "Nepali Food Festival",
                type: "cultural",
                date: "2024-04-10",
                time: "16:00",
                university: "University of Virginia",
                city: "Charlottesville",
                state: "Virginia",
                description: "Taste authentic Nepali cuisine prepared by our talented student chefs. Live cooking demonstrations, traditional music, and cultural performances.",
                registrationLink: "",
                organizerName: "NSA UVA",
                organizerEmail: "foodfest@nsauva.org",
                poster: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
            },
            {
                id: 6,
                title: "Nepali Dance Competition",
                type: "competition",
                date: "2024-04-15",
                time: "19:00",
                university: "University of Colorado Boulder",
                city: "Boulder",
                state: "Colorado",
                description: "Showcase your traditional and contemporary Nepali dance skills. Categories include classical, folk, and fusion. Prizes for winners!",
                registrationLink: "https://forms.google.com/dance-competition-2024",
                organizerName: "NSA CU Boulder",
                organizerEmail: "dance@nsacuboulder.org",
                poster: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=300&fit=crop"
            },
            {
                id: 7,
                title: "Nepali Film Festival",
                type: "cultural",
                date: "2024-02-20",
                time: "18:30",
                university: "New York University",
                city: "New York",
                state: "New York",
                description: "Screening of award-winning Nepali films and documentaries. Q&A sessions with filmmakers and cultural discussions.",
                registrationLink: "",
                organizerName: "NSA NYU",
                organizerEmail: "filmfest@nsanyu.org",
                poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop"
            },
            {
                id: 8,
                title: "Nepali Poetry Slam",
                type: "competition",
                date: "2024-02-25",
                time: "20:00",
                university: "Columbia University",
                city: "New York",
                state: "New York",
                description: "Express yourself through poetry in Nepali or English. Open mic and judged competition. Cash prizes for top performers.",
                registrationLink: "https://forms.google.com/poetry-slam-2024",
                organizerName: "NSA Columbia",
                organizerEmail: "poetry@nsacolumbia.org",
                poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('eventSearch');
        const eventTypeFilter = document.getElementById('eventTypeFilter');
        const stateFilter = document.getElementById('stateFilter');
        const universityFilter = document.getElementById('universityFilter');
        const timeFilter = document.getElementById('timeFilter');

        searchInput.addEventListener('input', () => this.handleFilters());
        eventTypeFilter.addEventListener('change', () => this.handleFilters());
        stateFilter.addEventListener('change', () => this.handleFilters());
        universityFilter.addEventListener('change', () => this.handleFilters());
        timeFilter.addEventListener('change', () => this.handleFilters());

        // Modal functionality
        const eventModal = document.getElementById('eventModal');
        const eventDetailModal = document.getElementById('eventDetailModal');

        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) this.closeEventForm();
        });

        eventDetailModal.addEventListener('click', (e) => {
            if (e.target === eventDetailModal) this.closeEventDetail();
        });

        // Form submission
        const eventForm = document.getElementById('eventForm');
        eventForm.addEventListener('submit', (e) => this.handleEventSubmission(e));

        // File upload preview
        const fileInput = document.getElementById('eventPoster');
        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Mobile menu - removed old mobile menu handling since we're using sidebar now
    }

    handleFilters() {
        const searchTerm = document.getElementById('eventSearch').value.toLowerCase();
        const eventType = document.getElementById('eventTypeFilter').value;
        const state = document.getElementById('stateFilter').value;
        const university = document.getElementById('universityFilter').value;
        const timeFilter = document.getElementById('timeFilter').value;

        this.currentFilter = timeFilter;
        
        this.filteredEvents = this.events.filter(event => {
            const matchesSearch = !searchTerm || 
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.city.toLowerCase().includes(searchTerm) ||
                event.university.toLowerCase().includes(searchTerm);
            
            const matchesType = !eventType || event.type === eventType;
            const matchesState = !state || event.state === state;
            const matchesUniversity = !university || event.university === university;
            
            const matchesTime = this.matchesTimeFilter(event, timeFilter);

            return matchesSearch && matchesType && matchesState && matchesUniversity && matchesTime;
        });

        this.renderEvents();
        this.updateResultsCount();
    }

    matchesTimeFilter(event, filter) {
        const eventDate = new Date(event.date + 'T' + event.time);
        const now = new Date();

        switch (filter) {
            case 'upcoming':
                return eventDate > now;
            case 'past':
                return eventDate < now;
            case 'all':
                return true;
            default:
                return eventDate > now;
        }
    }

    populateFilters() {
        const stateFilter = document.getElementById('stateFilter');
        const universityFilter = document.getElementById('universityFilter');
        
        // Get unique states and universities
        const states = [...new Set(this.events.map(event => event.state))].sort();
        const universities = [...new Set(this.events.map(event => event.university))].sort();
        
        // Populate state filter
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateFilter.appendChild(option);
        });

        // Populate university filter
        universities.forEach(university => {
            const option = document.createElement('option');
            option.value = university;
            option.textContent = university;
            universityFilter.appendChild(option);
        });
    }

    renderEvents() {
        const upcomingEvents = this.filteredEvents.filter(event => {
            const eventDate = new Date(event.date + 'T' + event.time);
            return eventDate > new Date();
        });

        const pastEvents = this.filteredEvents.filter(event => {
            const eventDate = new Date(event.date + 'T' + event.time);
            return eventDate < new Date();
        });

        const featuredEvents = this.events.filter(event => event.featured && new Date(event.date + 'T' + event.time) > new Date());

        // Render upcoming events
        this.renderEventGrid('upcomingEventsGrid', upcomingEvents);
        this.renderEventGrid('pastEventsGrid', pastEvents);
        this.renderFeaturedEvents('featuredEventsGrid', featuredEvents);

        // Show/hide no events messages
        document.getElementById('noUpcomingEvents').style.display = upcomingEvents.length === 0 ? 'block' : 'none';
        document.getElementById('noPastEvents').style.display = pastEvents.length === 0 ? 'block' : 'none';
    }

    renderEventGrid(containerId, events) {
        const container = document.getElementById(containerId);
        
        if (events.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = events.map(event => this.createEventCard(event)).join('');
    }

    renderFeaturedEvents(containerId, events) {
        const container = document.getElementById(containerId);
        
        if (events.length === 0) {
            container.innerHTML = '<p class="text-center">No featured events at the moment.</p>';
            return;
        }

        container.innerHTML = events.map(event => this.createFeaturedCard(event)).join('');
    }

    createEventCard(event) {
        const eventDate = new Date(event.date + 'T' + event.time);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedTime = eventDate.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });

        return `
            <div class="event-card event-type-${event.type}" data-event-id="${event.id}">
                <div class="event-card-image">
                    <img src="${event.poster}" alt="${event.title}" onerror="this.src='https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop'">
                    <div class="event-type-badge">${this.getEventTypeLabel(event.type)}</div>
                </div>
                <div class="event-card-content">
                    <h3 class="event-card-title">${event.title}</h3>
                    <div class="event-card-meta">
                        <div class="event-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${formattedDate}</span>
                        </div>
                        <div class="event-meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${formattedTime}</span>
                        </div>
                        <div class="event-meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.university}, ${event.city}, ${event.state}</span>
                        </div>
                    </div>
                    <p class="event-card-description">${event.description}</p>
                    <div class="event-card-actions">
                        <button class="btn btn-primary" onclick="eventsHub.showEventDetail(${event.id})">
                            <i class="fas fa-info-circle"></i>
                            Learn More
                        </button>
                        ${event.registrationLink ? `
                            <a href="${event.registrationLink}" class="btn btn-secondary" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                Register
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    createFeaturedCard(event) {
        const eventDate = new Date(event.date + 'T' + event.time);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });

        return `
            <div class="featured-card">
                <h3>${event.title}</h3>
                <p>${event.description.substring(0, 100)}...</p>
                <div class="featured-meta">
                    <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.university}</span>
                </div>
                <button class="btn btn-primary" onclick="eventsHub.showEventDetail(${event.id})">
                    Learn More
                </button>
            </div>
        `;
    }

    getEventTypeLabel(type) {
        const labels = {
            'competition': 'Competition',
            'cultural': 'Cultural',
            'sports': 'Sports',
            'workshop': 'Workshop',
            'conference': 'Conference',
            'other': 'Other'
        };
        return labels[type] || 'Event';
    }

    showEventDetail(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        const eventDate = new Date(event.date + 'T' + event.time);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedTime = eventDate.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });

        // Populate modal content
        document.getElementById('detailEventTitle').textContent = event.title;
        document.getElementById('detailEventImage').src = event.poster;
        document.getElementById('detailEventDate').textContent = formattedDate;
        document.getElementById('detailEventTime').textContent = formattedTime;
        document.getElementById('detailEventLocation').textContent = `${event.university}, ${event.city}, ${event.state}`;
        document.getElementById('detailEventType').textContent = this.getEventTypeLabel(event.type);
        document.getElementById('detailEventDescription').textContent = event.description;
        document.getElementById('detailOrganizerName').textContent = event.organizerName;
        document.getElementById('detailOrganizerEmail').textContent = event.organizerEmail;
        document.getElementById('detailOrganizerEmail').href = `mailto:${event.organizerEmail}`;

        const registrationLink = document.getElementById('detailRegistrationLink');
        if (event.registrationLink) {
            registrationLink.href = event.registrationLink;
            registrationLink.style.display = 'inline-flex';
        } else {
            registrationLink.style.display = 'none';
        }

        // Show modal
        document.getElementById('eventDetailModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeEventDetail() {
        document.getElementById('eventDetailModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    openEventForm() {
        document.getElementById('eventModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeEventForm() {
        document.getElementById('eventModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('eventForm').reset();
    }

    async handleEventSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const eventData = {
            title: formData.get('eventTitle'),
            type: formData.get('eventType'),
            date: formData.get('eventDate'),
            time: formData.get('eventTime'),
            university: formData.get('university'),
            city: formData.get('city'),
            description: formData.get('eventDescription'),
            registrationLink: formData.get('registrationLink'),
            organizerName: formData.get('organizerName'),
            organizerEmail: formData.get('organizerEmail')
        };

        try {
            // In a real app, you'd send this to your backend
            console.log('Event submission:', eventData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showSuccess('Thank you! Your event has been submitted for review.');
            this.closeEventForm();
            e.target.reset();
            
            // Optionally refresh events
            // await this.loadEvents();
        } catch (error) {
            this.showError('Failed to submit event. Please try again.');
        }
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // You could preview the image here
                console.log('File uploaded:', file.name);
            };
            reader.readAsDataURL(file);
        }
    }

    updateStats() {
        const upcomingEvents = this.events.filter(event => {
            const eventDate = new Date(event.date + 'T' + event.time);
            return eventDate > new Date();
        }).length;

        const universities = new Set(this.events.map(event => event.university)).size;
        const totalEvents = this.events.length;

        document.getElementById('upcomingEvents').textContent = upcomingEvents;
        document.getElementById('totalEvents').textContent = totalEvents;
        document.getElementById('participatingUniversities').textContent = universities;
    }

    updateResultsCount() {
        const count = this.filteredEvents.length;
        // You could update a results counter here if needed
        console.log(`Showing ${count} events`);
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    scrollToEvents() {
        document.getElementById('upcomingEventsSection').scrollIntoView({ behavior: 'smooth' });
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
function openEventForm() {
    eventsHub.openEventForm();
}

function closeEventForm() {
    eventsHub.closeEventForm();
}

function closeEventDetail() {
    eventsHub.closeEventDetail();
}

function scrollToEvents() {
    eventsHub.scrollToEvents();
}

// Initialize the events hub when DOM is loaded
let eventsHub;
document.addEventListener('DOMContentLoaded', () => {
    eventsHub = new NSAEventsHub();
});

// Add notification styles if not already present
if (!document.querySelector('#notification-styles')) {
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: var(--radius-md);
            box-shadow: var(--events-shadow-lg);
            padding: 1rem;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid var(--events-success);
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-error {
            border-left-color: var(--events-warning);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .notification-content i {
            color: var(--events-success);
        }

        .notification-error .notification-content i {
            color: var(--events-warning);
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
}

// Sidebar toggle function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
} 