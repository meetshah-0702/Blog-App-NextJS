import FeaturedPosts from "@/components/home-page/featured-posts";
import IndexPage from "@/components/home-page/home-page";
import { getFeaturedPosts } from "@/lib/post-util";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Home</title>
                <meta name="description" content="I post about programming and web development."/>
            </Head>
            <IndexPage />
            <FeaturedPosts posts = {props.posts} />
        </Fragment>
    )
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        },
        revalidate: 60
    }
}

export default HomePage;