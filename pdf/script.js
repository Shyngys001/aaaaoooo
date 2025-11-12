// === DIRECTORIES (Admin-managed справочники) ===
let directories = {
    hotels: [
        {
            id: 'swissotel-makkah',
            city: 'Мекка',
            name: 'Swissôtel Makkah',
            stars: 5,
            rating: 9.2,
            distance: '300м от Харама',
            photos: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
            ]
        },
        {
            id: 'hilton-makkah',
            city: 'Мекка',
            name: 'Hilton Suites Makkah',
            stars: 5,
            rating: 9.0,
            distance: '500м от Харама',
            photos: [
                'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
                'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'
            ]
        },
        {
            id: 'raffles-makkah',
            city: 'Мекка',
            name: 'Raffles Makkah Palace',
            stars: 5,
            rating: 9.4,
            distance: '200м от Харама',
            photos: [
                'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
                'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
            ]
        },
        {
            id: 'movenpick-medina',
            city: 'Медина',
            name: 'Mövenpick Hotel Medina',
            stars: 5,
            rating: 9.3,
            distance: '200м от мечети',
            photos: [
                'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
            ]
        },
        {
            id: 'oberoi-medina',
            city: 'Медина',
            name: 'Oberoi Medina',
            stars: 5,
            rating: 9.5,
            distance: '150м от мечети',
            photos: [
                'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
                'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
                'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800'
            ]
        },
        {
            id: 'pullman-medina',
            city: 'Медина',
            name: 'Pullman ZamZam Medina',
            stars: 5,
            rating: 8.9,
            distance: '400м от мечети',
            photos: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
                'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
            ]
        }
    ],
    transferOptions: ['самолёт', 'поезд', 'автобус', 'такси', 'личный водитель', 'групповой трансфер']
};

// === STATE MANAGEMENT ===
let state = {
    template: 'apple-minimalist',
    logo: null,
    brandName: 'ATLAS',
    tagline: 'Premium Travel Services',
    packageTitle: 'Umrah 2025',
    packageSubtitle: 'Священное путешествие',
    hotels: [],
    prices: [],
    transfers: [],
    flights: [],
    services: [
        { icon: '✈️', title: 'Виза', desc: 'Полное оформление' },
        { icon: '🏨', title: 'Отели 5★', desc: 'Премиум размещение' },
        { icon: '🚌', title: 'Трансфер', desc: 'Комфортабельный транспорт' },
        { icon: '🍽️', title: 'Питание', desc: 'Завтраки включены' },
        { icon: '📱', title: 'Поддержка 24/7', desc: 'Русскоязычный гид' },
        { icon: '🎫', title: 'Экскурсии', desc: 'Обзорные туры' }
    ]
};

// Load from localStorage on init
function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('atlas_builder_state_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
        }
        
        const savedDirectories = localStorage.getItem('atlas_directories_v2');
        if (savedDirectories) {
            directories = JSON.parse(savedDirectories);
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
    }
}

// Save to localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('atlas_builder_state_v2', JSON.stringify(state));
        localStorage.setItem('atlas_directories_v2', JSON.stringify(directories));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

// === UTILITY FUNCTIONS ===
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function sanitizeUrl(url) {
    if (!url) return '';
    try {
        new URL(url);
        return url + (url.includes('unsplash') ? '&w=800' : '');
    } catch {
        return '';
    }
}

function getStars(count) {
    return '⭐'.repeat(count);
}

// === HOTEL SELECT WITH TYPEAHEAD ===
function createHotelSelect(containerId, currentValue, onSelect) {
    const selectHtml = `
        <div class="hotel-select-wrapper">
            <input type="text" 
                   class="hotel-search-input" 
                   placeholder="Выберите отель..." 
                   autocomplete="off"
                   data-container="${containerId}">
            <div class="hotel-dropdown" data-container="${containerId}"></div>
        </div>
    `;
    return selectHtml;
}

function initHotelSelect(containerSelector) {
    const input = document.querySelector(`${containerSelector} .hotel-search-input`);
    const dropdown = document.querySelector(`${containerSelector} .hotel-dropdown`);
    
    if (!input || !dropdown) return;
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = directories.hotels.filter(hotel => 
            hotel.city.toLowerCase().includes(query) || 
            hotel.name.toLowerCase().includes(query)
        );
        
        renderHotelDropdown(dropdown, filtered, (hotel) => {
            // Find hotel index
            const hotelIndex = parseInt(input.closest('.list-item').dataset.index);
            selectHotelFromDirectory(hotelIndex, hotel);
            input.value = `${hotel.city} - ${hotel.name}`;
            dropdown.style.display = 'none';
        });
        
        dropdown.style.display = filtered.length > 0 ? 'block' : 'none';
    });
    
    input.addEventListener('focus', () => {
        const query = input.value.toLowerCase();
        const filtered = query ? directories.hotels.filter(hotel => 
            hotel.city.toLowerCase().includes(query) || 
            hotel.name.toLowerCase().includes(query)
        ) : directories.hotels;
        
        renderHotelDropdown(dropdown, filtered, (hotel) => {
            const hotelIndex = parseInt(input.closest('.list-item').dataset.index);
            selectHotelFromDirectory(hotelIndex, hotel);
            input.value = `${hotel.city} - ${hotel.name}`;
            dropdown.style.display = 'none';
        });
        
        dropdown.style.display = filtered.length > 0 ? 'block' : 'none';
    });
    
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

function renderHotelDropdown(dropdown, hotels, onSelect) {
    dropdown.innerHTML = hotels.map(hotel => `
        <div class="hotel-dropdown-item" data-hotel-id="${hotel.id}">
            <div class="hotel-dropdown-name">${hotel.name}</div>
            <div class="hotel-dropdown-meta">${hotel.city} • ${getStars(hotel.stars)} • ⭐ ${hotel.rating}</div>
        </div>
    `).join('');
    
    dropdown.querySelectorAll('.hotel-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const hotelId = item.dataset.hotelId;
            const hotel = directories.hotels.find(h => h.id === hotelId);
            if (hotel) onSelect(hotel);
        });
    });
}

function selectHotelFromDirectory(idx, hotel) {
    state.hotels[idx] = {
        sourceId: hotel.id,
        city: hotel.city,
        name: hotel.name,
        stars: hotel.stars,
        rating: hotel.rating,
        distance: hotel.distance,
        photos: [...hotel.photos]
    };
    renderHotelsList();
    render();
    saveToLocalStorage();
}

// === RENDER EDITOR LISTS ===
function renderHotelsList() {
    const list = document.getElementById('hotelsList');
    list.innerHTML = state.hotels.map((hotel, idx) => `
        <div class="list-item" data-index="${idx}">
            <div class="list-item-header">
                <span class="list-item-title">Отель ${idx + 1}</span>
                <button class="btn btn-icon btn-delete" onclick="removeHotel(${idx})">🗑️</button>
            </div>
            
            <div class="form-group">
                <label>Выбрать из справочника</label>
                <div class="hotel-select-container-${idx}">
                    ${createHotelSelect(`hotel-select-container-${idx}`, hotel.sourceId, (hotelData) => selectHotelFromDirectory(idx, hotelData))}
                </div>
            </div>
            
            <div class="form-group">
                <label>Город</label>
                <input type="text" value="${hotel.city || ''}" oninput="updateHotel(${idx}, 'city', this.value)">
            </div>
            <div class="form-group">
                <label>Название</label>
                <input type="text" value="${hotel.name || ''}" oninput="updateHotel(${idx}, 'name', this.value)">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Звёзды</label>
                    <input type="number" min="1" max="5" value="${hotel.stars || 5}" oninput="updateHotel(${idx}, 'stars', parseInt(this.value))">
                </div>
                <div class="form-group">
                    <label>Рейтинг</label>
                    <input type="number" step="0.1" value="${hotel.rating || 9.0}" oninput="updateHotel(${idx}, 'rating', parseFloat(this.value))">
                </div>
            </div>
            <div class="form-group">
                <label>Расстояние</label>
                <input type="text" value="${hotel.distance || ''}" oninput="updateHotel(${idx}, 'distance', this.value)">
            </div>
            <div class="form-group">
                <label>Фото 1 (URL)</label>
                <input type="url" value="${hotel.photos[0] || ''}" oninput="updateHotelPhoto(${idx}, 0, this.value)">
            </div>
            <div class="form-group">
                <label>Фото 2 (URL)</label>
                <input type="url" value="${hotel.photos[1] || ''}" oninput="updateHotelPhoto(${idx}, 1, this.value)">
            </div>
            <div class="form-group">
                <label>Фото 3 (URL)</label>
                <input type="url" value="${hotel.photos[2] || ''}" oninput="updateHotelPhoto(${idx}, 2, this.value)">
            </div>
        </div>
    `).join('');
    
    // Initialize hotel selects
    state.hotels.forEach((hotel, idx) => {
        initHotelSelect(`.hotel-select-container-${idx}`);
    });
}

function renderPricesList() {
    const list = document.getElementById('pricesList');
    list.innerHTML = state.prices.map((price, idx) => `
        <div class="list-item">
            <div class="list-item-header">
                <span class="list-item-title">Цена ${idx + 1}</span>
                <div>
                    ${idx > 0 ? `<button class="btn btn-icon" onclick="movePriceUp(${idx})">↑</button>` : ''}
                    ${idx < state.prices.length - 1 ? `<button class="btn btn-icon" onclick="movePriceDown(${idx})">↓</button>` : ''}
                    <button class="btn btn-icon btn-delete" onclick="removePrice(${idx})">🗑️</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Название</label>
                    <input type="text" value="${price.label || ''}" oninput="updatePrice(${idx}, 'label', this.value)">
                </div>
                <div class="form-group">
                    <label>Стоимость</label>
                    <input type="number" value="${price.value || ''}" oninput="updatePrice(${idx}, 'value', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Валюта</label>
                <select onchange="updatePrice(${idx}, 'currency', this.value)">
                    <option value="KZT" ${price.currency === 'KZT' ? 'selected' : ''}>KZT</option>
                    <option value="USD" ${price.currency === 'USD' ? 'selected' : ''}>USD</option>
                    <option value="EUR" ${price.currency === 'EUR' ? 'selected' : ''}>EUR</option>
                    <option value="RUB" ${price.currency === 'RUB' ? 'selected' : ''}>RUB</option>
                </select>
            </div>
        </div>
    `).join('');
}

function renderTransfersList() {
    const list = document.getElementById('transfersList');
    list.innerHTML = state.transfers.map((transfer, idx) => `
        <div class="list-item">
            <div class="list-item-header">
                <span class="list-item-title">Трансфер ${idx + 1}</span>
                <div>
                    ${idx > 0 ? `<button class="btn btn-icon" onclick="moveTransferUp(${idx})">↑</button>` : ''}
                    ${idx < state.transfers.length - 1 ? `<button class="btn btn-icon" onclick="moveTransferDown(${idx})">↓</button>` : ''}
                    <button class="btn btn-icon btn-delete" onclick="removeTransfer(${idx})">🗑️</button>
                </div>
            </div>
            <div class="form-group">
                <label>Тип трансфера</label>
                <select onchange="updateTransfer(${idx}, 'type', this.value)">
                    <option value="">Выберите тип...</option>
                    ${directories.transferOptions.map(opt => 
                        `<option value="${opt}" ${transfer.type === opt ? 'selected' : ''}>${opt}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Откуда</label>
                    <input type="text" value="${transfer.from || ''}" oninput="updateTransfer(${idx}, 'from', this.value)">
                </div>
                <div class="form-group">
                    <label>Куда</label>
                    <input type="text" value="${transfer.to || ''}" oninput="updateTransfer(${idx}, 'to', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Примечание (опционально)</label>
                <input type="text" value="${transfer.note || ''}" oninput="updateTransfer(${idx}, 'note', this.value)">
            </div>
        </div>
    `).join('');
}

function renderFlightsList() {
    const list = document.getElementById('flightsList');
    list.innerHTML = state.flights.map((flight, idx) => `
        <div class="list-item ${!isFlightValid(flight) ? 'has-error' : ''}">
            <div class="list-item-header">
                <span class="list-item-title">Рейс ${idx + 1}</span>
                <div>
                    ${idx > 0 ? `<button class="btn btn-icon" onclick="moveFlightUp(${idx})">↑</button>` : ''}
                    ${idx < state.flights.length - 1 ? `<button class="btn btn-icon" onclick="moveFlightDown(${idx})">↓</button>` : ''}
                    <button class="btn btn-icon btn-delete" onclick="removeFlight(${idx})">🗑️</button>
                </div>
            </div>
            <div class="form-group">
                <label>Направление</label>
                <select onchange="updateFlight(${idx}, 'direction', this.value)">
                    <option value="вылет" ${flight.direction === 'вылет' ? 'selected' : ''}>Вылет</option>
                    <option value="прилёт" ${flight.direction === 'прилёт' ? 'selected' : ''}>Прилёт</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Дата</label>
                    <input type="date" value="${flight.date || ''}" oninput="updateFlight(${idx}, 'date', this.value)" required>
                </div>
                <div class="form-group">
                    <label>Время</label>
                    <input type="time" value="${flight.time || ''}" oninput="updateFlight(${idx}, 'time', this.value)" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Откуда</label>
                    <input type="text" value="${flight.from || ''}" oninput="updateFlight(${idx}, 'from', this.value)" required>
                </div>
                <div class="form-group">
                    <label>Куда</label>
                    <input type="text" value="${flight.to || ''}" oninput="updateFlight(${idx}, 'to', this.value)" required>
                </div>
            </div>
            <div class="form-group">
                <label>Номер рейса (опционально)</label>
                <input type="text" value="${flight.flightNumber || ''}" oninput="updateFlight(${idx}, 'flightNumber', this.value)">
            </div>
            ${!isFlightValid(flight) ? '<div class="error-message">⚠️ Заполните все обязательные поля</div>' : ''}
        </div>
    `).join('');
}

function renderServicesList() {
    const list = document.getElementById('servicesList');
    list.innerHTML = state.services.map((service, idx) => `
        <div class="list-item">
            <div class="list-item-header">
                <span class="list-item-title">Услуга ${idx + 1}</span>
                <button class="btn btn-icon btn-delete" onclick="removeService(${idx})">🗑️</button>
            </div>
            <div class="form-group">
                <label>Иконка (emoji)</label>
                <input type="text" value="${service.icon || ''}" oninput="updateService(${idx}, 'icon', this.value)">
            </div>
            <div class="form-group">
                <label>Название</label>
                <input type="text" value="${service.title || ''}" oninput="updateService(${idx}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Описание</label>
                <input type="text" value="${service.desc || ''}" oninput="updateService(${idx}, 'desc', this.value)">
            </div>
        </div>
    `).join('');
}

// === VALIDATION ===
function isFlightValid(flight) {
    return flight.date && flight.time && flight.from && flight.to;
}

function validateAllFlights() {
    return state.flights.every(isFlightValid);
}

// === UPDATE FUNCTIONS ===
function updateHotel(idx, field, value) {
    state.hotels[idx][field] = value;
    render();
    saveToLocalStorage();
}

function updateHotelPhoto(idx, photoIdx, value) {
    if (!state.hotels[idx].photos) state.hotels[idx].photos = [];
    state.hotels[idx].photos[photoIdx] = value;
    render();
    saveToLocalStorage();
}

function updatePrice(idx, field, value) {
    state.prices[idx][field] = value;
    render();
    saveToLocalStorage();
}

function updateTransfer(idx, field, value) {
    state.transfers[idx][field] = value;
    render();
    saveToLocalStorage();
}

function updateFlight(idx, field, value) {
    state.flights[idx][field] = value;
    renderFlightsList();
    render();
    saveToLocalStorage();
}

function updateService(idx, field, value) {
    state.services[idx][field] = value;
    render();
    saveToLocalStorage();
}

// === REMOVE FUNCTIONS ===
function removeHotel(idx) {
    state.hotels.splice(idx, 1);
    renderHotelsList();
    render();
    saveToLocalStorage();
}

function removePrice(idx) {
    state.prices.splice(idx, 1);
    renderPricesList();
    render();
    saveToLocalStorage();
}

function removeTransfer(idx) {
    state.transfers.splice(idx, 1);
    renderTransfersList();
    render();
    saveToLocalStorage();
}

function removeFlight(idx) {
    state.flights.splice(idx, 1);
    renderFlightsList();
    render();
    saveToLocalStorage();
}

function removeService(idx) {
    state.services.splice(idx, 1);
    renderServicesList();
    render();
    saveToLocalStorage();
}

// === MOVE FUNCTIONS (для сортировки) ===
function movePriceUp(idx) {
    if (idx > 0) {
        [state.prices[idx], state.prices[idx - 1]] = [state.prices[idx - 1], state.prices[idx]];
        renderPricesList();
        render();
        saveToLocalStorage();
    }
}

function movePriceDown(idx) {
    if (idx < state.prices.length - 1) {
        [state.prices[idx], state.prices[idx + 1]] = [state.prices[idx + 1], state.prices[idx]];
        renderPricesList();
        render();
        saveToLocalStorage();
    }
}

function moveTransferUp(idx) {
    if (idx > 0) {
        [state.transfers[idx], state.transfers[idx - 1]] = [state.transfers[idx - 1], state.transfers[idx]];
        renderTransfersList();
        render();
        saveToLocalStorage();
    }
}

function moveTransferDown(idx) {
    if (idx < state.transfers.length - 1) {
        [state.transfers[idx], state.transfers[idx + 1]] = [state.transfers[idx + 1], state.transfers[idx]];
        renderTransfersList();
        render();
        saveToLocalStorage();
    }
}

function moveFlightUp(idx) {
    if (idx > 0) {
        [state.flights[idx], state.flights[idx - 1]] = [state.flights[idx - 1], state.flights[idx]];
        renderFlightsList();
        render();
        saveToLocalStorage();
    }
}

function moveFlightDown(idx) {
    if (idx < state.flights.length - 1) {
        [state.flights[idx], state.flights[idx + 1]] = [state.flights[idx + 1], state.flights[idx]];
        renderFlightsList();
        render();
        saveToLocalStorage();
    }
}

// === ADMIN PANEL ===
let tempDirectories = null;

function openAdminPanel() {
    tempDirectories = JSON.parse(JSON.stringify(directories));
    document.getElementById('adminModal').classList.add('show');
    renderAdminHotels();
    renderAdminTransferOptions();
}

function closeAdminPanel() {
    document.getElementById('adminModal').classList.remove('show');
    tempDirectories = null;
}

function saveAdminChanges() {
    directories = JSON.parse(JSON.stringify(tempDirectories));
    localStorage.setItem('atlas_directories_v2', JSON.stringify(directories));
    closeAdminPanel();
    renderHotelsList();
    renderTransfersList();
    showToast('Справочники обновлены', 'success');
}

function renderAdminHotels() {
    const list = document.getElementById('adminHotelsList');
    list.innerHTML = tempDirectories.hotels.map((hotel, idx) => `
        <div class="admin-list-item">
            <div class="list-item-header">
                <span class="list-item-title">${hotel.name} (${hotel.city})</span>
                <button class="btn btn-icon btn-delete" onclick="removeAdminHotel(${idx})">🗑️</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>ID</label>
                    <input type="text" value="${hotel.id}" oninput="updateAdminHotel(${idx}, 'id', this.value)">
                </div>
                <div class="form-group">
                    <label>Город</label>
                    <input type="text" value="${hotel.city}" oninput="updateAdminHotel(${idx}, 'city', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Название</label>
                <input type="text" value="${hotel.name}" oninput="updateAdminHotel(${idx}, 'name', this.value)">
            </div>
            <div class="form-row-3">
                <div class="form-group">
                    <label>Звёзды</label>
                    <input type="number" min="1" max="5" value="${hotel.stars}" oninput="updateAdminHotel(${idx}, 'stars', parseInt(this.value))">
                </div>
                <div class="form-group">
                    <label>Рейтинг</label>
                    <input type="number" step="0.1" value="${hotel.rating}" oninput="updateAdminHotel(${idx}, 'rating', parseFloat(this.value))">
                </div>
                <div class="form-group">
                    <label>Расстояние</label>
                    <input type="text" value="${hotel.distance}" oninput="updateAdminHotel(${idx}, 'distance', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Фото 1</label>
                <input type="url" value="${hotel.photos[0] || ''}" oninput="updateAdminHotelPhoto(${idx}, 0, this.value)">
            </div>
            <div class="form-group">
                <label>Фото 2</label>
                <input type="url" value="${hotel.photos[1] || ''}" oninput="updateAdminHotelPhoto(${idx}, 1, this.value)">
            </div>
            <div class="form-group">
                <label>Фото 3</label>
                <input type="url" value="${hotel.photos[2] || ''}" oninput="updateAdminHotelPhoto(${idx}, 2, this.value)">
            </div>
        </div>
    `).join('');
}

function renderAdminTransferOptions() {
    const list = document.getElementById('adminTransferOptions');
    list.innerHTML = `
        <div class="transfer-options-list">
            ${tempDirectories.transferOptions.map((option, idx) => `
                <div class="transfer-option-item">
                    <input type="text" value="${option}" oninput="updateTransferOption(${idx}, this.value)">
                    <button class="btn btn-icon btn-delete" onclick="removeTransferOption(${idx})">🗑️</button>
                </div>
            `).join('')}
        </div>
    `;
}

function updateAdminHotel(idx, field, value) {
    tempDirectories.hotels[idx][field] = value;
    renderAdminHotels();
}

function updateAdminHotelPhoto(idx, photoIdx, value) {
    if (!tempDirectories.hotels[idx].photos) tempDirectories.hotels[idx].photos = [];
    tempDirectories.hotels[idx].photos[photoIdx] = value;
}

function removeAdminHotel(idx) {
    if (confirm('Удалить этот отель из справочника?')) {
        tempDirectories.hotels.splice(idx, 1);
        renderAdminHotels();
    }
}

function addAdminHotel() {
    tempDirectories.hotels.push({
        id: 'new-hotel-' + Date.now(),
        city: 'Новый город',
        name: 'Новый отель',
        stars: 5,
        rating: 9.0,
        distance: '500м',
        photos: ['', '', '']
    });
    renderAdminHotels();
}

function updateTransferOption(idx, value) {
    tempDirectories.transferOptions[idx] = value;
}

function removeTransferOption(idx) {
    if (confirm('Удалить этот тип трансфера?')) {
        tempDirectories.transferOptions.splice(idx, 1);
        renderAdminTransferOptions();
    }
}

function addTransferOption() {
    const newOption = prompt('Введите название типа трансфера:');
    if (newOption && newOption.trim()) {
        tempDirectories.transferOptions.push(newOption.trim());
        renderAdminTransferOptions();
    }
}

function exportDirectories() {
    const json = JSON.stringify(tempDirectories, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas_directories_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Справочники экспортированы', 'success');
}

function importDirectories() {
    document.getElementById('directoriesInput').click();
}

// === RENDER MAIN FUNCTION ===
function render() {
    const sheet = document.getElementById('previewSheet');
    
    // Используем функции из templates.js или встроенные
    switch (state.template) {
        case 'apple-minimalist':
            sheet.innerHTML = renderAppleMinimalist();
            break;
        case 'magazine-editorial':
            sheet.innerHTML = renderMagazineEditorial();
            break;
        case 'brutalist-luxury':
            sheet.innerHTML = renderBrutalistLuxury();
            break;
        case 'swiss-modern':
            sheet.innerHTML = renderSwissModern();
            break;
        case 'desert-classic':
            sheet.innerHTML = renderDesertClassic();
            break;
        case 'kazakh-ornate':
            sheet.innerHTML = renderKazakhOrnate();
            break;
        case 'ultra-modern-grid':
            sheet.innerHTML = renderUltraModernGrid();
            break;
        case 'apple-glassmorphism':
            sheet.innerHTML = renderAppleGlassmorphism();
            break;
        case 'elegant-serif':
            sheet.innerHTML = renderElegantSerif();
            break;
        case 'mono-minimal':
            sheet.innerHTML = renderMonoMinimal();
            break;
        case 'soft-luxury':
            sheet.innerHTML = renderSoftLuxury();
            break;
        default:
            sheet.innerHTML = renderAppleMinimalist();
    }
}

// Заглушки для остальных шаблонов (используют тот же принцип)
function renderSwissModern() {
    // Упрощенная версия с новыми секциями
    return renderAppleMinimalist().replace('template-apple', 'template-swiss');
}

function renderDesertClassic() {
    return renderAppleMinimalist().replace('template-apple', 'template-desert');
}

function renderKazakhOrnate() {
    return renderAppleMinimalist().replace('template-apple', 'template-kazakh');
}

function renderUltraModernGrid() {
    return renderAppleMinimalist().replace('template-apple', 'template-ultra');
}

function renderAppleGlassmorphism() {
    return renderAppleMinimalist().replace('template-apple', 'template-glass');
}

function renderElegantSerif() {
    return renderAppleMinimalist().replace('template-apple', 'template-elegant');
}

function renderMonoMinimal() {
    return renderAppleMinimalist().replace('template-apple', 'template-mono');
}

function renderSoftLuxury() {
    return renderAppleMinimalist().replace('template-apple', 'template-soft');
}

// === PDF EXPORT ===
async function exportSinglePagePDF() {
    if (!validateAllFlights()) {
        showToast('Заполните все обязательные поля в разделе Рейсы', 'error');
        return;
    }
    
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
    
    try {
        await document.fonts.ready;
        await new Promise(r => setTimeout(r, 500));
        
        const sheet = document.getElementById('previewSheet');
        const bg = getComputedStyle(sheet).backgroundColor || '#ffffff';
        
        const canvas = await html2canvas(sheet, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: bg,
            logging: false,
            windowWidth: document.documentElement.scrollWidth
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const { jsPDF } = window.jspdf;
        
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [canvas.width, canvas.height],
            compress: true,
            hotfixes: []
        });
        
        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
        pdf.save(`${state.brandName}_${state.template}_${Date.now()}.pdf`);
        
        showToast('PDF успешно создан!', 'success');
    } catch (e) {
        console.error('Ошибка PDF экспорта:', e);
        showToast('Ошибка создания PDF', 'error');
    } finally {
        overlay.classList.remove('active');
    }
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', () => {
    // Load state from localStorage
    loadFromLocalStorage();
    
    // Branding inputs
    document.getElementById('brandName').addEventListener('input', (e) => {
        state.brandName = e.target.value;
        render();
        saveToLocalStorage();
    });
    
    document.getElementById('tagline').addEventListener('input', (e) => {
        state.tagline = e.target.value;
        render();
        saveToLocalStorage();
    });
    
    document.getElementById('packageTitle').addEventListener('input', (e) => {
        state.packageTitle = e.target.value;
        render();
        saveToLocalStorage();
    });
    
    document.getElementById('packageSubtitle').addEventListener('input', (e) => {
        state.packageSubtitle = e.target.value;
        render();
        saveToLocalStorage();
    });
    
    // Logo upload
    document.getElementById('logoUpload').addEventListener('click', () => {
        document.getElementById('logoInput').click();
    });
    
    document.getElementById('logoInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                state.logo = event.target.result;
                document.getElementById('logoPreview').style.display = 'flex';
                document.getElementById('logoPreviewImg').src = state.logo;
                render();
                saveToLocalStorage();
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.getElementById('logoRemove').addEventListener('click', () => {
        state.logo = null;
        document.getElementById('logoPreview').style.display = 'none';
        document.getElementById('logoInput').value = '';
        render();
        saveToLocalStorage();
    });
    
    // Template selector
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.template = card.dataset.template;
            render();
            saveToLocalStorage();
        });
    });
    
    // Add buttons
    document.getElementById('addHotel').addEventListener('click', () => {
        state.hotels.push({
            city: 'Новый город',
            name: 'Новый отель',
            stars: 5,
            rating: 9.0,
            distance: '500м',
            photos: ['', '', '']
        });
        renderHotelsList();
        render();
        saveToLocalStorage();
    });
    
    document.getElementById('addPrice').addEventListener('click', () => {
        state.prices.push({ label: 'Новая цена', value: '', currency: 'KZT' });
        renderPricesList();
        render();
        saveToLocalStorage();
    });
    
    document.getElementById('addTransfer').addEventListener('click', () => {
        state.transfers.push({ type: '', from: '', to: '', note: '' });
        renderTransfersList();
        render();
        saveToLocalStorage();
    });
    
    document.getElementById('addFlight').addEventListener('click', () => {
        state.flights.push({ 
            direction: 'вылет', 
            date: '', 
            time: '', 
            from: '', 
            to: '', 
            flightNumber: '' 
        });
        renderFlightsList();
        render();
        saveToLocalStorage();
    });
    
    document.getElementById('addService').addEventListener('click', () => {
        state.services.push({ icon: '🎯', title: 'Новая услуга', desc: 'Описание' });
        renderServicesList();
        render();
        saveToLocalStorage();
    });
    
    // Actions
    document.getElementById('exportPDF').addEventListener('click', exportSinglePagePDF);
    
    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });
    
    document.getElementById('saveJSON').addEventListener('click', () => {
        const json = JSON.stringify(state, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `atlas_package_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Конфигурация сохранена', 'success');
    });
    
    document.getElementById('loadJSON').addEventListener('click', () => {
        document.getElementById('jsonInput').click();
    });
    
    document.getElementById('jsonInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const loaded = JSON.parse(event.target.result);
                    state = { 
                        ...state, 
                        ...loaded,
                        // Ensure new fields exist
                        transfers: loaded.transfers || [],
                        flights: loaded.flights || []
                    };
                    
                    // Update form fields
                    document.getElementById('brandName').value = state.brandName;
                    document.getElementById('tagline').value = state.tagline;
                    document.getElementById('packageTitle').value = state.packageTitle;
                    document.getElementById('packageSubtitle').value = state.packageSubtitle;
                    
                    // Update template
                    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
                    const activeCard = document.querySelector(`[data-template="${state.template}"]`);
                    if (activeCard) activeCard.classList.add('active');
                    
                    // Update logo
                    if (state.logo) {
                        document.getElementById('logoPreview').style.display = 'flex';
                        document.getElementById('logoPreviewImg').src = state.logo;
                    }
                    
                    renderHotelsList();
                    renderPricesList();
                    renderTransfersList();
                    renderFlightsList();
                    renderServicesList();
                    render();
                    saveToLocalStorage();
                    
                    showToast('Конфигурация загружена', 'success');
                } catch (err) {
                    console.error('Load error:', err);
                    showToast('Ошибка загрузки файла', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
    
    // Admin panel
    document.getElementById('openAdmin').addEventListener('click', openAdminPanel);
    document.getElementById('closeAdmin').addEventListener('click', closeAdminPanel);
    document.getElementById('saveAdmin').addEventListener('click', saveAdminChanges);
    document.getElementById('cancelAdmin').addEventListener('click', closeAdminPanel);
    
    document.getElementById('addAdminHotel').addEventListener('click', addAdminHotel);
    document.getElementById('addTransferOption').addEventListener('click', addTransferOption);
    
    document.getElementById('exportDirectories').addEventListener('click', exportDirectories);
    document.getElementById('importDirectories').addEventListener('click', importDirectories);
    
    document.getElementById('directoriesInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const loaded = JSON.parse(event.target.result);
                    tempDirectories = loaded;
                    renderAdminHotels();
                    renderAdminTransferOptions();
                    showToast('Справочники импортированы', 'success');
                } catch (err) {
                    showToast('Ошибка импорта файла', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
    
    // Close modal on outside click
    document.getElementById('adminModal').addEventListener('click', (e) => {
        if (e.target.id === 'adminModal') {
            closeAdminPanel();
        }
    });
    
    // Initial render
    if (state.logo) {
        document.getElementById('logoPreview').style.display = 'flex';
        document.getElementById('logoPreviewImg').src = state.logo;
    }
    
    // Update form fields with saved state
    document.getElementById('brandName').value = state.brandName;
    document.getElementById('tagline').value = state.tagline;
    document.getElementById('packageTitle').value = state.packageTitle;
    document.getElementById('packageSubtitle').value = state.packageSubtitle;
    
    // Set active template
    const activeCard = document.querySelector(`[data-template="${state.template}"]`);
    if (activeCard) {
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
        activeCard.classList.add('active');
    }
    
    renderHotelsList();
    renderPricesList();
    renderTransfersList();
    renderFlightsList();
    renderServicesList();
    render();
});

// Auto-save every 30 seconds
setInterval(() => {
    saveToLocalStorage();
}, 30000);