window.addEventListener("scroll", () => {
    let scrollIndex = window.scrollY;
    windowHeight = document.body.scrollHeight - window.innerHeight;
    let percent = (scrollIndex / windowHeight) * 100;
    document.querySelector('#scrollBar').style.width = percent + "%";
})