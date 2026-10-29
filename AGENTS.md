# AGENTS.md · AI4YOU

אתר שיווקי לשירותי AI לעסקים באיחוד האמירויות. רמת עיצוב ובנייה של Awwwards, Mobile-first, באנגלית ובערבית (RTL).

**מקור האמת היחיד:** `docs/spec/ai4you-spec.pdf` (מסמך ייצור סופי, גרסה 1.0, 21.10.2026).
כל החלטה שלא מופיעה כאן חוזרת לאפיון. אם האפיון לא ברור או סותר את עצמו, **שואלים את תומס. לא מנחשים ולא ממציאים.**
תוכנית הבנייה: `docs/plan.md`.

---

## 1. כללי ברזל [החלטת תומס]

1. **אין הבטחות לוח זמנים.** לא "תוך ימים", לא "בשבוע", לא זמנים ליד שלבים. שלבים מוצגים תמיד בלי זמנים.
2. **אין הדגמה חיה, אין דמו, אין פיילוט.** אין כפתור "הזמן דמו", אין כפתור חיוג להדגמה.
3. **אין להמציא** מספרים, לקוחות, מותגים, הסמכות, ספקים, ציטוטים או טענות. משפט הטענה היחיד המאושר:
   "Years of experience. Hundreds of solutions. Every field." (והמקבילה בערבית מהאפיון).
4. **אין דפי תעשיות.** תחומים מופיעים רק כדוגמאות בתוך דפי השירות.
5. **אין חלק מייסד** ואין שמות או תמונות של אנשים (גם לא בדף אודות).
6. **אין משפט מעבר** (statementFocusIn לא בשימוש).
7. **אין פס תחתון קבוע.** בנייד יש רק כפתור וואטסאפ צף. (במחשב הצף מוצג גם הוא [המלצה].)
8. **טורקיז `#2CB5C5` רק כנגיעות:** נקודות, טבעות, אייקונים, קווי זרימה, פוקוס, מסגרת כפתור משני, קו תחתון של מילה אחת בכותרת.
   - טקסט טורקיז על רקע בהיר: רק `#1f7f8a` (hover: `#1a6d76`).
   - `#2CB5C5` כטקסט מותר רק על `#0b0c0e`.
   - **אסור:** כפתור מלא בטורקיז (גם לא ב-hover), רקע כרטיס או חלק, טקסט גוף בטורקיז, טקסט לבן על טורקיז.
   - כפתור ראשי: `#0d4a8f` (hover `#0a3c75`). כפתור משני: מסגרת טורקיז 1.5px, רקע שקוף, **לעולם לא מתמלא.**
9. **אין סגול.** ה-"Live" הירוק של xAIa מוחלף בטורקיז.
10. **אין תו em dash (—) באף שפה.**
11. **Mobile-first:** גרסת הטלפון וגרסת המחשב מתוכננות כל אחת בנפרד ובדיוק מלא, לא גרסה אחת שמתכווצת.
12. **בערבית:** `letter-spacing: 0` תמיד (אסור שלילי, שובר חיבורי אותיות), אין italic, line-height גדול ב-0.15 עד 0.2 מהאנגלית. הדגשה = משקל או קו תחתון טורקיז.
13. **מספר טלפון תמיד `dir="ltr"`**, גם בתוך טקסט ערבי. ספרות מערביות 0-9 בשתי השפות [המלצה].
14. **אין ellipsis (קיטוע) בתוכן.** כותרת שלא נכנסת בשתי שורות ב-360px יורדת שלב אחד בסולם, רק לשפה הזו, דרך `:lang(ar)` / `:lang(en)`.
15. **לוגואים של מותגים:** לא מציגים אף לוגו לפני שתומס סיפק ואישר. עד אז החלק מוצג בלי השורה הנעה.

## 2. חוקי הסימון באפיון

| סימון | משמעות | מה עושים |
|---|---|---|
| `[החלטת תומס]` | נעול | מיישמים בדיוק. לא משנים, לא "משפרים". שינוי רק באישור תומס. |
| ללא סימון | אושר על ידי תומס | מיישמים בדיוק, כמו החלטה נעולה. |
| `[המלצה]` | המלצה מקצועית | ברירת המחדל היא ההמלצה. מותר להציע חלופה **שקולה**, עם נימוק, ולתעד ב-`docs/plan.md` (החלטות פתוחות). |
| `[חסר: ...]` | חומר שתומס עוד לא סיפק | placeholder ברור וגלוי (ראו 3.4). **לא ממציאים תוכן במקומו.** |
| `[להחלטת תומס]` | במדיניות הפרטיות | נשאר כמו שהוא עד החלטה. |

## 3. שפות ותוכן

1. **האתר עולה באנגלית ובערבית בלבד.** `/en/...` ו-`/ar/...`. אין גרסה עברית ציבורית.
2. **העברית במסמך היא טיוטת עבודה בלבד.** לא מציגים אותה באתר ולא מתרגמים ממנה.
3. **אסור תרגום אוטומטי** (מכונה, LLM או כל כלי). משתמשים **רק** בנוסחי EN ו-AR כפי שהם כתובים באפיון, מילה במילה.
4. **placeholder לתוכן חסר:** מחרוזת גלויה ואחידה, `[TBC: <מה חסר>]` ב-EN ו-`[يُستكمل: <...>]` ב-AR (הנוסח שהאפיון עצמו משתמש בו בדף צור קשר). כל placeholder רשום ב-`docs/plan.md` סעיף 7.
5. **שמות השירותים נשארים באנגלית גם בערבית** (AI Agents, Conversational AI וכו'). בטופס, רק "Not sure yet" מתורגם. הערך הנשמר הוא ה-slug.
6. **מקור הטקסט הערבי:** שכבת הטקסט של ה-PDF שבורה בערבית (חילוץ טקסט מחזיר אותיות משובשות). לכן טקסט ערבי **לא מועתק מחילוץ אוטומטי של ה-PDF.** המקור הוא קובץ המקור של תומס, או תמלול מתוך עמודי ה-PDF המרונדרים כתמונה, מסומן `"verified": false` עד אישור תומס (פריט 24 בסעיף 14 באפיון).
7. כל הטקסטים באתר יושבים בקובצי מסרים (`messages/en.json`, `messages/ar.json`) או ב-CMS. אין טקסט קשיח בקומפוננטות.
8. כתבות בלוג נכתבות בנפרד לכל שפה, לא מתורגמות. hreflang רק כשיש מקבילה אמיתית.

## 4. כללי RTL ובינאום

- `<html lang="en" dir="ltr">` / `<html lang="ar" dir="rtl">`.
- **רק logical properties:** `margin-inline-start`, `padding-inline-end`, `inset-inline-end`, ובמחלקות Tailwind `ms- me- ps- pe- start- end- text-start text-end`. **אסור** `ml- mr- pl- pr- left- right- text-left text-right` בקוד שלנו (חריגים: transform/gradients שמטופלים עם `rtl:`).
- אייקונים כיווניים (חצים, chevrons): `rtl:-scale-x-100`. אייקונים לא כיווניים (וואטסאפ, טלפון) לא מתהפכים.
- שיקוף מלא בערבית: תפריט, לוגו, חץ "Details" (מצביע שמאלה), כרטיסיות, מתג בלי/עם (מתחיל מימין), אקורדיון (אייקון משמאל), marquee (כיוון הפוך: `translateX 0→50%`), וואטסאפ צף (פינה שמאלית תחתונה), קו התקדמות בשלבים.
- slugs באנגלית בשתי השפות (`/ar/services/ai-agents`).
- מתג שפה `EN / عربي` מעביר **לאותו דף** בשפה השנייה, ושומר `NEXT_LOCALE`.
- `/` מפנה לפי `Accept-Language` (ערבית ל-`/ar`, כל השאר ל-`/en`), ועוגיית `NEXT_LOCALE` גוברת.
- hreflang בכל דף: `en`, `ar`, `x-default` (מצביע ל-EN).

## 5. מערכת עיצוב

הערכים המדויקים מסעיף 4 באפיון מרוכזים ב-`docs/plan.md` סעיף 3 ומיושמים כטוקנים ב-Tailwind v4 (`@theme`). **אין ערכי צבע, פונט, ריווח, פינה, צל או easing מחוץ לטוקנים.** לא ממציאים צבעים חדשים, גם לא "כדי שייראה יותר AI".

## 6. תנועה

- GSAP + ScrollTrigger: **במחשב בלבד**, נטען דינמית בצד לקוח, דרך `gsap.matchMedia()`.
- Lenis: **במחשב בלבד**, כבוי ב-reduced-motion.
- Framer Motion: `whileInView` לכניסות.
- טלפון: אין scrub, אין parallax, אין Lenis. כניסות 0.45s / 16px / stagger 60ms (במקום 0.6s / 24px / 80ms). הזוהר ברצועה הכהה סטטי.
- `prefers-reduced-motion: reduce`: הכול מבוטל או fade של 0.2s, marquee עוצר ונגלל ידנית, אין autoplay לסרטון.

## 7. יעדי איכות (תנאי ל"סיימתי" בכל שלב)

- בדיקה ויזואלית עם צילומי מסך ב-360, 390, 430, 768, 1280, 1440, ב-EN וב-AR.
- כל כותרת עד 2 שורות ב-360px בשתי השפות. אין גלילה אופקית בשום רוחב.
- Hero: כותרת, משפט ושני הכפתורים גלויים ב-390x664 בלי גלילה.
- LCP < 2.5s, CLS < 0.1, INP < 200ms. Lighthouse Mobile: ביצועים 90+, נגישות 95+, SEO 100. JS ראשוני < 180KB gzip. axe ללא שגיאות.
- WCAG 2.1 AA: ניגודיות לפי טבלה 4.2, focus גלוי, מקלדת מלאה, מטרות מגע 44px, skip link.
- ריוויו עיצוב ונגישות עם הסקילים (סעיף 8) ותיקון, **לפני** שמראים לתומס.
- רשימת ה-QA המלאה: אפיון סעיף 13.1.

## 8. איזה סקיל להפעיל בכל משימה

הסקילים נמצאים ב-`.cursor/skills/` וב-`.agents/skills/`. קוראים את `SKILL.md` של הסקיל **לפני** שמתחילים את המשימה. כשסקיל ממליץ על משהו שסותר את האפיון, **האפיון גובר.**

| משימה | סקיל ראשי | סקילים משלימים |
|---|---|---|
| עיצוב חלק או דף חדש | `impeccable` (shape, ואז craft-floor) | `frontend-design`, `ui-ux-pro-max`, `emil-design-eng`, `visual-emphasis-and-hierarchy`, `layout-paradigms-and-consistency`, `gestalt-ui-organisation` |
| מערכת עיצוב וטוקנים | `design-system` | `brand-visual-language`, `component-family-consistency`, `button-states`, `elevation-and-depth`, `surface-separation`, `sizing-units`, `marketing-vs-product-system` |
| טיפוגרפיה | `impeccable` (typeset) | `modular-scale-typography` (לבדיקה בלבד, הסולם נעול באפיון) |
| אנימציה ו-GSAP | `gsap-react` + `gsap-scrolltrigger` | `gsap-core`, `gsap-timeline`, `gsap-performance`, `animate`, `motion-and-storytelling`, `micro-interactions`, `apple-design` (ידית המתג), `animation-vocabulary` |
| טפסים | `form-design` | `status-colors-and-errors`, `notifications-and-recovery`, `button-states`, `mobile-native` (iOS zoom, inputmode) |
| RTL ורספונסיב | `responsive-paradigms` | `sizing-units`, `sticky-and-fixed-elements` (header, וואטסאפ צף), `modal-and-overlay-patterns` (מגירת תפריט), `tab-navigation` (מתג בלי/עם), `scroll-areas` (צ'יפים נגללים), `global-toolbar-controls` (מתג שפה), `mobile-native`, `break-ui` (מחרוזות ערביות ארוכות) |
| נגישות | `wcag-accessibility` | `accessibility`, `web-design-guidelines` |
| ביצועים | `core-web-vitals` | `performance-and-web-vitals`, `performance`, `vercel-react-best-practices`, `loading-states-and-perceived-performance` |
| SEO | `seo` | `semantic-html-and-seo` |
| ריוויו עיצוב | `impeccable` (critique, audit, polish) | `web-design-guidelines`, `nielsen-usability-heuristics`, `break-ui` |
| ריוויו אנימציה | `review-animations` | `improve-animations`, `find-animation-opportunities` |
| ריוויו קוד ובדיקות | `requesting-code-review` | `verification-before-completion`, `webapp-testing` (Playwright, צילומי מסך), `systematic-debugging`, `receiving-code-review` |
| תכנון וביצוע שלבים | `writing-plans` | `executing-plans`, `brainstorming` |
| תלויות ואבטחה | `supply-chain-risk-auditor` | `sharp-edges` (טופס ו-API) |

לא רלוונטיים לפרויקט הזה (לא להפעיל בלי סיבה): `supabase*`, `app-shell`, `operational-expert-tool-ui`, `data-display-and-selection`, `coordinated-data-views`, `slides`, `banner-design`, `clone-website`, `firecrawl-*`, `extract-design`, `ask-sonner`, `publish-skill`, `setup-matt-pocock-skills`, `to-spec`, `to-tickets`.

## 9. עבודה ו-Git

- בנייה בשלבים לפי `docs/plan.md`. **בסוף כל שלב עוצרים ומראים לתומס** (צילומי מסך + תוצאות בדיקות). לא ממשיכים לשלב הבא בלי אישור.
- TypeScript strict. אין `any` בלי נימוק.
- GitHub: **רק החשבון `ceo7815`** (`github.com/ceo7815/<repo>`). לפני כל push או `gh repo create` לוודא ש-`gh` מחובר כ-`ceo7815`. לעולם לא ל-`ceo-digital` או לחשבון ישן.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
