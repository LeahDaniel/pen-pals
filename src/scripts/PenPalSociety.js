//Module for rendering main container HTML

import { Form } from "./Form.js"
import { Letters } from "./Letters.js"


export const PenPalSociety = () => {
    return `
        <article class="form">
        ${Form()}
        </article>
        <article class="letterArticle">
            <h2>Letters</h2>
            ${Letters()}
        </article>
    `
}