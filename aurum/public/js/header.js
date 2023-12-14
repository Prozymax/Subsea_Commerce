document.addEventListener('DOMContentLoaded', () => {
    if(window.innerWidth <= 950) {
        const mobileNavBurger = document.getElementsByClassName('nav')[0],
        navList = document.getElementsByClassName('nav-list')[0],
        navListItem = document.querySelectorAll('#nav-list-item'),
        addOn = document.getElementsByClassName('addon-list')[0];
    
        mobileNavBurger.addEventListener('click', (event) => {
         event.stopPropagation()
         navList.style.animationDelay = '.05s';
         navList.style.animationName = 'enter'
         for(let i = 0; i < navListItem.length; i++) {
             navListItem[i].style.animationName = 'enter';
         }
        })
    
        navList.addEventListener('click', (event) => {
         event.stopPropagation()
        })
        document.addEventListener('click', () => {
         navList.style.animationDelay = '.5s';
         navList.style.animationName = 'exit';
         addOn.style.animationName = 'exit2'
         for(let i = 0; i < navListItem.length; i++) {
          navListItem[i].style.animationName = 'exit';
      }
        })
    
    
        navListItem[1].addEventListener('click', () => {
         addOn.style.animationName = 'enter2';
        })
     }
})