import clsx from 'clsx'
import './CustomTitle.css'
import { ReactNode } from 'react'

type Props = {
    title: string | ReactNode
    className?: string
    onClick?: () => void
}

export default function CustomTitle({ title, className, onClick }: Props) {
    return (
        <div onClick={onClick} className={clsx("custom-title__container", className)}>
            <span className={clsx('custom-title__container_overlay', className)}>
                {title}
            </span>

            {title}
        </div>
    )
}