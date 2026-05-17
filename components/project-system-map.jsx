"use client";

import { useMemo, useState } from "react";

function getLinkedNodeIds(edges, nodeId) {
  return new Set(
    edges
      .filter((edge) => edge.from === nodeId || edge.to === nodeId)
      .flatMap((edge) => [edge.from, edge.to])
  );
}

function getActiveEdges(edges, nodeId) {
  return edges.filter((edge) => edge.from === nodeId || edge.to === nodeId);
}

export function ProjectSystemMap({ project, variant = "full" }) {
  const map = project.systemMap;
  const [activeNodeId, setActiveNodeId] = useState(map?.nodes?.[0]?.id ?? "");

  const activeNode = useMemo(() => {
    return map?.nodes.find((node) => node.id === activeNodeId) ?? map?.nodes?.[0];
  }, [activeNodeId, map]);

  const linkedNodeIds = useMemo(() => {
    return map ? getLinkedNodeIds(map.edges, activeNode?.id ?? "") : new Set();
  }, [activeNode?.id, map]);

  const activeEdges = useMemo(() => {
    return map ? getActiveEdges(map.edges, activeNode?.id ?? "") : [];
  }, [activeNode?.id, map]);

  if (!map || !activeNode) {
    return null;
  }

  const isCompact = variant === "compact";
  const visibleNodes = isCompact ? map.nodes.slice(0, 4) : map.nodes;
  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
  const visibleEdges = map.edges.filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to));

  return (
    <section
      className={`project-system-map project-system-map-${variant}`}
      aria-label={`${project.title} interactive system map`}
    >
      <div className="project-system-map-head">
        <div>
          <p className="micro-label">{map.lens}</p>
          <h3>{map.title}</h3>
        </div>
        {!isCompact ? <p className="muted">{map.summary}</p> : null}
      </div>

      <div className="project-system-canvas-shell">
        <svg className="project-system-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {visibleEdges.map((edge) => {
            const from = map.nodes.find((node) => node.id === edge.from);
            const to = map.nodes.find((node) => node.id === edge.to);
            const isActive = edge.from === activeNode.id || edge.to === activeNode.id;

            if (!from || !to) {
              return null;
            }

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={isActive ? "project-system-edge project-system-edge-active" : "project-system-edge"}
              />
            );
          })}
        </svg>

        <div className="project-system-canvas">
          {visibleNodes.map((node) => {
            const isActive = node.id === activeNode.id;
            const isLinked = linkedNodeIds.has(node.id);

            return (
              <button
                key={node.id}
                type="button"
                className={`project-system-node ${isActive ? "project-system-node-active" : ""} ${
                  isLinked ? "project-system-node-linked" : ""
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => setActiveNodeId(node.id)}
                aria-pressed={isActive}
              >
                <span>{node.role}</span>
                <strong>{node.label}</strong>
              </button>
            );
          })}
        </div>
      </div>

      {!isCompact ? (
        <div className="project-system-detail-grid">
          <article className="project-system-detail">
            <p className="micro-label">Selected node</p>
            <h4>{activeNode.label}</h4>
            <p>{activeNode.detail}</p>
          </article>

          <article className="project-system-detail project-system-detail-links">
            <p className="micro-label">Connected flow</p>
            <div>
              {activeEdges.map((edge) => (
                <span key={`${edge.from}-${edge.to}-${edge.label}`}>{edge.label}</span>
              ))}
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
