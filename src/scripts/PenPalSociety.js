//render HTML for 

import { Form } from "./Form.js"


export const PenPalSociety = () => {
    return `
        <article class="form">
        ${Form()}
        </article>
        <article class="letters">
            <h3>Letters</h3>
        </article>
    `
}