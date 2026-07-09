# Build Prompt — Crystal Tech Services Website

You are building a **premium, multi-page marketing website + community blog** for a technology company called **Crystal Tech Services**. Read this entire brief before writing any code. Follow the design direction exactly — the client has already rejected generic, templated output once, so distinctiveness matters.

---

## 0. NON-NEGOTIABLE DESIGN RULES (read first)

These were explicitly agreed with the client. Do not deviate.

1. **Premium, not generic.** The site must NOT look like a default AI-generated template. No square/blueprint grid backgrounds. No "big centered headline + three identical cards + gradient blob" layout. Take deliberate, distinctive layout decisions.
2. **Dark + premium aesthetic** with **liquid glass** (glassmorphism): frosted translucent surfaces, `backdrop-filter: blur()`, soft inner highlights, layered depth. Use real glass panels for nav, cards, chips.
3. **Minimal neon.** The teal accent is used on **only ~5–10% of any screen** — as a subtle accent, gradient text touch, or single highlight. Never flood the page with glowing teal. Premium = restraint.
4. **Balance toward Web Design.** Web Design & Development is the **flagship department** and must be visually the most prominent service (largest card / first position / "flagship" treatment). Do NOT over-emphasize security — security is the third department, not the hero of the site.
5. **Creativity-forward identity.** The brand tagline is **"Where creativity meets technology."** The company began as a creative design studio and grew into a tech company. The site should feel like it was made by people who care about design.
6. **Signature hero moment.** The homepage hero features the **M logo icon as a crystalline object floating inside a glass orb**, with a halo glow and glass chips floating around it (e.g. "crafted since 2020", "Herat → worldwide"). This plays on the brand name "Crystal" — glass, refraction, light. Add subtle motion/depth (float animation, parallax, or shimmer) but keep it elegant, not busy.
7. **Bilingual — working language switcher (EN + FA), not just a placeholder.** Put a **language icon** (a globe / translate icon — e.g. a lucide `Globe` or `Languages` icon) in the navbar. Clicking it toggles the entire site between **English (LTR)** and **Persian/Farsi (RTL)**. When Persian is active:
   - Set `<html dir="rtl" lang="fa">` and **mirror the whole layout** (navbar, grids, cards, footer) — this is a real RTL flip, not just translated text in an LTR frame.
   - Render **all Persian text in the `Vazirmatn` font** (load it from Google Fonts). English stays in Space Grotesk / Inter. Wire this so the body font-family switches with the language (e.g. a `lang-fa` class on `<html>` or via the `:lang(fa)` selector).
   - Numerals, alignment (text-align switches to right), and icon/chevron directions should follow RTL correctly.
   - Keep every UI string in a **single swappable strings object / dictionary** (an `en` and `fa` map) so both languages come from one source and nothing is hardcoded inline. **Full Persian translations for all navigation, buttons, headings, department/service copy, story, mission/vision, values, testimonials, blog flow, and contact are provided in §4B — use them; no English placeholders needed for Persian.**
   - The switcher must remember the choice (e.g. localStorage) so it persists across pages.
   - Use logical CSS properties throughout (`margin-inline`, `padding-inline`, `inset-inline`) so the mirror is clean and maintainable.
8. **Respect reduced-motion, keyboard focus, and full mobile responsiveness** as a quality floor.

---

## 1. BRAND & VISUAL IDENTITY

### Logo & assets
A logo kit exists. Use these assets (place them in `/assets/` — I will provide the PNG files; reference them by these names):
- `horizontal-dark.png` — horizontal logo, light text + teal "Tech", for DARK backgrounds → use in header & footer.
- `horizontal-light.png` — dark text version, for light backgrounds.
- `icon-teal.png` — the "M" symbol in teal → use in the hero glass orb, favicons, loading states.
- `icon-white.png`, `icon-black.png` — monochrome symbol variants.
- `vertical-dark.png` / `vertical-light.png` — stacked lockups.
- `favicon-512/192/64/32.png` — favicons (M icon on rounded dark tile).

**Logo usage rules (enforce these):**
- On dark backgrounds → `horizontal-dark.png`. On light backgrounds → `horizontal-light.png`. Never put the dark-text version on a dark background or vice-versa.
- Maintain clear space around the logo equal to the height of the "M" icon.
- Minimum logo width 120px; below ~48px use the icon alone.
- Never stretch, recolor, rotate, or add effects to the logo.

### Logo wordmark typography (for reference / consistency)
The logo wordmark itself is set in **Poppins** — "Crystal" in Bold, "Tech" in Light + teal. This weight-contrast is the brand's typographic signature. Echo that spirit (a confident bold paired with a lighter weight) in site headings where appropriate.

### Color palette (exact hex — from the brand style guide)
```
Backgrounds (layered dark):
  --bg:        #080B14   /* deepest page background */
  --bg-2:      #0B0F1C
  --surface:   #0F1524   /* raised surfaces */
  --elevated:  #1A2235   /* hover / highest layer */

Glass (translucent):
  --glass:         rgba(255,255,255,0.04)
  --glass-strong:  rgba(255,255,255,0.06)
  --glass-border:  rgba(255,255,255,0.10)

Accent (teal — USE SPARINGLY, ~5–10% max):
  --accent:     #22D3EE
  --accent-lt:  #5EEAD4
  --on-accent:  #04211F   /* text on a filled teal button */

Text:
  --text:    #FBFCFE   /* primary */
  --muted:   #9AA7BD   /* body / secondary */
  --muted-2: #5C6880   /* captions, labels */

Borders:
  --border:        rgba(255,255,255,0.07)
  --border-strong: rgba(255,255,255,0.13)
```
Ambient background should be soft radial gradients of teal/blue at very low opacity (like distant light through glass) — NOT a grid, NOT hard shapes.

### Typography (fonts — load from Google Fonts)
```
Display / headings:  'Space Grotesk', weights 400/500/700  — technical, geometric character
Body / paragraphs:   'Inter', weights 400/500/700
Data / labels / eyebrows / mono UI:  'Chivo Mono', weights 400/500
Persian (future RTL): 'Vazirmatn'  — geometric, pairs with Space Grotesk
```
Type treatment guidance:
- Big, confident display headings with tight negative letter-spacing (`-0.03em`).
- Use weight contrast within a single heading (bold word + light word) — echoing the logo.
- Selective gradient text on 1–2 key words per heading (white → teal), never on whole paragraphs.
- Eyebrows / section numbers / metadata in Chivo Mono, uppercase, wide letter-spacing (e.g. `01 — WHAT WE DO`).

---

## 2. SITE STRUCTURE (multi-page, 8 marketing pages + blog + auth)

### Header (persistent, glass, floating/rounded)
Nav: **Home · Services ▾ · About · Work · Blog · Contact**
Right side: a **language switcher icon** (globe/translate icon — clicking it flips the whole site between English LTR and Persian RTL with Vazirmatn font, per rule §0.7; may show a small `EN / فا` label beside the icon), a **Sign in** link, and a primary glass/teal button **"Start a project"**.
- `Services ▾` opens a **mega-dropdown with three columns**, one per department, listing services beneath each (structure in §3).

### Footer (glass top border)
4 columns: brand + tagline | Services links | Studio/Company links | Reach us (email, Herat Afghanistan, worldwide). Bottom bar: `© 2025 CRYSTAL TECH SERVICES` + `WHERE CREATIVITY MEETS TECHNOLOGY`.

### Pages to build
1. **Home**
2. **Services** (umbrella page → links to the 3 department pages)
3. **Web Design & Development** (department page)
4. **Infrastructure & Hosting** (department page)
5. **Cloud & IT Consulting** (department page)
6. **About** (company story + mission/vision + values + why-us + **team at the bottom of the page**)
7. **Work** (clients + testimonials)
8. **Contact** (form + locations)
9. **Blog** (article grid, categories, search)
10. **Article** (single post template)
11. **Sign in / Sign up** (auth screens)
12. **Author flow** (see §7 — post-login blog contribution: consent modal → submit article → "pending approval" author dashboard). Build these as **visual mockup states** for now; wire real backend later.

---

## 3. SERVICES — DEPARTMENTS & SERVICES

Three departments. **Web Design & Development is the flagship** (most prominent everywhere).

**Mega-dropdown / Services page columns:**

**Department 1 — Web Design & Development** *(flagship — largest, first)*
- Web Design & Development
- Custom Web Applications
- E-Commerce Development
- Software Development
- UI/UX Design

**Department 2 — Infrastructure & Hosting**
- Hosting & Domain Services
- Business Email Setup
- IT Infrastructure Assessment
- Cloud Migration Planning

**Department 3 — Cloud & IT Consulting**
- Cloud Solution Advisory
- Hosting & Domain Consultation
- Digital Transformation Advisory
- Cybersecurity Consulting

Each department heading links to its department page. On department pages, the individual services appear as **sections within the page** (not separate pages), each with its own description (copy in §4).

---

## 4. FINAL COPY (use verbatim; light polish allowed, keep meaning)

### Homepage hero
- Eyebrow: `WHERE CREATIVITY MEETS TECHNOLOGY`
- Headline: **Design that performs. Technology that lasts.** (weight-contrast + gradient on "performs")
- Lead: *From creative branding to full-scale digital transformation, we help businesses, NGOs, and startups build secure, scalable digital products — beautifully.*
- CTAs: `See our work →` (primary) · `Our services` (glass)
- Floating chips: `crafted since 2020`, `Herat → worldwide`
- Trust row label: `TRUSTED BY ORGANIZATIONS WORLDWIDE` + client names.

### Executive summary / intro (Home + About)
*Crystal Tech Services helps organizations move from idea to impact. We combine the discipline of engineering with the sensibility of design, delivering digital products and infrastructure that are dependable, secure, and built to grow. What began in 2020 as a creative design studio has grown into a technology solutions company serving businesses, NGOs, startups, and public organizations. Today our work spans web and software development, cloud and IT consulting, and cybersecurity advisory — always guided by a single principle: simplifying complexity for the people who rely on it.*

Headquarters line: *Headquartered in Herat, Afghanistan. Working with clients worldwide.*

Statement banner: **We build technology businesses can trust — and that people can actually use.**

### Department page intros & closings

**Web Design & Development**
Intro: *Your digital presence is often the first conversation a customer has with your brand — and it should leave the right impression. Our Web Design & Development department builds websites, applications, and digital platforms that are fast, secure, and built to grow with you. From a simple business website to a complex custom platform, we handle the design, the build, and everything in between.*
Closing: *Whether you're launching for the first time or rebuilding for scale, we deliver work that performs as well as it looks.*

**Infrastructure & Hosting**
Intro: *Behind every reliable website and business system is infrastructure that simply works. Our Infrastructure & Hosting department keeps your organization online, connected, and running without interruption. We manage the foundations — hosting, domains, business email, and the assessments and planning that keep your technology dependable as your needs change.*
Closing: *We take care of the technical groundwork so your team can focus on the work that matters.*

**Cloud & IT Consulting**
Intro: *Technology decisions shape the future of every organization. Our Cloud & IT Consulting department helps you make those decisions with confidence. We assess where you are, define where you need to be, and map a clear, practical path forward — covering cloud strategy, security, and long-term digital transformation. Our role is to give you honest guidance backed by real expertise.*
Closing: *Clear strategy, sound advice, and a partner invested in getting it right.*

### Individual service descriptions (use on department pages)

**Web Design & Development:** *Your website is the centre of your digital identity, and it needs to do more than exist — it needs to work. We design and build professional websites that load quickly, adapt to every screen, and guide visitors toward action. Every site we deliver is structured for performance, built on clean code, and shaped around your goals.*

**Custom Web Applications:** *When off-the-shelf tools no longer fit the way you work, a custom application closes the gap. We build tailored web applications that automate processes, manage data, and solve the specific challenges your business faces — developed around your workflow, not the other way around.*

**E-Commerce Development:** *Selling online should be seamless for your customers and manageable for you. We build e-commerce stores that combine secure payments, clear product presentation, and a smooth checkout experience that turns visitors into buyers — reliable, easy to manage, and ready to grow with your sales.*

**Software Development:** *Great software solves real problems. Our development team builds robust, purpose-built software that supports your operations and scales with your ambitions — planned, built, tested, and refined with care, tailored precisely to your requirements.*

**UI/UX Design:** *Good design is felt before it's noticed. We craft interfaces and experiences that are intuitive, clean, and genuinely enjoyable to use — combining thoughtful visual design with a clear understanding of how people interact with technology.*

**Hosting & Domain Services:** *Reliable hosting is the foundation of a dependable online presence. We provide secure, fast, well-managed hosting alongside straightforward domain services — handling uptime, security, and configuration so your site is always available when your customers need it.*

**Business Email Setup:** *Professional email builds trust and keeps communication organized. We set up secure, branded business email tied to your own domain — reliable, protected, and ready to work from day one.*

**IT Infrastructure Assessment:** *You can't improve what you haven't measured. We give you a clear, honest picture of your current systems — what's working, what's at risk, and where there's room to improve — with practical recommendations you can act on with confidence.*

**Cloud Migration Planning:** *Moving to the cloud deserves a solid plan. We map every stage of your migration — assessing systems, identifying priorities, and building a clear roadmap that minimizes disruption — so you transition smoothly, securely, and with operations intact.*

**Cloud Solution Advisory:** *The right cloud strategy can transform how your organization operates. Rather than a one-size-fits-all answer, we assess your situation and recommend a practical path that fits your goals, budget, and technical needs — delivering real, lasting value.*

**Hosting & Domain Consultation:** *Choosing the right hosting and domain setup shouldn't be guesswork. We provide clear, expert consultation to help you understand your options and decide what suits your organization's size, goals, and budget.*

**Digital Transformation Advisory:** *Digital transformation is about working smarter across your whole organization, not just adopting new technology. We help you rethink processes, adopt the right tools, and build a strategy that carries you into the future — so change becomes an advantage, not a disruption.*

**Cybersecurity Consulting:** *Security is essential to protecting your organization, your data, and your reputation. We help you identify vulnerabilities, strengthen defenses, and build practical safeguards against modern threats — with clear, actionable guidance you can trust.*

### About — Our Story timeline
- **2020 — The beginning:** *Crystal Tech Services was founded to deliver creative graphic design and digital branding. In its early years, the studio helped businesses and organizations build strong visual identities and establish a credible online presence.*
- **2023 — A strategic transformation:** *As client needs grew beyond branding, we saw rising demand for complete technology solutions. We evolved into a technology company spanning web development, software, cloud consulting, cybersecurity advisory, and digital transformation.*
- **Today — Creativity, engineered:** *We combine creativity with technology to help businesses, NGOs, startups, and organizations build secure, scalable, and innovative digital solutions that drive growth and long-term success.*

### Mission & Vision (use as written)
- **Mission:** *To simplify complexity for the organizations we serve — combining the discipline of engineering with the sensibility of design, so that every product and system we deliver is dependable, secure, and genuinely useful to the people who rely on it.*
- **Vision:** *To be the technology partner organizations trust for the full journey — from first impression to lasting infrastructure — proving that creativity and engineering, done right, are not a trade-off but a single standard.*

### Values (section title: "The principles behind our work")
- **Craftsmanship** — We care about the details others overlook — in design, in code, and in the finish of every deliverable.
- **Creativity with purpose** — Our roots in design mean every solution is made to be clear, usable, and genuinely helpful.
- **Partnership** — We work alongside our clients — listening first, advising honestly, and staying accountable.
- **Security by design** — We treat protection as a foundation, not an afterthought, so what we build can be trusted.
- **Built to scale** — We design for growth, so today's solution still serves you as your organization expands.
- **Adaptability** — We evolved from a studio into a technology company; that same willingness to grow guides our work.

### Why us (section title: "A rare combination: design sense and engineering depth")
Design-led origins · End-to-end capability · Security as standard · Local roots, global reach · Experienced leadership · Growth mindset. *(Merge the old "What clients can count on" list into this — do not create a third near-duplicate section; the client noted these overlapped.)*

### Stats (glass strip)
`2020` Founded · `3` Core practice areas · `14+` Combined years of expertise · `Global` Delivery reach (LT · JP)

---

## 4B. PERSIAN (FA) COPY — for the RTL version

Use these Persian translations in the `fa` strings dictionary (§0.7). All Persian text renders in **Vazirmatn**. Translations are professional and idiomatic (not literal). Brand name **Crystal Tech Services** and product/tech terms may stay in Latin script where that reads more naturally (common in Persian tech writing).

### Navigation & UI labels (fa)
- Home → `خانه`
- Services → `خدمات`
- About → `درباره ما`
- Work → `نمونه‌کارها`
- Blog → `بلاگ`
- Contact → `تماس`
- Sign in → `ورود`
- Sign up → `ثبت‌نام`
- Start a project → `شروع یک پروژه`
- See our work → `نمونه‌کارهای ما`
- Our services → `خدمات ما`
- Read more → `بیشتر بخوانید`
- All / Technology / Business / Tips / Company News → `همه` / `تکنولوژی` / `کسب‌وکار` / `نکته‌ها` / `اخبار شرکت`
- Search → `جستجو`

### Homepage hero (fa)
- Eyebrow: `جایی که خلاقیت با تکنولوژی گره می‌خورد`
- Headline: **طراحی‌ای که نتیجه می‌دهد. تکنولوژی‌ای که ماندگار است.**
- Lead: *از برندسازی خلاقانه تا تحول دیجیتال کامل، به کسب‌وکارها، سازمان‌های غیرانتفاعی و استارتاپ‌ها کمک می‌کنیم محصولات دیجیتال امن و مقیاس‌پذیر بسازند — با زیبایی.*
- Chips: `از سال ۲۰۲۰`, `هرات → سراسر جهان`
- Trust row: `مورد اعتماد سازمان‌ها در سراسر جهان`

### Executive summary / intro (fa)
*کریستال تک به سازمان‌ها کمک می‌کند از ایده به نتیجه برسند. ما نظم مهندسی را با ذوق طراحی درهم می‌آمیزیم و محصولات و زیرساخت‌های دیجیتالی می‌سازیم که قابل‌اعتماد، امن و آماده‌ی رشد هستند. آنچه در سال ۲۰۲۰ به‌عنوان یک استودیوی طراحی خلاق آغاز شد، امروز به یک شرکت راهکارهای تکنولوژی تبدیل شده که به کسب‌وکارها، سازمان‌های غیرانتفاعی، استارتاپ‌ها و نهادهای عمومی خدمت می‌کند. امروز کار ما از توسعه‌ی وب و نرم‌افزار تا مشاوره‌ی ابری و امنیت سایبری را دربر می‌گیرد — و همیشه یک اصل راهنمای ماست: ساده‌کردن پیچیدگی برای کسانی که به آن تکیه می‌کنند.*

- Headquarters line: *دفتر مرکزی در هرات، افغانستان. همکاری با مشتریان در سراسر جهان.*
- Statement banner: **تکنولوژی‌ای می‌سازیم که کسب‌وکارها به آن اعتماد کنند — و مردم واقعاً بتوانند از آن استفاده کنند.**

### Department intros & closings (fa)

**طراحی و توسعه‌ی وب**
- Intro: *حضور دیجیتال شما اغلب نخستین گفتگوی مشتری با برند شماست — و باید تأثیر درستی بگذارد. دپارتمان طراحی و توسعه‌ی وب ما، وب‌سایت‌ها، اپلیکیشن‌ها و پلتفرم‌های دیجیتالی می‌سازد که سریع، امن و آماده‌ی رشد با شما هستند. از یک وب‌سایت ساده‌ی کسب‌وکار تا یک پلتفرم اختصاصی پیچیده، طراحی، ساخت و همه‌چیز میان این دو را ما بر عهده می‌گیریم.*
- Closing: *چه برای نخستین‌بار راه‌اندازی می‌کنید و چه برای مقیاس بزرگ‌تر بازسازی، کاری تحویل می‌دهیم که به‌اندازه‌ی زیبایی‌اش، کارآمد است.*

**زیرساخت و میزبانی**
- Intro: *پشت هر وب‌سایت و سیستم کسب‌وکارِ قابل‌اعتماد، زیرساختی است که به‌سادگی کار می‌کند. دپارتمان زیرساخت و میزبانی ما سازمان شما را آنلاین، متصل و بدون وقفه نگه می‌دارد. ما پایه‌ها را مدیریت می‌کنیم — میزبانی، دامنه، ایمیل سازمانی، و ارزیابی‌ها و برنامه‌ریزی‌هایی که تکنولوژی شما را در برابر تغییر نیازها پایدار نگه می‌دارند.*
- Closing: *ما کارهای فنی زیربنایی را انجام می‌دهیم تا تیم شما روی کاری که واقعاً مهم است تمرکز کند.*

**مشاوره‌ی ابری و فناوری اطلاعات**
- Intro: *تصمیم‌های تکنولوژیک، آینده‌ی هر سازمانی را شکل می‌دهند. دپارتمان مشاوره‌ی ابری و IT ما کمک می‌کند این تصمیم‌ها را با اطمینان بگیرید. ارزیابی می‌کنیم کجا هستید، مشخص می‌کنیم کجا باید باشید، و مسیری روشن و عملی پیش پای شما می‌گذاریم — شامل راهبرد ابری، امنیت و تحول دیجیتال بلندمدت. نقش ما ارائه‌ی راهنمایی صادقانه بر پایه‌ی تخصص واقعی است.*
- Closing: *راهبرد روشن، مشاوره‌ی درست، و شریکی که به انجام درست کار متعهد است.*

### Individual service descriptions (fa)

- **طراحی و توسعه‌ی وب:** *وب‌سایت شما مرکز هویت دیجیتال شماست و باید فراتر از صرفِ وجود داشتن، واقعاً کار کند. ما وب‌سایت‌های حرفه‌ای طراحی و می‌سازیم که سریع بارگذاری می‌شوند، با هر صفحه‌نمایشی سازگارند و بازدیدکننده را به‌سوی اقدام هدایت می‌کنند — ساختاریافته برای کارایی، بر پایه‌ی کدِ تمیز و شکل‌گرفته حول اهداف شما.*
- **اپلیکیشن‌های وب اختصاصی:** *وقتی ابزارهای آماده دیگر با شیوه‌ی کار شما جور نیستند، یک اپلیکیشن اختصاصی این شکاف را پر می‌کند. ما اپلیکیشن‌های وب سفارشی می‌سازیم که فرایندها را خودکار می‌کنند، داده‌ها را مدیریت می‌کنند و چالش‌های خاص کسب‌وکار شما را حل می‌کنند — توسعه‌یافته حول جریان کاری شما، نه برعکس.*
- **توسعه‌ی فروشگاه اینترنتی:** *فروش آنلاین باید برای مشتریان شما بی‌دردسر و برای شما قابل‌مدیریت باشد. ما فروشگاه‌های اینترنتی می‌سازیم که پرداخت امن، نمایش شفاف محصول و تجربه‌ی خرید روان را کنار هم می‌آورند — قابل‌اعتماد، آسان برای مدیریت و آماده‌ی رشد با فروش شما.*
- **توسعه‌ی نرم‌افزار:** *نرم‌افزار خوب، مشکلات واقعی را حل می‌کند. تیم توسعه‌ی ما نرم‌افزارهای پایدار و هدفمند می‌سازد که از عملیات شما پشتیبانی می‌کنند و همراه بلندپروازی‌های شما مقیاس می‌گیرند — با دقت برنامه‌ریزی، ساخته، آزموده و پالوده شده، دقیقاً متناسب با نیازهای شما.*
- **طراحی رابط و تجربه‌ی کاربری (UI/UX):** *طراحی خوب، پیش از آنکه دیده شود، حس می‌شود. ما رابط‌ها و تجربه‌هایی می‌سازیم که شهودی، تمیز و واقعاً لذت‌بخش هستند — با ترکیب طراحی بصری سنجیده و درکی روشن از نحوه‌ی تعامل مردم با تکنولوژی.*
- **خدمات میزبانی و دامنه:** *میزبانی قابل‌اعتماد، پایه‌ی یک حضور آنلاین پایدار است. ما میزبانی امن، سریع و به‌خوبی مدیریت‌شده به‌همراه خدمات دامنه‌ی سرراست ارائه می‌دهیم — و آپ‌تایم، امنیت و پیکربندی را بر عهده می‌گیریم تا سایت شما همیشه در دسترس مشتریانتان باشد.*
- **راه‌اندازی ایمیل سازمانی:** *ایمیل حرفه‌ای، اعتماد می‌سازد و ارتباطات را منظم نگه می‌دارد. ما ایمیل سازمانی امن و برنددار مرتبط با دامنه‌ی خودتان راه‌اندازی می‌کنیم — قابل‌اعتماد، محافظت‌شده و آماده‌ی کار از روز نخست.*
- **ارزیابی زیرساخت فناوری اطلاعات:** *چیزی را که نسنجیده‌اید نمی‌توانید بهبود دهید. ما تصویری روشن و صادقانه از سیستم‌های کنونی شما ارائه می‌دهیم — چه چیزی کار می‌کند، چه چیزی در معرض خطر است و کجا جای بهبود دارد — همراه با پیشنهادهای عملی که می‌توانید با اطمینان اجرا کنید.*
- **برنامه‌ریزی مهاجرت به ابر:** *کوچ به ابر شایسته‌ی یک برنامه‌ی محکم است. ما هر مرحله از مهاجرت شما را ترسیم می‌کنیم — ارزیابی سیستم‌ها، تعیین اولویت‌ها و ساخت نقشه‌ی راهی روشن که اختلال را به کمینه می‌رساند — تا انتقالی روان، امن و بدون توقف عملیات داشته باشید.*
- **مشاوره‌ی راهکار ابری:** *راهبرد ابری درست می‌تواند شیوه‌ی کار سازمان شما را دگرگون کند. به‌جای یک پاسخ یکسان برای همه، وضعیت شما را ارزیابی می‌کنیم و مسیری عملی متناسب با اهداف، بودجه و نیازهای فنی شما پیشنهاد می‌دهیم — با ارزشی واقعی و ماندگار.*
- **مشاوره‌ی میزبانی و دامنه:** *انتخاب میزبانی و دامنه‌ی درست نباید حدس‌وگمان باشد. ما مشاوره‌ی روشن و تخصصی ارائه می‌دهیم تا گزینه‌هایتان را بشناسید و متناسب با اندازه، اهداف و بودجه‌ی سازمانتان تصمیم بگیرید.*
- **مشاوره‌ی تحول دیجیتال:** *تحول دیجیتال فراتر از به‌کارگیری تکنولوژی جدید است؛ درباره‌ی هوشمندانه‌تر کارکردن در سراسر سازمان است. ما کمک می‌کنیم فرایندها را بازاندیشی کنید، ابزارهای درست را به‌کار بگیرید و راهبردی بسازید که شما را به آینده برساند — تا تغییر، یک مزیت شود، نه یک اختلال.*
- **مشاوره‌ی امنیت سایبری:** *امنیت برای محافظت از سازمان، داده‌ها و اعتبار شما ضروری است. ما کمک می‌کنیم آسیب‌پذیری‌ها را شناسایی کنید، دفاع‌ها را تقویت کنید و در برابر تهدیدهای امروزی سپرهای عملی بسازید — با راهنمایی روشن و قابل‌اجرا که می‌توانید به آن اعتماد کنید.*

### About — Our Story timeline (fa)
- **۲۰۲۰ — آغاز:** *کریستال تک برای ارائه‌ی طراحی گرافیک خلاقانه و برندسازی دیجیتال بنیان‌گذاری شد. در سال‌های نخست، این استودیو به کسب‌وکارها و سازمان‌ها کمک کرد هویت بصری قوی و حضور آنلاین معتبری بسازند.*
- **۲۰۲۳ — یک تحول راهبردی:** *با رشد نیازهای مشتریان فراتر از برندسازی، تقاضای فزاینده برای راهکارهای کامل تکنولوژی را دیدیم. به یک شرکت تکنولوژی تبدیل شدیم که توسعه‌ی وب، نرم‌افزار، مشاوره‌ی ابری، امنیت سایبری و تحول دیجیتال را دربر می‌گیرد.*
- **امروز — خلاقیت، مهندسی‌شده:** *ما خلاقیت را با تکنولوژی درهم می‌آمیزیم تا به کسب‌وکارها، سازمان‌های غیرانتفاعی، استارتاپ‌ها و سازمان‌ها کمک کنیم راهکارهای دیجیتالِ امن، مقیاس‌پذیر و نوآورانه بسازند که رشد و موفقیت بلندمدت به ارمغان می‌آورد.*

### Mission & Vision (fa)
- **مأموریت:** *ساده‌کردن پیچیدگی برای سازمان‌هایی که به ما تکیه می‌کنند — با درهم‌آمیختن نظم مهندسی و ذوق طراحی، تا هر محصول و سیستمی که تحویل می‌دهیم قابل‌اعتماد، امن و واقعاً کارآمد باشد برای کسانی که به آن وابسته‌اند.*
- **چشم‌انداز:** *شریک تکنولوژیکی باشیم که سازمان‌ها در سراسر مسیر به آن اعتماد می‌کنند — از نخستین تأثیر تا زیرساخت ماندگار — و ثابت کنیم که خلاقیت و مهندسی، وقتی درست انجام شوند، نه یک دوراهی، بلکه یک استاندارد واحدند.*

### Values (fa) — عنوان بخش: `اصولی که پشت کار ماست`
- **صنعتگری** — به جزئیاتی اهمیت می‌دهیم که دیگران نادیده می‌گیرند — در طراحی، در کد و در پرداختِ نهایی هر تحویل‌دادنی.
- **خلاقیت هدفمند** — ریشه‌ی ما در طراحی است، پس هر راهکار طوری ساخته می‌شود که روشن، کاربردی و واقعاً مفید باشد.
- **همراهی** — کنار مشتریانمان کار می‌کنیم — اول گوش می‌دهیم، صادقانه مشاوره می‌دهیم و پاسخگو می‌مانیم.
- **امنیت از پایه** — محافظت را یک بنیان می‌دانیم، نه فکری در آخر کار، تا آنچه می‌سازیم قابل‌اعتماد باشد.
- **ساخته‌شده برای مقیاس** — برای رشد طراحی می‌کنیم، تا راهکار امروز، فردا هم که سازمان شما بزرگ‌تر شد، به کارتان بیاید.
- **انطباق‌پذیری** — ما از یک استودیو به یک شرکت تکنولوژی تبدیل شدیم؛ همان اشتیاق به رشد، راهنمای کار ماست.

### Why us (fa) — عنوان بخش: `ترکیبی کمیاب: حس طراحی و عمق مهندسی`
- `خاستگاه طراحی‌محور` · `توانمندی سرتاسری` · `امنیت به‌عنوان استاندارد` · `ریشه‌ی محلی، دسترسی جهانی` · `رهبری باتجربه` · `ذهنیت رشد`

### Stats (fa)
`۲۰۲۰` سال تأسیس · `۳` حوزه‌ی اصلی تخصص · `+۱۴` سال تجربه‌ی جمعی · `جهانی` گستره‌ی ارائه‌ی خدمات

### Team section title (fa): `تیم ما`
Roles: Director → `مدیر` · Senior Project Manager → `مدیر ارشد پروژه` · Project Coordinator → `هماهنگ‌کننده‌ی پروژه` · Regional Representative → `نماینده‌ی منطقه‌ای` · Backend Web Developer → `توسعه‌دهنده‌ی بک‌اند وب` · Software Engineer → `مهندس نرم‌افزار`. Keep personal names in Latin script.

### Testimonials (fa)
1. *«کریستال تک وب‌سایت ما را از پایه بازسازی کرد و تفاوت بلافاصله دیده شد — حالا واقعاً بازتاب‌دهنده‌ی کیفیت کار ماست.»* — [نام]، [سمت]، ONYX Luxury
2. *«آن‌ها فقط چیزی را که خواستیم نساختند — فهمیدند ما واقعاً چطور کار می‌کنیم و سیستمی ساختند که کاملاً به ما می‌خورد.»* — [نام]، [سمت]، Zaitoon Mall
3. *«قابل‌اعتماد، پاسخگو و واقعاً متعهد به انجام درست کار. حالا سیستم‌های ما به‌سادگی کار می‌کنند.»* — [نام]، [سمت]، Source.af

### Blog / Contribution flow (fa)
- Blog page intro: `اخبار، نکته‌های فنی و دیدگاه‌هایی درباره‌ی تکنولوژی و کسب‌وکار`
- Contribution modal: `مایل هستید مقاله‌ای در بلاگ ما منتشر کنید؟` → `بله` / `فعلاً نه`
- Consent step: `پیش از ادامه، لطفاً شرایط مشارکت را مطالعه و تأیید کنید.` + checkbox `شرایط را می‌پذیرم`
- Submit form title: `نوشتن مقاله` (fields: `عنوان`, `دسته‌بندی`, `تصویر شاخص`, `متن مقاله`, submit `ارسال برای بررسی`)
- Pending state: `مقاله‌ی شما در انتظار بررسی است.` + author dashboard statuses: `در انتظار` / `تأییدشده` / `ردشده`

### Contact (fa)
- Section title: `بیایید گفتگو کنیم` / form labels: `نام` · `ایمیل` · `موضوع` · `پیام` · button `ارسال پیام`
- Locations: `هرات، افغانستان` · `نماینده‌ی لیتوانی` · `نماینده‌ی ژاپن`

### Footer tagline (fa)
`جایی که خلاقیت با تکنولوژی گره می‌خورد` · `© ۲۰۲۵ کریستال تک`

Section title: **Our Team**. Display as glass cards with initials-avatar (no photos available). Highlight the ML/CV Master's as a strength.

1. **A. Matin Ebrahimi** — Director — Software Engineering — 6+ years
2. **M. Halim Souri** — Senior Project Manager — Computer Science — 3+ years
3. **A. Qasim Zolal** — Project Coordinator | Regional Representative, Lithuania — Project Management — 2+ years
4. **M. Ramin Afzali** — Backend Web Developer — Software Engineering — 3+ years
5. **Wazir Ahmad Matin** — Software Engineer | Regional Representative, Japan — Master's in Computer Vision / Machine Learning — 2+ years

---

## 6. WORK / CLIENTS PAGE

### Clients (render as a grid of glass boxes, each with a logo placeholder + brand name)
Hiwad Private High School · ARAA NGO · Sina Sohaib Logistic Service Company · Amin Danish Logistic Service Company · ONYX Luxury Afghanistan · Zaitoon Mall · Nokhba Sazan Private High School · Source.af · GSM Source · ODPA NGO · Jawidan Mobile · Fire Firmware

### Testimonials (3 — glass cards; these are placeholders, keep names/positions editable)
1. *"Crystal Tech rebuilt our website from the ground up, and the difference was immediate — it finally reflects the quality of what we offer."* — [Name], [Position], ONYX Luxury
2. *"They didn't just build what we asked for — they understood how we actually work and delivered a system that fits us perfectly."* — [Name], [Position], Zaitoon Mall
3. *"Reliable, responsive, and genuinely invested in getting it right. Our systems simply work now."* — [Name], [Position], Source.af

---

## 7. BLOG + AUTH + CONTRIBUTION FLOW

### Blog (public, separate page)
- Article **grid** of glass cards (thumbnail, category tag, title, excerpt, author, date, read-time).
- **Category filter** bar: All · Technology · Business · Tips · Company News.
- **Search** field.
- A **featured/hero article** at the top.
- Blog focus per client: *tech news, technical tips, technology & business insights relevant to their audience.*
- Anyone can READ the blog without an account.

### Single article page
Clean reading layout: large title, category, author + avatar, date, read-time, body with good typographic rhythm, share links, related posts at the bottom.

### Auth (Sign in / Sign up)
Glass-card centered auth screens. Sign up collects name, email, password. Keep it minimal and premium.

### Contribution flow (build as visual mockup states now; backend later)
This is the agreed logic — mock each state:
1. User signs in.
2. A **modal/pop-up** appears: *"Would you like to publish an article on our blog?"* → Yes / Not now.
3. If Yes → show a **consent agreement** (contributor terms) with an "I agree" checkbox + continue.
4. After agreeing → a **"Write / Submit article"** form (title, category, cover image, body/rich-text area, submit).
5. On submit → a **"Your article is pending review"** confirmation, and a simple **author dashboard** listing their submissions with status badges: `Pending` · `Approved` · `Rejected`.
6. Articles only go live after **manual approval by Crystal Tech** (admin moderation — mock an admin approval view if convenient, otherwise note it as backend TODO).

---

## 8. TECHNICAL & DELIVERY NOTES

- Suggested stack: modern responsive front-end (e.g. React + Tailwind, or clean semantic HTML/CSS/JS — your call, but keep it maintainable and component-based).
- Reusable components: `Header`, `Footer`, `GlassCard`, `Button` (primary/glass), `SectionEyebrow`, `Stat`, `TeamCard`, `ServiceCard`, `TestimonialCard`, `BlogCard`, `Modal`.
- Fonts via Google Fonts (`Space Grotesk`, `Inter`, `Chivo Mono`, `Vazirmatn`).
- All colors from CSS variables in §1. Enforce the "teal ≤10%" rule.
- Accessibility floor: semantic HTML, visible keyboard focus, `prefers-reduced-motion` respected, alt text on images, sufficient contrast.
- Fully responsive: mobile, tablet, desktop. The mega-dropdown collapses into an accordion on mobile.
- Implement the EN/FA language switcher as a **working feature** (see §0.7): a strings dictionary (`en`/`fa`), a runtime `dir` + `lang` toggle on `<html>`, font-family swap to `Vazirmatn` for Persian, full RTL mirroring via logical CSS properties, and persistence via localStorage.
- Ship the "quality floor" quietly: fast load, no layout shift, graceful hover/focus states.

## 9. WHAT SUCCESS LOOKS LIKE
A visitor should immediately feel this is a **premium, design-led technology studio that also has real engineering depth** — global-standard, distinctive, and unmistakably "Crystal" (glass, clarity, light). It must NOT feel like a generic template. Web design leads; security supports. Restraint with the teal. Craft in the details.
