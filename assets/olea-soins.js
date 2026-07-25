/* Oléa — 21 soins (comme Éclat) : grille filtrable + options du formulaire de rendez-vous */
(function(){
  var BASE="/export-kader1-framer-website-ms074a1w";
  var CATS={"generale": "Dentisterie générale", "esthetique": "Dentisterie esthétique", "ortho": "Orthodontie", "endo": "Endodontie", "chirurgie": "Chirurgie orale", "implant": "Implantologie", "paro": "Parodontologie", "enfant": "Pédodontie"};
  var SOINS=[{"t": "Détartrage & Polissage", "c": "generale", "s": "Élimination du tartre et de la plaque pour des gencives saines et un sourire éclatant."}, {"t": "Examen & Bilan bucco-dentaire", "c": "generale", "s": "Un contrôle complet et des radiographies pour détecter tôt et prévenir."}, {"t": "Traitement des caries", "c": "generale", "s": "Soins conservateurs et composites esthétiques qui préservent la dent naturelle."}, {"t": "Blanchiment dentaire", "c": "esthetique", "s": "Un sourire plus lumineux en une séance, avec des produits sûrs et contrôlés."}, {"t": "Facettes dentaires", "c": "esthetique", "s": "De fines coques céramiques pour corriger forme, teinte et alignement."}, {"t": "Couronnes céramiques", "c": "esthetique", "s": "Reconstituer une dent abîmée avec une couronne solide et esthétique."}, {"t": "Bridges (ponts dentaires)", "c": "esthetique", "s": "Remplacer une ou plusieurs dents manquantes sans chirurgie."}, {"t": "Implants dentaires", "c": "implant", "s": "La solution durable et fixe pour remplacer une dent, racine comprise."}, {"t": "Prothèses amovibles", "c": "implant", "s": "Des appareils confortables et esthétiques pour retrouver le sourire."}, {"t": "Dévitalisation (traitement de canal)", "c": "endo", "s": "Traiter l'infection en profondeur et conserver la dent naturelle."}, {"t": "Extraction dentaire", "c": "chirurgie", "s": "Une extraction douce et maîtrisée lorsque la dent est irrécupérable."}, {"t": "Extraction des dents de sagesse", "c": "chirurgie", "s": "Prévenir douleurs et complications par une chirurgie précise et sereine."}, {"t": "Greffe osseuse", "c": "chirurgie", "s": "Reconstruire le volume osseux pour accueillir un implant."}, {"t": "Orthodontie enfant", "c": "ortho", "s": "Guider la croissance et aligner les dents dès le plus jeune âge."}, {"t": "Aligneurs transparents (adulte)", "c": "ortho", "s": "Aligner les dents discrètement grâce à des gouttières sur mesure."}, {"t": "Traitement des gencives", "c": "paro", "s": "Soigner gingivite et parodontite pour préserver vos dents."}, {"t": "Surfaçage radiculaire", "c": "paro", "s": "Un nettoyage en profondeur des racines pour des gencives assainies."}, {"t": "Soins des enfants", "c": "enfant", "s": "Un accueil bienveillant pour apprivoiser le dentiste en douceur."}, {"t": "Urgences dentaires", "c": "generale", "s": "Douleur, dent cassée, abcès : une prise en charge rapide et prioritaire."}, {"t": "Prévention & scellement des sillons", "c": "enfant", "s": "Protéger durablement les dents des caries dès l'enfance."}, {"t": "Bruxisme & gouttière occlusale", "c": "generale", "s": "Protéger vos dents du grincement nocturne avec une gouttière sur mesure."}];
  function buildGrid(){
    var sec=document.createElement('section'); sec.id='olea-soins'; sec.setAttribute('data-olea','1');
    var chips='<button type="button" class="olea-chip is-active" data-cat="all">Tous</button>';
    for(var k in CATS){ chips+='<button type="button" class="olea-chip" data-cat="'+k+'">'+CATS[k]+'</button>'; }
    var cards=SOINS.map(function(s){
      return '<article class="olea-soin" data-cat="'+s.c+'">'+
        '<span class="olea-tag">'+CATS[s.c]+'</span>'+
        '<h3>'+s.t+'</h3><p>'+s.s+'</p>'+
        '<a class="olea-cta" href="'+BASE+'/book-appointment/index.html">Prendre rendez-vous \u2192</a>'+
        '</article>';
    }).join('');
    sec.innerHTML='<div class="olea-wrap">'+
      '<span class="olea-eyebrow">Nos soins</span>'+
      '<h2 class="olea-title">21 soins pour toute la famille</h2>'+
      '<p class="olea-sub">De la pr\u00e9vention \u00e0 l\u2019esth\u00e9tique, en passant par l\u2019implantologie et l\u2019orthodontie \u2014 d\u00e9couvrez l\u2019ensemble de nos soins et filtrez par domaine.</p>'+
      '<div class="olea-filters">'+chips+'</div>'+
      '<div class="olea-grid">'+cards+'</div></div>';
    sec.addEventListener('click',function(e){
      var c=e.target.closest('.olea-chip'); if(!c) return;
      sec.querySelectorAll('.olea-chip').forEach(function(x){x.classList.remove('is-active');});
      c.classList.add('is-active');
      var cat=c.getAttribute('data-cat');
      sec.querySelectorAll('.olea-soin').forEach(function(card){
        card.style.display=(cat==='all'||card.getAttribute('data-cat')===cat)?'':'none';
      });
    });
    return sec;
  }
  function injectGrid(){
    if(document.getElementById('olea-soins')) return;
    var target=document.querySelector('[data-framer-name="Sevice Cards"]')||document.querySelector('[data-framer-name="Service"]');
    if(!target||!target.parentNode) return;
    target.parentNode.insertBefore(buildGrid(), target);
    target.style.display='none';
  }
  function rebuildSelect(){
    document.querySelectorAll('select[name="Services"]').forEach(function(sel){
      if(sel.getAttribute('data-olea21')==='1') return;
      var html='<option value="" disabled selected>S\u00e9lectionnez\u2026</option>';
      SOINS.forEach(function(s){ html+='<option value="'+s.t+'">'+s.t+'</option>'; });
      sel.innerHTML=html; sel.setAttribute('data-olea21','1');
    });
  }
  function apply(){ injectGrid(); rebuildSelect(); }
  function boot(){ apply(); [200,600,1200,2400,4000,6000].forEach(function(t){setTimeout(apply,t);});
    var n=0,iv=setInterval(function(){apply(); if(++n>15)clearInterval(iv);},700);
    try{ new MutationObserver(apply).observe(document.body,{childList:true,subtree:true}); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
