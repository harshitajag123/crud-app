import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/topics", {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch topics");
		}

		//return res.json();

		const data = await res.json();
		console.log("Fetched topics data:", data); // Debugging line
		return data; // Return the full data object
	} catch (error) {
		console.log(error);

		console.error("Error in getTopics:", error);
		return {}; // Ensure it returns an empty object to avoid destructuring issues
	}
};

export default async function TopicsList() {
	//const { topics } = await getTopics();

	const data = await getTopics();
	const topics = data?.topics || [];

	return (
		<>
			{topics.map((t) => (
				<div
					key={t._id}
					className="p-4 border border-slate-300 my-3  flex justify-between gap-5 ">
					<div>
						<h2 className=" font-bold text-2xl">{t.title}</h2>
						<div>{t.description}</div>
					</div>

					<div className="flex gap-2 items-start">
						<RemoveBtn id={t._id} />
						<Link href={`/editTopic/${t._id}`}>
							<HiPencilAlt size={24} />
						</Link>
					</div>
				</div>
			))}
		</>
	);
}
