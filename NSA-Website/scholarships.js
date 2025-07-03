// Scholarships & Funding Opportunities JavaScript
class ScholarshipsManager {
    constructor() {
        this.scholarshipsData = [];
        this.filteredData = [];
        this.featuredScholarships = [];
        this.currentView = 'grid';
        this.scholarshipsPerPage = 12;
        this.currentPage = 1;
        
        this.init();
    }

    async init() {
        await this.loadScholarshipsData();
        this.setupEventListeners();
        this.updateStats();
        this.populateFilters();
        this.renderFeaturedScholarships();
        this.renderScholarships();
    }

    async loadScholarshipsData() {
        try {
            // In a real app, this would fetch from an API
            // For now, using sample data
            this.scholarshipsData = this.getSampleScholarshipsData();
            this.filteredData = [...this.scholarshipsData];
            this.featuredScholarships = this.scholarshipsData.filter(scholarship => scholarship.featured);
            console.log('Scholarships data loaded:', this.scholarshipsData.length, 'entries');
        } catch (error) {
            console.error('Error loading scholarships data:', error);
            this.showError('Failed to load scholarships data. Please try again later.');
        }
    }

    getSampleScholarshipsData() {
        return [
            {
                id: 1,
                name: "Nepali Student Association Merit Scholarship",
                eligibleUniversities: "All universities in Texas",
                eligibilityCriteria: "Open to undergraduate students of Nepali descent studying at any university in Texas. Must have a minimum GPA of 3.5 and demonstrate financial need. Applicants must be actively involved in their local NSA chapter.",
                awardAmount: "$5,000",
                applicationDeadline: "2024-03-15",
                applicationLink: "https://example.com/nsa-texas-scholarship",
                contactEmail: "scholarship@nsatexas.org",
                additionalInfo: "This scholarship is renewable for up to 4 years based on academic performance and continued involvement in NSA activities.",
                featured: true,
                state: "Texas",
                university: "All Texas Universities",
                amountRange: "5000-10000"
            },
            {
                id: 2,
                name: "International Student Achievement Award",
                eligibleUniversities: "MIT, Stanford, Harvard, Yale",
                eligibilityCriteria: "Available to international students from Nepal pursuing STEM degrees. Must have exceptional academic record (GPA 3.8+) and demonstrate leadership in community service. Requires two letters of recommendation.",
                awardAmount: "$25,000",
                applicationDeadline: "2024-02-28",
                applicationLink: "https://example.com/international-award",
                contactEmail: "awards@international.edu",
                additionalInfo: "This is a one-time award that can be used for tuition, books, and living expenses.",
                featured: true,
                state: "Massachusetts",
                university: "MIT",
                amountRange: "25000+"
            },
            {
                id: 3,
                name: "Community Service Leadership Grant",
                eligibleUniversities: "University of California system",
                eligibilityCriteria: "For Nepali students who have demonstrated outstanding community service and leadership. Must have completed at least 100 hours of community service in the past year. Open to both undergraduate and graduate students.",
                awardAmount: "$8,000",
                applicationDeadline: "2024-04-10",
                applicationLink: "https://example.com/community-service-grant",
                contactEmail: "grants@ucsystem.edu",
                additionalInfo: "Recipients will be required to continue community service activities and submit quarterly reports.",
                featured: false,
                state: "California",
                university: "UC System",
                amountRange: "5000-10000"
            },
            {
                id: 4,
                name: "First-Generation Student Scholarship",
                eligibleUniversities: "All universities in New York",
                eligibilityCriteria: "Specifically for first-generation college students from Nepal. Must be the first in their family to attend college. Requires essay about educational journey and family background.",
                awardAmount: "$12,000",
                applicationDeadline: "2024-03-30",
                applicationLink: "https://example.com/first-gen-scholarship",
                contactEmail: "firstgen@nyeducation.org",
                additionalInfo: "This scholarship includes mentorship opportunities and networking events throughout the academic year.",
                featured: false,
                state: "New York",
                university: "All NY Universities",
                amountRange: "10000-25000"
            },
            {
                id: 5,
                name: "Graduate Research Fellowship",
                eligibleUniversities: "All accredited US universities",
                eligibilityCriteria: "For Nepali graduate students pursuing research in environmental science, renewable energy, or climate change. Must have a research proposal and faculty advisor recommendation.",
                awardAmount: "$35,000",
                applicationDeadline: "2024-01-15",
                applicationLink: "https://example.com/graduate-research",
                contactEmail: "research@environmental.org",
                additionalInfo: "Fellowship includes funding for research materials, conference attendance, and publication costs.",
                featured: true,
                state: "All States",
                university: "All Universities",
                amountRange: "25000+"
            },
            {
                id: 6,
                name: "Women in Technology Scholarship",
                eligibleUniversities: "Stanford, UC Berkeley, Carnegie Mellon",
                eligibilityCriteria: "Exclusively for female Nepali students pursuing degrees in computer science, engineering, or related technology fields. Must demonstrate passion for technology and innovation.",
                awardAmount: "$15,000",
                applicationDeadline: "2024-05-20",
                applicationLink: "https://example.com/women-tech-scholarship",
                contactEmail: "womenintech@scholarship.org",
                additionalInfo: "Includes internship opportunities with partner tech companies and networking events.",
                featured: false,
                state: "California",
                university: "Stanford",
                amountRange: "10000-25000"
            },
            {
                id: 7,
                name: "Cultural Preservation Award",
                eligibleUniversities: "All universities",
                eligibilityCriteria: "For students working to preserve and promote Nepali culture through arts, language, or community programs. Must submit a project proposal related to cultural preservation.",
                awardAmount: "$6,000",
                applicationDeadline: "2024-06-15",
                applicationLink: "https://example.com/cultural-award",
                contactEmail: "culture@nepaliheritage.org",
                additionalInfo: "Award recipients will be featured in cultural events and may receive additional funding for their projects.",
                featured: false,
                state: "All States",
                university: "All Universities",
                amountRange: "5000-10000"
            },
            {
                id: 8,
                name: "Emergency Financial Aid Grant",
                eligibleUniversities: "All universities",
                eligibilityCriteria: "For Nepali students facing unexpected financial hardships. Must provide documentation of emergency situation and demonstrate financial need. Available year-round.",
                awardAmount: "$3,000",
                applicationDeadline: "Rolling",
                applicationLink: "https://example.com/emergency-aid",
                contactEmail: "emergency@studentaid.org",
                additionalInfo: "This is a one-time emergency grant that does not need to be repaid. Applications are reviewed within 48 hours.",
                featured: false,
                state: "All States",
                university: "All Universities",
                amountRange: "0-5000"
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('scholarshipSearch');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.handleSearch());
        }

        // Filter functionality
        const stateFilter = document.getElementById('stateFilter');
        const universityFilter = document.getElementById('universityFilter');
        const amountFilter = document.getElementById('amountFilter');
        const deadlineFilter = document.getElementById('deadlineFilter');

        if (stateFilter) {
            stateFilter.addEventListener('change', () => this.handleFilters());
        }
        if (universityFilter) {
            universityFilter.addEventListener('change', () => this.handleFilters());
        }
        if (amountFilter) {
            amountFilter.addEventListener('change', () => this.handleFilters());
        }
        if (deadlineFilter) {
            deadlineFilter.addEventListener('change', () => this.handleFilters());
        }

        // Form submission
        const scholarshipForm = document.getElementById('scholarshipForm');
        if (scholarshipForm) {
            scholarshipForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }
    }

    handleSearch() {
        const searchTerm = document.getElementById('scholarshipSearch').value.toLowerCase();
        
        this.filteredData = this.scholarshipsData.filter(scholarship => {
            return !searchTerm || 
                scholarship.name.toLowerCase().includes(searchTerm) ||
                scholarship.eligibleUniversities.toLowerCase().includes(searchTerm) ||
                scholarship.eligibilityCriteria.toLowerCase().includes(searchTerm);
        });

        this.currentPage = 1;
        this.renderScholarships();
        this.updateResultsCount();
    }

    handleFilters() {
        const stateFilter = document.getElementById('stateFilter').value;
        const universityFilter = document.getElementById('universityFilter').value;
        const amountFilter = document.getElementById('amountFilter').value;
        const deadlineFilter = document.getElementById('deadlineFilter').value;

        this.filteredData = this.scholarshipsData.filter(scholarship => {
            const matchesState = !stateFilter || scholarship.state === stateFilter;
            const matchesUniversity = !universityFilter || scholarship.university === universityFilter;
            const matchesAmount = !amountFilter || scholarship.amountRange === amountFilter;
            const matchesDeadline = !deadlineFilter || this.getDeadlineMonth(scholarship.applicationDeadline) === parseInt(deadlineFilter);

            return matchesState && matchesUniversity && matchesAmount && matchesDeadline;
        });

        this.currentPage = 1;
        this.renderScholarships();
        this.updateResultsCount();
    }

    getDeadlineMonth(deadline) {
        if (deadline === 'Rolling') return null;
        return new Date(deadline).getMonth() + 1;
    }

    populateFilters() {
        const stateFilter = document.getElementById('stateFilter');
        const universityFilter = document.getElementById('universityFilter');

        // Get unique values
        const states = [...new Set(this.scholarshipsData.map(scholarship => scholarship.state))].sort();
        const universities = [...new Set(this.scholarshipsData.map(scholarship => scholarship.university))].sort();

        // Populate state filter
        if (stateFilter) {
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateFilter.appendChild(option);
            });
        }

        // Populate university filter
        if (universityFilter) {
            universities.forEach(university => {
                const option = document.createElement('option');
                option.value = university;
                option.textContent = university;
                universityFilter.appendChild(option);
            });
        }
    }

    renderFeaturedScholarships() {
        const featuredContainer = document.getElementById('featuredScholarships');
        if (!featuredContainer) return;

        featuredContainer.innerHTML = this.featuredScholarships.map(scholarship => `
            <div class="featured-scholarship-card">
                <div class="featured-badge">
                    <i class="fas fa-star"></i>
                    Featured
                </div>
                <div class="scholarship-header">
                    <h3>${scholarship.name}</h3>
                    <div class="scholarship-meta">
                        <span class="amount">${scholarship.awardAmount}</span>
                        <span class="deadline ${this.getDeadlineClass(scholarship.applicationDeadline)}">
                            ${this.formatDeadline(scholarship.applicationDeadline)}
                        </span>
                    </div>
                </div>
                <div class="scholarship-body">
                    <p class="eligibility-summary">${this.getEligibilitySummary(scholarship.eligibilityCriteria)}</p>
                    <p class="universities">${scholarship.eligibleUniversities}</p>
                </div>
                <div class="scholarship-footer">
                    <button class="btn btn-primary" onclick="openScholarshipDetail(${scholarship.id})">
                        View Details
                    </button>
                    ${scholarship.applicationLink ? `
                        <a href="${scholarship.applicationLink}" target="_blank" class="btn btn-secondary">
                            <i class="fas fa-external-link-alt"></i>
                            Apply Now
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    renderScholarships() {
        const startIndex = (this.currentPage - 1) * this.scholarshipsPerPage;
        const endIndex = startIndex + this.scholarshipsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            this.renderScholarshipsGrid(pageData);
            this.renderScholarshipsList(pageData);
        } else {
            this.appendScholarshipsGrid(pageData);
            this.appendScholarshipsList(pageData);
        }

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= this.filteredData.length ? 'none' : 'block';
        }
    }

    renderScholarshipsGrid(scholarships) {
        const grid = document.getElementById('scholarshipsGrid');
        if (!grid) return;

        grid.innerHTML = scholarships.map(scholarship => this.createScholarshipCard(scholarship)).join('');
    }

    renderScholarshipsList(scholarships) {
        const list = document.getElementById('scholarshipsList');
        if (!list) return;

        list.innerHTML = scholarships.map(scholarship => this.createScholarshipListItem(scholarship)).join('');
    }

    appendScholarshipsGrid(scholarships) {
        const grid = document.getElementById('scholarshipsGrid');
        if (!grid) return;

        grid.innerHTML += scholarships.map(scholarship => this.createScholarshipCard(scholarship)).join('');
    }

    appendScholarshipsList(scholarships) {
        const list = document.getElementById('scholarshipsList');
        if (!list) return;

        list.innerHTML += scholarships.map(scholarship => this.createScholarshipListItem(scholarship)).join('');
    }

    createScholarshipCard(scholarship) {
        return `
            <div class="scholarship-card">
                <div class="scholarship-header">
                    <h3>${scholarship.name}</h3>
                    <div class="scholarship-meta">
                        <span class="amount">${scholarship.awardAmount}</span>
                        <span class="deadline ${this.getDeadlineClass(scholarship.applicationDeadline)}">
                            ${this.formatDeadline(scholarship.applicationDeadline)}
                        </span>
                    </div>
                </div>
                <div class="scholarship-body">
                    <p class="eligibility-summary">${this.getEligibilitySummary(scholarship.eligibilityCriteria)}</p>
                    <p class="universities">${scholarship.eligibleUniversities}</p>
                </div>
                <div class="scholarship-footer">
                    <button class="btn btn-primary" onclick="openScholarshipDetail(${scholarship.id})">
                        View Details
                    </button>
                    ${scholarship.applicationLink ? `
                        <a href="${scholarship.applicationLink}" target="_blank" class="btn btn-secondary">
                            <i class="fas fa-external-link-alt"></i>
                            Apply Now
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    createScholarshipListItem(scholarship) {
        return `
            <div class="scholarship-list-item">
                <div class="list-item-main">
                    <div class="list-item-header">
                        <h3>${scholarship.name}</h3>
                        <div class="list-item-meta">
                            <span class="amount">${scholarship.awardAmount}</span>
                            <span class="deadline ${this.getDeadlineClass(scholarship.applicationDeadline)}">
                                ${this.formatDeadline(scholarship.applicationDeadline)}
                            </span>
                        </div>
                    </div>
                    <div class="list-item-body">
                        <p class="eligibility-summary">${this.getEligibilitySummary(scholarship.eligibilityCriteria)}</p>
                        <p class="universities">${scholarship.eligibleUniversities}</p>
                    </div>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-primary" onclick="openScholarshipDetail(${scholarship.id})">
                        View Details
                    </button>
                    ${scholarship.applicationLink ? `
                        <a href="${scholarship.applicationLink}" target="_blank" class="btn btn-secondary">
                            <i class="fas fa-external-link-alt"></i>
                            Apply Now
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getEligibilitySummary(criteria) {
        const maxLength = 120;
        if (criteria.length <= maxLength) return criteria;
        return criteria.substring(0, maxLength) + '...';
    }

    formatDeadline(deadline) {
        if (deadline === 'Rolling') return 'Rolling Deadline';
        const date = new Date(deadline);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    getDeadlineClass(deadline) {
        if (deadline === 'Rolling') return 'rolling';
        const deadlineDate = new Date(deadline);
        const now = new Date();
        const daysUntilDeadline = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline < 0) return 'expired';
        if (daysUntilDeadline <= 30) return 'urgent';
        if (daysUntilDeadline <= 90) return 'soon';
        return 'normal';
    }

    updateStats() {
        const totalScholarships = document.getElementById('totalScholarships');
        const totalFunding = document.getElementById('totalFunding');
        const upcomingDeadlines = document.getElementById('upcomingDeadlines');

        if (totalScholarships) {
            totalScholarships.textContent = this.scholarshipsData.length;
        }
        if (totalFunding) {
            const total = this.scholarshipsData.reduce((sum, scholarship) => {
                const amount = parseInt(scholarship.awardAmount.replace(/[^0-9]/g, ''));
                return sum + (isNaN(amount) ? 0 : amount);
            }, 0);
            totalFunding.textContent = `$${total.toLocaleString()}`;
        }
        if (upcomingDeadlines) {
            const now = new Date();
            const upcoming = this.scholarshipsData.filter(scholarship => {
                if (scholarship.applicationDeadline === 'Rolling') return false;
                const deadline = new Date(scholarship.applicationDeadline);
                return deadline > now;
            }).length;
            upcomingDeadlines.textContent = upcoming;
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('scholarshipResultsCount');
        if (resultsCount) {
            resultsCount.textContent = this.filteredData.length;
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const scholarshipData = {
            name: formData.get('scholarshipName'),
            eligibleUniversities: formData.get('eligibleUniversities'),
            eligibilityCriteria: formData.get('eligibilityCriteria'),
            awardAmount: formData.get('awardAmount'),
            applicationDeadline: formData.get('applicationDeadline'),
            applicationLink: formData.get('applicationLink'),
            contactEmail: formData.get('contactEmail'),
            additionalInfo: formData.get('additionalInfo')
        };

        // In a real app, this would send data to a server
        console.log('Scholarship submission:', scholarshipData);
        
        this.showSuccess('Thank you! Your scholarship opportunity has been submitted for review. We\'ll verify the information and add it to our database soon.');
        this.closeScholarshipForm();
        e.target.reset();
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
function openScholarshipForm() {
    const modal = document.getElementById('scholarshipModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeScholarshipForm() {
    const modal = document.getElementById('scholarshipModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openScholarshipDetail(scholarshipId) {
    const modal = document.getElementById('scholarshipDetailModal');
    const title = document.getElementById('scholarshipDetailTitle');
    const content = document.getElementById('scholarshipDetailContent');
    
    if (!modal || !title || !content) return;

    const scholarship = window.scholarshipsManager.scholarshipsData.find(s => s.id === scholarshipId);
    if (!scholarship) return;

    title.textContent = scholarship.name;
    content.innerHTML = `
        <div class="scholarship-detail-content">
            <div class="detail-header">
                <div class="detail-meta">
                    <div class="meta-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span><strong>Award Amount:</strong> ${scholarship.awardAmount}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span><strong>Deadline:</strong> ${window.scholarshipsManager.formatDeadline(scholarship.applicationDeadline)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-university"></i>
                        <span><strong>Eligible Universities:</strong> ${scholarship.eligibleUniversities}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Eligibility Criteria</h4>
                <p>${scholarship.eligibilityCriteria}</p>
            </div>
            
            ${scholarship.additionalInfo ? `
                <div class="detail-section">
                    <h4>Additional Information</h4>
                    <p>${scholarship.additionalInfo}</p>
                </div>
            ` : ''}
            
            <div class="detail-actions">
                ${scholarship.applicationLink ? `
                    <a href="${scholarship.applicationLink}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        Apply Now
                    </a>
                ` : ''}
                ${scholarship.contactEmail ? `
                    <a href="mailto:${scholarship.contactEmail}" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i>
                        Contact for More Info
                    </a>
                ` : ''}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeScholarshipDetail() {
    const modal = document.getElementById('scholarshipDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchView(view) {
    const gridView = document.getElementById('scholarshipsGrid');
    const listView = document.getElementById('scholarshipsList');
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
    
    window.scholarshipsManager.currentView = view;
}

function loadMoreScholarships() {
    if (!window.scholarshipsManager) return;
    
    window.scholarshipsManager.currentPage++;
    window.scholarshipsManager.renderScholarships();
}

function scrollToScholarships() {
    const scholarshipsSection = document.querySelector('.main-content-section');
    if (scholarshipsSection) {
        scholarshipsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the scholarships manager
document.addEventListener('DOMContentLoaded', () => {
    window.scholarshipsManager = new ScholarshipsManager();
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