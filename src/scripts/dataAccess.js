import { getCheckedIds } from "./Form.js"

const database = {
    penPals: [],
    topics: [],
    letters: [],
    letterTopics: [],
}

const API = "http://localhost:8088"
const container = document.querySelector(".container")

//copies of state
export const getPenPals = () => {
    return database.penPals.map(penPal => ({ ...penPal }))
}
export const getTopics = () => {
    return database.topics.map(topic => ({ ...topic }))
}
export const getLetters = () => {
    return database.letters.map(letter => ({ ...letter }))
}
export const getLetterTopics = () => {
    return database.letterTopics.map(letterTopic => ({ ...letterTopic }))
}

//fetch all API data
export const fetchLetters = () => {
    return fetch(`${API}/letters`)
        .then(response => response.json())
        .then(letterAPI => database.letters = letterAPI)
}

export const fetchPenPals = () => {
    return fetch(`${API}/penPals`)
        .then(response => response.json())
        .then(penPalAPI => database.penPals = penPalAPI)
}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
        .then(response => response.json())
        .then(topicAPI => database.topics = topicAPI)
}

export const fetchLetterTopics= () => {
    return fetch(`${API}/letterTopics`)
        .then(response => response.json())
        .then(letterTopicAPI => database.letterTopics = letterTopicAPI)
}
//add a letter object to the letters and letterTopics API using POST, then use custom event to 
//fetch data again and re-render HTML
export const postLetter = (letterObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(letterObj)
    }

    return fetch(`${API}/letters`, fetchOptions)
        .then(response => response.json())
        .then(newLetterObj => {
            if (getCheckedIds()) {
                //iterate through the array of chosen topic IDs and for each, create a new letterTopics object 
                getCheckedIds().map((checkedTopicId) => {
                    const newLetterObject = {
                        letterId: newLetterObj.id,
                        topicId: checkedTopicId
                    }

                    //use postLetterObject on each new created object
                    postLetterTopic(newLetterObject)
                })
            }
        })
        .then(() => {
            container.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const postLetterTopic = (letterTopicObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(letterTopicObj)
    }

    return fetch(`${API}/letterTopics`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            container.dispatchEvent(new CustomEvent("stateChanged"))
        })
}