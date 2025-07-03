// NSA Website JavaScript
class NSAWebsite {
    constructor() {
        this.nsaData = [];
        this.filteredData = [];
        this.currentView = 'grid';
        this.map = null;
        this.markers = [];
        this.currentPage = this.getCurrentPage();
        
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('search.html')) return 'search';
        if (path.includes('map.html')) return 'map';
        if (path.includes('events.html')) return 'events';
        if (path.includes('alumni.html')) return 'alumni';
        if (path.includes('scholarships.html')) return 'scholarships';
        if (path.includes('mentorship.html')) return 'mentorship';
        if (path.includes('resources.html')) return 'resources';
        if (path.includes('about.html')) return 'about';
        if (path.includes('contact.html')) return 'contact';
        return 'home'; // index.html
    }

    async init() {
        await this.loadNSAData();
        this.setupEventListeners();
        this.updateStats();
        
        // Page-specific initializations
        if (this.currentPage === 'home') {
            this.renderPopularUniversities();
        }
        
        if (this.currentPage === 'search') {
            this.populateSearchOptions();
            this.renderNSACards();
        }
        
        if (this.currentPage === 'map') {
            this.initializeMap();
            this.populateMapSearchOptions();
        }
        
        if (this.currentPage === 'events') {
            // Events page has its own script
            return;
        }
        
        if (this.currentPage === 'alumni') {
            // Alumni page has its own script
            return;
        }
        
        if (this.currentPage === 'scholarships') {
            // Scholarships page has its own script
            return;
        }
        
        if (this.currentPage === 'mentorship') {
            // Mentorship page has its own script
            return;
        }
        
        if (this.currentPage === 'resources') {
            // Resources page has its own script
            return;
        }
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
        } catch (error) {
            console.error('Error loading NSA data:', error);
            this.showError('Failed to load NSA data. Please try again later.');
        }
    }

    setupEventListeners() {
        // Modal functionality (available on all pages)
        const submitBtn = document.querySelector('.nav-actions .btn');
        const closeBtn = document.querySelector('.close-btn');
        const modal = document.getElementById('submitModal');

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.openSubmitForm());
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeSubmitForm());
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeSubmitForm();
            });
        }

        // Form submission
        const nsaForm = document.getElementById('nsaForm');
        if (nsaForm) {
            nsaForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Page-specific event listeners
        if (this.currentPage === 'search') {
            this.setupSearchEventListeners();
        }
        
        if (this.currentPage === 'map') {
            this.setupMapEventListeners();
        }
    }

    setupSearchEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const stateFilter = document.getElementById('stateFilter');
        const sortBy = document.getElementById('sortBy');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.handleSearch());
        }
        if (stateFilter) {
            stateFilter.addEventListener('change', () => this.handleSearch());
        }
        if (sortBy) {
            sortBy.addEventListener('change', () => this.handleSearch());
        }

        // View controls
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });
    }

    setupMapEventListeners() {
        const mapStateFilter = document.getElementById('mapStateFilter');
        const mapSearchInput = document.getElementById('mapSearchInput');

        if (mapStateFilter) {
            mapStateFilter.addEventListener('change', () => this.handleMapFilter());
        }
        if (mapSearchInput) {
            mapSearchInput.addEventListener('input', () => this.handleMapSearch());
        }
    }

    populateSearchOptions() {
        const datalist = document.getElementById('universityList');
        const stateFilter = document.getElementById('stateFilter');
        
        if (!datalist || !stateFilter) return;
        
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

    populateMapSearchOptions() {
        const mapStateFilter = document.getElementById('mapStateFilter');
        
        if (!mapStateFilter) return;
        
        // Clear existing options
        mapStateFilter.innerHTML = '<option value="">All States</option>';
        
        // Get unique states
        const states = [...new Set(this.nsaData.map(nsa => this.extractState(nsa.location)))].sort();
        
        // Populate state filter
        states.forEach(state => {
            if (state) {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                mapStateFilter.appendChild(option);
            }
        });
    }

    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const stateFilter = document.getElementById('stateFilter');
        const sortBy = document.getElementById('sortBy');

        if (!searchInput || !stateFilter || !sortBy) return;

        const searchTerm = searchInput.value.toLowerCase();
        const stateFilterValue = stateFilter.value;
        const sortByValue = sortBy.value;

        this.filteredData = this.nsaData.filter(nsa => {
            const matchesSearch = !searchTerm || 
                nsa.university.toLowerCase().includes(searchTerm) ||
                nsa.name.toLowerCase().includes(searchTerm) ||
                nsa.location.toLowerCase().includes(searchTerm);
            
            const matchesState = !stateFilterValue || 
                this.extractState(nsa.location) === stateFilterValue;

            return matchesSearch && matchesState;
        });

        this.sortData(sortByValue);
        this.renderNSACards();
        this.updateResultsCount();
    }

    handleMapFilter() {
        const mapStateFilter = document.getElementById('mapStateFilter');
        if (!mapStateFilter) return;

        const stateFilterValue = mapStateFilter.value;
        this.filteredData = this.nsaData.filter(nsa => {
            return !stateFilterValue || this.extractState(nsa.location) === stateFilterValue;
        });

        this.updateMapMarkers();
        this.updateMapResultsCount();
    }

    handleMapSearch() {
        const mapSearchInput = document.getElementById('mapSearchInput');
        if (!mapSearchInput) return;

        const searchTerm = mapSearchInput.value.toLowerCase();
        this.filteredData = this.nsaData.filter(nsa => {
            return !searchTerm || 
                nsa.university.toLowerCase().includes(searchTerm) ||
                nsa.name.toLowerCase().includes(searchTerm) ||
                nsa.location.toLowerCase().includes(searchTerm);
        });

        this.updateMapMarkers();
        this.updateMapResultsCount();
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
        let state = stateMatch ? stateMatch[1].trim() : '';
        // Normalize '0H' to 'OH' and handle common typos
        if (state.toUpperCase() === '0H') state = 'OH';
        if (state.toUpperCase() === 'OHIO') state = 'OH';
        return state;
    }

    renderNSACards() {
        const gridContainer = document.getElementById('nsaGrid');
        const listContainer = document.getElementById('nsaList');
        
        if (!gridContainer && !listContainer) return;
        
        if (this.currentView === 'grid' && gridContainer) {
            gridContainer.innerHTML = this.filteredData.map(nsa => this.createNSACard(nsa)).join('');
        } else if (this.currentView === 'list' && listContainer) {
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
                    ${contactInfo}
                </div>
                <div class="nsa-card-footer">
                    ${socialLinks}
                </div>
            </div>
        `;
    }

    createNSAListItem(nsa) {
        const socialLinks = this.createSocialLinks(nsa);
        const contactInfo = this.createContactInfo(nsa);
        
        return `
            <div class="nsa-list-item" data-nsa="${nsa.name}">
                <div class="nsa-list-info">
                    <h3 class="nsa-name">${nsa.name}</h3>
                    <p class="nsa-university">${nsa.university}</p>
                    <div class="nsa-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${nsa.location || 'Location not specified'}</span>
                    </div>
                    ${contactInfo}
                </div>
                <div class="nsa-list-actions">
                    ${socialLinks}
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
            { key: 'groupme', icon: 'fas fa-users', label: 'GroupMe' },
            { key: 'linktree', icon: 'fas fa-link', label: 'LinkTree' },
            { key: 'website', icon: 'fas fa-globe', label: 'Website' }
        ];

        const links = socialPlatforms
            .filter(platform => nsa[platform.key])
            .map(platform => `
                <a href="${nsa[platform.key]}" target="_blank" rel="noopener noreferrer" 
                   class="social-link ${platform.key}" title="${platform.label}">
                    <i class="${platform.icon}"></i>
                </a>
            `).join('');

        return links ? `<div class="social-links">${links}</div>` : '';
    }

    createContactInfo(nsa) {
        const contactInfo = [];
        
        if (nsa.email) {
            contactInfo.push(`
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:${nsa.email}">${nsa.email}</a>
                </div>
            `);
        }
        
        if (nsa.phone) {
            contactInfo.push(`
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:${nsa.phone}">${nsa.phone}</a>
                </div>
            `);
        }

        return contactInfo.length > 0 ? `<div class="contact-info">${contactInfo.join('')}</div>` : '';
    }

    switchView(view) {
        this.currentView = view;
        
        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Update view containers
        document.querySelectorAll('.results-container > div').forEach(container => {
            container.classList.toggle('active', container.id === `nsa${view.charAt(0).toUpperCase() + view.slice(1)}`);
        });
        
        this.renderNSACards();
    }

    initializeMap() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) {
            console.log('Map container not found on this page');
            return;
        }

        try {
            this.map = L.map('mapContainer').setView([39.8283, -98.5795], 4);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);

            this.updateMapMarkers();
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }

    updateMapMarkers() {
        if (!this.map) return;

        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        this.filteredData.forEach(nsa => {
            const coords = this.getCoordinates(nsa.location);
            if (coords) {
                const marker = L.marker(coords)
                    .bindPopup(this.createMapPopup(nsa))
                    .addTo(this.map);
                this.markers.push(marker);
            }
        });
    }

    getCoordinates(location) {
        if (!location) return null;

        // Simple coordinate mapping for common locations
        const coordinates = {
            'New York, NY': [40.7128, -74.0060],
            'Los Angeles, CA': [34.0522, -118.2437],
            'Chicago, IL': [41.8781, -87.6298],
            'Houston, TX': [29.7604, -95.3698],
            'Phoenix, AZ': [33.4484, -112.0740],
            'Philadelphia, PA': [39.9526, -75.1652],
            'San Antonio, TX': [29.4241, -98.4936],
            'San Diego, CA': [32.7157, -117.1611],
            'Dallas, TX': [32.7767, -96.7970],
            'San Jose, CA': [37.3382, -121.8863],
            'Austin, TX': [30.2672, -97.7431],
            'Jacksonville, FL': [30.3322, -81.6557],
            'Fort Worth, TX': [32.7555, -97.3308],
            'Columbus, OH': [39.9612, -82.9988],
            'Charlotte, NC': [35.2271, -80.8431],
            'San Francisco, CA': [37.7749, -122.4194],
            'Indianapolis, IN': [39.7684, -86.1581],
            'Seattle, WA': [47.6062, -122.3321],
            'Denver, CO': [39.7392, -104.9903],
            'Washington, DC': [38.9072, -77.0369],
            'Boston, MA': [42.3601, -71.0589],
            'El Paso, TX': [31.7619, -106.4850],
            'Nashville, TN': [36.1627, -86.7816],
            'Detroit, MI': [42.3314, -83.0458],
            'Oklahoma City, OK': [35.4676, -97.5164],
            'Portland, OR': [45.5152, -122.6784],
            'Las Vegas, NV': [36.1699, -115.1398],
            'Memphis, TN': [35.1495, -90.0490],
            'Louisville, KY': [38.2527, -85.7585],
            'Baltimore, MD': [39.2904, -76.6122],
            'Milwaukee, WI': [43.0389, -87.9065],
            'Albuquerque, NM': [35.0844, -106.6504],
            'Tucson, AZ': [32.2226, -110.9747],
            'Fresno, CA': [36.7378, -119.7871],
            'Sacramento, CA': [38.5816, -121.4944],
            'Atlanta, GA': [33.7490, -84.3880],
            'Kansas City, MO': [39.0997, -94.5786],
            'Miami, FL': [25.7617, -80.1918],
            'Raleigh, NC': [35.7796, -78.6382],
            'Omaha, NE': [41.2565, -95.9345],
            'Minneapolis, MN': [44.9778, -93.2650],
            'Cleveland, OH': [41.4993, -81.6944],
            'Tulsa, OK': [36.1540, -95.9928],
            'Arlington, TX': [32.7357, -97.1081],
            'New Orleans, LA': [29.9511, -90.0715],
            'Wichita, KS': [37.6872, -97.3301],
            'Oakland, CA': [37.8044, -122.2711],
            'Bakersfield, CA': [35.3733, -119.0187],
            'Tampa, FL': [27.9506, -82.4572],
            'Aurora, CO': [39.7294, -104.8319],
            'Anaheim, CA': [33.8366, -117.9143],
            'Santa Ana, CA': [33.7455, -117.8677],
            'St. Louis, MO': [38.6270, -90.1994],
            'Pittsburgh, PA': [40.4406, -79.9959],
            'Corpus Christi, TX': [27.8006, -97.3964],
            'Riverside, CA': [33.9533, -117.3962],
            'Cincinnati, OH': [39.1031, -84.5120],
            'Lexington, KY': [38.0406, -84.5037],
            'Anchorage, AK': [61.2181, -149.9003],
            'Stockton, CA': [37.9577, -121.2908],
            'Toledo, OH': [41.6528, -83.5379],
            'St. Paul, MN': [44.9537, -93.0900],
            'Newark, NJ': [40.7357, -74.1724],
            'Greensboro, NC': [36.0726, -79.7920],
            'Buffalo, NY': [42.8864, -78.8784],
            'Plano, TX': [33.0198, -96.6989],
            'Lincoln, NE': [40.8136, -96.7026],
            'Henderson, NV': [36.0395, -114.9817],
            'Fort Wayne, IN': [41.0793, -85.1394],
            'Jersey City, NJ': [40.7178, -74.0431],
            'Chula Vista, CA': [32.6401, -117.0842],
            'Orlando, FL': [28.5383, -81.3792],
            'St. Petersburg, FL': [27.7731, -82.6400],
            'Chandler, AZ': [33.3062, -111.8413],
            'Laredo, TX': [27.5064, -99.5075],
            'Norfolk, VA': [36.8508, -76.2859],
            'Durham, NC': [35.9940, -78.8986],
            'Madison, WI': [43.0731, -89.4012],
            'Lubbock, TX': [33.5779, -101.8552],
            'Irvine, CA': [33.6846, -117.8265],
            'Winston-Salem, NC': [36.0999, -80.2442],
            'Glendale, AZ': [33.5387, -112.1860],
            'Garland, TX': [32.9126, -96.6389],
            'Hialeah, FL': [25.8576, -80.2781],
            'Reno, NV': [39.5296, -119.8138],
            'Chesapeake, VA': [36.7682, -76.2875],
            'Gilbert, AZ': [33.3528, -111.7890],
            'Baton Rouge, LA': [30.4515, -91.1871],
            'Irving, TX': [32.8140, -96.9489],
            'Scottsdale, AZ': [33.4942, -111.9261],
            'North Las Vegas, NV': [36.1989, -115.1175],
            'Fremont, CA': [37.5485, -121.9886],
            'Boise, ID': [43.6150, -116.2023],
            'Richmond, VA': [37.5407, -77.4360],
            'Spokane, WA': [47.6588, -117.4260],
            'Birmingham, AL': [33.5207, -86.8025]
        };

        // Try to find exact match first
        for (const [key, coords] of Object.entries(coordinates)) {
            if (location.toLowerCase().includes(key.toLowerCase())) {
                return coords;
            }
        }

        // If no exact match, try to extract state and use approximate coordinates
        const state = this.extractState(location);
        if (state) {
            const stateCoords = {
                'CA': [36.7783, -119.4179],
                'TX': [31.9686, -99.9018],
                'FL': [27.6648, -81.5158],
                'NY': [42.1657, -74.9481],
                'PA': [40.5908, -77.2098],
                'IL': [40.6331, -89.3985],
                'OH': [40.4173, -82.9071],
                'GA': [32.1656, -82.9001],
                'NC': [35.7596, -79.0193],
                'MI': [44.3148, -85.6024],
                'NJ': [40.0583, -74.4057],
                'VA': [37.7693, -78.1700],
                'WA': [47.4009, -121.4905],
                'AZ': [33.7298, -111.4312],
                'MA': [42.2304, -71.5301],
                'TN': [35.7478, -86.6923],
                'IN': [39.8494, -86.2583],
                'MO': [38.4561, -92.2884],
                'MD': [39.0639, -76.8021],
                'CO': [39.5501, -105.7821],
                'WI': [44.2685, -89.6165],
                'MN': [46.7296, -94.6859],
                'LA': [31.1695, -91.8678],
                'AL': [32.3182, -86.9023],
                'UT': [39.3210, -111.0937],
                'IA': [42.0329, -93.6238],
                'AR': [34.9697, -92.3731],
                'MS': [32.7416, -89.6787],
                'KS': [38.5266, -96.7265],
                'NV': [38.8026, -116.4194],
                'NM': [34.5199, -105.8701],
                'NE': [41.4925, -99.9018],
                'ID': [44.2405, -114.4788],
                'HI': [19.8968, -155.5828],
                'NH': [43.1939, -71.5724],
                'ME': [44.6939, -69.3819],
                'RI': [41.6809, -71.5118],
                'MT': [46.8797, -110.3626],
                'DE': [38.9108, -75.5277],
                'SD': [44.2998, -99.4388],
                'ND': [47.5515, -101.0020],
                'AK': [63.5887, -154.4931],
                'VT': [44.0459, -72.7107],
                'WY': [42.7475, -107.2085]
            };

            for (const [stateCode, coords] of Object.entries(stateCoords)) {
                if (state.toLowerCase().includes(stateCode.toLowerCase()) || 
                    state.toLowerCase().includes(this.getStateName(stateCode).toLowerCase())) {
                    return coords;
                }
            }
        }

        return null;
    }

    getStateName(stateCode) {
        const stateNames = {
            'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
            'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
            'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
            'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
            'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
            'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
            'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
            'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
            'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
            'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
            'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
            'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
            'WI': 'Wisconsin', 'WY': 'Wyoming'
        };
        return stateNames[stateCode] || stateCode;
    }

    createMapPopup(nsa) {
        const socialLinks = this.createSocialLinks(nsa);
        const contactInfo = this.createContactInfo(nsa);
        
        return `
            <div class="map-popup">
                <h3>${nsa.name}</h3>
                <p><strong>${nsa.university}</strong></p>
                <p><i class="fas fa-map-marker-alt"></i> ${nsa.location || 'Location not specified'}</p>
                ${contactInfo}
                ${socialLinks}
            </div>
        `;
    }

    updateStats() {
        const totalUniversities = document.getElementById('totalUniversities');
        const totalStates = document.getElementById('totalStates');
        const totalNSAs = document.getElementById('totalNSAs');

        if (totalUniversities) {
            totalUniversities.textContent = this.nsaData.length;
        }
        if (totalStates) {
            const states = new Set(this.nsaData.map(nsa => this.extractState(nsa.location)).filter(Boolean));
            totalStates.textContent = states.size;
        }
        if (totalNSAs) {
            totalNSAs.textContent = this.nsaData.length;
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = this.filteredData.length;
        }
    }

    updateMapResultsCount() {
        const mapResultsCount = document.getElementById('mapResultsCount');
        if (mapResultsCount) {
            mapResultsCount.textContent = this.filteredData.length;
        }
    }

    renderPopularUniversities() {
        const popularGrid = document.getElementById('popularGrid');
        if (!popularGrid) return;

        const popularNSAs = this.getPopularNSAs();
        popularGrid.innerHTML = popularNSAs.map(nsa => this.createNSACard(nsa)).join('');
    }

    getPopularNSAs() {
        // Return first 8 NSAs as "popular" for now
        // In a real app, this would be based on activity, member count, etc.
        return this.nsaData.slice(0, 8);
    }

    openSubmitForm() {
        const modal = document.getElementById('submitModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    closeSubmitForm() {
        const modal = document.getElementById('submitModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const nsaData = {
            name: formData.get('nsaName') || document.getElementById('nsaName')?.value,
            university: formData.get('universityName') || document.getElementById('universityName')?.value,
            location: formData.get('location') || document.getElementById('location')?.value,
            email: formData.get('email') || document.getElementById('email')?.value,
            instagram: formData.get('instagram') || document.getElementById('instagram')?.value,
            facebook: formData.get('facebook') || document.getElementById('facebook')?.value
        };

        // In a real app, this would send data to a server
        console.log('NSA submission:', nsaData);
        
        this.showSuccess('Thank you! Your NSA chapter has been submitted for review.');
        this.closeSubmitForm();
        e.target.reset();
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 4px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    window.nsaWebsite = new NSAWebsite();
});

// Global functions for HTML onclick handlers
function openSubmitForm() {
    if (window.nsaWebsite) {
        window.nsaWebsite.openSubmitForm();
    }
}

function closeSubmitForm() {
    if (window.nsaWebsite) {
        window.nsaWebsite.closeSubmitForm();
    }
}

function resetMapView() {
    if (window.nsaWebsite && window.nsaWebsite.map) {
        window.nsaWebsite.map.setView([39.8283, -98.5795], 4);
    }
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