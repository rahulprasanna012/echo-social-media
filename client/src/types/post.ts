export type Comment = {
  _id: string;
  user: Author;
  text: string;
  createdAt: string;
};

export type PostTypes = {
  _id: string;
  author: Author;
  content?: string;
  image?: string;
  label?: string[];
  likes?: string[];          
  comments?: Comment[];
  createdAt: string;        

  likes_count?: number;
  comments_count?: number;
  shareCount?: number;
};
export type FeedReactionProps = {
  icon: React.ReactElement;
  content: number | string;
  onClick?: () => void;      
  active?: boolean;          
  title?: string;            
  disabled?: boolean;        
};

export type FeedProfileProps = {
  author: Author;
  date: string | Date;      
};

export type FeedCommentsProps = {
  profile:string,
  username:string,           
  date: string | Date;       
  content: number;           
  commentsList: Comment[];   
};

export type MainLayoutProps = { 
  main: React.ReactElement;
};


export type PostFormTypes={

    file:File|null,
    content:string,
    label:string

}


export type Author = { _id: string; username: string; email: string;profile:string };
