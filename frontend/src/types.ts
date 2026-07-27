export interface RawComment {
    id: number
    user: { username: string}
    commentText: string
    createdAt: string
    userId: number
    isDeleted: boolean
    childComments: RawComment[]
}

export interface CommentType {
    id: number
    username: string
    commentText: string
    createdAt: string
    childComments: RawComment[]
    commentUserId: number
    isDeleted: boolean
    userId: number
    postId: number
    onReplyPosted: (parentId: number, reply: any) => void
    setBlogComments: React.Dispatch<React.SetStateAction<RawComment[]>>
}