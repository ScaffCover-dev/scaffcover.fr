(()=>{
const frame=document.getElementById('bayFrame'),gate=document.getElementById('bayLoadGate'),button=document.getElementById('loadBay');
button.onclick=()=>{frame.hidden=false;frame.src=frame.dataset.src;gate.hidden=true;};
window.addEventListener('message',e=>{
if(e.origin!==location.origin||e.source!==frame.contentWindow)return;
if(e.data?.type==='bay-error'){gate.hidden=false;button.textContent="Recharger la travée interactive";return;}
if(e.data?.type!=='bay-component')return;
const target=document.getElementById('baySelection');target.replaceChildren();
const h=document.createElement('h3');h.textContent=e.data.name||"Composant";target.append(h);
for(const text of [e.data.note,...(e.data.details||[])]){if(text){const p=document.createElement('p');p.textContent=text;target.append(p);}}
});
})();