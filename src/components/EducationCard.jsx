import Icon from "./Icon";
import { formatRange } from "../utils/dateFormat";

export default function EducationCard({ school, open, onToggle }) {
    const formatDate = (d) => {
        if (!d) return "";
        if (typeof d === 'string') return d;
        return formatRange(d);
    };

    const gradePercent =
        school.grade?.value && school.grade?.range
            ? Math.round((school.grade.value / school.grade.range) * 100)
            : null;

    return (
        <div className="relative">

            {/* timeline dot */}
            <div className="absolute -left-[34px] top-2 w-3 h-3 rounded-full bg-gray-400" />

            {/* HEADER */}
            <button
                onClick={onToggle}
                className="w-full text-left flex items-center justify-between gap-4"
            >
                <div className="flex items-center gap-3">

                    {/* ICON */}
                    <div className="w-8 h-8">
                        <Icon icon={school.icon} />
                    </div>

                    {/* TITLE */}
                    <div>
                        <h3 className="text-lg font-semibold">
                            {school.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {school.course}
                        </p>
                    </div>
                </div>

                <span className="text-gray-400 text-sm">
                    {open ? "−" : "+"}
                </span>
            </button>

            {/* EXPANDED CONTENT */}
            {open && (
                <div className="mt-4 ml-11 space-y-4 border-l border-gray-800 pl-4">

                    {/* DATES */}
                            <p className="text-sm text-gray-400">
                        {formatDate(school.date)}
                    </p>

                    {/* DEGREES */}
                    {school.degrees && (
                        <div className="text-sm text-gray-300 space-y-1">
                            {school.degrees.map((deg, i) => (
                                <p key={i}>• {deg}</p>
                            ))}
                        </div>
                    )}

                    {/* GRADE */}
                    {school.grade && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-300 mb-1">
                                Grade:{" "}
                                <span className="font-medium">
                                    {school.grade.value} / {school.grade.range}
                                </span>
                            </p>

                            {/* PROGRESS BAR */}
                            {gradePercent !== null && (
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div
                                        className="bg-gray-400 h-2 rounded-full"
                                        style={{ width: `${gradePercent}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}