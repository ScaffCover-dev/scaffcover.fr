document.addEventListener('invalid',e=>{e.target.setCustomValidity(e.target.validity.typeMismatch?"Veuillez saisir une adresse e-mail valide.":"Veuillez remplir ce champ obligatoire.");},true);
document.addEventListener('input',e=>{if(e.target.setCustomValidity)e.target.setCustomValidity('');},true);
// Review controls belong after the page, never over a visitor's form controls.
// Review notice is part of the normal page flow immediately before the footer.
document.addEventListener('focusin',e=>{
  const control=e.target;
  if(!control.matches('#ct-grid input,#ct-grid textarea,#ct-grid button'))return;
  requestAnimationFrame(()=>{
    const rect=control.getBoundingClientRect();
    const header=document.getElementById('sc-header');
    const clearance=(header?header.getBoundingClientRect().bottom:0)+16;
    if(rect.top<clearance||rect.bottom>window.innerHeight-24){
      control.scrollIntoView({block:'center',behavior:'instant'});
    }
  });
});
