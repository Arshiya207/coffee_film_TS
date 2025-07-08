// type imports
import type { CSSProperties, JSX, PropsWithChildren } from "react"

type GridViewPropstype=PropsWithChildren& {
    title?:boolean,
    titleText?:string,
    style?:CSSProperties

}


export default function GridView({children,title=false,titleText="",style}:GridViewPropstype):JSX.Element{
    const styles=style
    
    return (
        <>
        {title && <h2 className="grid-title">{titleText}</h2>}
        <div className="grid-view" style={styles}>
                {children}
        </div>
        </>
    )
}