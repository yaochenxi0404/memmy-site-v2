const PAGES = [
  'introduction', 'quickstart', 'installation',
  'cross-agent-memory', 'privacy', 'faq'
];

const article = document.getElementById('docsArticle');
const tocList = document.getElementById('docsTocList');
const sidebar = document.getElementById('docsSidebar');
const burger = document.getElementById('docsBurger');
const overlay = document.getElementById('docsOverlay');
const navLinks = document.querySelectorAll('.docs-nav__link');

function getPageFromHash() {
  const hash = location.hash.replace('#', '');
  return PAGES.includes(hash) ? hash : 'introduction';
}

async function loadPage(page) {
  article.innerHTML = '<div class="docs-loading">正在加载…</div>';
  try {
    const res = await fetch('content/' + page + '.md');
    if (!res.ok) throw new Error(res.status);
    const md = await res.text();
    article.innerHTML = marked.parse(md);
    buildToc();
    updateActiveNav(page);
    window.scrollTo(0, 0);
  } catch (e) {
    article.innerHTML = '<p>加载失败，请刷新重试。</p>';
  }
}

function buildToc() {
  tocList.innerHTML = '';
  const headings = article.querySelectorAll('h2, h3');
  headings.forEach((h, i) => {
    if (!h.id) h.id = 'heading-' + i;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    if (h.tagName === 'H3') a.style.paddingLeft = '20px';
    a.addEventListener('click', e => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });
}

function updateActiveNav(page) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    location.hash = page;
    loadPage(page);
    closeSidebar();
  });
});

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
}

burger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
});
overlay.addEventListener('click', closeSidebar);

window.addEventListener('hashchange', () => loadPage(getPageFromHash()));
loadPage(getPageFromHash());
