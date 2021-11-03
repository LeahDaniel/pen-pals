const database = {
    penPals: [],
    topics: [],
    letters: []
}

const API = "http://localhost:8088"
const container = document.querySelector(".container")

//copies of state
export const getPenPals = () => {
    return database.penPals.map(penPal => ({...penPal}))
}
export const getTopics = () => {
    return database.topics.map(topic => ({...topic}))
}
export const getLetters = () => {
    return database.letters.map(letter => ({...letter}))
}

//fetch all API data
export const fetchData = () => {
    fetch(`${API}/penPals`)
        .then(response => response.json())
        .then(penPalAPI => database.penPals = penPalAPI)
    fetch(`${API}/topics`)
        .then(response => response.json())
        .then(topicAPI => database.topics = topicAPI)
    return fetch(`${API}/letters`)
        .then(response => response.json())
        .then(letterAPI => database.letters = letterAPI)
}

//add a letter object to the letters API using POST, then use custom event to 
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
        .then(() => {
            container.dispatchEvent(new CustomEvent("stateChanged"))
        })
}