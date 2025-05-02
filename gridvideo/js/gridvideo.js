const applyTransforms = () => {
  const container = document.querySelector(".video-grid-container");
  const gridRect = container.getBoundingClientRect();

  const gridCenterX = gridRect.width / 2;
  const gridCenterY = gridRect.height / 2;

  document.querySelectorAll(".cell").forEach((cell) => {
    const video = cell.querySelector("video");
    if (!video) return;

    // セルの中心：（offsetLeft/Topを使う方法が安定します）
    const cellCenterX = cell.offsetLeft + cell.offsetWidth  / 2;
    const cellCenterY = cell.offsetTop  + cell.offsetHeight / 2;

    // 基本のオフセット補正値
    const offsetX = gridCenterX - cellCenterX - 50;
    const offsetY = gridCenterY - cellCenterY - 200;

    // 中央列セルだけ拡大率を変更
    let scale = 3;
    if (
      cell.classList.contains("position-top") ||
      cell.classList.contains("position-center") ||
      cell.classList.contains("position-bottom")
    ) {
      scale = 3;
    }

    // ベースの transform を CSS カスタムプロパティで保存
    video.style.setProperty('--base-transform', `translate(${offsetX}px, ${offsetY}px) scale(${scale})`);
    video.style.transform = `var(--base-transform)`;
  });
};

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(applyTransforms);
});
window.addEventListener("resize", applyTransforms);

// 無限スクロールに入れた時の指定--------------------------------------
function isVideoVisibleInScrollContainer(video, container) {
  const videoRect = video.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const centerX = videoRect.left + videoRect.width / 2;
  const centerY = videoRect.top + videoRect.height / 2;

  return (
    centerX >= containerRect.left &&
    centerX <= containerRect.right &&
    centerY >= containerRect.top &&
    centerY <= containerRect.bottom
  );
}

function checkAllScrollContainers() {
  document.querySelectorAll('.scroll-container').forEach(container => {
    container.querySelectorAll('.cell video').forEach(video => {
      if (video.hasAttribute('muted') && video.hasAttribute('loop')) {
        if (isVideoVisibleInScrollContainer(video, container)) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  });
}

// 各種イベントでチェック
window.addEventListener('scroll', checkAllScrollContainers);
window.addEventListener('resize', checkAllScrollContainers);
document.querySelectorAll('.scroll-container').forEach(container => {
  container.addEventListener('scroll', checkAllScrollContainers);
});
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkAllScrollContainers, 500);
});

