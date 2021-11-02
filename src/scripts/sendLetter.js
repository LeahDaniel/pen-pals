//module for rendering the button and the button clickevent

document.addEventListener("click", click => {
    if (click.target.id === "sendButton"){
        //post the created letter object (below) to API
        postLetter(createLetterObject())
    }
})

const createLetterObject = () => {
    //capture current value of all input fields
    const authorInput = document.querySelector("#author").value
    const recipientInput = document.querySelector("#recipient").value
    const topicInput = document.querySelector("input[name='topicChoice']").value
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