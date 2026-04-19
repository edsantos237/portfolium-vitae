import Icon from "./Icon";
import { contact } from "../data/contact";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <h2 className="text-3xl font-bold">Contact</h2>

      <p className="mt-4 text-gray-400">Feel free to reach out 👇</p>

      <div className="mt-6 flex flex-col md:flex-row md:items-start md:gap-12">
        <div className="md:w-1/2">
          <div className="space-y-3">
            {contact.map((c, i) => {
              const href = c.address || c.value || "";
              const isUrl = String(href).startsWith("http");
              const isEmail = String(href).includes("@");
              const label = c.value;

              return (
                <div key={i} className="flex items-center gap-3">
                  {c.icon && <Icon icon={c.icon} />}
                  {isUrl ? (
                    <a href={href} target="_blank" rel="noreferrer" className="text-sm text-gray-200 underline" title={c.title}>
                      {label}
                    </a>
                  ) : isEmail ? (
                    <a href={`mailto:${href}`} className="text-sm text-gray-200" title={c.title}>
                      {label}
                    </a>
                  ) : (
                    <div className="text-sm text-gray-200" title={c.title}>{label}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}