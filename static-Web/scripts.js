let startPosition = window.scrollY
window.onscroll = function(){
    let moved = window.scrollY
    if(moved >= startPosition){
        this.document.getElementById('header').style.top = '-100px';
    } else {
        this.document.getElementById('header').style.top = '0px';
    }
    startPosition = moved
}