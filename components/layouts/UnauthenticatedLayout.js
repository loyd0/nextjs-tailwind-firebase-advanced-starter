const UnauthenticatedLayout = ({children, className}) => {
    return (
        <main className={`min-h-screen w-full ${className}`}>
            { children }
        </main>
    )
}

UnauthenticatedLayout.propTypes = {

}

export default UnauthenticatedLayout
