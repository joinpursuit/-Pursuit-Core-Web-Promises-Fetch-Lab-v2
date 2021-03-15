document.addEventListener('DOMContentLoaded', () => {

    const button = document.querySelector("#reload")
    const ul = document.querySelector(".cards")

    getJokes()

    function getJokes() {
        const ul = document.querySelector(".cards")
        fetch("https://official-joke-api.appspot.com/random_ten").then(response => {
            return response.json()
        }).then(body => {
            console.log(body)
            for (i = 0; i < 10; i++) {
                let div = document.createElement("div")
                div.classList.add('card')
                div.setAttribute("type", "button")
                ul.appendChild(div)
                let setUpPara = document.createElement('p')
                setUpPara.classList.add('setUp')
                setUpPara.innerHTML = body[i].setup
                div.appendChild(setUpPara)
                let punchLinePara = document.createElement('p')
                punchLinePara.classList.add('punchLine')
                punchLinePara.innerHTML = body[i].punchline
                div.appendChild(punchLinePara)

                 //create a button out of div
                 div.addEventListener('click', (event) => {

                    if (punchLinePara.style.visibility === "visible"){
                        punchLinePara.style.visibility = "hidden"
                    }else{
                        punchLinePara.style.visibility = "visible"
                    }
                })
            }
            // const div2 = document.querySelector("div")
            // const punchP = document.querySelector('.punchLine')
            // div2.addEventListener('click', () => {
            // console.log(punchP)
            //     })


        })

    }

    button.addEventListener('click', (event) => {
        ul.innerHTML = ''
        getJokes()
    })

})