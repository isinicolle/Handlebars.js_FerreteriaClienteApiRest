let imagenes = document.querySelectorAll('.gallery__img');
let modal = document.querySelector('#modal');
let boton = document.querySelector('#modal__btn');
let img = document.querySelector('#modal__img')

for(let i = 0 ; i < imagenes.length ; i++){
    imagenes[i].addEventListener('click',function(e){
        modal.classList.toggle("modal__open");
        let src = e.target.src;
        img.setAttribute("src",src);
    });
}
boton.addEventListener('click',function(){
    modal.classList.toggle('modal__open');
});