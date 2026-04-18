import { useMemo, useRef, useState, useEffect } from "react";
import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { companies } from "../data/experience";
import { schools } from "../data/education";
import FilterDropdown from "./FilterDropdown";
import FilterChips from "./FilterChips";
import FilterPanel from "./FilterPanel";
import SkillCategory from "./SkillCategory";

export default function Skills({ onShowProjects }) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const [selectedProfessional, setSelectedProfessional] = useState([]);
    const [selectedAcademic, setSelectedAcademic] = useState([]);
    const [personalSelected, setPersonalSelected] = useState(false);

    const [selectedSkillId, setSelectedSkillId] = useState(null);
    const categoryRefs = useRef({});
    const [rowMapByType, setRowMapByType] = useState({});

    const toggleInList = (list, value) =>
        list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value];

    const selectedOrigins = [
        ...selectedProfessional,
        ...selectedAcademic,
        ...(personalSelected ? ["personal"] : []),
    ];

    const filteredSkills = useMemo(() => {
        if (selectedOrigins.length === 0) return skills;

        return skills.filter((skill) =>
            projects.some(
                (p) =>
                    p.tags.includes(skill.id) &&
                    p.tags.some((tag) => selectedOrigins.includes(tag))
            )
        );
    }, [selectedOrigins]);

    const typeOrder = ["language", "framework", "tool", "platform", "domain"];

    const typeLabels = {
        language: "Languages",
        framework: "Frameworks",
        tool: "Tools",
        platform: "Platforms",
        domain: "Domains",
    };

    const grouped = useMemo(() => {
        return filteredSkills.reduce((acc, skill) => {
            const type = skill.tags?.[0] || "tool";
            if (!acc[type]) acc[type] = [];
            acc[type].push(skill);
            return acc;
        }, {});
    }, [filteredSkills]);

    const getUsage = (skillId) => {
        const relatedProjects = projects.filter((p) =>
            p.tags.includes(skillId)
        );

        const professional = companies.filter((c) =>
            relatedProjects.some((p) => p.tags.includes(c.id))
        );

        const academic = schools.filter((s) =>
            relatedProjects.some((p) => p.tags.includes(s.id))
        );

        const personal = relatedProjects.some((p) =>
            p.tags.includes("personal")
        )
            ? [{ id: "personal", title: "Personal" }]
            : [];

        return { professional, academic, personal, relatedProjects };
    };

    const chips = {
        professional: companies.filter((c) =>
            selectedProfessional.includes(c.id)
        ),
        academic: schools.filter((s) =>
            selectedAcademic.includes(s.id)
        ),
        personal: personalSelected,
        skills: [],
        onRemoveProfessional: (id) =>
            setSelectedProfessional((p) => p.filter((v) => v !== id)),
        onRemoveAcademic: (id) =>
            setSelectedAcademic((p) => p.filter((v) => v !== id)),
        onRemovePersonal: () => setPersonalSelected(false),
        onRemoveSkill: () => { },
    };

    const clearAll = () => {
        setSelectedProfessional([]);
        setSelectedAcademic([]);
        setPersonalSelected(false);
        setSelectedSkillId(null);
        setOpenDropdown(null);
    };

    useEffect(() => {
        const newRowMap = {};

        Object.entries(categoryRefs.current).forEach(([type, container]) => {
            if (!container) return;

            const nodes = container.querySelectorAll("[data-skill-id]");
            const map = {};

            let currentRowTop = null;
            let rowIndex = 0;

            nodes.forEach((node) => {
                const rect = node.getBoundingClientRect();

                if (currentRowTop === null) {
                    currentRowTop = rect.top;
                }

                // new row if vertical shift detected
                if (Math.abs(rect.top - currentRowTop) > 5) {
                    rowIndex++;
                    currentRowTop = rect.top;
                }

                const id = node.getAttribute("data-skill-id");
                map[id] = rowIndex;
            });

            newRowMap[type] = map;
        });

        setRowMapByType(newRowMap);
    }, [filteredSkills]); // 👈 important

    return (
        <section id="skills" className="py-16">
            <h2 className="text-3xl font-bold mb-6">Skills</h2>

            {/* FILTER BAR */}
            <FilterPanel
                filters={[
                    {
                        id: "skill-prof",
                        label: "Professional",
                        items: companies,
                        selected: selectedProfessional,
                        setSelected: setSelectedProfessional,
                    },
                    {
                        id: "skill-acad",
                        label: "Academic",
                        items: schools,
                        selected: selectedAcademic,
                        setSelected: setSelectedAcademic,
                    },
                ]}
                personal={{
                    value: personalSelected,
                    setValue: setPersonalSelected,
                }}
                onClearAll={clearAll}
                chips={chips}
            />

            {/* SKILL CATEGORIES */}
            <div className="space-y-10">
                {typeOrder.map((type) => {
                    const group = grouped[type];
                    if (!group) return null;

                    return (
                        <SkillCategory
                            key={type}
                            type={type}
                            label={typeLabels[type]}
                            skills={group}
                            rowMap={rowMapByType[type]}
                            containerRef={(el) => (categoryRefs.current[type] = el)} // 👈 IMPORTANT
                            selectedSkillId={selectedSkillId}
                            setSelectedSkillId={setSelectedSkillId}
                            getUsage={getUsage}
                            onShowProjects={onShowProjects}
                        />
                    );
                })}
            </div>
        </section>
    );
}