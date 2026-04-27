import { FaServer } from "react-icons/fa";

export const cover = {
    name: "My Name",
    picture: "example.png", // path to image in public/res
    background: "example3.jpg",
    headline_short: [
        "Some string.", // string elements are placed as paragraphs
        "Another string with <b>HTML tags</b>.", // strings can contain simple HTML tags like <b> (bold), <i> (italic), <a>, etc.
        <>Some React element.</>, // React elements can be used for more complex formatting, like links with custom styles or icons
    ],
    headline_long: [
        "Some string.",
        "Another string with <b>HTML tags</b>.",
        <>Some React element.</>,
        {
            type: "button",
            icon: "example.svg", // can be a string (path to image)
            label: "Button with image icon that opens URL",
            link: "https://example.com"
        },
        {
            type: "button", // adjacent buttons in the array may be placed in the same row
            icon: FaServer, // can be a React component
            label: "Button with React component icon that opens URL",
            link: "https://example.com"
        },
        {
            type: "button",
            icon: FaServer,
            label: "Button that jumps to personal skills", // buttons can open sections with given filters
            link: {
                type: "skills", // id of the section
                filters: ["personal"]  // filters to apply
            },
        },
        {
            type: "button",
            icon: FaServer,
            label: "Button that jumps to the Experience section",
            link: {
                type: "experience"                
            },
        },
        {
            type: "button",
            icon: FaServer,
            label: "Button that jumps to the Education section",
            link: {
                type: "education"                
            },
        },
        {
            type: "button",
            icon: FaServer,
            label: "Button that selects a project",
            link: {
                type: "projects",
                entry: "helloworld"
            },
        },
        {
            type: "button",
            icon: FaServer,
            label: "Button that selects an activity",
            link: {
                type: "activities",
                entry: "volunteering_activity"
            },
        },
    ],
}