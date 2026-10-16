# Minecraft Hub: Poori Guide (Hinglish)

Ye ek static website hai: koi server, database ya coding setup nahi chahiye. Bas files edit karo aur upload karo.

---

## 1. Folder me kya kya hai

```
minecraft-hub/
├─ index.html          ← main page (isko mat chhedo)
├─ css/style.css       ← design / colours
├─ js/
│  ├─ config.js        ← SITE SETTINGS: naam, social links, email, disclaimer, sounds
│  ├─ listings.js      ← SAARI LISTINGS yahan hain (mods, shaders, etc.)
│  └─ app.js           ← website ka logic (mat chhedo)
├─ images/             ← listing ki images yahan daalo
└─ sounds/             ← (optional) apni sound files
```

Tumhe sirf **3 cheezein** edit karni hain: `js/config.js`, `js/listings.js`, aur `images/` folder.

**Edit kaise karein:** Notepad chalega, par free **VS Code** (code.visualstudio.com) better hai, kyunki galti hone pe rang se dikha deta hai.

---

## 2. Pehli baar setup (5 minute)

`js/config.js` kholo aur ye badlo:

| Kya | Kahan |
|---|---|
| Channel ka naam | `siteName: "Your Channel Name"` |
| Hero ka title / line | `heroTitle`, `heroSubtitle` |
| Logo (optional) | `logo: "images/logo.png"` (square image `images/` me daalo) |
| YouTube / Discord / Telegram links | `socials: [ ... ]` me `url` (aur chaaho to `handle`). `url` khali `""` ho to wahan "Coming soon" dikhta hai. Channel / server ban jaye to link paste kar do |
| Email | `contactEmail` (already `businesszuhaibag@gmail.com` set hai) |
| Disclaimer text | `disclaimer: "..."` |
| Ek page me kitni listings | `perPage: 9` |

Social links **top-left "Socials" button** me aur **sabse niche footer** me, dono jagah apne aap aa jayenge.

Disclaimer **har listing ke andar apne aap** dikhta hai, aur email click karne pe mail khulti hai jisme subject me us listing ka naam bhi aa jata hai.

---

## 2b. Theme (rang / background) aur heading badalna

`js/config.js` me:

```js
heroTitle: "ZUHAIB OG's Files",                 // bada metal-foil heading
heroLine:  "Download Everything in One Place",  // uske neeche wali line ("" = nahi dikhegi)
theme: "gold",
```

| `theme:` | Look |
|---|---|
| `"gold"` | black + royal gold |
| `"silver"` | graphite + chrome silver |
| `"ember"` | deep brown + orange gold |
| `"emerald"` | Minecraft green |
| `"ender"` | violet + diamond cyan |
| `"nether"` | crimson + rose |

**Bina file badle theme dekhna:** website khulne ke baad address bar me `index.html` ke aage `?theme=silver` likh ke Enter dabao (jaise `.../index.html?theme=ember`). Jo pasand aaye, wahi naam `config.js` ke `theme:` me likh do.

---

## 3. Website apne PC pe dekhna

`index.html` pe **double-click** karo. Browser me khul jayegi. Har change ke baad file save karke browser me **F5** dabao.
(Fonts internet se aate hain, offline me bhi chalegi bas font thoda alag dikhega.)

---

## 4. Nayi listing kaise add karein

1. Image ko `images/` folder me daalo, jaise `images/my-pack-1.jpg`.
2. `js/listings.js` kholo. Upar ek **template** likha hai, usko copy karo.
3. `window.LISTINGS = [` ke **theek neeche** paste karo (sabse upar. Date naya hoga to wo upar hi dikhegi).
4. Values badlo:

```js
{
  id: "my-new-pack",                // unique, chhote letters, bina space (- use karo)
  title: "My New Pack",
  category: "modpacks",             // modpacks | shaders | mods | models | textures
  date: "2026-10-12",               // YYYY-MM-DD
  tags: ["1.20.1", "Forge"],        // chote labels
  images: [
    "images/my-new-pack-1.jpg",     // pehli image = showcase image
    "images/my-new-pack-2.jpg"      // zyada images = gallery (thumbnails)
  ],
  description: `Chota sa description.

Nayi paragraph ke liye ek khali line chhodo.`,
  downloads: [
    { label: "Download (Mediafire)", url: "https://..." },
    { label: "Download (Mega)",      url: "https://..." }
  ],
  owned: false,                     // true = tumne khud banaya ("Made by me" badge)
  credit: "Original Creator Name",
  creditUrl: "https://..."          // asli owner ka page (nahi hai to "")
},
```

5. Save karo, `index.html` refresh karo. Ho gaya.

**Zaroori rules:**
- Har listing ke `}` ke baad **comma `,`** lagao.
- Text hamesha `"quotes"` me. Description ke liye `` `backticks` `` (keyboard pe `~` wali key) use karo, taaki multiple lines likh sako.
- Image ka naam bilkul wahi likho jo folder me hai (capital/small letters matter karte hain).

---

## 5. Listing edit / change karna

| Kya badalna hai | Kya karna hai |
|---|---|
| **Description** | `listings.js` me us listing ka `description:` badlo |
| **Showcase image** | Nayi image `images/` me daalo, `images: [...]` me pehli image ka naam badlo |
| **Gallery me image add** | `images: [...]` me aur naam jodo (comma ke saath) |
| **Download link** | `downloads: [...]` me `url:` badlo |
| **Naya download button** | `{ label: "Download (Drive)", url: "https://..." },` jodo |
| **Title / tags / version** | `title:` / `tags:` badlo |
| **Listing delete** | Us listing ka poora `{ ... },` block delete kar do |
| **Credit / own** | `owned: true` ya `credit: "Naam"` |

Save, refresh, done. Agar website pehle se publish ho chuki hai to naye version ko dobara upload karo (neeche section 8).

---

## 6. Images ke tips

- Size **1280×720** (16:9) rakho. Showcase isi ratio me sabse acchi dikhti hai.
- **JPG ya WEBP**, 300–600 KB tak. Bahut badi images website slow kar deti hain (squoosh.app pe free compress ho jati hain).
- File ka naam: chhote letters, bina space ke: `skyblock-1.jpg`.
- Image na ho ya naam galat ho to card pe rangeen placeholder dikhta hai. Website kharab nahi hoti.

---

## 7. Download links ke tips

- Badi files (modpack, shaders) **website folder me mat daalo**. Mediafire / Mega / Google Drive / GitHub Releases pe upload karke uska link `downloads` me lagao.
- **Google Drive:** Share → "Anyone with the link" karo, warna log download nahi kar payenge.
- Jahan possible ho, asli creator ka **Modrinth / CurseForge / GitHub page** `creditUrl` me daalo. Credit bhi ho jata hai aur log original source tak bhi pahunchte hain.
- Jab tak `url` me `"#"` hai (sample listings me), button sirf sound bajata hai, kahin le jata nahi.

---

## 8. Website publish kaise karein (free)

### Option A: Netlify Drop (sabse aasaan, 2 minute)
1. Browser me `app.netlify.com/drop` kholo (free account bana lo).
2. Poora `minecraft-hub` **folder** screen pe drag-and-drop kar do.
3. Kuch seconds me link mil jayega, jaise `random-name.netlify.app`. Site settings me **Change site name** se naam badal sakte ho.
4. **Update karna ho:** Netlify me apni site kholo → **Deploys** tab → naya/updated folder wahi drag-and-drop kar do.

### Option B: GitHub Pages (updates ke liye best)
1. `github.com` pe free account banao → **New repository** (naam jaise `minecraft-hub`, **Public**).
2. **Add file → Upload files** me folder ke **andar ki files** (index.html, css, js, images...) drag karo. Folder khud nahi, uske contents, taaki `index.html` repo ke root me ho. **Commit changes** dabao.
3. Repo me **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **(root)** → **Save**.
4. 1–2 minute baad link: `https://tumhara-username.github.io/minecraft-hub/`
5. **Update karna ho:** GitHub me file kholo → pencil (✏️) icon → edit → **Commit**. Nayi image ke liye **Add file → Upload files**. Ek-do minute me live ho jata hai.

### Option C: Cloudflare Pages
Cloudflare dashboard → Workers & Pages → Create → Pages → **Upload assets** → folder upload. Free aur fast.

> Platforms ke buttons/naam kabhi kabhi thode badal jate hain. Idea wahi rehta hai: folder upload, link mil jata hai.

**Apna domain** (jaise `mychannel.com`) chahiye to domain kharidne ke baad Netlify / GitHub Pages / Cloudflare teeno me "Custom domain" ka option milta hai. Ye optional hai.

**Listing ka direct link YouTube description me dena:** website pe wo listing kholo aur browser ki address bar se link copy karo (`...#/l/my-new-pack`).

---

## 9. Sound effects

Teen alag sounds hain, aur koi file daalne ki zaroorat nahi, browser khud bana leta hai:

| Kab bajta hai | Sound |
|---|---|
| Listing (card) pe click | halka rising "pop" |
| Download button pe click | alag chime, thump ke saath |
| Baaki buttons (chips, pages, menu, back) | chhota soft tick |

Top-right ke speaker icon se visitor mute/unmute kar sakta hai (browser yaad rakhta hai).

**Apni sound lagani ho:** `.mp3` / `.wav` file `sounds/` folder me daalo, aur `js/config.js` me:

```js
sounds: {
  enabled: true,
  volume: 0.55,
  click:    "sounds/click.mp3",
  listing:  "sounds/open.mp3",
  download: "sounds/download.mp3"
}
```
Jo khali `""` chhodoge, uske liye default sound chalega. Sounds ko **chhota (1 second tak)** rakho. Sab sounds se band karna ho to `enabled: false`.

---

## 10. Agar kuch galat ho jaye

| Problem | Wajah / Fix |
|---|---|
| Listings dikh hi nahi rahi, ya "Listings could not be loaded" aaya | `listings.js` me comma, quote ya bracket missing hai. VS Code me wahi line red dikhegi. Har `}` ke baad `,` check karo |
| Nayi listing nahi dikh rahi | `id` kisi aur listing jaisa to nahi? Block `window.LISTINGS = [` ke andar hi hai? |
| Category ka filter kaam nahi kar raha | `category` me exactly `modpacks`, `shaders`, `mods`, `models`, `textures` me se ek likho |
| Image nahi dikh rahi | Naam / extension (.jpg vs .jpeg) folder wale se match karo, aur image `images/` me hai ya nahi |
| Publish ke baad purana version dikh raha | Browser me **Ctrl + F5** (hard refresh) |
| Sound nahi aa raha | Speaker icon mute to nahi? Browser pehle click ke baad hi sound allow karta hai |

Kuch aur category chahiye (jaise "Maps", "Skins")? `config.js` me `categories` me ek line jodo:
`{ id: "maps", label: "Maps", hue: 20 },` aur listing me `category: "maps"` likho.

---

## 11. Copyright par ek chhoti si baat

Disclaimer aur credit acche hain, par ye asli permission ka substitute nahi hain. Kuch creators apne mods/packs ko dusri jagah re-upload karne ki permission nahi dete (license page me likha hota hai). Jahan license allow na kare wahan **direct file ki jagah creator ka original page** `downloads` me link kar do. Safe bhi rehta hai aur creator ko traffic bhi milta hai. Agar koi owner email kare to jaldi reply karke credit sahi kar do ya listing hata do.
