document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const modal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const heartsBg = document.getElementById('hearts-bg');

    // "No" Button Interaction (Transform to "Hell Yes")
    const transformNoButton = () => {
        noBtn.innerText = "no shit! hell yessss";
        noBtn.style.backgroundColor = "#2ed573"; // Turn green like the Yes button
        noBtn.style.boxShadow = "0 5px 15px rgba(46, 213, 115, 0.4)";
    };

    noBtn.addEventListener('mouseover', transformNoButton);

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        transformNoButton();
        // Trigger the success modal as if they clicked Yes
        modal.classList.add('visible');
        createConfetti();
    });

    // "Yes" Button Interaction
    yesBtn.addEventListener('click', () => {
        modal.classList.add('visible');
        createConfetti();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('visible');
    });

    // Floating Hearts Background Generator
    function createHearts() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';

        // Randomize position and size
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';

        // Randomize animation duration
        const duration = Math.random() * 5 + 5;
        heart.style.animationDuration = duration + 's';

        heartsBg.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Create hearts periodically
    setInterval(createHearts, 500);

    // Confetti effect for "Yes"
    function createConfetti() {
        // Simple confetti burst using the hearts generator but faster
        for (let i = 0; i < 30; i++) {
            setTimeout(createHearts, i * 50);
        }
    }

    // Auto-play music logic
    const music = document.getElementById('bg-music');

    const playMusic = () => {
        music.play()
            .then(() => {
                console.log("Music started!");
                // Remove listeners after success
                document.removeEventListener('click', playMusic);
                document.removeEventListener('mousemove', playMusic);
                document.removeEventListener('touchstart', playMusic);
                document.removeEventListener('scroll', playMusic);
            })
            .catch(error => {
                console.log("Autoplay prevented:", error);
            });
    };

    // Try to play immediately
    playMusic();

    // Fallback: Play on first interaction if blocked
    document.addEventListener('click', playMusic);
    document.addEventListener('mousemove', playMusic);
    document.addEventListener('touchstart', playMusic);
    document.addEventListener('scroll', playMusic);
});
