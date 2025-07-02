// Load university data from JSON file
let universities = [];
const stateList = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...');
    
    fetch('parsed_data.json')
        .then(response => {
            console.log('Fetch response status:', response.status);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('Raw data loaded, length:', data.length);
            console.log('Sample data entry:', data[0]);
            
            universities = data.filter(u => u.universityName);
            console.log('Filtered universities with names:', universities.length);
            
            renderStateOptions();
            renderResults();
        })
        .catch(error => {
            console.error('Error loading university data:', error);
            universities = [];
            renderStateOptions();
            renderResults();
        });

    // Initialize scroll to top functionality
    initializeScrollToTop();
    
    // Add test button listener
    const testMITBtn = document.getElementById('testMIT');
    if (testMITBtn) {
      testMITBtn.addEventListener('click', testMITFilter);
    }
});

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // Show button when user scrolls down 100px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Sample university data for demonstration
const sampleUniversities = [
    {
        id: 1,
        universityName: "Texas A&M Texarkana",
        state: "Texas",
        class10gpa: 3.35,
        class11gpa: 2.6,
        class12gpa: 3.21,
        satScore: null,
        englishTest: "Duolingo",
        englishScore: 105,
        coa: 22055,
        //Scholarship: $14000,
        //Tution_after_scholarship: $6970,
        i20Image: "/images/i-20-1.png",
        submissionDate: "2025-05-16",
        //Text:"Accepted with in 15days after sending transcript from .edu email Get i20 within 5 days"

      },
      {
        id: 2,
        universityName: "South Dakota state University",
        state: "South Dakota",
        class10gpa: 3.30,
        class11gpa: 2.65,
        class12gpa: 2.91,
        satScore: null,
        englishTest: "IELTS",
        englishScore: 6.5,
        coa: 24322,
        i20Image: "/images/i-20-2.png",
        submissionDate: "2025-05-15"
  
      },

      {
        id: 3,
        universityName: "Neumann University ",
        state: "Pennsylvania",
        class10gpa: 3.8,
        class11gpa: null,
        class12gpa: 3.38,
        satScore: 1360,
        englishTest: "IELTS",
        englishScore: 7.5,
        coa: 0,
        i20Image: "/images/i-20-3.png",
        submissionDate: "2025-05-15"
        //Text:"Enrollment fee - 300$ I20 after 1 month Application fee- ×× Friend I20"

 

      },
      {
        id: 4,
        universityName: "Dakota state university ",
        state: " South Dakota",
        class10gpa: 3.05,
        class11gpa: 3.37,
        class12gpa: 3.45,
        satScore: null,
        englishTest: "Dulingo",
        englishScore: 110,
        coa: 26000,
        i20Image: "/images/i-20-4.png",
        submissionDate: "2025-05-09"
        //Text:"i20sent:may6 and received today .Paid application fee $20"
        
      },
      {
        id: 5,
        universityName: "Texas A&M University - Texarkana ",
        state: "Texas",
        class10gpa: 3.30,
        class11gpa: 3.81,
        class12gpa: 3.62,
        satScore: null,
        englishTest: "IELTS",
        englishScore: 7.0,
        coa: 22055,
        i20Image: "/images/i-20-5.png",
        submissionDate: "2024-03-18"
        //Text:"VISA STATUS: APPROVED"
      },

     
      {
        id: 6,
        universityName: "Georgia State University",
        state: "Georgia",
        class10gpa: null,
        class11gpa: null,
        class12gpa: null,
        satScore: null,
        englishTest: "English Proficiency",
        englishScore: null,
        coa: 28560,
        i20Image: "/images/i-20-6.png",
        submissionDate: "2025-05-05"
      },
      {
        id: 7,
        universityName: "Louisiana Tech University ",
        state: "Louisiana",
        class10gpa: 2.45,
        class11gpa: 2.9,
        class12gpa: 3.2,
        satScore: null,
        englishTest: "English Proficiency",
        englishScore: null,
        coa: 21423,
        i20Image: "/images/i-20-7.png",
        submissionDate: "2025-04-26"
        //Text:"Got i20 on 1 month"

      },
      {
        id: 8,
        universityName: "Washington University of Science and Technology",
        state: "Virginia",
        class10gpa: 2.95,
        class11gpa: null,
        class12gpa: 2.76,
        satScore: null,
        englishTest: "IELTS",
        englishScore: 6,
        coa: 22310,
        i20Image: "/images/i-20-8.png",
        submissionDate: "2025-04-25"
        //Text: "No Application fee, Got i20 within 1 month"
      },
   
      {
        id: 9,
        universityName: "Avila University",
        state: "Missouri",
        class10gpa: 2.95,
        class11gpa: null,
        class12gpa: 2.76,
        satScore: null,
        englishTest: "IELTS",
        englishScore: 6,
        coa: 25706,
        i20Image: "/images/i-20-9.png",
        submissionDate: "2025-04-05"
      },
      {
        id: 10,
        universityName: "Louisiana Tech University",
        state: "Louisiana",
        class10gpa: 3.55,
        class11gpa: 3.29,
        class12gpa: 3.29,
        satScore: null,
        englishTest: "IELTS",
        englishScore: 7.0,
        coa: 21423,
        i20Image: "/images/i-20-10.png",
        submissionDate: "2025-04-22"
        //Text:"Application sent-march 20, I20 received-april 22(they actually sent me my i20 in april ,17 they said but malai ako thena ani they resent it in april 22) ,University -louisiana tech university ,Letsss gooo, Application fee:waived"
      },
      {
        id: 11,
        universityName: "St. Cloud State University",
        state: "Minnesota",
        class10gpa: null,
        class11gpa: null,
        class12gpa: 3.70,
        satScore: null,
        englishTest: "PTE",
        englishScore: 61,
        coa: 26569,
        i20Image: "/images/i-20-11.png",
        submissionDate: "2025-04-22"
        //Text:"Scholarship same for everyone .No need of application fee .,Major:Computer and information system ."
      },

      {
        id: 12,
        universityName: "University of Louisiana at Monroe",
        state: "Louisiana",
        class10gpa: 3.85,
        class11gpa: 3.71,
        class12gpa: 3.82,
        satScore: 1320,
        englishTest: "IELTS",
        englishScore: 7,
        coa: 14678,
        i20Image: "/images/i-20-11.png",
        submissionDate: "2025-04-22"
        //Text:"application fee: 30$ _____paid 10$ ,use SENIOR2025 TO GET 20$ DISCOUNT."
      }
   

    
    
  ];
  
// Initialize EmailJS
var emailjs = {
    init: function(userId) {
        // Placeholder for EmailJS initialization
        console.log("EmailJS initialized with user ID:", userId);
    },
    sendForm: function(serviceId, templateId, form) {
        return new Promise(function(resolve, reject) {
            // Placeholder for EmailJS sendForm function
            console.log("Sending email using service ID:", serviceId, "template ID:", templateId, "form:", form);
            setTimeout(function() {
                // Simulate success
                resolve({ status: 200, text: 'OK' });

                // Simulate failure
                // reject({ error: 'Simulated error' });
            }, 500);
        });
    }
};

(function() {
    emailjs.init("07nxNgZIMZg1EjJEV");
})();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'submit.html':
            initializeSubmitPage();
            break;
        case 'explore.html':
            initializeExplorePage();
            break;
    }
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Home page initialization
function initializeHomePage() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Submit page initialization
function initializeSubmitPage() {
    const form = document.getElementById('submissionForm');

    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

// Form submission handler with EmailJS
function handleFormSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
    submitBtn.disabled = true;

    // Validate required fields
    const class12gpa = form.querySelector('#class12gpa').value;
    const universityName = form.querySelector('#universityName').value;
    const i20Upload = form.querySelector('#i20Upload').files[0];
    const consent = form.querySelector('#consent').checked;

    if (!class12gpa || !universityName || !i20Upload || !consent) {
        showError('Please fill in all required fields.');
        resetSubmitButton(submitBtn, originalText);
        return;
    }

    // Send email using EmailJS
    emailjs.sendForm('service_0nzygde', 'template_k4enxm2', form)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccess();
            form.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showError('Failed to submit. Please try again.');
        })
        .finally(function() {
            resetSubmitButton(submitBtn, originalText);
        });
}

function showSuccess() {
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('submissionForm');

    successMessage.style.display = 'block';
    form.style.display = 'none';

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.querySelector('p').textContent = message;
    errorMessage.style.display = 'block';

    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth' });
}

function resetSubmitButton(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
}

// Explore page initialization
function initializeExplorePage() {
    const findButton = document.getElementById('findUniversities');

    if (findButton) {
        findButton.addEventListener('click', findMatchingUniversities);
    }
}

// Find matching universities based on user input
function findMatchingUniversities() {
    // Get input values with null checks
    const class10gpa = document.getElementById('class10gpa')?.value ? parseFloat(document.getElementById('class10gpa').value) : null;
    const class11gpa = document.getElementById('class11gpa')?.value ? parseFloat(document.getElementById('class11gpa').value) : null;
    const class12gpa = document.getElementById('class12gpa')?.value ? parseFloat(document.getElementById('class12gpa').value) : null;
    const satScore = document.getElementById('satScore')?.value ? parseInt(document.getElementById('satScore').value) : null;
    const englishTest = document.getElementById('englishTest')?.value || null;
    const englishScore = document.getElementById('englishScore')?.value ? parseFloat(document.getElementById('englishScore').value) : null;
    const selectedState = document.getElementById('stateFilter')?.value || null;

    console.log('Searching with criteria:', { class10gpa, class11gpa, class12gpa, satScore, englishTest, englishScore, selectedState });
    console.log('Total universities available:', universities.length);

    // If no criteria are provided, show all universities
    if (!class10gpa && !class11gpa && !class12gpa && !satScore && !englishTest && !englishScore && !selectedState) {
        console.log('No criteria provided, showing all universities');
        displayResults(universities);
        return;
    }

    // Filter universities based on criteria
    const matchingUniversities = universities.filter(uni => {
        // Skip entries without university names
        if (!uni.universityName) {
            return false;
        }

        // State filter
        if (selectedState && uni.state) {
            if (uni.state.toLowerCase().trim() !== selectedState.toLowerCase().trim()) {
                return false;
            }
        }

        // Class 12 GPA check - university GPA should be less than or equal to user's GPA
        if (class12gpa !== null && uni.class12gpa !== null) {
            if (uni.class12gpa > class12gpa) {
                return false;
            }
        }

        // Class 11 GPA check
        if (class11gpa !== null && uni.class11gpa !== null) {
            if (uni.class11gpa > class11gpa) {
                return false;
            }
        }

        // Class 10 GPA check
        if (class10gpa !== null && uni.class10gpa !== null) {
            if (uni.class10gpa > class10gpa) {
                return false;
            }
        }

        // SAT Score check - university SAT should be less than or equal to user's score
        if (satScore !== null && uni.satScore !== null) {
            if (uni.satScore > satScore) {
                return false;
            }
        }

        // English test score check - only if both test type and score are provided
        if (englishTest && englishScore !== null && uni.englishTest && uni.englishScore !== null) {
            // Check if test types match (case-insensitive)
            if (uni.englishTest.toLowerCase().trim() === englishTest.toLowerCase().trim()) {
                // If university score is higher than user's score, exclude it
                if (uni.englishScore > englishScore) {
                    return false;
                }
            }
        }

        return true;
    });

    console.log('Found matching universities:', matchingUniversities.length);
    displayResults(matchingUniversities);
}

// Function to show all universities
function showAllUniversities() {
    console.log('Showing all universities');
    const validUniversities = universities.filter(uni => uni.universityName);
    console.log('Valid universities found:', validUniversities.length);
    displayResults(validUniversities);
}

// Test function to debug search issues
function testSearch() {
    console.log('=== SEARCH DEBUG INFO ===');
    console.log('Total universities loaded:', universities.length);
    console.log('Universities with names:', universities.filter(uni => uni.universityName).length);
    console.log('Sample universities:');
    universities.slice(0, 3).forEach((uni, index) => {
        console.log(`University ${index + 1}:`, {
            name: uni.universityName,
            state: uni.state,
            class12gpa: uni.class12gpa,
            satScore: uni.satScore,
            englishTest: uni.englishTest,
            englishScore: uni.englishScore
        });
    });
}

// Display search results
function displayResults(universities) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (universities.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No matching universities found. Try adjusting your criteria or click "Show All Universities" to see all available data.</p>';
        return;
    }

    // Add results count
    resultsContainer.innerHTML = `<h3>Found ${universities.length} matching ${universities.length === 1 ? 'university' : 'universities'}</h3>`;

    universities.forEach(uni => {
        const card = document.createElement('div');
        card.className = 'university-card';
        
        // Helper function to display value or 'Not specified'
        const displayValue = (value) => value !== null && value !== undefined ? value : 'Not specified';
        // Helper function to format currency with better null/undefined handling
        const formatCurrency = (amount) => {
            if (amount === null || amount === undefined) return 'Not specified';
            try {
                return `$${Number(amount).toLocaleString()}`;
            } catch (e) {
                return 'Not specified';
            }
        };
        
        card.innerHTML = `
            <h3>${displayValue(uni.universityName)}</h3>
            ${uni.state ? `<p><strong>State:</strong> ${uni.state}</p>` : ''}
            
            <div class="requirements-section">
                <p><strong>Academic Requirements:</strong></p>
                <ul>
                    <li>Class 12 GPA: ${displayValue(uni.class12gpa)}</li>
                    ${uni.satScore ? `<li>SAT Score: ${uni.satScore}</li>` : ''}
                    ${uni.englishTest && uni.englishScore ? 
                        `<li>${uni.englishTest}: ${uni.englishScore}</li>` : 
                        '<li>English Test: Not specified</li>'}
                </ul>
            </div>

            <div class="financial-section">
                <p><strong>Financial Information:</strong></p>
                <ul>
                    <li>Total Cost: ${formatCurrency(uni.Total)}</li>
                    <li>Scholarship: ${formatCurrency(uni.Scholarship)}</li>
                    <li>Cost after Scholarship: ${formatCurrency(uni.Total_after_scholarship)}</li>
                </ul>
            </div>
            
            ${uni.i20Image ? `
            <div class="i20-preview">
                <img src="${uni.i20Image}" alt="I-20 Preview" onclick="showImage('${uni.i20Image}')">
                <span>Click to view full I-20</span>
            </div>
            ` : ''}
            <p class="submission-date">Submitted: ${new Date(uni.submissionDate).toLocaleDateString()}</p>
        `;
        
        resultsContainer.appendChild(card);
    });
}

// Utility functions for form validation
function validateGPA(value) {
    const gpa = parseFloat(value);
    return !isNaN(gpa) && gpa >= 0 && gpa <= 4;
}

function validateSAT(value) {
    const sat = parseInt(value);
    return !isNaN(sat) && sat >= 400 && sat <= 1600;
}

function validateEnglishScore(testType, score) {
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return false;

    switch(testType) {
        case 'IELTS':
            return numScore >= 0 && numScore <= 9;
        case 'TOEFL':
            return numScore >= 0 && numScore <= 120;
        case 'Duolingo':
            return numScore >= 10 && numScore <= 160;
        case 'PTE':
            return numScore >= 10 && numScore <= 90;
        default:
            return true;
    }
}

// Add real-time validation feedback
document.addEventListener('DOMContentLoaded', function() {
    // Add validation to GPA fields
    document.querySelectorAll('input[id*="gpa"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateGPA(this.value)) {
                this.style.borderColor = '#e63946';
                showTooltip(this, 'GPA must be between 0 and 4');
            } else {
                this.style.borderColor = '#e9ecef';
                hideTooltip(this);
            }
        });
    });

    // Add validation to SAT fields
    document.querySelectorAll('input[id*="SAT"], input[id*="sat"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateSAT(this.value)) {
                this.style.borderColor = '#e63946';
                showTooltip(this, 'SAT score must be between 400 and 1600');
            } else {
                this.style.borderColor = '#e9ecef';
                hideTooltip(this);
            }
        });
    });
});

function showTooltip(element, message) {
    // Remove existing tooltip
    hideTooltip(element);

    const tooltip = document.createElement('div');
    tooltip.className = 'validation-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #e63946;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        margin-top: 5px;
        white-space: nowrap;
    `;

    element.parentNode.style.position = 'relative';
    element.parentNode.appendChild(tooltip);
}

function hideTooltip(element) {
    const tooltip = element.parentNode.querySelector('.validation-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Smooth animations for page elements
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.step-card, .usage-card, .benefit-card, .university-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);

function showImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
}

// --- Utility Functions ---
function displayValue(value) {
  return value !== null && value !== undefined && value !== '' ? value : 'Not specified';
}
function formatCurrency(amount) {
  if (amount === null || amount === undefined || amount === 0) return 'Not specified';
  try { return `$${Number(amount).toLocaleString()}`; } catch { return 'Not specified'; }
}
function getAffordableBadge(total) {
  if (total && total < 25000) return '<span class="badge badge-affordable">Affordable</span>';
  return '';
}

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting initialization...');
  
  fetch('parsed_data.json')
    .then(response => {
      console.log('Fetch response status:', response.status);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log('Raw data loaded, length:', data.length);
      console.log('Sample data entry:', data[0]);
      
      universities = data.filter(u => u.universityName);
      console.log('Filtered universities with names:', universities.length);
      
      renderStateOptions();
      renderResults();
    })
    .catch(error => {
      console.error('Error loading university data:', error);
      universities = [];
      renderStateOptions();
      renderResults();
    });

  function renderStateOptions() {
    const stateSelect = document.getElementById('stateFilter');
    if (!stateSelect) {
      console.error('State filter element not found!');
      return;
    }
    stateSelect.innerHTML = '<option value="">All States</option>' +
      stateList.map(state => `<option value="${state}">${state}</option>`).join('');
    console.log('State options rendered');
  }

  // Add tooltips to filter fields
  const tooltipFields = {
    'class10gpa': 'Enter your 10th grade GPA (0-4)',
    'class11gpa': 'Enter your 11th grade GPA (0-4)',
    'class12gpa': 'Enter your 12th grade GPA (0-4)',
    'satScore': 'Enter your SAT score (400-1600)',
    'englishTest': 'Select your English proficiency test',
    'englishScore': 'Enter your English test score',
    'stateFilter': 'Filter by US state'
  };
  
  Object.entries(tooltipFields).forEach(([id, tooltip]) => {
    const element = document.getElementById(id);
    if (element) {
      element.title = tooltip;
    } else {
      console.warn(`Element with id '${id}' not found for tooltip`);
    }
  });

  const filterForm = document.getElementById('filterForm');
  const resetBtn = document.getElementById('resetFilters');
  const activeFilters = document.getElementById('activeFilters');
  
  if (filterForm) {
    filterForm.addEventListener('input', renderResults);
    filterForm.addEventListener('change', renderResults);
    console.log('Filter form listeners attached');
  } else {
    console.error('Filter form not found!');
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (filterForm) filterForm.reset();
      renderResults();
      console.log('Filters reset');
    });
  } else {
    console.error('Reset button not found!');
  }

  if (activeFilters) {
    activeFilters.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-tag')) {
        const field = e.target.getAttribute('data-field');
        if (field) {
          const element = document.getElementById(field);
          if (element) {
            element.value = '';
            renderResults();
            console.log('Filter tag removed:', field);
          }
        }
      }
    });
  } else {
    console.error('Active filters container not found!');
  }

  const imageModal = document.getElementById('imageModal');
  if (imageModal) {
    imageModal.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  } else {
    console.error('Image modal not found!');
  }
});

function getFilterValues() {
  const values = {
    class10gpa: document.getElementById('class10gpa')?.value !== '' ? parseFloat(document.getElementById('class10gpa').value) : null,
    class11gpa: document.getElementById('class11gpa')?.value !== '' ? parseFloat(document.getElementById('class11gpa').value) : null,
    class12gpa: document.getElementById('class12gpa')?.value !== '' ? parseFloat(document.getElementById('class12gpa').value) : null,
    satScore: document.getElementById('satScore')?.value !== '' ? parseInt(document.getElementById('satScore').value) : null,
    englishTest: document.getElementById('englishTest')?.value || null,
    englishScore: document.getElementById('englishScore')?.value !== '' ? parseFloat(document.getElementById('englishScore').value) : null,
    state: document.getElementById('stateFilter')?.value || null
  };
  
  console.log('Current filter values:', values);
  return values;
}

function filterUniversities() {
  const filters = getFilterValues();
  console.log('Filtering universities with criteria:', filters);
  console.log('Total universities to filter:', universities.length);
  
  // Debug: Check if MIT is in the data
  const mitEntry = universities.find(uni => uni.universityName && uni.universityName.toLowerCase().includes('mit'));
  if (mitEntry) {
    console.log('MIT found in data:', mitEntry);
  } else {
    console.log('MIT not found in universities array');
  }
  
  // Debug: Check Massachusetts universities
  const massUniversities = universities.filter(uni => uni.state && uni.state.toLowerCase() === 'massachusetts');
  console.log('Massachusetts universities found:', massUniversities.length);
  massUniversities.forEach(uni => console.log('MA uni:', uni.universityName, uni.state));
  
  const filtered = universities.filter(uni => {
    // State filter - if user selected a state, university must have that exact state
    if (filters.state) {
      console.log(`Checking state filter: "${uni.state}" vs "${filters.state}"`);
      if (!uni.state || uni.state.toLowerCase().trim() !== filters.state.toLowerCase().trim()) {
        console.log(`State mismatch: "${uni.state}" !== "${filters.state}"`);
        return false;
      }
      console.log(`State match: "${uni.state}" === "${filters.state}"`);
    }
    
    // GPA filters - if user provided a value, university must have that field populated
    if (filters.class10gpa !== null) {
      if (uni.class10gpa === null || uni.class10gpa === undefined) {
        return false;
      }
      if (uni.class10gpa > filters.class10gpa) {
        return false;
      }
    }
    
    if (filters.class11gpa !== null) {
      if (uni.class11gpa === null || uni.class11gpa === undefined) {
        return false;
      }
      if (uni.class11gpa > filters.class11gpa) {
        return false;
      }
    }
    
    if (filters.class12gpa !== null) {
      if (uni.class12gpa === null || uni.class12gpa === undefined) {
        return false;
      }
      if (uni.class12gpa > filters.class12gpa) {
        return false;
      }
    }
    
    // SAT filter - if user provided SAT score, university must have SAT requirement
    if (filters.satScore !== null) {
      if (uni.satScore === null || uni.satScore === undefined) {
        return false;
      }
      if (uni.satScore > filters.satScore) {
        return false;
      }
    }
    
    // English test filter - if user provided test type and score, university must have both
    if (filters.englishTest && filters.englishScore !== null) {
      if (!uni.englishTest || uni.englishScore === null || uni.englishScore === undefined) {
        return false;
      }
      if (uni.englishTest.toLowerCase().trim() === filters.englishTest.toLowerCase().trim()) {
        if (uni.englishScore > filters.englishScore) {
          return false;
        }
      }
    }
    
    return true;
  });
  
  console.log('Filtered results count:', filtered.length);
  if (filtered.length > 0) {
    console.log('Sample filtered university:', filtered[0]);
  }
  
  return filtered;
}

function renderResults() {
  console.log('Rendering results...');
  
  const resultsGrid = document.getElementById('resultsGrid');
  const summary = document.getElementById('resultsSummary');
  const activeFilters = document.getElementById('activeFilters');
  
  if (!resultsGrid || !summary || !activeFilters) {
    console.error('Required DOM elements not found:', {
      resultsGrid: !!resultsGrid,
      summary: !!summary,
      activeFilters: !!activeFilters
    });
    return;
  }
  
  const filters = getFilterValues();
  const filtered = filterUniversities();

  // Render summary
  summary.innerHTML = `<span>Found <strong>${filtered.length}</strong> universit${filtered.length === 1 ? 'y' : 'ies'}</span>`;

  // Render active filter tags
  const tags = [];
  if (filters.class10gpa !== null) tags.push(`<span class="filter-tag">10 GPA ≥ ${filters.class10gpa}<span class="remove-tag" data-field="class10gpa">×</span></span>`);
  if (filters.class11gpa !== null) tags.push(`<span class="filter-tag">11 GPA ≥ ${filters.class11gpa}<span class="remove-tag" data-field="class11gpa">×</span></span>`);
  if (filters.class12gpa !== null) tags.push(`<span class="filter-tag">12 GPA ≥ ${filters.class12gpa}<span class="remove-tag" data-field="class12gpa">×</span></span>`);
  if (filters.satScore !== null) tags.push(`<span class="filter-tag">SAT ≥ ${filters.satScore}<span class="remove-tag" data-field="satScore">×</span></span>`);
  if (filters.englishTest) tags.push(`<span class="filter-tag">${filters.englishTest}${filters.englishScore !== null ? ' ≥ ' + filters.englishScore : ''}<span class="remove-tag" data-field="englishTest">×</span></span>`);
  if (filters.state) tags.push(`<span class="filter-tag">${filters.state}<span class="remove-tag" data-field="stateFilter">×</span></span>`);
  activeFilters.innerHTML = tags.join('');

  if (filtered.length === 0) {
    resultsGrid.innerHTML = '<div class="no-results">No matching universities found.<br>Try adjusting your filters or leave fields empty to see all universities.</div>';
    console.log('No results found, showing no results message');
    return;
  }
  
  console.log('Rendering', filtered.length, 'university cards');
  resultsGrid.innerHTML = filtered.map(uni => renderUniversityCard(uni)).join('');

  // Attach event listeners
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.onclick = function() {
      const details = this.closest('.university-card').querySelector('.card-details');
      details.classList.toggle('active');
      this.textContent = details.classList.contains('active') ? 'Hide Details' : 'More Details';
    };
  });
  
  document.querySelectorAll('.i20-thumb').forEach(img => {
    img.onclick = function() { 
      const imgSrc = this.getAttribute('data-img');
      console.log('Opening modal for image:', imgSrc);
      showImage(imgSrc); 
    };
  });
  
  console.log('Results rendering complete');
}

function renderUniversityCard(uni) {
  // Use a default image if i20Image is missing
  const i20Img = uni.i20Image ? uni.i20Image : 'images/i20-placeholder.png';
  
  return `
    <div class="university-card">
      <div class="card-header">
        <img src="images/university-logo.png" class="university-logo" alt="Logo" onerror="this.style.display='none'">
        <div>
          <h3>${displayValue(uni.universityName)}</h3>
          <span class="badge badge-state">${displayValue(uni.state)}</span>
          ${getAffordableBadge(uni.Total_after_scholarship)}
        </div>
      </div>
      <div class="card-body">
        <ul>
          <li><strong>Class 12 GPA:</strong> ${displayValue(uni.class12gpa)}</li>
          <li><strong>SAT:</strong> ${displayValue(uni.satScore)}</li>
          <li><strong>English:</strong> ${displayValue(uni.englishTest)} ${displayValue(uni.englishScore)}</li>
          <li><strong>Cost after Scholarship:</strong> ${formatCurrency(uni.Total_after_scholarship)}</li>
        </ul>
        <button class="expand-btn" type="button">More Details</button>
        <div class="card-details">
          <ul>
            <li><strong>Class 10 GPA:</strong> ${displayValue(uni.class10gpa)}</li>
            <li><strong>Class 11 GPA:</strong> ${displayValue(uni.class11gpa)}</li>
            <li><strong>Total Cost:</strong> ${formatCurrency(uni.Total)}</li>
            <li><strong>Scholarship:</strong> ${formatCurrency(uni.Scholarship)}</li>
            <li><strong>Submission Date:</strong> ${uni.submissionDate ? new Date(uni.submissionDate).toLocaleDateString() : 'Not specified'}</li>
          </ul>
          <img src="${i20Img}" class="i20-thumb" data-img="${i20Img}" alt="I-20 Preview" onerror="this.src='images/i20-placeholder.png'">
        </div>
      </div>
    </div>
  `;
}

function showImage(src) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  if (modal && img) {
    img.src = src;
    modal.classList.add('active');
    img.focus();
    console.log('Modal opened for image:', src);
  } else {
    console.error('Modal elements not found');
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  if (modal && img) {
    modal.classList.remove('active');
    img.src = '';
    console.log('Modal closed');
  }
}

// Test function to debug MIT filtering
function testMITFilter() {
  console.log('=== MIT Filter Test ===');
  console.log('Universities loaded:', universities.length);
  
  // Find MIT
  const mit = universities.find(uni => uni.universityName && uni.universityName.toLowerCase().includes('massachusetts institute'));
  if (mit) {
    console.log('MIT found:', mit);
    console.log('MIT state:', mit.state);
    console.log('MIT state type:', typeof mit.state);
  } else {
    console.log('MIT not found in data');
  }
  
  // Find all Massachusetts universities
  const maUnis = universities.filter(uni => uni.state && uni.state.toLowerCase() === 'massachusetts');
  console.log('Massachusetts universities:', maUnis.length);
  maUnis.forEach(uni => console.log('-', uni.universityName, '(', uni.state, ')'));
  
  // Test state filter
  const testFilter = { state: 'Massachusetts' };
  const filtered = universities.filter(uni => {
    if (testFilter.state) {
      return uni.state && uni.state.toLowerCase().trim() === testFilter.state.toLowerCase().trim();
    }
    return true;
  });
  console.log('Filtered for Massachusetts:', filtered.length);
  filtered.forEach(uni => console.log('-', uni.universityName));
}

