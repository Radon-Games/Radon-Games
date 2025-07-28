import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import preferences from "../preferences";

export function Preferences() {
  const [themes, setThemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);

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
      class="flex flex-col gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <section class="rounded-md bg-bg-secondary p-5">
        <h1 class="text-center text-lg">Themes</h1>
        <div class="flex flex-col gap-2">
          {categories.map((category: ThemeCategory) => (
            <>
              <span class="text-sm">{category.name}</span>

              {themes
                .filter((x: Theme) => x.category === category.id)
                .map((theme: Theme) => (
                  <div
                    class="flex cursor-pointer items-center justify-center rounded-md p-2 text-sm transition-all hover:scale-[1.01]"
                    style={`background-color: ${theme.bgPrimary}; color: ${theme.textPrimary}`}
                    onClick={() => {
                      localStorage.setItem("theme", theme.id);
                      document.documentElement.dataset.theme = theme.id;
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
        <section class="rounded-md bg-bg-secondary p-5">
          <h1 class="text-center text-lg">{section.title}</h1>

          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-16">
            {section.fields.map((field: any) => (
              <div class="flex flex-col items-center gap-2">
                <span>{field.label}</span>
                <input
                  class="rounded-md border border-text-secondary bg-bg-secondary px-2 py-1 text-sm focus:outline-0"
                  onChange={field.onChange}
                  value={
                    localStorage.getItem(field.key)?.trim() || field.defaultValue
                  }
                ></input>
              </div>
            ))}
          </div>
        </section>
      ))}
    </motion.main>
  );
}
