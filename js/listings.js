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

   ABHI KOI LISTING NAHI HAI — upar wala template copy karke neeche [ ] ke andar paste karo.
   ========================================================== */
window.LISTINGS = [

];
