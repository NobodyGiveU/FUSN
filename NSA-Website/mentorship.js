// Mentorship Directory JavaScript
class MentorshipManager {
    constructor() {
        this.mentorsData = [];
        this.filteredData = [];
        this.featuredMentors = [];
        this.currentView = 'grid';
        this.mentorsPerPage = 12;
        this.currentPage = 1;
        
        this.init();
    }

    async init() {
        await this.loadMentorsData();
        this.setupEventListeners();
        this.updateStats();
        this.populateFilters();
        this.renderFeaturedMentors();
        this.renderMentors();
        this.populateGraduationYears();
    }

    async loadMentorsData() {
        try {
            // In a real app, this would fetch from an API
            // For now, using sample data
            this.mentorsData = this.getSampleMentorsData();
            this.filteredData = [...this.mentorsData];
            this.featuredMentors = this.mentorsData.filter(mentor => mentor.featured);
            console.log('Mentors data loaded:', this.mentorsData.length, 'entries');
        } catch (error) {
            console.error('Error loading mentors data:', error);
            this.showError('Failed to load mentors data. Please try again later.');
        }
    }

    getSampleMentorsData() {
        return [
            {
                id: 1,
                name: "Dr. Priya Sharma",
                university: "Stanford University",
                graduationYear: 2020,
                fieldOfStudy: "Computer Science",
                mentorshipAreas: ["academic", "career", "visa"],
                shortBio: "Senior Software Engineer at Google with 5+ years of experience. Passionate about helping Nepali students navigate the tech industry and academic challenges. Previously mentored 15+ students through their CS journey.",
                linkedinUrl: "https://linkedin.com/in/priya-sharma",
                email: "priya@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/FF6B35/white?text=PS",
                featured: true
            },
            {
                id: 2,
                name: "Rajesh Thapa",
                university: "MIT",
                graduationYear: 2019,
                fieldOfStudy: "Mechanical Engineering",
                mentorshipAreas: ["academic", "career", "housing"],
                shortBio: "Product Manager at Tesla with expertise in renewable energy. Experienced in helping students with housing arrangements and career transitions. Active in the Nepali community and loves sharing practical advice.",
                linkedinUrl: "https://linkedin.com/in/rajesh-thapa",
                email: "rajesh@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/4ECDC4/white?text=RT",
                featured: true
            },
            {
                id: 3,
                name: "Anita Gurung",
                university: "Harvard University",
                graduationYear: 2021,
                fieldOfStudy: "Public Health",
                mentorshipAreas: ["academic", "visa", "other"],
                shortBio: "Medical Director specializing in community health. Expert in visa processes and cultural adaptation. Dedicated to supporting Nepali students in healthcare fields and helping them succeed in their studies.",
                linkedinUrl: "https://linkedin.com/in/anita-gurung",
                email: "anita@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/45B7D1/white?text=AG",
                featured: true
            },
            {
                id: 4,
                name: "Bikash Adhikari",
                university: "UC Berkeley",
                graduationYear: 2018,
                fieldOfStudy: "Environmental Science",
                mentorshipAreas: ["academic", "career"],
                shortBio: "Environmental Consultant with focus on sustainability. Helps students understand research opportunities and career paths in environmental sciences. Strong network in the Bay Area tech and environmental sectors.",
                linkedinUrl: "https://linkedin.com/in/bikash-adhikari",
                email: "bikash@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/96CEB4/white?text=BA",
                featured: false
            },
            {
                id: 5,
                name: "Sita Tamang",
                university: "Columbia University",
                graduationYear: 2022,
                fieldOfStudy: "Finance",
                mentorshipAreas: ["career", "academic", "housing"],
                shortBio: "Investment Analyst at Goldman Sachs. Specializes in helping students with career preparation, interview skills, and finding housing in NYC. Passionate about financial literacy and career development.",
                linkedinUrl: "https://linkedin.com/in/sita-tamang",
                email: "sita@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/FFEAA7/white?text=ST",
                featured: false
            },
            {
                id: 6,
                name: "Krishna Poudel",
                university: "University of Michigan",
                graduationYear: 2020,
                fieldOfStudy: "Aerospace Engineering",
                mentorshipAreas: ["academic", "visa"],
                shortBio: "Research Engineer at NASA. Expert in visa processes and academic research opportunities. Helps students navigate the complex world of aerospace engineering and research careers.",
                linkedinUrl: "https://linkedin.com/in/krishna-poudel",
                email: "krishna@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/DDA0DD/white?text=KP",
                featured: false
            },
            {
                id: 7,
                name: "Laxmi Basnet",
                university: "University of Texas",
                graduationYear: 2023,
                fieldOfStudy: "Business Administration",
                mentorshipAreas: ["career", "housing", "other"],
                shortBio: "Recent MBA graduate working in consulting. Experienced in helping students with business school applications, career transitions, and finding affordable housing in Texas. Active in local Nepali community events.",
                linkedinUrl: "https://linkedin.com/in/laxmi-basnet",
                email: "laxmi@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/98D8C8/white?text=LB",
                featured: false
            },
            {
                id: 8,
                name: "Nabin Karki",
                university: "University of Washington",
                graduationYear: 2021,
                fieldOfStudy: "Data Science",
                mentorshipAreas: ["academic", "career", "visa"],
                shortBio: "Data Scientist at Microsoft. Specializes in helping students with technical interviews, academic projects, and visa processes. Strong background in machine learning and data analytics.",
                linkedinUrl: "https://linkedin.com/in/nabin-karki",
                email: "nabin@example.com",
                profilePhoto: "https://via.placeholder.com/300x300/F7DC6F/white?text=NK",
                featured: false
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('mentorSearch');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.handleSearch());
        }

        // Filter functionality
        const universityFilter = document.getElementById('universityFilter');
        const fieldFilter = document.getElementById('fieldFilter');
        const yearFilter = document.getElementById('yearFilter');
        const mentorshipFilter = document.getElementById('mentorshipFilter');

        if (universityFilter) {
            universityFilter.addEventListener('change', () => this.handleFilters());
        }
        if (fieldFilter) {
            fieldFilter.addEventListener('change', () => this.handleFilters());
        }
        if (yearFilter) {
            yearFilter.addEventListener('change', () => this.handleFilters());
        }
        if (mentorshipFilter) {
            mentorshipFilter.addEventListener('change', () => this.handleFilters());
        }

        // Form submission
        const mentorForm = document.getElementById('mentorForm');
        if (mentorForm) {
            mentorForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // File upload preview
        const profilePhotoInput = document.getElementById('profilePhoto');
        if (profilePhotoInput) {
            profilePhotoInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }
    }

    handleSearch() {
        const searchTerm = document.getElementById('mentorSearch').value.toLowerCase();
        
        this.filteredData = this.mentorsData.filter(mentor => {
            return !searchTerm || 
                mentor.name.toLowerCase().includes(searchTerm) ||
                mentor.university.toLowerCase().includes(searchTerm) ||
                mentor.fieldOfStudy.toLowerCase().includes(searchTerm) ||
                mentor.shortBio.toLowerCase().includes(searchTerm);
        });

        this.currentPage = 1;
        this.renderMentors();
        this.updateResultsCount();
    }

    handleFilters() {
        const universityFilter = document.getElementById('universityFilter').value;
        const fieldFilter = document.getElementById('fieldFilter').value;
        const yearFilter = document.getElementById('yearFilter').value;
        const mentorshipFilter = document.getElementById('mentorshipFilter').value;

        this.filteredData = this.mentorsData.filter(mentor => {
            const matchesUniversity = !universityFilter || mentor.university === universityFilter;
            const matchesField = !fieldFilter || mentor.fieldOfStudy === fieldFilter;
            const matchesYear = !yearFilter || mentor.graduationYear.toString() === yearFilter;
            const matchesMentorship = !mentorshipFilter || mentor.mentorshipAreas.includes(mentorshipFilter);

            return matchesUniversity && matchesField && matchesYear && matchesMentorship;
        });

        this.currentPage = 1;
        this.renderMentors();
        this.updateResultsCount();
    }

    populateFilters() {
        const universityFilter = document.getElementById('universityFilter');
        const fieldFilter = document.getElementById('fieldFilter');
        const yearFilter = document.getElementById('yearFilter');

        // Get unique values
        const universities = [...new Set(this.mentorsData.map(mentor => mentor.university))].sort();
        const fields = [...new Set(this.mentorsData.map(mentor => mentor.fieldOfStudy))].sort();
        const years = [...new Set(this.mentorsData.map(mentor => mentor.graduationYear))].sort((a, b) => b - a);

        // Populate university filter
        if (universityFilter) {
            universities.forEach(university => {
                const option = document.createElement('option');
                option.value = university;
                option.textContent = university;
                universityFilter.appendChild(option);
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

        // Populate year filter
        if (yearFilter) {
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year.toString();
                option.textContent = year;
                yearFilter.appendChild(option);
            });
        }
    }

    populateGraduationYears() {
        const yearSelect = document.getElementById('graduationYear');
        if (!yearSelect) return;

        const currentYear = new Date().getFullYear();
        for (let year = currentYear + 5; year >= currentYear - 10; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }

    renderFeaturedMentors() {
        const featuredContainer = document.getElementById('featuredMentors');
        if (!featuredContainer) return;

        featuredContainer.innerHTML = this.featuredMentors.map(mentor => `
            <div class="featured-mentor-card">
                <div class="featured-badge">
                    <i class="fas fa-star"></i>
                    Featured Mentor
                </div>
                <div class="mentor-header">
                    <div class="mentor-photo">
                        <img src="${mentor.profilePhoto}" alt="${mentor.name}">
                    </div>
                    <div class="mentor-info">
                        <h3>${mentor.name}</h3>
                        <p class="university">${mentor.university} • ${mentor.graduationYear}</p>
                        <p class="field">${mentor.fieldOfStudy}</p>
                    </div>
                </div>
                <div class="mentor-body">
                    <p class="bio-summary">${this.getBioSummary(mentor.shortBio)}</p>
                    <div class="mentorship-areas">
                        ${this.renderMentorshipAreas(mentor.mentorshipAreas)}
                    </div>
                </div>
                <div class="mentor-footer">
                    <button class="btn btn-primary" onclick="openMentorDetail(${mentor.id})">
                        View Profile
                    </button>
                    <a href="mailto:${mentor.email}" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i>
                        Contact
                    </a>
                </div>
            </div>
        `).join('');
    }

    renderMentors() {
        const startIndex = (this.currentPage - 1) * this.mentorsPerPage;
        const endIndex = startIndex + this.mentorsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            this.renderMentorsGrid(pageData);
            this.renderMentorsList(pageData);
        } else {
            this.appendMentorsGrid(pageData);
            this.appendMentorsList(pageData);
        }

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= this.filteredData.length ? 'none' : 'block';
        }
    }

    renderMentorsGrid(mentors) {
        const grid = document.getElementById('mentorsGrid');
        if (!grid) return;

        grid.innerHTML = mentors.map(mentor => this.createMentorCard(mentor)).join('');
    }

    renderMentorsList(mentors) {
        const list = document.getElementById('mentorsList');
        if (!list) return;

        list.innerHTML = mentors.map(mentor => this.createMentorListItem(mentor)).join('');
    }

    appendMentorsGrid(mentors) {
        const grid = document.getElementById('mentorsGrid');
        if (!grid) return;

        grid.innerHTML += mentors.map(mentor => this.createMentorCard(mentor)).join('');
    }

    appendMentorsList(mentors) {
        const list = document.getElementById('mentorsList');
        if (!list) return;

        list.innerHTML += mentors.map(mentor => this.createMentorListItem(mentor)).join('');
    }

    createMentorCard(mentor) {
        return `
            <div class="mentor-card">
                <div class="mentor-header">
                    <div class="mentor-photo">
                        <img src="${mentor.profilePhoto}" alt="${mentor.name}">
                    </div>
                    <div class="mentor-info">
                        <h3>${mentor.name}</h3>
                        <p class="university">${mentor.university} • ${mentor.graduationYear}</p>
                        <p class="field">${mentor.fieldOfStudy}</p>
                    </div>
                </div>
                <div class="mentor-body">
                    <p class="bio-summary">${this.getBioSummary(mentor.shortBio)}</p>
                    <div class="mentorship-areas">
                        ${this.renderMentorshipAreas(mentor.mentorshipAreas)}
                    </div>
                </div>
                <div class="mentor-footer">
                    <button class="btn btn-primary" onclick="openMentorDetail(${mentor.id})">
                        View Profile
                    </button>
                    <a href="mailto:${mentor.email}" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i>
                        Contact
                    </a>
                </div>
            </div>
        `;
    }

    createMentorListItem(mentor) {
        return `
            <div class="mentor-list-item">
                <div class="list-item-main">
                    <div class="list-item-header">
                        <div class="mentor-photo">
                            <img src="${mentor.profilePhoto}" alt="${mentor.name}">
                        </div>
                        <div class="mentor-info">
                            <h3>${mentor.name}</h3>
                            <p class="university">${mentor.university} • ${mentor.graduationYear}</p>
                            <p class="field">${mentor.fieldOfStudy}</p>
                        </div>
                    </div>
                    <div class="list-item-body">
                        <p class="bio-summary">${this.getBioSummary(mentor.shortBio)}</p>
                        <div class="mentorship-areas">
                            ${this.renderMentorshipAreas(mentor.mentorshipAreas)}
                        </div>
                    </div>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-primary" onclick="openMentorDetail(${mentor.id})">
                        View Profile
                    </button>
                    <a href="mailto:${mentor.email}" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i>
                        Contact
                    </a>
                </div>
            </div>
        `;
    }

    getBioSummary(bio) {
        const maxLength = 120;
        if (bio.length <= maxLength) return bio;
        return bio.substring(0, maxLength) + '...';
    }

    renderMentorshipAreas(areas) {
        const areaLabels = {
            academic: 'Academic Support',
            career: 'Career Guidance',
            housing: 'Housing Advice',
            visa: 'Visa & Immigration',
            other: 'Other'
        };

        return areas.map(area => `
            <span class="mentorship-tag">${areaLabels[area]}</span>
        `).join('');
    }

    updateStats() {
        const totalMentors = document.getElementById('totalMentors');
        const totalUniversities = document.getElementById('totalUniversities');
        const totalConnections = document.getElementById('totalConnections');

        if (totalMentors) {
            totalMentors.textContent = this.mentorsData.length;
        }
        if (totalUniversities) {
            const universities = new Set(this.mentorsData.map(mentor => mentor.university));
            totalUniversities.textContent = universities.size;
        }
        if (totalConnections) {
            // Simulated connection count
            totalConnections.textContent = Math.floor(this.mentorsData.length * 3.5);
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('mentorResultsCount');
        if (resultsCount) {
            resultsCount.textContent = this.filteredData.length;
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const mentorData = {
            name: formData.get('fullName'),
            university: formData.get('university'),
            graduationYear: parseInt(formData.get('graduationYear')),
            fieldOfStudy: formData.get('fieldOfStudy'),
            mentorshipAreas: formData.getAll('mentorshipAreas'),
            shortBio: formData.get('shortBio'),
            linkedinUrl: formData.get('linkedinUrl'),
            email: formData.get('email'),
            profilePhoto: formData.get('profilePhoto') ? 'https://via.placeholder.com/300x300/FF6B35/white?text=' + formData.get('fullName').charAt(0) : null
        };

        // Validate that at least one mentorship area is selected
        if (mentorData.mentorshipAreas.length === 0) {
            this.showError('Please select at least one area of mentorship.');
            return;
        }

        // In a real app, this would send data to a server
        console.log('Mentor registration:', mentorData);
        
        this.showSuccess('Thank you! Your mentor profile has been submitted for review. We\'ll contact you at ' + mentorData.email + ' to verify your registration.');
        this.closeMentorForm();
        e.target.reset();
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
function openMentorForm() {
    const modal = document.getElementById('mentorModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeMentorForm() {
    const modal = document.getElementById('mentorModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openMentorDetail(mentorId) {
    const modal = document.getElementById('mentorDetailModal');
    const title = document.getElementById('mentorDetailTitle');
    const content = document.getElementById('mentorDetailContent');
    
    if (!modal || !title || !content) return;

    const mentor = window.mentorshipManager.mentorsData.find(m => m.id === mentorId);
    if (!mentor) return;

    title.textContent = mentor.name;
    content.innerHTML = `
        <div class="mentor-detail-content">
            <div class="detail-header">
                <div class="mentor-photo">
                    <img src="${mentor.profilePhoto}" alt="${mentor.name}">
                </div>
                <div class="mentor-info">
                    <h3>${mentor.name}</h3>
                    <p class="university">${mentor.university} • ${mentor.graduationYear}</p>
                    <p class="field">${mentor.fieldOfStudy}</p>
                    <div class="mentorship-areas">
                        ${window.mentorshipManager.renderMentorshipAreas(mentor.mentorshipAreas)}
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>About</h4>
                <p>${mentor.shortBio}</p>
            </div>
            
            <div class="detail-actions">
                <a href="mailto:${mentor.email}" class="btn btn-primary">
                    <i class="fas fa-envelope"></i>
                    Request Mentorship
                </a>
                ${mentor.linkedinUrl ? `
                    <a href="${mentor.linkedinUrl}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-linkedin"></i>
                        View LinkedIn
                    </a>
                ` : ''}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeMentorDetail() {
    const modal = document.getElementById('mentorDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchView(view) {
    const gridView = document.getElementById('mentorsGrid');
    const listView = document.getElementById('mentorsList');
    const gridBtn = document.querySelector('[data-view="grid"]');
    const listBtn = document.querySelector('[data-view="list"]');
    
    if (view === 'grid') {
        gridView.style.display = 'grid';
        listView.style.display = 'none';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        gridView.style.display = 'none';
        listView.style.display = 'block';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    }
    
    window.mentorshipManager.currentView = view;
}

function loadMoreMentors() {
    if (!window.mentorshipManager) return;
    
    window.mentorshipManager.currentPage++;
    window.mentorshipManager.renderMentors();
}

function scrollToMentors() {
    const mentorsSection = document.querySelector('.main-content-section');
    if (mentorsSection) {
        mentorsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the mentorship manager
document.addEventListener('DOMContentLoaded', () => {
    window.mentorshipManager = new MentorshipManager();
});

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