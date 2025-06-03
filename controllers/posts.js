


// Import the Post model
const posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post' },
    { id: 3, title: 'Third Post', content: 'This is the content of the third post' }
];
// exports.getposts = (req, res) => {
//     res.json(posts);

// }

export const getposts = (req, res) => {
    res.json(posts);

}

// exports.getpostinfo = (req, res) => {
//     const postId = parseInt(req.params.id);
//     const post = posts.find(p => p.id === postId);

//     if (!post) {
//         return res.status(404).send('Post not found');
//     }

//     res.json(post);
// }

export const  getpostinfo = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.json(post);
}