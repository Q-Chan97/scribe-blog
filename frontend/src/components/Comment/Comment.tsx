
interface Comment {
    id: number
    user: { username: string }
    commentText: string
    createdAt: Date
    childComments: Comment[]
}

export default function Comment({id, username, text, posted, replies}) {
    return (
        <div>
            <p>{username}</p>
            <p>{text}</p>
            <p>{posted}</p>
            {replies && 
                replies.map((reply: Comment) => (
                    <Comment key={reply.id} id={reply.id} username={reply.user.username} text={reply.commentText} posted={reply.createdAt} replies={reply.childComments} />
                ))
            }
        </div>
    )
}