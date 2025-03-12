let highestZ = 1;
let movedCount = 0;
const totalPapers = document.querySelectorAll('.paper').length;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.moved = false;

    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      if (!this.holdingPaper) return;
      
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    });

    this.paper.addEventListener("mousedown", (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      this.paper.style.zIndex = highestZ++;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      if (this.holdingPaper && !this.moved) {
        this.moved = true;
        movedCount++;
        checkAllMoved();
      }
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));

function checkAllMoved() {
  if (movedCount === totalPapers) {
    showBirthdayAnimation();
  }
}

function showBirthdayAnimation() {
  const message = document.createElement("div");
  message.classList.add("happy-birthday");
  message.innerText = "🎉 Happy Birthday! 🎂";
  document.body.appendChild(message);

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.animationDelay = `${Math.random()}s`;
    document.body.appendChild(confetti);
  }
}
