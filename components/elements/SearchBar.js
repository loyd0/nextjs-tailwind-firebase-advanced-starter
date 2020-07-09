import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({placeholder}) => {
    return (
        <div className="my-8">
            <input className="w-full py-4 rounded-lg pl-3" placeholder={placeholder}/>
        </div>
    )
}

SearchBar.propTypes = {

}

export default SearchBar
