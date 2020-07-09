import SideBar from '../nav/SideBar'
import { useAppStore } from '../../providers/AppStore'
import Router from 'next/router';
import PageLoading from '../elements/PageLoading';
import { useAuth } from '../../utils/auth/use-auth';
import NavLinks from '../nav/NavLinks';
import LeftMenu from '../nav/LeftMenu';

const AuthenticatedLayout = ({children, fullWidth=false, leftMenu=false}) => {

    const { settings: { fullMenu }, updateSettings, user } = useAppStore()
    const { signOut } = useAuth()

    console.log(user)

    // // Handle no user and render Page Spinner
    // if (!user && typeof window !== "undefined") {
    //     Router.push("/")
    //     return <PageLoading />
    // }

    const menuWidth = fullMenu ? "w-64" : "w-20"
    const menuPadding = fullMenu ? "ml-64" : "ml-20"
    return (
        <main className="">
            <SideBar
                signOut={signOut}
                // user={user}
                navLinks={NavLinks}
                setFullMenu={updateSettings}
                fullMenu={fullMenu}
                className={`bg-teal-800 duration-300 ${menuWidth}`} />
            <div className={`${menuPadding} transition-spacing duration-300 bg-gray-100` }>
                <section 
                    className={` min-h-screen mx-auto
                ${fullWidth ? "" : "max-w-screen-lg pt-6 pb-16  xl:px-4 lg:px-12 md:px-8 px-4"} `} >
                {children}
                </section>
            </div>

           { leftMenu && <LeftMenu links={leftMenu} />}
        </main>
    )
}

AuthenticatedLayout.propTypes = {

}

export default AuthenticatedLayout
