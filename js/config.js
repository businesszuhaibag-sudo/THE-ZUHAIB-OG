/* ==========================================================
   SITE SETTINGS  —  yahan se website ki basic cheezein badlo
   (Sirf "quotes" ke andar ka text badlo, baaki structure mat chhedo)
   ========================================================== */
window.SITE_CONFIG = {

  /* ---- Branding ---- */
  siteName: "ZUHAIB OG",                      // navbar + footer me dikhega
  heroTitle: "ZUHAIB OG's Files",              // bada (foil) heading
  heroLine: "Download Everything in One Place",  // uske neeche wali line (khali "" chhodo to nahi dikhegi)
  heroSubtitle: "Visual enhancements, mods and BBS assets. Pick one, open it, download it.",

  /* ---- THEME (background + colours) ----
     "gold"    = black + royal gold
     "silver"  = graphite + chrome silver
     "ember"   = deep brown + orange-gold
     "emerald" = Minecraft green
     "ender"   = violet + diamond cyan
     "nether"  = crimson / rose
     Test karne ke liye address me ye likho:  index.html?theme=silver              */
  theme: "gold",
  logo: "",                                    // optional: "images/logo.png" (square image). Khali chhodo to naam ka pehla letter dikhega.

  /* ---- Contact (disclaimer + footer me dikhta hai) ---- */
  contactEmail: "businesszuhaibag@gmail.com",

  /* ---- Social handles (top-left "Socials" menu + sabse niche footer) ----
     icon: "youtube" | "discord" | "telegram" | "link"  (koi aur platform ho to "link")
     url:  apna asli link yahan paste karo.
           KHALI "" HO TO "Coming soon" dikhega (channel / server ban jaye to link daal dena)
     handle: choti si line jo naam ke neeche dikhegi (optional, jaise "@zuhaibog") */
  socials: [
    { name: "YouTube",  icon: "youtube",  url: "", handle: "" },   // jaise: "https://www.youtube.com/@zuhaibog"
    { name: "Discord",  icon: "discord",  url: "https://discord.gg/SZvqZhVjC5", handle: "Join the server" },
    { name: "Telegram", icon: "telegram", url: "https://t.me/ZUHAIB_AG_ASSETS", handle: "@ZUHAIB_AG_ASSETS" }
  ],

  /* ---- Download button text (har listing me ek hi button dikhta hai) ---- */
  downloadLabel: "Download from Google Drive",
  downloadHint: "1 min ads link: ads open first, then you get the Drive link",

  /* ---- ABOUT card (top-left "About" button) ----
     Text me **double star** ke andar likho to wo highlight hoga.
     Poora About button hatana ho to  about: null  likh do.
     Email upar wale contactEmail se aata hai.                                 */
  about: {
    buttonLabel: "About",
    name: "ZUHAIB ULLA",
    aka: "aka Zuhaib AG / OG",
    location: "Gubbi, Karnataka, India",
    story: [
      { label: "January 2025",
        text: "Started his YouTube journey by making MCPE shorts." },
      { label: "Learning BBS",
        text: "Discovered the BBS mod and taught himself animation on a very low-end PC. Everything he figured out on his own, he recorded as a tutorial so others could learn it too." },
      { label: "100K subscribers",
        text: "With everyone's support, the channel grew to 100K subscribers. It missed the Play Button, though, and for a YouTuber that milestone means everything. Hurt by it, he sold the channel. That channel now runs under the name **Chad AG**." },
      { label: "Starting over",
        text: "He didn't stop there. He worked hard again, for himself and for his viewers, and reached 100K subscribers a second time." },
      { label: "Now",
        text: "Back with long videos, teaching the BBS mod through tutorials again so everyone can grow together." }
    ]
  },

  /* ---- Listings per page (page system) ---- */
  perPage: 9,

  /* ---- Categories ----
     id: listings.js me "category" me yehi likhna hai
     hue: card ke placeholder ka rang (0-360)                                  */
  categories: [
    { id: "visuals", label: "Visual Enhancements", hue: 195 },
    { id: "mods",    label: "Mods",                hue: 145 },
    { id: "assets",  label: "BBS ASSETS",          hue: 330 }
  ],

  /* ---- Default disclaimer (HAR listing ke andar apne aap dikhega) ---- */
  disclaimerTitle: "Disclaimer",
  disclaimer:
    "I don't own most of the mods, shader packs, visual enhancements, resource packs, models and other assets listed on this website. " +
    "I only provide them for the community. Some of the content here is my own work, and every listing gives credit to its respected owner. " +
    "If you are an owner and have a copyright concern, please contact me and I will sort it out.",

  /* ---- Sound effects ----
     Default me sounds browser ke andar hi generate hote hain (koi file nahi chahiye).
     Apni sound file lagani ho to "sounds/" folder me daalo aur path likho,
     jaise  click: "sounds/click.mp3"
       click    = normal buttons / chips / pages
       listing  = kisi listing (card) pe click
       download = download buttons
       about    = About button                                              */
  sounds: {
    enabled: true,
    volume: 0.55,
    click: "",
    listing: "",
    download: "",
    about: ""
  }
};
