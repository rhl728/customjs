/**
 * JavaScript Database and logic for Project Reference Page
 * 
 * DEVELOPER NOTICE:
 * To add, edit, or remove projects, modify the `projectsData` array below.
 * Available categories: "apartments", "hotels", "other", "international"
 * Available brands: "nobili", "tece", "arco", "geesa", "elkay"
 */

const projectsData = [
    // --- APARTMENTS & HOUSING PROJECTS ---
    {
        id: 1,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Canterbury Golf - 264 Units",
        location: "Piliyandala",
        value: "Value | Rs.2.67 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 2,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Elixia 3C15 - 460 Apartments",
        location: "Malabe",
        value: "Value | Rs.32.6 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 3,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Canterbury Villas - 163 Units",
        location: "Piliyandala",
        value: "Value | Rs.3.1 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 4,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Ariyana Resort - 344 Apartments",
        location: "Athurugiriya",
        value: "Value | Rs.31.3 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 5,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Canterbury Garden - 424 Apartments",
        location: "Piliyandala",
        value: "Value | Rs.29.6 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 6,
        category: "apartments",
        developer: "MABIMA GROUP",
        name: "Aeon Sky Residences - 44 Apartments",
        location: "Negombo",
        value: "Value | Rs.5.3 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 7,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Santorini Resort Apartments - 158 Apartments",
        location: "Negombo",
        value: "Value | Rs.27.5 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 8,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Santorini Residences - 120 Units",
        location: "Negombo",
        value: "Value | Rs.26 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 9,
        category: "apartments",
        developer: "SANKEN CONSTRUCTION",
        name: "Capitol Twin Peaks - 487 Apartments",
        location: "Colombo",
        value: "Value | US $ 80,000",
        brand: "tece",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/2.jpg"
    },
    {
        id: 10,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Canterbury Residences - 321 Apartments",
        location: "Piliyandala",
        value: "Value | Rs.24 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 11,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Luxe Highway Residences - 112 Units",
        location: "Kottawa",
        value: "Value | Rs.19 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 12,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Flora Residences - 18 Apartments",
        location: "Battaramulla",
        value: "Value | Rs.4.6 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 13,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Treasure Trove Residences - 77 Apartments",
        location: "Borella",
        value: "Value | Rs.16.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 14,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Green Valley Project - 416 Units",
        location: "Athurugiriya",
        value: "Value | Rs.18.5 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 15,
        category: "apartments",
        developer: "PRIME LANDS GROUP (PVT) LTD",
        name: "Prime Lands Group (Pvt) Ltd",
        location: "Colombo",
        value: "Value | Rs.15 Million",
        brand: "arco",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 16,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Porshia Residences - 63 Apartments",
        location: "Nawala",
        value: "Value | Rs.6.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 17,
        category: "apartments",
        developer: "PINNACLE DEVELOPMENT CONSULTANTS",
        name: "Kings Court Apartment - 42 Apartments",
        location: "Colombo",
        value: "Value | Rs.29.6 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 18,
        category: "apartments",
        developer: "NIROSHAN MOTORS",
        name: "Bohemian Hostels",
        location: "Negombo",
        value: "Value | Rs.2.6 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 19,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "The Highness - 54 Apartments",
        location: "Rajagiriya",
        value: "Value | Rs.2.6 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 20,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Sparkles Residences - 85 Houses",
        location: "Malabe",
        value: "Value | Rs.1.2 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },
    {
        id: 21,
        category: "apartments",
        developer: "HOME LANDS SKYLINE",
        name: "Oceana Beach Resort Apartments",
        location: "Wadduwa",
        value: "Value | Rs.7.0 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/1.jpg"
    },

    // --- HOTELS & RESORTS PROJECTS ---
    {
        id: 22,
        category: "hotels",
        developer: "SERENIA RESIDENCIES",
        name: "Serenia Residences",
        location: "Talpe, Galle",
        value: "Value | Rs.16.5 Million",
        brand: "geesa",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 23,
        category: "hotels",
        developer: "KIMBERLEY HOTEL & RESORTS (PVT) LTD",
        name: "Camelot Beach Hotel",
        location: "Negombo",
        value: "Value | Rs.12.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 24,
        category: "hotels",
        developer: "THE ROCKWALL BOUTIQUE",
        name: "The Rockwall Boutique",
        location: "Induruwa, Galle",
        value: "Value | Rs.9.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 25,
        category: "hotels",
        developer: "RANI BEACH RESORT",
        name: "Rani Beach Resort",
        location: "Negombo",
        value: "Value | Rs.7.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 26,
        category: "hotels",
        developer: "LOLC HOLDINGS COMPANY PLC",
        name: "Club Hotel Dolphin",
        location: "Waikkala",
        value: "Value | Rs.6.6 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 27,
        category: "hotels",
        developer: "LOCHANA BEACH RESORT",
        name: "Lochana Beach Resort",
        location: "Negombo",
        value: "Value | Rs.1.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 28,
        category: "hotels",
        developer: "JETWING HOTELS LTD",
        name: "Blue Oceanic Beach Hotel",
        location: "Negombo",
        value: "Value | Rs.3.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 29,
        category: "hotels",
        developer: "GOLDEN STAR BEACH HOTEL",
        name: "Golden Star Beach Hotel",
        location: "Negombo",
        value: "Value | Rs.12,000",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 30,
        category: "hotels",
        developer: "MARABEDDA GARDEN RESORT",
        name: "Marabedda Garden Resort",
        location: "Kandy",
        value: "Value | Rs.2.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 31,
        category: "hotels",
        developer: "JETWING HOTELS LTD",
        name: "Jetwing Yala",
        location: "Yala",
        value: "Value | Rs.2.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 32,
        category: "hotels",
        developer: "RANI BEACH RESORT",
        name: "Ravina Hotel",
        location: "Negombo",
        value: "Value | Rs.5.8 Million",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },

    // --- OTHER PROJECTS ---
    {
        id: 33,
        category: "other",
        developer: "LONDON STOCK EXCHANGE GROUP",
        name: "London Stock Exchange Group",
        location: "Colombo",
        value: "Value | US $ 14,500",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/2.jpg"
    },
    {
        id: 34,
        category: "other",
        developer: "TUDAWE BROTHERS",
        name: "OPV Lanka Pvt Ltd",
        location: "Negombo",
        value: "Value | US $ 12,000",
        brand: "nobili",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/2.jpg"
    },

    // --- INTERNATIONAL PROJECTS ---
    {
        id: 35,
        category: "international",
        developer: "SUN SIYAM RESORTS",
        name: "Sun Siyam Iru Fushi",
        location: "Maldives",
        value: "Value | US $ 12,500",
        brand: "geesa",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 36,
        category: "international",
        developer: "ANANTARA HOTELS, RESORTS & SPAS",
        name: "Anantara Kihavah Maldives Villas",
        location: "Maldives",
        value: "Value | US $ 12,500",
        brand: "elkay",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    },
    {
        id: 37,
        category: "international",
        developer: "SUN SIYAM RESORTS",
        name: "Sun Siyam Olhuveli",
        location: "Maldives",
        value: "Value | US $ 9,000",
        brand: "geesa",
        image: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/ProjectReferencePage/images/3.jpg"
    }
];

// Brand HTML Mockup Renderers
const brandLogoRenders = {
    nobili: `<div class="logo-nobili">NOBILI<span>NOVATEC</span></div>`,
    tece: `<div class="logo-tece">TECE<span>close to you</span></div>`,
    arco: `<div class="logo-arco">arco<span>NOVATEC</span></div>`,
    geesa: `<div class="logo-geesa">geesa<span>NOVATEC</span></div>`,
    elkay: `<div class="logo-elkay">ELKAY</div>`
};

const brandNames = {
    nobili: "Nobili by Novatec",
    tece: "TECE close to you",
    arco: "Arco by Novatec",
    geesa: "Geesa by Novatec",
    elkay: "Elkay"
};

// DOM Elements (assigned dynamically in init)
let projectsGridContainer;
let searchInput;
let searchClearBtn;
let filterButtons;

// Modal Elements
let modalOverlay;
let modalCloseBtn;
let modalImg;
let modalDeveloper;
let modalTitle;
let modalLocation;
let modalValue;
let modalBrand;

// Active Filtering State
let activeCategory = "all";
let searchKeyword = "";

// Initialize page content
function init() {
    projectsGridContainer = document.getElementById("projects-sections-container");
    searchInput = document.getElementById("search-input");
    searchClearBtn = document.getElementById("search-clear");
    filterButtons = document.querySelectorAll(".filter-tab-btn");

    modalOverlay = document.getElementById("detail-modal");
    modalCloseBtn = document.getElementById("modal-close-btn");
    modalImg = document.getElementById("modal-img");
    modalDeveloper = document.getElementById("modal-developer");
    modalTitle = document.getElementById("modal-title");
    modalLocation = document.getElementById("modal-location");
    modalValue = document.getElementById("modal-value");
    modalBrand = document.getElementById("modal-brand");

    if (projectsGridContainer) {
        renderProjects();
        setupEventListeners();
    }
}

// Generate the HTML for the sections and cards
function renderProjects() {
    projectsGridContainer.innerHTML = "";

    // Define the category blocks to generate
    const categories = [
        { key: "apartments", title: "Apartments & Housing Projects" },
        { key: "hotels", title: "Hotels & Resorts Projects - Local" },
        { key: "other", title: "Other Projects" },
        { key: "international", title: "International Projects" }
    ];

    // Filter data first
    const filteredProjects = projectsData.filter(project => {
        const matchesCategory = activeCategory === "all" || project.category === activeCategory;
        const matchesSearch = !searchKeyword || 
            project.developer.toLowerCase().includes(searchKeyword) ||
            project.name.toLowerCase().includes(searchKeyword) ||
            project.location.toLowerCase().includes(searchKeyword) ||
            (brandNames[project.brand] && brandNames[project.brand].toLowerCase().includes(searchKeyword));
        return matchesCategory && matchesSearch;
    });

    if (filteredProjects.length === 0) {
        projectsGridContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No projects found</h3>
                <p>Try adjusting your search keywords or filter category.</p>
            </div>
        `;
        return;
    }

    // Determine layout mapping
    // If the active filter is a specific category, show only that section.
    // If "all" is active, show the grid layouts grouped by their headers.
    let targetCategories = categories;
    if (activeCategory !== "all") {
        targetCategories = categories.filter(c => c.key === activeCategory);
    }

    // Check if we need to split layout for smaller sections:
    // In the design, 'Other Projects' and 'International Projects' are placed side-by-side or stacked on larger screens.
    // We can group 'other' and 'international' into a wrapper block when 'all' is selected.
    let regularCategories = targetCategories;
    let splitCategories = [];

    if (activeCategory === "all") {
        regularCategories = targetCategories.filter(c => c.key === "apartments" || c.key === "hotels");
        splitCategories = targetCategories.filter(c => c.key === "other" || c.key === "international");
    }

    // Render regular sections
    regularCategories.forEach(cat => {
        const catProjects = filteredProjects.filter(p => p.category === cat.key);
        if (catProjects.length > 0) {
            renderCategorySection(cat, catProjects, projectsGridContainer);
        }
    });

    // Render split sections container (Other and International side-by-side on desktop)
    if (splitCategories.length > 0) {
        const hasSplitContent = splitCategories.some(cat => filteredProjects.some(p => p.category === cat.key));
        if (hasSplitContent) {
            const splitWrapper = document.createElement("div");
            splitWrapper.className = "split-sections-container";
            projectsGridContainer.appendChild(splitWrapper);

            splitCategories.forEach(cat => {
                const catProjects = filteredProjects.filter(p => p.category === cat.key);
                if (catProjects.length > 0) {
                    renderCategorySection(cat, catProjects, splitWrapper);
                }
            });
        }
    }
}

// Render a single category section block
function renderCategorySection(cat, projects, parentContainer) {
    const section = document.createElement("div");
    section.className = `category-section ${cat.key}`;

    const banner = document.createElement("div");
    banner.className = "category-banner";
    banner.innerText = cat.title;
    section.appendChild(banner);

    const grid = document.createElement("div");
    grid.className = "cards-grid";

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.setAttribute("data-id", project.id);
        card.addEventListener("click", () => openModal(project));

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${project.image}" alt="${project.name}" class="card-img" loading="lazy">
                <div class="card-overlay">
                    <span class="card-overlay-developer">${project.developer}</span>
                    <span class="card-overlay-name">${project.name}, ${project.location}</span>
                    <span class="card-overlay-value">${project.value}</span>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-brand-logo">
                    ${brandLogoRenders[project.brand] || ''}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    section.appendChild(grid);
    parentContainer.appendChild(section);
}

// Setup Event Listeners
function setupEventListeners() {
    // Keyword Search
    searchInput.addEventListener("input", (e) => {
        searchKeyword = e.target.value.toLowerCase().trim();
        if (searchKeyword) {
            searchClearBtn.classList.add("active");
        } else {
            searchClearBtn.classList.remove("active");
        }
        renderProjects();
    });

    // Clear Search Input Button
    searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchKeyword = "";
        searchClearBtn.classList.remove("active");
        renderProjects();
        searchInput.focus();
    });

    // Tab Filters
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.getAttribute("data-category");
            renderProjects();
        });
    });

    // Close Modal Button
    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Close Modal on Esc key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
            closeModal();
        }
    });
}

// Modal actions
function openModal(project) {
    modalImg.src = project.image;
    modalImg.alt = project.name;
    modalDeveloper.innerText = project.developer;
    modalTitle.innerText = project.name;
    modalLocation.innerText = project.location;
    modalValue.innerText = project.value.replace("Value | ", "");
    modalBrand.innerHTML = brandLogoRenders[project.brand] || brandNames[project.brand];
    
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scroll
}

// Run Initializer
document.addEventListener("oms_getTemplateListSuccess", init); //DOMContentLoaded