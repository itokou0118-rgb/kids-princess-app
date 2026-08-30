(function () {
  const portraitEl = document.getElementById("portrait");
  const questionText = document.getElementById("questionText");
  const repeatBtn = document.getElementById("repeatBtn");
  const micBtn = document.getElementById("micBtn");
  const listeningStatus = document.getElementById("listeningStatus");
  const resultEl = document.getElementById("result");
  const scoreCountEl = document.getElementById("scoreCount");
  const choicesToggle = document.getElementById("choicesToggle");
  const choicesEl = document.getElementById("choices");
  const confettiEl = document.getElementById("confetti");

  let current = null;
  let recent = [];
  let score = 0;
  let awaitingAnswer = true;
  let currentToken = 0;

  const PHOTO_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

  function loadImageIfExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  async function findPhotoFor(id) {
    for (const ext of PHOTO_EXTENSIONS) {
      const url = await loadImageIfExists(`images/${id}.${ext}`);
      if (url) return url;
    }
    return null;
  }

  async function applyPhotoIfAvailable(princess, token) {
    const photoUrl = await findPhotoFor(princess.id);
    if (token !== currentToken) return; // 別の問題にすでに進んでいたら何もしない
    if (photoUrl) {
      portraitEl.innerHTML = `<img src="${photoUrl}" alt="${princess.name}">`;
    }
  }

  const SpeechRecognitionCtor =
    window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let recognition = null;
  if (SpeechRecognitionCtor) {
    recognition = new SpeechRecognitionCtor();
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.continuous = false;
  }

  function pickPrincess() {
    let pool = PRINCESSES.filter((p) => !recent.includes(p.id));
    if (pool.length === 0) pool = PRINCESSES;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    recent.push(chosen.id);
    if (recent.length > 4) recent.shift();
    return chosen;
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.95;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  }

  function newQuestion() {
    current = pickPrincess();
    const token = ++currentToken;
    awaitingAnswer = true;
    resultEl.hidden = true;
    resultEl.className = "result";
    choicesEl.hidden = true;
    choicesEl.innerHTML = "";
    portraitEl.innerHTML = renderPortraitSVG(current);
    questionText.textContent = "この人は　だれでしょう？";
    speak("この人は　だれでしょう？");
    applyPhotoIfAvailable(current, token);
  }

  function launchConfetti() {
    const emojis = ["🎉", "✨", "🌟", "💖", "👑"];
    confettiEl.innerHTML = "";
    confettiEl.hidden = false;
    for (let i = 0; i < 24; i++) {
      const span = document.createElement("span");
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.left = Math.random() * 100 + "%";
      span.style.animationDelay = Math.random() * 0.4 + "s";
      confettiEl.appendChild(span);
    }
    setTimeout(() => { confettiEl.hidden = true; }, 2000);
  }

  function showResult(isCorrect) {
    awaitingAnswer = false;
    resultEl.hidden = false;
    if (isCorrect) {
      score++;
      scoreCountEl.textContent = String(score);
      resultEl.classList.add("correct");
      resultEl.textContent = "せいかい！すごいね！🎉";
      speak("せいかい！　すごいね！");
      launchConfetti();
    } else {
      resultEl.classList.add("wrong");
      resultEl.textContent = `ざんねん！　正解は「${current.name}」でした`;
      speak(`ざんねん。せいかいは、${current.name}　でした`);
    }
    setTimeout(newQuestion, 2800);
  }

  function handleSpokenText(alternatives) {
    const matched = alternatives.some((text) => isMatch(current, text));
    showResult(matched);
  }

  function setListening(isListening) {
    micBtn.classList.toggle("listening", isListening);
    listeningStatus.hidden = !isListening;
    micBtn.querySelector(".mic-label").textContent = isListening
      ? "きいているよ…"
      : "タップして　こたえてね";
  }

  micBtn.addEventListener("click", () => {
    if (!awaitingAnswer) return;
    if (!recognition) {
      alert(
        "このブラウザは音声にんしきに対応していません。下の「ボタンでこたえる」を使ってね。"
      );
      choicesEl.hidden = false;
      renderChoices();
      return;
    }
    try {
      recognition.start();
    } catch (e) {
      // 既に開始している場合など
    }
  });

  if (recognition) {
    recognition.addEventListener("start", () => setListening(true));
    recognition.addEventListener("end", () => setListening(false));
    recognition.addEventListener("error", () => setListening(false));
    recognition.addEventListener("result", (event) => {
      const alternatives = Array.from(event.results[0]).map((r) => r.transcript);
      handleSpokenText(alternatives);
    });
  }

  repeatBtn.addEventListener("click", () => {
    speak("この人は　だれでしょう？");
  });

  choicesToggle.addEventListener("click", () => {
    choicesEl.hidden = !choicesEl.hidden;
    if (!choicesEl.hidden) renderChoices();
  });

  function renderChoices() {
    choicesEl.innerHTML = "";
    let wrongPool = PRINCESSES.filter((p) => p.id !== current.id);
    wrongPool = wrongPool.sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [current, ...wrongPool].sort(() => Math.random() - 0.5);
    options.forEach((p) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = p.name;
      btn.addEventListener("click", () => {
        if (!awaitingAnswer) return;
        showResult(p.id === current.id);
      });
      choicesEl.appendChild(btn);
    });
  }

  newQuestion();
})();
