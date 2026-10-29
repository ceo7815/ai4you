# AI4YOU · תוכנית בנייה

מקור: `docs/spec/ai4you-spec.pdf` (גרסה 1.0). מספרי הסעיפים בסוגריים מפנים לאפיון.
סטטוס: **אושר על ידי תומס (21.10.2026): "הכל לפי האפיון".** ההכרעות בשאלות הפתוחות בסעיף 8.

---

## 1. מפת דפים (5)

כל דף קיים ב-`/en` וב-`/ar`. slugs באנגלית בשתי השפות [המלצה].

| דף | נתיב | סעיף | שלב |
|---|---|---|---|
| דף הבית | `/[locale]` | 6 | 3 |
| AI Agents | `/[locale]/services/ai-agents` | 7.2 | 4 |
| Conversational AI | `/[locale]/services/conversational-ai` | 7.3 | 4 |
| AI Video & Content | `/[locale]/services/ai-video-content` | 7.4 | 4 |
| AI Systems & Automation | `/[locale]/services/ai-systems-automation` | 7.5 | 4 |
| AI Strategy & Consulting | `/[locale]/services/ai-strategy-consulting` | 7.6 | 4 |
| איך אנחנו עובדים | `/[locale]/how-we-work` | 8 | 4 |
| אודות | `/[locale]/about` | 9 | 4 |
| צור קשר | `/[locale]/contact` | 10 | 4 |
| בלוג, אינדקס | `/[locale]/blog` | 11.1 | 4 |
| בלוג, כתבה | `/[locale]/blog/[slug]` | 11.2 | 4 |
| בלוג, קטגוריה | `/[locale]/blog/category/[category]` [המלצה] | 11.3 | 4 |
| מדיניות פרטיות | `/[locale]/privacy` | 12 | 4 |
| 404 ו-500 | בשתי השפות | 13 | 4 |
| Styleguide (פנימי, `noindex`, לא ב-sitemap) | `/[locale]/styleguide` | 4 | 1 |
| `sitemap.xml`, `robots.txt`, RSS לבלוג | | 11.5, 13 | 6 |

**אין דפי תעשיות.** דף "תנאים" לא קיים באפיון (ראו שאלה פתוחה 3).

### ניווט (5)
- **Header:** Services (נפתח לחמשת השירותים) · How we work · About · Blog · `EN / عربي` · כפתור Let's talk (מוביל ל-`/contact`).
- **Footer:** שירותים · חברה (How we work, About) · Blog · Contact · Privacy · מתג שפה · פרטי קשר `[חסר]` · מספר רישיון עסק `[חסר]` · © AI4YOU.
- בדף הבית, "Let's talk" גולל לטופס `#contact-form` [המלצה]. "Message us on WhatsApp" פותח `wa.me` עם הודעה ממולאת לפי שפה.

### דף הבית, סדר סופי (6.0 עד 6.14)
| # | חלק | רקע | הערות |
|---|---|---|---|
| 6.0 | פס הכרזה | `#f5f5f5`, 40px | ריק כברירת מחדל, מופעל מ-CMS, X נשמר ב-localStorage. כשכבוי לא תופס מקום |
| 6.1 | Header | לבן / זכוכית בגלילה | 64px טלפון, 72px מחשב |
| 6.2 | Hero, CTA 1 | לבן | 7/12 + 5/12 במחשב. underline-draw על "your business" / "لأعمالك" |
| 6.3 | סרטון עלינו | `#0b0c0e` + entGlow | הרצועה הכהה היחידה. תווית עם נקודת ping. אין CTA |
| 6.4 | שירותים | לבן | 5 כרטיסיות, 3+2 במחשב |
| 6.5 | ניסיון ושורת מותגים | `#f5f5f5` | השורה הנעה מוסתרת עד שיסופקו לוגואים |
| 6.6 | בלי מול עם | לבן | מתג בטלפון, שתי עמודות במחשב |
| 6.7 | CTA 2 אמצע | `#f5f5f5` פינות 28px | ממורכז |
| 6.8 | איך אנחנו עובדים (תקציר) | לבן | 6 שלבים, קו מתמלא, בלי זמנים |
| 6.9 | שליטה ובקרה | `#f5f5f5` | פאנל הגדרות מדומה, 5 מתגים [המלצה] |
| 6.10 | מערכות שמחזיקות | לבן | 4 פריטים, 2x2 / 4 בשורה |
| 6.11 | הכול שלך | לבן | טקסט גדול, underline-draw על "Your data" |
| 6.12 | FAQ | `#f5f5f5` | 6 שאלות, 860px, FAQPage schema |
| 6.13 | CTA 3 וטופס | לבן | 7/12 טופס + 5/12 בלוק וואטסאפ |
| 6.14 | Footer | | |

הקצב (רקעים מתחלפים) הוא הצעה שלי שתואמת 4.4: רוב החלקים על לבן, מתחלפים על `#f5f5f5`, רצועה כהה אחת.

> הערה: ברשימת שלב 3 בבקשה שלך לא הופיעו 6.9, 6.10 ו-6.11. הם חלק מהאפיון, ולכן נכללים.

---

## 2. רשימת קומפוננטות

### תשתית ופריסה
- `LocaleLayout` (lang/dir, גופנים לפי שפה, preload לגופן הכותרת של השפה הפעילה)
- `Container` (1280 / 940 / 860 / 768 / 576), `Section` (ריווח וקצב רקע), `Grid12`
- `SkipLink`
- `AnnouncementBar` (CMS, localStorage)
- `Header` (זכוכית אחרי 8px), `DesktopNav` + `ServicesMenu`, `MobileDrawer` (focus trap, Esc, safe-area, ease-out-fluid 0.45s)
- `LanguageSwitcher` (אותו דף, `NEXT_LOCALE`, אירוע `language_switch`)
- `Footer`
- `WhatsAppFloat` (מופיע אחרי 40% מגובה ה-Hero, נעלם כשהטופס הסופי בתצוגה, פינה לפי שפה, safe-area)
- `Breadcrumbs` (+ BreadcrumbList schema)

### Primitives
- `Button` (primary / secondary-whatsapp, גדלים 36/48/52, full-width בטלפון, nowrap)
- `Heading` (H1/H2/H2-cta עם התאמת `:lang`), `AccentWord` (underline-draw או מרקר `#d5f0f3`, אחת לכותרת)
- `Eyebrow` / `Label` (Geist Mono), `StatusDot` (8px, ping)
- `IconCircle` (קו `#1f7f8a` על `#eef9fa`), `DirectionalIcon` (`rtl:-scale-x-100`)
- `Chip` / `ChipGroup` (נגלל אופקית, בחירה)
- `Accordion` (אחת פתוחה, 0.35s ease-out-soft, תשובות ב-HTML גם כשסגור)
- `SegmentedToggle` (tablist, entKnob)
- `Marquee` (42s, מסכת דהייה, עצירה ב-hover, כיוון לפי שפה, סטטי ב-reduced-motion)
- `StepsTimeline` (אנכי בטלפון / אופקי או ציר מרכזי במחשב, progress-line)
- `Reveal` (fade-rise + stagger, ערכים לפי טלפון/מחשב)

### חלקי דף הבית
`Hero`, `VideoBand` (`ResponsiveVideo`: 9:16 / 16:9, lazy ב-IntersectionObserver 200px, poster, כפתור קול 44px, VTT לפי שפה), `ServicesGrid` + `ServiceCard`, `ExperienceSection`, `WithoutWith`, `MidCta`, `HowWeWorkTeaser`, `ControlPanel` (5 מתגים מדומים), `BuiltToLast`, `OwnershipStatement`, `FaqSection`, `ContactSection` + `ContactForm`.

### טופס
`ContactForm` (Server Action + zod, שדות 56/52px, 16px, תוויות קבועות, `aria-describedby`), `PhoneInput` (קידומת `+971`, E.164), `InterestPicker` (צ'יפים / select), honeypot + Turnstile, `FormSuccess` (שלושת השלבים מ-10).

### דפים נוספים
`ServicePageTemplate` (7 חלקים: פתיחה, הבעיה, מה בונים, 4 דוגמאות עם סינון צ'יפים, שלבים, FAQ, CTA ייעודי, + 3 כתבות מאותה קטגוריה), `HowWeWorkPage`, `AboutPage`, `ContactPage`, `BlogIndex` (חיפוש, סינון 5 קטגוריות, CTA אחרי כרטיס 6, עימוד 12, skeleton), `BlogCard`, `ArticleTemplate` (7 חלקים, TOC דביק, זמן קריאה), `RichTextPage` (פרטיות), `NotFound`.

### SEO
`JsonLd` (Organization, Service, FAQPage, Article, BreadcrumbList), `generateMetadata` לכל דף ושפה, OG עם `next/og`.

---

## 3. טוקנים (סעיף 4, ערכים מדויקים)

### צבעים
| טוקן | ערך | שימוש |
|---|---|---|
| `ink` | `#0b0c0e` | כותרות, רצועה כהה |
| `ink-soft` | `#2e2e30` | טקסט משני כהה |
| `muted` | `#5c5f66` | גוף ותיאורים |
| `faint` | `#9a9ca1` | תוויות, טקסט חלש |
| `paper` / `card` | `#ffffff` | רקע עיקרי |
| `sand` | `#f5f5f5` | חלקים מתחלפים |
| `sand-2` | `#ebebeb` | מסגרות רכות |
| `line` | `#0a0a0a1a` | קווי הפרדה |
| `line-strong` | `#0a0a0a2e` | קווים חזקים |
| `brand-50…900` | `#edf3fa` `#d3e2f2` `#a7c5e5` `#6e9ed0` `#3a72b4` `#0d4a8f` `#0a3c75` `#082e5a` `#062240` `#04162b` | 500 = כפתור ראשי, 600 = hover |
| `accent-50…900` | `#eef9fa` `#d5f0f3` `#abe1e8` `#6bcbd6` · `#2cb5c5` (500) · `#259aa7` `#1f7f8a` `#1a6d76` `#0d363b` | כללים ב-AGENTS.md סעיף 1.8 |
| `whatsapp` / `whatsapp-dark` | `#25D366` / `#075e54` | צף בלבד / הדמיות בלבד |
| `gold` | `#ffd776` | נדיר, לא להשתמש בלי צורך |

### טיפוגרפיה
| תפקיד | EN | AR [המלצה] |
|---|---|---|
| H1 | Geist Sans 500 | IBM Plex Sans Arabic 600 |
| H2 (display) | Schibsted Grotesk (גיבוי Inter) | IBM Plex Sans Arabic 600 |
| גוף | Inter 400/500 | IBM Plex Sans Arabic 400/500 |
| תוויות ומספרים | Geist Mono | Plex Arabic לטקסט, Geist Mono לספרות |

- **H1:** `clamp(2.5rem, 4.7vw, 4.75rem)`, lh 1.02, ls -0.035em, max 18ch. AR: lh 1.2, ls 0, max 20ch.
- **H2:** `clamp(1.75rem, 3vw, 3rem)`; CTA: `clamp(2.2rem, 4vw, 3.4rem)`; lh 1.05 עד 1.12, ls -0.02em. AR: lh 1.25, ls 0.
- **גוף:** 16px טלפון / 18px מחשב, lh 1.6 (AR 1.75). טלפון: H1 40, H2 28, גוף 16, כיתוב 14.
- **סולם:** 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72. `tracking-tight` = -0.025em (EN בלבד).
- גופנים: woff2, subset, `font-display: swap`, preload רק לגופן הכותרת של השפה הפעילה.

### פריסה, ריווח, פינות, צללים
- יחידה 4px. מכולות: 1280 / 940 / 860 / 768 / 576.
- שוליים צידיים: 20 / 32 / 40px [המלצה]. ריווח חלקים: 48 עד 56px טלפון, 80 עד 128px מחשב.
- Hero padding-top: 7.5rem / 8.5rem (פס הכרזה כבוי), 10.5rem / 11.5rem (פועל).
- נקודות שבירה: בסיס 360 עד 639 (מתוכנן ב-390), sm 640, md 768, lg 1024, xl 1280.
- פינות: כרטיסים 12 עד 24px, סרטון 24/28, שדות 12px, כפתורים full.
- צללים: כפתור ראשי `inset 0 1px 0 0 rgba(255,255,255,.15)`; כרטיס hover `0 12px 32px -12px rgba(11,12,14,.18)`; וואטסאפ `0 8px 24px rgba(0,0,0,.18)`.
- פוקוס: `outline: 2px solid #2CB5C5; outline-offset: 2px` + טבעת פנימית 1px `#1f7f8a` על לבן.

### תנועה
| טוקן | ערך |
|---|---|
| `ease-out-soft` | `cubic-bezier(.22,1,.36,1)` (כניסות) |
| `ease-out-quart` | `cubic-bezier(.165,.84,.44,1)` |
| `ease-out-quad` | `cubic-bezier(.25,.46,.45,.94)` |
| `ease-out-fluid` | `cubic-bezier(.32,.72,0,1)` (מגירות) |
| `ease-loop-a` / `ease-loop-b` | `cubic-bezier(.65,0,.35,1)` / `cubic-bezier(.45,0,.25,1)` |
| `ease-knob` | `cubic-bezier(.34,1.4,.64,1)` |
| ברירת מחדל | 150ms `cubic-bezier(.4,0,.2,1)` |

Keyframes: `fade-rise`, `underline-draw` (0.8s), `marquee` (42s / 70s), `float-soft` (7s, ±10px, Hero מחשב), `ping` (1s), `entGlow` (18s alternate, מחשב), `entKnob` (0.5s), `entWire` / `entPulse` (2.4 עד 8s), `progress-line`, `skeleton` (2s). Hover: כפתור -2px, כרטיס -4px + קו 1.5px `#2CB5C5` + חץ זז 4px, 200ms ease-out-soft.

זוהר הרצועה הכהה: `radial-gradient(40% 50% at 70% 30%, rgba(44,181,197,.22), transparent 70%), radial-gradient(35% 45% at 30% 80%, rgba(13,74,143,.30), transparent 70%)`.

---

## 4. Stack (סעיף 13, [המלצה])

Next.js App Router (SSG/ISR) · TypeScript strict · Tailwind CSS v4 (logical properties + `rtl:`) · next-intl (`[locale]`, middleware, `NEXT_LOCALE`) · GSAP + ScrollTrigger (מחשב, dynamic import) · Lenis (מחשב) · Framer Motion · zod + Server Action · Cloudflare Turnstile + honeypot · Playwright לצילומי מסך ובדיקות · Lighthouse CI.

---

## 5. סדר בנייה

כל שלב נגמר בעצירה לאישור, עם צילומי מסך ב-360/390/430/768/1280/1440 ב-EN וב-AR, תוצאות Lighthouse, וריוויו עיצוב ונגישות לפי AGENTS.md סעיף 8.

| שלב | תוכן | תוצר לבדיקה |
|---|---|---|
| **0** | סקילים, קריאת האפיון, AGENTS.md, plan.md | המסמך הזה |
| **1** | Next.js + TS strict + Tailwind v4 + next-intl (`/en`, `/ar`, middleware, `NEXT_LOCALE`, hreflang, lang/dir). כל הטוקנים. גופנים לפי שפה. `/styleguide` שמציג צבעים, טיפוגרפיה, סולם, ריווח, פינות, צללים, easing, כפתורים ופוקוס, ב-EN וב-AR | `/en/styleguide`, `/ar/styleguide` |
| **2** | Header (טלפון + מחשב), MobileDrawer, ServicesMenu, Footer, WhatsAppFloat, LanguageSwitcher, AnnouncementBar, SkipLink | שלד דף עם header/footer בשתי השפות |
| **3** | דף הבית חלק אחרי חלק (6.2 עד 6.13), כל חלק מתוכנן בנפרד לטלפון ולמחשב. טופס עם Server Action (שליחה אמיתית מחכה לספק, ראו שאלה 6) | דף הבית המלא |
| **4** | 5 דפי שירות, How we work, About, Contact, Blog (אינדקס, כתבה, קטגוריה), Privacy (תבנית), 404/500 | כל הדפים |
| **5** | GSAP + ScrollTrigger (מחשב, דינמי), Lenis (מחשב), Framer Motion, גרסה קלה בטלפון, reduced-motion מלא, ויזואל Hero במחשב | הקלטות מסך + Lighthouse |
| **6** | metadata, OG (`next/og`), sitemap עם alternates, robots, schema (Organization, Service, FAQPage, Article, BreadcrumbList), RSS, נגישות ו-QA מלא לפי 13.1, ביצועים | דוח QA מלא |

הערה לשלב 3: אנימציות כניסה בסיסיות (`fade-rise` ב-CSS / Framer Motion) נבנות כבר עם החלקים, כדי שלא נצטרך לשבור פריסה בשלב 5. ה-scrub, Lenis וה-GSAP נכנסים בשלב 5.

---

## 6. החלטות [המלצה] שאני מאמץ כברירת מחדל

- Arabic: IBM Plex Sans Arabic לכותרות ולגוף (משקלים 400/500/600), בלי Noto Kufi, כדי לחסוך גופן.
- ספרות מערביות בשתי השפות. slugs באנגלית.
- רק שאלה אחת פתוחה באקורדיון. וואטסאפ צף גם במחשב, מוסתר כשהטופס הסופי בתצוגה.
- שם העסק ותחום העניין: שדות חובה.
- בטלפון: בלי Lenis, בלי scrub, בלי parallax.
- דף "איך אנחנו עובדים" במחשב: ציר אנכי במרכז עם שלבים לסירוגין.
- ויזואל Hero במחשב (5/12): קומפוזיציית SVG מופשטת של קווי זרימה (`#abe1e8`) עם פולסים (`#2CB5C5`) ונקודות brand, ב-float-soft. בלי ממשק מוצר מזויף ובלי מספרים. נבנה בשלב 5, ואציג לך 2 כיוונים לבחירה.

---

## 7. כל ה-[חסר] (סעיף 14) ואיך הם מוצגים עד שיסופקו

| # | פריט | מי | איפה באתר | placeholder בינתיים |
|---|---|---|---|---|
| 1 | לוגו AI4YOU SVG (כהה ובהיר, favicon) | תומס | Header, Footer, OG, favicon, schema | wordmark טקסטואלי זמני "AI4YOU" (ה-PNG ששלחת בהיר מדי ל-header לבן) |
| 2 | רשימת מותגים, לוגואים SVG ואישור | תומס | 6.5, אודות | החלק מוצג בלי השורה הנעה |
| 3 | תסריט הסרטון | תומס | 6.3 | אין |
| 4 | סרטון אנכי 1080x1920, רחב 1920x1080, poster, VTT ב-EN וב-AR | תומס / הפקה | 6.3 | poster זמני כהה עם התווית, VTT ריק |
| 5 | מספר וואטסאפ עסקי | תומס | כל כפתורי הוואטסאפ | `wa.me/971XXXXXXXXX` מוגדר ב-env, מסומן TBC |
| 6 | טלפון | תומס | צור קשר, Footer, פרטיות | `[TBC: phone]` |
| 7 | מייל | תומס | צור קשר, Footer, פרטיות, יעד הטופס | `[TBC: email]` |
| 8 | כתובת משרד | תומס | צור קשר, Footer, פרטיות | `[TBC: office]` |
| 9 | רישיון עסק: מספר ורשות | תומס | Footer, פרטיות 1 | `[TBC: licence]` |
| 10 | שם החברה המשפטי | תומס | פרטיות, Footer | `[TBC: legal name]` |
| 11 | מקום רישוי (מיינלנד, אזור חופשי, DIFC, ADGM) | תומס + עו"ד | פרטיות 12 | |
| 12 | כלי אנליטיקה ופיקסלים, באנר עוגיות | תומס | באנר, אירועים, פרטיות 3/6/7 | בלי אנליטיקה ובלי באנר; שכבת אירועים מוכנה וכבויה |
| 13 | הסכמה לשיווק | תומס | תיבה בטפסים, פרטיות 4 | בלי תיבה |
| 14 | ספקים: אחסון, משלוח טפסים, CRM | תומס | טופס, אחסון, פרטיות 6 | Server Action עם מתאם שליחה שמחכה לספק |
| 15 | מיקום שמירת המידע | תומס | פרטיות 8 | |
| 16 | תקופות שמירה | תומס | פרטיות 10 | |
| 17 | אמצעי אבטחה בפועל | תומס | פרטיות 11 | |
| 18 | DPO | תומס | פרטיות 1 | |
| 19 | נספח עיבוד מידע בהסכמי לקוח | תומס + עו"ד | לא באתר | |
| 20 | תאריך עדכון המדיניות | תומס | ראש דף הפרטיות | |
| 21 | בדיקת עורך דין | עו"ד | לפני פרסום | |
| 22 | גרסאות EN ו-AR למדיניות | אחרי 11 עד 18 | `/en/privacy`, `/ar/privacy` | דף תבנית עם הודעת "in preparation", `noindex` |
| 23 | מספר שנות ניסיון (אופציונלי) | תומס | 6.5, אודות | הנוסח "Years of experience" כמו שהוא |
| 24 | אישור סופי לכל הנוסח ב-EN וב-AR | תומס | כל האתר | |
| 25 | מחקר מילות חיפוש ותוכן הכתבות הראשונות | תומס / כותב | בלוג | בלוג עם מצב ריק (אין כתבות מומצאות) |
| 26 | דומיין | תומס | canonical, hreflang, sitemap, פרטיות | `NEXT_PUBLIC_SITE_URL` ב-env |
| 27 | כותרת דף הבלוג | תומס | `/blog` | ההמלצה: "AI insights for your business" |

חסרים נוספים שעלו בקריאה (לא ברשימה של סעיף 14): מפתחות Cloudflare Turnstile; החלטת אחסון (Vercel או Cloudflare, סעיף 13); בחירת CMS (Sanity או Payload).

---

## 8. שאלות פתוחות לתומס

**הכרעה (תומס, 21.10.2026): "הכל לפי האפיון".** המשמעות שיושמה:
1. ערבית: אין קובץ מקור. מתמללים מעמודי ה-PDF המרונדרים, כל מחרוזת מסומנת "ממתין לאימות" (פריט 24).
2. צבעים: בדיוק לפי 4.4. רצועה כהה אחת (הסרטון), טורקיז רק כנגיעות, אין סגול.
3. תנאים: אין דף Terms (לא קיים באפיון). רק `/privacy`.
4. כפתורים: Hero בטלפון 52px (טבלה 3, ספציפית ל-Hero). שאר הכפתורים ברוחב מלא בטלפון 48px (4.5).
5. CMS: האפיון מתיר "CMS או קובצי מסרים". שלבים 1 עד 3 בקובצי מסרים. Sanity או Payload יוחלט ויחובר בשלב 4 (בלוג, פס הכרזה, פרטיות).
6. טופס: פריט 14 חסר, לכן מתאם שליחה שרושם ללוג עד שיסופק ספק.

השאלות המקוריות:

1. **הטקסט הערבי ב-PDF לא ניתן לחילוץ.** שכבת הטקסט של הגופן הערבי שבורה, וכל העתקה מה-PDF מחזירה אותיות משובשות. התצוגה עצמה תקינה. יש קובץ מקור (Google Doc / DOCX)? אם לא, אתמלל מהעמודים כתמונה ואסמן כל מחרוזת כ"ממתין לאימות".
2. **צבעים ו"וואו".** ביקשת צבעים מרשימים לתחום AI, והאפיון קובע: רוב הדפים על לבן, רצועה כהה אחת, טורקיז רק כנגיעות, בלי סגול. אני מתכנן להשיג את האפקט דרך טיפוגרפיה, תנועה, הרצועה הכהה עם entGlow וויזואל ה-Hero, בתוך הפלטה. מותר להוסיף רצועות כהות (`ink` / `brand-800` עד `900`) מעבר לאחת?
3. **דף תנאים.** ביקשת "מדיניות פרטיות ותנאים", ובאפיון אין דף Terms ואין לו נוסח. לבנות רק פרטיות, או תבנית Terms ריקה עם placeholder?
4. **גובה כפתורי Hero בטלפון.** טבלה 3 אומרת 52px, וסעיף 4.5 אומר 48px לכפתור ברוחב מלא בטלפון. מה נכון?
5. **CMS.** האפיון ממליץ Sanity או Payload. להתחיל עם קובצי מסרים בריפו (כל הטקסטים) ולחבר CMS לפני העלייה, או להקים CMS כבר עכשיו? (בלוג, פס הכרזה ופרטיות תלויים בזה.)
6. **שליחת הטופס.** עד שתבחר ספק מייל ו-CRM, הטופס ייבנה מלא עם ולידציה, ובשרת יירשם ללוג בלבד. מקובל?
