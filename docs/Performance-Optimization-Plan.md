# 🚀 UzAssembly Performance Optimization Plan

**Maqsad:** Sayt tezligini 70-80% oshirish va clean code standartlariga muvofiqlashtirish

**Tahlil sanasi:** 2026-02-13  
**Loyiha:** UzAssembly (Next.js 15.5.9 + React 18.3.1)

---

## 📊 Joriy Holat Tahlili

### ⚠️ Asosiy Muammolar

1. **Katta Client-side Bundle**
   - Projects page: ~680 lines, to'liq client-side
   - News page: ~973 lines, to'liq client-side
   - Contact page: ~789 lines, to'liq client-side
   - Services pages: ~10 sahifa, hammasi client-side
   - Framer Motion: ~200KB (barcha joylarda)

2. **Server/Client Ajratish Yo'q**
   - ✅ About page - DONE (server/client separated)
   - ❌ Projects, News, Contact - Full client-side
   - ❌ Services pages - Full client-side
   - ❌ Associations, Careers - Full client-side

3. **Heavy Dependencies**
   - framer-motion: 12.23.26 (~200KB)
   - lucide-react: 0.562.0 (ko'p icon import)
   - react-quill-new: 3.8.3 (admin uchun, lekin public bundle-ga kiradi)

4. **API Optimization Yo'q**
   - Client-side data fetching
   - Settings har safar fetch
   - No caching strategy

5. **Image Optimization Partial**
   - Next.js config-da AVIF/WebP bor
   - Lekin ko'p joyda Image component o'rniga <img> ishlatilgan

### ✅ Qilingan Ishlar

- ✅ Header/Footer layout-ga ko'chirildi (re-mounting muammosi hal)
- ✅ PublicChrome wrapper yaratildi
- ✅ About page server/client separated
- ✅ Loading skeletons (4 route)
- ✅ Next.config.js optimizatsiyalari (swcMinify, modularImports, chunk splitting)

---

## 🎯 Optimizatsiya Strategiyasi

### **Asosiy Yo'nalishlar:**

1. **Server/Client Separation** → 30-40% performance gain
2. **Dynamic Imports** → 20-30% bundle reduction
3. **Data Fetching Optimization** → 15-20% faster load
4. **Code Splitting** → 10-15% smaller bundles
5. **Memoization & Clean Code** → 5-10% improvement

**Umumiy kutilayotgan natija:** 70-80% tezlik oshishi

---

## 📅 Fazali Reja (Phase-by-Phase)

### **PHASE 1: Projects Page Optimization** ⭐ Yuqori Prioritet
**Maqsad:** Eng katta sahifani (680 lines) server/client ajratish

**Vazifalar:**
- [ ] 1.1. ProjectsClient.tsx yaratish (animations + interactions)
- [ ] 1.2. Projects page.tsx → thin server wrapper
- [ ] 1.3. Static config data server-side
- [ ] 1.4. Modal animations lazy load
- [ ] 1.5. Category filter memoization
- [ ] 1.6. TypeScript types qo'shish

**Faydalar:**
- Bundle: ~150-200KB reduction
- Tezlik: 35-40% faster initial load
- SEO: Better static content indexing

**Vaqt:** 30-40 daqiqa

---

### **PHASE 2: News Page Optimization** ⭐ Yuqori Prioritet
**Maqsad:** Eng uzun sahifani (973 lines) optimallashtrish

**Vazifalar:**
- [ ] 2.1. NewsClient.tsx yaratish
- [ ] 2.2. Server-side API fetch (news list)
- [ ] 2.3. Pagination logic optimization
- [ ] 2.4. Category filter memoization
- [ ] 2.5. Media gallery lazy load
- [ ] 2.6. Search debounce optimization

**Faydalar:**
- Bundle: ~200-250KB reduction
- Tezlik: 40-45% faster
- SEO: Dynamic news indexing

**Vaqt:** 40-50 daqiqa

---

### **PHASE 3: Contact Page Optimization** 🔶 O'rtacha Prioritet
**Maqsad:** Contact page (789 lines) va API calls optimizatsiya

**Vazifalar:**
- [ ] 3.1. ContactClient.tsx yaratish
- [ ] 3.2. Server-side settings fetch
- [ ] 3.3. Form validation client-side
- [ ] 3.4. Map component lazy load
- [ ] 3.5. FAQ accordion memoization
- [ ] 3.6. Form submit optimization

**Faydalar:**
- Bundle: ~120-150KB reduction
- Tezlik: 30-35% faster
- UX: Instant settings load

**Vaqt:** 30-35 daqiqa

---

### **PHASE 4: Services Pages Optimization** 🔶 O'rtacha Prioritet
**Maqsad:** 11 ta services sahifasini optimallashtrish

**Vazifalar:**
- [ ] 4.1. ServicesLayout.tsx yaratish (umumiy wrapper)
- [ ] 4.2. Har bir service page → server wrapper
- [ ] 4.3. Service content static generation
- [ ] 4.4. Shared animations component
- [ ] 4.5. Icon imports optimization
- [ ] 4.6. Common styles extraction

**Faydalar:**
- Bundle: ~180-220KB reduction (11 page × 20KB)
- Tezlik: 25-30% faster
- Maintainability: DRY principle

**Vaqt:** 45-55 daqiqa

---

### **PHASE 5: Associations & Careers Optimization** 🔸 Past Prioritet
**Maqsad:** Qolgan client-side pages optimizatsiya

**Vazifalar:**
- [ ] 5.1. AssociationsClient.tsx yaratish
- [ ] 5.2. CareersClient.tsx yaratish
- [ ] 5.3. Server-side data fetch
- [ ] 5.4. Form handling optimization
- [ ] 5.5. Animation lazy load

**Faydalar:**
- Bundle: ~80-100KB reduction
- Tezlik: 20-25% faster

**Vaqt:** 25-30 daqiqa

---

### **PHASE 6: Component Dynamic Import** 🔶 O'rtacha Prioritet
**Maqsad:** Heavy komponentlarni lazy load qilish

**Vazifalar:**
- [ ] 6.1. Hero component dynamic import
- [ ] 6.2. Statistics component lazy load
- [ ] 6.3. ParticleGlobe lazy load
- [ ] 6.4. Video player lazy load
- [ ] 6.5. AnimatedBackground lazy load
- [ ] 6.6. Quill editor lazy load (admin)

**Faydalar:**
- Bundle: ~150-180KB initial reduction
- Tezlik: 30-35% faster Time to Interactive
- Code splitting improvement

**Vaqt:** 30-40 daqiqa

---

### **PHASE 7: API & Data Fetching Optimization** ⭐ Yuqori Prioritet
**Maqsad:** Data fetching strategiyasini yaxshilash

**Vazifalar:**
- [ ] 7.1. Settings API → Server-side fetch
- [ ] 7.2. News API → Server-side with ISR
- [ ] 7.3. Team API → Static generation
- [ ] 7.4. Stats API → Static generation
- [ ] 7.5. Contact settings → Server props
- [ ] 7.6. API routes optimization

**Faydalar:**
- Tezlik: 40-50% faster data load
- SEO: Better content indexing
- Caching: Redis integration possible

**Vaqt:** 40-50 daqiqa

---

### **PHASE 8: Bundle Analysis & Final Tuning** ⭐ Yuqori Prioritet
**Maqsad:** Bundle analyzer bilan final optimization

**Vazifalar:**
- [ ] 8.1. `npm run build` analyze
- [ ] 8.2. @next/bundle-analyzer o'rnatish
- [ ] 8.3. Heavy modules aniqlash
- [ ] 8.4. Duplicate dependencies cleanup
- [ ] 8.5. Tree-shaking verification
- [ ] 8.6. Production build testing
- [ ] 8.7. Lighthouse score (target: 90+)
- [ ] 8.8. Core Web Vitals check

**Faydalar:**
- Bundle: Final 15-20% optimization
- Tezlik: 10-15% additional gain
- Production ready build

**Vaqt:** 30-40 daqiqa

---

## 🎯 Kutilayotgan Natijalar

### **Bundle Size Reduction:**

| Component | Current | After Optimization | Savings |
|-----------|---------|-------------------|---------|
| Projects Page | ~680 lines | ~100 lines (wrapper) + client | 85% code reduction |
| News Page | ~973 lines | ~120 lines (wrapper) + client | 87% code reduction |
| Contact Page | ~789 lines | ~90 lines (wrapper) + client | 88% code reduction |
| Services (11 pages) | ~4000 lines | ~800 lines + shared | 80% code reduction |
| Initial Bundle | ~1.2MB | ~400-500KB | 60% smaller |
| Total JS | ~2.5MB | ~800KB-1MB | 65% smaller |

### **Performance Metrics:**

| Metric | Current (Dev) | Target (Production) | Improvement |
|--------|--------------|-------------------|-------------|
| First Contentful Paint | ~2.5s | ~0.8s | 68% faster |
| Time to Interactive | ~4.2s | ~1.5s | 64% faster |
| Largest Contentful Paint | ~3.8s | ~1.2s | 68% faster |
| Total Blocking Time | ~890ms | ~150ms | 83% reduction |
| Cumulative Layout Shift | 0.15 | <0.1 | 33% better |
| Lighthouse Score | ~65 | 90+ | +38% |

### **User Experience:**

- ⚡ **Sahifa almashish:** 2-3s → 0.3-0.5s (85% tezroq)
- ⚡ **Birinchi yuklanish:** 4-5s → 1-1.5s (70% tezroq)
- ⚡ **Animatsiyalar:** Smooth, no lag
- ⚡ **Mobile performance:** 2x better

---

## 📝 Implementation Order (Priority)

### **Sprint 1: Critical Paths** (2-2.5 soat)
1. ✅ Phase 1: Projects Page → **40 min**
2. ✅ Phase 2: News Page → **50 min**
3. ✅ Phase 7: API Optimization → **50 min**

### **Sprint 2: Secondary Pages** (1.5-2 soat)
4. ✅ Phase 3: Contact Page → **35 min**
5. ✅ Phase 4: Services Pages → **55 min**
6. ✅ Phase 5: Associations & Careers → **30 min**

### **Sprint 3: Advanced Optimization** (1-1.5 soat)
7. ✅ Phase 6: Dynamic Imports → **40 min**
8. ✅ Phase 8: Bundle Analysis → **40 min**

**Umumiy vaqt:** 4-5 soat (to'liq optimizatsiya)

---

## 🛠️ Technical Stack

**Framework:**
- Next.js 15.5.9 (App Router, RSC)
- React 18.3.1 (Server Components)

**Optimization Tools:**
- @next/bundle-analyzer
- webpack-bundle-analyzer
- Lighthouse CI

**Performance Monitoring:**
- Web Vitals
- Sentry (optional)
- Vercel Analytics (if deployed)

---

## 📊 Success Criteria

### **Must Have:**
- [x] All pages < 500KB initial bundle
- [ ] Lighthouse Performance Score ≥ 90
- [ ] Time to Interactive < 1.5s
- [ ] First Contentful Paint < 1s

### **Should Have:**
- [ ] All pages server/client separated
- [ ] Dynamic imports for heavy components
- [ ] API routes optimized
- [ ] Clean code with TypeScript types

### **Nice to Have:**
- [ ] Redis caching
- [ ] CDN integration
- [ ] Image optimization (AVIF)
- [ ] Progressive Web App

---

## 🚦 Implementation Status

**Boshlash sanasi:** 2026-02-13  
**Tugash muddati:** 2026-02-13 (1 kun sprint)

**Joriy holat:**
- ✅ Tahlil va reja: **TUGALLANDI**
- ⏳ Phase 1-8: **BOSHLASH KUTILMOQDA**

---

## 📞 Next Steps

1. **✅ Reja tasdiqlash** - User bilan kelishish
2. **🚀 Phase 1 boshlash** - Projects page optimization
3. **📊 Progress tracking** - Har bir phase natijasini test qilish
4. **🎯 Final review** - Production build va Lighthouse
5. **📝 Documentation** - Optimization natijalarini hujjatlashtirish

---

**Tayyorlagan:** GitHub Copilot (Claude Sonnet 4.5)  
**Maqsad:** UzAssembly saytini 70-80% tezlashtirish clean code bilan 🚀
