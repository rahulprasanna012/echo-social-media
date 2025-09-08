export type PostTypes={

    id:string,
    userId:string,
    date:Date,
    content:string,
    image?:string,
    likes_count:number,
    comments:string[],
    comments_count:number,
    share_count:number,
    labels:string[]

}

export type FeedReactionProps={
    icon:React.ReactElement,
    content:number
}

export type FeedProfileProps = {
  userId: string
  date?: Date|undefined
}

export type FeedCommentsProps =  FeedProfileProps&{
    content:number
    commentsList:string[]
    
}

export type MainLayoutProps = { 
  main: React.ReactElement;
};