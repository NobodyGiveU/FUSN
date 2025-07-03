// NSA Marketplace & Classifieds JavaScript

// Global variables
let listings = [];
let filteredListings = [];
let currentView = 'grid';
let itemsPerPage = 12;
let currentPage = 1;

// Sample marketplace listings data (in a real app, this would come from an API)
const sampleListings = [
    {
        id: 1,
        title: "Calculus Textbook - Stewart 8th Edition",
        category: "textbook",
        description: "Excellent condition Calculus textbook by James Stewart, 8th edition. Used for one semester, minimal highlighting. Perfect for Calculus I and II courses.",
        price: 45.00,
        isFree: false,
        negotiable: true,
        condition: "excellent",
        university: "University of California, Berkeley",
        city: "Berkeley",
        state: "CA",
        contactName: "Priya Sharma",
        contactEmail: "priya.sharma@berkeley.edu",
        contactPhone: "(510) 555-0123",
        images: [],
        featured: true,
        datePosted: "2024-01-15"
    },
    {
        id: 2,
        title: "IKEA Desk and Chair Set",
        category: "furniture",
        description: "Complete desk and chair set from IKEA. Perfect for dorm room or apartment. Desk is 120cm wide with storage drawer. Chair is ergonomic and comfortable.",
        price: 120.00,
        isFree: false,
        negotiable: true,
        condition: "good",
        university: "Massachusetts Institute of Technology",
        city: "Cambridge",
        state: "MA",
        contactName: "Rajesh Thapa",
        contactEmail: "rajesh.thapa@mit.edu",
        contactPhone: "(617) 555-0456",
        images: [],
        featured: true,
        datePosted: "2024-01-20"
    },
    {
        id: 3,
        title: "Room for Rent - Near Campus",
        category: "housing",
        description: "Private room available in 3-bedroom apartment, 10-minute walk to campus. Utilities included, furnished, available immediately. Perfect for graduate students.",
        price: 850.00,
        isFree: false,
        negotiable: false,
        condition: "new",
        university: "University of Texas at Austin",
        city: "Austin",
        state: "TX",
        contactName: "Sita Patel",
        contactEmail: "sita.patel@utexas.edu",
        contactPhone: "(512) 555-0789",
        images: [],
        featured: false,
        datePosted: "2024-01-18"
    },
    {
        id: 4,
        title: "Math Tutoring Services",
        category: "tutoring",
        description: "Experienced math tutor available for Calculus, Linear Algebra, and Statistics. Flexible schedule, reasonable rates. Can meet on campus or online.",
        price: 25.00,
        isFree: false,
        negotiable: true,
        condition: "new",
        university: "New York University",
        city: "New York",
        state: "NY",
        contactName: "Maya Gurung",
        contactEmail: "maya.gurung@nyu.edu",
        contactPhone: "(212) 555-0321",
        images: [],
        featured: false,
        datePosted: "2024-01-22"
    },
    {
        id: 5,
        title: "MacBook Air 2020 - 13 inch",
        category: "electronics",
        description: "MacBook Air 2020, 13-inch, 256GB SSD, 8GB RAM. Excellent condition, comes with original charger and case. Perfect for students.",
        price: 650.00,
        isFree: false,
        negotiable: true,
        condition: "excellent",
        university: "University of Washington",
        city: "Seattle",
        state: "WA",
        contactName: "Aarav Singh",
        contactEmail: "aarav.singh@uw.edu",
        contactPhone: "(206) 555-0654",
        images: [],
        featured: true,
        datePosted: "2024-01-16"
    },
    {
        id: 6,
        title: "Free Textbooks - Various Subjects",
        category: "textbook",
        description: "Giving away textbooks from previous semesters. Subjects include Physics, Chemistry, and Biology. First come, first served.",
        price: 0.00,
        isFree: true,
        negotiable: false,
        condition: "good",
        university: "University of Michigan",
        city: "Ann Arbor",
        state: "MI",
        contactName: "Kiran Tamang",
        contactEmail: "kiran.tamang@umich.edu",
        contactPhone: "(734) 555-0987",
        images: [],
        featured: false,
        datePosted: "2024-01-25"
    },
    {
        id: 7,
        title: "Ride Share to Airport",
        category: "ride-share",
        description: "Offering ride to airport on February 15th at 6 AM. Can accommodate 2 passengers with luggage. Share gas costs.",
        price: 30.00,
        isFree: false,
        negotiable: true,
        condition: "new",
        university: "Georgia Institute of Technology",
        city: "Atlanta",
        state: "GA",
        contactName: "Ramesh Bhandari",
        contactEmail: "ramesh.bhandari@gatech.edu",
        contactPhone: "(404) 555-0123",
        images: [],
        featured: false,
        datePosted: "2024-01-24"
    },
    {
        id: 8,
        title: "Winter Clothing - Various Sizes",
        category: "clothing",
        description: "Winter jackets, sweaters, and accessories in various sizes. All in good condition, perfect for cold weather.",
        price: 15.00,
        isFree: false,
        negotiable: true,
        condition: "good",
        university: "University of California, Los Angeles",
        city: "Los Angeles",
        state: "CA",
        contactName: "Anjali Gurung",
        contactEmail: "anjali.gurung@ucla.edu",
        contactPhone: "(310) 555-0456",
        images: [],
        featured: false,
        datePosted: "2024-01-23"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadListings();
    setupEventListeners();
    updateStats();
    populateFilters();
});

// Load listings data
function loadListings() {
    // In a real app, this would be an API call
    listings = [...sampleListings];
    filteredListings = [...listings];
    
    renderListings();
    renderFeaturedListings();
    renderCategories();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('listingSearch');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const stateFilter = document.getElementById('stateFilter');
    const universityFilter = document.getElementById('universityFilter');
    
    categoryFilter.addEventListener('change', handleFilters);
    priceFilter.addEventListener('change', handleFilters);
    stateFilter.addEventListener('change', handleFilters);
    universityFilter.addEventListener('change', handleFilters);
    
    // Form submission
    const listingForm = document.getElementById('listingForm');
    const modalListingForm = document.getElementById('modalListingForm');
    
    listingForm.addEventListener('submit', handleListingSubmission);
    modalListingForm.addEventListener('submit', handleListingSubmission);
    
    // Modal close events
    const listingModal = document.getElementById('listingModal');
    const submitListingModal = document.getElementById('submitListingModal');
    
    document.getElementById('closeListingModal').addEventListener('click', () => {
        listingModal.style.display = 'none';
    });
    
    document.getElementById('closeSubmitListingModal').addEventListener('click', () => {
        submitListingModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === listingModal) {
            listingModal.style.display = 'none';
        }
        if (e.target === submitListingModal) {
            submitListingModal.style.display = 'none';
        }
    });
    
    // Image upload handling
    const imageInput = document.getElementById('listingImages');
    imageInput.addEventListener('change', handleImageUpload);
    
    // Free checkbox handling
    const isFreeCheckbox = document.getElementById('isFree');
    const priceInput = document.getElementById('listingPrice');
    
    isFreeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            priceInput.value = '0';
            priceInput.disabled = true;
        } else {
            priceInput.disabled = false;
        }
    });
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('listingSearch').value.toLowerCase();
    
    filteredListings = listings.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm) ||
        listing.contactName.toLowerCase().includes(searchTerm) ||
        listing.university.toLowerCase().includes(searchTerm)
    );
    
    applyFilters();
}

// Handle filters
function handleFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const stateFilter = document.getElementById('stateFilter').value;
    const universityFilter = document.getElementById('universityFilter').value;
    
    filteredListings = listings.filter(listing => {
        const categoryMatch = !categoryFilter || listing.category === categoryFilter;
        const stateMatch = !stateFilter || listing.state === stateFilter;
        const universityMatch = !universityFilter || listing.university === universityFilter;
        
        let priceMatch = true;
        if (priceFilter) {
            switch (priceFilter) {
                case 'free':
                    priceMatch = listing.isFree;
                    break;
                case '0-25':
                    priceMatch = listing.price >= 0 && listing.price <= 25;
                    break;
                case '25-50':
                    priceMatch = listing.price > 25 && listing.price <= 50;
                    break;
                case '50-100':
                    priceMatch = listing.price > 50 && listing.price <= 100;
                    break;
                case '100-200':
                    priceMatch = listing.price > 100 && listing.price <= 200;
                    break;
                case '200+':
                    priceMatch = listing.price > 200;
                    break;
            }
        }
        
        return categoryMatch && stateMatch && universityMatch && priceMatch;
    });
    
    applyFilters();
}

// Apply filters and update UI
function applyFilters() {
    currentPage = 1;
    renderListings();
    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const filteredResults = document.getElementById('filteredResults');
    filteredResults.textContent = filteredListings.length;
}

// Update statistics
function updateStats() {
    const totalListings = listings.length;
    const universities = [...new Set(listings.map(listing => listing.university))];
    const freeItems = listings.filter(listing => listing.isFree).length;
    
    document.getElementById('totalListings').textContent = totalListings;
    document.getElementById('activeUsers').textContent = Math.floor(totalListings * 0.7); // Estimated users
    document.getElementById('universities').textContent = universities.length;
    
    // Update sidebar stats
    document.getElementById('sidebarListings').textContent = totalListings;
    document.getElementById('sidebarUsers').textContent = Math.floor(totalListings * 0.7);
    document.getElementById('sidebarFree').textContent = freeItems;
}

// Populate filters
function populateFilters() {
    const stateFilter = document.getElementById('stateFilter');
    const universityFilter = document.getElementById('universityFilter');
    
    const states = [...new Set(listings.map(listing => listing.state))].sort();
    const universities = [...new Set(listings.map(listing => listing.university))].sort();
    
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
    });
    
    universities.forEach(university => {
        const option = document.createElement('option');
        option.value = university;
        option.textContent = university;
        universityFilter.appendChild(option);
    });
}

// Render listings
function renderListings() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const listingsToShow = filteredListings.slice(startIndex, endIndex);
    
    renderGridView(listingsToShow);
    renderListView(listingsToShow);
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (endIndex >= filteredListings.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Render grid view
function renderGridView(listingsToShow) {
    const grid = document.getElementById('listingsGrid');
    
    if (currentView === 'grid') {
        grid.style.display = 'grid';
        grid.innerHTML = listingsToShow.map(listing => createListingCard(listing)).join('');
    } else {
        grid.style.display = 'none';
    }
}

// Render list view
function renderListView(listingsToShow) {
    const list = document.getElementById('listingsList');
    
    if (currentView === 'list') {
        list.style.display = 'block';
        list.innerHTML = listingsToShow.map(listing => createListingListItem(listing)).join('');
    } else {
        list.style.display = 'none';
    }
}

// Create listing card for grid view
function createListingCard(listing) {
    const categoryLabels = {
        'textbook': 'Textbook',
        'furniture': 'Furniture',
        'housing': 'Housing',
        'tutoring': 'Tutoring',
        'ride-share': 'Ride Share',
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'other': 'Other'
    };
    
    return `
        <div class="listing-card" data-listing-id="${listing.id}">
            <div class="listing-card-image">
                <i class="fas fa-image"></i>
            </div>
            <div class="listing-card-header">
                <div class="listing-card-meta">
                    <span class="category ${listing.category}">${categoryLabels[listing.category]}</span>
                    ${listing.isFree ? '<span class="price free">Free</span>' : `<span class="price">$${listing.price.toFixed(2)}</span>`}
                </div>
            </div>
            <h3 class="listing-card-title">${listing.title}</h3>
            <div class="listing-card-location">
                <i class="fas fa-map-marker-alt"></i>
                ${listing.university} • ${listing.city}, ${listing.state}
            </div>
            <p class="listing-card-description">${listing.description.substring(0, 120)}${listing.description.length > 120 ? '...' : ''}</p>
            <div class="listing-card-footer">
                <span class="listing-card-price">${listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}</span>
                <button class="view-details-btn" onclick="openListingModal(${JSON.stringify(listing).replace(/"/g, '&quot;')})">
                    View Details
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Create listing list item
function createListingListItem(listing) {
    const categoryLabels = {
        'textbook': 'Textbook',
        'furniture': 'Furniture',
        'housing': 'Housing',
        'tutoring': 'Tutoring',
        'ride-share': 'Ride Share',
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'other': 'Other'
    };
    
    return `
        <div class="listing-list-item" data-listing-id="${listing.id}">
            <div class="list-item-image">
                <i class="fas fa-image"></i>
            </div>
            <div class="list-item-main">
                <div class="list-item-header">
                    <h3>${listing.title}</h3>
                    <span class="category ${listing.category}">${categoryLabels[listing.category]}</span>
                    ${listing.isFree ? '<span class="price free">Free</span>' : `<span class="price">$${listing.price.toFixed(2)}</span>`}
                </div>
                <div class="list-item-meta">
                    <span><i class="fas fa-building"></i> ${listing.university}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${listing.city}, ${listing.state}</span>
                    <span><i class="fas fa-star"></i> ${listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}</span>
                </div>
                <p class="list-item-description">${listing.description.substring(0, 100)}${listing.description.length > 100 ? '...' : ''}</p>
            </div>
            <div class="list-item-actions">
                <button class="view-details-btn" onclick="openListingModal(${JSON.stringify(listing).replace(/"/g, '&quot;')})">
                    View Details
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Render featured listings
function renderFeaturedListings() {
    const featuredListings = document.getElementById('featuredListings');
    const featuredItems = listings.filter(listing => listing.featured).slice(0, 3);
    
    featuredListings.innerHTML = featuredItems.map(listing => createFeaturedListingCard(listing)).join('');
}

// Create featured listing card
function createFeaturedListingCard(listing) {
    const categoryLabels = {
        'textbook': 'Textbook',
        'furniture': 'Furniture',
        'housing': 'Housing',
        'tutoring': 'Tutoring',
        'ride-share': 'Ride Share',
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'other': 'Other'
    };
    
    return `
        <div class="featured-listing-card" data-listing-id="${listing.id}">
            <div class="featured-badge">
                <i class="fas fa-star"></i>
                Featured
            </div>
            <div class="listing-image">
                <i class="fas fa-image"></i>
            </div>
            <div class="listing-header">
                <h3>${listing.title}</h3>
                <div class="listing-meta">
                    <span class="category ${listing.category}">${categoryLabels[listing.category]}</span>
                    ${listing.isFree ? '<span class="price free">Free</span>' : `<span class="price">$${listing.price.toFixed(2)}</span>`}
                </div>
            </div>
            <div class="listing-location">
                <i class="fas fa-map-marker-alt"></i>
                ${listing.university} • ${listing.city}, ${listing.state}
            </div>
            <p class="listing-description">${listing.description.substring(0, 150)}${listing.description.length > 150 ? '...' : ''}</p>
            <div class="listing-footer">
                <span class="listing-condition">${listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}</span>
                <button class="view-details-btn" onclick="openListingModal(${JSON.stringify(listing).replace(/"/g, '&quot;')})">
                    View Details
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Render categories
function renderCategories() {
    const categoriesList = document.getElementById('categoriesList');
    const categories = {};
    
    listings.forEach(listing => {
        categories[listing.category] = (categories[listing.category] || 0) + 1;
    });
    
    const categoryLabels = {
        'textbook': 'Textbook',
        'furniture': 'Furniture',
        'housing': 'Housing',
        'tutoring': 'Tutoring',
        'ride-share': 'Ride Share',
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'other': 'Other'
    };
    
    categoriesList.innerHTML = Object.entries(categories).map(([category, count]) => `
        <div class="category-item" onclick="filterByCategory('${category}')">
            <span class="category-name">${categoryLabels[category]}</span>
            <span class="category-count">${count}</span>
        </div>
    `).join('');
}

// Filter by category
function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    handleFilters();
}

// Switch listing view
function switchListingView(view) {
    currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Re-render listings
    renderListings();
}

// Load more listings
function loadMoreListings() {
    currentPage++;
    renderListings();
}

// Open listing modal
function openListingModal(listing) {
    const modal = document.getElementById('listingModal');
    const modalBody = document.getElementById('modalListingBody');
    
    const categoryLabels = {
        'textbook': 'Textbook',
        'furniture': 'Furniture',
        'housing': 'Housing',
        'tutoring': 'Tutoring',
        'ride-share': 'Ride Share',
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'other': 'Other'
    };
    
    modalBody.innerHTML = `
        <div class="listing-detail-content">
            <div class="listing-detail-header">
                <div class="listing-detail-meta">
                    <span class="category ${listing.category}">${categoryLabels[listing.category]}</span>
                    ${listing.isFree ? '<span class="price free">Free</span>' : `<span class="price">$${listing.price.toFixed(2)}</span>`}
                    ${listing.negotiable ? '<span class="negotiable">Negotiable</span>' : ''}
                </div>
                <h2 class="listing-detail-title">${listing.title}</h2>
                <div class="listing-detail-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${listing.university} • ${listing.city}, ${listing.state}
                </div>
            </div>
            
            <div class="listing-detail-section">
                <h4>Description</h4>
                <p>${listing.description}</p>
            </div>
            
            <div class="listing-detail-section">
                <h4>Details</h4>
                <p><strong>Condition:</strong> ${listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}</p>
                <p><strong>Posted:</strong> ${formatDate(listing.datePosted)}</p>
            </div>
            
            <div class="listing-detail-footer">
                <div class="listing-detail-contact">
                    <p><i class="fas fa-user"></i> <strong>Contact:</strong> ${listing.contactName}</p>
                    <p><i class="fas fa-envelope"></i> <a href="mailto:${listing.contactEmail}">${listing.contactEmail}</a></p>
                    ${listing.contactPhone ? `<p><i class="fas fa-phone"></i> <a href="tel:${listing.contactPhone}">${listing.contactPhone}</a></p>` : ''}
                </div>
                <div class="listing-detail-actions">
                    <button class="btn btn-secondary" onclick="closeListingModal()">Close</button>
                    <a href="mailto:${listing.contactEmail}?subject=Re: ${listing.title}" class="btn btn-primary">Contact Seller</a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close listing modal
function closeListingModal() {
    document.getElementById('listingModal').style.display = 'none';
}

// Open listing form
function openListingForm() {
    document.getElementById('submitListingModal').style.display = 'block';
}

// Close listing form
function closeListingForm() {
    document.getElementById('submitListingModal').style.display = 'none';
    resetListingForm();
}

// Reset listing form
function resetListingForm() {
    document.getElementById('listingForm').reset();
    document.getElementById('modalListingForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('listingPrice').disabled = false;
}

// Handle image upload
function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    const preview = document.getElementById('imagePreview');
    
    if (files.length > 5) {
        alert('Maximum 5 images allowed');
        return;
    }
    
    preview.innerHTML = '';
    
    files.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove-image" onclick="removeImage(${index})">×</button>
                `;
                preview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Remove image
function removeImage(index) {
    const preview = document.getElementById('imagePreview');
    const items = preview.querySelectorAll('.image-preview-item');
    if (items[index]) {
        items[index].remove();
    }
}

// Handle listing submission
function handleListingSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const listingData = Object.fromEntries(formData);
    
    // In a real app, this would submit to an API
    console.log('Listing submission:', listingData);
    
    // Show success message
    alert('Thank you for posting your listing! It will be reviewed and published soon.');
    
    closeListingForm();
}

// Scroll to listings
function scrollToListings() {
    document.getElementById('marketplaceListings').scrollIntoView({
        behavior: 'smooth'
    });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
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