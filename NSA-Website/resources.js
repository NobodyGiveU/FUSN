// Resource Center JavaScript

// Sample resource data
const resourceData = {
    categories: [
        {
            id: 'visa',
            title: 'Visa & Immigration',
            description: 'Essential information about student visas, maintaining status, and immigration procedures.',
            icon: 'fas fa-passport',
            resources: [
                {
                    title: 'F-1 Student Visa Guide',
                    summary: 'Complete guide to obtaining and maintaining F-1 student visa status.',
                    description: 'Comprehensive guide covering everything from initial application to maintaining status, including SEVIS requirements, travel restrictions, and employment options.',
                    links: [
                        { type: 'pdf', label: 'Download Guide', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'USCIS Website', url: 'https://www.uscis.gov', icon: 'fas fa-external-link-alt' },
                        { type: 'url', label: 'SEVIS Portal', url: 'https://www.ice.gov/sevis', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'OPT Application Process',
                    summary: 'Step-by-step guide for Optional Practical Training application.',
                    description: 'Detailed walkthrough of the OPT application process, including timing, required documents, and common mistakes to avoid.',
                    links: [
                        { type: 'pdf', label: 'OPT Checklist', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'USCIS OPT Info', url: 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students', icon: 'fas fa-external-link-alt' }
                    ]
                }
            ]
        },
        {
            id: 'housing',
            title: 'Housing & Accommodation',
            description: 'Finding affordable housing, understanding leases, and navigating accommodation options.',
            icon: 'fas fa-home',
            resources: [
                {
                    title: 'Student Housing Guide',
                    summary: 'Complete guide to finding and securing student housing.',
                    description: 'Comprehensive resource covering on-campus vs off-campus housing, lease agreements, roommate finding, and budgeting for housing costs.',
                    links: [
                        { type: 'pdf', label: 'Housing Checklist', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Campus Housing', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'Lease Agreement Guide',
                    summary: 'Understanding rental agreements and tenant rights.',
                    description: 'Essential information about lease terms, security deposits, tenant rights, and what to look for before signing a lease.',
                    links: [
                        { type: 'pdf', label: 'Lease Review Guide', url: '#', icon: 'fas fa-file-pdf' }
                    ]
                }
            ]
        },
        {
            id: 'health',
            title: 'Health & Insurance',
            description: 'Health insurance options, medical services, and wellness resources for international students.',
            icon: 'fas fa-heartbeat',
            resources: [
                {
                    title: 'Health Insurance Guide',
                    summary: 'Understanding health insurance requirements and options.',
                    description: 'Comprehensive guide to health insurance for international students, including university plans, private insurance, and understanding coverage.',
                    links: [
                        { type: 'pdf', label: 'Insurance Comparison', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Campus Health Services', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'Mental Health Resources',
                    summary: 'Mental health support and counseling services.',
                    description: 'Information about mental health resources available to students, including counseling services, support groups, and crisis hotlines.',
                    links: [
                        { type: 'url', label: 'Campus Counseling', url: '#', icon: 'fas fa-external-link-alt' },
                        { type: 'url', label: 'Crisis Hotline', url: 'https://988lifeline.org', icon: 'fas fa-phone' }
                    ]
                }
            ]
        },
        {
            id: 'academic',
            title: 'Academic Success',
            description: 'Study strategies, academic resources, and success tips for international students.',
            icon: 'fas fa-graduation-cap',
            resources: [
                {
                    title: 'Study Skills Guide',
                    summary: 'Effective study strategies for international students.',
                    description: 'Comprehensive guide to developing effective study habits, time management, and academic success strategies tailored for international students.',
                    links: [
                        { type: 'pdf', label: 'Study Guide', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Academic Support Center', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'Writing Center Resources',
                    summary: 'Academic writing support and resources.',
                    description: 'Resources for improving academic writing skills, including style guides, citation formats, and writing center services.',
                    links: [
                        { type: 'url', label: 'Writing Center', url: '#', icon: 'fas fa-external-link-alt' },
                        { type: 'pdf', label: 'Citation Guide', url: '#', icon: 'fas fa-file-pdf' }
                    ]
                }
            ]
        },
        {
            id: 'financial',
            title: 'Financial Resources',
            description: 'Budgeting, banking, scholarships, and financial planning for international students.',
            icon: 'fas fa-dollar-sign',
            resources: [
                {
                    title: 'Student Budgeting Guide',
                    summary: 'Creating and maintaining a student budget.',
                    description: 'Practical guide to budgeting as an international student, including cost of living estimates, saving strategies, and financial planning.',
                    links: [
                        { type: 'pdf', label: 'Budget Template', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Student Banking Guide', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'Scholarship Opportunities',
                    summary: 'Finding and applying for scholarships.',
                    description: 'Comprehensive list of scholarship opportunities available to international students, including application tips and deadlines.',
                    links: [
                        { type: 'pdf', label: 'Scholarship List', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'FAFSA Information', url: 'https://studentaid.gov', icon: 'fas fa-external-link-alt' }
                    ]
                }
            ]
        },
        {
            id: 'mental-health',
            title: 'Mental Health Support',
            description: 'Mental health resources, counseling services, and wellness programs.',
            icon: 'fas fa-brain',
            resources: [
                {
                    title: 'Stress Management Guide',
                    summary: 'Managing academic and personal stress.',
                    description: 'Practical strategies for managing stress, anxiety, and maintaining mental wellness while studying abroad.',
                    links: [
                        { type: 'pdf', label: 'Stress Management Tips', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Wellness Center', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'Cultural Adjustment Support',
                    summary: 'Navigating cultural differences and homesickness.',
                    description: 'Resources for dealing with cultural adjustment, homesickness, and building a support network in a new country.',
                    links: [
                        { type: 'pdf', label: 'Cultural Adjustment Guide', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'International Student Office', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                }
            ]
        },
        {
            id: 'career',
            title: 'Career Development',
            description: 'Career planning, job search strategies, and professional development resources.',
            icon: 'fas fa-briefcase',
            resources: [
                {
                    title: 'Career Planning Guide',
                    summary: 'Planning your career path as an international student.',
                    description: 'Comprehensive guide to career planning, including resume building, interview preparation, and networking strategies.',
                    links: [
                        { type: 'pdf', label: 'Career Guide', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Career Services', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'Networking Strategies',
                    summary: 'Building professional networks and connections.',
                    description: 'Effective strategies for networking as an international student, including professional associations, alumni networks, and social media.',
                    links: [
                        { type: 'pdf', label: 'Networking Guide', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'LinkedIn Tips', url: 'https://linkedin.com', icon: 'fas fa-external-link-alt' }
                    ]
                }
            ]
        },
        {
            id: 'community',
            title: 'Community & Culture',
            description: 'Connecting with Nepalese community, cultural events, and social activities.',
            icon: 'fas fa-users',
            resources: [
                {
                    title: 'Nepalese Community Directory',
                    summary: 'Finding Nepalese communities and cultural organizations.',
                    description: 'Directory of Nepalese student associations, cultural organizations, and community groups across the United States.',
                    links: [
                        { type: 'pdf', label: 'Community Directory', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Cultural Events', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                },
                {
                    title: 'Cultural Celebration Guide',
                    summary: 'Celebrating Nepalese festivals and traditions.',
                    description: 'Guide to celebrating Nepalese festivals, finding traditional foods, and maintaining cultural connections while studying abroad.',
                    links: [
                        { type: 'pdf', label: 'Festival Guide', url: '#', icon: 'fas fa-file-pdf' },
                        { type: 'url', label: 'Traditional Recipes', url: '#', icon: 'fas fa-external-link-alt' }
                    ]
                }
            ]
        }
    ],
    featured: [
        {
            title: 'Complete International Student Handbook',
            summary: 'Comprehensive guide covering all aspects of studying in the USA.',
            category: 'general',
            links: [
                { type: 'pdf', label: 'Download Handbook', url: '#', icon: 'fas fa-file-pdf' }
            ]
        },
        {
            title: 'Emergency Contact Information',
            summary: 'Important emergency contacts for international students.',
            category: 'general',
            links: [
                { type: 'url', label: 'Emergency Contacts', url: '#', icon: 'fas fa-phone' }
            ]
        },
        {
            title: 'Tax Filing Guide for International Students',
            summary: 'Understanding tax obligations and filing requirements.',
            category: 'financial',
            links: [
                { type: 'pdf', label: 'Tax Guide', url: '#', icon: 'fas fa-file-pdf' },
                { type: 'url', label: 'IRS Website', url: 'https://www.irs.gov', icon: 'fas fa-external-link-alt' }
            ]
        }
    ],
    quickLinks: [
        { title: 'SEVIS Portal', url: 'https://www.ice.gov/sevis', icon: 'fas fa-passport' },
        { title: 'FAFSA', url: 'https://studentaid.gov', icon: 'fas fa-dollar-sign' },
        { title: 'USCIS', url: 'https://www.uscis.gov', icon: 'fas fa-building' },
        { title: 'Campus Health Services', url: '#', icon: 'fas fa-heartbeat' },
        { title: 'International Student Office', url: '#', icon: 'fas fa-users' },
        { title: 'Career Services', url: '#', icon: 'fas fa-briefcase' },
        { title: 'Academic Support Center', url: '#', icon: 'fas fa-graduation-cap' },
        { title: 'Crisis Hotline', url: 'https://988lifeline.org', icon: 'fas fa-phone' }
    ],
    faq: [
        {
            question: 'How do I maintain my visa status?',
            answer: 'To maintain your F-1 visa status, you must: enroll full-time each semester, maintain a valid passport, keep your I-20 updated, report address changes within 10 days, and avoid unauthorized employment. Always consult with your International Student Office for specific requirements.'
        },
        {
            question: 'Where can I find affordable housing?',
            answer: 'Start with your university\'s housing office for on-campus options. For off-campus housing, check university housing boards, local rental websites, and connect with other international students. Consider factors like proximity to campus, public transportation, and safety.'
        },
        {
            question: 'How do I get health insurance?',
            answer: 'Most universities require international students to have health insurance. You can usually purchase the university\'s health plan or provide proof of comparable coverage. Check with your International Student Office for specific requirements and options.'
        },
        {
            question: 'What should I do if I feel homesick?',
            answer: 'Homesickness is common. Connect with other international students, join cultural organizations, stay in touch with family through video calls, explore your new city, and don\'t hesitate to seek counseling services if needed. Remember, it\'s a normal part of the adjustment process.'
        },
        {
            question: 'How can I find part-time work on campus?',
            answer: 'F-1 students can work up to 20 hours per week on campus during the academic year. Check with your university\'s career services, student employment office, or individual departments for job openings. Remember that off-campus work requires special authorization.'
        },
        {
            question: 'What resources are available for academic support?',
            answer: 'Most universities offer writing centers, tutoring services, academic advising, and study skills workshops. Take advantage of these free resources early in your academic career. Don\'t hesitate to ask for help - it\'s a sign of strength, not weakness.'
        }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeResourceCenter();
});

function initializeResourceCenter() {
    loadCategories();
    loadFeaturedResources();
    loadQuickLinks();
    loadFAQ();
    initializeSearch();
    initializeModals();
}

function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = resourceData.categories.map(category => `
        <div class="category-card ${category.id}" onclick="showCategoryResources('${category.id}')">
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3 class="category-title">${category.title}</h3>
            <p class="category-description">${category.description}</p>
            <button class="explore-btn">Explore Resources</button>
        </div>
    `).join('');
}

function loadFeaturedResources() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;

    featuredGrid.innerHTML = resourceData.featured.map(resource => `
        <div class="featured-card">
            <h4 class="featured-title">${resource.title}</h4>
            <p class="featured-summary">${resource.summary}</p>
            <div class="featured-links">
                ${resource.links.map(link => `
                    <a href="${link.url}" class="featured-link" target="_blank">
                        <i class="${link.icon}"></i>
                        ${link.label}
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function loadQuickLinks() {
    const quickLinks = document.getElementById('quickLinks');
    if (!quickLinks) return;

    quickLinks.innerHTML = resourceData.quickLinks.map(link => `
        <a href="${link.url}" class="quick-link" target="_blank">
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
        </a>
    `).join('');
}

function loadFAQ() {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;

    faqContainer.innerHTML = resourceData.faq.map((item, index) => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(${index})">
                <span>${item.question}</span>
                <i class="fas fa-chevron-down faq-toggle"></i>
            </div>
            <div class="faq-answer" id="faq-answer-${index}">
                ${item.answer}
            </div>
        </div>
    `).join('');
}

function toggleFAQ(index) {
    const question = document.querySelector(`.faq-question:nth-child(${index + 1})`);
    const answer = document.getElementById(`faq-answer-${index}`);
    
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        question.classList.remove('active');
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('active'));
        document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
        
        // Open current FAQ
        answer.classList.add('active');
        question.classList.add('active');
    }
}

function showCategoryResources(categoryId) {
    const category = resourceData.categories.find(cat => cat.id === categoryId);
    if (!category) return;

    const modal = document.getElementById('resourceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = category.title;
    modalBody.innerHTML = `
        <div class="resource-detail">
            <p><strong>${category.description}</strong></p>
            <h4>Available Resources:</h4>
            ${category.resources.map(resource => `
                <div style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h5 style="color: #2d3748; margin-bottom: 0.5rem;">${resource.title}</h5>
                    <p style="color: #718096; margin-bottom: 1rem;">${resource.description}</p>
                    <div class="resource-links">
                        ${resource.links.map(link => `
                            <a href="${link.url}" class="resource-link" target="_blank">
                                <i class="${link.icon}"></i>
                                <span>${link.label}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    modal.style.display = 'block';
}

function initializeSearch() {
    const searchInput = document.getElementById('resourceSearch');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchResources(query);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.toLowerCase();
            searchResources(query);
        });
    }
}

function searchResources(query) {
    if (!query.trim()) {
        loadCategories();
        return;
    }

    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    const filteredCategories = resourceData.categories.filter(category => {
        return category.title.toLowerCase().includes(query) ||
               category.description.toLowerCase().includes(query) ||
               category.resources.some(resource => 
                   resource.title.toLowerCase().includes(query) ||
                   resource.summary.toLowerCase().includes(query)
               );
    });

    categoriesGrid.innerHTML = filteredCategories.map(category => `
        <div class="category-card ${category.id}" onclick="showCategoryResources('${category.id}')">
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3 class="category-title">${category.title}</h3>
            <p class="category-description">${category.description}</p>
            <button class="explore-btn">Explore Resources</button>
        </div>
    `).join('');
}

function initializeModals() {
    const resourceModal = document.getElementById('resourceModal');
    const suggestModal = document.getElementById('suggestModal');
    const closeModal = document.getElementById('closeModal');
    const closeSuggestModal = document.getElementById('closeSuggestModal');
    const suggestResourceBtn = document.getElementById('suggestResourceBtn');
    const cancelSuggest = document.getElementById('cancelSuggest');
    const suggestForm = document.getElementById('suggestForm');

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === resourceModal) {
            resourceModal.style.display = 'none';
        }
        if (event.target === suggestModal) {
            suggestModal.style.display = 'none';
        }
    });

    // Close buttons
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            resourceModal.style.display = 'none';
        });
    }

    if (closeSuggestModal) {
        closeSuggestModal.addEventListener('click', function() {
            suggestModal.style.display = 'none';
        });
    }

    if (cancelSuggest) {
        cancelSuggest.addEventListener('click', function() {
            suggestModal.style.display = 'none';
        });
    }

    // Open suggest modal
    if (suggestResourceBtn) {
        suggestResourceBtn.addEventListener('click', function() {
            suggestModal.style.display = 'block';
        });
    }

    // Handle form submission
    if (suggestForm) {
        suggestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your backend
            console.log('Resource suggestion submitted:', data);
            
            // Show success message
            alert('Thank you for your suggestion! We will review it and add it to our resource center.');
            
            // Close modal and reset form
            suggestModal.style.display = 'none';
            this.reset();
        });
    }
}

 