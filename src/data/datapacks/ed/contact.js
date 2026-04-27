import { MdEmail } from "react-icons/md";
import { IoLogoLinkedin, IoLogoGithub, IoLocationSharp } from "react-icons/io5";
import { FaOrcid } from "react-icons/fa6";
import { IoMdFlower } from "react-icons/io";

export const contact = [
    {
        title: "E-mail",
        value: "edsantos237@outlook.com",
        address: "edsantos237@outlook.com",
        icon: MdEmail
    },
    {
        title: "Work e-mail @ CCG",
        value: "eduardo.santos@ccg.pt",
        address: "eduardo.santos@ccg.pt",
        icon: MdEmail
    },
    {
        title: "LinkedIn",
        value: "edsantos237",
        address: "https://linkedin.com/in/edsantos237",
        icon: IoLogoLinkedin
    },
    {
        title: "GitHub",
        value: "edsantos237",
        address: "https://github.com/edsantos237",
        icon: IoLogoGithub
    },
    {
        title: "ORCID",
        value: "0000-0001-5203-6249",
        address: "https://orcid.org/0000-0001-5203-6249",
        icon: FaOrcid
    },
    {
        title: "CIÊNCIAVITAE",
        value: "AD15-4A7B-2863",
        address: "https://www.cienciavitae.pt/portal/en/AD15-4A7B-2863",
        icon: IoMdFlower
    },
    {
        title: "Location",
        value: "V. N. Famalicão, Braga, Portugal",
        address: "https://maps.app.goo.gl/8Bsgji9gAc5qMsXc6",
        icon: IoLocationSharp
    }
]