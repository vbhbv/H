document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تهيئة الخريطة (Set up the map)
    const map = L.map('map').setView([27.0, 45.0], 4); // مركز عام على العالم العربي

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // 2. ربط الشريط الجانبي بعناصر HTML
    const sidebar = document.getElementById('sidebar');
    const profileContent = document.getElementById('profile-content');
    const closeButton = document.getElementById('close-sidebar');

    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('visible');
    });

    // 3. خوارزمية تحميل البيانات وعرضها
    fetch('intellectuals.geojson')
        .then(response => response.json())
        .then(data => {
            
            L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    // ربط حدث النقر على كل أيقونة (Marker)
                    layer.on('click', function() {
                        displayProfile(feature.properties);
                    });
                    
                    // النافذة المنبثقة الأساسية (Popup)
                    const popupHTML = `
                        <div class="intellectual-popup">
                            <h3>${feature.properties.name}</h3>
                            <p>المجال: ${feature.properties.field}</p>
                            <a href="${feature.properties.article_link}" target="_blank">
                                عرض المقال الشخصي ↗
                            </a>
                        </div>
                    `;
                    layer.bindPopup(popupHTML);
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error loading GeoJSON:', error));

    // 4. خوارزمية عرض التفاصيل في الشريط الجانبي
    function displayProfile(props) {
        // يمكنك هنا بناء محتوى أكثر تفصيلاً للشريط الجانبي بدلاً من النافذة المنبثقة
        profileContent.innerHTML = `
            <h2 class="text-xl font-bold border-b pb-2 mb-3">${props.name}</h2>
            <p><strong>سنة الميلاد:</strong> ${props.birth_year}</p>
            <p><strong>المجال:</strong> ${props.field}</p>
            <p class="mt-4"><a href="${props.article_link}" target="_blank" style="color: #007bff; font-weight: bold;">
                قراءة السيرة والمقالات الكاملة 🔗
            </a></p>
            
            `;
        sidebar.classList.add('visible'); // إظهار الشريط الجانبي
    }

});
