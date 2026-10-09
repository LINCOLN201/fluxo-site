/* Efeitos compartilhados: cruzes de registro, holofote no cursor e versão do Fluxo+ vinda do GitHub. */
(function () {
  document.querySelectorAll('.h-x').forEach(function (el) {
    ['a', 'b', 'c', 'd'].forEach(function (c) { var i = document.createElement('i'); i.className = 'x ' + c; el.appendChild(i); });
  });
  document.addEventListener('pointermove', function (e) {
    var t = e.target.closest && e.target.closest('.h-spot'); if (!t) return;
    var r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
  // Versão do Fluxo+: mostra a última vista (guardada no navegador) e confirma no GitHub.
  // Se o GitHub não responder (ex.: limite da API), fica a última versão conhecida, nunca a do HTML antigo.
  var alvos = document.querySelectorAll('[data-gh-tag]'), CHAVE = 'fluxo:versao';
  function num(v) { return (v.match(/\d+/g) || []).map(Number); }
  function maior(a, b) { var x = num(a), y = num(b); for (var i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); } return false; }
  function aplica(t) { alvos.forEach(function (e) { e.textContent = t; }); }
  if (alvos.length) {
    try { var salvo = localStorage.getItem(CHAVE); if (/^v\d+\.\d+\.\d+$/.test(salvo || '') && maior(salvo, alvos[0].textContent)) aplica(salvo); } catch (e) {}
    fetch('https://api.github.com/repos/LINCOLN201/Fluxo-Plus/releases/latest')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) { if (j.tag_name) { aplica(j.tag_name); try { localStorage.setItem(CHAVE, j.tag_name); } catch (e) {} } })
      .catch(function () {});
  }

  // Menu de download: a pessoa escolhe o sistema; o dela vem marcado e em primeiro.
  var ua = navigator.userAgent || '', so =
    /android/i.test(ua) ? 'android' :
    /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) ? 'apple' :
    /windows/i.test(ua) ? 'windows' :
    /macintosh|mac os x/i.test(ua) ? 'apple' :
    /linux|x11|cros/i.test(ua) ? 'linux' : '';
  document.querySelectorAll('[data-dl]').forEach(function (m) {
    var btn = m.querySelector('.dl-btn'), pop = m.querySelector('.dl-pop');
    var rec = so && pop.querySelector('.dl-op[data-os="' + so + '"]');
    if (rec) { rec.classList.add('rec'); pop.insertBefore(rec, pop.querySelector('.dl-op')); }
    if (so === 'apple') pop.querySelector('.dl-nota').hidden = false;
    function itens() { return [].slice.call(pop.querySelectorAll('[role="menuitem"]')); }
    function abre(foco) { pop.hidden = false; btn.setAttribute('aria-expanded', 'true'); if (foco) itens()[0].focus(); }
    function fecha(volta) { if (pop.hidden) return; pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (volta) btn.focus(); }
    btn.addEventListener('click', function () { pop.hidden ? abre(false) : fecha(false); });
    btn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); abre(true); } });
    pop.addEventListener('keydown', function (e) {
      var l = itens(), i = l.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); fecha(true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); l[(i + 1) % l.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); l[(i - 1 + l.length) % l.length].focus(); }
      else if (e.key === 'Tab') { fecha(false); }
    });
    document.addEventListener('click', function (e) { if (!m.contains(e.target)) fecha(false); });
  });
})();
