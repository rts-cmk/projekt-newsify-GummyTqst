import { useEffect, useState } from "react"
import "../CategoryToggle/CategoryToggle.sass"


const default_sections = ["world", "health", "business", "travel"]
const storage_key = "visibleSections"

export default function CategoryToggle({ onChange }) {
    const [visibleSections, setVisibleSections] = useState(default_sections)

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storage_key)) || default_sections
        setVisibleSections(saved)
    }, [])

    function toggleSection(section) {
        setVisibleSections((prev) => {
            const updated = prev.includes(section)
                ? prev.filter((s) => s !== section)
                : [...prev, section]
            localStorage.setItem(storage_key, JSON.stringify(updated))
            if (onChange) onChange(updated)
            return updated
        })
    }

    return (
        <div className="category-settings">
            <h2>Categories</h2>

            <div className="category-settings__options">
                {default_sections.map((section) => (
                    <div className="category-settings__item" key={section}>
                        <span className="category-settings__name">{section}</span>

                        <label className="category-settings__toggle">
                            <input type="checkbox" checked={visibleSections.includes(section)} onChange={() => toggleSection(section)} />
                            <span className="category-settings__slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}