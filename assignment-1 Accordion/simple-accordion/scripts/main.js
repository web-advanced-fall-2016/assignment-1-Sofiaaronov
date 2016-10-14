// check if doc is fully loaded. if not wait until, then open
//find accordion from html. when it gets clicked open, if it is open close on click.


// wait until page is loaded
// find all accordions
// find all the items for each accordion
// attached event listener to each item title
// when clicked, if item open, close it
// if closed, open it

x = document.readyState 
console.log(x);

if(document.readyState == "interactive"){

    findAccordions();
}


function findAccordions (){

    let accordions = document.querySelectorAll(".accordion");

    console.log(accordions);


    for (i = 0; i < accordions.length; i++) {
        let items = accordions[i].querySelectorAll(".accordion-item");

        for (i = 0; i < items.length; i++) {
            let title = items[i].querySelector(".item-title");
            console.log(title);
            // attached event listener to each item title
            // when clicked, if item open, close it
            // if closed, open it
            title.addEventListener("click", openClose);


        }
    }
    
}
function openClose(){
    console.log(this.parentNode);
    let content = this.parentNode.querySelector(".item-content");
    console.log(content);
    // when clicked, if item open, close it
    // if closed, open it
   
    if(content.style.display == "block"){

        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
 

}
