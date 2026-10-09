/* Efeitos compartilhados: cruzes de registro, holofote no cursor e versão do Fluxo+ vinda do GitHub. */
(function () {
  document.querySelectorAll('.h-x').forEach(function (el) {
    ['a', 'b', 'c', 'd'].forEach(function (c) { var i = document.createElement('i'); i.className = 'x ' + c; el.appendChild(i); });
  });
  document.addEventListener('pointermove', function (e) {
    var t = e.target.closest && e.target.closest('.h-spot'); if (!t) return;
    var r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
  // Só consulta o GitHub em páginas que mostram a versão. Se falhar, fica o valor escrito no HTML.
  var alvos = document.querySelectorAll('[data-gh-tag]');
  if (alvos.length && !window.__ghTag) {
    window.__ghTag = fetch('https://api.github.com/repos/LINCOLN201/Fluxo-Plus/releases/latest')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) { if (j.tag_name) alvos.forEach(function (e) { e.textContent = j.tag_name; }); return j.tag_name; })
      .catch(function () {});
  }
})();
