import { IoTelescope, IoAperture } from "react-icons/io5";
import { MdOutlineDeveloperMode, MdPiano, MdMovie, MdHeadphones } from "react-icons/md";
import { BiWorld, BiSolidDonateHeart } from "react-icons/bi";
import { IoMdFitness } from "react-icons/io";
import { TbWritingFilled, TbWritingSignFilled } from "react-icons/tb";
import { FaPersonHiking } from "react-icons/fa6";

export const hobbies = [
    {
        title: "App development",
        icon: {
            type: "react",
            value: MdOutlineDeveloperMode
        },
        details: [
            "I have lots of ideas for projects and whenever I have the time, I try to develop what sounds more promissing.",
            {
                type: "button",
                label: "Show personal projects",
                link: {
                    type: "projects",
                    filters: ["personal"]
                }
            }
        ]
    },
    {
        title: "Astro-photography",
        icon: {
            type: "react",
            value: IoAperture
        },
        details: [
            "Trying to capture the wonders of the cosmos with my camera and telescope.",
            {
                type: "image",
                path: "infinity_moons.png"
            }
        ]
    },
    {
        title: "Drawing",
        icon: {
            type: "react",
            value: TbWritingSignFilled
        },
        details: [
            "This might be my oldest hobby, and making a living out of it was probably my first \"what I want to be when I grow up\".",
            {
                type: "image",
                path: "drawing_dragon.jpg"
            }
        ]
    },
    {
        title: "Gym",
        icon: {
            type: "react",
            value: IoMdFitness
        },
        details: [
            "I try to workout 3x a week."
        ]
    },
    {
        title: "Hiking",
        icon: {
            type: "react",
            value: FaPersonHiking
        },
        details: [
            "I have quite the tendency to get lost in the woods with my dog."
        ]
    },
    {
        title: "Listening to music",
        icon: {
            type: "react",
            value: MdHeadphones
        },
        details: [
            "I'm particlarly fond of instrumental music, like movie soundtracks, epic scores and piano.",
            "• Favorite song since 2020:",
            {
                type: "bandcamp",
                // link: "https://open.spotify.com/embed/track/098x2YmtSd6W3UixT1P0i1",
                link: "https://bandcamp.com/EmbeddedPlayer/track=1585406331"
            }
        ]
    },
    {
        title: "Playing piano",
        icon: {
            type: "react",
            value: MdPiano
        },
        details: [
            "Trying to learn on my own since 2024 whenever I have the time.",
            "• Yiruma - River Flows in You:",
            {
                type: "video",
                path: "river_flows_in_you.mp4"
            }
        ]
    },
    {
        title: "Stargazing",
        icon: {
            type: "react",
            value: IoTelescope
        },
        details: [
            "Sometimes I just lay on my garden and look up."
        ]
    },
    {
        title: "Traveling",
        icon: {
            type: "react",
            value: BiWorld
        },
        details: [
            "I have traveled a total of 13 countries (15 if you count layovers) across 4 continents."
        ]
    },
    {
        title: "Volunteering",
        icon: {
            type: "react",
            value: BiSolidDonateHeart
        },
        details: [
            "Trying to do my part in saving the world.",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "refood.png"
                },
                label: "Refood",
                link: {
                    type: "activities",
                    activity: "refood",
                }
            }
        ]
    },
    {
        title: "Watching movies/series",
        icon: {
            type: "react",
            value: MdMovie
        },
        details: [
            "I'm the biggest fan of mind-bending movies and series.",
            "• Favorite movie: Interstellar (2014)",
            "• Favorite series: Dark (2017-2020)"
        ]
    },
    {
        title: "Writing",
        icon: {
            type: "react",
            value: TbWritingFilled
        },
        details: [
            "I have been idealizing since my 7th grade, and writting since 2019, the most epic piece of fiction spanning across 24 seasons that might never see the light of day."
        ]
    }
];
