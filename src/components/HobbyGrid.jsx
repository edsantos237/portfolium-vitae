import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import SkillCard from "./SkillCard";

function getHobbyId(hobby) {
  return hobby.id ?? hobby.title;
}

function getSpotifyEmbedUrl(url) {
  const match = url?.match(/open\.spotify\.com\/track\/([^?]+)/i);

  if (!match) {
    return url;
  }

  return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator`;
}

export default function HobbyGrid({
  hobbies = [],
  onShowProjectFilters,
  onShowActivity,
}) {
  const [selectedHobbyId, setSelectedHobbyId] = useState(null);
  const [activeInspectorId, setActiveInspectorId] = useState(null);
  const [isActiveInspectorOpen, setIsActiveInspectorOpen] = useState(false);
  const [closingInspectorId, setClosingInspectorId] = useState(null);
  const [isClosingInspectorOpen, setIsClosingInspectorOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [rowMap, setRowMap] = useState({});
  const containerRef = useRef(null);
  const prevSelectedRef = useRef(null);
  const panelDuration = 300;
  const contentFadeDuration = 180;

  const sorted = useMemo(() => {
    if (!Array.isArray(hobbies)) {
      return [];
    }

    return [...hobbies]
      .map((hobby) => ({ ...hobby, id: getHobbyId(hobby) }))
      .sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }, [hobbies]);

  const hobbyIds = useMemo(
    () => new Set(sorted.map((hobby) => hobby.id)),
    [sorted]
  );

  const selectedHobbyInGrid =
    selectedHobbyId && hobbyIds.has(selectedHobbyId) ? selectedHobbyId : null;

  useEffect(() => {
    const measureRows = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const nodes = container.querySelectorAll("[data-hobby-id]");
      const nextRowMap = {};
      let currentRowTop = null;
      let rowIndex = 0;

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (currentRowTop === null) {
          currentRowTop = rect.top;
        }

        if (Math.abs(rect.top - currentRowTop) > 5) {
          rowIndex += 1;
          currentRowTop = rect.top;
        }

        const hobbyId = node.getAttribute("data-hobby-id");
        nextRowMap[hobbyId] = rowIndex;
      });

      setRowMap(nextRowMap);
    };

    measureRows();

    const handleResize = () => {
      window.requestAnimationFrame(measureRows);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sorted]);

  useLayoutEffect(() => {
    let timeoutId;
    let fadeTimeoutId;
    let animationFrameId;
    const prevSelected = prevSelectedRef.current;
    const prevSelectedInGrid =
      prevSelected && hobbyIds.has(prevSelected) ? prevSelected : null;

    const prevRow = prevSelectedInGrid ? rowMap?.[prevSelectedInGrid] : undefined;
    const newRow = selectedHobbyInGrid ? rowMap?.[selectedHobbyInGrid] : undefined;

    if (prevSelectedInGrid === selectedHobbyInGrid) {
      // No-op when unchanged.
    } else if (!prevSelectedInGrid && selectedHobbyInGrid) {
      setClosingInspectorId(null);
      setIsClosingInspectorOpen(false);
      setContentVisible(true);
      setActiveInspectorId(selectedHobbyInGrid);
      setIsActiveInspectorOpen(false);
      animationFrameId = window.requestAnimationFrame(() => {
        setIsActiveInspectorOpen(true);
      });
    } else if (prevSelectedInGrid && !selectedHobbyInGrid) {
      setActiveInspectorId(null);
      setIsActiveInspectorOpen(false);
      setContentVisible(true);
      setClosingInspectorId(prevSelectedInGrid);
      setIsClosingInspectorOpen(true);
      animationFrameId = window.requestAnimationFrame(() => {
        setIsClosingInspectorOpen(false);
      });
      timeoutId = window.setTimeout(() => {
        setClosingInspectorId(null);
      }, panelDuration);
    } else if (prevRow !== undefined && newRow !== undefined && prevRow === newRow) {
      setClosingInspectorId(null);
      setIsClosingInspectorOpen(false);
      setActiveInspectorId(prevSelectedInGrid);
      setIsActiveInspectorOpen(true);
      setContentVisible(false);
      fadeTimeoutId = window.setTimeout(() => {
        setActiveInspectorId(selectedHobbyInGrid);
        animationFrameId = window.requestAnimationFrame(() => {
          setContentVisible(true);
        });
      }, contentFadeDuration);
    } else {
      setContentVisible(true);
      setClosingInspectorId(prevSelectedInGrid);
      setIsClosingInspectorOpen(true);
      setActiveInspectorId(selectedHobbyInGrid);
      setIsActiveInspectorOpen(false);
      animationFrameId = window.requestAnimationFrame(() => {
        setIsClosingInspectorOpen(false);
        setIsActiveInspectorOpen(true);
      });
      timeoutId = window.setTimeout(() => {
        setClosingInspectorId(null);
      }, panelDuration);
    }

    prevSelectedRef.current = selectedHobbyId;

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      if (fadeTimeoutId) {
        window.clearTimeout(fadeTimeoutId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [selectedHobbyId, selectedHobbyInGrid, rowMap, hobbyIds]);

  const activeRow =
    activeInspectorId && rowMap?.[activeInspectorId] !== undefined
      ? rowMap[activeInspectorId]
      : null;

  const closingRow =
    closingInspectorId && rowMap?.[closingInspectorId] !== undefined
      ? rowMap[closingInspectorId]
      : null;

  const handleDetailButtonClick = (link) => {
    if (!link) {
      return;
    }

    if (link.type === "projects") {
      onShowProjectFilters?.(link.filters || []);
      return;
    }

    if (link.type === "activities") {
      onShowActivity?.(link.activity);
    }
  };

  const renderDetail = (detail, hobby, index) => {
    if (typeof detail === "string") {
      return (
        <p key={`${hobby.id}-text-${index}`} className="text-sm text-gray-300">
          {detail}
        </p>
      );
    }

    if (!detail || typeof detail !== "object") {
      return null;
    }

    if (detail.type === "button") {
      const isDisabled =
        (detail.link?.type === "projects" && !onShowProjectFilters) ||
        (detail.link?.type === "activities" && !onShowActivity);

      return (
        <button
          key={`${hobby.id}-button-${index}`}
          type="button"
          onClick={() => handleDetailButtonClick(detail.link)}
          disabled={isDisabled}
          className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button disabled:cursor-not-allowed disabled:opacity-60"
        >
          {detail.label}
        </button>
      );
    }

    if (detail.type === "image") {
      return (
        <img
          key={`${hobby.id}-image-${index}`}
          src={`res/${detail.path}`}
          alt={detail.alt || `${hobby.title} detail`}
          className="w-full rounded-lg object-cover"
          loading="lazy"
        />
      );
    }

    if (detail.type === "video") {
      return (
        <video
          key={`${hobby.id}-video-${index}`}
          className="w-full rounded-lg"
          controls
          preload="metadata"
        >
          <source src={`res/${detail.path}`} />
        </video>
      );
    }

    if (detail.type === "spotify") {
      return (
        <iframe
          key={`${hobby.id}-spotify-${index}`}
          src={getSpotifyEmbedUrl(detail.link)}
          className="h-[152px] w-full rounded-lg"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      );
    }

    return null;
  };

  const renderInspectorPanel = (hobbyId, isOpen, panelContentVisible) => {
    const hobby = sorted.find((entry) => entry.id === hobbyId);

    if (!hobby) {
      return null;
    }

    return (
      <div
        className="col-span-full rounded-t-lg rounded-b-lg border text-sm text-gray-300 relative z-0 section-card"
        style={{ borderColor: isOpen ? "var(--section-accent-border)" : "transparent" }}
      >
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`space-y-4 p-5 transition-opacity duration-200 ease-in-out ${
                panelContentVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border section-icon-surface">
                  <Icon icon={hobby.icon} />
                </div>

                <h4 className="text-sm font-semibold text-white">{hobby.title}</h4>
              </div>

              <div className="space-y-3">
                {(hobby.details || []).map((detail, index) =>
                  renderDetail(detail, hobby, index)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-xl p-5 section-card" style={{ scrollMarginTop: "10rem" }}>
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Hobbies</h3>

      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-3"
      >
        {sorted.map((hobby, index) => {
          const currentRow = rowMap?.[hobby.id];
          const nextHobby = sorted[index + 1];
          const nextRow = nextHobby ? rowMap?.[nextHobby.id] : null;

          const isLastInActiveRow =
            activeRow !== null &&
            currentRow === activeRow &&
            (nextRow === null || nextRow !== currentRow);

          const isLastInClosingRow =
            closingRow !== null &&
            currentRow === closingRow &&
            (nextRow === null || nextRow !== currentRow);

          const isHighlighted = selectedHobbyId === hobby.id;
          const isConnected =
            isActiveInspectorOpen &&
            activeInspectorId === hobby.id &&
            contentVisible;

          return (
            <Fragment key={hobby.id}>
              <div
                data-hobby-id={hobby.id}
                className={`min-w-0 ${isConnected ? "relative z-10" : ""}`}
              >
                <SkillCard
                  skill={hobby}
                  highlighted={isHighlighted}
                  connected={isConnected}
                  onClick={() =>
                    setSelectedHobbyId(isHighlighted ? null : hobby.id)
                  }
                />

                {isConnected && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "-0.75rem",
                      height: "0.75rem",
                      backgroundColor: "var(--section-accent-bg)",
                      borderLeft: "1px solid var(--section-accent-border)",
                      borderRight: "1px solid var(--section-accent-border)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>

              {isLastInClosingRow && closingInspectorId &&
                renderInspectorPanel(closingInspectorId, isClosingInspectorOpen, true)}

              {isLastInActiveRow && activeInspectorId &&
                renderInspectorPanel(activeInspectorId, isActiveInspectorOpen, contentVisible)}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}