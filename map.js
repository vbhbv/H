// map.js - الكود الأبسط للتشغيل
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تهيئة الخريطة وتحديد مركزها
    // إذا ظهرت الشاشة البيضاء هنا أيضاً، فالمشكلة في style.css
    const map = L.map('map').setView([27.0, 45.0], 4); 

    // 2. إضافة طبقة الخريطة الأساسية
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // ⚠️ تم إزالة كل أكواد الشريط الجانبي والـ fetch مؤقتاً
    
});
