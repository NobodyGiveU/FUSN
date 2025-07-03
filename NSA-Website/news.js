// News & Announcements JavaScript

// Global variables
let newsArticles = [];
let filteredArticles = [];
let currentView = 'list';
let itemsPerPage = 10;
let currentPage = 1;

// Sample news data (in a real app, this would come from an API)
const sampleNews = [
    {
        id: 1,
        title: "NSA at UC Berkeley Hosts Successful Cultural Night 2024",
        summary: "The Nepalese Student Association at UC Berkeley organized an incredible cultural night featuring traditional dances, music, and authentic Nepali cuisine.",
        content: "The Nepalese Student Association at UC Berkeley successfully hosted their annual Cultural Night 2024, bringing together over 200 students, faculty, and community members for an evening of celebration and cultural exchange.\n\nThe event featured traditional Nepali dances including the famous 'Deusi Bhailo' and 'Maruni' performances, live music from local Nepali artists, and a wide variety of authentic Nepali dishes prepared by student volunteers.\n\n'This event not only showcases our rich cultural heritage but also helps build bridges between different communities on campus,' said Priya Sharma, President of NSA at UC Berkeley. 'We're proud to share our traditions and create awareness about Nepal and its diverse culture.'\n\nThe cultural night also included a fashion show featuring traditional Nepali attire, a photo exhibition highlighting Nepal's natural beauty, and interactive sessions where attendees could learn basic Nepali phrases and customs.\n\nProceeds from the event will go towards supporting Nepali students through scholarships and cultural programs.",
        category: "event",
        chapter: "NSA at UC Berkeley",
        university: "University of California, Berkeley",
        publishDate: "2024-01-15",
        email: "nsa.berkeley@example.com",
        image: null,
        featured: true
    },
    {
        id: 2,
        title: "MIT NSA Chapter Wins National Innovation Competition",
        summary: "Students from MIT's Nepalese Student Association secured first place in the National Student Innovation Challenge with their sustainable energy project.",
        content: "The Nepalese Student Association at MIT has achieved a remarkable milestone by winning the National Student Innovation Challenge 2024. The team, consisting of five Nepali students, developed an innovative sustainable energy solution that addresses rural electrification challenges in developing regions.\n\nTheir project, 'Solar Microgrid for Rural Communities,' combines advanced solar technology with smart grid management systems to provide reliable, affordable electricity to remote areas. The solution is particularly relevant for Nepal's rural communities and has potential applications worldwide.\n\n'This victory represents not just our technical skills but also our commitment to solving real-world problems that affect our homeland and similar communities globally,' said Rajesh Thapa, team leader and NSA MIT President.\n\nThe winning team received a $50,000 grant to further develop their project and will have the opportunity to present their solution at international conferences. The NSA MIT chapter plans to use this success to inspire more Nepali students to pursue innovation and entrepreneurship.\n\n'We hope this achievement encourages more Nepali students to dream big and work towards solutions that can make a positive impact on society,' added Thapa.",
        category: "achievement",
        chapter: "NSA at MIT",
        university: "Massachusetts Institute of Technology",
        publishDate: "2024-01-12",
        email: "nsa.mit@example.com",
        image: null,
        featured: true
    },
    {
        id: 3,
        title: "New Scholarship Program for Nepali Students Announced",
        summary: "The Nepali American Foundation launches a comprehensive scholarship program supporting 50 Nepali students across US universities.",
        content: "The Nepali American Foundation (NAF) has announced a groundbreaking scholarship program that will provide financial support to 50 Nepali students studying at universities across the United States. The program, named 'Nepal Rising Scholars Initiative,' aims to reduce financial barriers and promote academic excellence among Nepali students.\n\nThe scholarship program will provide up to $10,000 per year for undergraduate students and $15,000 per year for graduate students. Recipients will be selected based on academic merit, financial need, and demonstrated commitment to community service.\n\n'Education is the foundation for building a stronger future for Nepal and its diaspora,' said Dr. Anjali Gurung, Executive Director of NAF. 'This scholarship program represents our commitment to supporting the next generation of Nepali leaders and professionals.'\n\nThe program also includes mentorship opportunities, networking events, and career development workshops. Scholarship recipients will be connected with successful Nepali professionals in their fields of study.\n\nApplications for the 2024-2025 academic year will open in March 2024. Interested students can find more information and application details on the NAF website.",
        category: "scholarship",
        chapter: "Nepali American Foundation",
        university: "Multiple Universities",
        publishDate: "2024-01-10",
        email: "scholarships@nepaliamerican.org",
        image: null,
        featured: false
    },
    {
        id: 4,
        title: "UT Austin NSA Hosts Career Development Workshop",
        summary: "Professional development event connects Nepali students with industry leaders and provides career guidance.",
        content: "The Nepalese Student Association at the University of Texas at Austin recently hosted a comprehensive career development workshop that brought together Nepali students with industry professionals and career advisors. The event, titled 'Navigating Your Career Path,' provided valuable insights and networking opportunities for students across various disciplines.\n\nThe workshop featured panel discussions with successful Nepali professionals working in technology, healthcare, finance, and academia. Speakers shared their career journeys, challenges they faced, and advice for current students.\n\n'Events like this are crucial for helping Nepali students understand the various career paths available to them and how to navigate the professional world,' said Sita Patel, NSA UT Austin Vice President. 'We want to ensure our members have the tools and connections they need to succeed.'\n\nThe workshop also included resume building sessions, interview preparation workshops, and one-on-one mentoring opportunities. Over 80 students attended the event, representing various academic levels and fields of study.\n\n'The connections I made at this workshop have already opened up new opportunities for me,' said freshman student Aarav Singh. 'It's inspiring to see successful Nepali professionals and know that I can achieve similar success.'\n\nThe NSA UT Austin chapter plans to make this an annual event and expand it to include more industry sectors and networking opportunities.",
        category: "event",
        chapter: "NSA at UT Austin",
        university: "University of Texas at Austin",
        publishDate: "2024-01-08",
        email: "nsa.utaustin@example.com",
        image: null,
        featured: false
    },
    {
        id: 5,
        title: "NYU NSA Launches Mental Health Support Initiative",
        summary: "New program provides mental health resources and support specifically tailored for Nepali students.",
        content: "The Nepalese Student Association at New York University has launched a comprehensive mental health support initiative designed specifically for Nepali students. The program, called 'Mindful Nepal,' addresses the unique challenges faced by international students from Nepal and provides culturally sensitive mental health resources.\n\nThe initiative includes regular support group meetings, individual counseling sessions with culturally competent therapists, and educational workshops on stress management, homesickness, and academic pressure. The program also offers meditation and mindfulness sessions that incorporate Nepali cultural practices.\n\n'Mental health is often stigmatized in our community, but it's crucial for academic and personal success,' said Maya Gurung, NSA NYU Mental Health Coordinator. 'We want to create a safe space where students can discuss their challenges and get the support they need.'\n\nThe program has partnered with NYU's counseling services and local Nepali mental health professionals to provide comprehensive support. All services are free and confidential for NSA members.\n\n'This initiative has already made a significant difference in our community,' said sophomore student Kiran Tamang. 'Knowing that there are people who understand our cultural background and the specific challenges we face as Nepali students is incredibly reassuring.'\n\nThe NSA NYU chapter hopes to serve as a model for other universities and plans to share their program structure and resources with other NSA chapters across the country.",
        category: "announcement",
        chapter: "NSA at NYU",
        university: "New York University",
        publishDate: "2024-01-05",
        email: "nsa.nyu@example.com",
        image: null,
        featured: true
    },
    {
        id: 6,
        title: "University of Washington NSA Wins Regional Debate Competition",
        summary: "UW NSA debate team secures victory in the Pacific Northwest Inter-University Debate Championship.",
        content: "The debate team from the Nepalese Student Association at the University of Washington has achieved a significant victory by winning the Pacific Northwest Inter-University Debate Championship. The competition, which included teams from universities across Washington, Oregon, and Idaho, focused on topics related to international relations, social justice, and environmental policy.\n\nThe UW NSA team, consisting of four students, demonstrated exceptional research skills, critical thinking, and public speaking abilities throughout the competition. Their final debate topic was 'The Role of International Students in Promoting Cultural Understanding on University Campuses.'\n\n'This victory showcases the intellectual capabilities and leadership potential of Nepali students,' said team captain Ramesh Bhandari. 'We're proud to represent not just our university but also our community and our country.'\n\nThe team's success has inspired other NSA chapters to form their own debate teams and participate in similar competitions. The UW NSA chapter plans to host a debate workshop to help other chapters develop their debating skills.\n\n'Debate is an excellent way to develop critical thinking, public speaking, and leadership skills,' said faculty advisor Dr. Sarah Johnson. 'The success of the NSA debate team demonstrates the valuable contributions that international students make to our academic community.'\n\nThe team will represent the Pacific Northwest region in the National Inter-University Debate Championship later this year.",
        category: "achievement",
        chapter: "NSA at University of Washington",
        university: "University of Washington",
        publishDate: "2024-01-03",
        email: "nsa.uw@example.com",
        image: null,
        featured: false
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    setupEventListeners();
    updateStats();
    populateFilters();
});

// Load news data
function loadNews() {
    // In a real app, this would be an API call
    newsArticles = [...sampleNews];
    filteredArticles = [...newsArticles];
    
    renderNews();
    renderFeaturedNews();
    renderCategories();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('newsSearch');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const universityFilter = document.getElementById('universityFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    categoryFilter.addEventListener('change', handleFilters);
    universityFilter.addEventListener('change', handleFilters);
    dateFilter.addEventListener('change', handleFilters);
    
    // Form submission
    const newsForm = document.getElementById('newsForm');
    const modalNewsForm = document.getElementById('modalNewsForm');
    
    newsForm.addEventListener('submit', handleNewsSubmission);
    modalNewsForm.addEventListener('submit', handleNewsSubmission);
    
    // Character count for summary
    const summaryInput = document.getElementById('newsSummary');
    summaryInput.addEventListener('input', updateCharCount);
    
    // Modal close events
    const newsModal = document.getElementById('newsModal');
    const submitNewsModal = document.getElementById('submitNewsModal');
    
    document.getElementById('closeNewsModal').addEventListener('click', () => {
        newsModal.style.display = 'none';
    });
    
    document.getElementById('closeSubmitNewsModal').addEventListener('click', () => {
        submitNewsModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === newsModal) {
            newsModal.style.display = 'none';
        }
        if (e.target === submitNewsModal) {
            submitNewsModal.style.display = 'none';
        }
    });
    
    // Subscribe form
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm.addEventListener('submit', handleSubscription);
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('newsSearch').value.toLowerCase();
    
    filteredArticles = newsArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.chapter.toLowerCase().includes(searchTerm) ||
        article.university.toLowerCase().includes(searchTerm)
    );
    
    applyFilters();
}

// Handle filters
function handleFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const universityFilter = document.getElementById('universityFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    filteredArticles = newsArticles.filter(article => {
        const categoryMatch = !categoryFilter || article.category === categoryFilter;
        const universityMatch = !universityFilter || article.university === universityFilter;
        
        let dateMatch = true;
        if (dateFilter) {
            const articleDate = new Date(article.publishDate);
            const today = new Date();
            
            switch (dateFilter) {
                case 'today':
                    dateMatch = articleDate.toDateString() === today.toDateString();
                    break;
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    dateMatch = articleDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    dateMatch = articleDate >= monthAgo;
                    break;
                case 'year':
                    const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
                    dateMatch = articleDate >= yearAgo;
                    break;
            }
        }
        
        return categoryMatch && universityMatch && dateMatch;
    });
    
    applyFilters();
}

// Apply filters and update UI
function applyFilters() {
    currentPage = 1;
    renderNews();
    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const filteredResults = document.getElementById('filteredResults');
    filteredResults.textContent = filteredArticles.length;
}

// Update statistics
function updateStats() {
    const totalArticles = newsArticles.length;
    const universities = [...new Set(newsArticles.map(article => article.university))];
    const thisMonth = newsArticles.filter(article => {
        const articleDate = new Date(article.publishDate);
        const today = new Date();
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return articleDate >= monthAgo;
    }).length;
    
    document.getElementById('totalArticles').textContent = totalArticles;
    document.getElementById('activeChapters').textContent = universities.length;
    document.getElementById('thisMonth').textContent = thisMonth;
}

// Populate filters
function populateFilters() {
    const universityFilter = document.getElementById('universityFilter');
    const universities = [...new Set(newsArticles.map(article => article.university))].sort();
    
    universities.forEach(university => {
        const option = document.createElement('option');
        option.value = university;
        option.textContent = university;
        universityFilter.appendChild(option);
    });
}

// Render news
function renderNews() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);
    
    renderListView(articlesToShow);
    renderGridView(articlesToShow);
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (endIndex >= filteredArticles.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Render list view
function renderListView(articlesToShow) {
    const list = document.getElementById('newsList');
    
    if (currentView === 'list') {
        list.style.display = 'block';
        list.innerHTML = articlesToShow.map(article => createNewsListItem(article)).join('');
    } else {
        list.style.display = 'none';
    }
}

// Render grid view
function renderGridView(articlesToShow) {
    const grid = document.getElementById('newsGrid');
    
    if (currentView === 'grid') {
        grid.style.display = 'grid';
        grid.innerHTML = articlesToShow.map(article => createNewsGridItem(article)).join('');
    } else {
        grid.style.display = 'none';
    }
}

// Create news list item
function createNewsListItem(article) {
    const categoryClass = article.category;
    const categoryLabels = {
        announcement: 'Announcement',
        event: 'Event',
        achievement: 'Achievement',
        scholarship: 'Scholarship',
        competition: 'Competition',
        other: 'Other'
    };
    
    return `
        <article class="news-item" data-article-id="${article.id}">
            <div class="news-item-header">
                <div class="news-meta">
                    <span class="news-category ${categoryClass}">${categoryLabels[article.category]}</span>
                    <span class="news-date">${formatDate(article.publishDate)}</span>
                    <span class="news-chapter">${article.chapter}</span>
                </div>
            </div>
            <h3 class="news-title">${article.title}</h3>
            <p class="news-summary">${article.summary}</p>
            <div class="news-item-footer">
                <span class="news-university">${article.university}</span>
                <button class="read-more-btn" onclick="openNewsModal(${JSON.stringify(article).replace(/"/g, '&quot;')})">
                    Read More
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </article>
    `;
}

// Create news grid item
function createNewsGridItem(article) {
    const categoryClass = article.category;
    const categoryLabels = {
        announcement: 'Announcement',
        event: 'Event',
        achievement: 'Achievement',
        scholarship: 'Scholarship',
        competition: 'Competition',
        other: 'Other'
    };
    
    return `
        <article class="news-grid-item" data-article-id="${article.id}">
            <div class="news-grid-image">
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="news-grid-content">
                <div class="news-grid-meta">
                    <span class="news-category ${categoryClass}">${categoryLabels[article.category]}</span>
                    <span class="news-date">${formatDate(article.publishDate)}</span>
                </div>
                <h3 class="news-grid-title">${article.title}</h3>
                <p class="news-grid-summary">${article.summary}</p>
                <button class="read-more-btn" onclick="openNewsModal(${JSON.stringify(article).replace(/"/g, '&quot;')})">
                    Read More
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </article>
    `;
}

// Render featured news
function renderFeaturedNews() {
    const featuredNews = document.getElementById('featuredNews');
    const featuredArticles = newsArticles.filter(article => article.featured).slice(0, 3);
    
    featuredNews.innerHTML = featuredArticles.map(article => `
        <div class="featured-news-item" onclick="openNewsModal(${JSON.stringify(article).replace(/"/g, '&quot;')})">
            <div class="featured-news-title">${article.title}</div>
            <div class="featured-news-meta">${formatDate(article.publishDate)} • ${article.chapter}</div>
        </div>
    `).join('');
}

// Render categories
function renderCategories() {
    const categoriesList = document.getElementById('categoriesList');
    const categories = {};
    
    newsArticles.forEach(article => {
        categories[article.category] = (categories[article.category] || 0) + 1;
    });
    
    const categoryLabels = {
        announcement: 'Announcements',
        event: 'Events',
        achievement: 'Achievements',
        scholarship: 'Scholarships',
        competition: 'Competitions',
        other: 'Other'
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

// Switch news view
function switchNewsView(view) {
    currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Re-render news
    renderNews();
}

// Load more news
function loadMoreNews() {
    currentPage++;
    renderNews();
}

// Open news modal
function openNewsModal(article) {
    const modal = document.getElementById('newsModal');
    const modalBody = document.getElementById('modalNewsBody');
    
    const categoryLabels = {
        announcement: 'Announcement',
        event: 'Event',
        achievement: 'Achievement',
        scholarship: 'Scholarship',
        competition: 'Competition',
        other: 'Other'
    };
    
    modalBody.innerHTML = `
        <div class="news-detail-content">
            <div class="news-detail-header">
                <div class="news-detail-meta">
                    <span class="news-category ${article.category}">${categoryLabels[article.category]}</span>
                    <span class="news-date">${formatDate(article.publishDate)}</span>
                    <span class="news-chapter">${article.chapter}</span>
                </div>
                <h2 class="news-detail-title">${article.title}</h2>
            </div>
            
            ${article.image ? `<img src="${article.image}" alt="${article.title}" class="news-detail-image">` : ''}
            
            <div class="news-detail-content">
                ${article.content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
            
            <div class="news-detail-footer">
                <div class="news-detail-contact">
                    ${article.email ? `<p><i class="fas fa-envelope"></i> <a href="mailto:${article.email}">${article.email}</a></p>` : ''}
                    <p><i class="fas fa-university"></i> ${article.university}</p>
                </div>
                <div class="news-detail-actions">
                    <button class="btn btn-secondary" onclick="closeNewsModal()">Close</button>
                    ${article.email ? `<a href="mailto:${article.email}" class="btn btn-primary">Contact Chapter</a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close news modal
function closeNewsModal() {
    document.getElementById('newsModal').style.display = 'none';
}

// Open news form
function openNewsForm() {
    document.getElementById('submitNewsModal').style.display = 'block';
}

// Close news form
function closeNewsForm() {
    document.getElementById('submitNewsModal').style.display = 'none';
    resetNewsForm();
}

// Reset news form
function resetNewsForm() {
    document.getElementById('newsForm').reset();
    document.getElementById('modalNewsForm').reset();
    updateCharCount();
}

// Update character count
function updateCharCount() {
    const summaryInput = document.getElementById('newsSummary');
    const countDisplay = document.getElementById('summaryCount');
    const count = summaryInput.value.length;
    countDisplay.textContent = count;
    
    if (count > 200) {
        countDisplay.style.color = '#dc2626';
    } else {
        countDisplay.style.color = 'var(--text-secondary)';
    }
}

// Handle news submission
function handleNewsSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newsData = Object.fromEntries(formData);
    
    // Validate summary length
    if (newsData.summary.length > 200) {
        alert('Summary must be 200 characters or less.');
        return;
    }
    
    // In a real app, this would submit to an API
    console.log('News submission:', newsData);
    
    // Show success message
    alert('Thank you for submitting your news! We will review and publish it soon.');
    
    closeNewsForm();
}

// Handle subscription
function handleSubscription(e) {
    e.preventDefault();
    
    const email = document.getElementById('subscribeEmail').value;
    
    // In a real app, this would submit to an API
    console.log('Subscription request:', email);
    
    alert('Thank you for subscribing! You will receive updates about NSA news and announcements.');
    
    e.target.reset();
}

// Scroll to feed
function scrollToFeed() {
    document.getElementById('newsFeed').scrollIntoView({
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