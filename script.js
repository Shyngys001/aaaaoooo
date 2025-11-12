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


        /* ====== HOTEL CATALOG (можно расширять) ====== */
const HOTELS_CATALOG = [
    {
      id: "fairmont",
      city: "Мекка",
      name: "Fairmont",
      stars: 5,
      rating: 9.2,
      distance: "300м от Харама",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/764178426.jpg?k=2a90a6ad1f8167cd8045a9e360c520148e91f5f0cad20b181300a709544fdb3c&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/764178438.jpg?k=73406437c802456186d8969f45bf6e31a6f0451559a5ca4742695ce85497796e&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/764178491.jpg?k=9d7f10cdfb8c9e613bf4502905ccbd5f69257d656a4fd60f9508ccd85a26e041&o="
      ]
    },
    {
      id: "swissotel-makkah",
      city: "Мекка",
      name: "Swissotel Makkah",
      stars: 5,
      rating: 9.0,
      distance: "200м от Харама",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/752196698.jpg?k=af0c15818df3ce1b93c879a65811b26d40b8e872612c1140d8a991d2a36ea267&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/752196867.jpg?k=e54df9c83cf2fe7b55e6c2573819ee871037c467b8f37e7b89b74e21ed8c9aa7&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/752195549.jpg?k=632f0e7aa190750612dae40e5a630770954d1610f93c7b5f74598a2a5f5deefd&o="
      ]
    },
    {
      id: "shohada",
      city: "Мекка",
      name: "Shohada",
      stars: 5,
      rating: 9.1,
      distance: "120м от Масджид ан-Набави",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/666168206.jpg?k=5f8dc2a307f8f153e104c03a3a2dc6b8611dbcca3987846426db3e1682a99f29&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/666168623.jpg?k=82abc89e24bed8356ec49305eb51917b61ba3d8fde0e9ed6d998fc4fa61d7875&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/745771699.jpg?k=64d3b984d1eaa6b5ff8159239683177f91cb85ba6443610d0d6a74d6f16b7edb&o="
      ]
    },
    {
      id: "courtyard-by-marriot",
      city: "Мекка",
      name: "Courtyard by Marriot",
      stars: 5,
      rating: 9.0,
      distance: "150м от Масджид ан-Набави",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/536428550.jpg?k=d8c4c353a2b9e4c157f96f12166bf5b124bca1cf10b78d1a6013d54d3479cb44&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/536428970.jpg?k=54df7c11f3243fa5907e682b0f53330b7a0de5b686f4c822a5c4466f96863230&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/498052247.jpg?k=4fb1ac5ee43a9d82f5c360031f78c8073cfdd349b27a3500f43f3de7502d83d1&o="
      ]
    },
    {
      id: "adress-jabal-omar",
      city: "Мекка",
      name: "Adress Jabal Omar",
      stars: 5,
      rating: 9.0,
      distance: "150м от Масджид ан-Набави",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/478051386.jpg?k=8395e89479512fb40aa70a15e388dd4add128d7f12160d430293069a9892a8e7&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/536428867.jpg?k=efade30011535460bc3663380c91b3c1d9308123b308c1ffaacfe41a3a8dcddf&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/478069271.jpg?k=8fe57f2b1d72a52d685b5ed27aafe7880d7c3f3c06cb978f153cc53e78cd8981&o="
      ]
    },
    {
      id: "saja-makkah",
      city: "Мекка",
      name: "Saja Makkah",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/536441362.jpg?k=d5ea120c3cc85aacb22c968d422fa883feda96a89eb984ece5fc9bfe2c98cfcc&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/531457092.jpg?k=cc39d4458109706f5c9461e5d0ac63daba5102e97385e59d11009ba1dc6025a3&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/587703140.jpg?k=165ac16a37a4ee3d7b67bcc7b72d4957ab49aefbe7d9d4a998ec78f2fa9f6c81&o="
      ]
    },
    {
      id: "le-meridien-towers-makkah",
      city: "Мекка",
      name: "Le Méridien Towers Makkah",
      stars: 5,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630021248.jpg?k=a86aa583150312edcd1f300287685618fd97fb9ed7abdc485560437b3bad5631&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630021274.jpg?k=a2c79fd88f8f9c12186ff5f38f81de59a988cdb84ce2066ee57d56e6cf79a879&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630021263.jpg?k=f9832af9c20594010576aafd43e1b7a6ccbbc6ad160f1764d7c42478476ce669&o="
    ]
    },
    {
      id: "emaar-elite-makkah",
      city: "Мекка",
      name: "Emaar Elite Makkah",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/574967045.jpg?k=42f84cef1488b4b446d82c7777b8b3bb6777d3a0f6ab889bf98edc4e7fca4236&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/574967053.jpg?k=aaa74304174b5041fc7b3c96a318b9190a78279b1b01a11570e005b4f29f3400&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/573191781.jpg?k=45d2958aaf7f0b5919df16341c09a02c4cfbcd0766b961e1fe01094b58af748c&o="
      ]
    },
    {
      id: "kudi-tower-makkah",
      city: "Мекка",
      name: "Kudi Tower Makkah",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/590845970.jpg?k=d9955871a38a018f502028a3adb71a2ff22bead30d0f9e8f3eb5e5fbf1ac9257&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/587485887.jpg?k=4410992df6aca7c5ad08868b03f61b0683f7868bcb2be1a7fea41225c488164b&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/587485948.jpg?k=49f24167afbd4eb45e62451c4e15244d78e3a08d7b7960ae9af620af0a9270f9&o="
      ]
    },
    
    // ======== Медина ========
    
    {
      id: "waqf-al-safi",
      city: "Медина",
      name: "Waqf Al Safi",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/192369485.jpg?k=50edd469e30a2321dbea8e9d4b6fd68c432728834324dabb55259dc422e7f9de&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/598780650.jpg?k=f1547e455dd23bba069a9f790d8f3495f386d75589941ce209725548c5027d7e&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/192970876.jpg?k=5dded56d92e3ae01cc95a3353f0c1f90625bbd2485e808de7dd05398124ca6cd&o="
      ]
    },
    {
      id: "worth-peninsula",
      city: "Медина",
      name: "Worth Peninsula",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/680693366.jpg?k=b96183cc5dbfd03066e7f9d8cc18edac86eb978896fcdd71b0d7a26067d4047c&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/645316559.jpg?k=5285080ba2c28ca72b2855bbd5350a25c76f59072e67214b83c190ec54ffebf2&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/645320730.jpg?k=e039b88b4ec37fc043d3212d5f8ea35dabafadf8168d14eff7d97dd41c6094cc&o="
      ]
    },
    {
      id: "emaar-royal-madinah",
      city: "Медина",
      name: "Emaar Royal Madinah",
      stars: 5,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/678861402.jpg?k=cf12e415bc21aaff87a597e205cefff21ef39ab85e275912912bf68e4145e183&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/691227799.jpg?k=55894e26b7d7536768ea44000ab16ee8029b88d8942378bf84dda947151e0576&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/678867539.jpg?k=2af835dd2c1f36b97bccc2e1e0f21380958686bb06f154f77116920137e1836b&o="
      ]
    },
    {
      id: "emaar-mektan",
      city: "Медина",
      name: "Emaar Mektan",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/738801950.jpg?k=5f099430cec0a4534cf14263223ed43a239374859f6cff13e137d3d8c3a4e387&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/739692730.jpg?k=39a122c69bd4987a43c8c7b264d0f7c606ab5e0a1abc79474aea33543fdb1664&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/739692686.jpg?k=d472671825ae9fda4571cc2c7b9efc5f4593c069a0d7eb5272a7b69d7f47fda9&o="
      ]
    },
    {
      id: "emaar-elite-madinah",
      city: "Медина",
      name: "Emaar Elite Madinah",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/739683059.jpg?k=3e66d97187c95f3fbc6a593c7614372cd4c051731e2823ace80635ea76128ccb&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/739683173.jpg?k=96af9f97a3b7c9accbc4a8b8fcb2e32db772272416e909d4e85fa8242d2dd7e2&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/739683044.jpg?k=d9f37a0c590209ae8c2db2217fcf3a4c065ed18198bb80fd7f13a0427cb2d071&o="
      ]
    },
    {
      id: "saraya-taba",
      city: "Медина",
      name: "Saraya Taba Hotel",
      stars: 3,
      rating: 8.8,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/353225738.jpg?k=f41a355786f60ebd724b4c6cf07fd03faa8fd0ccdbe7874ac2721bbd7208cd8d&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/337234378.jpg?k=e1e0d73d8b8dec3bfa8f7d6bb0e56fb0181e7f2c33b715ed6343ba466ffea0bc&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/20291833.jpg?k=134bc865776105645e0b6c5053caccf7160c13fcf5e89e27e6f51e8a9de960fe&o="
      ]
    },
    {
      id: "grand-al-safi-madinah",
      city: "Медина",
      name: "Grand Al Safi Madinah",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/333033035.jpg?k=b0019306d767aa2f4403d5c2176e4b947a076d9573cb260c4b343e3be8fef149&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/333033061.jpg?k=ac7d307a52f11769c04e95dc7ffa08ece6f9f86439cd29b879bce69ce384a080&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/383241948.jpg?k=7191fa3a6be1abbc5d5d77a309f17a9b23c14a939216782a67a6257c81273a2a&o="
      ]
    },
    {
      id: "vali-hotel-madinah",
      city: "Медина",
      name: "Vali Hotel Madinah",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/569223100.jpg?k=51c02e151a15fb9e11ea370feb761e4ad46c01a2a99ec50426e8a36a318d4130&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/472065943.jpg?k=80e24c08659742c45c5a9453c28478431e6eb40e421d4a7bb2a90dc0d1397856&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/472065261.jpg?k=0bbb90aef2e76f5af54bd8472ce7b47a47b839be6da59663d780d8b060b8269c&o="
      ]
    },
    {
      id: "nusl-al-hijr-madinah",
      city: "Медина",
      name: "Nusl Al Hijr Madinah",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/690134377.jpg?k=d001048dbc696206491cf2ff7ae0597de82962401de73d4a29fc76ccc922fc8e&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/430322085.jpg?k=1739224786e81630668866750d037c443576c457d574b32506b4705a6ba37829&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428224148.jpg?k=3196dbb261bb49144750f645f49ecbefbbe18501e07f6b51fee9b60456bdf067&o="
      ]
    },
    {
      id: "le-bosphorus-hotel-two",
      city: "Медина",
      name: "Le Bosphorus Hotel Two",
      stars: 4,
      rating: 9.0,
      distance: "",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/675545258.jpg?k=1c45915fd6e35a81d40ebce8f18987e3ffe911c308333b01475d8eb6091bb0b5&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/223630491.jpg?k=f308615c56a789a4c9a5754168556c3aaf8e08a1ac63f9e01306b52b963c8409&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/224785651.jpg?k=c9eac136b2d9f775e372206255f317981602045bb1a67ad0e3d6cd3772b0ee62&o="
      ]
    }
  ];
  
  /* === helpers === */
  function catalogFindById(id){ return HOTELS_CATALOG.find(h=>h.id===id)||null; }
  function catalogMatchByStateHotel(h){
    return HOTELS_CATALOG.find(x=>x.name===h.name && x.city===h.city) || null;
  }
  function buildHotelSelectOptionsHTML(){
    const byCity = HOTELS_CATALOG.reduce((a,h)=>((a[h.city]??=[]).push(h),a),{});
    let html = `<option value="__custom__">— Свой отель (ручной ввод)</option>`;
    Object.entries(byCity).forEach(([city,list])=>{
      html += `<optgroup label="${city}">` +
        list.map(h=>`<option value="${h.id}">${h.name}</option>`).join('') +
        `</optgroup>`;
    });
    return html;
  }
  function lockHotelInputs(itemEl, locked){
    itemEl.querySelectorAll('input[type="text"],input[type="number"],input[type="url"]')
      .forEach(inp => locked ? inp.setAttribute('readonly','readonly') : inp.removeAttribute('readonly'));
  }
  function applyPresetToState(idx, preset){
    if(!preset) return;
    state.hotels[idx] = {
      city: preset.city,
      name: preset.name,
      stars: preset.stars,
      rating: preset.rating,
      distance: preset.distance,
      photos: [...(preset.photos||[])]
    };
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
                        <h2 class="section-title">Отели</h2>
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
    <div class="list-item" data-hotel-item data-idx="${idx}">
      <div class="list-item-header">
        <span class="list-item-title">Отель ${idx + 1}</span>
        <button class="btn btn-icon btn-delete" onclick="removeHotel(${idx})">🗑️</button>
      </div>

      <!-- НОВОЕ: выбор из каталога -->
      <div class="form-group">
        <label>Выбрать из каталога</label>
        <select class="select hotel-select" data-select-idx="${idx}">
          ${buildHotelSelectOptionsHTML()}
        </select>
        <small class="muted">Выберите готовый отель или «Свой отель» для ручного ввода</small>
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

  // инициализация селектов: выбрать preset, повесить обработчики, заблокировать поля при пресете
  list.querySelectorAll('.hotel-select').forEach(sel => {
    const idx = Number(sel.dataset.selectIdx);
    const itemEl = list.querySelector(`[data-hotel-item][data-idx="${idx}"]`);
    const matched = catalogMatchByStateHotel(state.hotels[idx]);
    sel.value = matched ? matched.id : "__custom__";
    lockHotelInputs(itemEl, !!matched);

    sel.addEventListener('change', () => {
      const val = sel.value;
      if (val === "__custom__") {
        lockHotelInputs(itemEl, false);
        // не трогаем state — остаются пользовательские значения
      } else {
        const preset = catalogFindById(val);
        applyPresetToState(idx, preset);
        renderHotelsList(); // перерисуем карточку с заблокированными инпутами
        render();           // обновим превью
      }
    });
  });
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
                // по умолчанию пустая карточка (manual):
                state.hotels.push({
                  city: '',
                  name: '',
                  stars: 5,
                  rating: 9.0,
                  distance: '',
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