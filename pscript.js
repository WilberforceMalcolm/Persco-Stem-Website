
let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
headerLogo = document.querySelector(".logo img");



 setTimeout(function() {
    document.querySelector('.buttonWaitlist').style.opacity = '1';
}, 2000);

setTimeout(function() {
    document.querySelector('.buttonWaitlist a').style.backgroundColor = '#000000';
    document.querySelector('.buttonWaitlist a').style.color = '#fff';
}, 3000);



let active = 0;
let lengthItems = items.length;

next.onclick = function(){
    if(active + 1 > lengthItems) {
        active = 0;
    }else{
        active = active + 1;
    }
    reloadSlider();
}


prev.onclick = function(){
    if(active - 1 < 0) {
        active = lengthItems;
    }else{
        active = active - 1;
    }
    reloadSlider();
}

let refreshSlider = setInterval(() => {next.click()}, 3000); 

function reloadSlider(){
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector(".slider .dots li.active");
    lastActiveDot.classList.remove("active");
    dots[active].classList.add("active");
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => {next.click()}, 3000); 
}

dots.forEach((li, Key) => {
    li.addEventListener("click", function(){
        active = Key;
        reloadSlider();
    });
});
















