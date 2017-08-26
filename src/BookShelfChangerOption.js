import React, { Component } from 'react'
import PropTypes from 'prop-types';

class BookShelfChangerOption extends Component {

    static propTypes = {
        optionValue: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        selectedValue: PropTypes.string.isRequired
    }

    render() {
        const { optionValue, selectedValue, text } = this.props

        return (
            selectedValue !== optionValue ? <option value={optionValue}>{text}</option>
                : <option value={optionValue} disabled>✔ {text}</option>
        )
    }

}

export default BookShelfChangerOption