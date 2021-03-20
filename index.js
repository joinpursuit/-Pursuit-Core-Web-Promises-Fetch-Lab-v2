// const { default: axios } = require("axios");

const reload = document.querySelector("#reload");
let sectionJoke = document.querySelector(".joke-section");

const loadJokes = async () => {
  try {
    sectionJoke.innerHTML = "";

    const res = await axios.get(
      "https://official-joke-api.appspot.com/random_ten"
    );

    res.data.forEach((joke) => {
      const div = document.createElement("div");
      div.classList.add("card");

      const jokeP = document.createElement("p");
      const punchlineP = document.createElement("p");

      sectionJoke.appendChild(div);
      div.appendChild(jokeP);
      div.appendChild(punchlineP);
      jokeP.innerText = `${joke.setup}`;
      punchlineP.innerText = "";

      div.addEventListener("click", (e) => {
        if (punchlineP.innerText === "") {
          jokeP.innerText = `${joke.setup}`;
          punchlineP.innerText = `${joke.punchline}`;
        } else {
          jokeP.innerText = `${joke.setup}`;
          punchlineP.innerText = "";
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
loadJokes();
reload.addEventListener("click", (e) => {
  loadJokes();
});
