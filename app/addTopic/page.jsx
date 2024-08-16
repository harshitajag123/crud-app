"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !description) {
			alert("Title and Description are required.");
			return;
		}

		try {
			const res = await fetch("http://localhost:3000/api/topics", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description }),
			});
			if (res.ok) {
				router.refresh();
				router.push("/");
			} else {
				throw new Error("Failed to add topic");
			}
		} catch (error) {
			console.log(error);
		}
	};

	console.log("hi");
	return (
		<>
			<form action="" className="flex flex-col gap-3 " onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Topic Title"
					className="border border-slate-500 px-8 py-2 "
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>

				<input
					type="text"
					placeholder="Topic Description"
					className="border border-slate-500 px-8 py-2 "
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>

				<button className="bg-green-600 font-bold text-white py-3 px-6 w-fit ">
					Add Topic
				</button>
			</form>
		</>
	);
}
