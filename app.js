const BASE_URL =
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn  = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select"); 
const msg = document.querySelector(".msg");

for (select of dropdowns){
    for (currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from"  && currcode === "USD"){
            newoption.selected = "selected";
        }else if(select.name === "to"  && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change" , (evn) => {
          updateFlag(evn.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async(evn) =>{
    evn.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === ""  || amtval < 0){
         amtval = 1;
         amtval.value = "1";
    }
   const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
   let response = await fetch(url);
   let data = await response.json();
   let rate = data[tocurr.value.toLowerCase()];
   let finalamount = amtval*rate;
   msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value} `
})