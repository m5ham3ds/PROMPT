document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const searchToggle = document.getElementById("searchToggle");
  const searchBox = document.getElementById("searchBox");
  const burger = document.getElementById("burger");
  const navList = document.querySelector(".nav ul");
  const iconsContainer = document.querySelector(".icons");


  // ===== تبديل الثيم (الفاتح/الداكن) =====
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const icon = themeToggle.querySelector("i");
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

  // ===== تبديل اللغة (العربية/الإنجليزية) =====
  const translations = {
    ar: {
      siteName: "موقعي",
      nav: ["الصفحة الرئيسية", "خدماتنا", "المدونة", "من نحن", "اتصل بنا"],
      searchPlaceholder: "ابحث هنا...",
      langIcon: "fa-globe"
    },
    en: {
      siteName: "MySite",
      nav: ["Home", "Services", "Blog", "About", "Contact"],
      searchPlaceholder: "Search...",
      langIcon: "fa-flag-usa"
    }
  };

  langToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const currentLang = html.lang === "ar" ? "ar" : "en";
    const newLang = currentLang === "ar" ? "en" : "ar";
    
    html.lang = newLang;
    html.dir = newLang === "ar" ? "rtl" : "ltr";

    const t = translations[newLang];
    document.querySelector(".site-name").textContent = t.siteName;
    
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item, index) => {
      const textElement = item.querySelector(".nav-text");
      if (textElement) textElement.textContent = t.nav[index];
    });

    searchBox.querySelector("input").placeholder = t.searchPlaceholder;
    
    const langIcon = langToggle.querySelector("i");
    langIcon.className = `fas ${t.langIcon}`;
  });

  // ===== القائمة الجانبية (Side Menu) =====
  (function(){
    const items = Array.from(document.querySelectorAll('.menu-item'));

    items.forEach((btn) => {
      btn.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        btn.classList.add('active');
        handleMenuAction(btn.dataset.key);
      });

      btn.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          btn.click();
        }
      });
    });

    document.addEventListener('keydown', (ev) => {
      const active = document.activeElement;
      const idx = items.indexOf(active);
      if (idx !== -1) {
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
          ev.preventDefault();
          const next = items[(idx + 1) % items.length];
          next.focus();
        } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
          ev.preventDefault();
          const prev = items[(idx - 1 + items.length) % items.length];
          prev.focus();
        }
      }
    });

    items.forEach(it => it.setAttribute('tabindex', '0'));
  })();

  // ===== البحث التفاعلي في الهيدر (نسخة محسّنة) =====
  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // منع إغلاق النافذة فورًا
    iconsContainer.classList.toggle("search-active");
    
    if (iconsContainer.classList.contains("search-active")) {
      searchBox.querySelector("input").focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!iconsContainer.contains(e.target)) {
      iconsContainer.classList.remove("search-active");
    }
  });

  // ===== قائمة البرجر (للموبايل) =====
  burger.addEventListener("click", () => {
    navList.classList.toggle("open");
    burger.classList.toggle("active");
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      burger.classList.remove("active");
    });
  });

  // ===== وظائف أخرى =====
  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", function() {
      document.querySelectorAll(".nav-item").forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelector(".hero .cta-button").addEventListener("click", function() {
    console.log("تم النقر على زر البدء");
  });

  let lastScrollTop = 0;
  window.addEventListener("scroll", function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector(".header");
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);

  // ===== وظائف العرض السريع والمفضلة =====
  (function() {
    const productsData = {
      1: { name: "جاكيت جلد أسود", price: "1,250 ر.س", image: "https://picsum.photos/seed/product1-jacket/600/800.jpg" },
      2: { name: "فستان صيفي", price: "450 ر.س", image: "https://picsum.photos/seed/product2-dress/600/800.jpg" },
      3: { name: "أحذية كلاسيكية", price: "890 ر.س", image: "https://picsum.photos/seed/product3-shoes/600/800.jpg" },
      4: { name: "ساعة ذهبية", price: "3,500 ر.س", image: "https://picsum.photos/seed/product4-watch/600/800.jpg" },
    };

    const modal = document.getElementById('quickViewModal');
    const closeModalBtn = document.getElementById('closeModal');

    // --- Quick View Modal ---
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = btn.closest('.product-card');
        const productId = productCard.dataset.productId;
        const product = productsData[productId];

        if (product) {
          document.getElementById('modalImage').src = product.image;
          document.getElementById('modalTitle').textContent = product.name;
          document.getElementById('modalPrice').textContent = product.price;
          modal.classList.add('show');
        }
      });
    });

    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });

    // --- Wishlist ---
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    function updateWishlistUI() {
      document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = btn.closest('.product-card').dataset.productId;
        if (wishlist.includes(productId)) {
          btn.classList.add('active');
          btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
          btn.classList.remove('active');
          btn.innerHTML = '<i class="far fa-heart"></i>';
        }
      });
    }

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = btn.closest('.product-card').dataset.productId;
        const index = wishlist.indexOf(productId);

        if (index > -1) {
          wishlist.splice(index, 1);
        } else {
          wishlist.push(productId);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
      });
    });

    updateWishlistUI();
  })();

  // ===== نافذة البحث الشفافة (Overlay) =====
  (function() {
    const searchOverlay = document.getElementById('searchOverlay');
    const overlaySearchInput = document.getElementById('overlaySearchInput');
    const closeSearchOverlay = document.getElementById('closeSearchOverlay');
    const sideMenuSearchBtn = document.querySelector('.menu-item[data-key="search"]');

    sideMenuSearchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('show');
      overlaySearchInput.focus();
    });

    closeSearchOverlay.addEventListener('click', () => {
      searchOverlay.classList.remove('show');
    });

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('show');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('show')) {
        searchOverlay.classList.remove('show');
      }
    });
  })();

  // ===== وظيفة النشرة البريدية =====
  document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const messageEl = document.getElementById('newsletterMessage');
    
    messageEl.textContent = `شكرًا لاشتراكك بـ ${email}! ستصلك رسالة التأكيد قريبًا.`;
    messageEl.classList.add('show');
    messageEl.style.color = '#28a745';
    
    this.reset();
    
    setTimeout(() => {
      messageEl.classList.remove('show');
    }, 5000);
  });

document.addEventListener('DOMContentLoaded', function() {

  // ===== عدادات الأرقام المتحركة =====
  const statNumbers = document.querySelectorAll('.stat-number');
  const speed = 200; // سرعة العد (كلما زاد الرقم، قلت السرعة)

  const startCounting = (stat) => {
    const target = +stat.getAttribute('data-target');
    const count = +stat.innerText;
    const increment = target / speed;

    const updateCount = () => {
      const currentCount = +stat.innerText;
      if (currentCount < target) {
        stat.innerText = Math.ceil(currentCount + increment);
        setTimeout(updateCount, 10);
      } else {
        stat.innerText = target;
      }
    };
    updateCount();
  };

  // استخدام Intersection Observer لتشغيل العد عند رؤية العنصر
  const observerOptions = {
    threshold: 0.7 // يبدأ العد عندما يظهر 70% من العنصر
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target); // إيقاف المراقبة بعد بدء العد مرة واحدة
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });

});

// ===== زر العودة للأعلى =====
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== تحديث نموذج النشرة البريدية في الفوتر =====
document.getElementById('footerNewsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  
  // يمكنك إضافة رسالة نجاح بسيطة أو استخدام alert
  alert(`شكرًا لاشتراكك بـ ${email}! ستصلك رسالة التأكيد قريبًا.`);
  
  this.reset();
});

document.addEventListener('DOMContentLoaded', function() {

  // ===== معرض الصور =====
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      mainImage.src = this.src;
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ===== محدد المقاس =====
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ===== محدد الكمية =====
  const decreaseBtn = document.getElementById('decreaseQty');
  const increaseBtn = document.getElementById('increaseQty');
  const quantityInput = document.getElementById('quantity');

  decreaseBtn.addEventListener('click', () => {
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });

  increaseBtn.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  // ===== تبويبات التفاصيل =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

});

document.addEventListener('DOMContentLoaded', function() {

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    // الحصول على بيانات النموذج
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // التحقق البسيط من الحقول (لأنها required في HTML)
    if (!name || !email || !subject || !message) {
      showMessage('يرجى ملء جميع الحقول.', 'error');
      return;
    }

    // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم (Server) باستخدام Fetch API
    // هذا مجرد محاكاة لإرسال النموذج
    console.log('بيانات النموذج:', { name, email, subject, message });

    // عرض رسالة نجاح
    showMessage(`شكرًا لك ${name}! تم استلام رسالتك وسنرد عليك قريبًا.`, 'success');

    // إعادة تعيين النموذج
    contactForm.reset();
  });

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type} show`;

    // إخفاء الرسالة بعد 5 ثوانٍ
    setTimeout(() => {
      formMessage.classList.remove('show');
    }, 5000);
  }

});

document.addEventListener('DOMContentLoaded', function() {

  // بيانات وهمية للمقالات
  const allPosts = [
    { id: 1, title: 'كيف تبني علامة تجارية قوية؟', excerpt: 'بناء علامة تجارية يتطلب أكثر من مجرد شعار جذاب. إنه يتعلق ببناء الثقة والولاء.', category: 'business', author: 'أحمد علي', date: '2023-10-10', readTime: '5 دقائق', image: 'branding' },
    { id: 2, title: 'أهمية تجربة المستخدم في نجاح المنتج', excerpt: 'تجربة المستخدم (UX) هي العامل الحاسم الذي يميز المنتجات الناجحة عن الفاشلة.', category: 'design', author: 'سارة أحمد', date: '2023-10-08', readTime: '7 دقائق', image: 'ux-design' },
    { id: 3, title: '10 أدوات لا غنى عنها للمصممين', excerpt: 'مجموعة من الأدوات التي ستساعدك على زيادة إنتاجيتك وتحسين جودة عملك.', category: 'design', author: 'خالد سعيد', date: '2023-10-05', readTime: '4 دقائق', image: 'design-tools' },
    { id: 4, title: 'مستقبل الذكاء الاصطناعي في التجارة الإلكترونية', excerpt: 'كيف يغير الذكاء الاصطناعي طريقة تسوقنا عبر الإنترنت وما الذي ينتظرنا في المستقبل.', category: 'tech', author: 'نورا حسن', date: '2023-10-01', readTime: '6 دقائق', image: 'ai-ecommerce' },
    { id: 5, title: 'استراتيجيات التسويق الرقمي لعام 2024', excerpt: 'استكشف أحدث استراتيجيات التسويق الرقمي التي يجب أن تتبناها لتظل في المنافسة.', category: 'business', author: 'أحمد علي', date: '2023-09-28', readTime: '8 دقائق', image: 'marketing-strategy' },
    { id: 6, title: 'مبادئ التصميم المرئي الأساسية', excerpt: 'تعلم المبادئ الأساسية للتصميم المرئي التي ستساعدك على إنشاء تصاميم جذابة وفعالة.', category: 'design', author: 'سارة أحمد', date: '2023-09-25', readTime: '5 دقائق', image: 'visual-design' },
    { id: 7, title: 'أمان البيانات: لماذا هو مهم لعملك؟', excerpt: 'حماية بيانات عملائك ليست مجرد التزام قانوني، بل هي جزء أساسي من بناء الثقة.', category: 'tech', author: 'خالد سعيد', date: '2023-09-22', readTime: '6 دقائق', image: 'data-security' },
    { id: 8, title: 'فن كتابة المحتوى الذي يجذب القراء', excerpt: 'نصائح وحيل لكتابة محتوى مقنع ومشوق يبقي القراء مهتمين ويرغبون في المزيد.', category: 'business', author: 'نورا حسن', date: '2023-09-20', readTime: '7 دقائق', image: 'content-writing' },
  ];

  const blogGrid = document.querySelector('.blog-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const sidebarSearchForm = document.getElementById('sidebarSearchForm');
  const sidebarSearchInput = document.getElementById('sidebarSearchInput');

  let currentFilter = 'all';
  let postsToShow = 6; // عدد المقالات المعروضة في البداية
  let filteredPosts = [...allPosts];

  // دالة لإنشاء بطاقة مقال
  function createPostCard(post) {
    return `
      <article class="blog-card" data-category="${post.category}">
        <img src="https://picsum.photos/seed/${post.image}/400/250.jpg" alt="${post.title}">
        <div class="blog-card-body">
          <div class="post-meta">
            <span class="post-category">${getCategoryName(post.category)}</span>
            <span class="post-date">${formatDate(post.date)}</span>
          </div>
          <h3><a href="#">${post.title}</a></h3>
          <p>${post.excerpt}</p>
          <div class="blog-card-footer">
            <div class="author">
              <img src="https://i.pravatar.cc/150?u=${post.author}" alt="${post.author}">
              <span>${post.author}</span>
            </div>
            <span class="read-time">${post.readTime}</span>
          </div>
        </div>
      </article>
    `;
  }

  // دالة لعرض المقالات
  function renderPosts() {
    const postsToRender = filteredPosts.slice(0, postsToShow);
    blogGrid.innerHTML = postsToRender.map(post => createPostCard(post)).join('');

    if (postsToShow >= filteredPosts.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }

  // دالة التصفية
  function filterPosts(category) {
    currentFilter = category;
    if (category === 'all') {
      filteredPosts = [...allPosts];
    } else {
      filteredPosts = allPosts.filter(post => post.category === category);
    }
    postsToShow = 6; // إعادة تعيين العدد عند التصفية
    renderPosts();
  }

  // مستمعو الأحداث لأزرار التصفية
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPosts(btn.dataset.filter);
    });
  });

  // مستمع حدث زر "تحميل المزيد"
  loadMoreBtn.addEventListener('click', () => {
    postsToShow += 3;
    renderPosts();
  });

  // مستمع حدث البحث في الشريط الجانبي
  sidebarSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = sidebarSearchInput.value.toLowerCase();
    if (searchTerm) {
      filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.excerpt.toLowerCase().includes(searchTerm)
      );
    } else {
      filteredPosts = [...allPosts];
    }
    postsToShow = 6;
    renderPosts();
  });

  // دوال مساعدة
  function getCategoryName(category) {
    const names = { design: 'تصميم', tech: 'تقنية', business: 'أعمال' };
    return names[category] || category;
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  }

  // العرض الأولي
  renderPosts();

});

  // ===== وظائف القائمة الجانبية (مثال) =====
  function handleMenuAction(action) {
    console.log(`تم تفعيل الإجراء: ${action}`);
    switch(action) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'search':
        // تم نقله إلى وظيفة Overlay
        break;
      case 'about':
        alert('صفحة "من نحن" (وظيفة وهمية)');
        break;
      default:
        console.log('إجراء غير معروف:', action);
    }
  }
});