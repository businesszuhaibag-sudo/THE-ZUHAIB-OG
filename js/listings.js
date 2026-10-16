/* ==========================================================
   LISTINGS  —  saari modpacks / shaders / mods / models / textures yahan hain
   ==========================================================

   NAYI LISTING ADD KARNE KA TAREEKA
   1. Neeche wala block COPY karo (sirf { ... }, ke beech ka poora hissa).
   2. Apni list ke SABSE UPAR (window.LISTINGS = [ ke theek neeche) paste karo.
   3. Values badlo, file save karo, website refresh karo. Bas.

   {
     id: "my-new-pack",                       // unique naam: chhote letters, bina space ke (- use karo)
     title: "My New Pack",                    // listing ka naam
     category: "modpacks",                    // modpacks | shaders | mods | models | textures
     date: "2026-10-12",                      // YYYY-MM-DD (naya date = upar dikhega)
     tags: ["1.20.1", "Forge"],               // chote labels (version, loader, etc.)
     images: [                                // pehli image = showcase image. Zyada images = gallery
       "images/my-new-pack-1.jpg",
       "images/my-new-pack-2.jpg"
     ],
     description: `Yahan chhota sa description likho.

Nayi line ke liye ek khali line chhodo.`,
     downloads: [                             // jitne chaaho download buttons
       { label: "Download (Mediafire)", url: "https://..." },
       { label: "Download (Mega)",      url: "https://..." }
     ],
     owned: false,                            // true = ye cheez TUMNE banayi hai ("Made by me" badge dikhega)
     credit: "Original Creator Name",         // asli owner ka naam (owned: true ho to chhod sakte ho: "")
     creditUrl: "https://..."                 // asli owner ka page (optional, nahi hai to "")
   },

   YAAD RAKHO:
   - Har listing ke baad comma  ,  zaroori hai.
   - Text hamesha "quotes" me. Description ke liye `backticks` (keyboard me ~ wali key) use ho sakte hain.
   - Image ka naam folder me jo file hai bilkul wahi hona chahiye (capital/small letters matter karte hain).
   - Listing delete karni ho to uska poora { ... }, block delete kar do.

   NEECHE SAMPLE LISTINGS HAIN — inhe apni listings se replace / delete kar dena.
   ========================================================== */
window.LISTINGS = [

  {
    id: "sample-skyblock-adventure",
    title: "Sample Modpack: Skyblock Adventure",
    category: "modpacks",
    date: "2026-10-11",
    tags: ["1.20.1", "Forge"],
    images: [],
    description: `This is a sample listing. Replace it with your own modpack.

Write a short description here: what the pack adds, how heavy it is, and any setup tips.`,
    downloads: [
      { label: "Download (Mediafire)", url: "#" },
      { label: "Download (Mega)", url: "#" }
    ],
    owned: false,
    credit: "Original Creator Name",
    creditUrl: ""
  }

];
