//Module for rendering main container HTML

import { Form } from "./Form.js"
import { Letters } from "./Letters.js"


export const PenPalSociety = () => {
    return `
        <article class="form">
        ${Form()}
        </article>
        <article class="letters">
            <h3>Letters</h3>
            ${Letters()}
        </article>
    `
}