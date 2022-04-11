let btn = document.querySelector('.Header-switch');

btn.addEventListener('click',()=>{
    let links = document.querySelector('.Header-links');
    
    if(links.className == 'Header-links') {
        links.className += " menuShow";
    }else{
        links.className = 'Header-links';
    }
});