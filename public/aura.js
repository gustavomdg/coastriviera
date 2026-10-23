/* O Netlify Forms recebe os contatos. O webhook é configurado no painel do Netlify. */
(() => {
  const root = document.getElementById('aura');
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = 'true';
  const slot = root.querySelector('#aura-native-form-slot');
  const nativeForm = document.querySelector('.aura-native-form');
  if (nativeForm && slot && !slot.contains(nativeForm)) slot.replaceChildren(nativeForm);
  const form = slot?.querySelector('form');
  if (form) {
    const params = new URLSearchParams(location.search);
    const urlImovel = 'https://imobiliariacoastriviera.com.br/imovel/casa-a-venda-5-quartos-riviera-modulo-21-bertioga-sp-id-1825';
    const meta = {
      imovel:'Casa Aura',
      referencia:'21E17',
      codigo_imovel:'1825',
      url_imovel:urlImovel,
      origem:'Landing Casa Aura — COAST',
      mensagem:`Interesse na Casa Aura. Referência 21E17. Código do anúncio: 1825. Imóvel: ${urlImovel}`,
      pagina:location.origin + location.pathname
    };
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(key => {
      if (params.has(key)) meta[key] = params.get(key).slice(0,500);
    });
    for (const [name,value] of Object.entries(meta)) {
      let field = form.querySelector(`input[name="${name}"]`);
      if (!field) { field = document.createElement('input'); field.type = 'hidden'; field.name = name; form.append(field); }
      field.setAttribute('data-name', name);
      field.value = value;
    }

  }
  const dialog = root.querySelector('.aura-lightbox');
  root.querySelectorAll('[data-aura-photo]').forEach(button => button.addEventListener('click', () => {
    const image = dialog.querySelector('img');
    image.src = button.dataset.auraPhoto;
    image.alt = button.dataset.auraCaption;
    dialog.querySelector('.aura-lightbox-caption').textContent = button.dataset.auraCaption;
    dialog.showModal();
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  root.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.getElementById(link.hash.slice(1));
    if (target) { event.preventDefault(); target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }
  }));
})();
