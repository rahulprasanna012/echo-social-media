import type { ReactElement } from "react"

export type ProfileTypes={
  className:string,
  title?:string
}

export type BackButtonProps={
    name:string,
    content:string
}

export type InputTypes={

    title:string,
    type:string,
    placeholder:string,
    onChange:(e:any)=>void,
    value:string

}

export type PrimaryButtonTypes ={
    icon:ReactElement,
    title:string,
    style:string,
    type:"submit" | "reset" | "button" | undefined,
    onClick:()=>void
    disabled?:boolean
}