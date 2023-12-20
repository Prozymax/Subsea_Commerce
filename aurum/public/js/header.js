const selectNavigation = document.getElementsByClassName('__category')[0]
const sectionBtn = document.getElementsByClassName('sec-btn');
const navigationItem = document.getElementsByClassName('navItem')[0]
const navigationCategories = document.querySelectorAll('.nav_Category');

// selectNavigation.addEventListener('mouseover', (e) => {
//     navigationItem.classList = 'hove'
//     navigationItem.addEventListener('mouseleave', () => navItem.classList.remove('hove'))
// })

    document.getElementsByClassName('sub-btn')[0].disabled = true;

if(window.innerWidth <= 950) {
    const mobileNavBurger = document.getElementsByClassName('nav')[0],
    navList = document.getElementsByClassName('nav-list')[0],
    navListItem = document.querySelectorAll('#nav-list-item'),
    addOn = document.getElementsByClassName('addon-list')[0];

    mobileNavBurger.addEventListener('click', () => {
        navList.style.display = 'block';
        navList.style.animationDelay = '.05s';
        navList.style.animationName = 'enter'
     for(let i = 0; i < navListItem.length; i++) {
         navListItem[i].style.animationName = 'enter';
     }
    })
    const exitFunction = () => {
        navList.style.animationDelay = '.5s';
         navList.style.animationName = 'exit';
         addOn.style.animationName = 'exit2'
         for(let i = 0; i < navListItem.length; i++) {
          navListItem[i].style.animationName = 'exit';
      }

      setTimeout(() => {
         navList.style.display = 'none';
      }, 1500)
    }


    navList.addEventListener('click', (event) => { 
        event.stopPropagation() 
        })
    document.addEventListener('click', () => { 
        exitFunction() 
    })

    // navListItem[1].addEventListener('click', () => {
    //  addOn.style.animationName = 'enter2';
    // })
 }