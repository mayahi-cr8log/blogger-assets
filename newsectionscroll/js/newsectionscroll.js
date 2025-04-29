const container = document.querySelector('.scroll-container');
const content = document.querySelector('.scroll-content');

// ===== クローンをいっぱい作って無限に見せる =====
function createClones() {
    const originals = [...content.children];
    const cloneCount = 4; // 4回分増やす（必要ならここ調整）
    for (let i = 0; i < cloneCount; i++) {
        originals.forEach(card => {
            const clone = card.cloneNode(true);
            content.appendChild(clone);
        });
    }
}

createClones();

// ===== 初期位置を中央に =====
function centerInitialCard() {
    const firstTarget = document.getElementById('create');
    const containerRect = container.getBoundingClientRect();
    const targetRect = firstTarget.getBoundingClientRect();
    const offset = (targetRect.left - containerRect.left) - (container.clientWidth / 2) + (firstTarget.offsetWidth / 2);
    container.scrollLeft += offset;
}

window.addEventListener('load', centerInitialCard);

// ===== タブクリックで対象を中央に =====
const buttons = document.querySelectorAll('.tabs button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        const targetElement = container.querySelector(`#${targetId}`);
        if (targetElement) {
            const containerRect = container.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            const offset = (targetRect.left - containerRect.left) - (container.clientWidth / 2) + (targetElement.offsetWidth / 2);
            container.scrollBy({ left: offset, behavior: 'smooth' });
        }
    });
});

// ===== 矢印クリックで前後カードに移動 =====
function centerCard(card) {
    const targetCenter = card.offsetLeft + card.offsetWidth / 2;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const offset = targetCenter - containerCenter;
    container.scrollBy({ left: offset, behavior: 'smooth' });
}

function findCenterCard() {
    const cards = container.querySelectorAll('.card, .dummy-card');
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

document.getElementById('arrow-left').addEventListener('click', () => {
    const currentCard = findCenterCard();
    let prevCard = currentCard.previousElementSibling;
    if (!prevCard) prevCard = content.lastElementChild;
    centerCard(prevCard);
});

document.getElementById('arrow-right').addEventListener('click', () => {
    const currentCard = findCenterCard();
    let nextCard = currentCard.nextElementSibling;
    if (!nextCard) nextCard = content.firstElementChild;
    centerCard(nextCard);
});

// ===== 左端・右端の巻き戻し =====
container.addEventListener('scroll', () => {
    const scrollWidth = content.scrollWidth;
    const containerWidth = container.clientWidth;

    if (container.scrollLeft <= 0) {
        // 左端まで行ったら末尾の方へジャンプ
        container.scrollLeft = scrollWidth / 2;
    } else if (container.scrollLeft + containerWidth >= scrollWidth) {
        // 右端まで行ったら先頭にジャンプ
        container.scrollLeft = scrollWidth / 2 - containerWidth;
    }
});

function slowScrollBy(distance, duration) {
    const start = container.scrollLeft;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        container.scrollLeft = start + distance * progress;

        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);
}

// 使い方
window.addEventListener('load', () => {
    centerInitialCard(); // 中央寄せ
    setTimeout(() => {
        slowScrollBy(1365, 2000); // ← 2秒かけて1365pxスクロール
    }, 100); // 100ミリ秒待ってからスタート
});