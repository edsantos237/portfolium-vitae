import { MdEmail } from "react-icons/md";
import { IoLogoLinkedin, IoLogoGithub, IoLocationSharp } from "react-icons/io5";
import { FaOrcid } from "react-icons/fa6";
import { IoMdFlower } from "react-icons/io";

export const contact = [
    {
        title: "E-mail",
        value: "example@mail.com",
        address: "example@mail.com",
        icon: MdEmail
    },
    {
        title: "LinkedIn",
        value: "example",
        address: "https://linkedin.com/in/example",
        icon: IoLogoLinkedin
    },
    {
        title: "GitHub",
        value: "example",
        address: "https://github.com/example",
        icon: IoLogoGithub
    },
    {
        title: "ORCID",
        value: "0000-0001-2345-6789",
        address: "https://orcid.org/0000-0001-2345-6789",
        icon: FaOrcid
    },
    {
        title: "CIÊNCIAVITAE",
        value: "1A2B-3C4D-5E6F",
        address: "https://www.cienciavitae.pt/portal/en/1A2B-3C4D-5E6F",
        icon: IoMdFlower
    },
    {
        title: "Location",
        value: "Location",
        address: "https://maps.app.goo.gl",
        icon: IoLocationSharp
    }
]