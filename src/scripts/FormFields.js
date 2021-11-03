//Module for dynamically rendering each select and radiobutton component

import { getPenPals, getTopics } from "./dataAccess.js"

export const authorSelect = () => {
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
//// export const topicRadioButton = () => {
////     const topics = getTopics()
////     return topics.map((topic) => {
////         return `<li class="topic">
////         <input type="radio" name="topicChoice" value="${topic.id}"/> ${topic.category}
////         </li>`
////     }).join("")
//// }
export const topicCheckboxes = () => {
    const topics = getTopics()
    return topics.map(topic => {
        return `<div class="topic">
        <input type="checkbox" class="topicCheckbox" id="${topic.category}" name="topicCheckbox" value="${topic.id}">
        <label for="${topic.category}">${topic.category}</label>
        </div>`
    }).join("")
}

export const recipientSelect = () => {
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