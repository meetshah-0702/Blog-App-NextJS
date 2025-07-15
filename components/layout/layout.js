const { Fragment } = require("react");
const { default: MainNavigation } = require("./main-navigation");

function Layout(props) {
    return (
        <Fragment>
            <MainNavigation />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout;