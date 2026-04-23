import AnimatedCollapse from "./AnimatedCollapse";
import Icon from "./Icon";
import ShowProjectsButton from "./ShowProjectsButton";
import { formatRange } from "../utils/dateFormat";

export default function EducationCard({ school, open, onToggle, forceOpen, degreeSelectable, selectedDegreeId, onSelectDegree, showProjectsButton, projectCount, onShowProjects }) {
    const formatDate = (d) => {
        if (!d) return "";
        if (typeof d === 'string') return d;
        return formatRange(d);
    };

    const gradePercent =
        school.grade?.value && school.grade?.range
            ? Math.round((school.grade.value / school.grade.range) * 100)
            : null;

    const labelArray = school.labels ?? (school.label ? [school.label] : []);
    const isOpen = forceOpen ? true : open;
    const toggle = forceOpen ? undefined : onToggle;

    const collapsedHeadline = [...labelArray, school.course].filter(Boolean).join(' • ');
    // When expanded, show only the course; if no course, hide label (empty string)
    const headlineText = isOpen ? (school.course ? school.course : '') : collapsedHeadline;


    return (
        <div className="relative">
            {/* HEADER + Show Projects Button */}
            <div className="flex flex-col gap-2">
                <button
                    onClick={toggle}
                    className={`w-full text-left flex items-center justify-between gap-4 ${forceOpen ? "cursor-default" : ""}`}
                    disabled={!!forceOpen}
                    tabIndex={forceOpen ? -1 : 0}
                >
                    <div className="flex items-center gap-3">
                        {/* ICON */}
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                            <Icon icon={school.icon} />
                        </div>
                        {/* TITLE */}
                        <div>
                            <h3 className="text-lg font-semibold">
                                {school.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {headlineText}
                            </p>
                        </div>
                    </div>
                    <span className="text-gray-400 text-sm">
                        {isOpen ? "−" : "+"}
                    </span>
                </button>
                {/* Show Projects Button is shown on top of the expanded content (right of the left border) */}
            </div>

            {/* EXPANDED CONTENT */}
            <AnimatedCollapse open={isOpen}>
                <div className="section-subentries mt-4 ml-4 pl-4 sm:ml-11">
                    {showProjectsButton && (
                        <div className="mb-2">
                            <ShowProjectsButton onClick={onShowProjects} count={projectCount} />
                        </div>
                    )}

                    {/* DATES */}
                    <p className="text-sm text-gray-400">
                        {formatDate(school.date)}
                    </p>

                    {/* DEGREES */}
                    {school.degrees && (
                        <div className="text-sm text-gray-300 space-y-1">
                                {school.degrees.map((deg, i) => {
                                    const degId = `${school.id}__deg${i}`;
                                    const selected = degreeSelectable && selectedDegreeId === degId;
                                    return (
                                        <p
                                            key={i}
                                            className={`pl-2 py-1 rounded cursor-pointer transition ${degreeSelectable ? "section-soft-hover" : ""} ${selected ? "section-soft-highlight" : ""}`}
                                            onClick={degreeSelectable ? () => onSelectDegree(i) : undefined}
                                            tabIndex={degreeSelectable ? 0 : -1}
                                        >
                                            • {deg}
                                        </p>
                                    );
                                })}
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
                                        className="section-progress-fill h-2 rounded-full"
                                        style={{ width: `${gradePercent}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </AnimatedCollapse>
        </div>
    );
}