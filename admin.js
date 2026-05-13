// Admin Dashboard JavaScript
let currentSection = 'dashboard';
let currentPendaftaranFilter = 'all';
let currentEskulData = [];
let currentPendaftaranData = [];
let currentUsersData = [];

// Check admin session on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
    checkAdminSession();
    loadDashboardData();
    setupEventListeners();
});

// Check if admin is logged in
function checkAdminSession() {
    const adminSession = sessionStorage.getItem('admin_session');
    if (!adminSession) {
        window.location.href = 'admin-login.html';
        return;
    }

    const session = JSON.parse(adminSession);
    if (!session.loggedIn) {
        window.location.href = 'admin-login.html';
        return;
    }

    // Check session expiry (24 hours)
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
        adminLogout();
        return;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Eskul form
    document.getElementById('eskulForm').addEventListener('submit', handleEskulSubmit);

    // User form
    document.getElementById('userForm').addEventListener('submit', handleUserSubmit);
}

// Show section
function showSection(sectionName, event) {
    // Update navigation
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const clickedButton = event ? event.target.closest('.admin-nav-btn') : null;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    // Show section
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    currentSection = sectionName;

    // Load data for section
    switch(sectionName) {
        case 'eskul':
            loadEskulData();
            break;
        case 'pendaftaran':
            loadPendaftaranData();
            break;
        case 'users':
            loadUsersData();
            break;
    }
}

// Load dashboard data
function loadDashboardData() {
    // Load from localStorage (in production, this would be from database)
    const eskulData = JSON.parse(localStorage.getItem('eskul_data') || '[]');
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const pendaftaranData = JSON.parse(localStorage.getItem('pendaftaran_eskul') || '[]');

    // Update stats
    document.getElementById('totalEskul').textContent = eskulData.length;
    document.getElementById('totalUsers').textContent = usersData.length;
    document.getElementById('totalPendaftaran').textContent = pendaftaranData.length;
    document.getElementById('verifiedPendaftaran').textContent =
        pendaftaranData.filter(p => p.status === 'approved').length;

    // Load recent activity
    loadRecentActivity();
}

// Load recent activity
function loadRecentActivity() {
    const pendaftaranData = JSON.parse(localStorage.getItem('pendaftaran_eskul') || '[]');
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');

    const activities = [];

    // Recent registrations
    pendaftaranData.slice(-5).forEach(p => {
        activities.push({
            type: 'registration',
            message: `${p.nama} mendaftar ${p.eskul_utama}`,
            time: new Date(p.tanggal),
            icon: 'fas fa-user-plus'
        });
    });

    // Recent users
    usersData.slice(-3).forEach(u => {
        activities.push({
            type: 'user',
            message: `User ${u.username} bergabung`,
            time: new Date(u.created_at || Date.now()),
            icon: 'fas fa-user'
        });
    });

    // Sort by time (newest first)
    activities.sort((a, b) => b.time - a.time);

    const activityList = document.getElementById('recentActivity');
    activityList.innerHTML = '';

    activities.slice(0, 10).forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <small>${activity.time.toLocaleString('id-ID')}</small>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Load eskul data
function loadEskulData() {
    // In production, this would fetch from database
    // For now, use localStorage or default data
    let eskulData = JSON.parse(localStorage.getItem('eskul_data') || 'null');

    if (!eskulData) {
        // Use default eskul data from js.js
        eskulData = eskulData || [];
        localStorage.setItem('eskul_data', JSON.stringify(eskulData));
    }

    currentEskulData = eskulData;
    renderEskulTable();
}

// Render eskul table
function renderEskulTable() {
    const tbody = document.getElementById('eskulTableBody');
    tbody.innerHTML = '';

    currentEskulData.forEach((eskul, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${eskul.nama}</td>
            <td>${eskul.kategori}</td>
            <td>${eskul.jadwal || '-'}</td>
            <td>${eskul.pembina || '-'}</td>
            <td>${eskul.prestasi || '-'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editEskul(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteEskul(${index})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Show add eskul modal
function showAddEskulModal() {
    document.getElementById('eskulModalTitle').textContent = 'Tambah Eskul';
    document.getElementById('eskulForm').reset();
    document.getElementById('eskulId').value = '';
    document.getElementById('eskulModal').style.display = 'flex';
}

// Edit eskul
function editEskul(index) {
    const eskul = currentEskulData[index];
    document.getElementById('eskulModalTitle').textContent = 'Edit Eskul';
    document.getElementById('eskulId').value = index;
    document.getElementById('eskulNama').value = eskul.nama;
    document.getElementById('eskulKategori').value = eskul.kategori;
    document.getElementById('eskulDeskripsi').value = eskul.deskripsi;
    document.getElementById('eskulJadwal').value = eskul.jadwal || '';
    document.getElementById('eskulPembina').value = eskul.pembina || '';
    document.getElementById('eskulPrestasi').value = eskul.prestasi || '';
    document.getElementById('eskulModal').style.display = 'flex';
}

// Handle eskul form submit
function handleEskulSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const eskulData = {
        nama: formData.get('nama'),
        kategori: formData.get('kategori'),
        deskripsi: formData.get('deskripsi'),
        jadwal: formData.get('jadwal'),
        pembina: formData.get('pembina'),
        prestasi: formData.get('prestasi'),
        image: ''
    };

    const eskulId = formData.get('id');

    if (eskulId === '') {
        // Add new eskul
        currentEskulData.push(eskulData);
    } else {
        // Update existing eskul
        currentEskulData[parseInt(eskulId)] = eskulData;
    }

    // Save to localStorage
    localStorage.setItem('eskul_data', JSON.stringify(currentEskulData));

    // Close modal and refresh table
    closeModal('eskulModal');
    renderEskulTable();
    loadDashboardData();

    // Show success message
    showNotification('Eskul berhasil disimpan!', 'success');
}

// Delete eskul
function deleteEskul(index) {
    if (confirm('Apakah Anda yakin ingin menghapus eskul ini?')) {
        currentEskulData.splice(index, 1);
        localStorage.setItem('eskul_data', JSON.stringify(currentEskulData));
        renderEskulTable();
        loadDashboardData();
        showNotification('Eskul berhasil dihapus!', 'success');
    }
}

// Load pendaftaran data
function loadPendaftaranData() {
    const pendaftaranData = JSON.parse(localStorage.getItem('pendaftaran_eskul') || '[]');
    currentPendaftaranData = pendaftaranData;
    renderPendaftaranTable();
}

// Render pendaftaran table
function renderPendaftaranTable() {
    const tbody = document.getElementById('pendaftaranTableBody');
    tbody.innerHTML = '';

    currentPendaftaranData.forEach((pendaftaran, index) => {
        if (currentPendaftaranFilter !== 'all' && pendaftaran.status !== currentPendaftaranFilter) {
            return;
        }

        const statusClass = pendaftaran.status === 'approved' ? 'status-approved' :
                           pendaftaran.status === 'rejected' ? 'status-rejected' : 'status-pending';
        const statusText = pendaftaran.status === 'approved' ? 'Approved' :
                          pendaftaran.status === 'rejected' ? 'Rejected' : 'Pending';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pendaftaran.nama}</td>
            <td>${pendaftaran.nis}</td>
            <td>${pendaftaran.kelas}</td>
            <td>${pendaftaran.eskul_utama}</td>
            <td>${pendaftaran.eskul_cadangan || '-'}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${new Date(pendaftaran.tanggal).toLocaleDateString('id-ID')}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewPendaftaran(${index})">
                    <i class="fas fa-eye"></i> Lihat
                </button>
                ${(!pendaftaran.status || pendaftaran.status === 'pending') ?
                    `<button class="btn btn-sm btn-success" onclick="showVerificationModal(${index})">
                        <i class="fas fa-check"></i> Verifikasi
                    </button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Filter pendaftaran
function filterPendaftaran(filter, event) {
    currentPendaftaranFilter = filter;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const clickedButton = event ? event.target.closest('.filter-btn') : null;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    renderPendaftaranTable();
}

// View pendaftaran details
function viewPendaftaran(index) {
    const pendaftaran = currentPendaftaranData[index];
    alert(`Detail Pendaftaran:
Nama: ${pendaftaran.nama}
NIS: ${pendaftaran.nis}
Kelas: ${pendaftaran.kelas}
WhatsApp: ${pendaftaran.wa}
Eskul Utama: ${pendaftaran.eskul_utama}
Eskul Cadangan: ${pendaftaran.eskul_cadangan || 'Tidak ada'}
Alasan: ${pendaftaran.alasan}
Status: ${pendaftaran.status}
Tanggal: ${new Date(pendaftaran.tanggal).toLocaleString('id-ID')}`);
}

// Show verification modal
function showVerificationModal(index) {
    currentVerificationIndex = index;
    const pendaftaran = currentPendaftaranData[index];

    const detailsDiv = document.getElementById('verificationDetails');
    detailsDiv.innerHTML = `
        <div class="verification-info">
            <h3>Detail Pendaftaran</h3>
            <div class="info-grid">
                <div class="info-item">
                    <strong>Nama:</strong> ${pendaftaran.nama}
                </div>
                <div class="info-item">
                    <strong>NIS:</strong> ${pendaftaran.nis}
                </div>
                <div class="info-item">
                    <strong>Kelas:</strong> ${pendaftaran.kelas}
                </div>
                <div class="info-item">
                    <strong>WhatsApp:</strong> ${pendaftaran.wa}
                </div>
                <div class="info-item">
                    <strong>Eskul Utama:</strong> ${pendaftaran.eskul_utama}
                </div>
                <div class="info-item">
                    <strong>Eskul Cadangan:</strong> ${pendaftaran.eskul_cadangan || 'Tidak ada'}
                </div>
            </div>
            <div class="alasan-section">
                <strong>Alasan:</strong>
                <p>${pendaftaran.alasan}</p>
            </div>
        </div>
    `;

    document.getElementById('verificationModal').style.display = 'flex';
}

// Verify pendaftaran
function verifyPendaftaran(status) {
    const pendaftaran = currentPendaftaranData[currentVerificationIndex];
    pendaftaran.status = status;

    // Save to localStorage
    localStorage.setItem('pendaftaran_eskul', JSON.stringify(currentPendaftaranData));

    // Close modal and refresh table
    closeModal('verificationModal');
    renderPendaftaranTable();
    loadDashboardData();

    // Show success message
    const message = status === 'approved' ? 'Pendaftaran berhasil diapprove!' : 'Pendaftaran berhasil direject!';
    showNotification(message, 'success');
}

// Load users data
function loadUsersData() {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    currentUsersData = usersData;
    renderUsersTable();
}

// Render users table
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    currentUsersData.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>${user.nis}</td>
            <td>${user.username}</td>
            <td><span class="status-badge status-active">Active</span></td>
            <td>${new Date(user.created_at || Date.now()).toLocaleDateString('id-ID')}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUser(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Show add user modal
function showAddUserModal() {
    document.getElementById('userModalTitle').textContent = 'Tambah User';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('userModal').style.display = 'flex';
}

// Edit user
function editUser(index) {
    const user = currentUsersData[index];
    document.getElementById('userModalTitle').textContent = 'Edit User';
    document.getElementById('userId').value = index;
    document.getElementById('userFullname').value = user.fullname;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userNis').value = user.nis;
    document.getElementById('userUsername').value = user.username;
    document.getElementById('userPassword').value = ''; // Don't show password
    document.getElementById('userModal').style.display = 'flex';
}

// Handle user form submit
function handleUserSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        nis: formData.get('nis'),
        username: formData.get('username'),
        password: formData.get('password') ? btoa(formData.get('password')) : undefined, // Simple encoding
        created_at: new Date().toISOString()
    };

    const userId = formData.get('id');

    if (userId === '') {
        // Add new user
        currentUsersData.push(userData);
    } else {
        // Update existing user
        const existingUser = currentUsersData[parseInt(userId)];
        if (userData.password) {
            existingUser.password = userData.password;
        }
        Object.assign(existingUser, userData);
        delete existingUser.password; // Don't overwrite password if not changed
    }

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(currentUsersData));

    // Close modal and refresh table
    closeModal('userModal');
    renderUsersTable();
    loadDashboardData();

    // Show success message
    showNotification('User berhasil disimpan!', 'success');
}

// Delete user
function deleteUser(index) {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
        currentUsersData.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(currentUsersData));
        renderUsersTable();
        loadDashboardData();
        showNotification('User berhasil dihapus!', 'success');
    }
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Admin logout
function adminLogout() {
    if (confirm('Apakah Anda yakin ingin logout dari admin panel?')) {
        sessionStorage.removeItem('admin_session');
        window.location.href = 'admin-login.html';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Simple notification - in production, use a proper notification system
    alert(message);
}

// Global variable for verification
let currentVerificationIndex = -1;
