// Chapter Map JavaScript

// Global variables
let map;
let markers = [];
let chapters = [];
let filteredChapters = [];
let currentView = 'grid';
let itemsPerPage = 12;
let currentPage = 1;

// Sample chapter data (in a real app, this would come from an API)
const sampleChapters = [
    {
        id: 1,
        name: "NSA at UC Berkeley",
        university: "University of California, Berkeley",
        city: "Berkeley",
        state: "CA",
        latitude: 37.8716,
        longitude: -122.2727,
        description: "A vibrant community of Nepali students promoting cultural exchange and academic excellence at UC Berkeley.",
        email: "nsa.berkeley@example.com",
        phone: "(510) 555-0123",
        website: "https://nsa-berkeley.org",
        instagram: "https://instagram.com/nsa_berkeley",
        facebook: "https://facebook.com/nsaberkeley",
        linkedin: "https://linkedin.com/company/nsa-berkeley",
        status: "active",
        featured: true,
        members: 45,
        founded: "2018"
    },
    {
        id: 2,
        name: "NSA at MIT",
        university: "Massachusetts Institute of Technology",
        city: "Cambridge",
        state: "MA",
        latitude: 42.3601,
        longitude: -71.0589,
        description: "Connecting Nepali students at MIT through cultural events, academic support, and community building.",
        email: "nsa.mit@example.com",
        phone: "(617) 555-0124",
        website: "https://nsa-mit.org",
        instagram: "https://instagram.com/nsa_mit",
        facebook: "https://facebook.com/nsamit",
        linkedin: "https://linkedin.com/company/nsa-mit",
        status: "active",
        featured: true,
        members: 38,
        founded: "2019"
    },
    {
        id: 3,
        name: "NSA at UT Austin",
        university: "University of Texas at Austin",
        city: "Austin",
        state: "TX",
        latitude: 30.2672,
        longitude: -97.7431,
        description: "Fostering Nepali culture and community at UT Austin through events, mentorship, and cultural celebrations.",
        email: "nsa.utaustin@example.com",
        phone: "(512) 555-0125",
        website: "https://nsa-utaustin.org",
        instagram: "https://instagram.com/nsa_utaustin",
        facebook: "https://facebook.com/nsautaustin",
        linkedin: "https://linkedin.com/company/nsa-utaustin",
        status: "active",
        featured: false,
        members: 52,
        founded: "2017"
    },
    {
        id: 4,
        name: "NSA at NYU",
        university: "New York University",
        city: "New York",
        state: "NY",
        latitude: 40.7128,
        longitude: -74.0060,
        description: "Building a strong Nepali community in the heart of New York City through cultural events and networking.",
        email: "nsa.nyu@example.com",
        phone: "(212) 555-0126",
        website: "https://nsa-nyu.org",
        instagram: "https://instagram.com/nsa_nyu",
        facebook: "https://facebook.com/nsanyu",
        linkedin: "https://linkedin.com/company/nsa-nyu",
        status: "active",
        featured: true,
        members: 67,
        founded: "2016"
    },
    {
        id: 5,
        name: "NSA at University of Washington",
        university: "University of Washington",
        city: "Seattle",
        state: "WA",
        latitude: 47.6062,
        longitude: -122.3321,
        description: "Connecting Nepali students in the Pacific Northwest through cultural events and academic support.",
        email: "nsa.uw@example.com",
        phone: "(206) 555-0127",
        website: "https://nsa-uw.org",
        instagram: "https://instagram.com/nsa_uw",
        facebook: "https://facebook.com/nsauw",
        linkedin: "https://linkedin.com/company/nsa-uw",
        status: "active",
        featured: false,
        members: 41,
        founded: "2020"
    },
    {
        id: 6,
        name: "NSA at University of Michigan",
        university: "University of Michigan",
        city: "Ann Arbor",
        state: "MI",
        latitude: 42.2808,
        longitude: -83.7430,
        description: "Promoting Nepali culture and fostering community among students at the University of Michigan.",
        email: "nsa.umich@example.com",
        phone: "(734) 555-0128",
        website: "https://nsa-umich.org",
        instagram: "https://instagram.com/nsa_umich",
        facebook: "https://facebook.com/nsaumich",
        linkedin: "https://linkedin.com/company/nsa-umich",
        status: "active",
        featured: false,
        members: 35,
        founded: "2019"
    },
    {
        id: 7,
        name: "NSA at Georgia Tech",
        university: "Georgia Institute of Technology",
        city: "Atlanta",
        state: "GA",
        latitude: 33.7490,
        longitude: -84.3880,
        description: "Building a strong Nepali community at Georgia Tech through cultural events and professional development.",
        email: "nsa.gatech@example.com",
        phone: "(404) 555-0129",
        website: "https://nsa-gatech.org",
        instagram: "https://instagram.com/nsa_gatech",
        facebook: "https://facebook.com/nsagatech",
        linkedin: "https://linkedin.com/company/nsa-gatech",
        status: "active",
        featured: false,
        members: 29,
        founded: "2021"
    },
    {
        id: 8,
        name: "NSA at UCLA",
        university: "University of California, Los Angeles",
        city: "Los Angeles",
        state: "CA",
        latitude: 34.0522,
        longitude: -118.2437,
        description: "Connecting Nepali students in Los Angeles through cultural events, networking, and community service.",
        email: "nsa.ucla@example.com",
        phone: "(310) 555-0130",
        website: "https://nsa-ucla.org",
        instagram: "https://instagram.com/nsa_ucla",
        facebook: "https://facebook.com/nsaucla",
        linkedin: "https://linkedin.com/company/nsa-ucla",
        status: "active",
        featured: true,
        members: 58,
        founded: "2018"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadChapters();
    setupEventListeners();
    updateStats();
});

// Initialize Leaflet map
function initializeMap() {
    // Initialize map centered on USA
    map = L.map('chapterMap').setView([39.8283, -98.5795], 4);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add custom map controls
    addMapControls();
}

// Add custom map controls
function addMapControls() {
    // Custom zoom control
    const zoomControl = L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    
    // Custom fullscreen control
    const fullscreenControl = L.control({
        position: 'topright'
    });
    
    fullscreenControl.onAdd = function() {
        const div = L.DomUtil.create('div', 'leaflet-control-fullscreen');
        div.innerHTML = '<button onclick="toggleFullscreen()" title="Fullscreen"><i class="fas fa-expand"></i></button>';
        return div;
    };
    
    fullscreenControl.addTo(map);
}

// Load chapters data
function loadChapters() {
    // In a real app, this would be an API call
    chapters = [...sampleChapters];
    filteredChapters = [...chapters];
    
    // Populate filters
    populateFilters();
    
    // Add markers to map
    addMarkersToMap();
    
    // Render directory
    renderDirectory();
}

// Populate filter dropdowns
function populateFilters() {
    const stateFilter = document.getElementById('stateFilter');
    const universityFilter = document.getElementById('universityFilter');
    
    // Get unique states and universities
    const states = [...new Set(chapters.map(chapter => chapter.state))].sort();
    const universities = [...new Set(chapters.map(chapter => chapter.university))].sort();
    
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

// Add markers to map
function addMarkersToMap() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add new markers
    filteredChapters.forEach(chapter => {
        const marker = createMarker(chapter);
        markers.push(marker);
        marker.addTo(map);
    });
}

// Create a marker for a chapter
function createMarker(chapter) {
    // Custom marker icon based on status
    const iconClass = chapter.featured ? 'featured' : chapter.status === 'new' ? 'new' : 'active';
    
    const customIcon = L.divIcon({
        className: `chapter-marker ${iconClass}`,
        html: `<div class="marker-content">
                <i class="fas fa-map-marker-alt"></i>
               </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
    
    const marker = L.marker([chapter.latitude, chapter.longitude], {
        icon: customIcon
    });
    
    // Create popup content
    const popupContent = createPopupContent(chapter);
    marker.bindPopup(popupContent);
    
    // Add click event
    marker.on('click', () => {
        openChapterModal(chapter);
    });
    
    return marker;
}

// Create popup content for marker
function createPopupContent(chapter) {
    return `
        <div class="marker-popup">
            <div class="popup-header">
                <div class="popup-logo">
                    <i class="fas fa-users"></i>
                </div>
                <div class="popup-info">
                    <h4>${chapter.name}</h4>
                    <p>${chapter.university}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${chapter.city}, ${chapter.state}</p>
                </div>
            </div>
            <div class="popup-actions">
                <button onclick="openChapterModal(${JSON.stringify(chapter).replace(/"/g, '&quot;')})" class="popup-btn">
                    View Details
                </button>
            </div>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('chapterSearch');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    const stateFilter = document.getElementById('stateFilter');
    const universityFilter = document.getElementById('universityFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    stateFilter.addEventListener('change', handleFilters);
    universityFilter.addEventListener('change', handleFilters);
    sortFilter.addEventListener('change', handleFilters);
    
    // Modal close events
    const chapterModal = document.getElementById('chapterModal');
    const submitModal = document.getElementById('submitChapterModal');
    
    document.getElementById('closeChapterModal').addEventListener('click', () => {
        chapterModal.style.display = 'none';
    });
    
    document.getElementById('closeSubmitModal').addEventListener('click', () => {
        submitModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === chapterModal) {
            chapterModal.style.display = 'none';
        }
        if (e.target === submitModal) {
            submitModal.style.display = 'none';
        }
    });
    
    // Form submission
    const chapterForm = document.getElementById('chapterForm');
    chapterForm.addEventListener('submit', handleChapterSubmission);
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('chapterSearch').value.toLowerCase();
    
    filteredChapters = chapters.filter(chapter => 
        chapter.name.toLowerCase().includes(searchTerm) ||
        chapter.university.toLowerCase().includes(searchTerm) ||
        chapter.city.toLowerCase().includes(searchTerm) ||
        chapter.state.toLowerCase().includes(searchTerm)
    );
    
    applyFilters();
}

// Handle filters
function handleFilters() {
    const stateFilter = document.getElementById('stateFilter').value;
    const universityFilter = document.getElementById('universityFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    filteredChapters = chapters.filter(chapter => {
        const stateMatch = !stateFilter || chapter.state === stateFilter;
        const universityMatch = !universityFilter || chapter.university === universityFilter;
        return stateMatch && universityMatch;
    });
    
    // Apply sorting
    if (sortFilter) {
        filteredChapters.sort((a, b) => {
            switch (sortFilter) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'state':
                    return a.state.localeCompare(b.state);
                case 'university':
                    return a.university.localeCompare(b.university);
                default:
                    return 0;
            }
        });
    }
    
    applyFilters();
}

// Apply filters and update UI
function applyFilters() {
    // Update map markers
    addMarkersToMap();
    
    // Update directory
    currentPage = 1;
    renderDirectory();
    
    // Update results count
    updateResultsCount();
    
    // Update stats
    updateStats();
}

// Update results count
function updateResultsCount() {
    const filteredResults = document.getElementById('filteredResults');
    const directoryResults = document.getElementById('directoryResults');
    
    filteredResults.textContent = filteredChapters.length;
    directoryResults.textContent = Math.min(filteredChapters.length, itemsPerPage);
}

// Update statistics
function updateStats() {
    const states = [...new Set(chapters.map(chapter => chapter.state))];
    const universities = [...new Set(chapters.map(chapter => chapter.university))];
    
    document.getElementById('totalStates').textContent = states.length;
    document.getElementById('totalUniversities').textContent = universities.length;
    document.getElementById('totalChapters').textContent = chapters.length;
}

// Render directory
function renderDirectory() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const chaptersToShow = filteredChapters.slice(startIndex, endIndex);
    
    renderGridView(chaptersToShow);
    renderListView(chaptersToShow);
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (endIndex >= filteredChapters.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Render grid view
function renderGridView(chaptersToShow) {
    const grid = document.getElementById('chaptersGrid');
    
    if (currentView === 'grid') {
        grid.style.display = 'grid';
        grid.innerHTML = chaptersToShow.map(chapter => createChapterCard(chapter)).join('');
    } else {
        grid.style.display = 'none';
    }
}

// Render list view
function renderListView(chaptersToShow) {
    const list = document.getElementById('chaptersList');
    
    if (currentView === 'list') {
        list.style.display = 'block';
        list.innerHTML = chaptersToShow.map(chapter => createChapterListItem(chapter)).join('');
    } else {
        list.style.display = 'none';
    }
}

// Create chapter card for grid view
function createChapterCard(chapter) {
    const statusClass = chapter.featured ? 'featured' : chapter.status === 'new' ? 'new' : 'active';
    
    return `
        <div class="chapter-card" data-chapter-id="${chapter.id}">
            <div class="chapter-header">
                <div class="chapter-logo">
                    <i class="fas fa-users"></i>
                </div>
                <div class="chapter-info">
                    <h3>${chapter.name}</h3>
                    <div class="university">${chapter.university}</div>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${chapter.city}, ${chapter.state}
                    </div>
                </div>
            </div>
            <div class="chapter-body">
                <p class="chapter-description">${chapter.description}</p>
                <div class="chapter-social">
                    ${chapter.instagram ? `<a href="${chapter.instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i></a>` : ''}
                    ${chapter.facebook ? `<a href="${chapter.facebook}" target="_blank" class="social-link"><i class="fab fa-facebook"></i></a>` : ''}
                    ${chapter.linkedin ? `<a href="${chapter.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>` : ''}
                    ${chapter.website ? `<a href="${chapter.website}" target="_blank" class="social-link"><i class="fas fa-globe"></i></a>` : ''}
                </div>
            </div>
            <div class="chapter-footer">
                <span class="chapter-status ${statusClass}">${chapter.featured ? 'Featured' : chapter.status === 'new' ? 'New' : 'Active'}</span>
                <button class="view-profile-btn" onclick="openChapterModal(${JSON.stringify(chapter).replace(/"/g, '&quot;')})">
                    View Profile
                </button>
            </div>
        </div>
    `;
}

// Create chapter list item
function createChapterListItem(chapter) {
    const statusClass = chapter.featured ? 'featured' : chapter.status === 'new' ? 'new' : 'active';
    
    return `
        <div class="chapter-list-item" data-chapter-id="${chapter.id}">
            <div class="list-item-logo">
                <i class="fas fa-users"></i>
            </div>
            <div class="list-item-main">
                <div class="list-item-header">
                    <h3>${chapter.name}</h3>
                    <span class="chapter-status ${statusClass}">${chapter.featured ? 'Featured' : chapter.status === 'new' ? 'New' : 'Active'}</span>
                </div>
                <div class="list-item-meta">
                    <span><i class="fas fa-university"></i> ${chapter.university}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${chapter.city}, ${chapter.state}</span>
                    <span><i class="fas fa-users"></i> ${chapter.members} members</span>
                </div>
            </div>
            <div class="list-item-actions">
                <div class="chapter-social">
                    ${chapter.instagram ? `<a href="${chapter.instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i></a>` : ''}
                    ${chapter.facebook ? `<a href="${chapter.facebook}" target="_blank" class="social-link"><i class="fab fa-facebook"></i></a>` : ''}
                    ${chapter.linkedin ? `<a href="${chapter.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>` : ''}
                </div>
                <button class="view-profile-btn" onclick="openChapterModal(${JSON.stringify(chapter).replace(/"/g, '&quot;')})">
                    View Profile
                </button>
            </div>
        </div>
    `;
}

// Switch view between grid and list
function switchView(view) {
    currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Re-render directory
    renderDirectory();
}

// Load more chapters
function loadMoreChapters() {
    currentPage++;
    renderDirectory();
}

// Reset filters
function resetFilters() {
    document.getElementById('chapterSearch').value = '';
    document.getElementById('stateFilter').value = '';
    document.getElementById('universityFilter').value = '';
    document.getElementById('sortFilter').value = 'name';
    
    filteredChapters = [...chapters];
    applyFilters();
}

// Reset map view
function resetMapView() {
    map.setView([39.8283, -98.5795], 4);
}

// Toggle fullscreen
function toggleFullscreen() {
    const mapContainer = document.getElementById('chapterMap');
    
    if (!document.fullscreenElement) {
        mapContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Open chapter modal
function openChapterModal(chapter) {
    const modal = document.getElementById('chapterModal');
    const modalBody = document.getElementById('modalChapterBody');
    
    const statusClass = chapter.featured ? 'featured' : chapter.status === 'new' ? 'new' : 'active';
    
    modalBody.innerHTML = `
        <div class="chapter-detail-content">
            <div class="detail-header">
                <div class="detail-logo">
                    <i class="fas fa-users"></i>
                </div>
                <div class="detail-info">
                    <h3>${chapter.name}</h3>
                    <div class="university">${chapter.university}</div>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${chapter.city}, ${chapter.state}
                    </div>
                    <span class="chapter-status ${statusClass}">${chapter.featured ? 'Featured' : chapter.status === 'new' ? 'New' : 'Active'}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>About</h4>
                <p>${chapter.description}</p>
            </div>
            
            <div class="detail-section">
                <h4>Contact Information</h4>
                <div class="contact-info">
                    ${chapter.email ? `<p><i class="fas fa-envelope"></i> <a href="mailto:${chapter.email}">${chapter.email}</a></p>` : ''}
                    ${chapter.phone ? `<p><i class="fas fa-phone"></i> <a href="tel:${chapter.phone}">${chapter.phone}</a></p>` : ''}
                    ${chapter.website ? `<p><i class="fas fa-globe"></i> <a href="${chapter.website}" target="_blank">${chapter.website}</a></p>` : ''}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Social Media</h4>
                <div class="social-links">
                    ${chapter.instagram ? `<a href="${chapter.instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i> Instagram</a>` : ''}
                    ${chapter.facebook ? `<a href="${chapter.facebook}" target="_blank" class="social-link"><i class="fab fa-facebook"></i> Facebook</a>` : ''}
                    ${chapter.linkedin ? `<a href="${chapter.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Chapter Details</h4>
                <div class="chapter-details">
                    <p><strong>Members:</strong> ${chapter.members}</p>
                    <p><strong>Founded:</strong> ${chapter.founded}</p>
                    <p><strong>Status:</strong> ${chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}</p>
                </div>
            </div>
            
            <div class="detail-actions">
                <button class="btn btn-secondary" onclick="closeChapterModal()">Close</button>
                ${chapter.email ? `<a href="mailto:${chapter.email}" class="btn btn-primary">Contact Chapter</a>` : ''}
                <button class="btn btn-primary" onclick="centerMapOnChapter(${chapter.latitude}, ${chapter.longitude})">Show on Map</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close chapter modal
function closeChapterModal() {
    document.getElementById('chapterModal').style.display = 'none';
}

// Center map on specific chapter
function centerMapOnChapter(lat, lng) {
    map.setView([lat, lng], 12);
    closeChapterModal();
}

// Open chapter form
function openChapterForm() {
    document.getElementById('submitChapterModal').style.display = 'block';
}

// Close chapter form
function closeChapterForm() {
    document.getElementById('submitChapterModal').style.display = 'none';
    document.getElementById('chapterForm').reset();
}

// Handle chapter form submission
function handleChapterSubmission(e) {
    e.preventDefault();
    
    // In a real app, this would submit to an API
    const formData = new FormData(e.target);
    const chapterData = Object.fromEntries(formData);
    
    console.log('New chapter submission:', chapterData);
    
    // Show success message
    alert('Thank you for submitting your chapter! We will review and add it to our directory soon.');
    
    closeChapterForm();
}

// Scroll to directory
function scrollToDirectory() {
    document.getElementById('chapterDirectory').scrollIntoView({
        behavior: 'smooth'
    });
}

// Utility function: debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add custom CSS for map markers
const style = document.createElement('style');
style.textContent = `
    .chapter-marker {
        background: transparent;
        border: none;
    }
    
    .chapter-marker .marker-content {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.25rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 3px solid white;
        transition: transform 0.2s ease;
    }
    
    .chapter-marker.active .marker-content {
        background: var(--primary-color);
    }
    
    .chapter-marker.featured .marker-content {
        background: #f59e0b;
    }
    
    .chapter-marker.new .marker-content {
        background: #10b981;
    }
    
    .chapter-marker:hover .marker-content {
        transform: scale(1.1);
    }
    
    .marker-popup {
        min-width: 250px;
        padding: 0;
    }
    
    .popup-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .popup-logo {
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
    }
    
    .popup-info h4 {
        margin: 0 0 0.25rem 0;
        color: var(--text-primary);
        font-size: 1rem;
    }
    
    .popup-info p {
        margin: 0 0 0.25rem 0;
        color: var(--text-secondary);
        font-size: 0.875rem;
    }
    
    .popup-actions {
        text-align: center;
    }
    
    .popup-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .popup-btn:hover {
        background: var(--primary-dark);
    }
    
    .leaflet-popup-content-wrapper {
        border-radius: var(--radius-lg);
    }
    
    .leaflet-popup-content {
        margin: 1rem;
    }
    
    .leaflet-control-fullscreen button {
        background: white;
        border: none;
        border-radius: var(--radius-md);
        width: 36px;
        height: 36px;
        cursor: pointer;
        box-shadow: var(--shadow-md);
        transition: var(--transition);
    }
    
    .leaflet-control-fullscreen button:hover {
        background: var(--bg-tertiary);
        transform: translateY(-1px);
        box-shadow: var(--shadow-lg);
    }
`;
document.head.appendChild(style); 