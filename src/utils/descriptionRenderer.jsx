import React from "react";
import Icon from "../components/Icon";

export function getItemGroup(item) {
  if (typeof item === "string") return "text";
  if (!item || typeof item !== "object") return "text";
  if (["image", "video", "youtube", "pdf"].includes(item.type)) return "media";
  if (item.type === "button") return "button";
  return "text";
}

export function groupDescriptionItems(items = []) {
  const groups = [];
  for (const item of items) {
    if (item == null) continue;
    const type = getItemGroup(item);
    const last = groups[groups.length - 1];
    if (last && last.type === type && type !== "text") {
      last.items.push(item);
    } else {
      groups.push({ type, items: [item] });
    }
  }
  return groups;
}

export function renderMediaItem(item, key, opts = {}) {
  const compact = !!opts.compact;
  if (item.type === "image") {
    return (
      <img
        key={key}
        src={`res/${item.path}`}
        alt={item.alt || ""}
        className={`w-full rounded-lg object-contain ${compact ? 'max-h-20' : 'max-h-[32rem]'}`}
        style={{ display: "block", margin: "0 auto" }}
        loading="lazy"
      />
    );
  }

  if (item.type === "video") {
    return (
      <video key={key} className="w-full rounded-lg" controls preload="metadata">
        <source src={`res/${item.path}`} />
      </video>
    );
  }

  if (item.type === "youtube") {
    return (
      <iframe
        key={key}
        src={item.link}
        className="w-full aspect-video rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title={`Video ${key}`}
      />
    );
  }

  if (item.type === "pdf") {
    return (
      <div key={key} className="w-full">
        <iframe
          src={`res/${item.path}`}
          title={item.alt || item.path || `PDF ${key}`}
          className="w-full rounded-lg"
          style={{ height: compact ? "12rem" : "32rem" }}
        />
        <div className="mt-2 text-sm text-gray-400">
          <a href={`res/${item.path}`} target="_blank" rel="noopener noreferrer" className="underline">
            Open PDF in new tab
          </a>
        </div>
      </div>
    );
  }

  return null;
}

// Renders button items as a flat array (no wrapping div) — use inside your own flex container
export function renderFlatButtons(items, keyPrefix, onProjectLink) {
  return items.map((item, ii) => {
    const link = item.link;
    if (link && typeof link === "object") {
      return (
        <button
          key={`${keyPrefix}-flatbtn-${ii}`}
          type="button"
          onClick={() => onProjectLink?.(link)}
          className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
        >
          <span className="flex items-center gap-2">
            {item.icon ? (
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                <Icon icon={item.icon} className="w-4 h-4" />
              </span>
            ) : null}
            <span>{item.label}</span>
          </span>
        </button>
      );
    }
    return (
      <a
        key={`${keyPrefix}-flatbtn-${ii}`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
      >
        <span className="flex items-center gap-2">
          {item.icon ? (
            <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
              <Icon icon={item.icon} className="w-4 h-4" />
            </span>
          ) : null}
          <span>{item.label}</span>
        </span>
      </a>
    );
  });
}

export function renderGroups(groups, keyPrefix, onProjectLink, opts = {}) {
  return groups.map((group, gi) => {
    if (group.type === "text") {
      return (
        <p key={`${keyPrefix}-text-${gi}`} className="text-sm text-gray-300">
          {group.items[0]}
        </p>
      );
    }

    if (group.type === "media") {
      return (
        <div key={`${keyPrefix}-media-${gi}`} className="flex gap-3">
          {group.items.map((item, ii) => (
            <div key={`${keyPrefix}-media-${gi}-${ii}`} className="flex-1 min-w-0">
              {renderMediaItem(item, `${keyPrefix}-${gi}-${ii}`, opts)}
            </div>
          ))}
        </div>
      );
    }

    if (group.type === "button") {
      return (
        <div key={`${keyPrefix}-button-${gi}`} className="flex flex-wrap gap-2">
          {group.items.map((item, ii) => {
            const link = item.link;

            if (link && typeof link === "object") {
              return (
                <button
                  key={`${keyPrefix}-button-${gi}-${ii}`}
                  type="button"
                  onClick={() => onProjectLink?.(link)}
                  className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
                >
                  <span className="flex items-center gap-2">
                    {item.icon ? (
                      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                        <Icon icon={item.icon} className="w-4 h-4" />
                      </span>
                    ) : null}
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            }

            return (
              <a
                key={`${keyPrefix}-button-${gi}-${ii}`}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
              >
                <span className="flex items-center gap-2">
                  {item.icon ? (
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                      <Icon icon={item.icon} className="w-4 h-4" />
                    </span>
                  ) : null}
                  <span>{item.label}</span>
                </span>
              </a>
            );
          })}
        </div>
      );
    }

    return null;
  });
}
