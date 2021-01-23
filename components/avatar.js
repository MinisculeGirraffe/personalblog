export default function Avatar({ name, picture }) {
    return (
        <div className="flex items-center">
            {picture &&
                <img loading="lazy" src={picture} className="w-12 h-12 rounded-full mr-1" alt={name} />
            }
            <div className="font-bold">{name}</div>
        </div>
    )
}