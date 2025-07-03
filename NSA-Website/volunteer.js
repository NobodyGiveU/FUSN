// Volunteer Opportunities Board JavaScript

// Global variables
let opportunities = [];
let filteredOpportunities = [];
let currentView = 'grid';
let itemsPerPage = 12;
let currentPage = 1;

// Sample volunteer opportunities data (in a real app, this would come from an API)
const sampleOpportunities = [
    {
        id: 1,
        title: "Event Coordinator for Cultural Night 2024",
        organization: "NSA at UC Berkeley",
        university: "University of California, Berkeley",
        city: "Berkeley",
        state: "CA",
        category: "event-support",
        description: "Help coordinate our annual Cultural Night event, including planning, logistics, and day-of coordination. This is a great opportunity to develop leadership and event management skills while celebrating Nepali culture.",
        requirements: "Strong organizational skills, ability to work with diverse teams, experience with event planning preferred but not required. Must be available for weekly planning meetings.",
        timeCommitment: "5-8 hours/week",
        startDate: "2024-02-01",
        endDate: "2024-04-15",
        contactPerson: "Priya Sharma",
        contactEmail: "priya.sharma@berkeley.edu",
        applicationLink: "https://forms.google.com/example",
        urgency: "normal",
        featured: true,
        image: null
    },
    {
        id: 2,
        title: "Math Tutor for High School Students",
        organization: "NSA at MIT",
        university: "Massachusetts Institute of Technology",
        city: "Cambridge",
        state: "MA",
        category: "tutoring",
        description: "Provide math tutoring to local high school students, particularly focusing on calculus and advanced mathematics. Help inspire the next generation of STEM leaders.",
        requirements: "Strong background in mathematics, patience with students, ability to explain complex concepts simply. Experience with tutoring preferred.",
        timeCommitment: "3-5 hours/week",
        startDate: "2024-01-15",
        endDate: "2024-05-30",
        contactPerson: "Rajesh Thapa",
        contactEmail: "rajesh.thapa@mit.edu",
        applicationLink: "",
        urgency: "urgent",
        featured: true,
        image: null
    },
    {
        id: 3,
        title: "Community Service Coordinator",
        organization: "NSA at UT Austin",
        university: "University of Texas at Austin",
        city: "Austin",
        state: "TX",
        category: "community-service",
        description: "Lead community service initiatives and coordinate volunteer activities for the local Nepali community. Organize food drives, cultural events, and community outreach programs.",
        requirements: "Passion for community service, leadership experience, strong communication skills. Must be able to work with diverse community members.",
        timeCommitment: "4-6 hours/week",
        startDate: "2024-02-01",
        endDate: "2024-12-31",
        contactPerson: "Sita Patel",
        contactEmail: "sita.patel@utexas.edu",
        applicationLink: "https://volunteer.utexas.edu/nsa",
        urgency: "normal",
        featured: false,
        image: null
    },
    {
        id: 4,
        title: "Mentor for Incoming Freshmen",
        organization: "NSA at NYU",
        university: "New York University",
        city: "New York",
        state: "NY",
        category: "mentoring",
        description: "Serve as a mentor for incoming Nepali freshmen, helping them navigate college life, academic challenges, and cultural adjustment. Share your experiences and provide guidance.",
        requirements: "Must be sophomore or above, good communication skills, empathy and patience. Previous mentoring experience helpful but not required.",
        timeCommitment: "2-3 hours/week",
        startDate: "2024-08-01",
        endDate: "2024-12-15",
        contactPerson: "Maya Gurung",
        contactEmail: "maya.gurung@nyu.edu",
        applicationLink: "",
        urgency: "normal",
        featured: false,
        image: null
    },
    {
        id: 5,
        title: "Website Developer for NSA Chapter",
        organization: "NSA at University of Washington",
        university: "University of Washington",
        city: "Seattle",
        state: "WA",
        category: "other",
        description: "Help develop and maintain the NSA chapter website. Work on improving user experience, adding new features, and ensuring the site is up-to-date with current information.",
        requirements: "Basic knowledge of HTML, CSS, and JavaScript. Experience with web development frameworks preferred. Must be detail-oriented and able to work independently.",
        timeCommitment: "3-4 hours/week",
        startDate: "2024-01-20",
        endDate: "2024-06-30",
        contactPerson: "Aarav Singh",
        contactEmail: "aarav.singh@uw.edu",
        applicationLink: "https://github.com/nsa-uw/website",
        urgency: "urgent",
        featured: true,
        image: null
    },
    {
        id: 6,
        title: "Leadership Team Member",
        organization: "NSA at University of Michigan",
        university: "University of Michigan",
        city: "Ann Arbor",
        state: "MI",
        category: "leadership",
        description: "Join the NSA leadership team and help shape the future of our chapter. Take on responsibilities in event planning, member engagement, and organizational development.",
        requirements: "Strong leadership potential, commitment to the organization, ability to work in a team. Previous involvement with NSA preferred.",
        timeCommitment: "5-7 hours/week",
        startDate: "2024-03-01",
        endDate: "2024-12-31",
        contactPerson: "Kiran Tamang",
        contactEmail: "kiran.tamang@umich.edu",
        applicationLink: "",
        urgency: "normal",
        featured: false,
        image: null
    },
    {
        id: 7,
        title: "Social Media Manager",
        organization: "NSA at Georgia Tech",
        university: "Georgia Institute of Technology",
        city: "Atlanta",
        state: "GA",
        category: "other",
        description: "Manage social media accounts for the NSA chapter, create engaging content, and help increase our online presence. Perfect opportunity for students interested in digital marketing.",
        requirements: "Experience with social media platforms, creative mindset, good writing skills. Knowledge of graphic design tools helpful but not required.",
        timeCommitment: "2-3 hours/week",
        startDate: "2024-02-01",
        endDate: "2024-08-31",
        contactPerson: "Ramesh Bhandari",
        contactEmail: "ramesh.bhandari@gatech.edu",
        applicationLink: "",
        urgency: "normal",
        featured: false,
        image: null
    },
    {
        id: 8,
        title: "Emergency Food Bank Volunteer",
        organization: "NSA at UCLA",
        university: "University of California, Los Angeles",
        city: "Los Angeles",
        state: "CA",
        category: "community-service",
        description: "Urgent need for volunteers at local food bank serving the Nepali community. Help sort donations, pack food boxes, and assist with distribution to families in need.",
        requirements: "Physical ability to lift boxes, reliable transportation, compassion for those in need. No prior experience required.",
        timeCommitment: "4-6 hours/week",
        startDate: "2024-01-25",
        endDate: "2024-03-31",
        contactPerson: "Anjali Gurung",
        contactEmail: "anjali.gurung@ucla.edu",
        applicationLink: "https://foodbank.ucla.edu/volunteer",
        urgency: "very-urgent",
        featured: true,
        image: null
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadOpportunities();
    setupEventListeners();
    updateStats();
    populateFilters();
});

// Load opportunities data
function loadOpportunities() {
    // In a real app, this would be an API call
    opportunities = [...sampleOpportunities];
    filteredOpportunities = [...opportunities];
    
    renderOpportunities();
    renderFeaturedOpportunities();
    renderCategories();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('opportunitySearch');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const stateFilter = document.getElementById('stateFilter');
    const universityFilter = document.getElementById('universityFilter');
    const timeFilter = document.getElementById('timeFilter');
    
    categoryFilter.addEventListener('change', handleFilters);
    stateFilter.addEventListener('change', handleFilters);
    universityFilter.addEventListener('change', handleFilters);
    timeFilter.addEventListener('change', handleFilters);
    
    // Form submission
    const volunteerForm = document.getElementById('volunteerForm');
    const modalVolunteerForm = document.getElementById('modalVolunteerForm');
    
    volunteerForm.addEventListener('submit', handleOpportunitySubmission);
    modalVolunteerForm.addEventListener('submit', handleOpportunitySubmission);
    
    // Modal close events
    const opportunityModal = document.getElementById('opportunityModal');
    const submitOpportunityModal = document.getElementById('submitOpportunityModal');
    
    document.getElementById('closeOpportunityModal').addEventListener('click', () => {
        opportunityModal.style.display = 'none';
    });
    
    document.getElementById('closeSubmitOpportunityModal').addEventListener('click', () => {
        submitOpportunityModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === opportunityModal) {
            opportunityModal.style.display = 'none';
        }
        if (e.target === submitOpportunityModal) {
            submitOpportunityModal.style.display = 'none';
        }
    });
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('opportunitySearch').value.toLowerCase();
    
    filteredOpportunities = opportunities.filter(opportunity => 
        opportunity.title.toLowerCase().includes(searchTerm) ||
        opportunity.description.toLowerCase().includes(searchTerm) ||
        opportunity.organization.toLowerCase().includes(searchTerm) ||
        opportunity.university.toLowerCase().includes(searchTerm) ||
        opportunity.requirements.toLowerCase().includes(searchTerm)
    );
    
    applyFilters();
}

// Handle filters
function handleFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const stateFilter = document.getElementById('stateFilter').value;
    const universityFilter = document.getElementById('universityFilter').value;
    const timeFilter = document.getElementById('timeFilter').value;
    
    filteredOpportunities = opportunities.filter(opportunity => {
        const categoryMatch = !categoryFilter || opportunity.category === categoryFilter;
        const stateMatch = !stateFilter || opportunity.state === stateFilter;
        const universityMatch = !universityFilter || opportunity.university === universityFilter;
        
        let timeMatch = true;
        if (timeFilter) {
            const timeCommitment = opportunity.timeCommitment.toLowerCase();
            switch (timeFilter) {
                case '1-5':
                    timeMatch = timeCommitment.includes('1') || timeCommitment.includes('2') || 
                               timeCommitment.includes('3') || timeCommitment.includes('4') || 
                               timeCommitment.includes('5');
                    break;
                case '5-10':
                    timeMatch = timeCommitment.includes('5') || timeCommitment.includes('6') || 
                               timeCommitment.includes('7') || timeCommitment.includes('8') || 
                               timeCommitment.includes('9') || timeCommitment.includes('10');
                    break;
                case '10+':
                    timeMatch = timeCommitment.includes('10') || timeCommitment.includes('11') || 
                               timeCommitment.includes('12') || timeCommitment.includes('15') || 
                               timeCommitment.includes('20');
                    break;
                case 'flexible':
                    timeMatch = timeCommitment.includes('flexible') || timeCommitment.includes('varies');
                    break;
            }
        }
        
        return categoryMatch && stateMatch && universityMatch && timeMatch;
    });
    
    applyFilters();
}

// Apply filters and update UI
function applyFilters() {
    currentPage = 1;
    renderOpportunities();
    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const filteredResults = document.getElementById('filteredResults');
    filteredResults.textContent = filteredOpportunities.length;
}

// Update statistics
function updateStats() {
    const totalOpportunities = opportunities.length;
    const universities = [...new Set(opportunities.map(opp => opp.university))];
    const urgentOpportunities = opportunities.filter(opp => opp.urgency === 'urgent' || opp.urgency === 'very-urgent').length;
    
    document.getElementById('totalOpportunities').textContent = totalOpportunities;
    document.getElementById('activeChapters').textContent = universities.length;
    document.getElementById('totalVolunteers').textContent = Math.floor(totalOpportunities * 0.8); // Estimated volunteers
    
    // Update sidebar stats
    document.getElementById('sidebarOpportunities').textContent = totalOpportunities;
    document.getElementById('sidebarChapters').textContent = universities.length;
    document.getElementById('sidebarUrgent').textContent = urgentOpportunities;
}

// Populate filters
function populateFilters() {
    const stateFilter = document.getElementById('stateFilter');
    const universityFilter = document.getElementById('universityFilter');
    
    const states = [...new Set(opportunities.map(opp => opp.state))].sort();
    const universities = [...new Set(opportunities.map(opp => opp.university))].sort();
    
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

// Render opportunities
function renderOpportunities() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const opportunitiesToShow = filteredOpportunities.slice(startIndex, endIndex);
    
    renderGridView(opportunitiesToShow);
    renderListView(opportunitiesToShow);
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (endIndex >= filteredOpportunities.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Render grid view
function renderGridView(opportunitiesToShow) {
    const grid = document.getElementById('opportunitiesGrid');
    
    if (currentView === 'grid') {
        grid.style.display = 'grid';
        grid.innerHTML = opportunitiesToShow.map(opportunity => createOpportunityCard(opportunity)).join('');
    } else {
        grid.style.display = 'none';
    }
}

// Render list view
function renderListView(opportunitiesToShow) {
    const list = document.getElementById('opportunitiesList');
    
    if (currentView === 'list') {
        list.style.display = 'block';
        list.innerHTML = opportunitiesToShow.map(opportunity => createOpportunityListItem(opportunity)).join('');
    } else {
        list.style.display = 'none';
    }
}

// Create opportunity card for grid view
function createOpportunityCard(opportunity) {
    const categoryLabels = {
        'event-support': 'Event Support',
        'tutoring': 'Tutoring',
        'community-service': 'Community Service',
        'leadership': 'Leadership',
        'mentoring': 'Mentoring',
        'other': 'Other'
    };
    
    return `
        <div class="opportunity-card" data-opportunity-id="${opportunity.id}">
            <div class="opportunity-card-header">
                <div class="opportunity-card-meta">
                    <span class="category ${opportunity.category}">${categoryLabels[opportunity.category]}</span>
                    ${opportunity.urgency !== 'normal' ? `<span class="urgency ${opportunity.urgency}">${opportunity.urgency === 'urgent' ? 'Urgent' : 'Very Urgent'}</span>` : ''}
                </div>
            </div>
            <h3 class="opportunity-card-title">${opportunity.title}</h3>
            <div class="opportunity-card-location">
                <i class="fas fa-map-marker-alt"></i>
                ${opportunity.organization} • ${opportunity.city}, ${opportunity.state}
            </div>
            <p class="opportunity-card-description">${opportunity.description.substring(0, 150)}${opportunity.description.length > 150 ? '...' : ''}</p>
            <div class="opportunity-card-footer">
                <span class="opportunity-card-time">${opportunity.timeCommitment}</span>
                <button class="view-details-btn" onclick="openOpportunityModal(${JSON.stringify(opportunity).replace(/"/g, '&quot;')})">
                    View Details
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Create opportunity list item
function createOpportunityListItem(opportunity) {
    const categoryLabels = {
        'event-support': 'Event Support',
        'tutoring': 'Tutoring',
        'community-service': 'Community Service',
        'leadership': 'Leadership',
        'mentoring': 'Mentoring',
        'other': 'Other'
    };
    
    return `
        <div class="opportunity-list-item" data-opportunity-id="${opportunity.id}">
            <div class="list-item-logo">
                <i class="fas fa-heart"></i>
            </div>
            <div class="list-item-main">
                <div class="list-item-header">
                    <h3>${opportunity.title}</h3>
                    <span class="category ${opportunity.category}">${categoryLabels[opportunity.category]}</span>
                    ${opportunity.urgency !== 'normal' ? `<span class="urgency ${opportunity.urgency}">${opportunity.urgency === 'urgent' ? 'Urgent' : 'Very Urgent'}</span>` : ''}
                </div>
                <div class="list-item-meta">
                    <span><i class="fas fa-building"></i> ${opportunity.organization}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${opportunity.city}, ${opportunity.state}</span>
                    <span><i class="fas fa-clock"></i> ${opportunity.timeCommitment}</span>
                </div>
                <p class="list-item-description">${opportunity.description.substring(0, 120)}${opportunity.description.length > 120 ? '...' : ''}</p>
            </div>
            <div class="list-item-actions">
                <button class="view-details-btn" onclick="openOpportunityModal(${JSON.stringify(opportunity).replace(/"/g, '&quot;')})">
                    View Details
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Render featured opportunities
function renderFeaturedOpportunities() {
    const featuredOpportunities = document.getElementById('featuredOpportunities');
    const featuredOpps = opportunities.filter(opp => opp.featured).slice(0, 3);
    
    featuredOpportunities.innerHTML = featuredOpps.map(opportunity => createFeaturedOpportunityCard(opportunity)).join('');
}

// Create featured opportunity card
function createFeaturedOpportunityCard(opportunity) {
    const categoryLabels = {
        'event-support': 'Event Support',
        'tutoring': 'Tutoring',
        'community-service': 'Community Service',
        'leadership': 'Leadership',
        'mentoring': 'Mentoring',
        'other': 'Other'
    };
    
    return `
        <div class="featured-opportunity-card" data-opportunity-id="${opportunity.id}">
            <div class="featured-badge">
                <i class="fas fa-star"></i>
                Featured
            </div>
            <div class="opportunity-header">
                <h3>${opportunity.title}</h3>
                <div class="opportunity-meta">
                    <span class="category ${opportunity.category}">${categoryLabels[opportunity.category]}</span>
                    ${opportunity.urgency !== 'normal' ? `<span class="urgency ${opportunity.urgency}">${opportunity.urgency === 'urgent' ? 'Urgent' : 'Very Urgent'}</span>` : ''}
                </div>
            </div>
            <div class="opportunity-location">
                <i class="fas fa-map-marker-alt"></i>
                ${opportunity.organization} • ${opportunity.city}, ${opportunity.state}
            </div>
            <p class="opportunity-description">${opportunity.description.substring(0, 200)}${opportunity.description.length > 200 ? '...' : ''}</p>
            <div class="opportunity-footer">
                <span class="time-commitment">${opportunity.timeCommitment}</span>
                <button class="view-details-btn" onclick="openOpportunityModal(${JSON.stringify(opportunity).replace(/"/g, '&quot;')})">
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
    
    opportunities.forEach(opportunity => {
        categories[opportunity.category] = (categories[opportunity.category] || 0) + 1;
    });
    
    const categoryLabels = {
        'event-support': 'Event Support',
        'tutoring': 'Tutoring',
        'community-service': 'Community Service',
        'leadership': 'Leadership',
        'mentoring': 'Mentoring',
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

// Switch opportunity view
function switchOpportunityView(view) {
    currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Re-render opportunities
    renderOpportunities();
}

// Load more opportunities
function loadMoreOpportunities() {
    currentPage++;
    renderOpportunities();
}

// Open opportunity modal
function openOpportunityModal(opportunity) {
    const modal = document.getElementById('opportunityModal');
    const modalBody = document.getElementById('modalOpportunityBody');
    
    const categoryLabels = {
        'event-support': 'Event Support',
        'tutoring': 'Tutoring',
        'community-service': 'Community Service',
        'leadership': 'Leadership',
        'mentoring': 'Mentoring',
        'other': 'Other'
    };
    
    modalBody.innerHTML = `
        <div class="opportunity-detail-content">
            <div class="opportunity-detail-header">
                <div class="opportunity-detail-meta">
                    <span class="category ${opportunity.category}">${categoryLabels[opportunity.category]}</span>
                    ${opportunity.urgency !== 'normal' ? `<span class="urgency ${opportunity.urgency}">${opportunity.urgency === 'urgent' ? 'Urgent' : 'Very Urgent'}</span>` : ''}
                </div>
                <h2 class="opportunity-detail-title">${opportunity.title}</h2>
                <div class="opportunity-detail-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${opportunity.organization} • ${opportunity.university} • ${opportunity.city}, ${opportunity.state}
                </div>
            </div>
            
            <div class="opportunity-detail-section">
                <h4>Description</h4>
                <p>${opportunity.description}</p>
            </div>
            
            ${opportunity.requirements ? `
            <div class="opportunity-detail-section">
                <h4>Requirements</h4>
                <p>${opportunity.requirements}</p>
            </div>
            ` : ''}
            
            <div class="opportunity-detail-section">
                <h4>Time Commitment</h4>
                <p>${opportunity.timeCommitment}</p>
            </div>
            
            ${opportunity.startDate ? `
            <div class="opportunity-detail-section">
                <h4>Duration</h4>
                <p>${formatDate(opportunity.startDate)} - ${opportunity.endDate ? formatDate(opportunity.endDate) : 'Ongoing'}</p>
            </div>
            ` : ''}
            
            <div class="opportunity-detail-footer">
                <div class="opportunity-detail-contact">
                    <p><i class="fas fa-user"></i> <strong>Contact:</strong> ${opportunity.contactPerson}</p>
                    <p><i class="fas fa-envelope"></i> <a href="mailto:${opportunity.contactEmail}">${opportunity.contactEmail}</a></p>
                </div>
                <div class="opportunity-detail-actions">
                    <button class="btn btn-secondary" onclick="closeOpportunityModal()">Close</button>
                    ${opportunity.applicationLink ? `<a href="${opportunity.applicationLink}" target="_blank" class="btn btn-primary">Apply Now</a>` : `<a href="mailto:${opportunity.contactEmail}" class="btn btn-primary">Contact to Apply</a>`}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close opportunity modal
function closeOpportunityModal() {
    document.getElementById('opportunityModal').style.display = 'none';
}

// Open volunteer form
function openVolunteerForm() {
    document.getElementById('submitOpportunityModal').style.display = 'block';
}

// Close volunteer form
function closeVolunteerForm() {
    document.getElementById('submitOpportunityModal').style.display = 'none';
    resetVolunteerForm();
}

// Reset volunteer form
function resetVolunteerForm() {
    document.getElementById('volunteerForm').reset();
    document.getElementById('modalVolunteerForm').reset();
}

// Handle opportunity submission
function handleOpportunitySubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const opportunityData = Object.fromEntries(formData);
    
    // In a real app, this would submit to an API
    console.log('Opportunity submission:', opportunityData);
    
    // Show success message
    alert('Thank you for posting the volunteer opportunity! We will review and publish it soon.');
    
    closeVolunteerForm();
}

// Scroll to opportunities
function scrollToOpportunities() {
    document.getElementById('opportunitiesBoard').scrollIntoView({
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