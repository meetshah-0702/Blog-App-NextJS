import PostContent from "@/components/posts/post-details/post-content";
import { getPostData, getPostFiles } from "@/lib/post-util";
import Head from "next/head";
import { Fragment } from "react";

function PostDetailPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt}/>
            </Head>
            <PostContent post={props.post}/>
        </Fragment>
    )
}

export function getStaticProps(context) {
    const {params} = context;
    const {slug} = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate: 60
    };
}

export function getStaticPaths() {
    const postFilenames = getPostFiles();

    const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

    return {
        paths: slugs.map((slug) => (
            {
                params: {
                    slug: slug
                }
            }
        )),
        fallback: false
    };
}

export default PostDetailPage;