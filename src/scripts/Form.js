//Module for rendering form HTML

import {getLetters, postLetter, postLetterTopic} from "./dataAccess.js"
import { authorSelect, recipientSelect, topicCheckboxes } from "./FormFields.js"

//event listener for button click
document.addEventListener("click", click => {
    if (click.target.id === "sendButton"){
        //post the created letter object (below) to API
        console.log("Button clicked")
        postLetter(createLetterObject())
        createAndPostLetterTopicObject()
    }
})

//captures user input and creates new letter object
const createLetterObject = () => {
    //capture current value of all input fields
    const authorInput = document.querySelector("#author").value
    const recipientInput = document.querySelector("#recipient").value
    const textInput = document.querySelector("#letterBody").value
    const dateInput = new Date()
    //// const topicInput = document.querySelector("input[name='topicChoice']:checked").value

    //add the captured values to key-value pairs in an object
    const letterObj = {
        authorId: parseInt(authorInput),
        recipientId: parseInt(recipientInput),
        textBody: textInput,
        dateSent: dateInput.toLocaleDateString()
    }

    return letterObj
}
//captures user input and creates new letterTopic object, then posts to API
const createAndPostLetterTopicObject = () => {
    const letters = getLetters()
    //capture the values of each topic selected and push to an array
    const getCheckedBoxes = () => {
        const checkboxes = document.getElementsByName("topicCheckbox")
        let checkedArray = []

        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
            checkedArray.push(parseInt(checkbox.value))
            }
        }
        if (checkedArray.length > 0) {
            return checkedArray
        }
    }
    const checkedArray = getCheckedBoxes()

    //iterate through the array and for each, create a new letterTopics object 
    checkedArray.map((checkedTopicId) => {
        //!add a letterId based on the last id of the letters array- is there a better way to do this?
        let newLetterId = 1
        if(letters.length > 0) {
            newLetterId = letters[letters.length -1].id + 1
        }
        const newLetterObject = {
            letterId: newLetterId,
            topicId: checkedTopicId
        }

        //use postLetterObject on each new created object
        postLetterTopic(newLetterObject)
    })
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
            <textarea type="textarea" id="letterBody" class="input" rows="10"></textarea>
        </div>
        <div class="field">
            <label class="label" for="topicCheckboxes">Topics</label>
            <div class="topicCheckboxes">${topicCheckboxes()}</div>
        </div>
        <div class="field">
            <label class="label" for="recipientSelect">Recipient</label>
            ${recipientSelect()}
        </div>
    
        <button id="sendButton">Send Letter</button>
        `

}


