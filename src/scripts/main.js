import { fetchLetters, fetchLetterTopics, fetchPenPals, fetchTopics } from "./dataAccess.js";
import { PenPalSociety } from "./PenPalSociety.js";

const container = document.querySelector(".container")

const render = () => {
    fetchTopics()
        .then(() => fetchPenPals())
        .then(() => fetchLetters())
        .then(() => fetchLetterTopics())
        .then(
            () => container.innerHTML = PenPalSociety()
        )
}

render()

container.addEventListener("stateChanged", event => {
    console.log("State changed. Re-rendering HTML...")
    render()
})

