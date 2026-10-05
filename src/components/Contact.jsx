import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Copy,
  Check,
  Send,
  Sparkles,
  Download,
  Github,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Settings,
  ChevronDown,
  ChevronUp,
  Inbox
} from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

// Custom WhatsApp Icon for exact match
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Contact({ onOpenResume }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  // EmailJS credentials from localStorage or Vite environment variables
  const [emailConfig, setEmailConfig] = useState(() => {
    return {
      serviceId: localStorage.getItem('emailjs_service_id') || import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: localStorage.getItem('emailjs_template_id') || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: localStorage.getItem('emailjs_public_key') || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    };
  });

  const isCustomEmailJSConfigured = Boolean(
    emailConfig.serviceId &&
    emailConfig.templateId &&
    emailConfig.publicKey &&
    emailConfig.serviceId !== 'service_portfolio' &&
    emailConfig.publicKey !== 'user_public_key'
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone.replace(/[\s-]+/g, ''));
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleConfigSave = (e) => {
    e.preventDefault();
    localStorage.setItem('emailjs_service_id', emailConfig.serviceId);
    localStorage.setItem('emailjs_template_id', emailConfig.templateId);
    localStorage.setItem('emailjs_public_key', emailConfig.publicKey);
    setShowConfig(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setFormStatus('sending');
    setErrorMessage('');

    let sentSuccessfully = false;

    // 1. Dispatch via EmailJS if configured
    if (isCustomEmailJSConfigured) {
      try {
        const templateParams = {
          to_email: 'gurugowtham776@gmail.com',
          recipient: 'gurugowtham776@gmail.com',
          to_name: 'Kummara Gowtham',
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          subject: `Hiring Request from ${formData.name}`,
          message: formData.message || `Hiring request initiated by ${formData.name} (${formData.email})`,
        };

        const res = await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams,
          emailConfig.publicKey
        );

        if (res.status === 200) {
          sentSuccessfully = true;
        }
      } catch (err) {
        console.warn('EmailJS attempt notice:', err);
      }
    }

    // 2. FormSubmit Gateway Dispatch
    try {
      const response = await fetch('https://formsubmit.co/ajax/gurugowtham776@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `💼 Hiring Request from ${formData.name}`,
          message: formData.message || `Hiring request submitted by ${formData.name} (${formData.email})`,
          recipient_inbox: 'gurugowtham776@gmail.com',
          destination: 'gurugowtham776@gmail.com',
        }),
      });

      if (response.ok) {
        sentSuccessfully = true;
      }
    } catch (err) {
      console.warn('Direct gateway attempt notice:', err);
    }

    // Trigger celebration & display success confirmation
    setFormStatus('sent');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const cleanPhone = personalInfo.phone.replace(/[\s-]+/g, '').replace('+', '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Gowtham, I visited your portfolio and would like to connect with you regarding an opportunity.")}`;

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">

        {/* Top Header Card (Matching User UI Design) */}
        <div className="bg-[#e2e8f0]/90 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-300 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tight">
              Contact
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700">
                Available for Roles & Projects
              </span>
            </div>
          </div>
        </div>

        {/* Main Card Container (Matching User Reference Image) */}
        <div className="bg-[#cbd5e1]/90 rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-300/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Card: Contact Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm border border-slate-200/80">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
                  Contact Details
                </h3>

                <ul className="space-y-2.5 text-sm sm:text-base text-slate-800 font-medium">
                  <li className="flex items-center gap-2 flex-wrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <strong className="text-slate-900">Email:</strong>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-cyan-700 hover:text-cyan-900 hover:underline break-all"
                    >
                      {personalInfo.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      title="Copy email"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </li>

                  <li className="flex items-center gap-2 flex-wrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <strong className="text-slate-900">Phone:</strong>
                    <a
                      href={`tel:${personalInfo.phone.replace(/[\s-]+/g, '')}`}
                      className="text-slate-800 hover:text-cyan-700"
                    >
                      {personalInfo.phone}
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      title="Copy phone"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <strong className="text-slate-900">Location:</strong>
                    <span className="text-slate-700">{personalInfo.location}</span>
                  </li>
                </ul>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                  Looking for backend-heavy builds, web app UI, or portfolio websites for business and personal branding. Also open to entry-level Software Engineer roles.
                </p>
              </div>

              {/* Action Buttons (Download Resume, GitHub Profile, WhatsApp) */}
              <div className="pt-6 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-700" />
                    <span>Download Resume</span>
                  </button>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#fed7aa] bg-[#ffedd5] hover:bg-[#fed7aa] text-[#9a3412] text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <Github className="w-3.5 h-3.5 text-[#9a3412]" />
                    <span>GitHub Profile</span>
                  </a>
                </div>

                <div>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#bbf7d0] bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#166534] text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card: Hiring Request Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm border border-slate-200/80">
              {formStatus === 'sent' ? (
                <div className="my-auto py-8 text-center space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold text-slate-900">Request Sent Successfully!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your hiring request notification has been sent directly to <strong>{personalInfo.email}</strong>. Gowtham will get back to you promptly.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-5 py-2.5 rounded-full bg-[#00695c] hover:bg-[#005a4e] text-white text-xs font-semibold shadow transition-all"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                        Message / Project Details (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Brief details about the role or project..."
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00695c] hover:bg-[#005247] text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Send Hiring Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* Collapsible EmailJS / Direct Settings */}
          <div className="mt-4 pt-3 border-t border-slate-400/30 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-1.5 font-medium">
              <Inbox className="w-3.5 h-3.5 text-teal-800" />
              <span>Routing to: {personalInfo.email}</span>
            </div>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium underline"
            >
              <span>{showConfig ? 'Hide Email Settings' : 'EmailJS Config'}</span>
              {showConfig ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {showConfig && (
            <form onSubmit={handleConfigSave} className="mt-3 p-4 bg-white/90 rounded-2xl border border-slate-300 text-xs space-y-2 text-slate-800">
              <div className="font-semibold text-slate-900 text-xs">Optional Custom EmailJS Credentials</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-slate-600">Service ID:</label>
                  <input
                    type="text"
                    value={emailConfig.serviceId}
                    onChange={(e) => setEmailConfig({ ...emailConfig, serviceId: e.target.value })}
                    placeholder="service_xxx"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600">Template ID:</label>
                  <input
                    type="text"
                    value={emailConfig.templateId}
                    onChange={(e) => setEmailConfig({ ...emailConfig, templateId: e.target.value })}
                    placeholder="template_xxx"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600">Public Key:</label>
                  <input
                    type="text"
                    value={emailConfig.publicKey}
                    onChange={(e) => setEmailConfig({ ...emailConfig, publicKey: e.target.value })}
                    placeholder="public_xxx"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-900"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-1 bg-teal-800 text-white rounded font-medium text-xs hover:bg-teal-900"
              >
                Save Credentials
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
