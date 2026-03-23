// ===== DATA MANAGEMENT =====
const STORAGE_KEY = 'sinopels_island_codes';
const FAVORITES_KEY = 'sinopels_island_favorites';

let currentModalCode = null;
let tags = [];

// ===== SAMPLE DATA =====
const sampleCodes = [
    {
        id: 'sample-1',
        title: 'Infinite Void Gojo Build',
        category: 'gojo',
        author: 'Sinopel',
        difficulty: 'hard',
        description: 'A powerful Gojo build focusing on Infinity and Domain Expansion. Perfect for PvP combat. Use Infinity to block attacks, then follow up with Red and Blue for devastating combos.',
        code: 'GJ-INF-V01D-PURPL3-R3D-BLU3-H0LL0W-D0MAIN-2024-SINOPEL-ULTIMATE-BUILD-MOVESET-X7K9',
        tags: ['PvP', 'Gojo', 'Domain', 'OP'],
        likes: 142,
        copies: 89,
        createdAt: Date.now() - 86400000 * 3
    },
    {
        id: 'sample-2',
        title: 'Malevolent Shrine Sukuna',
        category: 'sukuna',
        author: 'CursedKing',
        difficulty: 'extreme',
        description: 'Full Sukuna moveset with Cleave, Dismantle, and Malevolent Shrine. Requires precise timing for maximum damage output.',
        code: 'SK-MAL3V-SHRIN3-CL3AV3-DISMNTL-FLAME-ARR0W-F1R3-2024-CURSED-KING-MOVESET-Q8R2',
        tags: ['PvP', 'Sukuna', 'Domain', 'Combo'],
        likes: 203,
        copies: 156,
        createdAt: Date.now() - 86400000 * 5
    },
    {
        id: 'sample-3',
        title: 'Black Flash Itadori Combo',
        category: 'itadori',
        author: 'JJKFan',
        difficulty: 'medium',
        description: 'Itadori combo build centered around Black Flash. Great for beginners learning the timing system.',
        code: 'IT-BLKFLSH-DIV3RG3NT-FIST-MANJI-KICK-C0MB0-CHAIN-2024-BLACKFLASH-BUILD-M4P1',
        tags: ['Combo', 'Beginner', 'Black Flash'],
        likes: 98,
        copies: 67,
        createdAt: Date.now() - 86400000 * 2
    },
    {
        id: 'sample-4',
        title: 'Ten Shadows Megumi',
        category: 'megumi',
        author: 'ShadowMaster',
        difficulty: 'hard',
        description: 'Complete Ten Shadows technique build with Nue, Divine Dogs, and Chimera Shadow Garden.',
        code: 'MG-10SHDW-NU3-DIVN3-D0GS-CHIM3RA-GARD3N-RABBIT-TOAD-2024-SHADOW-BUILD-K5L8',
        tags: ['PvP', 'Megumi', 'Domain', 'Technical'],
        likes: 115,
        copies: 73,
        createdAt: Date.now() - 86400000 * 1
    },
    {
        id: 'sample-5',
        title: 'Invincible Toji Build',
        category: 'toji',
        author: 'SorcererSlayer',
        difficulty: 'medium',
        description: 'Heavenly Restricted body build. No cursed energy needed! Pure physical combat with Inverted Spear and Playful Cloud.',
        code: 'TJ-HVNLY-RSTRCT-INV3RT-SP3AR-PLAYFL-CL0UD-CHAIN-PHYS-2024-TOJI-BUILD-N2W6',
        tags: ['Physical', 'Toji', 'No CE', 'Meta'],
        likes: 167,
        copies: 112,
        createdAt: Date.now() - 86400000 * 4
    },
    {
        id: 'sample-6',
        title: 'Boogie Woogie Todo',
        category: 'todo',
        author: 'BestFriend',
        difficulty: 'easy',
        description: 'Simple but effective Todo build. Swap positions with Boogie Woogie and follow up with powerful attacks!',
        code: 'TD-B00GIE-W00GIE-CLAP-SWAP-BROTH3R-PHYS-ATK-2024-TODO-BUILD-H3J7',
        tags: ['Easy', 'Todo', 'Fun', 'Swap'],
        likes: 76,
        copies: 45,
        createdAt: Date.now() - 86400000 * 6
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    createParticles();
    updateStats();
    renderFeatured();
    renderBrowse();
    setupCharCounters();
});

function initializeData() {
    var existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleCodes));
    }
}

function getCodes() {
    var data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveCodes(codes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
}

function getFavorites() {
    var data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
}

function saveFavorites(favs) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

// ===== PARTICLES =====
function createParticles() {
    var container = document.getElementById('particles');
    var count = window.innerWidth < 768 ? 20 : 40;
    var colors = ['#8b5cf6', '#06b6d4', '#a78bfa', '#f43f5e'];

    for (var i = 0; i < count; i++) {
        var particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 15) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        var size = (2 + Math.random() * 3) + 'px';
        particle.style.width = size;
        particle.style.height = size;
        var color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = '0 0 6px ' + color;
        container.appendChild(particle);
    }
}

// ===== NAVIGATION =====
function showPage(pageName) {
    // Hide all pages
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }

    // Show target page
    var target = document.getElementById('page-' + pageName);
    if (target) target.classList.add('active');

    // Update nav links
    var links = document.querySelectorAll('.nav-link');
    for (var j = 0; j < links.length; j++) {
        if (links[j].getAttribute('data-page') === pageName) {
            links[j].classList.add('active');
        } else {
            links[j].classList.remove('active');
        }
    }

    // Refresh page content
    if (pageName === 'browse') renderBrowse();
    if (pageName === 'favorites') renderFavorites();
    if (pageName === 'home') {
        updateStats();
        renderFeatured();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('show');
}

// ===== STATS =====
function updateStats() {
    var codes = getCodes();
    var totalLikes = 0;
    var totalCopies = 0;

    for (var i = 0; i < codes.length; i++) {
        totalLikes += codes[i].likes || 0;
        totalCopies += codes[i].copies || 0;
    }

    animateCounter('totalCodes', codes.length);
    animateCounter('totalLikes', totalLikes);
    animateCounter('totalCopies', totalCopies);
}

function animateCounter(elementId, target) {
    var el = document.getElementById(elementId);
    if (!el) return;

    var current = 0;
    var increment = Math.ceil(target / 40);
    if (increment < 1) increment = 1;

    var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
    }, 30);
}

// ===== RENDER FUNCTIONS =====
function renderFeatured() {
    var codes = getCodes();
    codes.sort(function(a, b) {
        return (b.likes || 0) - (a.likes || 0);
    });
    var featured = codes.slice(0, 3);

    var grid = document.getElementById('featuredGrid');
    if (!grid) return;

    var html = '';
    for (var i = 0; i < featured.length; i++) {
        html += createCodeCard(featured[i]);
    }
    grid.innerHTML = html;
}

function renderBrowse() {
    filterCodes();
}

function renderFavorites() {
    var codes = getCodes();
    var favs = getFavorites();
    var favCodes = [];

    for (var i = 0; i < codes.length; i++) {
        if (favs.indexOf(codes[i].id) !== -1) {
            favCodes.push(codes[i]);
        }
    }

    var grid = document.getElementById('favoritesGrid');
    var empty = document.getElementById('favoritesEmpty');

    if (favCodes.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
        var html = '';
        for (var j = 0; j < favCodes.length; j++) {
            html += createCodeCard(favCodes[j]);
        }
        grid.innerHTML = html;
    }
}

function filterCodes() {
    var codes = getCodes();
    var searchEl = document.getElementById('searchInput');
    var categoryEl = document.getElementById('categoryFilter');
    var sortEl = document.getElementById('sortFilter');

    var search = searchEl ? searchEl.value.toLowerCase() : '';
    var category = categoryEl ? categoryEl.value : 'all';
    var sort = sortEl ? sortEl.value : 'newest';

    var filtered = [];

    for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        var matchSearch = true;
        var matchCategory = true;

        if (search) {
            var inTitle = code.title.toLowerCase().indexOf(search) !== -1;
            var inAuthor = code.author.toLowerCase().indexOf(search) !== -1;
            var inDesc = code.description.toLowerCase().indexOf(search) !== -1;
            var inTags = false;

            if (code.tags) {
                for (var t = 0; t < code.tags.length; t++) {
                    if (code.tags[t].toLowerCase().indexOf(search) !== -1) {
                        inTags = true;
                        break;
                    }
                }
            }

            matchSearch = inTitle || inAuthor || inDesc || inTags;
        }

        if (category !== 'all') {
            matchCategory = code.category === category;
        }

        if (matchSearch && matchCategory) {
            filtered.push(code);
        }
    }

    // Sort
    if (sort === 'newest') {
        filtered.sort(function(a, b) { return b.createdAt - a.createdAt; });
    } else if (sort === 'oldest') {
        filtered.sort(function(a, b) { return a.createdAt - b.createdAt; });
    } else if (sort === 'popular') {
        filtered.sort(function(a, b) { return (b.likes || 0) - (a.likes || 0); });
    } else if (sort === 'copied') {
        filtered.sort(function(a, b) { return (b.copies || 0) - (a.copies || 0); });
    }

    var grid = document.getElementById('codesGrid');
    var empty = document.getElementById('emptyState');

    if (filtered.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
        var html = '';
        for (var j = 0; j < filtered.length; j++) {
            html += createCodeCard(filtered[j]);
        }
        grid.innerHTML = html;
    }
}

function createCodeCard(code) {
    var favs = getFavorites();
    var isFav = favs.indexOf(code.id) !== -1;

    var dateObj = new Date(code.createdAt);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = months[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear();

    var difficulty = code.difficulty || 'medium';
    var difficultyClass = 'badge-' + difficulty;
    var difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    var tagsHtml = '';
    if (code.tags) {
        var maxTags = Math.min(code.tags.length, 3);
        for (var i = 0; i < maxTags; i++) {
            tagsHtml += '<span class="card-tag">#' + escapeHtml(code.tags[i]) + '</span>';
        }
    }

    var codePreview = code.code.length > 120 ? code.code.substring(0, 120) + '...' : code.code;

    var html = '' +
        '<div class="code-card" onclick="openModal(\'' + code.id + '\')">' +
            '<div class="card-header">' +
                '<div class="card-badges">' +
                    '<span class="badge badge-category">' + escapeHtml(code.category) + '</span>' +
                    '<span class="badge badge-difficulty ' + difficultyClass + '">' + difficultyLabel + '</span>' +
                '</div>' +
                '<button class="card-fav-btn ' + (isFav ? 'active' : '') + '" onclick="event.stopPropagation(); toggleFavorite(\'' + code.id + '\')">' +
                    '<i class="fas fa-star"></i>' +
                '</button>' +
            '</div>' +
            '<h3 class="card-title">' + escapeHtml(code.title) + '</h3>' +
            '<p class="card-description">' + escapeHtml(code.description || 'No description provided.') + '</p>' +
            (tagsHtml ? '<div class="card-tags">' + tagsHtml + '</div>' : '') +
            '<div class="card-code-preview">' + escapeHtml(codePreview) + '</div>' +
            '<div class="card-footer">' +
                '<div class="card-meta">' +
                    '<span><i class="fas fa-user"></i> ' + escapeHtml(code.author) + '</span>' +
                    '<span><i class="fas fa-calendar"></i> ' + date + '</span>' +
                '</div>' +
                '<div class="card-actions">' +
                    '<button class="btn-copy-card" onclick="event.stopPropagation(); copyCode(\'' + code.id + '\')">' +
                        '<i class="fas fa-copy"></i> Copy' +
                    '</button>' +
                    '<button class="btn-view-card" onclick="event.stopPropagation(); openModal(\'' + code.id + '\')">' +
                        '<i class="fas fa-eye"></i> View' +
                    '</button>' +
                    '<button class="btn-delete-card" onclick="event.stopPropagation(); deleteCode(\'' + code.id + '\')" title="Delete">' +
                        '<i class="fas fa-trash"></i>' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>';

    return html;
}

// ===== MODAL =====
function openModal(id) {
    var codes = getCodes();
    var code = null;

    for (var i = 0; i < codes.length; i++) {
        if (codes[i].id === id) {
            code = codes[i];
            break;
        }
    }

    if (!code) return;
    currentModalCode = code;

    var favs = getFavorites();
    var isFav = favs.indexOf(code.id) !== -1;

    var dateObj = new Date(code.createdAt);
    var date = dateObj.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    var difficulty = code.difficulty || 'medium';
    var difficultyClass = 'badge-' + difficulty;
    var difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    document.getElementById('modalCategory').textContent = code.category;
    document.getElementById('modalDifficulty').textContent = difficultyLabel;
    document.getElementById('modalDifficulty').className = 'modal-difficulty badge ' + difficultyClass;
    document.getElementById('modalTitle').textContent = code.title;
    document.getElementById('modalAuthor').textContent = code.author;
    document.getElementById('modalDate').textContent = date;
    document.getElementById('modalCopies').textContent = code.copies || 0;
    document.getElementById('modalDescription').textContent = code.description || 'No description provided.';
    document.getElementById('modalCode').textContent = code.code;

    // Tags
    var tagsContainer = document.getElementById('modalTags');
    var tagsHtml = '';
    if (code.tags) {
        for (var j = 0; j < code.tags.length; j++) {
            tagsHtml += '<span class="card-tag">#' + escapeHtml(code.tags[j]) + '</span>';
        }
    }
    tagsContainer.innerHTML = tagsHtml;

    // Favorite button
    var favBtn = document.getElementById('modalFavBtn');
    if (isFav) {
        favBtn.innerHTML = '<i class="fas fa-star"></i> Unfavorite';
    } else {
        favBtn.innerHTML = '<i class="far fa-star"></i> Favorite';
    }

    document.getElementById('codeModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('codeModal').classList.remove('show');
    document.body.style.overflow = '';
    currentModalCode = null;
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.id === 'codeModal') {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== COPY CODE =====
function copyCode(id) {
    var codes = getCodes();
    var code = null;

    for (var i = 0; i < codes.length; i++) {
        if (codes[i].id === id) {
            code = codes[i];
            break;
        }
    }

    if (!code) return;

    copyToClipboard(code.code);

    // Increment copy count
    code.copies = (code.copies || 0) + 1;
    saveCodes(codes);
    showToast('Code copied to clipboard! 📋');
    refreshCurrentPage();
}

function copyModalCode() {
    if (!currentModalCode) return;

    copyToClipboard(currentModalCode.code);

    var codes = getCodes();
    for (var i = 0; i < codes.length; i++) {
        if (codes[i].id === currentModalCode.id) {
            codes[i].copies = (codes[i].copies || 0) + 1;
            document.getElementById('modalCopies').textContent = codes[i].copies;
            currentModalCode = codes[i];
            break;
        }
    }
    saveCodes(codes);
    showToast('Code copied to clipboard! 📋');
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ===== FAVORITES =====
function toggleFavorite(id) {
    var favs = getFavorites();
    var index = favs.indexOf(id);

    if (index !== -1) {
        favs.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        favs.push(id);
        showToast('Added to favorites! ⭐');
    }

    saveFavorites(favs);
    refreshCurrentPage();
}

function toggleFavoriteModal() {
    if (!currentModalCode) return;
    toggleFavorite(currentModalCode.id);

    var favs = getFavorites();
    var isFav = favs.indexOf(currentModalCode.id) !== -1;
    var favBtn = document.getElementById('modalFavBtn');

    if (isFav) {
        favBtn.innerHTML = '<i class="fas fa-star"></i> Unfavorite';
    } else {
        favBtn.innerHTML = '<i class="far fa-star"></i> Favorite';
    }
}

// ===== DELETE =====
function deleteCode(id) {
    if (!confirm('Are you sure you want to delete this moveset code?')) return;

    var codes = getCodes();
    var newCodes = [];
    for (var i = 0; i < codes.length; i++) {
        if (codes[i].id !== id) {
            newCodes.push(codes[i]);
        }
    }
    saveCodes(newCodes);

    // Remove from favorites
    var favs = getFavorites();
    var newFavs = [];
    for (var j = 0; j < favs.length; j++) {
        if (favs[j] !== id) {
            newFavs.push(favs[j]);
        }
    }
    saveFavorites(newFavs);

    showToast('Moveset deleted 🗑️');
    refreshCurrentPage();
    updateStats();
}

// ===== UPLOAD =====
function submitCode(e) {
    e.preventDefault();

    var title = document.getElementById('codeTitle').value.trim();
    var category = document.getElementById('codeCategory').value;
    var author = document.getElementById('uploaderName').value.trim();
    var difficulty = document.getElementById('codeDifficulty').value;
    var description = document.getElementById('codeDescription').value.trim();
    var code = document.getElementById('movesetCode').value.trim();

    if (!title || !category || !author || !code) {
        showToast('Please fill in all required fields!');
        return;
    }

    var newCode = {
        id: 'code-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
        title: title,
        category: category,
        author: author,
        difficulty: difficulty,
        description: description,
        code: code,
        tags: tags.slice(),
        likes: 0,
        copies: 0,
        createdAt: Date.now()
    };

    var codes = getCodes();
    codes.unshift(newCode);
    saveCodes(codes);

    // Reset form
    document.getElementById('uploadForm').reset();
    tags = [];
    document.getElementById('tagsList').innerHTML = '';
    document.getElementById('titleCount').textContent = '0';
    document.getElementById('descCount').textContent = '0';

    showToast('Moveset uploaded successfully! 🎉');

    setTimeout(function() {
        showPage('browse');
    }, 500);
}

// ===== TAGS =====
function addTag(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    var input = document.getElementById('tagInput');
    var value = input.value.trim();

    if (!value) return;
    if (tags.length >= 5) {
        showToast('Maximum 5 tags allowed');
        return;
    }
    if (tags.indexOf(value) !== -1) {
        showToast('Tag already exists');
        return;
    }
    if (value.length > 20) {
        showToast('Tag too long (max 20 characters)');
        return;
    }

    tags.push(value);
    input.value = '';
    renderTags();
}

function removeTag(index) {
    tags.splice(index, 1);
    renderTags();
}

function renderTags() {
    var list = document.getElementById('tagsList');
    var html = '';

    for (var i = 0; i < tags.length; i++) {
        html += '<div class="tag">' +
            '<span>#' + escapeHtml(tags[i]) + '</span>' +
            '<span class="tag-remove" onclick="removeTag(' + i + ')">×</span>' +
        '</div>';
    }

    list.innerHTML = html;
}

// ===== CHARACTER COUNTERS =====
function setupCharCounters() {
    var titleInput = document.getElementById('codeTitle');
    var descInput = document.getElementById('codeDescription');

    if (titleInput) {
        titleInput.addEventListener('input', function() {
            document.getElementById('titleCount').textContent = titleInput.value.length;
        });
    }

    if (descInput) {
        descInput.addEventListener('input', function() {
            document.getElementById('descCount').textContent = descInput.value.length;
        });
    }
}

// ===== TOAST =====
function showToast(message) {
    var toast = document.getElementById('toast');
    var toastMsg = document.getElementById('toastMessage');
    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

// ===== HELPERS =====
function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function refreshCurrentPage() {
    var activePage = document.querySelector('.page.active');
    if (activePage) {
        var pageId = activePage.id.replace('page-', '');
        if (pageId === 'browse') renderBrowse();
        if (pageId === 'favorites') renderFavorites();
        if (pageId === 'home') {
            updateStats();
            renderFeatured();
        }
    }
}