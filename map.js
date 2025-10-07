document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تهيئة الخريطة (Set up the map)
    const map = L.map('map').setView([27.0, 45.0], 4); // مركز عام على العالم العربي

    // 2. إضافة طبقة الخريطة الأساسية
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // 3. ربط الشريط الجانبي بعناصر HTML
    const sidebar = document.getElementById('sidebar');
    const profileContent = document.getElementById('profile-content');
    const closeButton = document.getElementById('close-sidebar');

    // إخفاء الشريط الجانبي عند النقر على زر الإغلاق
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('visible');
    });

    // 4. خوارزمية تحميل البيانات وعرضها (تم تعديل المسار هنا)
    fetch('/vbhbv/intellectuals.geojson') // ⚠️ عدل /vbhbv/ إلى اسم مستودعك إذا لزم الأمر
        .then(response => {
            // التحقق من حالة الرد (إذا كان 404، سيظهر خطأ في Console)
            if (!response.ok) {
                throw new Error('Failed to load GeoJSON: Status ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            
            L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    
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
                    
                    // ربط حدث النقر على كل أيقونة (Marker) لإظهار الشريط الجانبي
                    layer.on('click', function() {
                        displayProfile(feature.properties);
                    });
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error loading GeoJSON:', error)); // سيظهر أي خطأ هنا

    // 5. خوارزمية عرض التفاصيل في الشريط الجانبي
    function displayProfile(props) {
        profileContent.innerHTML = `
            <h2 class="text-xl font-weight-bold border-b pb-2 mb-3">${props.name}</h2>
            <p><strong>سنة الميلاد:</strong> ${props.birth_year}</p>
            <p><strong>المجال:</strong> ${props.field}</p>
            <p class="mt-4">
                <a href="${props.article_link}" target="_blank" style="color: #007bff; font-weight: bold;">
                    قراءة السيرة والمقالات الكاملة 🔗
                </a>
            </p>
        `;
        sidebar.classList.add('visible'); // إظهار الشريط الجانبي
    }

});
