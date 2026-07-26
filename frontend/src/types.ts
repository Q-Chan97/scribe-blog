export interface RawComment {
    id: number
    user: { username: string}
    commentText: string
    createdAt: string
    childComments: RawComment[]
}

export interface CommentType {
    id: number
    username: string
    commentText: string
    createdAt: string
    childComments: RawComment[]
    userId: number
    postId: number
    onReplyPosted: (parentId: number, reply: any) => void
}