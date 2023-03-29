import React from 'react'

interface Props {
    messages: string[]
}

const MultiErrorWrapper: React.FC<Props> = (props) => {
    if (props.messages && props.messages.length > 1) {
        return (
            <ul>
                {props.messages.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
        )
    } 

    return <p>{props.messages[0]}</p>
}
export default MultiErrorWrapper