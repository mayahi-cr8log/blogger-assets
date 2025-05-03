const text = "伝えたいことは、なんですか？  
What is it you wish to say?  

届けたい人は、誰ですか？  
And who is it for?  

技術があれば、できることがある。  
Skills can build.  

想いがあれば、伝わることがある。  
Emotions can reach.  

成長 × 技術 × 想い  
Growth × Skills × Heart  

表現に、あたたかさを。  
Let your expression carry warmth.";
const typingElem = document.getElementById("typing");
const firstView = document.querySelector(".first-view");
let i = 0;

function typingEffect() {
  if (i < text.length) {
    typingElem.innerHTML += text.charAt(i);

    // キラキラエフェクト！！
    typingElem.classList.add('sparkle');
    setTimeout(() => {
      typingElem.classList.remove('sparkle');
    }, 300); // 0.3秒後にキラキラを消す

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
