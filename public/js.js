window.addEventListener('resize',function(){
let vh = window.innerHeight * 0.01;
console.log(vh);
document.documentElement.style.setProperty("--vh", `${vh}px`);
console.log(--vh);
});