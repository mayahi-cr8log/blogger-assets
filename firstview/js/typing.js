const text = "Create with growth. - 成長とともに、つくる。";
const typingElem = document.getElementById("typing");
let i = 0;

function typingEffect() {
  if (i < text.length) {
    typingElem.innerHTML += text.charAt(i);
    i++;
    setTimeout(typingEffect, 80); // 速度調整
  }else {
    // タイピングが終わったらファーストビューをフェードアウト
    firstView.style.transition = "opacity 1s";
    firstView.style.opacity = "0";
    setTimeout(() => {
      firstView.style.display = "none"; // 完全に非表示にするなら
    }, 1000); // フェードアウト後に消す
  }
}
typingEffect();
