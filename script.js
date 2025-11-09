        // === STATE MANAGEMENT ===
        let state = {
            template: 'apple-minimalist',
            logo: null,
            brandName: 'ATLAS',
            tagline: 'Premium Travel Services',
            packageTitle: 'Umrah 2025',
            packageSubtitle: 'Священное путешествие',
            hotels: [
                {
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
                    city: 'Медина',
                    name: 'Mövenpick Hotel',
                    stars: 5,
                    rating: 9.3,
                    distance: '200м от мечети',
                    photos: [
                        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
                        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'
                    ]
                }
            ],
            prices: [
                { label: '4-местный', value: '$1,500' },
                { label: '3-местный', value: '$1,800' },
                { label: '2-местный', value: '$2,200' }
            ],
            services: [
                { icon: '✈️', title: 'Виза', desc: 'Полное оформление' },
                { icon: '🏨', title: 'Отели 5★', desc: 'Премиум размещение' },
                { icon: '🚌', title: 'Трансфер', desc: 'Комфортабельный транспорт' },
                { icon: '🍽️', title: 'Питание', desc: 'Завтраки включены' },
                { icon: '📱', title: 'Поддержка 24/7', desc: 'Русскоязычный гид' },
                { icon: '🎫', title: 'Экскурсии', desc: 'Обзорные туры' }
            ],
            // NEW: Transfer and Guide section
            transfer: [
                { icon: '🚌', title: 'Трансфер аэропорт–отель', desc: 'Mercedes Sprinter, климат-контроль' },
                { icon: '👤', title: 'Гид', desc: 'Русскоязычный, сопровождает всю поездку' }
            ]
        };
        
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
        
        // === RENDER TEMPLATES ===
        function renderAppleMinimalist() {
            const hotels = state.hotels.map(hotel => {
                const photoHtml = hotel.photos.slice(0, 3).map(url => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" class="hotel-photo" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-card">
                        <div class="hotel-photos">
                            ${photoHtml || '<div style="background: #e0e0e0; grid-column: 1/-1;"></div>'}
                        </div>
                        <div class="hotel-info">
                            <div class="hotel-city">${hotel.city}</div>
                            <h3 class="hotel-name">${hotel.name}</h3>
                            <div class="hotel-stars">${getStars(hotel.stars)}</div>
                            <div class="hotel-meta">
                                <span>⭐ ${hotel.rating}</span>
                                <span>📍 ${hotel.distance}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-card">
                    <div class="price-label">${price.label}</div>
                    <div class="price-value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-card">
                    <div class="service-icon">${service.icon}</div>
                    <div class="service-title">${service.title}</div>
                    <div class="service-desc">${service.desc}</div>
                </div>
            `).join('');
            
            return `
                <div class="template-apple">
                    <div class="header">
                        ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                        <h1 class="brand-name">${state.brandName}</h1>
                        <p class="tagline">${state.tagline}</p>
                    </div>
                    
                    <h2 class="package-title">${state.packageTitle}</h2>
                    <p class="package-subtitle">${state.packageSubtitle}</p>
                    
                    <h3 class="section-heading">Отели</h3>
                    <div class="hotels-grid">${hotels}</div>
                    
                    <h3 class="section-heading">Цены</h3>
                    <div class="prices-grid">${prices}</div>
                    
                    <h3 class="section-heading">Что включено</h3>
                    <div class="services-grid">${services}</div>
                </div>
            `;
        }
        
        function renderMagazineEditorial() {
            const hotels = state.hotels.map((hotel, idx) => {
                const photoHtml = hotel.photos.slice(0, 3).map((url, i) => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-feature">
                        <div class="hotel-images">
                            ${photoHtml || '<div style="background: #ddd; grid-column: 1/-1; height: 350px;"></div>'}
                        </div>
                        <div class="hotel-details">
                            <div class="hotel-city-tag">${hotel.city}</div>
                            <h3>${hotel.name}</h3>
                            <div class="hotel-meta-row">
                                <span>${getStars(hotel.stars)}</span>
                                <span>Рейтинг ${hotel.rating}/10</span>
                            </div>
                            <p style="margin-top: 16px; font-family: Inter, sans-serif; color: #666;">
                                📍 ${hotel.distance}
                            </p>
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-box">
                    <div class="label">${price.label}</div>
                    <div class="value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-item">
                    <div class="icon">${service.icon}</div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            `).join('');
            
            return `
                <div class="template-magazine">
                    <div class="hero">
                        <div class="hero-content">
                            ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                            <h1 class="brand-name">${state.brandName}</h1>
                            <h2 class="package-title">${state.packageTitle}</h2>
                            <p class="tagline">${state.tagline}</p>
                        </div>
                    </div>
                    
                    <div class="content">
                        <h2 class="section-title">Размещение</h2>
                        ${hotels}
                        
                        <div class="prices-showcase">
                            <h2 class="section-title">Стоимость</h2>
                            <div class="prices-row">${prices}</div>
                        </div>
                        
                        <h2 class="section-title">Включенные услуги</h2>
                        <div class="services-columns">${services}</div>
                    </div>
                </div>
            `;
        }
        
        function renderBrutalistLuxury() {
            const hotels = state.hotels.map(hotel => {
                const photoHtml = hotel.photos.slice(0, 3).map(url => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-block">
                        <div class="hotel-photos-grid">
                            ${photoHtml || '<div style="background: #333; grid-column: 1/-1;"></div>'}
                        </div>
                        <div class="hotel-content">
                            <div class="hotel-city-label">${hotel.city}</div>
                            <h3 class="hotel-name">${hotel.name}</h3>
                            <div class="hotel-stats">
                                <div class="stat">${getStars(hotel.stars)}</div>
                                <div class="stat">⭐ ${hotel.rating}</div>
                                <div class="stat">📍 ${hotel.distance}</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-block">
                    <div class="label">${price.label}</div>
                    <div class="value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-block">
                    <div class="icon">${service.icon}</div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            `).join('');
            
            return `
                <div class="template-brutalist">
                    <div class="header-block">
                        ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                        <h1 class="brand-name">${state.brandName}</h1>
                        <p class="tagline">${state.tagline}</p>
                    </div>
                    
                    <div class="title-block">
                        <h2 class="package-title">${state.packageTitle}</h2>
                        <p class="package-subtitle">${state.packageSubtitle}</p>
                    </div>
                    
                    <div class="content-wrapper">
                        <h3 class="section-header">Hotels</h3>
                        <div class="hotels-grid">${hotels}</div>
                        
                        <div class="prices-section">
                            <h3 class="section-header">Pricing</h3>
                            <div class="prices-flex">${prices}</div>
                        </div>
                        
                        <h3 class="section-header">Services</h3>
                        <div class="services-grid">${services}</div>
                    </div>
                </div>
            `;
        }
        
        function renderSwissModern() {
            const hotels = state.hotels.map(hotel => {
                const photoHtml = hotel.photos.slice(0, 3).map(url => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-row">
                        <div class="hotel-info-col">
                            <div class="hotel-city-tag">${hotel.city}</div>
                            <h3>${hotel.name}</h3>
                            <div class="hotel-meta-grid">
                                <div class="meta-item">
                                    <div class="meta-label">Звёзды</div>
                                    <div class="meta-value">${getStars(hotel.stars)}</div>
                                </div>
                                <div class="meta-item">
                                    <div class="meta-label">Рейтинг</div>
                                    <div class="meta-value">${hotel.rating}/10</div>
                                </div>
                                <div class="meta-item">
                                    <div class="meta-label">Расстояние</div>
                                    <div class="meta-value">${hotel.distance}</div>
                                </div>
                            </div>
                        </div>
                        <div class="hotel-images-stack">
                            ${photoHtml || '<div style="background: #ddd; grid-column: 1/-1; height: 300px;"></div>'}
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-cell">
                    <div class="label">${price.label}</div>
                    <div class="value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-cell">
                    <div class="icon">${service.icon}</div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            `).join('');
            
            return `
                <div class="template-swiss">
                    <div class="header-grid">
                        <div class="header-left">
                            ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                            <h1 class="brand-name">${state.brandName}</h1>
                            <p class="tagline">${state.tagline}</p>
                        </div>
                        <div class="header-right">
                            <h2 class="package-title">${state.packageTitle}</h2>
                            <p class="package-subtitle">${state.packageSubtitle}</p>
                        </div>
                    </div>
                    
                    <div class="main-content">
                        <div class="section-label">Accommodation</div>
                        <h3 class="section-title">Премиум отели</h3>
                        <div class="hotels-list">${hotels}</div>
                        
                        <div class="prices-module">
                            <div class="section-label">Pricing</div>
                            <h3 class="section-title">Стоимость пакетов</h3>
                            <div class="prices-table">${prices}</div>
                        </div>
                        
                        <div class="section-label">Services</div>
                        <h3 class="section-title">Включённые услуги</h3>
                        <div class="services-matrix">${services}</div>
                    </div>
                </div>
            `;
        }
        
        // NEW: Desert Classic Template
        function renderDesertClassic() {
            const hotels = state.hotels.map(hotel => {
                const photoHtml = hotel.photos.slice(0, 3).map(url => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-ornate">
                        <div class="hotel-header">
                            <div class="hotel-city-ornate">${hotel.city}</div>
                            <h3 class="hotel-name">${hotel.name}</h3>
                        </div>
                        <div class="hotel-photos-ornate">
                            ${photoHtml || '<div style="background: #e0e0e0; grid-column: 1/-1; height: 220px; border-radius: 12px;"></div>'}
                        </div>
                        <div class="hotel-meta-ornate">
                            <span>${getStars(hotel.stars)}</span>
                            <span>⭐ ${hotel.rating}</span>
                            <span>📍 ${hotel.distance}</span>
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-ornate">
                    <div class="label">${price.label}</div>
                    <div class="value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-box">
                    <div class="icon">${service.icon}</div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            `).join('');
            
            const transfer = state.transfer.map(item => `
                <div class="transfer-box">
                    <div class="icon">${item.icon}</div>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
            
            return `
                <div class="template-desert">
                    <div class="header-ornate">
                        ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                        <h1 class="brand-name">${state.brandName}</h1>
                        <p class="tagline">${state.tagline}</p>
                    </div>
                    
                    <h2 class="package-title">${state.packageTitle}</h2>
                    <p class="package-subtitle">${state.packageSubtitle}</p>
                    
                    <div class="section-divider">◆◆◆</div>
                    
                    <h3 class="section-heading">Отели</h3>
                    <div class="hotels-container">${hotels}</div>
                    
                    <div class="section-divider">◆◆◆</div>
                    
                    <div class="prices-ornate">
                        <h3 class="section-heading">Стоимость</h3>
                        <div class="prices-grid">${prices}</div>
                    </div>
                    
                    <h3 class="section-heading">Включённые услуги</h3>
                    <div class="services-ornate">${services}</div>
                    
                    <div class="section-divider">◆◆◆</div>
                    
                  
                </div>
            `;
        }
        
        // NEW: Kazakh Ornate Template
        function renderKazakhOrnate() {
            const hotels = state.hotels.map(hotel => {
                const photoHtml = hotel.photos.slice(0, 3).map(url => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-kazakh">
                        <div class="hotel-kazakh-header">
                            <div class="hotel-city-kazakh">${hotel.city}</div>
                            <h3 class="hotel-name-kazakh">${hotel.name}</h3>
                        </div>
                        <div class="hotel-body">
                            <div class="hotel-photos-kazakh">
                                ${photoHtml || '<div style="background: #333; grid-column: 1/-1; height: 260px; border-radius: 12px;"></div>'}
                            </div>
                            <div class="hotel-meta-kazakh">
                                <span>${getStars(hotel.stars)}</span>
                                <span>⭐ ${hotel.rating}</span>
                                <span>📍 ${hotel.distance}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-kazakh">
                    <div class="label">${price.label}</div>
                    <div class="value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-kazakh">
                    <div class="icon">${service.icon}</div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            `).join('');
            
            const transfer = state.transfer.map(item => `
                <div class="transfer-kazakh">
                    <div class="icon">${item.icon}</div>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
            
            return `
                <div class="template-kazakh">
                    <div class="hero-kazakh">
                        <div class="ornament-top">◆◆◆◆◆</div>
                        ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                        <h1 class="brand-name">${state.brandName}</h1>
                        <p class="tagline">${state.tagline}</p>
                    </div>
                    
                    <div class="title-section">
                        <h2 class="package-title">${state.packageTitle}</h2>
                        <p class="package-subtitle">${state.packageSubtitle}</p>
                    </div>
                    
                    <div class="content-kazakh">
                        <h3 class="section-title-kazakh">Размещение</h3>
                        <div class="hotels-kazakh">${hotels}</div>
                        
                        <div class="ornament-divider">◆ ◆ ◆</div>
                        
                        <div class="prices-kazakh">
                            <h3 class="section-title-kazakh">Стоимость пакетов</h3>
                            <div class="prices-grid-kazakh">${prices}</div>
                        </div>
                        
                        <h3 class="section-title-kazakh">Включённые услуги</h3>
                        <div class="services-grid-kazakh">${services}</div>
                        
                        <div class="ornament-divider">◆ ◆ ◆</div>
                        
               
                    </div>
                </div>
            `;
        }
        
        // NEW: Ultra Modern Grid Template
        function renderUltraModernGrid() {
            const hotels = state.hotels.map(hotel => {
                const photoHtml = hotel.photos.slice(0, 3).map(url => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-ultra">
                        <div class="hotel-info-ultra">
                            <div class="hotel-city-ultra">${hotel.city}</div>
                            <h3 class="hotel-name-ultra">${hotel.name}</h3>
                            <div class="hotel-stats-ultra">
                                <div class="stat-ultra">
                                    <span class="stat-label">Stars</span>
                                    <span class="stat-value">${getStars(hotel.stars)}</span>
                                </div>
                                <div class="stat-ultra">
                                    <span class="stat-label">Rating</span>
                                    <span class="stat-value">${hotel.rating}</span>
                                </div>
                                <div class="stat-ultra">
                                    <span class="stat-label">Distance</span>
                                    <span class="stat-value">${hotel.distance}</span>
                                </div>
                            </div>
                        </div>
                        <div class="hotel-photos-ultra">
                            ${photoHtml || '<div style="background: #ddd; grid-column: 1/-1; height: 200px;"></div>'}
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-ultra">
                    <div class="label">${price.label}</div>
                    <div class="value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-ultra">
                    <div class="icon">${service.icon}</div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            `).join('');
            
            const transfer = state.transfer.map(item => `
                <div class="transfer-item-ultra">
                    <div class="icon">${item.icon}</div>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
            
            return `
                <div class="template-ultra">
                    <div class="grid-container">
                        <div class="header-ultra">
                            <div class="logo-col">
                                ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                            </div>
                            <div class="brand-col">
                                <h1 class="brand-name">${state.brandName}</h1>
                                <p class="tagline">${state.tagline}</p>
                            </div>
                            <div class="title-col">
                                <h2 class="package-title">${state.packageTitle}</h2>
                                <p class="package-subtitle">${state.packageSubtitle}</p>
                            </div>
                        </div>
                        
                        <div class="section-label-ultra">Hotels</div>
                        <div class="section-content-ultra">
                            <h3 class="section-title-ultra">Accommodation</h3>
                            <div class="hotels-ultra">${hotels}</div>
                        </div>
                        
                        <div class="section-label-ultra">Pricing</div>
                        <div class="section-content-ultra">
                            <h3 class="section-title-ultra">Package Rates</h3>
                            <div class="prices-ultra">${prices}</div>
                        </div>
                        
                        <div class="section-label-ultra">Services</div>
                        <div class="section-content-ultra">
                            <h3 class="section-title-ultra">Included Services</h3>
                            <div class="services-ultra">${services}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // NEW: Apple Glassmorphism Template
        function renderAppleGlassmorphism() {
            const hotels = state.hotels.map(hotel => {
                const photoHtml = hotel.photos.slice(0, 3).map(url => 
                    `<img src="${sanitizeUrl(url)}" alt="${hotel.name}" crossorigin="anonymous">`
                ).join('');
                
                return `
                    <div class="hotel-glass">
                        <div class="hotel-photos-glass">
                            ${photoHtml || '<div style="background: rgba(255,255,255,0.2); grid-column: 1/-1;"></div>'}
                        </div>
                        <div class="hotel-info-glass">
                            <div class="hotel-city-glass">${hotel.city}</div>
                            <h3 class="hotel-name-glass">${hotel.name}</h3>
                            <div class="hotel-meta-glass">
                                <span>${getStars(hotel.stars)}</span>
                                <span>⭐ ${hotel.rating}</span>
                                <span>📍 ${hotel.distance}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            const prices = state.prices.map(price => `
                <div class="price-glass">
                    <div class="label">${price.label}</div>
                    <div class="value">${price.value}</div>
                </div>
            `).join('');
            
            const services = state.services.map(service => `
                <div class="service-glass">
                    <div class="icon">${service.icon}</div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            `).join('');
            
            const transfer = state.transfer.map(item => `
                <div class="transfer-item-glass">
                    <div class="icon">${item.icon}</div>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
            
            return `
                <div class="template-glass">
                    <div class="glass-header">
                        ${state.logo ? `<img src="${state.logo}" alt="Logo" class="logo" crossorigin="anonymous">` : ''}
                        <h1 class="brand-name">${state.brandName}</h1>
                        <p class="tagline">${state.tagline}</p>
                    </div>
                    
                    <div class="glass-title">
                        <h2 class="package-title">${state.packageTitle}</h2>
                        <p class="package-subtitle">${state.packageSubtitle}</p>
                    </div>
                    
                    <h3 class="section-heading-glass">Отели</h3>
                    <div class="hotels-glass">${hotels}</div>
                    
                    <h3 class="section-heading-glass">Цены</h3>
                    <div class="prices-glass">${prices}</div>
                    
                    <h3 class="section-heading-glass">Услуги</h3>
                    <div class="services-glass">${services}</div>
                </div>
            `;
        }






        
        function render() {
            const sheet = document.getElementById('previewSheet');
            
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
                // NEW: 4 additional templates
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
            }
        }
        
        // === EDITOR UI ===
        function renderHotelsList() {
            const list = document.getElementById('hotelsList');
            list.innerHTML = state.hotels.map((hotel, idx) => `
                <div class="list-item">
                    <div class="list-item-header">
                        <span class="list-item-title">Отель ${idx + 1}</span>
                        <button class="btn btn-icon btn-delete" onclick="removeHotel(${idx})">🗑️</button>
                    </div>
                    <div class="form-group">
                        <label>Город</label>
                        <input type="text" value="${hotel.city}" oninput="updateHotel(${idx}, 'city', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Название</label>
                        <input type="text" value="${hotel.name}" oninput="updateHotel(${idx}, 'name', this.value)">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Звёзды</label>
                            <input type="number" min="1" max="5" value="${hotel.stars}" oninput="updateHotel(${idx}, 'stars', parseInt(this.value))">
                        </div>
                        <div class="form-group">
                            <label>Рейтинг</label>
                            <input type="number" step="0.1" value="${hotel.rating}" oninput="updateHotel(${idx}, 'rating', parseFloat(this.value))">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Расстояние</label>
                        <input type="text" value="${hotel.distance}" oninput="updateHotel(${idx}, 'distance', this.value)">
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
        }
        
        function renderPricesList() {
            const list = document.getElementById('pricesList');
            list.innerHTML = state.prices.map((price, idx) => `
                <div class="list-item">
                    <div class="list-item-header">
                        <span class="list-item-title">Цена ${idx + 1}</span>
                        <button class="btn btn-icon btn-delete" onclick="removePrice(${idx})">🗑️</button>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Название</label>
                            <input type="text" value="${price.label}" oninput="updatePrice(${idx}, 'label', this.value)">
                        </div>
                        <div class="form-group">
                            <label>Стоимость</label>
                            <input type="text" value="${price.value}" oninput="updatePrice(${idx}, 'value', this.value)">
                        </div>
                    </div>
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
                        <input type="text" value="${service.icon}" oninput="updateService(${idx}, 'icon', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Название</label>
                        <input type="text" value="${service.title}" oninput="updateService(${idx}, 'title', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Описание</label>
                        <input type="text" value="${service.desc}" oninput="updateService(${idx}, 'desc', this.value)">
                    </div>
                </div>
            `).join('');
        }
        
        // NEW: Transfer List Renderer
        function renderTransferList() {
            const list = document.getElementById('transferList');
            list.innerHTML = state.transfer.map((item, idx) => `
                <div class="list-item">
                    <div class="list-item-header">
                        <span class="list-item-title">Трансфер ${idx + 1}</span>
                        <button class="btn btn-icon btn-delete" onclick="removeTransfer(${idx})">🗑️</button>
                    </div>
                    <div class="form-group">
                        <label>Иконка (emoji)</label>
                        <input type="text" value="${item.icon}" oninput="updateTransfer(${idx}, 'icon', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Название</label>
                        <input type="text" value="${item.title}" oninput="updateTransfer(${idx}, 'title', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Описание</label>
                        <input type="text" value="${item.desc}" oninput="updateTransfer(${idx}, 'desc', this.value)">
                    </div>
                </div>
            `).join('');
        }
        
        function updateHotel(idx, field, value) {
            state.hotels[idx][field] = value;
            render();
        }
        
        function updateHotelPhoto(idx, photoIdx, value) {
            state.hotels[idx].photos[photoIdx] = value;
            render();
        }
        
        function updatePrice(idx, field, value) {
            state.prices[idx][field] = value;
            render();
        }
        
        function updateService(idx, field, value) {
            state.services[idx][field] = value;
            render();
        }
        
        function removeHotel(idx) {
            state.hotels.splice(idx, 1);
            renderHotelsList();
            render();
        }
        
        function removePrice(idx) {
            state.prices.splice(idx, 1);
            renderPricesList();
            render();
        }
        
        function removeService(idx) {
            state.services.splice(idx, 1);
            renderServicesList();
            render();
        }
        
        // NEW: Transfer Update/Remove Functions
        function updateTransfer(idx, field, value) {
            state.transfer[idx][field] = value;
            render();
        }
        
        function removeTransfer(idx) {
            state.transfer.splice(idx, 1);
            renderTransferList();
            render();
        }
        
        // === PDF EXPORT ===
        // NEW: Updated to export as single long page in px units
        async function exportSinglePagePDF() {
            const overlay = document.getElementById('loadingOverlay');
            overlay.classList.add('active');
            
            try {
                // Дождаться загрузки шрифтов
                await document.fonts.ready;
                await new Promise(r => setTimeout(r, 500));
                
                const sheet = document.getElementById('previewSheet');
                const bg = getComputedStyle(sheet).backgroundColor || '#ffffff';
                
                // Создать canvas с html2canvas
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
                
                // КРИТИЧЕСКИ ВАЖНО: единицы px, формат = размер canvas
                // Это создаёт ОДИН лист произвольной высоты
                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'px',
                    format: [canvas.width, canvas.height],
                    compress: true,
                    hotfixes: []
                });
                
                // Вставить изображение один раз на позицию (0,0)
                pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
                
                // Сохранить файл
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
            // Branding inputs
            document.getElementById('brandName').addEventListener('input', (e) => {
                state.brandName = e.target.value;
                render();
            });
            
            document.getElementById('tagline').addEventListener('input', (e) => {
                state.tagline = e.target.value;
                render();
            });
            
            document.getElementById('packageTitle').addEventListener('input', (e) => {
                state.packageTitle = e.target.value;
                render();
            });
            
            document.getElementById('packageSubtitle').addEventListener('input', (e) => {
                state.packageSubtitle = e.target.value;
                render();
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
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            document.getElementById('logoRemove').addEventListener('click', () => {
                state.logo = null;
                document.getElementById('logoPreview').style.display = 'none';
                document.getElementById('logoInput').value = '';
                render();
            });
            
            // Template selector
            document.querySelectorAll('.template-card').forEach(card => {
                card.addEventListener('click', () => {
                    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    state.template = card.dataset.template;
                    render();
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
            });
            
            document.getElementById('addPrice').addEventListener('click', () => {
                state.prices.push({ label: 'Новая цена', value: '$0' });
                renderPricesList();
                render();
            });
            
            document.getElementById('addService').addEventListener('click', () => {
                state.services.push({ icon: '🎯', title: 'Новая услуга', desc: 'Описание' });
                renderServicesList();
                render();
            });
            
            // NEW: Add Transfer button handler
            document.getElementById('addTransfer').addEventListener('click', () => {
                state.transfer.push({ icon: '🚗', title: 'Новый трансфер', desc: 'Описание' });
                renderTransferList();
                render();
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
                            // NEW: Ensure transfer field exists for backward compatibility
                            if (!loaded.transfer) {
                                loaded.transfer = [];
                            }
                            state = { ...state, ...loaded };
                            
                            // Update form fields
                            document.getElementById('brandName').value = state.brandName;
                            document.getElementById('tagline').value = state.tagline;
                            document.getElementById('packageTitle').value = state.packageTitle;
                            document.getElementById('packageSubtitle').value = state.packageSubtitle;
                            
                            // Update template
                            document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
                            document.querySelector(`[data-template="${state.template}"]`).classList.add('active');
                            
                            // Update logo
                            if (state.logo) {
                                document.getElementById('logoPreview').style.display = 'flex';
                                document.getElementById('logoPreviewImg').src = state.logo;
                            }
                            
                            renderHotelsList();
                            renderPricesList();
                            renderServicesList();
                            renderTransferList(); // NEW
                            render();
                            
                            showToast('Конфигурация загружена', 'success');
                        } catch (err) {
                            showToast('Ошибка загрузки файла', 'error');
                        }
                    };
                    reader.readAsText(file);
                }
            });
            
            // Initial render
            renderHotelsList();
            renderPricesList();
            renderServicesList();
            renderTransferList(); // NEW
            render();
        });