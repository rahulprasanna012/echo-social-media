import type { PostTypes } from "@/types/post"
import { v4 as uuid } from "uuid"

export const posts: PostTypes[] = [
  {
    id: uuid(),
    userId: "prasanna012@",
    date: new Date("2025-08-25T10:30:00Z"),
    content:
      "Weekend adventure exploring the city! 🏙️ Found this amazing street art that perfectly captures the urban spirit. Art is everywhere if you just look around! #streetart #urban #weekend",
    image: "https://picsum.photos/600/400?random=1",
    likes_count: 128,
    comments: ["Wow this is amazing!", "Love the vibe 🔥", "Which street is this?"],
    comments_count: "3",
    share_count: 14,
    labels: ["#streetart", "#urban", "#weekend"],
  },
  {
    id: uuid(),
    userId: "alex_dev",
    date: new Date("2025-08-26T14:45:00Z"),
    content:
      "Finally wrapped up my portfolio website 🚀 Excited to share it with the world. Built with React, Tailwind, and some coffee ☕.",
    image: "https://picsum.photos/600/400?random=2",
    likes_count: 245,
    comments: ["Looks sleek 👌", "Send me the link!", "Congrats man 🎉"],
    comments_count: "3",
    share_count: 30,
    labels: ["#webdev", "#portfolio", "#react"],
  },
  {
    id: uuid(),
    userId: "emma_travels",
    date: new Date("2025-08-27T09:15:00Z"),
    content:
      "Sunrise hike 🌄 Nothing feels better than fresh air, mountain views, and good company. #hiking #nature",
    image: "https://picsum.photos/600/400?random=3",
    likes_count: 512,
    comments: ["This is breathtaking 😍", "Where is this?", "Adding to my bucket list!"],
    comments_count: "3",
    share_count: 58,
    labels: ["#hiking", "#nature", "#travel"],
  },
  {
    id: uuid(),
    userId: "foodie_john",
    date: new Date("2025-08-28T18:10:00Z"),
    content:
      "Best ramen I've ever had 🍜🔥 Shoutout to this hidden gem downtown. Flavor explosion guaranteed!",
    image: "https://picsum.photos/600/400?random=4",
    likes_count: 332,
    comments: ["Need to try this!", "Which restaurant?", "Looks delicious 🤤"],
    comments_count: "3",
    share_count: 22,
    labels: ["#food", "#ramen", "#citylife"],
  },
  {
    id: uuid(),
    userId: "tech_savvy",
    date: new Date("2025-08-29T20:55:00Z"),
    content:
      "Experimenting with AI art 🖼️ The blend of technology and creativity fascinates me every single day. #AI #art #future",
    image: "https://picsum.photos/600/400?random=5",
    likes_count: 689,
    comments: ["This is insane 🔥", "AI is the future", "Mind-blowing stuff!"],
    comments_count: "3",
    share_count: 76,
    labels: ["#AI", "#art", "#future"],
  },
]
