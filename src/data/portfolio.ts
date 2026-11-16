export type ProjectCategory = 'Web' | 'Mobile' | 'Backend' | 'Data';
export type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Data / AI' | 'Tools';

export type Certificate = {
	title: string;
	issuer: string;
	issuedAt: string;
	credentialUrl?: string;
};

export type Project = {
	id: string;
	title: string;
	category: ProjectCategory;
	year: string;
	role: string;
	summary: string;
	detail: string;
	impact: string;
	stack: string[];
	highlights: string[];
	artTitle: string;
	artClass: string;
	demoUrl: string;
	repoUrl: string;
};

export const portfolio = {
	name: 'T. Said Aghil Zailani bin T. S. Annuhsi, S.Tr.Kom.',
	displayName: ['T. Said', 'Aghil Zailani'],
	initials: 'AZ',
	role: 'Software Engineer',
	location: 'Pekanbaru, Riau, Indonesia',
	tagline: 'Saya membuat aplikasi web dan mobile serta layanan backend yang siap digunakan.',
	aboutHeadline: 'Membuat perangkat lunak untuk kebutuhan nyata',
	bio: 'Saya lulusan Politeknik Caltex Riau dan pernah magang di tim pengembangan produk teknologi. Saya membuat layanan backend, aplikasi Android dan Flutter, integrasi NFC, chatbot NLU, dan model pembelajaran mesin. Saya bekerja dalam tim Scrum, dari memahami kebutuhan hingga menyiapkan fitur untuk digunakan.',
	workPrinciple: 'Saya memahami kebutuhan pengguna, merancang data dan API, lalu memastikan aplikasi mudah digunakan dan dirawat.',
	stats: [
		{ value: 4, suffix: '+', label: 'tahun belajar dan berkarya' },
		{ value: 9, suffix: '', label: 'proyek' },
		{ value: 2, suffix: '', label: 'pengalaman magang' },
	],
	educationIntro: 'Saya belajar informatika dengan fokus pada praktik membuat dan menerapkan perangkat lunak.',
	education: [
		{
			period: 'September 2022 sampai Oktober 2026',
			institution: 'Politeknik Caltex Riau',
			degree: 'Sarjana Terapan Teknik Informatika · Pekanbaru, Indonesia',
			result: 'IPK 3,74 / 4,00 · Dengan pujian',
			notes: 'Lulus dari program Teknik Informatika dengan predikat cum laude.',
		},
	],
	skillsIntro: 'Saya membuat layanan backend, aplikasi mobile, integrasi API, dan solusi AI/ML.',
	skills: [
		{ name: 'Backend dan API', category: 'Backend' as const, context: 'Membuat layanan aplikasi untuk autentikasi, pengelolaan data, dan komunikasi antaraplikasi.', tools: ['PHP', 'Laravel', 'REST API', 'Flask'] },
		{ name: 'Basis data', category: 'Backend' as const, context: 'Merancang basis data untuk fitur aplikasi, laporan, dan pengelolaan informasi.', tools: ['SQL', 'MySQL', 'Database Design'] },
		{ name: 'Aplikasi mobile', category: 'Mobile' as const, context: 'Membuat aplikasi Android dan lintas platform yang terhubung ke layanan backend.', tools: ['Kotlin', 'Flutter', 'Dart', 'Firebase'] },
		{ name: 'AI dan machine learning', category: 'Data / AI' as const, context: 'Mengolah bahasa, memperkirakan risiko, dan mendeteksi kendaraan dengan model AI.', tools: ['Python', 'NLU', 'YOLOv10s', 'Logistic Regression'] },
		{ name: 'Antarmuka dan prototipe', category: 'Frontend' as const, context: 'Merancang alur penggunaan dan prototipe sebelum membuat fitur aplikasi.', tools: ['Figma', 'UI Development', 'Prototyping'] },
		{ name: 'Perangkat kerja dan penerapan', category: 'Tools' as const, context: 'Mengelola kode, menguji API, dan menjalankan aplikasi di server.', tools: ['Git', 'Postman', 'VPS', 'Codex', 'Claude Code', 'Copilot', 'Antigravity'] },
	],
	certificates: [] as Certificate[],
	languages: [
		{ name: 'Bahasa Indonesia', level: 'Bahasa ibu' },
		{ name: 'Bahasa Inggris', level: 'Kemahiran profesional' },
	],
	projectsIntro: 'Proyek yang pernah saya kerjakan mencakup sistem operasional, pembayaran, dan aplikasi AI/ML.',
	projects: [
		{
			id: 'jim-app',
			title: 'JIM App',
			category: 'Backend',
			year: '2026',
			role: 'Backend dan penerapan di server',
			summary: 'Layanan backend untuk aplikasi inspeksi kendaraan di ponsel.',
			detail: 'Saya membuat backend untuk aplikasi inspeksi kendaraan dalam tim Scrum. Aplikasi ponsel memakai OCR untuk membaca data. Saya menerapkan dan merawat backend di VPS.',
			impact: 'Membantu tim mencatat hasil inspeksi melalui aplikasi.',
			stack: ['Laravel', 'MySQL', 'REST API', 'VPS', 'OCR'],
			highlights: ['Menghubungkan aplikasi ponsel dengan layanan backend.', 'Membuat layanan untuk mencatat dan melaporkan hasil inspeksi.', 'Menjalankan dan merawat backend di VPS.'],
			artTitle: 'JIM / inspeksi',
			artClass: 'bg-accent text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'paypoint',
			title: 'PayPoint',
			category: 'Mobile',
			year: '2025',
			role: 'Pengembangan Android dan UI/UX',
			summary: 'Aplikasi Android untuk transaksi dengan kartu NFC.',
			detail: 'Saya membuat PayPoint dan PayPoint V2 untuk mengelola transaksi di Android. Aplikasi membaca kartu NFC melalui perangkat Kassen X-02 Pro EDC dan terhubung ke API backend.',
			impact: 'Membantu pengguna mengenali siswa, memeriksa saldo, membayar, dan mengisi ulang saldo.',
			stack: ['Kotlin', 'NFC', 'Kassen X-02 Pro', 'Figma', 'Backend API'],
			highlights: ['Merancang alur transaksi di Figma.', 'Menghubungkan NFC dengan perangkat EDC.', 'Membuat pembayaran dan pengisian saldo melalui API backend.'],
			artTitle: 'PayPoint / NFC',
			artClass: 'bg-[#d5ddc8] text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'pocito',
			title: 'Pocito Chatbot dan Chat Center',
			category: 'Web',
			year: '2025',
			role: 'Pengembangan web dan backend',
			summary: 'Chatbot NLU dan aplikasi web untuk mengelola percakapan pelanggan.',
			detail: 'Saya membuat chatbot Pocito dengan NLU untuk membantu layanan pelanggan. Saya juga membuat aplikasi web Laravel agar admin dapat mengelola percakapan dan melihat interaksi chatbot.',
			impact: 'Chatbot menjawab pertanyaan umum dan meneruskan pesan yang belum terjawab.',
			stack: ['Laravel', 'MySQL', 'NLU', 'VPS'],
			highlights: ['Menyusun data tanya jawab untuk melatih chatbot.', 'Membuat ruang percakapan bagi pelanggan dan admin.', 'Menghubungkan chatbot dengan alur layanan pelanggan.'],
			artTitle: 'Pocito / percakapan',
			artClass: 'bg-[#c6d6e0] text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'fire-protection',
			title: 'Pemantauan Alat Proteksi Kebakaran',
			category: 'Mobile',
			year: '2025',
			role: 'Pengembangan web dan mobile · Tugas akhir',
			summary: 'Sistem untuk mencatat dan memantau alat proteksi kebakaran di gudang.',
			detail: 'Saya membuat sistem untuk PT. Tunas Siak Anugrah berupa situs Laravel dan aplikasi Flutter. Saya mengerjakannya dengan metode Scrum dan membuat API untuk menghubungkan keduanya.',
			impact: 'Mencatat dan memantau alat proteksi kebakaran lewat situs dan aplikasi.',
			stack: ['Flutter', 'Laravel', 'MySQL', 'VPS', 'Scrum'],
			highlights: ['Membuat situs dan aplikasi mobile.', 'Membuat API yang menghubungkan keduanya.', 'Menjalankan sistem di VPS.'],
			artTitle: 'Proteksi / kebakaran',
			artClass: 'bg-[#e6b79c] text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'gemala-riau',
			title: 'Gemala Riau',
			category: 'Web',
			year: '2026',
			role: 'Pengembangan web',
			summary: 'Situs berita dengan CMS untuk mengelola artikel.',
			detail: 'Saya membuat situs berita dengan CMS agar admin dapat menulis, menyunting, dan mengelola artikel. Saya menjalankan situs ini di VPS agar dapat diakses publik.',
			impact: 'Admin dapat mengelola artikel, kategori, dan penulis di satu aplikasi.',
			stack: ['Laravel', 'MySQL', 'VPS'],
			highlights: ['Membuat alur penerbitan dan pengelolaan artikel.', 'Merancang data artikel, kategori, dan penulis.', 'Menjalankan aplikasi di VPS.'],
			artTitle: 'Gemala / berita',
			artClass: 'bg-[#d5ddc8] text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'heart-guard',
			title: 'Heart Guard',
			category: 'Mobile',
			year: '2024 — 2025',
			role: 'Pengembangan aplikasi dan machine learning',
			summary: 'Aplikasi untuk memperkirakan risiko kesehatan jantung dari jawaban survei.',
			detail: 'Saya membuat aplikasi dengan arsitektur MVVM. Saya melatih model logistic regression untuk mengelompokkan risiko kesehatan jantung dari jawaban survei, lalu menghubungkannya ke aplikasi.',
			impact: 'Aplikasi menampilkan perkiraan risiko berdasarkan jawaban survei.',
			stack: ['Kotlin', 'MVVM', 'Machine Learning', 'Logistic Regression'],
			highlights: ['Membuat survei di aplikasi mobile.', 'Melatih model logistic regression untuk mengelompokkan risiko.', 'Menghubungkan model dengan fitur prediksi aplikasi.'],
			artTitle: 'Heart Guard / risiko',
			artClass: 'bg-[#e6b79c] text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'vehicle-detection',
			title: 'Deteksi Kendaraan dengan YOLOv10s',
			category: 'Data',
			year: '2025',
			role: 'Pengembangan deep learning',
			summary: 'Model untuk mendeteksi lima jenis kendaraan pada gambar dan video.',
			detail: 'Saya melatih model YOLOv10s untuk mendeteksi mobil, sepeda motor, bus, truk, dan traktor. Aplikasi Flask menjalankan model pada gambar dan video.',
			impact: 'Model mengenali kendaraan pada gambar dan video.',
			stack: ['YOLOv10s', 'Deep Learning', 'Flask'],
			highlights: ['Melatih model deteksi objek.', 'Mendeteksi mobil, sepeda motor, bus, truk, dan traktor.', 'Menguji model dengan gambar dan video.'],
			artTitle: 'YOLO / deteksi',
			artClass: 'bg-[#c6d6e0] text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'warehouse-inventory',
			title: 'Sistem Inventaris Gudang',
			category: 'Backend',
			year: '2023',
			role: 'Pengembangan web dan backend',
			summary: 'Sistem web untuk mencatat barang dan memantau stok gudang.',
			detail: 'Saya membuat aplikasi web untuk mencatat alat proteksi kebakaran, barang masuk dan keluar, serta stok gudang.',
			impact: 'Mencatat barang masuk, barang keluar, dan stok di satu aplikasi.',
			stack: ['Laravel', 'MySQL'],
			highlights: ['Merancang basis data inventaris.', 'Membuat layanan untuk mengelola stok.', 'Mencatat barang masuk dan keluar.'],
			artTitle: 'Gudang / stok',
			artClass: 'bg-[#d5ddc8] text-night',
			demoUrl: '',
			repoUrl: '',
		},
		{
			id: 'student-achievement',
			title: 'Sistem Pengelolaan Prestasi Mahasiswa',
			category: 'Backend',
			year: '2023',
			role: 'Pengembangan backend',
			summary: 'Layanan untuk mengajukan dan memeriksa prestasi mahasiswa.',
			detail: 'Saya membuat backend untuk mencatat prestasi akademik dan nonakademik. API mendukung pengajuan, pemeriksaan, persetujuan, dan penolakan oleh koordinator program studi.',
			impact: 'Mengelola data prestasi dan mengirim email untuk proses penting.',
			stack: ['MySQL', 'REST API', 'VPS', 'Email Notifications'],
			highlights: ['Merancang data profil, prestasi, dokumen, dan status pengajuan.', 'Membuat API untuk pengajuan dan pemeriksaan prestasi.', 'Mengirim email saat login dan saat prestasi diperiksa.'],
			artTitle: 'Mahasiswa / prestasi',
			artClass: 'bg-[#c6d6e0] text-night',
			demoUrl: '',
			repoUrl: '',
		},
	] satisfies Project[],
	experienceIntro: 'Saya bekerja di tim pengembangan perangkat lunak, dari memahami kebutuhan hingga menyiapkan fitur untuk digunakan.',
	experience: [
		{
			period: 'Mei sampai Juli 2026',
			position: 'Software Engineer Intern',
			company: 'PT. Bigs Integrasi Teknologi',
			summary: 'Membuat backend untuk perangkat lunak kesehatan dan aplikasi inspeksi kendaraan.',
			highlights: ['Merancang basis data untuk petugas, pesanan inspeksi, catatan kendaraan, dan laporan.', 'Membuat REST API untuk login, dasbor, pesanan, pengajuan, dan laporan.', 'Membahas kebutuhan produk dan rencana kerja bersama tim Scrum.'],
		},
		{
			period: 'Agustus sampai Desember 2025',
			position: 'Software Engineer Intern',
			company: 'PT. Solusi Ummat Aplikasi Indonesia',
			summary: 'Membuat chatbot, aplikasi web, aplikasi transaksi Android, dan situs organisasi.',
			highlights: ['Membuat Pocito Chatbot dan aplikasi admin Chat Center dengan Laravel.', 'Membuat PayPoint dan PayPoint V2 dengan Kotlin, NFC, dan API backend.', 'Membuat situs Yayasan Suara Dakwah.'],
		},
	],
	contactIntro: 'Hubungi saya untuk membahas pekerjaan perangkat lunak, pengembangan produk, atau kerja sama.',
	contact: {
		email: 'aghilzailani.tsa@gmail.com',
		phone: '+6285609325581',
		phoneDisplay: '+62 856-0932-5581',
		linkedin: 'https://www.linkedin.com/in/tengku-said-aghil-zailani',
		linkedinLabel: 'linkedin.com/in/tengku-said-aghil-zailani',
		github: 'https://github.com/aghil-zailani',
		githubLabel: 'github.com/aghil-zailani',
	},
};
