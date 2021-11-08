//Module for rendering HTML for letters

import { getLetters, getLetterTopics, getTopics, getPenPals } from "./dataAccess.js"


//uses .find to get correct topics/authors/recipients and return letter html string
const letterData = (letter) => {
    const topics = getTopics()
    const penPals = getPenPals()
    const letterTopics = getLetterTopics()

    //find topic categories, author, and recipient for appropriate letter
    const foundAuthor = penPals.find(author => author.id === letter.authorId)
    const foundRecipient = penPals.find(recipient => recipient.id === letter.recipientId)
    const foundTopics = () => {
        let foundTopicsArr = []
        //iterate through letterTopics to find all of the applicable objects using letterId
        for (const letterTopic of letterTopics) {
            if (letterTopic.letterId === letter.id) {
                //find the topic objects that match those letterTopic.topicIds
                const foundTopic = topics.find(topic => letterTopic.topicId === topic.id)
                //push those found topic names to an array
                if (foundTopic) {
                    foundTopicsArr.push(foundTopic.category)
                }
            }
        }
        return foundTopicsArr
    }

    //if any finds are falsy, return an empty string. else, return html for the letter
    if (!foundAuthor || !foundRecipient || foundTopics().length === 0) {
        return ""
    } else {
        return `
        <section class="letter">
        <p>Dear ${foundRecipient.name} (${foundRecipient.email}),<p>

        <p>${letter.textBody}<p>

        <p>Sincerely, ${foundAuthor.name} (${foundAuthor.email})</p>

        <p class="letter__dateTag">Sent on ${letter.dateSent}</p>
        
        <div class="letter__topicTags">
            ${  //map the array of topic categories to return each one within its own div/box
                foundTopics().map(topic => `<div class="letter__topic">${topic}</div>`).join("")
            }
        </div > 
        </section>`
    }
}

//uses .map to iterate letters for the letterData function and render letter container
export const Letters = () => {
    const letters = getLetters()
    return `
    <section class="letters">
        ${letters.map(letterData).join("")}
    </section > `
}