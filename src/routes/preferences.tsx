import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import preferences from "../preferences";

export function Preferences() {
	const [themes, setThemes] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [sections, setSections] = useState<any[]>([]);

	useEffect(() => {
		setThemes(preferences.themes);
		setCategories(preferences.categories);
		setSections(preferences.sections);
	}, []);

	return (
		<motion.main
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			className="flex flex-col gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
		>
			<section className="rounded-md bg-bg-secondary p-5">
				<h1 className="text-center text-lg">Themes</h1>
				<div className="flex flex-col gap-2">
					{categories.map((category: any) => (
						<>
							<span className="text-sm">{category.name}</span>

							{themes
								.filter((x: any) => x.category === category.id)
								.map((theme: any) => (
									<div
										className="flex cursor-pointer items-center justify-center rounded-md p-2 text-sm transition-all hover:scale-[1.01]"
										style={{
											backgroundColor: theme.bgPrimary,
											color: theme.textPrimary
										}}
										onClick={() => {
											preferences.manager.handlePreferenceChange(
												"theme",
												theme.id
											);
											document.documentElement.dataset.theme =
												theme.id;
										}}
									>
										{theme.name}
									</div>
								))}
						</>
					))}
				</div>
			</section>

			{sections.map((section: any) => (
				<section
					key={section.title}
					className="rounded-md bg-bg-secondary p-5"
				>
					<h1 className="text-center text-lg">{section.title}</h1>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-16">
						{section.fields.map((field: any) => (
							<div
								key={field.key}
								className="flex flex-col items-center gap-2"
							>
								<span>{field.label}</span>
								<input
									className="rounded-md border border-text-secondary bg-bg-secondary px-2 py-1 text-sm focus:outline-0"
									onChange={(e) =>
										preferences.manager.handlePreferenceChange(
											field.key,
											e.target.value
										)
									}
									value={preferences.manager.getPreference(
										field.key,
										field.defaultValue
									)}
								/>
							</div>
						))}
					</div>
				</section>
			))}
		</motion.main>
	);
}