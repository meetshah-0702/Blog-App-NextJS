import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'posts');

export function getPostFiles() {
    return fs.readdirSync(postDirectory);
}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension
    const filePath = path.join(postDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const {data, content} = matter(fileContent); // it returns the object with two key-value pairs i.e data key and content key hence we cannot change the name convention here


    const postData = {
        slug: postSlug,
        ...data,
        content: content
    };

    return postData;
}

export function getAllPosts() {
    const postFiles = getPostFiles();

    const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
    });

    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.data ? -1 : 1);

    return sortedPosts;
};

export function getFeaturedPosts() {
    const allPosts = getAllPosts();

    const featuredPosts = allPosts.filter((post) => post.isFeatured);

    return featuredPosts;
}