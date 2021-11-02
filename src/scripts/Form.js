//Module for rendering HTML for form

import { getPenPals, getTopics } from "./dataAccess.js"

//functions for each select and radiobutton component

const authorSelect = () => {
    const penPals = getPenPals()
    return `
    <select id="author">
        <option value="0">Choose author...</option>
        ${penPals.map(
            (author) => {
            return `<option value="${author.id}">${author.name}</option>`
        }
        ).join("")
        }
    </select>
`
}
const topicRadioButton = () => {
    const topics = getTopics()
    return topics.map((topic) => {
        return `<li class="topic">
        <input type="radio" name="topicChoice" value="${topic.id}"/> ${topic.category}
        </li>`
    }).join("")
}
const recipientSelect = () => {
    const penPals = getPenPals()
    return `
    <select id="recipient">
        <option value="0">Choose recipient...</option>
        ${penPals.map((recipient) => {
                return `<option value="${recipient.id}">${recipient.name}</option>`
            }).join("")
        }
    </select>
    `
}

//render form HTML using interpolated functions

export const Form = () => {

    return `
        <div class="field">
            <label class="label" for="authorSelect">Author</label>
            ${authorSelect()}
        </div>
        <div class="field">
            <label class="label" for="letterBody">Letter</label>
            <input type="textarea" name="letterBody" class="input" />
        </div>
        <div class="field">
            <label class="label" for="topicRadioButton">Topic</label>
            <ul>${topicRadioButton()}</ul>
        </div>
        <div class="field">
            <label class="label" for="recipientSelect">Recipient</label>
            ${recipientSelect()}
        </div>
    
        <button id="sendButton">Send Letter</button>
        `

}


