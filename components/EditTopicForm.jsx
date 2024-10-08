"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
	const router = useRouter();
	const [newTitle, setNewTitle] = useState(title);
	const [newDescription, setNewDescription] = useState(description);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newTitle, newDescription }),
			});

			if (!res.ok) {
				throw new Error("Failed to update topic");
			}
			router.refresh();
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form action="" className="flex flex-col gap-3 " onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Topic Title"
					className="border border-slate-500 px-8 py-2 "
					onChange={(e) => setNewTitle(e.target.value)}
					value={newTitle}
				/>

				<input
					type="text"
					placeholder="Topic Description"
					className="border border-slate-500 px-8 py-2 "
					onChange={(e) => setNewDescription(e.target.value)}
					value={newDescription}
				/>

				<button className="bg-green-600 font-bold text-white py-3 px-6 w-fit ">
					Update Topic
				</button>
			</form>
		</>
	);
}
