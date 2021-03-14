

document.addEventListener("DOMContentLoaded", () => {
const reloadButton = document.querySelector("#reloadBtn")



    const jokesList = document.querySelector("ul")
   // jokesList.removeChild("li")
    let jokeObj = {}


fetch("https://official-joke-api.appspot.com/random_ten")
.then(response => {return response.json()}).then(body => {
    const jokes = body
    
    for (let joke of jokes) {
      const setup = joke.setup;
      const punchline = joke.punchline;
      jokeObj[setup] = punchline;

      jokeCard = document.createElement("li");
      jokeCard.textContent = setup;
      jokeCard.className = "card";
      jokesList.appendChild(jokeCard);

      jokeCard.addEventListener("click", reveal())

  
    }
   
})

      
function reveal () {
    secondLine = document.createElement("p")
    secondLine.textContent = punchline
    secondLine.className = "card-text-hide"
    jokeCard.appendChild(secondLine)
}










})





