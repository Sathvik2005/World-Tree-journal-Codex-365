import React, { useState, useRef, useEffect } from 'react';

/**
 * Worldbuilding Constellation Board
 * Node-based relationship mapper with connections
 */
const ConstellationBoard = () => {
  const [nodes, setNodes] = useState(() => {
    const saved = localStorage.getItem('mythical_constellation');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [connections, setConnections] = useState(() => {
    const saved = localStorage.getItem('mythical_connections');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [connecting, setConnecting] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('mythical_constellation', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('mythical_connections', JSON.stringify(connections));
  }, [connections]);

  const nodeTypes = {
    location: { icon: '🏔️', color: '#3B82F6' },
    character: { icon: '👤', color: '#67E8F9' },
    faction: { icon: '⚔️', color: '#A78BFA' },
    event: { icon: '✦', color: '#F59E0B' },
    artifact: { icon: '💎', color: '#10B981' },
  };

  const addNode = (type) => {
    const newNode = {
      id: Date.now(),
      type,
      name: `New ${type}`,
      notes: '',
      x: Math.random() * 60 + 20, // 20-80% of width
      y: Math.random() * 60 + 20, // 20-80% of height
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode.id);
  };

  const updateNode = (id, updates) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const deleteNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
    setConnections(connections.filter(c => c.from !== id && c.to !== id));
    setSelectedNode(null);
  };

  const startConnection = (nodeId) => {
    setConnecting(nodeId);
  };

  const completeConnection = (targetId) => {
    if (connecting && connecting !== targetId) {
      const newConnection = {
        id: Date.now(),
        from: connecting,
        to: targetId,
        label: '',
      };
      setConnections([...connections, newConnection]);
    }
    setConnecting(null);
  };

  const deleteConnection = (id) => {
    setConnections(connections.filter(c => c.id !== id));
  };

  const exportImage = () => {
    // Simple export as JSON for now
    const data = { nodes, connections };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `constellation-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const selected = nodes.find(n => n.id === selectedNode);

  return (
    <div className="constellation-board h-full">
      <div className="flex gap-6 h-full">
        {/* Canvas */}
        <div className="flex-1 mythic-border glass-effect rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <h3 className="text-2xl font-bold font-montserrat text-cyan-mist flex items-center gap-2">
              <span className="text-3xl">🌌</span> Constellation Map
            </h3>
            
            <div className="flex gap-2">
              {Object.entries(nodeTypes).map(([type, { icon }]) => (
                <button
                  key={type}
                  onClick={() => addNode(type)}
                  title={`Add ${type}`}
                  className="w-10 h-10 flex items-center justify-center mythic-border glass-effect hover:glow-box rounded-lg transition-all duration-300"
                >
                  <span className="text-xl">{icon}</span>
                </button>
              ))}
              <div className="w-px bg-starlight/20 mx-2" />
              <button
                onClick={exportImage}
                className="px-4 py-2 mythic-border glass-effect hover:glow-box text-cyan-mist font-montserrat rounded-lg transition-all duration-300"
              >
                Export
              </button>
            </div>
          </div>

          {/* Constellation Canvas */}
          <svg
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'transparent' }}
          >
            {/* Connection Lines */}
            {connections.map(conn => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <g key={conn.id}>
                  <line
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke="#67E8F9"
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    className="hover:stroke-opacity-100 transition-all cursor-pointer"
                    onClick={() => {
                      const label = prompt('Connection label:', conn.label);
                      if (label !== null) {
                        setConnections(connections.map(c => 
                          c.id === conn.id ? { ...c, label } : c
                        ));
                      }
                    }}
                  />
                  {conn.label && (
                    <text
                      x={`${(fromNode.x + toNode.x) / 2}%`}
                      y={`${(fromNode.y + toNode.y) / 2}%`}
                      fill="#F8FAFC"
                      fontSize="12"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(node => (
              <g
                key={node.id}
                transform={`translate(${node.x}%, ${node.y}%)`}
                className="cursor-move"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  r="25"
                  fill={nodeTypes[node.type].color}
                  fillOpacity="0.3"
                  stroke={nodeTypes[node.type].color}
                  strokeWidth="2"
                  className={`transition-all ${
                    selectedNode === node.id ? 'animate-pulse-glow' : ''
                  }`}
                  onClick={() => setSelectedNode(node.id)}
                  onDoubleClick={() => startConnection(node.id)}
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fontSize="20"
                  className="pointer-events-none"
                >
                  {nodeTypes[node.type].icon}
                </text>
                {(hoveredNode === node.id || selectedNode === node.id) && (
                  <text
                    y="40"
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="12"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {node.name}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Node Editor */}
        <div className="w-80 mythic-border glass-effect rounded-2xl p-6 space-y-4">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold font-montserrat text-astral capitalize">
                  {selected.type}
                </h4>
                <button
                  onClick={() => deleteNode(selected.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-inter"
                >
                  Delete
                </button>
              </div>

              <input
                type="text"
                value={selected.name}
                onChange={(e) => updateNode(selected.id, { name: e.target.value })}
                className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter focus:outline-none focus:border-cyan-mist"
                placeholder="Name"
              />

              <textarea
                value={selected.notes}
                onChange={(e) => updateNode(selected.id, { notes: e.target.value })}
                placeholder="Notes, description, relationships..."
                className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-64"
              />

              <div className="pt-4 border-t border-starlight/10">
                <button
                  onClick={() => startConnection(selected.id)}
                  className={`w-full py-3 mythic-border glass-effect hover:glow-box font-montserrat rounded-lg transition-all duration-300 ${
                    connecting === selected.id ? 'text-cyan-mist' : 'text-starlight'
                  }`}
                >
                  {connecting === selected.id ? 'Click target node' : 'Connect to...'}
                </button>
              </div>

              {/* Connected Nodes */}
              <div>
                <h5 className="text-sm font-semibold font-montserrat text-starlight/70 mb-2">
                  Connections
                </h5>
                <div className="space-y-2">
                  {connections
                    .filter(c => c.from === selected.id || c.to === selected.id)
                    .map(conn => {
                      const otherId = conn.from === selected.id ? conn.to : conn.from;
                      const other = nodes.find(n => n.id === otherId);
                      if (!other) return null;

                      return (
                        <div
                          key={conn.id}
                          className="flex items-center justify-between bg-midnight-deep rounded-lg p-2"
                        >
                          <span className="text-starlight/80 font-inter text-sm flex items-center gap-2">
                            <span>{nodeTypes[other.type].icon}</span>
                            {other.name}
                          </span>
                          <button
                            onClick={() => deleteConnection(conn.id)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-6xl mb-4 opacity-30">⭐</div>
                <p className="text-starlight/70 font-inter text-sm">
                  Select a node or create new constellations
                </p>
                <p className="text-starlight/50 font-inter text-xs mt-2">
                  Double-click to start connecting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstellationBoard;
