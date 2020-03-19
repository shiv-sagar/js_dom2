//selection

var userinput = document.querySelectorAll(".userinput");
var alert = document.querySelectorAll(".alert");
var btn = document.querySelector(".submit");
let form = document.querySelector(".formDiv");

//add event
//after subscribing click event on sign up button validate() function is callled

btn.addEventListener("click", validate);
btn.addEventListener("click",removeForm);

//manipulation
let arr = ["Name", "Email", "Password" ]
function validate() {
    

    for (let i = 0; i < userinput.length; i++) {
        if (userinput[i].value == ""){
          alert[i].textContent = `'${arr[i]} can't be empty!'`;           
          
        }
    }

}
 
function removeForm() {
  let flag = 1;
  for (let i = 0; i< userinput.length; i++) {
    if (userinput[i].value === "") {
      flag = 0;
      break;
    }
  }
  if(flag) {
    form.remove();
    // console.log(userinput);
     
     for (let i = 0; i < userinput.length; i++) {
      console.log(userinput[i]);
     let output = document.createElement("div");
     output.classList.add("output");
     output.innerHTML = (`${userinput[i].name} is "${userinput[i].value}".`);
    //  alert(display);
    document.body.append(output);
    
     } 
  }
  

    
    

  
}
