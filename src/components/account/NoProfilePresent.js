import React from "react";

const NoProfilePresent = ({inputText}) => {
    var text = inputText ? inputText : 'No User Signed In'
    return (
        <div>
            {text}
        </div>
    )
}

export default NoProfilePresent;