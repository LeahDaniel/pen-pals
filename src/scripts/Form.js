//Module for rendering form HTML

import {postLetter } from "./dataAccess.js"
import { authorSelect, recipientSelect, topicRadioButton } from "./FormFields.js"

//event listener for button click
document.addEventListener("click", click => {
    if (click.target.id === "sendButton"){
        //post the created letter object (below) to API
        console.log("Button clicked")
        postLetter(createLetterObject())
    }
})

//captures user input and creates new letter object
const createLetterObject = () => {
    //capture current value of all input fields
    const authorInput = document.querySelector("#author").value
    const recipientInput = document.querySelector("#recipient").value
    const topicInput = document.querySelector("input[name='topicChoice']:checked").value
    const textInput = document.querySelector("input[name='letterBody']").value
    const dateInput = new Date()

    //add the captured values to key-value pairs in an object
    const letterObj = {
        authorId: parseInt(authorInput),
        recipientId: parseInt(recipientInput),
        topicId: parseInt(topicInput),
        textBody: textInput,
        dateSent: dateInput.toLocaleDateString()
    }

    return letterObj
}

//renders form HTML using interpolated formFields functions
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


