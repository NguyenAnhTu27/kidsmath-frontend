export default function Badge({ className = '', ...props }) {
    return <div className={`badge    ${className}`} {...props} />
}
