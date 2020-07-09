
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';



export const ProfilePhoto = ({ src, name }) => {

    const [showUpload, setShowUpload] = React.useState(false)


    return <div

        onMouseEnter={() => setShowUpload(true)}
        onMouseLeave={() => setShowUpload(false)}
        className="w-32 h-32 bg-teal-800 rounded-full mx-auto cursor-pointer" >
        {src && <img className="w-32 h-32 rounded-full" src={src} alt={`${name} photo`} />}

        <div className="relative w-32 h-32 flex">
            <i className="self-center absolute w-full text-center text-gray-100">
                {!src && showUpload && <FontAwesomeIcon icon={faCamera} className="animate fadeIn text-5xl hover:opacity-100  self-center" />}
                {!src && !showUpload && <FontAwesomeIcon icon={faUser} className="animate fadeIn text-5xl  self-center mx-auto" />}

            </i>

        </div>

    </div>
}
