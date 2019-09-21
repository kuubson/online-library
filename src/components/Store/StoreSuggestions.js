import React, {useEffect} from 'react'

const StoreSuggestions = props => {
    const setProperWidthOfSuggestionsField = () => {
        if(document.getElementsByClassName('inputs__input-button--store') && document.getElementById('bookTitle')){
            let width = document.getElementsByClassName('inputs__input-button--store')[0].clientWidth + document.getElementById('bookTitle').clientWidth
            document.getElementsByClassName('store__suggestions')[0].style.width = `${width + 0.75}px`
        }
    }
    useEffect(() => {
        setProperWidthOfSuggestionsField()
        window.addEventListener('resize', () => {
            setProperWidthOfSuggestionsField()
        })
    }, [])
    return (
        <div className="store__suggestions">
            {props.suggestions.length > 0 &&
                props.suggestions.map(suggestion => {
                    console.log(suggestion)
                    return (
                        <p key={suggestion._id} className="store__suggestion" onClick={e => {
                            props.setBookTitle(suggestion.title)
                            props.setSuggestions([])
                            props.findBook(e, suggestion.title)
                        }}>"{suggestion.title}" written by {suggestion.author}</p>
                    )
                })
            }
        </div>
    )
}

export default StoreSuggestions