export type PostTypes={

    id:string,
    userId:string,
    date:Date,
    content:string,
    image?:string,
    likes_count:number,
    comments:string[],
    comments_count:string,
    share_count:number,
    labels:string[]

}