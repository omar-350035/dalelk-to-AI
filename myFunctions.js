

// ✅ التحقق من النموذج في صفحة add_app.html
$(document).ready(function() {
  $("#appForm").submit(function(event) {
    event.preventDefault(); // منع الإرسال التلقائي

    // التقاط القيم
    const appName = $("#appName").val().trim();
    const companyName = $("#companyName").val().trim();
    const website = $("#website").val().trim();
    const isFree = $("#isFree").val();
    const category = $("#category").val();
    const description = $("#description").val().trim();

    // التحقق من اسم التطبيق (إنجليزي بدون فراغات)
    const nameRegex = /^[A-Za-z0-9]+$/;
    if (!nameRegex.test(appName)) {
      alert("يرجى إدخال اسم التطبيق باللغة الإنجليزية بدون فراغات.");
      return;
    }

    // التحقق من اسم الشركة (إنجليزي فقط)
    const companyRegex = /^[A-Za-z\s]+$/;
    if (!companyRegex.test(companyName)) {
      alert("يرجى إدخال اسم الشركة باللغة الإنجليزية فقط.");
      return;
    }

    // التحقق من صحة الرابط
    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*\/?$/;
    if (!urlRegex.test(website)) {
      alert("يرجى إدخال رابط صحيح للموقع الإلكتروني.");
      return;
    }

    // التحقق من بقية الحقول
    if (!isFree || !category || !description) {
      alert("يرجى تعبئة جميع الحقول المطلوبة.");
      return;
    }
// حفظ بيانات التطبيق في LocalStorage
const newApp = {
  name: appName,
  company: companyName,
  website: website,
  isFree: isFree,
  category: category,
  description: description
};

let apps = JSON.parse(localStorage.getItem("apps")) || [];
apps.push(newApp);
localStorage.setItem("apps", JSON.stringify(apps));



    // إذا كانت البيانات صحيحة، الانتقال إلى صفحة التطبيقات
    window.location.href = "apps.html";
  });
});

$(document).ready(function () {
  const apps = JSON.parse(localStorage.getItem("apps")) || [];

  apps.forEach(app => {
    const mainRow = `
      <tr>
        <td>${app.name}</td>
        <td>${app.company}</td>
        <td>${app.category}</td>
        <td>${app.isFree}</td>
        <td><button class="toggle-details">عرض التفاصيل</button></td>
      </tr>
    `;

    const detailsRow = `
      <tr class="details-row">
        <td colspan="5">
          <div class="details-content">
            <strong>عنوان الموقع الإلكتروني:</strong>
            <div><a href="${app.website}" target="_blank">${app.website}</a></div>
            <strong>شرح مختصر:</strong>
            <div class="short-desc">${app.description}</div>
            <br>
            
          </div>
        </td>
      </tr>
    `;

    $("#apps-table tbody").append(mainRow + detailsRow);
  });
});


    $(function () {
      // تهيئة أزرار التفاصيل
      $('.toggle-details').attr('aria-expanded', 'false');
    
      // نقر عادي: إظهار/إخفاء تفاصيل الصف التالي فقط
      $('.toggle-details').on('click', function (e) {
        const $btn = $(this);
        const $row = $btn.closest('tr').next('.details-row');
        const open = $row.is(':visible');
    
        if (open) {
          $row.slideUp(200);
          $btn.text('عرض التفاصيل').attr('aria-expanded', 'false');
        } else {
          $row.slideDown(200);
          $btn.text('إخفاء التفاصيل').attr('aria-expanded', 'true');
        }
      });
    
      // ضغط مطوّل (2 ثانية): استعراض سريع للتفاصيل ثم إغلاق تلقائي بعد 2 ثانية
      let holdTimer;
      $('.toggle-details')
        .on('mousedown touchstart', function () {
          const $btn = $(this);
          const $row = $btn.closest('tr').next('.details-row');
    
          holdTimer = setTimeout(function () {
            // إذا كانت مخفية، اعرضها مؤقتًا
            if (!$row.is(':visible')) {
              $row.stop(true, true).slideDown(150);
              $btn.text('إخفاء التفاصيل').attr('aria-expanded', 'true');
    
              // إغلاق تلقائي بعد ثانيتين
              setTimeout(function () {
                $row.slideUp(150);
                $btn.text('عرض التفاصيل').attr('aria-expanded', 'false');
              }, 2000);
            }
          }, 2000); // مدة الضغط المطوّل
        })
        .on('mouseup mouseleave touchend', function () {
          clearTimeout(holdTimer);
        });
    
      // إمكانية استخدام لوحة المفاتيح (Enter/Space)
      $('.toggle-details').attr('tabindex', '0').on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          $(this).trigger('click');
        }
      });
    });
    
