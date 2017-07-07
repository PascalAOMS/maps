
export default function() {


    let element = document.querySelector(el)

    if ( element ) {

        // max 

        // Height Calctulations
        let elHeight = element.clientHeight,
            elOffset = element.offsetTop,
            elScrollDistance = elHeight + elOffset

        window.addEventListener('scroll', setParallax)
    }


    function setParallax() {

        let wScroll = window.pageYOffset

         function animate() {
             element.style[attr] = Math.ceil(wScroll / speed) + unit
         }

         if (wScroll <= elScrollDistance) {

            window.requestAnimationFrame(animate)

         }

    }


}




// let elHeight = element.clientHeight,
//     elOffset = element.offsetTop,
//     elScrollDistance = elHeight + elOffset
//
// window.addEventListener('scroll', setParallax)
// }
//
//
// function setParallax() {
//
// let wScroll = window.pageYOffset
//
//  function animate() {
//      element.style[attr] = Math.ceil(wScroll / speed) + unit
//  }
//
//  if (wScroll <= elScrollDistance) {
//
//     window.requestAnimationFrame(animate)
//
//  }
//
// }
