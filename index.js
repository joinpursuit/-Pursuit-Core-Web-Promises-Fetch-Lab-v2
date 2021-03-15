//A list of ten jokes that are randomly loaded when the page is refreshed, each with the `"card"` class
const ul = document.querySelector("ul");
const button = document.querySelector("#reload");
const getJokes = () => {
  fetch("https://official-joke-api.appspot.com/random_ten")
    .then((res) => {
      if (!res.ok) {
        throw Error("error!");
      }
      return res.json();
    })
    .then((res) => {
      ul.innerText = "";
      res.forEach((joke) => {

        const li = document.createElement("li");
        li.classList.add("card");
        li.textContent = joke.setup;
        ul.appendChild(li);

        const p = document.createElement("p");
        p.setAttribute("style", "display: block");
        p.textContent = joke.punchline;
        li.appendChild(p)
       
      });
    });
  };
  ul.addEventListener("click", (event) => {
  const pTag = event.target.childNodes[1].style.display;
  event.target.childNodes[1].style.display = pTag === "block" ? "none" : "block";
  
});
//A button with id `"reload"` that clears all the jokes on the screen and loads new random ones
button.addEventListener("click", getJokes) 
getJokes();