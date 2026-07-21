import Comment from "../Comment/Comment.tsx"

interface BlogProps {
    blog?: any;
}

export default function Blog({ blog }: BlogProps) {
    if (!blog) return null;

    return (
        <section>
            <div>
                { blog?.title }
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog?.text || "" }} />
            {blog?.replies && 
                blog.blogComments.map((comment) => (
                    <Comment text={comment.commentText} posted={comment.createdAt} replies={comment.childComments}/>
                ))}
        </section>
    )
}