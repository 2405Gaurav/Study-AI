import Link  from "next/link"
import Image from "next/image"
interface CompanionComponentProps {
    id: string
    name: string
    topic: string
    subject: string
    duration: number
    color: string
}

function CompanionCard({ id, name, topic, subject, duration, color }: CompanionComponentProps) {
    return (
        <article
            className="flex flex-col rounded-4xl border border-black px-4 py-4 gap-5 w-full min-lg:max-w-[410px] justify-between"
            style={{ backgroundColor: color }} // Fixed syntax
        >
            <div className="flex   justify-between items-center ">
                <div className="bg-black text-white rounded-4xl text-sm px-2 py-1 capitalize">{subject}</div>
                <button className="bg-black rounded-full p-2 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15} />
                </button>
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm"> {topic}</p>
            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="clock" width={13.5} height={13.5} />
                <p className="texsm">{duration} mins duration</p>
            </div>
            <Link href={`/companions/${id}`} className="w-full">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full flex items-center justify-center">
                    Launch Lesson
                </button>
            </Link>

        </article>
    )
}

export default CompanionCard;