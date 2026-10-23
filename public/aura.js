/* O Netlify Forms recebe os contatos. O webhook é configurado no painel do Netlify. */
(() => {
  const root = document.getElementById('aura');
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = 'true';
  const menu = root.querySelector('#aura-menu');
  const menuToggle = root.querySelector('.aura-menu-toggle');
  if (menu && menuToggle) {
    const closeMenu = () => { if (menu.open) menu.close(); };
    menuToggle.addEventListener('click', () => {
      menu.showModal();
      menuToggle.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('aura-menu-open');
    });
    menu.querySelector('.aura-menu-close').addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    menu.addEventListener('click', event => {
      const bounds = menu.getBoundingClientRect();
      if (event.target === menu && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeMenu();
    });
    menu.addEventListener('close', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('aura-menu-open');
    });
    matchMedia('(min-width:768px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  }
  // Anima somente elementos abaixo da dobra, com conteúdo acessível sem JavaScript.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-waiting');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.08});
    root.querySelectorAll('.aura-intro>div,.aura-gallery button,.aura-space-list article,.aura-leisure>*,.aura-brands>div,.aura-experience,.aura-location>div,.aura-faq details,.aura-contact-grid>div').forEach(element => {
      element.classList.add('aura-reveal');
      if (element.getBoundingClientRect().top > innerHeight) {
        element.classList.add('is-waiting');
        observer.observe(element);
      }
    });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        root.querySelectorAll('.is-waiting').forEach(element => element.classList.remove('is-waiting'));
      }
    });
  }
  const progress = root.querySelector('.aura-progress');
  let framePending = false;
  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    framePending = false;
  };
  addEventListener('scroll', () => {
    if (!framePending) { framePending = true; requestAnimationFrame(updateProgress); }
  }, {passive:true});
  addEventListener('resize', updateProgress);
  updateProgress();
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
