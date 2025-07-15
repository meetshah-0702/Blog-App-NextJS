import Image from "next/image";
import classes from './home-page.module.css';

function IndexPage() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/Meet_1.jpg" alt="My Image" width={300} height={300}/>
            </div>
            <h1>Hello, I am Meet Shah.</h1>
            <p>I make blogs on the topics Web Development!!</p>
        </section>
    )
}

export default IndexPage;