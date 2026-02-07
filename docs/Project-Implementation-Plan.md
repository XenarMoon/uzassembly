# Project Implementation Plan — Sayt Admin Panel va Kontent Boshqaruvi

Muallif: GitHub Copilot (yordamchi)
Sana: 2026-02-06

## Maqsad
Saytning barcha kontentini (matnlar, rasmlar, videolar, jamoa a'zolari) IT mutaxassisi bo'lmagan foydalanuvchi tomonidan oson boshqarilishini ta'minlash va kelib tushgan murojaatlarni (zayavkalarni) kuzatib borish uchun to'liq, xavfsiz va ko'p tilli (Uz, Ru, En) admin panelni ishlab chiqish.

## Variantlar va tavsiya
- Minimal (tezkor): fayl/JSON asosida saqlash, oddiy autentifikatsiya, mahalliy fayl yuklash. Tez yetkazib berish, ammo cheklangan skalabilitiy.
- Production-ready (tavsiya): PostgreSQL (yoki SQLite dev uchun), Prisma ORM, fayllar uchun S3/Cloud Storage, JWT/session autentifikatsiya, testlar va CI/CD.

Men tavsiya qilaman: Production-ready yondashuv, chunki media va ko'p foydalanuvchi kerak bo'lsa, bu barqaror va kengaytiriladigan bo'ladi.

---

## Texnologiya stack (taklif)
- Frontend/Admin UI: React + Next.js (app router) + Tailwind CSS
- Server / API: Next.js API Routes (app/api) yoki serverless functions
- Baza: PostgreSQL (ishlab chiqarish), SQLite (dev) + Prisma ORM
- File storage: AWS S3 yoki Vercel/Cloud Storage (lokal uchun /public/uploads)
- I18n: `next-intl` (mavjud) — admin interfeysi va kontent maydonlari uchun 3 tilni qo'llab-quvvatlash
- Autentifikatsiya: Email/login + parol (bcrypt) va session cookie yoki JWT

---

## Umumiy bosqichlar va ishlar (har bosqich - vazifalar + taxminiy vaqt)

PHASE 0 — Tayyorlov (env, repo, deploy sozlamalari)
- `.env` va `.env.example` yaratish; maxfiylarni aniqlash — 0.5 soat
- Prisma init va migration (yoki dev uchun SQLite) — 1–2 soat

PHASE 1 — Avtorizatsiya va admin skeleti
- Admin login sahifasi (responsive): login form, xato xabarlari — 2–4 soat
- Parolni xavfsiz saqlash (bcrypt) va session cookie/next-auth integratsiyasi — 2–4 soat
- Admin rol va boshqaruv (admin CRUD) — 1.5–3 soat

PHASE 2 — Admin UI skeleti va menyu
- Responsive menyu (chap menyu) va dashboard skeleti — 3–6 soat
- Dashboard: umumiy statistikalar (yangiliklar, jamoa, yangi murojaatlar) — 2–3 soat

PHASE 3 — Site Settings (Umumiy sozlamalar)
- Model va CRUD: logo upload, telefon, manzil, ijtimoiy linklar, google map coords — 2–4 soat
- Frontend forma va validatsiya — 1–2 soat

PHASE 4 — Pages Content (statik sahifalar)
- CRUD per-page: title/description har bir til uchun, WYSIWYG (rich text editor) integratsiya — 4–6 soat
- Banner rasm yuklash va preview — 1–2 soat

PHASE 5 — News & Media
- Model: title (3 til), excerpt (3 til), full content (3 til), thumbnail, video (upload yoki URL), date, status — 2–3 soat
- Admin UI: list, create/edit (WYSIWYG), delete, pagination/search — 4–6 soat
- Video upload/YouTube link handling va media storage — 2–4 soat

PHASE 6 — Team Members
- Model: name (3 til), position (3 til), bio (3 til), photo, contact link, order field — 2–3 soat
- Admin UI: drag&drop ordering (React DnD yoki raqamli tartib) — 2–4 soat

PHASE 7 — Applications / Feedback (Murojaatlar)
- Model: name, phone, subject, message, createdAt, status (New/Reviewed/Contacted) — 1–2 soat
- Admin UI: jadval ko'rinishi, filter (status), o'qilgan belgilash, status update — 2–3 soat
- Optional: Email alert yoki Telegram webhook integratsiyasi — 1–3 soat

PHASE 8 — Partners va Carousel
- Model: name, logo, link, order — 1–2 soat
- Admin UI: CRUD va order control, frontend carousel komponenti — 2–3 soat

PHASE 9 — Statistics numbers (Achievements)
- Model: value, label(3 til), icon (select/upload), order — 1–2 soat
- Admin UI CRUD — 1–2 soat

PHASE 10 — Filestorage, uploads, thumbnails
- Local uploads (dev) + S3 integration (prod), image resizing/thumbnailing — 3–6 soat

PHASE 11 — Tests, QA, accessibility and responsive fixes
- Unit/Integration tests for API routes and major components — 3–6 soat
- Manual QA, responsiveness and bugfix — 4–8 soat

PHASE 12 — Deploy & Documentation
- Deploy to Vercel/Heroku; environment setup and secrets — 1–3 soat
- README and admin usage guide — 1–2 soat

---

## Taxminiy umumiy vaqt
- Production-ready: 42–81 soat (~1.5–3 ish haftasi, kunlik 6–8 soat ishlashga qarab).
- Minimal / Fast: 18–35 soat (~3–5 ish kuni).

Bu vaqtlar loyiha murakkabligiga, kontent hajmiga va media saqlash strategiyasiga qarab o'zgaradi.

---

## Ma'lumotlar modeli (yadro) — taklif (ORM/Prisma uchun)
- User (Admin): id, email, passwordHash, role, createdAt
- SiteSettings: id, logoUrl, phones, address, socialLinks (json), mapCoords
- Page: id, slug, title: {uz,ru,en}, description: {uz,ru,en}, bannerUrl
- News: id, title:{}, excerpt:{}, content:{}, thumbnailUrl, videoUrl, date, status
- TeamMember: id, name:{}, position:{}, bio:{}, photoUrl, order
- Application: id, name, phone, subject, message, status, createdAt
- Partner: id, name, logoUrl, link, order
- Statistic: id, value, label:{}, icon

---

## Acceptance criteria (qabul mezonlari)
1. Admin panelga faqat login/parol orqali kira oladi.
2. Har bir kontent elementi admin orqali CREATE/READ/UPDATE/DELETE qilingan bo'lishi kerak.
3. Har bir kontent maydoni 3 til uchun to'ldirilishi mumkin.
4. Media (rasm/video) yuklash ishlashi va saqlanishi.
5. Murojaatlar saqlanadi, admin tomonidan statusi o'zgartiriladi va filtrlanadi.
6. Dashboard asosiy statistikani ko'rsatadi (yangiliklar, jamoa, yangi murojaatlar).
7. Admin panel barcha ekranlarda (mobile/tablet/desktop) ishlashi.

---

## Risklar va tavsiyalar
- Media hajmi katta bo'lsa S3/CDN talab qilinadi — qo'shimcha xarajat.
- Maxfiy ma'lumotlarni (`TELEGRAM_BOT_TOKEN`, DB password) `.env` da saqlang va repo-ga commit qilmang.
- Parolni hash qilish (bcrypt) va HTTPS talab qilinadi.

---

## Qadamma-qadam ish reja (1-hafta misol jadvali, 6–8 soatli ish kuni)
- Kun 1: Tayyorlov, env, DB init, admin auth skeleti (6–8 soat)
- Kun 2: Admin UI skeleti, dashboard, site settings (6–8 soat)
- Kun 3: Pages content + WYSIWYG, banner upload (6–8 soat)
- Kun 4: News & Media, video handling (6–8 soat)
- Kun 5: Team members va partners, ordering (6–8 soat)
- Kun 6: Applications, notifications, basic tests (6–8 soat)
- Kun 7: QA, bugfix, deploy, docs (6–8 soat)

---

## Checklist (commit/merge) — har feature branch uchun
- Model migration va Prisma schema yangilandi.
- Unit/Integration testlar yozildi (minimal).
- `.env.example` yangilandi.
- Media uploadlar uchun konfiguratsiya yo'riqnomasi mavjud.
- PR description: change summary va run/test instructions.

---

## Keyingi qadamlar — men bilan bajarilishi mumkin bo'lgan ishlar
1. Siz variantni tanlang: `Minimal` yoki `Production-ready`.
2. Men boshlash uchun `TELEGRAM_BOT_TOKEN` va boshqa maxfiylarni `.env` ga ko'chirishdan boshlayman (faqat kodni o'zgartiraman, tokenni repo'ga qo'ymayman).
3. Birinchi milestone: Admin login va dashboard skeletini yaratish (20–40 daqiqa tayyorgarlikdan so'ng amalga oshiriladi).

---

## Fayl joylashuvi
Fayl loyihada: `docs/Project-Implementation-Plan.md`
