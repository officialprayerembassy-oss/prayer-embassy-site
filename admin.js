/* admin.js - private editor for the website information. It edits a copy of data/content.js in the browser;
   you then download the new content.js and upload it to replace data/content.js on your hosting. */
function H(s){s="pem|"+s;var a=0xdeadbeef^0x9e37,b=0x41c6ce57^0x9e37;for(var i=0,c;i<s.length;i++){c=s.charCodeAt(i);a=Math.imul(a^c,2654435761);b=Math.imul(b^c,1597334677)}a=Math.imul(a^(a>>>16),2246822507)^Math.imul(b^(b>>>13),3266489909);b=Math.imul(b^(b>>>16),2246822507)^Math.imul(a^(a>>>13),3266489909);return(4294967296*(2097151&b)+(a>>>0)).toString(36)}
var CDDEF={show:true,title:"Children's Day",date:"January 2027",time:"",venue:"",theme:"",intro:"Prayer Embassy Ministries invites every child, and every family, to a special Children's Day in January 2027. Full details will be shared here and on our media platforms.",scripture:{text:"Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God.",ref:"Mark 10:14"},activities:[],photos:[]};
(function(){
var D=JSON.parse(JSON.stringify(window.SITE_DATA||{})),$=function(i){return document.getElementById(i)};
var gate=$("gate"),app=$("app"),msg=$("gmsg");
function unlock(){gate.hidden=true;app.hidden=false;init()}
if(sessionStorage.getItem("pem_auth")==="1")unlock();
$("gform").onsubmit=function(e){e.preventDefault();if(H($("gpass").value)===window.SITE_DATA.adminHash){sessionStorage.setItem("pem_auth","1");unlock()}else{msg.textContent="Incorrect passcode.";$("gpass").value=""}};
D.childrensDay=Object.assign({},CDDEF,D.childrensDay||{});
function get(p){return p.split(".").reduce(function(o,k){return o&&o[k]},D)}
function set(p,v){var k=p.split("."),o=D;while(k.length>1)o=o[k.shift()];o[k[0]]=v;save()}
function save(){try{localStorage.setItem("pem_draft",JSON.stringify(D));$("status").textContent="Draft saved in this browser. Download content.js to publish."}catch(e){}}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function input(type,val,fn,area){var i=el(area?"textarea":"input");if(type==="check"){i.type="checkbox";i.checked=val!==false;i.onchange=function(){fn(i.checked)}}else{i.value=val==null?"":val;i.oninput=function(){fn(i.value)}}return i}
function field(label,type,val,fn){var l=el("label",type==="check"?"chk":"");var i=input(type,val,fn,type==="area");if(type==="check"){l.appendChild(i);l.appendChild(document.createTextNode(" "+label))}else{l.appendChild(document.createTextNode(label));l.appendChild(i)}return l}
function F(p,l,t){return{k:"f",p:p,l:l,t:t}}function L(p,l,f){return{k:"l",p:p,l:l,f:f}}
var TABS=[
{id:"general",l:"General",b:[F("church.name","Church name"),F("church.location","Location"),F("church.email","Email address"),L("church.phones","Phone numbers"),F("church.copyright","Footer closing line","area")]},
{id:"home",l:"Home banner",b:[L("heroTimes","Service times shown on the home page",[["label","Service"],["time","Time"]]),L("ticker","Sliding welcome messages")]},
{id:"services",l:"Services",b:[L("services","Weekly services",[["day","Day"],["title","Title"],["time","Time"],["desc","Description","area"],["visible","Show on the site","check"]]),L("footerTimes","Service times in the footer")]},
{id:"ann",l:"Announcements",b:[L("announcements","Announcements",[["tag","Label (e.g. General, Youth)"],["title","Title"],["text","Message","area"],["posted","Posted line (e.g. Posted 5 February 2026)"],["visible","Show on the site","check"]])]},
{id:"thanks",l:"Thanksgiving",b:[{k:"f",p:"thanksgiving.show",l:"Show the Thanksgiving section",t:"check"},F("thanksgiving.title","Title"),F("thanksgiving.text","Text","area"),F("thanksgiving.date","Date (leave empty until it is announced)")]},
{id:"sermons",l:"Sermons & media",b:[L("sermons","Sermon cards",[["title","Title"],["desc","Short description","area"],["image","Image path (e.g. images/20.jpg)"],["url","YouTube link"],["visible","Show on the site","check"]]),L("channels","Channels and platforms",[["title","Title"],["handle","Handle or name"],["url","Link (leave empty if none)"],["desc","Description","area"]])]},
{id:"giving",l:"Giving",b:[F("giving.intro","Introduction","area"),L("giving.categories","Giving categories"),F("giving.scripture.text","Scripture","area"),F("giving.scripture.ref","Scripture reference"),F("giving.name","Registered name on the accounts"),L("giving.accounts","Mobile money accounts",[["network","Network"],["display","Number as shown"],["local","Number to call or copy (e.g. 0773959230)"]]),F("giving.steps","How to give","area")]},
{id:"cd",l:"Children's Day",b:[{k:"f",p:"childrensDay.show",l:"Show Children's Day on the site",t:"check"},F("childrensDay.title","Title"),F("childrensDay.date","Date (e.g. Saturday 17 January 2027)"),F("childrensDay.time","Time"),F("childrensDay.venue","Venue"),F("childrensDay.theme","Theme"),F("childrensDay.intro","Introduction","area"),F("childrensDay.scripture.text","Scripture","area"),F("childrensDay.scripture.ref","Scripture reference"),L("childrensDay.activities","Programme and activities (one per item)"),L("childrensDay.photos","Photos (paths, e.g. images/childrensday/1.jpg)")]},
{id:"security",l:"Security",sec:1}];
function renderBlock(b){var w=el("div","blk");
 if(b.k==="f"){w.appendChild(field(b.l,b.t,get(b.p),function(v){set(b.p,v)}));return w}
 w.appendChild(el("h3","",b.l));var box=el("div");w.appendChild(box);
 function draw(){box.innerHTML="";var arr=get(b.p);arr.forEach(function(it,i){var c=el("div","item");
  if(!b.f){var r=el("div","row");var inp=input("text",it,function(v){arr[i]=v;save()});r.appendChild(inp);c.appendChild(r)}
  else b.f.forEach(function(f){c.appendChild(field(f[1],f[2],it[f[0]],function(v){it[f[0]]=v;save()}))});
  var bar=el("div","bar");[["Move up",-1],["Move down",1]].forEach(function(m){var x=el("button","sm",m[0]);x.type="button";x.onclick=function(){var j=i+m[1];if(j<0||j>=arr.length)return;arr.splice(j,0,arr.splice(i,1)[0]);save();draw()};bar.appendChild(x)});
  var d=el("button","sm danger","Delete");d.type="button";d.onclick=function(){if(confirm("Delete this item?")){arr.splice(i,1);save();draw()}};bar.appendChild(d);c.appendChild(bar);box.appendChild(c)});
  var add=el("button","btn dark","+ Add new");add.type="button";add.onclick=function(){var n="";if(b.f){n={};b.f.forEach(function(f){n[f[0]]=f[2]==="check"?true:""})}arr.push(n);save();draw()};box.appendChild(add)}
 draw();return w}
function init(){var tabs=$("tabs"),pane=$("pane");
 try{var dr=localStorage.getItem("pem_draft");if(dr){D=JSON.parse(dr);D.childrensDay=Object.assign({},CDDEF,D.childrensDay||{});$("status").textContent="Your saved draft was restored."}}catch(e){}
 TABS.forEach(function(t,k){var x=el("button","tab",t.l);x.type="button";x.onclick=function(){show(k)};tabs.appendChild(x)});
 function show(k){var t=TABS[k];[].forEach.call(tabs.children,function(c,j){c.classList.toggle("on",j===k)});pane.innerHTML="";pane.appendChild(el("h2","",t.l));
  if(t.sec){pane.appendChild(secPane());return}t.b.forEach(function(b){pane.appendChild(renderBlock(b))})}
 function secPane(){var w=el("div","blk");w.innerHTML='<p>Change the admin passcode. After changing it, download content.js and upload it so the new passcode applies on your website.</p><label>Current passcode<input type="password" id="op"></label><label>New passcode<input type="password" id="np"></label><label>Repeat new passcode<input type="password" id="rp"></label><button class="btn dark" type="button" id="cp">Set new passcode</button><p id="sm"></p><p><b>Important:</b> this passcode only keeps visitors out of this editor page. Visitors can never change your website, because changes only go live when you upload the downloaded content.js to your hosting. For stronger protection, also keep admin.html private (do not link to it) or protect it with a password at your hosting provider.</p>';
  w.querySelector("#cp").onclick=function(){var s=w.querySelector("#sm");if(H(w.querySelector("#op").value)!==D.adminHash){s.textContent="The current passcode is incorrect.";return}var n=w.querySelector("#np").value;if(n.length<8){s.textContent="Use at least 8 characters.";return}if(n!==w.querySelector("#rp").value){s.textContent="The new passcodes do not match.";return}D.adminHash=H(n);save();s.textContent="Passcode changed. Now download content.js and upload it."};return w}
 show(0);
 $("dl").onclick=function(){var b=new Blob(["/* Website content. Edit with admin.html, or by hand. */\nwindow.SITE_DATA = "+JSON.stringify(D,null,2)+";\n"],{type:"text/javascript"});var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="content.js";a.click()};
 $("pv").onclick=function(){save();window.open("index.html?preview=1","_blank")};
 $("rs").onclick=function(){if(confirm("Discard your draft and reload the published content?")){localStorage.removeItem("pem_draft");location.reload()}};
 $("lo").onclick=function(){sessionStorage.removeItem("pem_auth");location.reload()};
}

})();
