/* ==========================================================================
   ROMANTIC GIRLFRIEND BIRTHDAY - INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // State Management
  const appState = {
    recipientName: 'Vyshu',
    milestone: 'My Cutie piggy 🐷💖',
    senderName: 'Your Prince',
    surpriseMessage: 'From the moment you entered my life, everything became brighter, sweeter, and infinitely more meaningful. Happy Birthday my princess!',
    theme: 'romantic',
    candlesLit: true,
    envelopeOpen: false
  };

  // Heart Fireworks & Falling Rose Petal Physics Canvas
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class HeartParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.random() * 8 + 4;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = (Math.random() - 0.5) * 8 - 2;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.01;
      this.gravity = 0.08;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.decay;
    }

    draw() {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.font = `${this.size * 2}px sans-serif`;
      ctx.fillText('❤️', this.x, this.y);
      ctx.restore();
    }
  }

  window.launchHeartBurst = function(x, y) {
    if (!ctx) return;
    const colors = ['#ff4d6d', '#ff7597', '#e11d48', '#ffd700', '#ffffff'];
    for (let i = 0; i < 40; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new HeartParticle(x, y, color));
    }
  };

  function animateParticles() {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Floating Hearts
  const heartContainer = document.getElementById('heartParticleContainer');
  const heartEmojis = ['💖', '❤️', '🌹', '💕', '✨', '💋'];

  function createFloatingHeart() {
    if (!heartContainer) return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 92 + 4 + '%';
    heart.style.fontSize = Math.random() * 1.2 + 1.2 + 'rem';
    heart.style.animationDuration = Math.random() * 5 + 7 + 's';

    heart.addEventListener('click', (e) => {
      window.launchHeartBurst(e.clientX, e.clientY);
      heart.remove();
    });

    heartContainer.appendChild(heart);
    setTimeout(() => {
      if (heart.parentNode) heart.remove();
    }, 12000);
  }

  if (heartContainer) {
    setInterval(createFloatingHeart, 1800);
    for (let i = 0; i < 6; i++) createFloatingHeart();
  }

  // Envelope Unfolding & Resealing Logic
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const waxSeal = document.getElementById('waxSeal');
  const closeLetterBtn = document.getElementById('closeLetterBtn');

  function toggleEnvelope(e) {
    if (e) e.stopPropagation();
    if (!appState.envelopeOpen) {
      appState.envelopeOpen = true;
      if (envelopeWrapper) envelopeWrapper.classList.add('open');
      window.launchHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
      showToast('💌 Private love letter opened!');
    } else {
      appState.envelopeOpen = false;
      if (envelopeWrapper) envelopeWrapper.classList.remove('open');
      showToast('💌 Private love letter resealed!');
    }
  }

  if (envelopeWrapper) envelopeWrapper.addEventListener('click', toggleEnvelope);
  if (waxSeal) waxSeal.addEventListener('click', toggleEnvelope);
  if (closeLetterBtn) closeLetterBtn.addEventListener('click', toggleEnvelope);

  // "Reasons I Love You" Flip Card Handler
  const reasonCards = document.querySelectorAll('.reason-card');
  reasonCards.forEach(card => {
    card.addEventListener('click', (e) => {
      card.classList.toggle('flipped');
      window.launchHeartBurst(e.clientX, e.clientY);
    });
  });

  // Candle Blowing Logic
  const candles = document.querySelectorAll('.candle');
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const relightCandlesBtn = document.getElementById('relightCandlesBtn');

  function blowOutCandles() {
    if (!appState.candlesLit) return;
    appState.candlesLit = false;

    candles.forEach(candle => candle.setAttribute('data-lit', 'false'));

    window.launchHeartBurst(window.innerWidth / 2, window.innerHeight / 2 - 100);
    setTimeout(() => window.launchHeartBurst(window.innerWidth / 4, window.innerHeight / 3), 300);
    setTimeout(() => window.launchHeartBurst((3 * window.innerWidth) / 4, window.innerHeight / 3), 600);

    if (blowCandlesBtn) blowCandlesBtn.classList.add('hidden');
    if (relightCandlesBtn) relightCandlesBtn.classList.remove('hidden');
    showToast('✨ Birthday wishes blow into the sky! I love you! ❤️');
  }

  function relightCandles() {
    appState.candlesLit = true;
    candles.forEach(candle => candle.setAttribute('data-lit', 'true'));
    if (blowCandlesBtn) blowCandlesBtn.classList.remove('hidden');
    if (relightCandlesBtn) relightCandlesBtn.classList.add('hidden');
  }

  if (blowCandlesBtn) blowCandlesBtn.addEventListener('click', blowOutCandles);
  if (relightCandlesBtn) relightCandlesBtn.addEventListener('click', relightCandles);
  candles.forEach(candle => candle.addEventListener('click', blowOutCandles));

  // Gift Box Unboxing & Surprise Video Handler
  const giftBox = document.getElementById('giftBox');
  const surpriseCard = document.getElementById('surpriseCard');
  const surpriseVideoPlayer = document.getElementById('surpriseVideoPlayer');
  const surpriseVideoUploadInput = document.getElementById('surpriseVideoUploadInput');

  if (giftBox && surpriseCard) {
    giftBox.addEventListener('click', () => {
      if (!giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');
        window.launchHeartBurst(giftBox.getBoundingClientRect().left + 80, giftBox.getBoundingClientRect().top);
        setTimeout(() => {
          surpriseCard.classList.remove('hidden');
          if (surpriseVideoPlayer) {
            surpriseVideoPlayer.play().catch(() => {});
          }
          showToast('🎥 Special surprise video unlocked!');
        }, 500);
      }
    });
  }

  if (surpriseVideoUploadInput && surpriseVideoPlayer) {
    surpriseVideoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        surpriseVideoPlayer.src = url;
        surpriseVideoPlayer.play();
        showToast("🎥 Surprise video updated & playing!");
      }
    });
  }

  // Photo Upload Handler
  const photoUploadInput = document.getElementById('photoUploadInput');
  let activeTargetSlot = null;

  window.triggerSlotUpload = function(slotNum) {
    activeTargetSlot = slotNum;
    if (photoUploadInput) photoUploadInput.click();
  };

  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      Array.from(files).forEach((file, idx) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const slotToUse = activeTargetSlot ? activeTargetSlot : (idx % 4 + 1);
          const imgEl = document.getElementById(`imgSlot${slotToUse}`);
          const holderEl = document.getElementById(`imgSlot${slotToUse}Holder`);

          if (imgEl) {
            imgEl.src = event.target.result;
            imgEl.classList.remove('hidden');
          }
          if (holderEl) holderEl.classList.add('hidden');
          showToast(`Romantic Photo updated in Frame #${slotToUse}! 📷❤️`);
        };
        reader.readAsDataURL(file);
      });
      activeTargetSlot = null;
    });
  }

  const polaroidGrid = document.getElementById('polaroidGrid');
  if (polaroidGrid) {
    polaroidGrid.addEventListener('dragover', (e) => e.preventDefault());
    polaroidGrid.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && photoUploadInput) {
        photoUploadInput.files = e.dataTransfer.files;
        photoUploadInput.dispatchEvent(new Event('change'));
      }
    });
  }

  // Card Download
  const downloadCardBtn = document.getElementById('downloadCardBtn');
  const downloadableCard = document.getElementById('downloadableCard');

  if (downloadCardBtn && downloadableCard) {
    downloadCardBtn.addEventListener('click', () => {
      showToast('Rendering romantic greeting card... 💖');
      if (window.html2canvas) {
        html2canvas(downloadableCard, {
          scale: 2,
          backgroundColor: null,
          useCORS: true
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = `Happy_Birthday_My_Love_${appState.recipientName}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          showToast('Romantic Card Downloaded! 🖼️');
        });
      }
    });
  }

  // Personalization Modal
  const openPersonalizeModal = document.getElementById('openPersonalizeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const personalizeModal = document.getElementById('personalizeModal');
  const savePersonalizationBtn = document.getElementById('savePersonalizationBtn');
  const inputRecipientName = document.getElementById('inputRecipientName');
  const inputMilestone = document.getElementById('inputMilestone');
  const inputSenderName = document.getElementById('inputSenderName');
  const inputSurpriseMessage = document.getElementById('inputSurpriseMessage');
  const shareUrlOutput = document.getElementById('shareUrlOutput');
  const copyShareUrlBtn = document.getElementById('copyShareUrlBtn');
  const shareLinkBtn = document.getElementById('shareLinkBtn');
  const themeChips = document.querySelectorAll('.theme-chip');

  if (openPersonalizeModal && personalizeModal) {
    openPersonalizeModal.addEventListener('click', () => personalizeModal.classList.remove('hidden'));
  }
  if (closeModalBtn && personalizeModal) {
    closeModalBtn.addEventListener('click', () => personalizeModal.classList.add('hidden'));
  }
  if (shareLinkBtn && personalizeModal && shareUrlOutput) {
    shareLinkBtn.addEventListener('click', () => {
      personalizeModal.classList.remove('hidden');
      shareUrlOutput.select();
    });
  }

  themeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      themeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      setTheme(chip.dataset.themeVal);
    });
  });

  function setTheme(themeName) {
    appState.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
  }

  function updateDOMFromState() {
    const recipientNameDisplay = document.getElementById('recipientNameDisplay');
    const cardNamePreview = document.getElementById('cardNamePreview');
    const footerName = document.getElementById('footerName');
    const milestoneText = document.getElementById('milestoneText');
    const senderNameDisplay = document.getElementById('senderNameDisplay');
    const senderNameDisplay2 = document.getElementById('senderNameDisplay2');
    const cardSenderPreview = document.getElementById('cardSenderPreview');
    const loveLetterBody = document.getElementById('loveLetterBody');

    if (recipientNameDisplay) recipientNameDisplay.innerText = appState.recipientName;
    if (cardNamePreview) cardNamePreview.innerText = appState.recipientName;
    if (footerName) footerName.innerText = appState.recipientName;
    document.querySelectorAll('.letter-name').forEach(el => el.innerText = appState.recipientName);
    if (milestoneText) milestoneText.innerText = appState.milestone;
    if (senderNameDisplay) senderNameDisplay.innerText = appState.senderName;
    if (senderNameDisplay2) senderNameDisplay2.innerText = appState.senderName;
    if (cardSenderPreview) cardSenderPreview.innerText = `— Forever Yours, ${appState.senderName}`;
    if (loveLetterBody) loveLetterBody.innerHTML = appState.surpriseMessage.replace(/\n/g, '<br>');

    if (shareUrlOutput) {
      const url = new URL(window.location.href);
      url.searchParams.set('name', appState.recipientName);
      url.searchParams.set('from', appState.senderName);
      url.searchParams.set('msg', appState.surpriseMessage);
      url.searchParams.set('theme', appState.theme);
      shareUrlOutput.value = url.toString();
    }
  }

  if (savePersonalizationBtn) {
    savePersonalizationBtn.addEventListener('click', () => {
      if (inputRecipientName) appState.recipientName = inputRecipientName.value.trim() || 'Vyshu';
      if (inputSenderName) appState.senderName = inputSenderName.value.trim() || 'Your Prince';
      if (inputSurpriseMessage) appState.surpriseMessage = inputSurpriseMessage.value.trim() || 'I love you!';

      updateDOMFromState();
      if (personalizeModal) personalizeModal.classList.add('hidden');
      showToast('✨ Romantic customization saved!');
    });
  }

  if (copyShareUrlBtn && shareUrlOutput) {
    copyShareUrlBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrlOutput.value);
      showToast('Link copied to clipboard! Share it with your princess 💌');
    });
  }

  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('name')) appState.recipientName = params.get('name');
    if (params.has('from')) appState.senderName = params.get('from');
    if (params.has('msg')) appState.surpriseMessage = params.get('msg');
    if (params.has('theme')) {
      appState.theme = params.get('theme');
      setTheme(appState.theme);
    }
    
    if (inputRecipientName) inputRecipientName.value = appState.recipientName;
    if (inputSenderName) inputSenderName.value = appState.senderName;
    if (inputSurpriseMessage) inputSurpriseMessage.value = appState.surpriseMessage;
    
    updateDOMFromState();
  }
  parseUrlParams();

  // Toast Helper
  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.innerText = msg;
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 3200);
    }
  }
});
