/* ==========================================================
   LISTINGS  —  saari visuals / mods / assets yahan hain
   ==========================================================

   NAYI LISTING ADD KARNE KA TAREEKA
   1. Neeche wala block COPY karo (sirf { ... }, ke beech ka poora hissa).
   2. Apni list ke SABSE UPAR (window.LISTINGS = [ ke theek neeche) paste karo.
   3. Values badlo, file save karo, website refresh karo. Bas.

   {
     id: "my-new-pack",                       // unique naam: chhote letters, bina space ke (- use karo)
     title: "My New Pack",                    // listing ka naam
     category: "mods",                        // visuals | mods | assets
     date: "2026-10-12",                      // YYYY-MM-DD (naya date = upar dikhega)
     tags: ["1.20.1", "Forge"],               // chote labels (version, loader, etc.)
     images: [                                // pehli image = showcase image. Zyada images = gallery
       "images/my-new-pack-1.jpg",
       "images/my-new-pack-2.jpg"
     ],
     description: `Yahan chhota sa description likho.

Nayi line ke liye ek khali line chhodo.`,
     size: "250 MB",                          // file ka size (KB / MB / GB), download button ke bagal me dikhega. Nahi pata to ""
     downloads: [                             // sirf 1 link: tumhara ads link (jo aage Drive pe jata hai)
       { url: "https://..." }
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

   Nayi listing upar wala template copy karke neeche [ ] ke andar sabse upar paste karo.
   ========================================================== */
window.LISTINGS = [

  {
    id: "complete-bbs-modpack-1-21-1",
    title: "Complete BBS Modpack For 1.21.1",
    category: "mods",
    date: "2026-10-17",
    tags: ["1.21.1", "Fabric"],
    images: ["images/complete-bbs-modpack-1-21-1-1.jpg"],
    description: `A complete modpack for Minecraft 1.21.1 on Fabric. It has everything from FPS-boosting mods to quality-enhancing mods, together with the new BBS mod, for a smooth experience with mods chosen for the best compatibility.

You can build easily with it, and it also includes a few extra mods that will come in handy for your videos. You can also download more extra mods and play with them if you like.

I put this modpack together myself. The mods inside belong to their respective creators.`,
    size: "93 MB",
    downloads: [
      { url: "https://linkpays.in/uUZfSs" }
    ],
    owned: false,
    credit: "Modpack compiled by Zuhaib. All included mods belong to their respective creators.",
    creditUrl: ""
  },

  {
    id: "complete-bbs-modpack-1-20-4",
    title: "Complete BBS Modpack For 1.20.4",
    category: "mods",
    date: "2026-10-17",
    tags: ["1.20.4", "Fabric"],
    images: ["images/complete-bbs-modpack-1-20-4-1.jpg"],
    description: `A complete modpack for Minecraft 1.20.4 on Fabric. It has everything from FPS-boosting mods to quality-enhancing mods, together with the new BBS mod, for a smooth experience with mods chosen for the best compatibility.

You can build easily with it, and it also includes a few extra mods that will come in handy for your videos. You can also download more extra mods and play with them if you like.

I put this modpack together myself. The mods inside belong to their respective creators.`,
    size: "88 MB",
    downloads: [
      { url: "https://linkpays.in/61vj9yyr" }
    ],
    owned: false,
    credit: "Modpack compiled by Zuhaib. All included mods belong to their respective creators.",
    creditUrl: ""
  },

  {
    id: "complete-bbs-modpack",
    title: "Complete BBS Modpack For 1.20.1",
    category: "mods",
    date: "2026-10-17",
    tags: ["1.20.1", "Fabric"],
    images: ["images/complete-bbs-modpack-1.jpg"],
    description: `A complete modpack for Minecraft 1.20.1 on Fabric. It has everything from FPS-boosting mods to quality-enhancing mods, together with the new BBS mod, for a smooth experience with mods chosen for the best compatibility.

You can build easily with it, and it also includes a few extra mods that will come in handy for your videos.

I put this modpack together myself. The mods inside belong to their respective creators.`,
    size: "91 MB",
    downloads: [
      { url: "https://linkpays.in/8dvf" }
    ],
    owned: false,
    credit: "Modpack compiled by Zuhaib. All included mods belong to their respective creators.",
    creditUrl: ""
  }

];
