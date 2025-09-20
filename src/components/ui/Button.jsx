export default function Button({ className = '', ...props }) {
    return <button className={`btn bg-primary text-white ${className}`} {...props} />
}