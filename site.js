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
})();
