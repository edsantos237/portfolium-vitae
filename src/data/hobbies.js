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
        details: {
            type: "button",
            value: ["projects", "personal"]
        }
    },
    {
        title: "Astro-photography",
        icon: {
            type: "react",
            value: IoAperture
        },
        details: {
            type: "file",
            value: []
        }
    },
    {
        title: "Drawing",
        icon: {
            type: "react",
            value: TbWritingSignFilled
        },
        details: {
            type: "file",
            value: []
        }
    },
    {
        title: "Gym",
        icon: {
            type: "react",
            value: IoMdFitness
        },
        details: {
            type: "text",
            value: ["I try to workout 3x a week"]
        }
    },
    {
        title: "Hiking",
        icon: {
            type: "react",
            value: FaPersonHiking
        },
        details: {
            type: "text",
            value: ["I have quite the tendency to get lost in the woods with my dog."]
        }
    },
    {
        title: "Listening to music",
        icon: {
            type: "react",
            value: MdHeadphones
        },
        details: {
            type: "file",
            value: []
        }
    },
    {
        title: "Playing piano",
        icon: {
            type: "react",
            value: MdPiano
        }
    },
    {
        title: "Stargazing",
        icon: {
            type: "react",
            value: IoTelescope
        }
    },
    {
        title: "Traveling",
        icon: {
            type: "react",
            value: BiWorld
        },
        details: [
            {
                type: "text",
                value: ["I have traveled a total of 13 countries (15 if you count layovers) across 4 continents."]
            }
        ]
    },
    {
        title: "Volunteering",
        icon: {
            type: "react",
            value: BiSolidDonateHeart
        }
    },
    {
        title: "Watching series/movies",
        icon: {
            type: "react",
            value: MdMovie
        }
    },
    {
        title: "Writing",
        icon: {
            type: "react",
            value: TbWritingFilled
        }
    }
];
