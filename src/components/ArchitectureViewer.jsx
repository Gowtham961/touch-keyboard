import React, { useState } from 'react';
import { Layers, Server, Database, Globe, ArrowRight, Play, CheckCircle, Code2, ShieldAlert } from 'lucide-react';

export default function ArchitectureViewer() {
  const [selectedLayer, setSelectedLayer] = useState('controller');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState('/api/v1/contacts');
  const [apiResponse, setApiResponse] = useState({
    status: 200,
    statusText: '200 OK',
    time: '42ms',
    data: [
      { id: 101, name: 'Kummara Gowtham', role: 'Java Full-Stack Developer', active: true },
      { id: 102, name: 'EduSkills Mentor', role: 'Internship Supervisor', active: true },
    ],
  });

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/contacts',
      status: 200,
      statusText: '200 OK',
      data: [
        { id: 101, name: 'Kummara Gowtham', email: 'gurugowtham776@gmail.com', role: 'Full Stack' },
        { id: 102, name: 'EduSkills Lead', email: 'edu@eduskills.org', role: 'Mentor' },
      ],
    },
    {
      method: 'POST',
      path: '/api/v1/contacts',
      status: 201,
      statusText: '201 Created',
      data: { message: 'Entity persisted to MySQL via Hibernate JPA', entityId: 103, status: 'SUCCESS' },
    },
    {
      method: 'GET',
      path: '/api/v1/dsp/telemetry',
      status: 200,
      statusText: '200 OK',
      data: { processor: 'TMS320C6748', waveform: 'Sawtooth', samplingFreq: '48kHz', adcActive: true },
    },
  ];

  const triggerApiCall = (ep) => {
    setActiveEndpoint(ep.path);
    setIsSimulating(true);

    setTimeout(() => {
      setApiResponse({
        status: ep.status,
        statusText: ep.statusText,
        time: `${Math.floor(Math.random() * 35 + 25)}ms`,
        data: ep.data,
      });
      setIsSimulating(false);
    }, 600);
  };

  const layers = [
    {
      id: 'client',
      name: 'Client Layer',
      tech: 'React / HTML5 / Bootstrap',
      icon: Globe,
      color: 'cyan',
      description: 'Single Page Interface that sends JSON asynchronous REST fetch requests with responsive layouts.',
    },
    {
      id: 'controller',
      name: 'REST Controller',
      tech: 'Spring Boot @RestController',
      icon: Server,
      color: 'emerald',
      description: 'Dispatches endpoints, validates request payloads, handles HTTP status codes and CORS headers.',
    },
    {
      id: 'service',
      name: 'Service Layer',
      tech: 'Spring @Service Component',
      icon: Layers,
      color: 'purple',
      description: 'Executes core business logic, input sanitization, transactional boundaries, and DTO conversion.',
    },
    {
      id: 'orm',
      name: 'Hibernate ORM / JPA',
      tech: 'Spring Data JPA & Hibernate',
      icon: Code2,
      color: 'amber',
      description: 'Maps Java entity objects to relational database tables without manual JDBC boilerplate.',
    },
    {
      id: 'database',
      name: 'Relational DB',
      tech: 'MySQL 8.0 Server',
      icon: Database,
      color: 'blue',
      description: 'Persistent relational tables with normalized foreign keys, ACID compliance, and indexed lookups.',
    },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl p-6 sm:p-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Enterprise Java Multi-Tier Architecture
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Spring Boot + Hibernate
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Interactive visualization of Gowtham's EduSkills Java Full Stack internship deliverables
            </p>
          </div>
        </div>
      </div>

      {/* Layer Flow Visualizer */}
      <div className="mt-8">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
          Request Pipeline Architecture (Click any node to inspect):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            const isSelected = selectedLayer === layer.id;
            return (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all relative ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-400 shadow-lg shadow-emerald-500/15 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Tier {index + 1}</span>
                </div>
                <div className="font-bold text-sm text-white">{layer.name}</div>
                <div className="text-xs font-mono text-emerald-400/90 mt-1">{layer.tech}</div>

                {/* Packet Simulation dot */}
                {isSimulating && (
                  <div className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive REST API Simulator */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Endpoint selector & layer inspector */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
              Simulate Live REST API Request:
            </span>
            <div className="space-y-2">
              {endpoints.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerApiCall(ep)}
                  disabled={isSimulating}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all ${
                    activeEndpoint === ep.path && !isSimulating
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
                        ep.method === 'GET' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span>{ep.path}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Play className="w-3 h-3 text-emerald-400" />
                    <span>Send</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Layer Details */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>Selected Layer:</span>
              <span className="font-bold text-white uppercase">{selectedLayer}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {layers.find((l) => l.id === selectedLayer)?.description}
            </p>
          </div>
        </div>

        {/* Right: Simulated HTTP Response Payload */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">HTTP Response:</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    apiResponse.status === 200 || apiResponse.status === 201
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {apiResponse.statusText}
                </span>
              </div>
              <span className="text-slate-400">{apiResponse.time}</span>
            </div>

            <pre className="flex-1 text-slate-300 overflow-x-auto overflow-y-auto leading-relaxed max-h-56">
              {JSON.stringify(apiResponse.data, null, 2)}
            </pre>

            <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-3 h-3" />
                <span>Hibernate Connection Pool: OK</span>
              </span>
              <span>MySQL 8.0 @ localhost:3306</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
