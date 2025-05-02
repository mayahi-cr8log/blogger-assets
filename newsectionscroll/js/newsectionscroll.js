document.querySelectorAll('.contents_width').forEach(section => {
  const container = section.querySelector('.scroll-container');
  const content = section.querySelector('.scroll-content');
  const leftArrow = section.querySelector('.arrow-left');
  const rightArrow = section.querySelector('.arrow-right');
  const buttons = section.querySelectorAll('.tabs button');

  // 💡 カード複製回数：1回だけ
  const originals = [...content.children];
  for (let i = 0; i < 1; i++) {
    originals.forEach(card => {
      content.appendChild(card.cloneNode(true));
    });
  }

  // 初期表示位置を中央に
  function centerInitialCard() {
    const firstTarget = content.querySelector('[data-id="tab1"]');
    if (!firstTarget) return;
    const offset = firstTarget.offsetLeft + firstTarget.offsetWidth / 2 - container.clientWidth / 2;
    container.scrollLeft = offset;
  }
  centerInitialCard();

  // タブクリックで中央にスクロール
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const targetElement = content.querySelector(`[data-id="${targetId}"]`);
      if (targetElement) {
        const offset = targetElement.offsetLeft + targetElement.offsetWidth / 2 - container.clientWidth / 2;
        container.scrollTo({ left: offset, behavior: 'smooth' });
      }
    });
  });

  // 矢印クリックで前後移動
  function centerCard(card) {
    const targetCenter = card.offsetLeft + card.offsetWidth / 2;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const offset = targetCenter - containerCenter;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  }

  function findCenterCard() {
    const cards = content.querySelectorAll('.card, .dummy-card');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });

    return closestCard;
  }

  leftArrow.addEventListener('click', () => {
    const currentCard = findCenterCard();
    let prevCard = currentCard.previousElementSibling || content.lastElementChild;
    centerCard(prevCard);
  });

  rightArrow.addEventListener('click', () => {
    const currentCard = findCenterCard();
    let nextCard = currentCard.nextElementSibling || content.firstElementChild;
    centerCard(nextCard);
  });

  // 🔄 スクロール処理の間引き
  let ticking = false;
  container.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollWidth = content.scrollWidth;
        const containerWidth = container.clientWidth;
        if (container.scrollLeft <= 0) {
          container.scrollLeft = scrollWidth / 2;
        } else if (container.scrollLeft + containerWidth >= scrollWidth) {
          container.scrollLeft = scrollWidth / 2 - containerWidth;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // ⏳ 自動スクロール（必要なら有効化）
  setTimeout(() => {
    const scrollBy = 1365;
    const duration = 2000;
    const start = container.scrollLeft;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollLeft = start + scrollBy * progress;
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }, 100);
});