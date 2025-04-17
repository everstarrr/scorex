import './Button.css'

type Props = {
    children: React.ReactNode,
    onClick?: () => void
}

export default function Button({ children, onClick }: Props) {
    return (
        <button onClick={onClick} className='button'>
            {children}
        </button>
    )
}