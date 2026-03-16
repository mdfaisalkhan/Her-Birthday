// NO button escape
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const container = document.querySelector(".btn-container");

// NO button swap
noBtn.addEventListener("click", () => {

    yesBtn.classList.add("swap");
    noBtn.classList.add("swap");

    setTimeout(() => {

        if(noBtn.nextElementSibling === yesBtn){
            container.insertBefore(yesBtn, noBtn);
        }else{
            container.insertBefore(noBtn, yesBtn);
        }

        yesBtn.classList.remove("swap");
        noBtn.classList.remove("swap");

    },200);

});


// 🎵 Play music on first click
document.addEventListener("click", function () {
    const music = document.getElementById("bg-music");
    if(music){
        music.play();
    }
}, { once: true });


// 🎉 Background Particle Rain

const canvas = document.getElementById("birthdayCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(){
        this.reset();
    }

    reset(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = Math.random() * 6 + 4;
        this.height = Math.random() * 15 + 10;
        this.speedY = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.3) * 1;
        this.color = `hsl(${Math.random()*360},100%,60%)`;
        this.rotate = Math.random() * 360;
    }

    update(){
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotate += 5;

        if(this.y > canvas.height){
            this.reset();
            this.y = -20;
        }
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate * Math.PI/180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();
    }
}

function initParticles(){
    particles = [];
    for(let i=0;i<100;i++){
        particles.push(new Particle());
    }
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// 💖 Typewriter Effect

const text = "Happy Birthday Nausin ❤️";
const typeTarget = document.getElementById("typeText");

let index = 0;

function typeWriter(){
    if(index < text.length){
        typeTarget.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter,100);
    }
}

typeWriter();


// Scroll to gallery
document.getElementById("scrollBtn").addEventListener("click",()=>{
    document.getElementById("gallery").scrollIntoView({
        behavior:"smooth"
    });
});


// Gallery animation
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{threshold:0.2});

cards.forEach(card=>{
    observer.observe(card);
});


// 🎆 Crackers Explosion on YES click

const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

yesBtn.addEventListener("click",()=>{

    let explosion = [];

    for(let i=0;i<120;i++){
        explosion.push({
            x:window.innerWidth/2,
            y:window.innerHeight/2,
            size:Math.random()*6+2,
            speedX:(Math.random()-0.5)*12,
            speedY:(Math.random()-0.5)*12,
            life:80,
            color:`hsl(${Math.random()*360},100%,60%)`
        });
    }

    function explode(){

        confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

        explosion.forEach(p=>{

            confettiCtx.fillStyle = p.color;
            confettiCtx.beginPath();
            confettiCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
            confettiCtx.fill();

            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;
        });

        explosion = explosion.filter(p=>p.life>0);

        if(explosion.length>0){
            requestAnimationFrame(explode);
        }

    }

    explode();

    setTimeout(()=>{
        document.getElementById("popup").style.display="flex";
    },1500);

});
const bgMusic = document.getElementById("bg-music");
const videos = document.querySelectorAll(".memoryVideo");

videos.forEach(video => {

    // video play -> bg music pause
    video.addEventListener("play", () => {
        bgMusic.pause();
    });

    // video stop/close -> bg music resume
    video.addEventListener("pause", () => {
        bgMusic.play();
    });

    video.addEventListener("ended", () => {
        bgMusic.play();
    });

});

// ❌ Close Popup

function closePopup(){

    document.getElementById("popup").style.display="none";

    // clear crackers
    const confettiCanvas = document.getElementById("confettiCanvas");
    const confettiCtx = confettiCanvas.getContext("2d");

    confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

}

const centerX = confettiCanvas.width / 2;
const centerY = confettiCanvas.height / 2;

for(let i=0;i<120;i++){
    explosion.push({
        x:centerX,
        y:centerY,
        size:Math.random()*6+2,
        speedX:(Math.random()-0.5)*12,
        speedY:(Math.random()-0.5)*12,
        life:80,
        color:`hsl(${Math.random()*360},100%,60%)`
    });
}

window.addEventListener("load", () => {
    const music = document.getElementById("bg-music");

    const playMusic = () => {
        music.play().catch(() => {});
        document.removeEventListener("click", playMusic);
    };

    playMusic(); // try autoplay
    document.addEventListener("click", playMusic); // fallback
});

window.addEventListener("resize",()=>{
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});