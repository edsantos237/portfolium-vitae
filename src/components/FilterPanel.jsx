import { useState, Fragment } from "react";
import FilterDropdown from "./FilterDropdown";
import FilterChips from "./FilterChips";

export default function FilterPanel({
    filters = [],
    personal,
    onClearAll,
    chips, // ✅ NEW (passed from parent)
}) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleInList = (list, value) =>
        list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value];

    return (
        <>
            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-3 mb-4 items-center">
                <span className="text-sm text-gray-400 mr-1">
                    Filters:
                </span>
                {filters.map((f) => (
                    <Fragment key={f.id}>
                        <FilterDropdown
                            id={f.id}
                            label={f.label}
                            selectedCount={f.selected.length}
                            totalCount={
                                f.items
                                    ? f.items.length
                                    : Object.values(f.grouped || {}).flat().length
                            }
                            open={openDropdown}
                            setOpen={setOpenDropdown}
                        />

                        {/* 👇 works for BOTH "acad" and "skill-acad" */}
                        {personal && f.id.includes("acad") && (
                            <button
                                onClick={() => personal.setValue((v) => !v)}
                                className={`px-3 py-1.5 rounded-lg border text-sm ${personal.value
                                    ? "bg-white text-black border-white"
                                    : "bg-gray-900 text-gray-300 border-gray-700"
                                    }`}
                            >
                                Personal
                            </button>
                        )}
                    </Fragment>
                ))}

                <button
                    onClick={onClearAll}
                    className="ml-auto text-sm text-gray-400 hover:text-white"
                >
                    Clear all
                </button>
            </div>

            {/* DRAWERS */}
            {filters.map((f) => {
                if (openDropdown !== f.id) return null;

                return (
                    <div
                        key={f.id}
                        className="mb-6 border border-gray-800 bg-gray-950 rounded-xl p-4"
                    >
                        {/* SIMPLE LIST */}
                        {f.items && (
                            <>
                                <div className="flex flex-wrap gap-2">
                                    {f.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                f.setSelected((prev) =>
                                                    toggleInList(prev, item.id)
                                                )
                                            }
                                            className={`px-3 py-1.5 rounded-lg border text-sm ${f.selected.includes(item.id)
                                                ? "bg-white text-black border-white"
                                                : "bg-gray-900 text-gray-300 border-gray-700"
                                                }`}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 flex justify-between text-xs text-gray-400">
                                    <button
                                        onClick={() =>
                                            f.setSelected(f.items.map((i) => i.id))
                                        }
                                    >
                                        All
                                    </button>
                                    <button onClick={() => f.setSelected([])}>
                                        Clear
                                    </button>
                                </div>
                            </>
                        )}

                        {/* GROUPED (skills) */}
                        {f.grouped && (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                    {f.order.map((type) => {
                                        const group = f.grouped[type];
                                        if (!group) return null;

                                        return (
                                            <div key={type}>
                                                <h4 className="text-gray-400 mb-2">
                                                    {f.labels[type]}
                                                </h4>

                                                <div className="flex flex-wrap gap-2">
                                                    {group.map((skill) => (
                                                        <button
                                                            key={skill.id}
                                                            onClick={() =>
                                                                f.setSelected((prev) =>
                                                                    toggleInList(prev, skill.id)
                                                                )
                                                            }
                                                            className={`px-3 py-1.5 rounded-lg border text-xs ${f.selected.includes(skill.id)
                                                                ? "bg-white text-black border-white"
                                                                : "bg-gray-900 text-gray-300 border-gray-700"
                                                                }`}
                                                        >
                                                            {skill.title}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 flex justify-end text-xs text-gray-400">
                                    <button onClick={() => f.setSelected([])}>
                                        Clear
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            {/* CHIPS (now passed cleanly) */}
            {chips && <FilterChips {...chips} />}
        </>
    );
}