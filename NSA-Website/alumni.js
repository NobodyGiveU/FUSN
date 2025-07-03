// Alumni Spotlight JavaScript
class AlumniSpotlight {
    constructor() {
        this.alumniData = [];
        this.filteredData = [];
        this.featuredAlumni = [];
        this.currentCarouselIndex = 0;
        this.storiesPerPage = 12;
        this.currentPage = 1;
        
        this.init();
    }

    async init() {
        await this.loadAlumniData();
        this.setupEventListeners();
        this.updateStats();
        this.populateFilters();
        this.renderFeaturedCarousel();
        this.renderAlumniGrid();
        this.populateGraduationYears();
    }

    async loadAlumniData() {
        try {
            // In a real app, this would fetch from an API
            // For now, using sample data
            this.alumniData = this.getSampleAlumniData();
            this.filteredData = [...this.alumniData];
            this.featuredAlumni = this.alumniData.filter(alumni => alumni.featured);
            console.log('Alumni data loaded:', this.alumniData.length, 'entries');
        } catch (error) {
            console.error('Error loading alumni data:', error);
            this.showError('Failed to load alumni data. Please try again later.');
        }
    }

    getSampleAlumniData() {
        return [
            {
                id: 1,
                name: "Dr. Priya Sharma",
                university: "Stanford University",
                graduationYear: 2020,
                currentRole: "Senior Data Scientist at Google",
                linkedinUrl: "https://linkedin.com/in/priya-sharma",
                successStory: "From a small village in Nepal to leading AI initiatives at Google, Priya's journey exemplifies the power of education and determination. She overcame language barriers and cultural challenges to become a respected leader in the tech industry, mentoring dozens of Nepali students along the way.",
                profilePhoto: "https://via.placeholder.com/300x300/4CAF50/white?text=PS",
                email: "priya@example.com",
                featured: true,
                field: "Technology"
            },
            {
                id: 2,
                name: "Rajesh Thapa",
                university: "MIT",
                graduationYear: 2019,
                currentRole: "Founder & CEO, TechNepal Solutions",
                linkedinUrl: "https://linkedin.com/in/rajesh-thapa",
                successStory: "Rajesh founded TechNepal Solutions to bridge the digital divide in Nepal. His company has provided technology education to over 10,000 students and created 500+ jobs in rural areas. He believes in giving back to the community that shaped him.",
                profilePhoto: "https://via.placeholder.com/300x300/2196F3/white?text=RT",
                email: "rajesh@example.com",
                featured: true,
                field: "Entrepreneurship"
            },
            {
                id: 3,
                name: "Anita Gurung",
                university: "Harvard University",
                graduationYear: 2021,
                currentRole: "Medical Director, Boston Children's Hospital",
                linkedinUrl: "https://linkedin.com/in/anita-gurung",
                successStory: "Dr. Anita specializes in pediatric cardiology and has performed over 200 life-saving surgeries. She regularly visits Nepal to provide medical care and train local doctors, demonstrating her commitment to global health equity.",
                profilePhoto: "https://via.placeholder.com/300x300/FF9800/white?text=AG",
                email: "anita@example.com",
                featured: true,
                field: "Healthcare"
            },
            {
                id: 4,
                name: "Bikash Adhikari",
                university: "UC Berkeley",
                graduationYear: 2018,
                currentRole: "Environmental Engineer, Tesla",
                linkedinUrl: "https://linkedin.com/in/bikash-adhikari",
                successStory: "Bikash leads sustainable energy projects at Tesla, focusing on renewable energy solutions. His work has contributed to reducing carbon emissions equivalent to planting 1 million trees annually.",
                profilePhoto: "https://via.placeholder.com/300x300/9C27B0/white?text=BA",
                email: "bikash@example.com",
                featured: false,
                field: "Engineering"
            },
            {
                id: 5,
                name: "Sita Tamang",
                university: "Columbia University",
                graduationYear: 2022,
                currentRole: "Investment Banker, Goldman Sachs",
                linkedinUrl: "https://linkedin.com/in/sita-tamang",
                successStory: "Sita broke barriers as one of the few Nepali women in investment banking. She manages a $2 billion portfolio and actively mentors young professionals from underrepresented backgrounds.",
                profilePhoto: "https://via.placeholder.com/300x300/E91E63/white?text=ST",
                email: "sita@example.com",
                featured: false,
                field: "Finance"
            },
            {
                id: 6,
                name: "Krishna Poudel",
                university: "University of Michigan",
                graduationYear: 2020,
                currentRole: "Research Scientist, NASA",
                linkedinUrl: "https://linkedin.com/in/krishna-poudel",
                successStory: "Krishna's research on Mars exploration has been published in leading scientific journals. He's part of the team developing the next generation of space exploration technology.",
                profilePhoto: "https://via.placeholder.com/300x300/607D8B/white?text=KP",
                email: "krishna@example.com",
                featured: false,
                field: "Science"
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('alumniSearch');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.handleSearch());
        }

        // Filter functionality
        const universityFilter = document.getElementById('universityFilter');
        const yearFilter = document.getElementById('yearFilter');
        const fieldFilter = document.getElementById('fieldFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (universityFilter) {
            universityFilter.addEventListener('change', () => this.handleFilters());
        }
        if (yearFilter) {
            yearFilter.addEventListener('change', () => this.handleFilters());
        }
        if (fieldFilter) {
            fieldFilter.addEventListener('change', () => this.handleFilters());
        }
        if (sortFilter) {
            sortFilter.addEventListener('change', () => this.handleFilters());
        }

        // Form submission
        const alumniForm = document.getElementById('alumniForm');
        if (alumniForm) {
            alumniForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // File upload preview
        const profilePhotoInput = document.getElementById('profilePhoto');
        if (profilePhotoInput) {
            profilePhotoInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        // Auto-advance carousel
        setInterval(() => {
            this.moveCarousel(1);
        }, 5000);
    }

    handleSearch() {
        const searchTerm = document.getElementById('alumniSearch').value.toLowerCase();
        
        this.filteredData = this.alumniData.filter(alumni => {
            return !searchTerm || 
                alumni.name.toLowerCase().includes(searchTerm) ||
                alumni.university.toLowerCase().includes(searchTerm) ||
                alumni.currentRole.toLowerCase().includes(searchTerm) ||
                alumni.successStory.toLowerCase().includes(searchTerm);
        });

        this.currentPage = 1;
        this.renderAlumniGrid();
        this.updateResultsCount();
    }

    handleFilters() {
        const universityFilter = document.getElementById('universityFilter').value;
        const yearFilter = document.getElementById('yearFilter').value;
        const fieldFilter = document.getElementById('fieldFilter').value;
        const sortFilter = document.getElementById('sortFilter').value;

        this.filteredData = this.alumniData.filter(alumni => {
            const matchesUniversity = !universityFilter || alumni.university === universityFilter;
            const matchesYear = !yearFilter || alumni.graduationYear.toString() === yearFilter;
            const matchesField = !fieldFilter || alumni.field === fieldFilter;

            return matchesUniversity && matchesYear && matchesField;
        });

        this.sortData(sortFilter);
        this.currentPage = 1;
        this.renderAlumniGrid();
        this.updateResultsCount();
    }

    sortData(sortBy) {
        switch (sortBy) {
            case 'recent':
                this.filteredData.sort((a, b) => b.graduationYear - a.graduationYear);
                break;
            case 'name':
                this.filteredData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'university':
                this.filteredData.sort((a, b) => a.university.localeCompare(b.university));
                break;
            case 'year':
                this.filteredData.sort((a, b) => a.graduationYear - b.graduationYear);
                break;
        }
    }

    populateFilters() {
        const universityFilter = document.getElementById('universityFilter');
        const yearFilter = document.getElementById('yearFilter');
        const fieldFilter = document.getElementById('fieldFilter');

        // Get unique values
        const universities = [...new Set(this.alumniData.map(alumni => alumni.university))].sort();
        const years = [...new Set(this.alumniData.map(alumni => alumni.graduationYear))].sort((a, b) => b - a);
        const fields = [...new Set(this.alumniData.map(alumni => alumni.field))].sort();

        // Populate university filter
        if (universityFilter) {
            universities.forEach(university => {
                const option = document.createElement('option');
                option.value = university;
                option.textContent = university;
                universityFilter.appendChild(option);
            });
        }

        // Populate year filter
        if (yearFilter) {
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year.toString();
                option.textContent = year;
                yearFilter.appendChild(option);
            });
        }

        // Populate field filter
        if (fieldFilter) {
            fields.forEach(field => {
                const option = document.createElement('option');
                option.value = field;
                option.textContent = field;
                fieldFilter.appendChild(option);
            });
        }
    }

    populateGraduationYears() {
        const yearSelect = document.getElementById('graduationYear');
        if (!yearSelect) return;

        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= currentYear - 20; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }

    renderFeaturedCarousel() {
        const carousel = document.getElementById('featuredCarousel');
        const dots = document.getElementById('carouselDots');
        
        if (!carousel || !dots) return;

        carousel.innerHTML = this.featuredAlumni.map((alumni, index) => `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="featured-alumni-card">
                    <div class="alumni-photo">
                        <img src="${alumni.profilePhoto}" alt="${alumni.name}">
                    </div>
                    <div class="alumni-info">
                        <h3>${alumni.name}</h3>
                        <p class="university">${alumni.university} • ${alumni.graduationYear}</p>
                        <p class="role">${alumni.currentRole}</p>
                        <p class="quote">"${this.getQuoteFromStory(alumni.successStory)}"</p>
                        <button class="btn btn-primary" onclick="openStoryModal(${alumni.id})">
                            Read Full Story
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Create dots
        dots.innerHTML = this.featuredAlumni.map((_, index) => `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></button>
        `).join('');
    }

    getQuoteFromStory(story) {
        // Extract first sentence or first 100 characters
        const firstSentence = story.split('.')[0];
        return firstSentence.length > 100 ? firstSentence.substring(0, 100) + '...' : firstSentence;
    }

    renderAlumniGrid() {
        const grid = document.getElementById('alumniGrid');
        if (!grid) return;

        const startIndex = (this.currentPage - 1) * this.storiesPerPage;
        const endIndex = startIndex + this.storiesPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            grid.innerHTML = '';
        }

        grid.innerHTML += pageData.map(alumni => this.createAlumniCard(alumni)).join('');

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= this.filteredData.length ? 'none' : 'block';
        }
    }

    createAlumniCard(alumni) {
        const storyExcerpt = this.getStoryExcerpt(alumni.successStory);
        
        return `
            <div class="alumni-card" data-alumni-id="${alumni.id}">
                <div class="alumni-card-header">
                    <div class="alumni-photo">
                        <img src="${alumni.profilePhoto}" alt="${alumni.name}">
                    </div>
                    <div class="alumni-basic-info">
                        <h3>${alumni.name}</h3>
                        <p class="university">${alumni.university} • ${alumni.graduationYear}</p>
                        <p class="role">${alumni.currentRole}</p>
                    </div>
                </div>
                <div class="alumni-card-body">
                    <p class="story-excerpt">${storyExcerpt}</p>
                </div>
                <div class="alumni-card-footer">
                    <button class="btn btn-primary" onclick="openStoryModal(${alumni.id})">
                        Read Story
                    </button>
                    ${alumni.linkedinUrl ? `
                        <a href="${alumni.linkedinUrl}" target="_blank" class="btn btn-secondary">
                            <i class="fab fa-linkedin"></i>
                            LinkedIn
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getStoryExcerpt(story) {
        const maxLength = 150;
        if (story.length <= maxLength) return story;
        return story.substring(0, maxLength) + '...';
    }

    updateStats() {
        const totalAlumni = document.getElementById('totalAlumni');
        const totalUniversities = document.getElementById('totalUniversities');
        const totalCountries = document.getElementById('totalCountries');

        if (totalAlumni) {
            totalAlumni.textContent = this.alumniData.length;
        }
        if (totalUniversities) {
            const universities = new Set(this.alumniData.map(alumni => alumni.university));
            totalUniversities.textContent = universities.size;
        }
        if (totalCountries) {
            // For now, assuming all are from USA, but this could be expanded
            totalCountries.textContent = 1;
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('alumniResultsCount');
        if (resultsCount) {
            resultsCount.textContent = this.filteredData.length;
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const alumniData = {
            name: formData.get('fullName'),
            university: formData.get('university'),
            graduationYear: parseInt(formData.get('graduationYear')),
            currentRole: formData.get('currentRole'),
            linkedinUrl: formData.get('linkedinUrl'),
            successStory: formData.get('successStory'),
            email: formData.get('email'),
            field: this.detectField(formData.get('currentRole')),
            profilePhoto: formData.get('profilePhoto') ? 'https://via.placeholder.com/300x300/4CAF50/white?text=' + formData.get('fullName').charAt(0) : null
        };

        // In a real app, this would send data to a server
        console.log('Alumni submission:', alumniData);
        
        this.showSuccess('Thank you! Your story has been submitted for review. We\'ll contact you at ' + alumniData.email + ' to verify your submission.');
        this.closeAlumniForm();
        e.target.reset();
    }

    detectField(role) {
        const roleLower = role.toLowerCase();
        if (roleLower.includes('engineer') || roleLower.includes('developer') || roleLower.includes('scientist')) {
            return 'Technology';
        } else if (roleLower.includes('doctor') || roleLower.includes('nurse') || roleLower.includes('medical')) {
            return 'Healthcare';
        } else if (roleLower.includes('banker') || roleLower.includes('finance') || roleLower.includes('investment')) {
            return 'Finance';
        } else if (roleLower.includes('founder') || roleLower.includes('ceo') || roleLower.includes('entrepreneur')) {
            return 'Entrepreneurship';
        } else if (roleLower.includes('professor') || roleLower.includes('teacher') || roleLower.includes('educator')) {
            return 'Education';
        } else {
            return 'Other';
        }
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            // In a real app, you'd upload the file to a server
            console.log('File selected:', file.name);
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
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

// Global functions for HTML onclick handlers
function openAlumniForm() {
    const modal = document.getElementById('alumniModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAlumniForm() {
    const modal = document.getElementById('alumniModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openStoryModal(alumniId) {
    const modal = document.getElementById('storyModal');
    const title = document.getElementById('storyModalTitle');
    const content = document.getElementById('storyModalContent');
    
    if (!modal || !title || !content) return;

    const alumni = window.alumniSpotlight.alumniData.find(a => a.id === alumniId);
    if (!alumni) return;

    title.textContent = alumni.name;
    content.innerHTML = `
        <div class="story-modal-content">
            <div class="story-header">
                <div class="story-photo">
                    <img src="${alumni.profilePhoto}" alt="${alumni.name}">
                </div>
                <div class="story-info">
                    <h3>${alumni.name}</h3>
                    <p class="university">${alumni.university} • ${alumni.graduationYear}</p>
                    <p class="role">${alumni.currentRole}</p>
                    <p class="field">${alumni.field}</p>
                </div>
            </div>
            <div class="story-body">
                <h4>Success Story</h4>
                <p>${alumni.successStory}</p>
            </div>
            <div class="story-footer">
                ${alumni.linkedinUrl ? `
                    <a href="${alumni.linkedinUrl}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-linkedin"></i>
                        Connect on LinkedIn
                    </a>
                ` : ''}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeStoryModal() {
    const modal = document.getElementById('storyModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function moveCarousel(direction) {
    if (!window.alumniSpotlight) return;
    
    const { featuredAlumni, currentCarouselIndex } = window.alumniSpotlight;
    const totalSlides = featuredAlumni.length;
    
    let newIndex = currentCarouselIndex + direction;
    
    if (newIndex >= totalSlides) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalSlides - 1;
    }
    
    window.alumniSpotlight.currentCarouselIndex = newIndex;
    window.alumniSpotlight.updateCarousel();
}

function goToSlide(index) {
    if (!window.alumniSpotlight) return;
    
    window.alumniSpotlight.currentCarouselIndex = index;
    window.alumniSpotlight.updateCarousel();
}

function loadMoreStories() {
    if (!window.alumniSpotlight) return;
    
    window.alumniSpotlight.currentPage++;
    window.alumniSpotlight.renderAlumniGrid();
}

function scrollToStories() {
    const storiesSection = document.getElementById('alumniStories');
    if (storiesSection) {
        storiesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the alumni spotlight
document.addEventListener('DOMContentLoaded', () => {
    window.alumniSpotlight = new AlumniSpotlight();
});

// Add carousel update method to the class
AlumniSpotlight.prototype.updateCarousel = function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentCarouselIndex);
    });
    
    dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentCarouselIndex);
});
};

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