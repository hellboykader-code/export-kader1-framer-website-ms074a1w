/* Oléa — 21 soins : grille filtrable (page Soins) + « Voir plus » (accueil) + options du RDV.
   Optimisé : apply() anti-rebond + arrêt de l'observation après stabilisation (fluidité au scroll). */
(function(){
  var BASE="/export-kader1-framer-website-ms074a1w", CATS={"generale": "Dentisterie générale", "esthetique": "Dentisterie esthétique", "ortho": "Orthodontie", "endo": "Endodontie", "chirurgie": "Chirurgie orale", "implant": "Implantologie", "paro": "Parodontologie", "enfant": "Pédodontie"}, SOINS=[{"t": "Détartrage & Polissage", "c": "generale", "s": "Élimination du tartre et de la plaque pour des gencives saines et un sourire éclatant."}, {"t": "Examen & Bilan bucco-dentaire", "c": "generale", "s": "Un contrôle complet et des radiographies pour détecter tôt et prévenir."}, {"t": "Traitement des caries", "c": "generale", "s": "Soins conservateurs et composites esthétiques qui préservent la dent naturelle."}, {"t": "Blanchiment dentaire", "c": "esthetique", "s": "Un sourire plus lumineux en une séance, avec des produits sûrs et contrôlés."}, {"t": "Facettes dentaires", "c": "esthetique", "s": "De fines coques céramiques pour corriger forme, teinte et alignement."}, {"t": "Couronnes céramiques", "c": "esthetique", "s": "Reconstituer une dent abîmée avec une couronne solide et esthétique."}, {"t": "Bridges (ponts dentaires)", "c": "esthetique", "s": "Remplacer une ou plusieurs dents manquantes sans chirurgie."}, {"t": "Implants dentaires", "c": "implant", "s": "La solution durable et fixe pour remplacer une dent, racine comprise."}, {"t": "Prothèses amovibles", "c": "implant", "s": "Des appareils confortables et esthétiques pour retrouver le sourire."}, {"t": "Dévitalisation (traitement de canal)", "c": "endo", "s": "Traiter l'infection en profondeur et conserver la dent naturelle."}, {"t": "Extraction dentaire", "c": "chirurgie", "s": "Une extraction douce et maîtrisée lorsque la dent est irrécupérable."}, {"t": "Extraction des dents de sagesse", "c": "chirurgie", "s": "Prévenir douleurs et complications par une chirurgie précise et sereine."}, {"t": "Greffe osseuse", "c": "chirurgie", "s": "Reconstruire le volume osseux pour accueillir un implant."}, {"t": "Orthodontie enfant", "c": "ortho", "s": "Guider la croissance et aligner les dents dès le plus jeune âge."}, {"t": "Aligneurs transparents (adulte)", "c": "ortho", "s": "Aligner les dents discrètement grâce à des gouttières sur mesure."}, {"t": "Traitement des gencives", "c": "paro", "s": "Soigner gingivite et parodontite pour préserver vos dents."}, {"t": "Surfaçage radiculaire", "c": "paro", "s": "Un nettoyage en profondeur des racines pour des gencives assainies."}, {"t": "Soins des enfants", "c": "enfant", "s": "Un accueil bienveillant pour apprivoiser le dentiste en douceur."}, {"t": "Urgences dentaires", "c": "generale", "s": "Douleur, dent cassée, abcès : une prise en charge rapide et prioritaire."}, {"t": "Prévention & scellement des sillons", "c": "enfant", "s": "Protéger durablement les dents des caries dès l'enfance."}, {"t": "Bruxisme & gouttière occlusale", "c": "generale", "s": "Protéger vos dents du grincement nocturne avec une gouttière sur mesure."}], COL={"generale": "#2f5d3a", "esthetique": "#7a8a2e", "ortho": "#2f6f6b", "endo": "#a35a2a", "chirurgie": "#8a3b45", "implant": "#3a5a8c", "paro": "#4f7a34", "enfant": "#c07a2e"};
  // photo réelle par soin (même ordre que SOINS)
  var IMG=["soin-detartrage","soin-bilan","soin-caries","soin-blanchiment","soin-facettes","soin-couronnes","soin-bridge-v2","soin-implants","soin-protheses","soin-endo-v2","soin-extraction","soin-sagesse-v2","soin-greffe","soin-ortho-enfant","soin-aligneurs","soin-gencives","soin-surfacage","soin-enfants-v2","soin-urgence","soin-prevention","soin-bruxisme"];
  var ARROW='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function buildGrid(){
    var sec=document.createElement('section'); sec.id='olea-soins'; sec.setAttribute('data-olea','1');
    var chips='<button type="button" class="olea-chip is-active" data-cat="all">Tous</button>';
    for(var k in CATS){ chips+='<button type="button" class="olea-chip" data-cat="'+k+'">'+CATS[k]+'</button>'; }
    var cards=SOINS.map(function(s,i){
      return '<article class="olea-soin" data-cat="'+s.c+'">'+
        '<div class="olea-soin__link" role="link" tabindex="0" data-href="'+BASE+'/book-appointment/index.html" aria-label="Prendre rendez-vous \u2014 '+s.t+'">'+
          '<div class="olea-soin__media">'+
            '<img class="olea-soin__img" src="'+BASE+'/assets/soins/'+IMG[i]+'.webp" alt="'+s.t+'" loading="lazy" decoding="async">'+
            '<span class="olea-soin__cat">'+CATS[s.c]+'</span>'+
          '</div>'+
          '<div class="olea-soin__body">'+
            '<h3 class="olea-soin__title">'+s.t+'</h3>'+
            '<p class="olea-soin__desc">'+s.s+'</p>'+
            '<span class="olea-soin__more">Prendre rendez-vous '+ARROW+'</span>'+
          '</div>'+
        '</div>'+
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
  document.addEventListener('click',function(e){ var a=e.target&&e.target.closest&&e.target.closest('.olea-soin__link[data-href],.olea-cta[data-href],.olea-more-btn[data-href]'); if(a){ e.preventDefault(); e.stopPropagation(); window.location.href=a.getAttribute('data-href'); } },true);
  function boot(){
    apply();
    [300,800,1600,3000,5000].forEach(function(t){setTimeout(apply,t);});
    var obs=new MutationObserver(function(){ if(!done) schedule(); });
    try{ obs.observe(document.body,{childList:true,subtree:true}); }catch(e){}
    setTimeout(function(){ try{obs.disconnect();}catch(e){} }, 14000); // arrêt après hydratation
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
