import { MdEmail } from "react-icons/md";
import { IoLogoLinkedin, IoLogoGithub, IoLocationSharp } from "react-icons/io5";
import { FaOrcid } from "react-icons/fa6";
import { IoMdFlower } from "react-icons/io";

export const contact = [
    {
        title: "E-mail",
        value: "edsantos237@outlook.com",
        address: "edsantos237@outlook.com",
        icon: {
            type: "react",
            value: MdEmail
        }
    },
    {
        title: "Work e-mail @ CCG",
        value: "eduardo.santos@ccg.pt",
        address: "eduardo.santos@ccg.pt",
        icon: {
            type: "react",
            value: MdEmail
        }
    },
    {
        title: "LinkedIn",
        value: "edsantos237",
        address: "https://linkedin.com/in/edsantos237",
        icon: {
            type: "react",
            value: IoLogoLinkedin
        }
    },
    {
        title: "GitHub",
        value: "edsantos237",
        address: "https://github.com/edsantos237",
        icon: {
            type: "react",
            value: IoLogoGithub
        }
    },
    {
        title: "ORCID",
        value: "0000-0001-5203-6249",
        address: "https://orcid.org/0000-0001-5203-6249",
        icon: {
            type: "react",
            value: FaOrcid
        }
    },
    {
        title: "CIÊNCIAVITAE",
        value: "AD15-4A7B-2863",
        address: "https://www.cienciavitae.pt/portal/en/AD15-4A7B-2863",
        icon: {
            type: "react",
            value: IoMdFlower
        }
    },
    {
        title: "Location",
        value: "Ribeirão, V. N. Famalicão, Braga, Portugal",
        address: "https://maps.app.goo.gl/rRuBWw7iG1NDAhwx8",
        icon: {
            type: "react",
            value: IoLocationSharp
        }
    }
]