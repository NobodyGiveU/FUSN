// NSA Website JavaScript
class NSAWebsite {
    constructor() {
        this.nsaData = [];
        this.filteredData = [];
        this.currentView = 'grid';
        this.map = null;
        this.markers = [];
        
        this.init();
    }

    async init() {
        await this.loadNSAData();
        this.setupEventListeners();
        this.updateStats();
        this.renderPopularUniversities();
        this.initializeMap();
        this.setupSmoothScrolling();
    }

    async loadNSAData() {
        try {
            const response = await fetch('nsa_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.nsaData = Array.isArray(data) ? data : [];
            this.filteredData = [...this.nsaData];
            console.log('NSA data loaded:', this.nsaData.length, 'entries');
            this.populateSearchOptions();
            this.renderNSACards();
        } catch (error) {
            console.error('Error loading NSA data:', error);
            this.showError('Failed to load NSA data. Please try again later.');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const stateFilter = document.getElementById('stateFilter');
        const sortBy = document.getElementById('sortBy');

        searchInput.addEventListener('input', () => this.handleSearch());
        stateFilter.addEventListener('change', () => this.handleSearch());
        sortBy.addEventListener('change', () => this.handleSearch());

        // View controls
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });

        // Modal functionality
        const submitBtn = document.querySelector('.nav-actions .btn');
        const closeBtn = document.querySelector('.close-btn');
        const modal = document.getElementById('submitModal');

        submitBtn.addEventListener('click', () => this.openSubmitForm());
        closeBtn.addEventListener('click', () => this.closeSubmitForm());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeSubmitForm();
        });

        // Form submission
        const nsaForm = document.getElementById('nsaForm');
        nsaForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.scrollToSection(target);
            });
        });
    }

    populateSearchOptions() {
        const datalist = document.getElementById('universityList');
        const stateFilter = document.getElementById('stateFilter');
        
        // Clear existing options
        datalist.innerHTML = '';
        
        // Get unique states
        const states = [...new Set(this.nsaData.map(nsa => this.extractState(nsa.location)))].sort();
        
        // Populate datalist with universities
        this.nsaData.forEach(nsa => {
            const option = document.createElement('option');
            option.value = nsa.university;
            datalist.appendChild(option);
        });

        // Populate state filter
        states.forEach(state => {
            if (state) {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateFilter.appendChild(option);
            }
        });
    }

    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const stateFilter = document.getElementById('stateFilter').value;
        const sortBy = document.getElementById('sortBy').value;

        this.filteredData = this.nsaData.filter(nsa => {
            const matchesSearch = !searchTerm || 
                nsa.university.toLowerCase().includes(searchTerm) ||
                nsa.name.toLowerCase().includes(searchTerm) ||
                nsa.location.toLowerCase().includes(searchTerm);
            
            const matchesState = !stateFilter || 
                this.extractState(nsa.location) === stateFilter;

            return matchesSearch && matchesState;
        });

        this.sortData(sortBy);
        this.renderNSACards();
        this.updateResultsCount();
        this.updateMapMarkers();
    }

    sortData(sortBy) {
        switch (sortBy) {
            case 'name':
                this.filteredData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                this.filteredData.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'state':
                this.filteredData.sort((a, b) => 
                    this.extractState(a.location).localeCompare(this.extractState(b.location))
                );
                break;
            case 'social':
                this.filteredData.sort((a, b) => {
                    const aSocialCount = this.getSocialMediaCount(a);
                    const bSocialCount = this.getSocialMediaCount(b);
                    return bSocialCount - aSocialCount;
                });
                break;
        }
    }

    getSocialMediaCount(nsa) {
        const socialPlatforms = ['instagram', 'facebook', 'youtube', 'tiktok', 'linkedin', 'twitter', 'discord', 'groupme', 'linktree', 'website'];
        return socialPlatforms.filter(platform => nsa[platform]).length;
    }

    extractState(location) {
        if (!location) return '';
        const stateMatch = location.match(/, ([A-Za-z\s]+)(?:,|$)/);
        return stateMatch ? stateMatch[1].trim() : '';
    }

    renderNSACards() {
        const gridContainer = document.getElementById('nsaGrid');
        const listContainer = document.getElementById('nsaList');
        
        if (this.currentView === 'grid') {
            gridContainer.innerHTML = this.filteredData.map(nsa => this.createNSACard(nsa)).join('');
        } else if (this.currentView === 'list') {
            listContainer.innerHTML = this.filteredData.map(nsa => this.createNSAListItem(nsa)).join('');
        }
    }

    createNSACard(nsa) {
        const socialLinks = this.createSocialLinks(nsa);
        const contactInfo = this.createContactInfo(nsa);
        
        return `
            <div class="nsa-card" data-nsa="${nsa.name}">
                <div class="nsa-card-header">
                    <h3 class="nsa-name">${nsa.name}</h3>
                    <p class="nsa-university">${nsa.university}</p>
                    <div class="nsa-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${nsa.location || 'Location not specified'}</span>
                    </div>
                </div>
                <div class="nsa-card-body">
                    ${socialLinks}
                    ${contactInfo}
                </div>
            </div>
        `;
    }

    createNSAListItem(nsa) {
        const socialLinks = this.createSocialLinks(nsa);
        const contactInfo = this.createContactInfo(nsa);
        
        return `
            <div class="nsa-list-item" data-nsa="${nsa.name}">
                <div class="nsa-list-header">
                    <h3>${nsa.name}</h3>
                    <p>${nsa.university}</p>
                    <span><i class="fas fa-map-marker-alt"></i> ${nsa.location || 'Location not specified'}</span>
                </div>
                <div class="nsa-list-content">
                    ${socialLinks}
                    ${contactInfo}
                </div>
            </div>
        `;
    }

    createSocialLinks(nsa) {
        const socialPlatforms = [
            { key: 'instagram', icon: 'fab fa-instagram', label: 'Instagram' },
            { key: 'facebook', icon: 'fab fa-facebook', label: 'Facebook' },
            { key: 'youtube', icon: 'fab fa-youtube', label: 'YouTube' },
            { key: 'tiktok', icon: 'fab fa-tiktok', label: 'TikTok' },
            { key: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn' },
            { key: 'twitter', icon: 'fab fa-twitter', label: 'Twitter' },
            { key: 'discord', icon: 'fab fa-discord', label: 'Discord' },
            { key: 'groupme', icon: 'fas fa-comments', label: 'GroupMe' },
            { key: 'linktree', icon: 'fas fa-link', label: 'LinkTree' },
            { key: 'website', icon: 'fas fa-globe', label: 'Website' }
        ];

        const links = socialPlatforms
            .filter(platform => nsa[platform.key])
            .map(platform => `
                <a href="${nsa[platform.key]}" target="_blank" class="social-link">
                    <i class="${platform.icon}"></i>
                    <span>${platform.label}</span>
                </a>
            `).join('');

        return links ? `<div class="nsa-social">${links}</div>` : '';
    }

    createContactInfo(nsa) {
        const contactItems = [];
        
        if (nsa.email) {
            contactItems.push(`
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:${nsa.email}">${nsa.email}</a>
                </div>
            `);
        }
        
        if (nsa.phone) {
            contactItems.push(`
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:${nsa.phone}">${nsa.phone}</a>
                </div>
            `);
        }

        if (nsa.president) {
            contactItems.push(`
                <div class="contact-item">
                    <i class="fas fa-user"></i>
                    <span>President: ${nsa.president}</span>
                </div>
            `);
        }

        return contactItems.length ? `<div class="nsa-contact">${contactItems.join('')}</div>` : '';
    }

    switchView(view) {
        this.currentView = view;
        
        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Show/hide containers
        document.getElementById('nsaGrid').classList.toggle('active', view === 'grid');
        document.getElementById('nsaList').classList.toggle('active', view === 'list');
        document.getElementById('nsaMap').classList.toggle('active', view === 'map');

        if (view === 'map') {
            this.updateMapMarkers();
        } else {
            this.renderNSACards();
        }
    }

    initializeMap() {
        if (typeof L === 'undefined') {
            console.warn('Leaflet not loaded');
            return;
        }

        this.map = L.map('mapContainer').setView([39.8283, -98.5795], 4);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.updateMapMarkers();
    }

    updateMapMarkers() {
        if (!this.map) return;

        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        // Add markers for filtered data
        this.filteredData.forEach(nsa => {
            const coordinates = this.getCoordinates(nsa.location);
            if (coordinates) {
                const marker = L.marker(coordinates)
                    .bindPopup(this.createMapPopup(nsa))
                    .addTo(this.map);
                this.markers.push(marker);
            }
        });
    }

    getCoordinates(location) {
        // This is a simplified geocoding - in a real app, you'd use a geocoding service
        const stateCoordinates = {
            'California': [36.7783, -119.4179],
            'Texas': [31.9686, -99.9018],
            'New York': [42.1657, -74.9481],
            'Florida': [27.6648, -81.5158],
            'Illinois': [40.6331, -89.3985],
            'Pennsylvania': [40.5908, -77.2098],
            'Ohio': [40.4173, -82.9071],
            'Georgia': [32.1656, -82.9001],
            'North Carolina': [35.7596, -79.0193],
            'Michigan': [44.3148, -85.6024],
            'Virginia': [37.7693, -78.1700],
            'Washington': [47.4009, -121.4905],
            'Arizona': [33.7298, -111.4312],
            'Massachusetts': [42.2304, -71.5301],
            'Tennessee': [35.7478, -86.6923],
            'Indiana': [39.8494, -86.2583],
            'Missouri': [38.4561, -92.2884],
            'Maryland': [39.0639, -76.8021],
            'Colorado': [39.5501, -105.7821],
            'Wisconsin': [44.5133, -89.0133],
            'Minnesota': [46.7296, -94.6859],
            'South Carolina': [33.8569, -80.9450],
            'Alabama': [32.3182, -86.9023],
            'Louisiana': [31.1695, -91.8678],
            'Kentucky': [37.6681, -84.6701],
            'Oregon': [44.5720, -122.0709],
            'Oklahoma': [35.5653, -96.9289],
            'Connecticut': [41.6032, -73.0877],
            'Iowa': [42.0329, -93.6238],
            'Mississippi': [32.7416, -89.6787],
            'Arkansas': [34.9697, -92.3731],
            'Kansas': [38.5111, -96.8005],
            'Utah': [39.3210, -111.0937],
            'Nevada': [38.8026, -116.4194],
            'New Mexico': [34.5199, -105.8701],
            'West Virginia': [38.5976, -80.4549],
            'Nebraska': [41.4925, -99.9018],
            'Idaho': [44.2405, -114.4788],
            'Hawaii': [19.8968, -155.5828],
            'New Hampshire': [43.1939, -71.5724],
            'Maine': [44.6939, -69.3819],
            'Rhode Island': [41.6809, -71.5118],
            'Montana': [46.8797, -110.3626],
            'Delaware': [38.9108, -75.5277],
            'South Dakota': [44.2998, -99.4388],
            'North Dakota': [47.5515, -101.0020],
            'Alaska': [63.5887, -154.4931],
            'Vermont': [44.0459, -72.7107],
            'Wyoming': [42.7475, -107.2085]
        };

        if (!location) return null;

        for (const [state, coords] of Object.entries(stateCoordinates)) {
            if (location.includes(state)) {
                return coords;
            }
        }

        return null;
    }

    createMapPopup(nsa) {
        const socialLinks = this.createSocialLinks(nsa);
        return `
            <div class="map-popup">
                <h3>${nsa.name}</h3>
                <p><strong>${nsa.university}</strong></p>
                <p><i class="fas fa-map-marker-alt"></i> ${nsa.location || 'Location not specified'}</p>
                ${socialLinks ? `<div class="popup-social">${socialLinks}</div>` : ''}
            </div>
        `;
    }

    updateStats() {
        const universities = new Set(this.nsaData.map(nsa => nsa.university)).size;
        const states = new Set(this.nsaData.map(nsa => this.extractState(nsa.location)).filter(Boolean)).size;
        const totalNSAs = this.nsaData.length;

        document.getElementById('totalUniversities').textContent = universities;
        document.getElementById('totalStates').textContent = states;
        document.getElementById('totalNSAs').textContent = totalNSAs;
    }

    updateResultsCount() {
        const count = this.filteredData.length;
        document.getElementById('resultsCount').textContent = count;
    }

    renderPopularUniversities() {
        const popularGrid = document.getElementById('popularGrid');
        const popularNSAs = this.getPopularNSAs();
        
        popularGrid.innerHTML = popularNSAs.map(nsa => `
            <div class="popular-card">
                <h3>${nsa.name}</h3>
                <p>${nsa.university}</p>
                <div class="popular-links">
                    ${this.createSocialLinks(nsa)}
                </div>
            </div>
        `).join('');
    }

    getPopularNSAs() {
        // Return NSAs with the most social media presence
        return this.nsaData
            .map(nsa => ({
                ...nsa,
                socialCount: this.getSocialMediaCount(nsa)
            }))
            .sort((a, b) => b.socialCount - a.socialCount)
            .slice(0, 6);
    }

    openSubmitForm() {
        document.getElementById('submitModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeSubmitForm() {
        document.getElementById('submitModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const nsaData = {
            name: formData.get('nsaName'),
            university: formData.get('universityName'),
            location: formData.get('location'),
            email: formData.get('email'),
            instagram: formData.get('instagram'),
            facebook: formData.get('facebook')
        };

        try {
            // In a real app, you'd send this to your backend
            console.log('NSA submission:', nsaData);
            this.showSuccess('Thank you! Your NSA chapter has been submitted for review.');
            this.closeSubmitForm();
            e.target.reset();
        } catch (error) {
            this.showError('Failed to submit NSA chapter. Please try again.');
        }
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

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToSearch() {
        this.scrollToSection('search');
    }

    scrollToMap() {
        this.scrollToSection('map');
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

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NSAWebsite();
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        padding: 1rem;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid var(--success-color);
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-error {
        border-left-color: var(--danger-color);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .notification-content i {
        color: var(--success-color);
    }

    .notification-error .notification-content i {
        color: var(--danger-color);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 