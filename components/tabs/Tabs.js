import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Transition from 'react-motion-ui-pack'
import  Router  from 'next/router';
import { getHashRoute, createHashPath } from '../../utils/general/router';



const Tabs = ({ tabs }) => {

    const [activeTab, setActiveTab] = React.useState(null)

    // if (!tabs[activeTab]?.component || typeof tabs[activeTab].component !== "function") {
    //     throw Error("Tab components need to be provided as functions to the Tabs component.")
    // }

    React.useEffect(() => {

        const hashRoute = getHashRoute(Router.router)
        if (hashRoute) {
            // find tab if one exists and set as the active tab if it is in routes
            tabs.forEach((tab, index) => 
                createHashPath(tab.name) === hashRoute && setActiveTab(index) )
                // if (typeof activeTab !== "number") {
                //     setActiveTab(0)
                // }
        }

        if (typeof activeTab !== "number") {
            setActiveTab(0)
        }
    }, [])

    const ActiveTab = () => {

        // handles 0 
        if (typeof activeTab !== "number") return <div />
        return tabs[activeTab].component()
    }
    return (
        <div>
            {/* <div className="sm:hidden">
                <select aria-label="Selected tab" className="form-select block w-full">
                    {tabs.map((tab, index) => <option selected={index === activeTab}>{tab.name}</option>)}
                </select>
            </div> */}
            <div className="block">
                <div className="border-b border-gray-200 max-w-screen-sm mx-auto">
                    <nav className="flex -mb-px md:space-x-6 md:px-2 justify-center">
                        {tabs.map((tab, index) => 
                        <TabHeading
                            key={`${tab.name + index}`}
                            {...tab}
                            onClick={() => setActiveTab(index)} 
                            active={index === activeTab}
                        />)}
                    </nav>
                </div>
            </div>
            <div className="py-12">
                <ActiveTab />
            </div>
        </div>
    )
}

const TabHeading = ({ name, icon, active, onClick, }) => {
    return <a href={`${createHashPath(name)}`}
        onClick={() => onClick()}
        className={`group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 focus:outline-none focus:text-teal-700 focus:border-teal-700 ${active ? "text-teal-800 border-teal-700" : "hover:text-teal-700 hover:border-teal-800"}`}>
        <FontAwesomeIcon className={`-ml-0.5 mr-2 h-5 w-5 text-gray-400 group-hover:text-teal-700 ${active ? "text-teal-700" : "group-hover:text-teal-700"}`} icon={icon} />
        <span>{name}</span>
    </a>
}

export default Tabs
