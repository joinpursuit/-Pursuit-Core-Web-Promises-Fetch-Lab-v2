// Use the [Official Joke API](https://github.com/15Dkatz/official_joke_api) and `fetch` to build the site described below:

// - A list of ten jokes that are randomly loaded when the page is refreshed, each with the `"card"` class
// - Clicking on a joke card should expand it and reveal the punchline
// - Clicking on it again should contract it and hide the punchline
// - A button with id `"reload"` that clears all the jokes on the screen and loads new random ones

// ![Recording of refreshing and then clicking some jokes tiles](https://user-images.githubusercontent.com/3335181/108989743-ef167b80-7663-11eb-8ee8-a1e4d34cc960.gif)

// ## 2. Bonus

// - Have a select at the top for either `general`, `random`, or `programming` and only load jokes of that type
// - Keep track of all of the jokes the user has seen so far, and don't show them the same joke twice when they click a button for new jokes

// ## Submission Guidelines

// - When finished, commit and push your work.
// - Make a pull request on github.
// - Submit the link to your pull request on Canvas.

const fetchJokes = () => {
  fetch(`https://official-joke-api.appspot.com/random_ten`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong, status " + res.status);
      }
      return res.json();
    })
    .then((res) => {
      let allJokes = document.querySelector("#all-jokes");
      allJokes.innerHTML = "";
      res.forEach((joke) => {
        const oneJokeDiv = document.createElement("div");
        let punchP = document.createElement("p");
        punchP.textContent = joke.punchline;
        oneJokeDiv.classList.add("card");
        oneJokeDiv.textContent = joke.setup + "\n" + "\n";
        oneJokeDiv.appendChild(punchP);
        //punchP.style.visibility = "hidden";

        allJokes.appendChild(oneJokeDiv);

        oneJokeDiv.addEventListener("click", (event) => {
            if(punchP.style.visibility === 'hidden'){
                punchP.style.visibility = "visible";
                oneJokeDiv.style.height = "120px";
            }else {
                punchP.style.visibility = "hidden";
                oneJokeDiv.style.height = "100px";
            }
        });
      });
    });
};

document.addEventListener("DOMContentLoaded", (event) => {
  fetchJokes();
});

let reloadButton = document.getElementById("reload");
reloadButton.addEventListener("click", (event) => {
  fetchJokes();
});
