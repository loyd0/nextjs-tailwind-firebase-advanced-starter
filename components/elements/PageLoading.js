import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import UnauthenticatedLayout from '../layouts/UnauthenticatedLayout';


const PageLoading = props => {
    return (
        <UnauthenticatedLayout>
            <div className="fixed min-h-screen w-screen bg-white flex">
                <FontAwesomeIcon className="self-center mx-auto text-3xl text-indigo-500" icon={faSpinner} spin />
            </div>
        </UnauthenticatedLayout>
    )
}

PageLoading.propTypes = {

}

export default PageLoading
