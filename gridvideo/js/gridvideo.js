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
