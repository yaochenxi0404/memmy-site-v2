const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

document.querySelectorAll('#downloadBtn, #downloadWinBtn').forEach(btn => {
  btn.addEventListener('click', event => {
    event.preventDefault();
    alert('安装包即将开放下载，敬请期待！');
  });
});
