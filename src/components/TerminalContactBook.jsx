import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Play, RefreshCw, FileCode, Database, Check, ShieldCheck } from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function TerminalContactBook() {
  const projectData = projects.find((p) => p.id === 'python-contact-book');

  const [contacts, setContacts] = useState(projectData.initialContacts || []);
  const [history, setHistory] = useState([
    { type: 'system', text: 'Python 3.11.8 (main, interactive shell)' },
    { type: 'system', text: 'Loaded contact_manager.py — Ready for commands.' },
    { type: 'info', text: 'Type "help" or click the quick action buttons below.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [viewMode, setViewMode] = useState('terminal'); // 'terminal' | 'json' | 'code'
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const action = parts[0].toLowerCase();

    const newHistory = [...history, { type: 'user', text: `$ python contact_manager.py --${trimmed}` }];

    switch (action) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available CLI Commands:
  • list                        - Display all saved contacts
  • search <query>              - Search contacts by name, email, or phone
  • add <name> <phone> <email>  - Create a new contact entry
  • delete <name>               - Remove contact from database
  • json                        - View raw serialized JSON file content
  • clear                       - Reset terminal screen
  • reset                       - Restore initial sample contacts`,
        });
        break;

      case 'list':
        if (contacts.length === 0) {
          newHistory.push({ type: 'warning', text: 'No contacts found. Use "add" to insert one.' });
        } else {
          const formatted = contacts
            .map(
              (c, i) =>
                `[${i + 1}] Name: ${c.name.padEnd(18)} | Phone: ${c.phone.padEnd(12)} | Email: ${c.email}`
            )
            .join('\n');
          newHistory.push({
            type: 'output',
            text: `CURRENT CONTACT BOOK ENTRIES (${contacts.length} total):\n--------------------------------------------------------------\n${formatted}`,
          });
        }
        break;

      case 'search':
        const query = parts.slice(1).join(' ').toLowerCase();
        if (!query) {
          newHistory.push({ type: 'error', text: 'Error: Please provide a search query. Example: search Gowtham' });
        } else {
          const results = contacts.filter(
            (c) =>
              c.name.toLowerCase().includes(query) ||
              c.email.toLowerCase().includes(query) ||
              c.phone.includes(query)
          );
          if (results.length === 0) {
            newHistory.push({ type: 'warning', text: `No matches found for query: "${query}"` });
          } else {
            const formatted = results
              .map((c) => `• FOUND: ${c.name} (Phone: ${c.phone}, Email: ${c.email})`)
              .join('\n');
            newHistory.push({ type: 'success', text: formatted });
          }
        }
        break;

      case 'add':
        // Format: add Name Phone Email
        if (parts.length < 4) {
          newHistory.push({
            type: 'error',
            text: 'Syntax Error: Usage is "add <Name> <Phone> <Email>". Example: add Priya 9876543210 priya@domain.com',
          });
        } else {
          const name = parts[1];
          const phone = parts[2];
          const email = parts[3];

          // Basic validation mimicking Python exception handling
          if (!/^\d+$/.test(phone)) {
            newHistory.push({ type: 'error', text: 'ValidationError: Phone number must consist of digits only.' });
          } else {
            const newContact = { name, phone, email, group: 'User Added' };
            const updated = [...contacts, newContact];
            setContacts(updated);
            newHistory.push({
              type: 'success',
              text: `[OK] Contact '${name}' added successfully and saved to 'contacts.json'.`,
            });
          }
        }
        break;

      case 'delete':
        const targetName = parts.slice(1).join(' ').toLowerCase();
        if (!targetName) {
          newHistory.push({ type: 'error', text: 'Error: Specify contact name to delete. Example: delete Priya' });
        } else {
          const initialLen = contacts.length;
          const filtered = contacts.filter((c) => !c.name.toLowerCase().includes(targetName));
          if (filtered.length === initialLen) {
            newHistory.push({ type: 'warning', text: `Contact '${targetName}' not found.` });
          } else {
            setContacts(filtered);
            newHistory.push({
              type: 'success',
              text: `[OK] Contact matching '${targetName}' deleted and synced to 'contacts.json'.`,
            });
          }
        }
        break;

      case 'json':
        newHistory.push({
          type: 'output',
          text: JSON.stringify(contacts, null, 2),
        });
        break;

      case 'clear':
        setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
        setInputVal('');
        return;

      case 'reset':
        setContacts(projectData.initialContacts || []);
        newHistory.push({ type: 'info', text: 'Contacts reset to default initial state.' });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" for a list of commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const executePreset = (presetCmd) => {
    handleCommand(presetCmd);
  };

  return (
    <div className="glass-panel rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl p-6 sm:p-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Python Contact Book Manager CLI
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Interactive CLI
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Interactive terminal simulating Gowtham's Python modular file-handling and JSON storage project
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('terminal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'terminal'
                ? 'bg-purple-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Shell
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'json'
                ? 'bg-purple-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            contacts.json ({contacts.length})
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'code'
                ? 'bg-purple-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Python Source
          </button>
        </div>
      </div>

      {/* Terminal View */}
      {viewMode === 'terminal' && (
        <div className="mt-6 space-y-4">
          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <span>Quick Run:</span>
            </span>
            {[
              { label: 'list', cmd: 'list' },
              { label: 'search Gowtham', cmd: 'search Gowtham' },
              { label: 'add Anita 9876501234 anita@tech.com', cmd: 'add Anita 9876501234 anita@tech.com' },
              { label: 'json', cmd: 'json' },
              { label: 'help', cmd: 'help' },
              { label: 'clear', cmd: 'clear' },
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => executePreset(preset.cmd)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-purple-300 border border-slate-700 hover:border-purple-500/50 font-mono text-xs transition-all flex items-center gap-1"
              >
                <Play className="w-2.5 h-2.5 text-purple-400" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          {/* Terminal Screen */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-4 font-mono text-xs sm:text-sm overflow-hidden flex flex-col h-80 sm:h-96">
            {/* Terminal Titlebar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 text-slate-500 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 text-slate-400 font-mono text-[11px]">bash — python3 contact_manager.py</span>
              </div>
              <span className="text-[11px] text-slate-500">JSON File Sync: Active</span>
            </div>

            {/* Scrollable logs */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {history.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {item.type === 'system' && (
                    <span className="text-slate-500 block">{item.text}</span>
                  )}
                  {item.type === 'info' && (
                    <span className="text-cyan-400 block">{item.text}</span>
                  )}
                  {item.type === 'user' && (
                    <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
                      <span className="text-emerald-400">gowtham@dev:~$</span>
                      <span>{item.text.replace('$ ', '')}</span>
                    </div>
                  )}
                  {item.type === 'output' && (
                    <pre className="text-slate-300 whitespace-pre-wrap font-mono mt-0.5">{item.text}</pre>
                  )}
                  {item.type === 'success' && (
                    <div className="text-emerald-400 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  )}
                  {item.type === 'warning' && (
                    <span className="text-amber-400 block">{item.text}</span>
                  )}
                  {item.type === 'error' && (
                    <span className="text-red-400 block font-semibold">{item.text}</span>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Interactive Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
              }}
              className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-2"
            >
              <span className="text-emerald-400 font-bold text-xs sm:text-sm select-none">
                gowtham@dev:~$
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'list', 'search Gowtham', 'help'..."
                className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm placeholder:text-slate-600 focus:ring-0"
                autoFocus
              />
              <button
                type="submit"
                className="px-2 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs flex items-center gap-1 transition-all"
              >
                <CornerDownLeft className="w-3 h-3" />
                <span>Enter</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* JSON File Viewer */}
      {viewMode === 'json' && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-purple-400" />
              <span>contacts.json (Local Storage Persistence)</span>
            </span>
            <span className="text-emerald-400 font-mono">{contacts.length} record(s)</span>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto max-h-96 leading-relaxed">
            {JSON.stringify(contacts, null, 2)}
          </pre>
        </div>
      )}

      {/* Python Code Structure Tab */}
      {viewMode === 'code' && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>contact_manager.py (Modular Functions & Exception Handling)</span>
            </span>
            <span className="text-cyan-400">Clean Code Pattern</span>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
{`import json
import os

FILE_PATH = "contacts.json"

def load_data():
    """Safely loads contacts from JSON file with exception handling."""
    if not os.path.exists(FILE_PATH):
        return []
    try:
        with open(FILE_PATH, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"[Error] Failed to read database: {e}")
        return []

def save_data(contacts):
    """Persists contacts dictionary to JSON file."""
    try:
        with open(FILE_PATH, "w") as f:
            json.dump(contacts, f, indent=4)
        return True
    except IOError as e:
        print(f"[Error] Unable to write data: {e}")
        return False

def add_contact(contacts, name, phone, email):
    """Validates and appends new contact entry."""
    if not phone.isdigit():
        raise ValueError("Phone number must contain only numeric digits.")
    new_entry = {"name": name, "phone": phone, "email": email}
    contacts.append(new_entry)
    save_data(contacts)
    return new_entry

def search_contact(contacts, query):
    """Performs case-insensitive substring search across attributes."""
    q = query.lower()
    return [c for c in contacts if q in c["name"].lower() or q in c["email"].lower() or q in c["phone"]]`}
          </pre>
        </div>
      )}

      {/* Project Bullet Highlights */}
      <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span><strong>JSON File Persistence:</strong> Stores entries permanently between runtime sessions.</span>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <span><strong>Python Fundamentals:</strong> Dictionaries, functions, file I/O, and try-except blocks.</span>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <span><strong>Modular Design:</strong> Separated functions (add_contact, search_contact, save_data).</span>
        </div>
      </div>
    </div>
  );
}
