/* Oléa — après hydratation Framer : retire avis/blog/filler, traduit le hero animé. */
(function(){
  var KILLSEC=/^(Testimonial|Our Client's Words|Blog)$/;   // vraies sections -> masquer la section
  var KILLEL=/^(Review|Reviewer Info|Reviewer Name)$/;      // pastilles/cartes -> masquer l'élément seul
  var FILLER=/(DentalInvest|DentalCapital|QuantumSmile|impartial funding|Southeast Asia|chill dental vibe|Team Oralcare|Dentist, Oralcare|120M)/i;
  var TESTI=/(sudden dental issue|nervous about visiting the dentist|chipped my tooth|carefully personalized plan|never looked better|feel confident smiling again)/i;
  function main(){ return document.querySelector('[data-framer-root]')||document.querySelector('main'); }
  function topOfMain(el){ var m=main(); if(!m) return el; var p=el; while(p&&p.parentElement&&p.parentElement!==m) p=p.parentElement; return (p&&p.parentElement===m)?p:null; }
  function isHero(s){ var m=main(); if(s&&m&&s===m.firstElementChild) return true; return s&&s.getAttribute&&s.getAttribute('data-framer-name')==='Hero'; }
  function hide(el){ if(el) el.style.display='none'; }
  function killSection(el){ var s=topOfMain(el); if(isHero(s)){ hide(el); return; } hide(s); hide(el); }
  var LOGO="/export-kader1-framer-website-ms074a1w/assets/framer/images/Z105pA3VJa4nTDDld5jCn3K55U.svg";
  function forceLogo(){
    document.querySelectorAll('img[src*="Z105pA3V"]').forEach(function(img){
      if(img.getAttribute('srcset')) img.removeAttribute('srcset');
      if((img.getAttribute('src')||'').indexOf('framerusercontent')>=0) img.setAttribute('src',LOGO);
    });
    document.querySelectorAll('[data-framer-name="Oléa"]').forEach(function(el){
      var svg=(el.tagName&&el.tagName.toLowerCase()==='svg')?el:el.querySelector('svg');
      if(svg && (svg.querySelector('path')||svg.querySelector('use')) && !svg.querySelector('text')){
        var vb=(svg.getAttribute('viewBox')||'0 0 588 112').split(/\s+/);
        var H=parseFloat(vb[3])||112;
        var fill=window.getComputedStyle(svg).fill;
        if(!fill||fill==='none'||fill==='rgb(0, 0, 0)') fill=window.getComputedStyle(el).fill||'#f2f2ef';
        svg.setAttribute('preserveAspectRatio','xMinYMid meet');
        svg.innerHTML='<text x="0" y="'+(H*0.78)+'" font-family="Bricolage Grotesque, Trebuchet MS, sans-serif" font-weight="700" font-size="'+(H*0.92)+'" letter-spacing="-3" fill="'+fill+'">Oléa</text>';
      }
    });
  }

  var SPLITRE=[
    [/everyone should have a radiant smile/i,
     "Au cabinet Oléa, nous pensons que chacun mérite un sourire éclatant. Notre équipe experte prodigue des soins sur mesure dans un cadre chaleureux, avec une technologie de pointe pour les meilleurs résultats."]
  ];
  function fixSplit(){
    document.querySelectorAll('h1,h2,h3,h4,p').forEach(function(el){
      if(el.getAttribute('data-frfixed')==='1') return;
      var leaves=[].filter.call(el.querySelectorAll('span'),function(s){return s.children.length===0&&(s.textContent||'').length>=1&&(s.textContent||'').length<=22&&(s.textContent||'').indexOf(' ')<0;});
      if(leaves.length<5) return;
      var joined=leaves.map(function(s){return s.textContent;}).join(' ');
      for(var i=0;i<SPLITRE.length;i++){
        if(SPLITRE[i][0].test(joined)){
          var cs=window.getComputedStyle(leaves[0]);
          var sp=document.createElement('span'); sp.textContent=SPLITRE[i][1];
          sp.style.color=cs.color; sp.style.fontFamily=cs.fontFamily; sp.style.fontSize=cs.fontSize;
          sp.style.fontWeight=cs.fontWeight; sp.style.letterSpacing=cs.letterSpacing;
          el.innerHTML=''; el.appendChild(sp); el.setAttribute('data-frfixed','1');
          return;
        }
      }
    });
  }
  function apply(){
    forceLogo();
    // masquer directement l'ÉLÉMENT nommé (les sections testimonials/blog/filler sont nommées) —
    // ne jamais remonter jusqu'à « Main » qui enveloppe toute la page.
    document.querySelectorAll('[data-framer-name]').forEach(function(el){
      var n=(el.getAttribute('data-framer-name')||'').trim();
      if(KILLSEC.test(n) || KILLEL.test(n)){ hide(el); }
    });
    // filler par contenu : masquer le plus petit bloc nommé qui le contient (jamais « Main »)
    document.querySelectorAll('[data-framer-name]:not([data-framer-name="Main"])').forEach(function(el){
      if(el.getAttribute('data-framer-name')==='Main') return;
      var t=el.textContent||'';
      if((FILLER.test(t)||TESTI.test(t)) && t.length<1400){ hide(el); }
    });
    fixSplit();
    document.querySelectorAll('a[href*="nivrit"],a[href*="/blog"],a[href*="framer.com"]').forEach(function(a){ (a.closest('li')||a).style.display='none'; a.style.display='none'; });
  }
  function boot(){ apply(); [200,500,1000,1800,3000,5000].forEach(function(t){setTimeout(apply,t);});
    var n=0,iv=setInterval(function(){apply(); if(++n>15)clearInterval(iv);},600);
    try{ new MutationObserver(apply).observe(document.body,{childList:true,subtree:true}); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
