import { motion } from "framer-motion";
import { useState } from "react";
import preferences from "../preferences";

function PreferenceInput({
	field
}: {
	field: { key: string; label: string; defaultValue: string };
}) {
	const [value, setValue] = useState(
		preferences.manager.getPreference(field.key, field.defaultValue)
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		preferences.manager.handlePreferenceChange(field.key, e.target.value);
	};

	return (
		<div className="flex flex-col items-center gap-2">
			<span>{field.label}</span>
			<input
				className="rounded-md border border-text-secondary bg-bg-secondary px-2 py-1 text-sm focus:outline-0"
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export function Preferences() {
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
					{preferences.categories.map((category: any) => (
						<div key={category.id}>
							<span className="text-sm">{category.name}</span>
							{preferences.themes
								.filter((x: any) => x.category === category.id)
								.map((theme: any) => (
									<div
										key={theme.id}
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
											if (typeof document !== "undefined") {
												document.documentElement.dataset.theme =
													theme.id;
											}
										}}
									>
										{theme.name}
									</div>
								))}
						</div>
					))}
				</div>
			</section>

			{preferences.sections.map((section: any) => (
				<section
					key={section.title}
					className="rounded-md bg-bg-secondary p-5"
				>
					<h1 className="text-center text-lg">{section.title}</h1>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-16">
						{section.fields.map((field: any) => (
							<PreferenceInput field={field} key={field.key} />
						))}
					</div>
				</section>
			))}
		</motion.main>
	);
}