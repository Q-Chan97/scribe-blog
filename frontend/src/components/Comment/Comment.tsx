export default function Comment({text, posted, replies}) {
    return (
        <div>
            <p>{text}</p>
            <p>{posted}</p>
            {replies && 
                replies.map((reply) => (
                    <Comment text={reply.commentText} posted={reply.createdAt} replies={reply.childComments} />
                ))
            }
        </div>
    )
}