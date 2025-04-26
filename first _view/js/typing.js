const text = "Create with growth. - 成長とともに、つくる。";
const typingElem = document.getElementById("typing");
let i = 0;

function typingEffect() {
  if (i < text.length) {
    typingElem.innerHTML += text.charAt(i);
    i++;
    setTimeout(typingEffect, 80); // 速度調整
  }
}
typingEffect();
