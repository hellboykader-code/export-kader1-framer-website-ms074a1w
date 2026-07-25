/* Oléa — 21 soins : grille filtrable (page Soins) + « Voir plus » (accueil) + options du RDV.
   Optimisé : apply() anti-rebond + arrêt de l'observation après stabilisation (fluidité au scroll). */
(function(){
  var BASE="/export-kader1-framer-website-ms074a1w", CATS={"generale": "Dentisterie générale", "esthetique": "Dentisterie esthétique", "ortho": "Orthodontie", "endo": "Endodontie", "chirurgie": "Chirurgie orale", "implant": "Implantologie", "paro": "Parodontologie", "enfant": "Pédodontie"}, SOINS=[{"t": "Détartrage & Polissage", "c": "generale", "s": "Élimination du tartre et de la plaque pour des gencives saines et un sourire éclatant."}, {"t": "Examen & Bilan bucco-dentaire", "c": "generale", "s": "Un contrôle complet et des radiographies pour détecter tôt et prévenir."}, {"t": "Traitement des caries", "c": "generale", "s": "Soins conservateurs et composites esthétiques qui préservent la dent naturelle."}, {"t": "Blanchiment dentaire", "c": "esthetique", "s": "Un sourire plus lumineux en une séance, avec des produits sûrs et contrôlés."}, {"t": "Facettes dentaires", "c": "esthetique", "s": "De fines coques céramiques pour corriger forme, teinte et alignement."}, {"t": "Couronnes céramiques", "c": "esthetique", "s": "Reconstituer une dent abîmée avec une couronne solide et esthétique."}, {"t": "Bridges (ponts dentaires)", "c": "esthetique", "s": "Remplacer une ou plusieurs dents manquantes sans chirurgie."}, {"t": "Implants dentaires", "c": "implant", "s": "La solution durable et fixe pour remplacer une dent, racine comprise."}, {"t": "Prothèses amovibles", "c": "implant", "s": "Des appareils confortables et esthétiques pour retrouver le sourire."}, {"t": "Dévitalisation (traitement de canal)", "c": "endo", "s": "Traiter l'infection en profondeur et conserver la dent naturelle."}, {"t": "Extraction dentaire", "c": "chirurgie", "s": "Une extraction douce et maîtrisée lorsque la dent est irrécupérable."}, {"t": "Extraction des dents de sagesse", "c": "chirurgie", "s": "Prévenir douleurs et complications par une chirurgie précise et sereine."}, {"t": "Greffe osseuse", "c": "chirurgie", "s": "Reconstruire le volume osseux pour accueillir un implant."}, {"t": "Orthodontie enfant", "c": "ortho", "s": "Guider la croissance et aligner les dents dès le plus jeune âge."}, {"t": "Aligneurs transparents (adulte)", "c": "ortho", "s": "Aligner les dents discrètement grâce à des gouttières sur mesure."}, {"t": "Traitement des gencives", "c": "paro", "s": "Soigner gingivite et parodontite pour préserver vos dents."}, {"t": "Surfaçage radiculaire", "c": "paro", "s": "Un nettoyage en profondeur des racines pour des gencives assainies."}, {"t": "Soins des enfants", "c": "enfant", "s": "Un accueil bienveillant pour apprivoiser le dentiste en douceur."}, {"t": "Urgences dentaires", "c": "generale", "s": "Douleur, dent cassée, abcès : une prise en charge rapide et prioritaire."}, {"t": "Prévention & scellement des sillons", "c": "enfant", "s": "Protéger durablement les dents des caries dès l'enfance."}, {"t": "Bruxisme & gouttière occlusale", "c": "generale", "s": "Protéger vos dents du grincement nocturne avec une gouttière sur mesure."}], COL={"generale": "#2f5d3a", "esthetique": "#7a8a2e", "ortho": "#2f6f6b", "endo": "#a35a2a", "chirurgie": "#8a3b45", "implant": "#3a5a8c", "paro": "#4f7a34", "enfant": "#c07a2e"};
  var TOOTH="M20 8c-3.2 0-5.3 1.9-6.1 4.6-.5 1.6-.4 3.5.1 5.7.4 1.8.5 2.9.9 4.9.3 1.6.6 3.2 1.3 4.3.4.7.9 1.1 1.6 1.1.9 0 1.2-.8 1.5-1.9.3-1.1.5-2.5 1-3.6.3-.6.7-1 1.6-1s1.3.4 1.6 1c.5 1.1.7 2.5 1 3.6.3 1.1.6 1.9 1.5 1.9.7 0 1.2-.4 1.6-1.1.7-1.1 1-2.7 1.3-4.3.4-2 .5-3.1.9-4.9.5-2.2.6-4.1.1-5.7C25.3 9.9 23.2 8 20 8c-1.4 0-2.4.5-3 .5S21.4 8 20 8Z";
  function icon(cat){
    return '<span class="olea-thumb" style="background:'+(COL[cat]||'#2f5d3a')+'">'+
      '<svg viewBox="0 0 40 40" width="34" height="34" fill="#fff" aria-hidden="true"><path d="'+TOOTH+'"/></svg></span>';
  }
  function buildGrid(){
    var sec=document.createElement('section'); sec.id='olea-soins'; sec.setAttribute('data-olea','1');
    var chips='<button type="button" class="olea-chip is-active" data-cat="all">Tous</button>';
    for(var k in CATS){ chips+='<button type="button" class="olea-chip" data-cat="'+k+'">'+CATS[k]+'</button>'; }
    var cards=SOINS.map(function(s){
      return '<article class="olea-soin" data-cat="'+s.c+'">'+icon(s.c)+
        '<span class="olea-tag">'+CATS[s.c]+'</span>'+
        '<h3>'+s.t+'</h3><p>'+s.s+'</p>'+
        '<div class="olea-cta" role="link" tabindex="0" data-href="'+BASE+'/book-appointment/index.html">Prendre rendez-vous \u2192</div>'+
        '</article>';
    }).join('');
    sec.innerHTML='<div class="olea-wrap">'+
      '<span class="olea-eyebrow">Nos soins</span>'+
      '<h2 class="olea-title">21 soins pour toute la famille</h2>'+
      '<p class="olea-sub">De la pr\u00e9vention \u00e0 l\u2019esth\u00e9tique, en passant par l\u2019implantologie et l\u2019orthodontie \u2014 filtrez par domaine.</p>'+
      '<div class="olea-filters">'+chips+'</div>'+
      '<div class="olea-grid">'+cards+'</div></div>';
    sec.addEventListener('click',function(e){
      var c=e.target.closest('.olea-chip'); if(!c) return;
      sec.querySelectorAll('.olea-chip').forEach(function(x){x.classList.remove('is-active');});
      c.classList.add('is-active'); var cat=c.getAttribute('data-cat');
      sec.querySelectorAll('.olea-soin').forEach(function(card){
        card.style.display=(cat==='all'||card.getAttribute('data-cat')===cat)?'':'none';
      });
    });
    return sec;
  }
  function isServicesPage(){ return !!document.querySelector('[data-framer-name="Sevice Cards"]'); }
  function injectGrid(){
    if(document.getElementById('olea-soins')) return;
    var target=document.querySelector('[data-framer-name="Sevice Cards"]');
    if(!target||!target.parentNode) return;
    target.parentNode.insertBefore(buildGrid(), target);
    target.style.display='none';
  }
  function addHomeMore(){
    if(isServicesPage()) return;
    if(document.getElementById('olea-more')) return;
    // accueil : section services d'origine (6) -> ajouter un bouton « Voir plus »
    var sec=document.querySelector('[data-framer-name="Service"]'); if(!sec) return;
    var wrap=document.createElement('div'); wrap.id='olea-more';
    wrap.innerHTML='<div class="olea-more-btn" role="link" tabindex="0" data-href="'+BASE+'/services/index.html">Voir tous nos soins \u2192</div>';
    sec.parentNode.insertBefore(wrap, sec.nextSibling);
  }
  function rebuildSelect(){
    document.querySelectorAll('select[name="Services"]').forEach(function(sel){
      if(sel.getAttribute('data-olea21')==='1') return;
      var html='<option value="" disabled selected>S\u00e9lectionnez\u2026</option>';
      SOINS.forEach(function(s){ html+='<option value="'+s.t+'">'+s.t+'</option>'; });
      sel.innerHTML=html; sel.setAttribute('data-olea21','1');
    });
  }
  var done=false;
  function apply(){ injectGrid(); addHomeMore(); rebuildSelect();
    // tout est en place -> on arrête l'observation pour ne pas peser au scroll
    if(document.getElementById('olea-soins')||document.getElementById('olea-more')){ if(rebuiltSelectDone()) done=true; }
  }
  function rebuiltSelectDone(){ var s=document.querySelector('select[name="Services"]'); return !s || s.getAttribute('data-olea21')==='1'; }
  var raf=null;
  function schedule(){ if(raf) return; raf=setTimeout(function(){ raf=null; apply(); }, 180); }
  document.addEventListener('click',function(e){ var a=e.target&&e.target.closest&&e.target.closest('.olea-cta[data-href],.olea-more-btn[data-href]'); if(a){ e.preventDefault(); e.stopPropagation(); window.location.href=a.getAttribute('data-href'); } },true);
  function boot(){
    apply();
    [300,800,1600,3000,5000].forEach(function(t){setTimeout(apply,t);});
    var obs=new MutationObserver(function(){ if(!done) schedule(); });
    try{ obs.observe(document.body,{childList:true,subtree:true}); }catch(e){}
    setTimeout(function(){ try{obs.disconnect();}catch(e){} }, 14000); // arrêt après hydratation
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
