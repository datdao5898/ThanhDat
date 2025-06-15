// JavaScript cho hiệu ứng cuộn mượt và animation fade-in
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling cho các liên kết điều hướng
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile nav if open
            const mobileNav = document.getElementById('mobile-nav-overlay');
            if (mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
                document.getElementById('hamburger-menu').classList.remove('open');
            }
        });
    });

    // Intersection Observer cho hiệu ứng fade-in khi cuộn
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Appear when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Xử lý form liên hệ (chỉ log ra console)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn chặn form gửi đi mặc định

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Lấy các dịch vụ đã chọn
        const selectedServices = Array.from(document.querySelectorAll('input[name="services[]"]:checked'))
            .map(checkbox => checkbox.value);

        // --- START: Simulate Backend Interaction (for demonstration only) ---
        console.log('--- Dữ liệu Form đã được gửi (Mô phỏng gửi tới Google Sheet) ---');
        console.log('Tên:', name);
        console.log('Email:', email);
        console.log('Dịch vụ quan tâm:', selectedServices.join(', ') || 'Không có dịch vụ nào được chọn');
        console.log('Tin nhắn:', message);
        console.log('--- Hết dữ liệu Form ---');

        // Trong một ứng dụng thực tế, bạn sẽ gửi dữ liệu này đến một backend endpoint.
        // Ví dụ:
        // fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
        //     method: 'POST',
        //     mode: 'no-cors', // Cần thiết cho Google Apps Script nếu không cấu hình CORS
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, email, selectedServices, message })
        // })
        // .then(response => { /* Xử lý phản hồi từ server */ })
        // .catch(error => { console.error('Lỗi khi gửi form:', error); });
        //
        // Để gửi email tự động, backend của bạn (ví dụ: Google Apps Script) sẽ sử dụng
        // dịch vụ gửi email (như GmailApp.sendEmail trong Apps Script hoặc SendGrid API).
        // --- END: Simulate Backend Interaction ---


        // Hiển thị thông báo thành công và thông tin thanh toán
        formMessage.innerHTML = `
                    <p class="text-xl text-white mb-2">Cảm ơn bạn, <span class="font-bold">${name}!</span></p>
                    <p class="text-gray-300 mb-4">Tôi đã nhận được yêu cầu của bạn và sẽ liên hệ lại qua email **${email}** sớm nhất có thể.</p>
                    <p class="text-lg text-blue-300 font-semibold mb-2">Thông tin tài khoản để thanh toán:</p>
                    <p class="text-white font-bold text-base">Ngân hàng: Techcombank</p>
                    <p class="text-white font-bold text-base">Số tài khoản: 1903xxxxxxxx</p>
                    <p class="text-white font-bold text-base">Chủ tài khoản: NGUYEN VAN A</p>
                    <p class="text-sm text-gray-400 mt-4">Vui lòng ghi rõ nội dung chuyển khoản: **Tên của bạn - Dịch vụ**.</p>
                `;
        formMessage.classList.remove('hidden');

        // Đặt lại form và bỏ chọn tất cả các checkbox
        contactForm.reset();
        document.querySelectorAll('input[name="services[]"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Cuộn lên đầu form để thấy thông báo
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Ẩn thông báo sau 10 giây (hoặc bạn có thể để vĩnh viễn cho đến khi người dùng tự tắt)
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 10000);
    });

    // Logic for cycling text in Hero Section and showing explanation modal
    const designStyles = [
        'Liquid Glass',
        'Minimalism',
        'Claymorphism',
        'Neo-brutalism',
        'Retro / Y2K',
        'Dark Mode + Neon',
        '3D Parallax & Motion'
    ];
    const designStyleExplanations = {
        'Liquid Glass': 'Hiệu ứng giao diện trong suốt, làm mờ nền, kết hợp đổ bóng và phản chiếu ánh sáng để tạo cảm giác giống thủy tinh lỏng, có chiều sâu và động.',
        'Minimalism': 'Phong cách thiết kế "ít là nhiều", tập trung vào sự tối giản, loại bỏ các yếu tố không cần thiết để làm nổi bật nội dung và tăng trải nghiệm người dùng.',
        'Claymorphism': 'Giao diện với các yếu tố có hình dạng mềm mại, bo tròn, kết hợp đổ bóng và màu sắc tươi sáng, tạo cảm giác như được làm từ đất sét, thân thiện và có chiều sâu 3D nhẹ.',
        'Neo-brutalism': 'Phong cách lấy cảm hứng từ kiến trúc Brutalism, nổi bật với sự thô mộc, typography táo bạo, màu sắc tương phản mạnh, và bố cục bất đối xứng, mang lại cảm giác mạnh mẽ và độc đáo.',
        'Retro / Y2K': 'Thiết kế gợi nhớ về cuối những năm 90 và đầu những năm 2000, sử dụng màu sắc tươi sáng, gradient, typography độc đáo, đồ họa pixelated và bố cục không truyền thống, mang lại cảm giác hoài cổ và lạc quan về công nghệ.',
        'Dark Mode + Neon': 'Kết hợp nền tối (thường là xám đậm hoặc đen) với các điểm nhấn màu neon rực rỡ, tạo ra giao diện hiện đại, giảm mỏi mắt và tăng tính thẩm mỹ, đặc biệt phù hợp với màn hình OLED.',
        '3D Parallax & Motion': 'Kỹ thuật thiết kế tạo chiều sâu và chuyển động bằng cách di chuyển các lớp nội dung ở tốc độ khác nhau khi cuộn trang, hoặc sử dụng các hiệu ứng 3D và chuyển động để làm cho website sống động và thu hút hơn.'
    };

    const heroBackgroundImages = {
        'Liquid Glass': 'asset/liquid.jpeg', // Abstract, liquid-like
        'Minimalism': 'asset/Minimalism.jpeg', // Clean, simple workspace
        'Claymorphism': 'asset/Claymorphism.jpeg', // Soft, abstract clay-like shapes
        'Neo-brutalism': 'asset/Neo-brutalism.jpeg', // Concrete texture, stark lines
        'Retro / Y2K': 'asset/RetroY2K.jpeg', // Retro tech, neon lights
        'Dark Mode + Neon': 'asset/DarkModeNeon.jpg', // Dark city with neon glow (reused for similar vibe)
        '3D Parallax & Motion': 'asset/3DParallaxMotion.jpeg' // Abstract 3D shapes/layers
    };


    let currentStyleIndex = 0;
    const designStyleTextElement = document.getElementById('design-style-text');
    const textStyle = document.querySelectorAll('.design-style-class'); // Use querySelectorAll to get a NodeList

    const heroBackgroundImageElement = document.getElementById('hero-background-image'); // Get the image element
    const modalOverlay = document.getElementById('style-explanation-modal');
    const modalAllStylesContent = document.getElementById('modal-all-styles-content');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function cycleDesignStyles() {
        // Remove previous animation class to reset
        designStyleTextElement.classList.remove('text-cycling-animation');
        // Force reflow to restart animation (hacky but effective)
        void designStyleTextElement.offsetWidth;
        designStyleTextElement.classList.add('text-cycling-animation');

        const newStyle = designStyles[currentStyleIndex];
        designStyleTextElement.textContent = newStyle;

        // Update background image with a brief fade out/in effect
        heroBackgroundImageElement.style.opacity = '0.1'; // Fade out slightly
        setTimeout(() => {
            heroBackgroundImageElement.src = heroBackgroundImages[newStyle];
            heroBackgroundImageElement.alt = `Background related to ${newStyle} design style`;
            heroBackgroundImageElement.style.opacity = '0.2'; // Fade back in to default opacity
        }, 300); // Small delay for fade effect

        currentStyleIndex = (currentStyleIndex + 1) % designStyles.length;
    }

    // Function to populate and show modal with all style explanations
    function populateAndShowAllStylesModal(highlightedStyleName = null) {
        // Clear previous content
        modalAllStylesContent.innerHTML = '';

        let orderedStyles = [...designStyles]; // Create a copy

        // If a style is highlighted, move it to the top
        if (highlightedStyleName && orderedStyles.includes(highlightedStyleName)) {
            const index = orderedStyles.indexOf(highlightedStyleName);
            if (index > -1) {
                orderedStyles.splice(index, 1); // Remove from current position
                orderedStyles.unshift(highlightedStyleName); // Add to the beginning
            }
        }

        // Add each style and its description
        orderedStyles.forEach(styleName => {
            const styleEntryDiv = document.createElement('div');
            // Add class for styling of each entry
            styleEntryDiv.classList.add('py-2', 'px-3', 'rounded-lg', 'transition-all', 'duration-300');

            const styleTitle = document.createElement('h4');
            styleTitle.className = 'text-xl font-semibold text-white mb-1';
            styleTitle.textContent = styleName;
            styleEntryDiv.appendChild(styleTitle);

            const styleDescription = document.createElement('p');
            styleDescription.className = 'text-gray-300 text-sm mb-4'; /* Slightly smaller text for descriptions */
            styleDescription.textContent = designStyleExplanations[styleName];
            styleEntryDiv.appendChild(styleDescription);

            // Apply highlight if this is the style that was clicked
            if (styleName === highlightedStyleName) {
                styleEntryDiv.classList.add('modal-style-highlight');
            }

            modalAllStylesContent.appendChild(styleEntryDiv);
        });

        modalOverlay.classList.add('show');
    }

    // Function to close explanation modal
    function closeModal() {
        modalOverlay.classList.remove('show');
    }

    // Event listener for clicking the design style text
    designStyleTextElement.addEventListener('click', () => {
        const currentlyDisplayedStyle = designStyleTextElement.textContent;
        populateAndShowAllStylesModal(currentlyDisplayedStyle);
    });

    // Event listener for clicking any element with the class 'design-style-class'
    textStyle.forEach(element => {
        element.addEventListener('click', () => {
            populateAndShowAllStylesModal();
        });
    });

    // Event listener for closing the modal
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) { // Close only when clicking on the overlay, not the content
            closeModal();
        }
    });

    // Initial display
    cycleDesignStyles();

    // Cycle every 3 seconds (3000ms)
    setInterval(cycleDesignStyles, 3000);

    // Logic to select checkbox when package button is clicked
    document.querySelectorAll('.select-package-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            // Prevent default anchor behavior for smooth scroll, as we'll handle it manually
            e.preventDefault();

            const packageName = this.dataset.package; // Get the package name from data-package attribute
            let checkboxId;

            // Map package names to checkbox IDs
            switch (packageName) {
                case 'Gói Website Cơ Bản':
                    checkboxId = 'service-web-co-ban';
                    break;
                case 'Gói Website Nâng Cao':
                    checkboxId = 'service-web-nang-cao';
                    break;
                case 'Gói Website Cao Cấp':
                    checkboxId = 'service-web-cao-cap';
                    break;
                case 'Gói Tối Ưu Hóa SEO':
                    checkboxId = 'service-toi-uu-seo';
                    break;
                case 'Gói Cập Nhật Bảo Trì Trang Web':
                    checkboxId = 'service-bao-tri';
                    break;
                case 'Gói Tối Ưu Hóa Tốc Độ':
                    checkboxId = 'service-toi-uu-toc-do';
                    break;
                default:
                    checkboxId = null;
            }

            if (checkboxId) {
                const checkbox = document.getElementById(checkboxId);
                if (checkbox) {
                    checkbox.checked = true; // Check the corresponding checkbox
                }
            }

            // Smooth scroll to the contact section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hamburger menu toggle logic
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    hamburgerMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.toggle('open');
        // Optional: Add/remove class to hamburger icon for animation (e.g., transform to 'X')
        hamburgerMenu.classList.toggle('is-active');
    });

    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close the mobile nav when a link is clicked
            mobileNavOverlay.classList.remove('open');
            hamburgerMenu.classList.remove('is-active'); // Ensure hamburger icon resets
        });
    });

    // Optional: Animate hamburger icon (add this to your CSS if you want 'X' animation)
    /*
    .hamburger-menu.is-active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    .hamburger-menu.is-active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger-menu.is-active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    */

    // Modal logic for "Khám phá các loại website tôi thiết kế" button
    const showCategoriesBtn = document.querySelector('.categories-web'); // Use querySelector to get the first element
    const categoriesModal = document.getElementById('categories-modal');
    const closeCategoriesModalBtn = document.getElementById('close-categories-modal-btn');

    if (showCategoriesBtn) {
        showCategoriesBtn.addEventListener('click', () => {
            categoriesModal.classList.add('show');
        });
    }

    if (closeCategoriesModalBtn) {
        closeCategoriesModalBtn.addEventListener('click', () => {
            categoriesModal.classList.remove('show');
        });
    }

    if (categoriesModal) {
        categoriesModal.addEventListener('click', (e) => {
            if (e.target === categoriesModal) { // Close only when clicking on the overlay, not the content
                categoriesModal.classList.remove('show');
            }
        });
    }
});
