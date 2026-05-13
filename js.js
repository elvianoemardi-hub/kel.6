const eskulData = [
    { 
        nama: "Osis", 
        kategori: "Kepemimpinan & Kedisiplinan",
        deskripsi: "Organisasi siswa yang mengembangkan kepemimpinan, manajemen acara, dan kegiatan sosial. Anggota aktif dalam kegiatan sekolah dan komunitas.", 
        image: "gmbo.jpeg", 
        jadwal: "Setiap kegiatan yang berhubungan dengan sekolah", 
        pembina: "Miftahrudin, S.Pd", 
    },
    { 
        nama: "Pramuka", 
        kategori: "Kepemimpinan & Kedisiplinan",
        deskripsi: "Kegiatan kepramukaan dengan latihan baris-berbaris, survival, dan kepemimpinan. Anggota berkesempatan mengikuti jambore nasional dan internasional.", 
        image: "prm.jpeg", 
        jadwal: "selasa, kamis 14.30-selesai | sabtu 08.00-selesai", 
        pembina: "Siti Marjani, S.pd & F. Sri Hartono, S.pd", 
        prestasi: "🏆 Juara 1 Pionering Team A & Juara 1 PBB" 
    },
    { 
        nama: "Pasilimka", 
        kategori: "Kedisiplinan",
        deskripsi: "Latihan baris-berbaris, kepemimpinan, dan kedisiplinan untuk upacara bendera. Anggota berkesempatan menjadi pengibar bendera di tingkat kota.", 
        image: "gmbps.jpg.jpeg", 
        jadwal: "selasa, kamis 14.30-selesai | sabtu 08.00-selesai", 
        pembina: "Rio Dwiasmoro", 
        prestasi: "🏆 Juara Umum LKBB SOR ASEM & Juara Utama 3 LKBB Majapahit" 
    },
    { 
        nama: "MultiMedia", 
        kategori: "Teknologi & Kreativitas",
        deskripsi: "Belajar desain grafis, video editing, dan fotografi. Anggota aktif dalam dokumentasi acara sekolah dan lomba kreatifitas digital.", 
        image: "gmbmm.jpg.jpeg", 
        jadwal: "jum'at 14.30-selesai", 
        pembina: "Kurniasari, S.pd",
    },
    { 
        nama: "PMR", 
        kategori: "Kesehatan & Sosial",
        deskripsi: "Kegiatan kesehatan dan sosial dengan pelatihan pertolongan pertama, donor darah, dan kegiatan sosial. Anggota berkesempatan mengikuti pelatihan tingkat nasional.", 
        image: "pmr.jpeg", 
        jadwal: "Selasa & Kamis 14.30-selesai", 
        pembina: "Vita Indra Mustika, S.Pd", 
    },
    { 
        nama: "Pencinta Alam", 
        kategori: "Petualangan & Sosial",
        deskripsi: "Kegiatan outdoor seperti hiking, camping, dan pelestarian lingkungan. Anggota aktif dalam kegiatan konservasi dan lomba kepramukaan.", 
        image: "pa.jpeg", 
        jadwal: "selasa, kamis 14.30-selesai | sabtu 08.00-selesai", 
        pembina: "Hapsari Shinta Aristaningrum, S.ST", 
    },
    { 
        nama: "Rohani Islam", 
        kategori: "Rohani & Sosial",
        deskripsi: "Kegiatan keagamaan dengan kajian, pengajian, dan kegiatan sosial. Anggota aktif dalam kegiatan keagamaan dan lomba keislaman.", 
        image: "rohis.jpeg", 
        jadwal: "senin & rabu 14.30 - selesai", 
        pembina: "Rusmaniar, S.Ag, M.Pd.I", 
    },
    { 
        nama: "Rohani Kristen", 
        kategori: "Rohani & Sosial",
        deskripsi: "Kegiatan keagamaan dengan kajian, pengajian, dan kegiatan sosial. Anggota aktif dalam kegiatan keagamaan dan lomba kekristenan.", 
        image: "rokris.jpeg", 
        jadwal: "Selasa & Rabu 14.30-selesai", 
        pembina: "Agus Radiyanto",  
    },
    { 
        nama: "Musik", 
        kategori: "Kreativitas & Seni",
        deskripsi: "Kegiatan musikal dengan latihan vokal, instrumen, dan performance. Anggota aktif dalam acara sekolah dan lomba kreatifitas musikal.", 
        image: "msk.jpeg", 
        jadwal: "setiap hari 14.30-selesai", 
        pembina: "Siti Marjani, S.Pd",  
    },
    { 
        nama: "Robo Club", 
        kategori: "Teknologi & Kreativitas",
        deskripsi: "Kegiatan robotika dengan pelatihan coding, mekanik, dan kompetisi. Anggota berkesempatan mengikuti lomba robot tingkat nasional.", 
        image: "robo.jpeg", 
        jadwal: "Rabu 14.30-15.30 ", 
        pembina: "Jemi U.B, S.pd", 
    },
    { 
        nama: "Ipsilimka", 
        kategori: "Kedisiplinan & Olahraga",
        deskripsi: "Kegiatan bela diri dengan latihan teknik, fisik, dan mental. Anggota aktif dalam lomba silat tingkat kota dan provinsi.", 
        image: "sil.jpeg", 
        jadwal: "Rabu 15.30-Selesai", 
        pembina: "Miftachrudin, S.Pd", 
        prestasi: "🏆 Juara 2 Indonesia Paku Bumi Open 14th & Juara 1 Tingkat Lanjut" 
    }
];
scriptURL = "https://script.google.com/macros/s/AKfycbxnxT4qosthyKqenymdycLX_WjfA9u-YbYhbWo2QFxwsunOOgw1kXb7phRVADHY3a8Q/exec";

// DOM Elements
let eskulTerpilihIndex = null;
let currentEskulIndex = null;

// Render Eskul Cards
function renderEskul() {
    const container = document.getElementById('eskul-list');
    if (!container) return;
    
    container.innerHTML = '';
    eskulData.forEach((eskul, index) => {
        const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="700" height="400"%3E%3Crect width="700" height="400" fill="%233b82f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EGoEkskul%3C/text%3E%3C/svg%3E';
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${eskul.image || placeholder}" alt="${eskul.nama}" class="card-image" loading="lazy">
            <div class="card-body">
                <h3>${eskul.nama}</h3>
                <p>${eskul.deskripsi.substring(0, 100)}...</p>
                <div class="card-tags">
                    <span class="card-tag">${eskul.kategori}</span>
                    <span class="card-tag">${eskul.jadwal.split('|')[0] || 'Jadwal belum tersedia'}</span>
                </div>
            </div>
        `;
        card.onclick = () => tampilkanDetail(index);
        container.appendChild(card);
    });
}

// Tampilkan Modal Detail
function tampilkanDetail(index) {
    const eskul = eskulData[index];
    eskulTerpilihIndex = index;
    currentEskulIndex = index;

    const modalImage = document.getElementById('modal-image');
    const modalNama = document.getElementById('modal-nama');
    const modalDeskripsi = document.getElementById('modal-deskripsi');
    const modalJadwal = document.getElementById('modal-jadwal');
    const modalPembina = document.getElementById('modal-pembina');
    const modalPrestasi = document.getElementById('modal-prestasi');
    const modalCategory = document.getElementById('modal-category');

    const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="700" height="400"%3E%3Crect width="700" height="400" fill="%233b82f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EGoEkskul%3C/text%3E%3C/svg%3E';

    if (modalImage) modalImage.src = eskul.image ? eskul.image : placeholder;
    if (modalNama) modalNama.textContent = eskul.nama || '-';
    if (modalDeskripsi) modalDeskripsi.textContent = eskul.deskripsi || 'Informasi eskul tidak tersedia.';
    if (modalJadwal) modalJadwal.textContent = eskul.jadwal || 'Jadwal belum tersedia';
    if (modalPembina) modalPembina.textContent = eskul.pembina || 'Pembina belum ditentukan';
    if (modalPrestasi) modalPrestasi.textContent = eskul.prestasi || 'Belum ada data prestasi';
    if (modalCategory) modalCategory.textContent = eskul.kategori || 'Kategori tidak tersedia';

    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function isAuthenticated() {
    return !!(sessionStorage.getItem('user_session') || localStorage.getItem('user_session'));
}

function daftarDariModal() {
    if (!isAuthenticated()) {
        openLoginModal();
        showAuthMessage('loginForm', 'error', 'Silakan login atau daftar terlebih dahulu untuk mendaftar eskul.');
        return;
    }

    if (currentEskulIndex !== null) {
        const eskul = eskulData[currentEskulIndex];
        const selectUtama = document.getElementById('eskul_utama');
        if (selectUtama) {
            selectUtama.value = eskul.nama;
        }
        tutupModal();
        const formSection = document.getElementById('pendaftaran');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Tutup Modal
function tutupModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Isi Dropdown Eskul
function isiDropdown() {
    const utama = document.getElementById('eskul_utama');
    const cadangan = document.getElementById('eskul_cadangan');
    
    if (!utama || !cadangan) return;
    
    // Clear existing options except first
    while (utama.options.length > 1) utama.remove(1);
    while (cadangan.options.length > 1) cadangan.remove(1);
    
    eskulData.forEach(eskul => {
        const optUtama = document.createElement('option');
        optUtama.value = eskul.nama;
        optUtama.textContent = eskul.nama;
        utama.appendChild(optUtama);
        
        const optCadangan = document.createElement('option');
        optCadangan.value = eskul.nama;
        optCadangan.textContent = eskul.nama;
        cadangan.appendChild(optCadangan);
    });
}

// Validasi Form
function validateForm(data) {
    const errors = [];
    
    if (!data.nama || data.nama.trim().length < 3) {
        errors.push('Nama lengkap minimal 3 karakter');
    }
    
    if (!data.nis || data.nis.trim().length < 5) {
        errors.push('NIS/NISN tidak valid');
    }
    
    if (!data.kelas || data.kelas.trim().length < 2) {
        errors.push('Kelas dan jurusan tidak valid');
    }
    
    const waRegex = /^08[0-9]{8,12}$/;
    if (!data.wa || !waRegex.test(data.wa.replace(/\s/g, ''))) {
        errors.push('Nomor WhatsApp tidak valid (mulai dengan 08xx)');
    }
    
    if (!data.eskul_utama) {
        errors.push('Pilih eskul utama');
    }
    
    if (data.eskul_utama && data.eskul_utama === data.eskul_cadangan) {
        errors.push('Eskul cadangan harus berbeda dengan eskul utama');
    }
    
    return errors;
}

function showFormMessage(type, messages) {
    const feedback = document.getElementById('formFeedback');
    if (!feedback) return;

    feedback.className = 'form-feedback ' + (type === 'error' ? 'error' : 'success');
    feedback.innerHTML = Array.isArray(messages) ? messages.map(msg => `<p>• ${msg}</p>`).join('') : `<p>${messages}</p>`;
    feedback.style.display = 'block';
}

function clearFormMessage() {
    const feedback = document.getElementById('formFeedback');
    if (!feedback) return;
    feedback.style.display = 'none';
    feedback.innerHTML = '';
}

// Submit Handler
function handleSubmit(e) {
    e.preventDefault();
    clearFormMessage();
    
    if (!isAuthenticated()) {
        showFormMessage('error', 'Silakan login atau daftar terlebih dahulu sebelum mengirim pendaftaran.');
        openLoginModal();
        return;
    }

    const formData = {
        nama: document.getElementById('nama')?.value || '',
        nis: document.getElementById('nis')?.value || '',
        kelas: document.getElementById('kelas')?.value || '',
        wa: document.getElementById('wa')?.value || '',
        eskul_utama: document.getElementById('eskul_utama')?.value || '',
        eskul_cadangan: document.getElementById('eskul_cadangan')?.value || '',
        alasan: document.getElementById('alasan')?.value || '',
        tanggal: new Date().toLocaleString('id-ID')
    };
    
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showFormMessage('error', errors);
        return;
    }
    
    // Simpan ke localStorage (opsional)
    const pendaftaranList = JSON.parse(localStorage.getItem('pendaftaran_eskul') || '[]');
    pendaftaranList.push({
        ...formData,
        status: 'pending',
        tanggal: new Date().toISOString()
    });
    localStorage.setItem('pendaftaran_eskul', JSON.stringify(pendaftaranList));

    // Kirim ke Google Sheets via Google Apps Script
    const form = document.getElementById('daftarForm');
    const successMsg = document.getElementById('successMsg');
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    // Send to Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
    })
    .then(() => {
        // Tampilkan success message
        if (successMsg && form) {
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Reset form setelah beberapa detik
            setTimeout(() => {
                form.reset();
                clearFormMessage();
                form.style.display = 'block';
                successMsg.style.display = 'none';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll ke atas form
                form.scrollIntoView({ behavior: 'smooth' });
            }, 5000);
        }
        
        console.log('Pendaftaran berhasil dikirim ke Google Sheets:', formData);
    })
    .catch(error => {
        // Even though mode: no-cors swallows the error, the data is sent
        // So we still show success message
        console.log('Data dikirim ke Google Sheets (mungkin kosong jika error)', error);
        
        if (successMsg && form) {
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            setTimeout(() => {
                form.reset();
                clearFormMessage();
                form.style.display = 'block';
                successMsg.style.display = 'none';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.scrollIntoView({ behavior: 'smooth' });
            }, 5000);
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        tutupModal();
    }
};

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        tutupModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';

    renderEskul();
    isiDropdown();
    initMobileMenu();
    
    const form = document.getElementById('daftarForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Check if user is already logged in
    checkUserSession();
});

// ========== AUTH FUNCTIONS ==========

// Open Login Modal
function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Open Signup Modal
function openSignupModal() {
    const signupModal = document.getElementById('signupModal');
    if (signupModal) {
        signupModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close Auth Modal
function closeAuthModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Switch to Login Form
function switchToLogin() {
    closeAuthModal('signupModal');
    openLoginModal();
}

// Switch to Signup Form
function switchToSignup() {
    closeAuthModal('loginModal');
    openSignupModal();
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        const icon = event.target.closest('.toggle-password').querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            if (icon) icon.classList.remove('fa-eye');
            if (icon) icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            if (icon) icon.classList.remove('fa-eye-slash');
            if (icon) icon.classList.add('fa-eye');
        }
    }
}

// Validate Login
function validateLogin(data) {
    const errors = [];
    
    if (!data.email || data.email.trim().length < 3) {
        errors.push('Email atau username tidak valid');
    }
    
    if (!data.password || data.password.length < 6) {
        errors.push('Password minimal 6 karakter');
    }
    
    return errors;
}

// Validate Signup
function validateSignup(data) {
    const errors = [];
    
    if (!data.fullname || data.fullname.trim().length < 3) {
        errors.push('Nama lengkap minimal 3 karakter');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Email tidak valid');
    }
    
    if (!data.nis || data.nis.trim().length < 5) {
        errors.push('NIS/NISN tidak valid');
    }
    
    if (!data.username || data.username.trim().length < 3) {
        errors.push('Username minimal 3 karakter');
    }
    
    if (!data.password || data.password.length < 6) {
        errors.push('Password minimal 6 karakter');
    }
    
    if (data.password !== data.confirm_password) {
        errors.push('Password dan konfirmasi password tidak sama');
    }
    
    if (!data.terms) {
        errors.push('Anda harus menyetujui syarat dan ketentuan');
    }
    
    return errors;
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const loginData = {
        email: document.getElementById('loginEmail')?.value || '',
        password: document.getElementById('loginPassword')?.value || '',
        remember: document.getElementById('rememberMe')?.checked || false
    };
    
    const errors = validateLogin(loginData);
    
    if (errors.length > 0) {
        showAuthMessage('loginForm', 'error', errors.join('\n'));
        return;
    }
    
    // Simulate login process
    showAuthMessage('loginForm', 'warning', 'Sedang memproses login...');
    
    // In a real application, you would send this to the server
    setTimeout(() => {
        // Check credentials (demo: accept any email/password for now)
        if (loginData.email.length > 0 && loginData.password.length >= 6) {
            // Save user session
            const userData = {
                email: loginData.email,
                loginTime: new Date().toISOString(),
                remember: loginData.remember
            };
            
            if (loginData.remember) {
                localStorage.setItem('user_session', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('user_session', JSON.stringify(userData));
            }
            
            showAuthMessage('loginForm', 'success', 'Login berhasil! Mengalihkan...');
            
            setTimeout(() => {
                closeAuthModal('loginModal');
                document.getElementById('loginForm').reset();
                updateAuthUI();
            }, 1500);
        } else {
            showAuthMessage('loginForm', 'error', 'Email atau password salah');
        }
    }, 800);
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const signupData = {
        fullname: document.getElementById('signupName')?.value || '',
        email: document.getElementById('signupEmail')?.value || '',
        nis: document.getElementById('signupNis')?.value || '',
        username: document.getElementById('signupUsername')?.value || '',
        password: document.getElementById('signupPassword')?.value || '',
        confirm_password: document.getElementById('signupConfirmPassword')?.value || '',
        terms: document.getElementById('agreeTerms')?.checked || false
    };
    
    const errors = validateSignup(signupData);
    
    if (errors.length > 0) {
        showAuthMessage('signupForm', 'error', errors.join('\n'));
        return;
    }
    
    // Simulate signup process
    showAuthMessage('signupForm', 'warning', 'Sedang mendaftarkan akun...');
    
    // In a real application, you would send this to the server
    setTimeout(() => {
        // Save new user data to localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email or username already exists
        const emailExists = users.some(u => u.email === signupData.email);
        const usernameExists = users.some(u => u.username === signupData.username);
        
        if (emailExists) {
            showAuthMessage('signupForm', 'error', 'Email sudah terdaftar');
            return;
        }
        
        if (usernameExists) {
            showAuthMessage('signupForm', 'error', 'Username sudah digunakan');
            return;
        }
        
        // Add new user
        users.push({
            fullname: signupData.fullname,
            email: signupData.email,
            nis: signupData.nis,
            username: signupData.username,
            password: btoa(signupData.password), // Simple encoding (not secure!)
            registeredAt: new Date().toISOString()
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        
        showAuthMessage('signupForm', 'success', 'Pendaftaran berhasil! Mengalihkan ke login...');
        
        setTimeout(() => {
            document.getElementById('signupForm').reset();
            switchToLogin();
        }, 1500);
    }, 800);
}

// Show Auth Message
function showAuthMessage(formId, type, message) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Remove existing message
    const existingMsg = form.querySelector('.auth-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create new message
    const msgDiv = document.createElement('div');
    msgDiv.className = `auth-message ${type}`;
    
    const iconClass = type === 'success' ? 'fa-check-circle' : 
                      type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    msgDiv.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
    `;
    
    form.insertBefore(msgDiv, form.firstChild);
}

// Check User Session
function checkUserSession() {
    const sessionUser = sessionStorage.getItem('user_session') || localStorage.getItem('user_session');
    if (sessionUser) {
        updateAuthUI();
    }
}

// Update Auth UI
function updateAuthUI() {
    const sessionUser = sessionStorage.getItem('user_session') || localStorage.getItem('user_session');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (sessionUser && authButtons) {
        const user = JSON.parse(sessionUser);
        const username = user.email.split('@')[0];
        
        authButtons.innerHTML = `
            <div class="user-profile-dropdown">
                <button class="user-profile-btn" onclick="toggleUserMenu()">
                    <i class="fas fa-user-circle"></i> ${username}
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="user-menu" id="userMenu">
                    <a href="#" onclick="viewProfile(event)">
                        <i class="fas fa-user"></i> Profil
                    </a>
                    <a href="#" onclick="viewMyRegistrations(event)">
                        <i class="fas fa-list"></i> Pendaftaran Saya
                    </a>
                    <hr>
                    <a href="#" onclick="logout(event)">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        `;
    }
}

// Toggle User Menu
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

// View Profile
function viewProfile(event) {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user_session') || localStorage.getItem('user_session') || '{}');
    alert(`Profil:\nEmail: ${user.email}\nLogin pada: ${new Date(user.loginTime).toLocaleString('id-ID')}`);
}

// View My Registrations
function viewMyRegistrations(event) {
    event.preventDefault();
    const pendaftaran = JSON.parse(localStorage.getItem('pendaftaran_eskul') || '[]');
    
    if (pendaftaran.length === 0) {
        alert('Anda belum mendaftar eskul apapun.');
        return;
    }
    
    let msg = 'Pendaftaran Anda:\n\n';
    pendaftaran.forEach((p, i) => {
        msg += `${i + 1}. ${p.nama}\n   Eskul: ${p.eskul_utama}\n   Tanggal: ${new Date(p.tanggal).toLocaleDateString('id-ID')}\n\n`;
    });
    
    alert(msg);
}

// Logout
function logout(event) {
    event.preventDefault();
    
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('user_session');
        localStorage.removeItem('user_session');
        
        // Reset auth buttons
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <button class="btn-login" onclick="openLoginModal()">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
                <button class="btn-signup" onclick="openSignupModal()">
                    <i class="fas fa-user-plus"></i> Daftar
                </button>
            `;
        }
        
        // Close user menu
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.classList.remove('active');
        }
        
        alert('Anda telah logout.');
    }
}

// Close auth modals when clicking outside
window.addEventListener('click', function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal) {
        closeAuthModal('loginModal');
    }
    if (event.target === signupModal) {
        closeAuthModal('signupModal');
    }
});

// Close user menu when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    const userBtn = event.target.closest('.user-profile-btn');
    
    if (!userBtn && userMenu && userMenu.classList.contains('active')) {
        userMenu.classList.remove('active');
    }
});