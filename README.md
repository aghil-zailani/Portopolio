# Portfolio satu halaman

Portfolio React + TypeScript + Vite dengan Tailwind CSS v3, GSAP/ScrollTrigger, Lenis, dan lucide-react. Konten contoh tersimpan terpusat di `src/data/portfolio.ts`.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Pemeriksaan produksi:

```bash
npm run build
npm run preview
```

Untuk membuat proyek serupa dari awal:

```bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
npm install
npm install gsap lenis lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Konfigurasi Vite, Tailwind, TypeScript, dan metadata halaman pada repositori ini sudah disiapkan.

## Mengganti konten

- Ubah identitas, bio, pendidikan, skill, proyek, pengalaman, dan tautan sosial pada `src/data/portfolio.ts`.
- Untuk nama dua baris pada hero, edit `displayName`; `initials` mengatur monogram ilustrasi.
- Setiap proyek menerima `demoUrl` dan `repoUrl`; kosongkan jika tautan belum tersedia.
- Ganti `public/cv.pdf` dengan CV final. File yang tersedia sekarang hanya placeholder.
- Perbarui title, description, dan Open Graph pada `index.html`; ganti `public/og-image.svg` bila sudah memiliki gambar sosial final.
- Warna dasar, aksen, dan netral diatur melalui token CSS pada `src/index.css`. Pemetaan token Tailwind ada di `tailwind.config.js`.

Seluruh teks dan angka contoh perlu diganti dengan informasi dan pencapaian yang benar sebelum portfolio dipublikasikan.

## Catatan performa dan aksesibilitas

- Tidak ada Three.js, video, canvas, atau gambar hero eksternal; ilustrasi menggunakan CSS dan SVG statis.
- Data berada di modul TypeScript; dialog detail proyek dipecah dengan `React.lazy`.
- Lenis berbagi ticker GSAP dengan ScrollTrigger, lalu dibersihkan saat komponen dilepas.
- Animasi reveal, penghitung, kursor, dan smooth scroll menghormati `prefers-reduced-motion`.
- Kontrol menggunakan elemen semantik, status navigasi aktif, label form, indikator fokus, Escape, dan focus trap untuk dialog.
- Form memvalidasi nama, format email, dan pesan di sisi klien, kemudian menyiapkan draft lewat aplikasi email; tidak ada backend pengiriman.