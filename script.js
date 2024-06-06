const BASE_URl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown= document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".converter");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const message=document.querySelector(".message");



// for (code in countryList) {
//     console.log(code);
// }


for (let select of dropdown) {
    for (currCode in countryList){
       let newOption= document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        };
        if(select.name==="to" && currCode==="NPR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }


select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});

const updateFlag =(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
}


};



btn.addEventListener("click", async (evt) => {
  
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1 || isNaN(amtVal)) {
        amtVal = "";
        alert("Cheating katra hein tu");
    }
    
    const URL=`${BASE_URl}/${fromCurr.value.toLowerCase()}.json`;
    let response =await fetch(URL);
   
    let data = await response.json();
   console.log(data)
   let conversionRate = data[fromCurr.value.toLowerCase()] && data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let convertedAmount=parseFloat(amtVal)*conversionRate;
   message.innerText=`${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
});
