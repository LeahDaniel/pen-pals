import { fetchData } from "./dataAccess.js";
import { PenPalSociety } from "./PenPalSociety.js";

const container = document.querySelector(".container")

const render = () => {
    fetchData().then(
        () => container.innerHTML = PenPalSociety()
    )
}

render()

document.addEventListener("stateChanged", event => {
    console.log("State changed. Re-rendering HTML...")
    render()
})

