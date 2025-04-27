const text = "Create with growth. - 成長とともに、つくる。";
const typingElem = document.getElementById("typing");
const firstView = document.querySelector(".first-view"); 
let i = 0;

function typingEffect() {
  if (i < text.length) {
    typingElem.innerHTML += text.charAt(i);
    i++;
    setTimeout(typingEffect, 80); // 速度調整
  } else {
    // タイピングが終わったら消す
    fadeOut(firstView);
  }
}

function fadeOut(element) {
  element.style.transform = "scale(1.1)"; // ← ちょっと拡大
  element.style.opacity = "0";             // ← 透明にする

  element.addEventListener('transitionend', () => {
    element.style.display = "none"; // ← 完全に消す
  }, { once: true });
}

typingEffect();
