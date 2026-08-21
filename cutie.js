/* ==========================================================================
   MY CUTIE PIGGY - DO YOU STILL LOVE ME? GAME ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let noClickCount = 0;

  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const questionText = document.getElementById('questionText');
  const catGif = document.getElementById('catGif');
  const questionCard = document.getElementById('questionCard');
  const videoSectionCard = document.getElementById('videoSectionCard');
  const fullScreenYesOverlay = document.getElementById('fullScreenYesOverlay');
  const fullScreenYesBtn = document.getElementById('fullScreenYesBtn');
  const sendLoveEmailBtn = document.getElementById('sendLoveEmailBtn');
  const videoUploadInput = document.getElementById('videoUploadInput');
  const ourVideoPlayer = document.getElementById('ourVideoPlayer');

  // Cute Trending Cat GIFs for each state
  const gifs = {
    initial: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWtwcGlpeWtlczExdWptbXdkNmVldGNzY3l2a2xsZmxkdGlxZXlyMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9Ibxa0lGSzp0hXM/giphy.gif',
    step1: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZmdWdsa2Q5OWxvd3BxdDRycmpwc2o4NG12amI3b2trNzI3Mjl2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ISOckXUvpEwgE/giphy.gif',
    step2: 'https://media.giphy.com/media/OPU6wzx8JrHna/giphy.gif',
    yesSuccess: 'https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif'
  };

  // Click NO Handler
  noBtn.addEventListener('click', () => {
    noClickCount++;

    if (noClickCount === 1) {
      // 1st NO click
      questionText.innerHTML = "please say yes i know u love me!! 🥺";
      catGif.src = gifs.step1;
      noBtn.style.transform = "scale(0.7)";
      yesBtn.style.transform = "scale(1.45)";
      yesBtn.style.margin = "0 1.5rem";
      showToast("🥺 Please say yes!");
    } else if (noClickCount === 2) {
      // 2nd NO click
      questionText.innerHTML = "Please baby sayyyyyyyyyyy yessssssssss!!!!!! 🥺";
      catGif.src = gifs.step2;
      noBtn.style.transform = "scale(0.35)";
      noBtn.style.opacity = "0.7";
      yesBtn.style.transform = "scale(2.1)";
      yesBtn.style.margin = "0 3rem";
      showToast("🥺 Baby please say yes!");
    } else {
      // 3rd NO click - Fullscreen YES Takeover!
      fullScreenYesOverlay.classList.remove('hidden');
    }
  });

  // YES Click Handler
  function handleYesClick() {
    fullScreenYesOverlay.classList.add('hidden');
    questionCard.classList.add('hidden');
    videoSectionCard.classList.remove('hidden');

    // Fireworks & Sound
    if (window.launchHeartBurst) {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          window.launchHeartBurst(
            Math.random() * window.innerWidth,
            Math.random() * (window.innerHeight * 0.7)
          );
        }, i * 200);
      }
    }
    if (ourVideoPlayer) {
      ourVideoPlayer.play().catch(() => {});
    }
    showToast("🎉 YAYYY! I knew you loved me! 💖");
  }

  yesBtn.addEventListener('click', handleYesClick);
  fullScreenYesBtn.addEventListener('click', handleYesClick);

  // Email Action: "I Love You Too Darling 💖" -> harshithrongala07@gmail.com
  sendLoveEmailBtn.addEventListener('click', () => {
    const recipient = "harshithrongala07@gmail.com";
    const subject = encodeURIComponent("I Love You Too Darling! ❤️");
    const body = encodeURIComponent("I love you so much my darling! You are my whole world! 💖✨");
    
    // Launch Mailto Link
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    showToast("💌 Sent 'I Love You Too Darling!' email to harshithrongala07@gmail.com! ❤️");
  });

  // Video Upload Handler
  if (videoUploadInput && ourVideoPlayer) {
    videoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        ourVideoPlayer.src = url;
        ourVideoPlayer.play();
        showToast("🎥 Our video updated & playing!");
      }
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.innerText = msg;
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 3500);
    }
  }
});
