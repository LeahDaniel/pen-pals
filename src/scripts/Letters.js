//Module for rendering HTML for letters

import { getLetters, getTopics, getPenPals } from "./dataAccess.js"

//uses .find to get correct topics/authors/recipients and return letter html string
const letterData = (letter) => {
    const topics = getTopics()
    const penPals = getPenPals()

    const foundTopic = topics.find(topic => topic.id === letter.topicId)
    const foundAuthor = penPals.find(author => author.id === letter.authorId)
    const foundRecipient = penPals.find(recipient => recipient.id === letter.recipientId)

    if(!foundTopic || !foundAuthor || !foundRecipient){
        return ""
    } else {
    return `
        <p>Dear ${foundRecipient.name} (${foundRecipient.email}),<p>

        <p>${letter.textBody}<p>

        <p>Sincerely, ${foundAuthor.name} (${foundAuthor.email})</p>

        <p class="letter__dateTag">Sent on ${letter.dateSent}</p>

        <div class="letter__topicTag">${foundTopic.category}</div>
        `
    }
}

//uses .map to iterate letters for the letterData function and render letter container
export const Letters = () => {
    const letters = getLetters()
    return `
    <section class="letter">
        ${letters.map(letterData).join("")}
    </section>`
}