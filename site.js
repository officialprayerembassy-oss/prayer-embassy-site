/* site.js - shared header/footer, content from data/content.js, animations, gallery, video, forms */
(function(){
var D=window.SITE_DATA||{};
try{if(/[?&]preview/.test(location.search)){var dr=localStorage.getItem("pem_draft");if(dr)D=JSON.parse(dr)}}catch(e){}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function tel(n){return "+256"+String(n).replace(/\D/g,"").replace(/^0/,"")}
var CDDEF={show:true,title:"Children's Day",date:"January 2027",time:"",venue:"",theme:"",intro:"Prayer Embassy Ministries invites every child, and every family, to a special Children's Day in January 2027. Full details will be shared here and on our media platforms.",scripture:{text:"Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God.",ref:"Mark 10:14"},activities:[],photos:[]};
var CD=Object.assign({},CDDEF,D.childrensDay||{}),C=D.church||{},PAGES=[["index.html","Home"],["about.html","About"],["ministries.html","Ministries"],["services.html","Services"],["sermons.html","Sermons"],["give.html","Give"],["contact.html","Contact"]];
var here=location.pathname.split("/").pop()||"index.html";
document.body.classList.add("pg-"+here.replace(".html",""));
/* header and footer */
var hd=document.getElementById("site-header");
if(hd){hd.innerHTML='<header><div class="wrap"><a class="brand" href="index.html"><img src="images/logo-large.png" onerror="this.onerror=null;this.src=\'images/logo.png\'" decoding="async" alt="Prayer Embassy Ministries Kisigula logo"><span><b>Prayer Embassy</b><small>MINISTRIES KISIGULA</small></span></a><button class="menu-btn" aria-label="Menu" aria-expanded="false">&#9776;</button><nav id="mainnav" aria-label="Main">'+PAGES.map(function(p){return p[1]==="Give"?'<a class="btn" href="give.html">Give Online</a>':'<a href="'+p[0]+'"'+(p[0]===here?' class="active"':'')+'>'+p[1]+'</a>'}).join("")+'</nav></div></header>';
 var b=hd.querySelector(".menu-btn"),n=hd.querySelector("nav");b.onclick=function(){b.setAttribute("aria-expanded",n.classList.toggle("open"))};var hh=hd.querySelector("header");function sc(){hh.classList.toggle("scrolled",window.scrollY>50)}window.addEventListener("scroll",sc,{passive:true});sc()}
var ft=document.getElementById("site-footer");
if(ft){var ch=(D.channels||[]).filter(function(c){return c.url}).map(function(c){return '<li><a href="'+esc(c.url)+'" target="_blank" rel="noopener">YouTube: '+esc(c.title.replace(" YouTube",""))+'</a></li>'}).join("");
 ft.innerHTML='<footer><div class="wrap"><div class="cols"><div><h3>'+esc(C.name)+'</h3><p>A home of prayer and a family of faith, raising disciples of Jesus Christ in Kisigula and beyond.</p></div><div><h3>Quick Links</h3><ul>'+PAGES.map(function(p){return '<li><a href="'+p[0]+'">'+p[1]+'</a></li>'}).join("")+ch+(CD.show?'<li><a href="childrens-day.html">'+esc(CD.title)+'</a></li>':'')+'</ul></div><div><h3>Service Times</h3><ul>'+(D.footerTimes||[]).map(function(t){return '<li>'+esc(t)+'</li>'}).join("")+'</ul></div><div><h3>Visit Us</h3><ul><li>'+esc(C.location)+'</li>'+(C.phones||[]).map(function(p){return '<li><a href="tel:'+tel(p)+'">'+esc(p)+'</a></li>'}).join("")+'<li><a href="mailto:'+esc(C.email)+'">'+esc(C.email)+'</a></li></ul></div></div><p class="copy">&copy; '+new Date().getFullYear()+' '+esc(C.name)+'. All rights reserved. '+esc(C.copyright)+'</p></div></footer>'}
/* data-driven sections */
var R={
 cdbanner:function(e){if(!CD.show){e.hidden=true;return}e.innerHTML='<div class="wrap center"><span class="badge">'+esc(CD.date)+'</span><h2 style="margin-top:14px" data-reveal="up">'+esc(CD.title)+'</h2><p class="sub" data-reveal="up">'+esc(CD.intro)+'</p><a class="btn" href="childrens-day.html">See Details</a></div>'},
 childrensDay:function(e){var c=CD,h="";if(!c.show){e.innerHTML='<section><div class="wrap center"><p class="sub">Details of our Children\'s Day will be announced soon.</p></div></section>';return}
  var cols=["#f28c28","#4aa3df","#56b870","#a66bd6"],det=[["Date",c.date],["Time",c.time],["Venue",c.venue],["Theme",c.theme]].filter(function(d){return d[1]});
  h+='<section><div class="wrap center"><span class="badge">'+esc(c.date||"Coming Soon")+'</span><h2 style="margin-top:14px" data-reveal="up">'+esc(c.title)+'</h2><p class="sub" data-reveal="up">'+esc(c.intro)+'</p></div></section>';
  if(det.length)h+='<section class="alt-bg"><div class="wrap"><div class="cd-cards">'+det.map(function(d,i){return '<div class="cd-card" data-reveal="up" style="--c:'+cols[i]+';--d:'+(i*.1)+'s"><small>'+d[0]+'</small><b>'+esc(d[1])+'</b></div>'}).join("")+'</div></div></section>';
  if(c.scripture&&c.scripture.text)h+='<section><div class="wrap"><blockquote class="verse" data-reveal="up">&ldquo;'+esc(c.scripture.text)+'&rdquo;<cite>'+esc(c.scripture.ref)+'</cite></blockquote></div></section>';
  if((c.activities||[]).length)h+='<section class="alt-bg"><div class="wrap center"><p>What to Expect</p><h2>Programme &amp; Activities</h2><div class="cd-acts">'+c.activities.map(function(a,i){return '<div data-reveal="'+(i%2?"right":"left")+'" style="--c:'+cols[i%4]+'">'+esc(a)+'</div>'}).join("")+'</div></div></section>';
  if((c.photos||[]).length){window.GAL=window.GAL||{};GAL.childrensday={t:c.title,i:c.photos};h+='<section><div class="wrap center"><p>Photo Gallery</p><h2>Moments to Remember</h2><div class="strip">'+c.photos.slice(0,6).map(function(p,i){return '<img loading="lazy" data-reveal="up" style="--d:'+(i*.08)+'s" src="'+esc(p)+'" alt="'+esc(c.title)+'">'}).join("")+'</div><button class="more-photos" type="button" data-gallery="childrensday">&#128247; More Photos</button></div></section>'}
  h+='<section class="alt-bg"><div class="wrap center"><h2>Bring Your Children</h2><p class="sub">For questions or to share a message with us, please get in touch.</p><a class="btn" href="contact.html#feedback">Contact Us</a></div></section>';
  e.innerHTML=h},
 ticker:function(e){var t=(D.ticker||[]).map(function(x){return "<span>"+esc(x)+"</span>"}).join("");e.innerHTML='<div class="ticker-track">'+t+t+'</div>'},
 heroTimes:function(e){e.innerHTML=(D.heroTimes||[]).map(function(x){return "<div>"+esc(x.label)+" <span>"+esc(x.time)+"</span></div>"}).join("")},
 services:function(e){e.innerHTML=(D.services||[]).filter(function(s){return s.visible!==false}).map(function(s,i){return '<div class="box" data-reveal="up" style="--d:'+(i*.1)+'s"><small>'+esc(s.day)+"</small><h3>"+esc(s.title)+"</h3><p><b>"+esc(s.time)+"</b><br>"+esc(s.desc)+"</p></div>"}).join("")},
 announcements:function(e){var l=+e.dataset.limit||99;e.innerHTML=(D.announcements||[]).filter(function(a){return a.visible!==false}).slice(0,l).map(function(a,i){return '<div class="note" data-reveal="'+(i%2?"right":"left")+'"><small>'+esc(a.tag)+"</small><h3>"+esc(a.title)+"</h3><p>"+esc(a.text)+"</p>"+(a.posted?"<small>"+esc(a.posted)+"</small>":"")+"</div>"}).join("")},
 thanksgiving:function(e){var t=D.thanksgiving||{};if(!t.show){e.hidden=true;return}e.innerHTML='<div class="wrap center"><span class="badge">'+(t.date?"Save the Date":"Coming Soon")+'</span><h2 style="margin-top:14px" data-reveal="up">'+esc(t.title)+'</h2>'+(t.date?'<p class="sub"><b>'+esc(t.date)+"</b></p>":"")+'<p class="sub" data-reveal="up">'+esc(t.text)+'</p><a class="btn" href="give.html">Give a Thanksgiving Offering</a></div>'},
 sermons:function(e){e.innerHTML=(D.sermons||[]).filter(function(s){return s.visible!==false}).map(function(s,i){return '<div class="box has-pic" data-reveal="up" style="--d:'+(i*.1)+'s"><img loading="lazy" src="'+esc(s.image)+'" alt=""><h3>'+esc(s.title)+"</h3><p>"+esc(s.desc)+'</p><a class="more-photos" href="'+esc(s.url)+'" target="_blank" rel="noopener">&#9654; Watch on YouTube</a></div>'}).join("")},
 channels:function(e){e.innerHTML=(D.channels||[]).map(function(c,i){return '<div class="box" data-reveal="up" style="--d:'+(i*.1)+'s"><h3>'+esc(c.title)+"</h3><p>"+(c.url?'<a href="'+esc(c.url)+'" target="_blank" rel="noopener">'+esc(c.handle)+"</a>":esc(c.handle))+": "+esc(c.desc)+"</p></div>"}).join("")},
 giving:function(e){var g=D.giving||{},s=g.scripture||{};e.innerHTML='<p class="sub">'+esc(g.intro)+'</p><div class="pills" data-reveal="up">'+(g.categories||[]).map(function(c){return "<span>"+esc(c)+"</span>"}).join("")+'</div><blockquote class="verse" data-reveal="up">&ldquo;'+esc(s.text)+"&rdquo;<cite>"+esc(s.ref)+'</cite></blockquote><h3 style="margin-top:28px">Give by Mobile Money</h3><p class="sub">All gifts are received in the name of <b>'+esc(g.name)+'</b>.</p><div class="give-grid">'+(g.accounts||[]).map(function(a,i){return '<div class="box" data-reveal="'+(i%2?"right":"left")+'"><small>'+esc(a.network)+'</small><div class="num">'+esc(a.display)+"</div><p>Registered name: "+esc(g.name)+'</p><a class="btn dark" href="tel:'+tel(a.local)+'">Call</a> <button class="btn dark copy-btn" type="button" data-copy="'+esc(a.local)+'">Copy number</button></div>'}).join("")+'</div><p class="sub">'+esc(g.steps)+'</p><img class="give-flyer" loading="lazy" src="images/giveflyer.jpeg" alt="Giving in the House of God">'},
 contact:function(e){e.innerHTML='<div class="box" data-reveal="left"><h3>Visit Us</h3><p>'+esc(C.location)+'</p></div><div class="box" data-reveal="up"><h3>Call Us</h3><p>'+(C.phones||[]).map(function(p){return '<a href="tel:'+tel(p)+'">'+esc(p)+"</a>"}).join("<br>")+'</p></div><div class="box" data-reveal="right"><h3>Email Us</h3><p><a href="mailto:'+esc(C.email)+'">'+esc(C.email)+"</a></p></div>"}
};
document.querySelectorAll("[data-render]").forEach(function(e){var f=R[e.dataset.render];if(f)f(e)});
var hv=document.getElementById("heroTimes");if(hv)R.heroTimes(hv);
/* scroll animations */
var els=document.querySelectorAll("[data-reveal]");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add("in")})}
/* opening video (home page) */
var v=document.getElementById("herovid"),vb=document.getElementById("vidbtn");
if(v&&vb){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){v.pause()}vb.onclick=function(){v.muted=!v.muted;if(v.paused)v.play();vb.textContent=v.muted?"Sound on":"Sound off"}}
/* photo gallery */
if(window.GAL&&document.querySelector("[data-gallery]")){
var lb=document.createElement("div");lb.className="lb";lb.hidden=true;lb.innerHTML='<button class="lb-x" type="button" aria-label="Close">&times;</button><button class="lb-p" type="button" aria-label="Previous">&#8249;</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-n" type="button" aria-label="Next">&#8250;</button>';document.body.appendChild(lb);
var im=lb.querySelector("img"),cp=lb.querySelector("figcaption"),g,i=0;
function show(){im.src=g.i[i];im.alt=g.t;cp.textContent=g.t+" ("+(i+1)+" of "+g.i.length+")"}
function close(){lb.hidden=true;document.body.style.overflow=""}
function step(d){i=(i+d+g.i.length)%g.i.length;show()}
document.querySelectorAll("[data-gallery]").forEach(function(x){x.onclick=function(){g=GAL[x.dataset.gallery];i=0;show();lb.hidden=false;document.body.style.overflow="hidden"}});
lb.querySelector(".lb-x").onclick=close;lb.querySelector(".lb-p").onclick=function(){step(-1)};lb.querySelector(".lb-n").onclick=function(){step(1)};
lb.onclick=function(e){if(e.target===lb)close()};
document.addEventListener("keydown",function(e){if(lb.hidden)return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")step(-1);if(e.key==="ArrowRight")step(1)})}
/* AUTOMATIC PHOTO SLIDESHOWS. To change the time between photos, change 6000 (6000 = 6 seconds). */
var REDUCE=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function makeShow(box,srcs,o){o=o||{};var sl=[],dots=document.createElement("div"),cur=0,timer,paused=false;
 box.classList.add("slideshow");if(o.cls)box.classList.add(o.cls);box.innerHTML="";dots.className="dots";
 function go(n){sl[cur].classList.remove("on");if(o.dots)dots.children[cur].classList.remove("on");cur=(n+sl.length)%sl.length;sl[cur].classList.add("on");if(o.dots)dots.children[cur].classList.add("on")}
 function start(){clearInterval(timer);if(!REDUCE&&sl.length>1)timer=setInterval(function(){if(!paused&&!document.hidden)go(cur+1)},o.ms||6000)}
 srcs.forEach(function(s,i){var d=document.createElement("div"),im=new Image();d.className="sl"+(i?"":" on");d.style.setProperty("--bg",'url("'+s+'")');im.src=s;im.alt=i?(o.alt1||""):(o.alt0||"");d.appendChild(im);box.appendChild(d);sl.push(d);
  if(o.dots){var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Show photo "+(i+1));if(!i)b.className="on";b.onclick=function(){go(i);start()};dots.appendChild(b)}});
 if(o.dots)box.appendChild(dots);
 box.addEventListener("mouseenter",function(){paused=true});box.addEventListener("mouseleave",function(){paused=false});
 if(o.delay)setTimeout(start,o.delay);else start()}
function listFor(k,first){var g=window.GAL&&GAL[k],a=g?g.i.slice():[];if(first){var x=a.indexOf(first);if(x>-1)a.splice(x,1);a.unshift(first)}return a}
/* 1. pastor and wife photos */
document.querySelectorAll("[data-slideshow]").forEach(function(box){var k=box.dataset.slideshow,g=window.GAL&&GAL[k];if(!g||g.i.length<2)return;var im0=box.querySelector("img");makeShow(box,listFor(k,im0&&im0.getAttribute("src")),{dots:true,alt0:im0?im0.alt:g.t,alt1:g.t})});
/* 2. ministry cards: each card cycles through its own photos */
document.querySelectorAll(".has-pic").forEach(function(c,i){var b=c.querySelector("[data-gallery]"),im=c.querySelector(":scope > img");if(!b||!im||!window.GAL||!GAL[b.dataset.gallery])return;var box=document.createElement("div"),k=b.dataset.gallery;c.replaceChild(box,im);makeShow(box,listFor(k,im.getAttribute("src")),{cls:"card",alt0:im.alt,alt1:GAL[k].t,delay:i*1400})});
/* 3. photo strips: every tile changes by itself */
document.querySelectorAll(".strip").forEach(function(st){var b=st.parentNode.querySelector("[data-gallery]"),g=b&&window.GAL&&GAL[b.dataset.gallery];if(!g||g.i.length<2)return;[].slice.call(st.querySelectorAll("img")).forEach(function(im,i){var box=document.createElement("div"),a=g.i.slice(),k=(i*2)%a.length;a=a.slice(k).concat(a.slice(0,k));st.replaceChild(box,im);makeShow(box,a,{cls:"tile",alt0:im.alt,alt1:g.t,ms:4500,delay:i*700})})});
/* 4. page headings: clear photos that change on every page */
var HP={"about": ["images/21.jpg", "images/2.jpg", "images/14.jpg", "images/16.jpg"], "ministries": ["images/worshiplife2.jpg", "images/worshiplife.jpg", "images/12.jpg", "images/6.jpg"], "services": ["images/prayermoment.jpg", "images/prayer2.jpg", "images/18.jpg", "images/17.jpg"], "sermons": ["images/20.jpg", "images/4.jpg", "images/17.jpg", "images/23.jpg"], "give": ["images/3.jpg", "images/9.jpg", "images/22.jpg", "images/24.jpg"], "contact": ["images/24.jpg", "images/23.jpg", "images/21.jpg", "images/16.jpg"], "childrens-day": ["images/worshiplife1.jpg", "images/worshiplife3.jpeg", "images/worshiplife.jpeg", "images/worshiplife4.jpg"]};
var ph=document.querySelector(".page-hero"),hp=HP[here.replace(".html","")];
if(ph&&hp&&hp.length){var hb=document.createElement("div");ph.insertBefore(hb,ph.firstChild);makeShow(hb,hp,{cls:"herobg",ms:6000})}
/* copy giving numbers */
document.addEventListener("click",function(ev){var x=ev.target.closest("[data-copy]");if(!x)return;var t=x.dataset.copy;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){x.textContent="Copied"}).catch(function(){x.textContent=t})});
/* feedback form */
var f=document.getElementById("fbform");
if(f){function text(){var d=new FormData(f);return "Type: "+d.get("type")+"\nName: "+d.get("name")+"\nContact: "+d.get("contact")+"\n\n"+d.get("msg")}
f.addEventListener("submit",function(e){e.preventDefault();var d=new FormData(f);location.href="mailto:"+C.email+"?subject="+encodeURIComponent(d.get("type")+" from "+d.get("name"))+"&body="+encodeURIComponent(text())});
document.getElementById("fbwa").onclick=function(){if(!f.reportValidity())return;window.open("https://wa.me/"+tel((C.phones||[""])[0]).replace("+","")+"?text="+encodeURIComponent(text()),"_blank")}}
})();
