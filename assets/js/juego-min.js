const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"];let r=[];const o=document.querySelector("#btnPedir"),a=document.querySelector("#btnDetener"),l=document.querySelector("#btnNuevo"),s=document.querySelector("b"),d=document.querySelectorAll(".divCartas"),c=document.querySelectorAll("small"),u=(l=2)=>{e=(()=>{e=[];for(let n=2;n<=10;n++)for(let r of t)e.push(n+r);for(let r of t)for(let t of n)e.push(t+r);return _.shuffle(e)})(),r=[];for(let e=0;e<l;e++)r.push(0);c.forEach(e=>e.innerText=0),d.forEach(e=>e.innerHTML=""),o.disabled=!1,a.disabled=!1};u();(()=>{let e=prompt("Bienvenido! ¿Cual es tu nombre?");"Jugador 1"!=s?s.innerText=e:"Jugador 1"==s&&(s.innerText="Jugador 1")})();const i=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.shift()},m=(e,t)=>(r[t]=r[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),c[t].innerText=r[t],r[t]),g=(e,t)=>{const n=document.createElement("img");n.src=`assets/cartas/${e}.png`,n.classList.add("carta"),d[t].append(n)},f=e=>{let t=0;do{const e=i();t=m(e,r.length-1),g(e,r.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=r;setTimeout(()=>{t===e?alert("Es un empate!"):e>21?alert("Computadora gana!"):t>21?alert("Jugador gana!"):alert("Computadora gana!")},20)})()};return o.addEventListener("click",()=>{const e=i();const t=m(e,0);g(e,0),t>21?(o.disabled=!0,f(t)):21===t&&(o.disabled=!0,f(t))}),a.addEventListener("click",()=>{o.disabled=!0,a.disabled=!0,f(r[0])}),l.addEventListener("click",()=>{u()}),{nuevoJuego:u}})();