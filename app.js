const CFG={whatsapp:"2348102341648",
 fb:{apiKey:"YOUR_API_KEY",authDomain:"YOUR_PROJECT.firebaseapp.com",databaseURL:"https://YOUR_PROJECT-default-rtdb.firebaseio.com",projectId:"YOUR_PROJECT",appId:"YOUR_APP_ID"}};
const BASE="https://mj-and-co-testy-eating.vercel.app/",IMG=s=>/^(https?:|data:)/.test(s||"")?s:BASE+(s||"logo.jpg");
firebase.initializeApp(CFG.fb);const db=firebase.database();
const $=s=>document.querySelector(s),N=n=>"₦"+Number(n||0).toLocaleString();
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const phone=p=>{p=String(p).replace(/\D/g,"");return p.startsWith("0")?"234"+p.slice(1):p};
const wa=(n,m)=>`https://wa.me/${phone(n)}?text=${encodeURIComponent(m)}`;
const DEFAULTS=[["Plain Greek Yogurt","Yogurt",1500,"m1.jpg"],["Fruit Yogurt","Yogurt",2000,"m2.jpg"],["Family Yogurt Cups","Yogurt",5000,"m8.jpg"],["Fura da Nono","Yogurt",1800,"fura.png"],["Fruit Parfait","Parfait",2500,"https://feelgoodfoodie.net/wp-content/uploads/2024/11/Fruit-Yogurt-Parfait-11.jpg"],["Berry Parfait","Parfait",2800,"m9.jpg"],["Granola Parfait","Parfait",3000,"m12.jpg"],["Granola Pack","Granola",2500,"granola.jpg"],["Coconut Flakes","Flakes",1500,"coconut-flakes.jpg"],["Snack Cups","Chops",2000,"m6.jpg"],["Chops Pack","Chops",2000,"chops.jpg"],["Vanilla Yogurt","Yogurt",1800,"m7.jpg"],["Strawberry Yogurt","Yogurt",2000,"m10.jpg"],["Mango Yogurt","Yogurt",2000,"m11.jpg"],["Yogurt Drink (500ml)","Yogurt",1200,"m5.jpg"],["Tropical Parfait","Parfait",3200,"m9.jpg"],["Chocolate Parfait","Parfait",3200,"m2.jpg"],["Honey Granola","Granola",2800,"granola.jpg"],["Nut Granola Mix","Granola",3000,"m3.jpg"],["Toasted Coconut Flakes","Flakes",1800,"coconut-flakes.jpg"],["Small Chops Box","Chops",3500,"chops.jpg"]];
async function getProducts(){let v=(await db.ref("products").once("value")).val()||{};
 const done=(await db.ref("meta/menuSeeded").once("value")).val();
 if(!done){const o={};DEFAULTS.forEach((p,i)=>{if(!v["p"+(i+1)])o["p"+(i+1)]={name:p[0],category:p[1],price:p[2],image:p[3],available:true}});
  await db.ref("products").update(o);await db.ref("meta/menuSeeded").set(true);v=(await db.ref("products").once("value")).val()||{}}
 return v}
async function getSettings(){const s=(await db.ref("settings").once("value")).val()||{};return{bankName:"Set bank in admin",accNo:"0000000000",accName:"MJ & CO",deliveryFee:1000,...s}}
function pdf(o){const{jsPDF}=window.jspdf,d=new jsPDF();let y=20;d.setFontSize(18);d.text("MJ & CO — Invoice",14,y);d.setFontSize(11);
 [`Order No: ${o.no}`,`Reference: ${o.ref}`,`Date: ${new Date(o.createdAt).toLocaleString()}`,`Customer: ${o.name} (${o.phone})`,`${o.method==="Delivery"?"Deliver to: "+o.address:"Pickup in-store"}`,`Payment: ${o.pay}`,""].forEach(t=>d.text(t,14,y+=8));
 o.items.forEach(i=>d.text(`${i.qty} x ${i.name}  —  ${N(i.price*i.qty)}`,14,y+=7));
 d.text(`Subtotal ${N(o.sub)}   Delivery ${N(o.fee)}`,14,y+=10);d.setFontSize(14);d.text(`TOTAL ${N(o.total)}`,14,y+=9);d.save(`${o.no}.pdf`)}
document.addEventListener("DOMContentLoaded",()=>{const pg=location.pathname.split("/").pop()||"index.html";
 const L=[["index.html","Home"],["order.html","Order Now"],["about.html","About Us"],["contact.html","Contact"]];
 if($("#nav"))$("#nav").innerHTML=`<header><div class="w"><a class="brand" href="index.html"><img src="${IMG('logo.jpg')}" alt="MJ & CO logo">MJ & CO</a><button id="bx" aria-label="Menu">☰</button><nav id="mn">${L.map(l=>`<a href="${l[0]}" class="${pg==l[0]?"on":""}">${l[1]}</a>`).join("")}<a class="cta" href="order.html">Place Order</a></nav></div></header>`;
 if($("#foot"))$("#foot").innerHTML=`<footer><div class="w"><img src="${IMG('logo.jpg')}" alt="" style="width:54px;border-radius:50%;margin:0 auto 8px"><b>MJ & CO — Fresh Yogurt & Parfait</b><p>Order online, pay by bank transfer, confirm on WhatsApp +2348102341648</p><p><a href="https://facebook.com">Facebook</a><a href="https://instagram.com">Instagram</a><a href="https://www.tiktok.com">TikTok</a><a href="https://twitter.com">Twitter</a><a href="https://wa.me/2348102341648">WhatsApp</a></p>© 2025 MJ & CO. All rights reserved.</div></footer>`;
 $("#bx")?.addEventListener("click",()=>$("#mn").classList.toggle("open"));
 if($("#song")){const a=$("#song"),b=$("#mus");b.onclick=()=>{a.paused?(a.play(),b.textContent="🔊"):(a.pause(),b.textContent="🔇")}}});
