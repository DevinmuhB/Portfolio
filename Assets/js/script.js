// Typing Animation
const texts = ["Web Developer","Frontend Enthusiast","Backend Learner", "Prompt Engineering", "API Consumption", "Relational Database", "Data Retrieval & Query Optimization", "UI/UX", "NLP Concepts", "Asynchronous Programming"];
let count=0,index=0,currentText="",letter="";
(function type(){
  if(count===texts.length){count=0;}
  currentText=texts[count];
  letter=currentText.slice(0,++index);
  document.querySelector(".typing").textContent=letter;
  if(letter.length===currentText.length){count++;index=0;setTimeout(type,1500);}
  else{setTimeout(type,150);}
})();

// Navbar scroll effect
window.addEventListener("scroll",()=>{
  const navbar=document.querySelector(".navbar");
  navbar.classList.toggle("scrolled",window.scrollY>50);
});

// Mobile menu toggle
document.querySelector(".menu-toggle").addEventListener("click",()=>{
  document.querySelector(".nav-links").classList.toggle("active");
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior:"smooth"
    });
  });
});

// Reveal on scroll
function revealOnScroll(){
  const reveals=document.querySelectorAll(".reveal");
  reveals.forEach(reveal=>{
    const windowHeight=window.innerHeight;
    const elementTop=reveal.getBoundingClientRect().top;
    const elementVisible=150;
    if(elementTop<windowHeight-elementVisible){
      reveal.classList.add("active");
    }else{
      reveal.classList.remove("active");
    }
  });
}
window.addEventListener("scroll",revealOnScroll);
revealOnScroll();

// Portfolio filter
const filterBtns = document.querySelectorAll(".filter-btns .btn");
const cards = document.querySelectorAll(".portfolio-container .card");

function filterPortfolio(filter){
  cards.forEach(card=>{
    if(filter === "project" && card.classList.contains("project")){
      card.style.display = "block";
    } 
    else if(filter !== "project" && card.classList.contains(filter)){
      card.style.display = "block";
    } 
    else {
      card.style.display = "none";
    }
  });
}

// Event click untuk filter
filterBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const filter = btn.getAttribute("data-filter");
    filterPortfolio(filter);
  });
});

// Default tampilkan hanya Projects saat load
window.addEventListener("DOMContentLoaded",()=>{
  filterPortfolio("project");
});

// Contact button ripple effect
document.querySelectorAll(".contact-buttons .btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      let ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);
  
      let x = e.clientX - this.offsetLeft;
      let y = e.clientY - this.offsetTop;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
  
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
// === Portfolio & Certificate Modal ===
const modal = document.getElementById("portfolioModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const closeBtn = document.querySelector(".modal .close");

// Buka modal saat card project/certificate diklik
document.querySelectorAll(".card.project, .card.certificates").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = card.getAttribute("data-img");      // Thumbnail
    modalTitle.textContent = card.getAttribute("data-title");
    modalDesc.textContent = card.getAttribute("data-desc");

    // Set link ke file GDrive
    const link = card.getAttribute("data-link");
    if (link) {
      modalLink.href = link;
      modalLink.style.display = "inline-block";
      modalLink.textContent = card.classList.contains("project") ? "View Project" : "View Certificate";
    } else {
      modalLink.style.display = "none";
    }
  });
});

modalLink.addEventListener("click", (e)=>{
    e.preventDefault();
    const url = modalLink.href;
    window.open(url,"_blank");
  });  

// Tutup modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Tutup modal kalau klik di luar konten
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});