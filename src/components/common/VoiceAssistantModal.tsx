import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, ArrowRight } from 'lucide-react';
import { ActiveModule } from '../../types';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: ActiveModule) => void;
  onTriggerAI: (query: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerAI
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const handleStartListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('Web Speech Recognition API is not supported in this browser. You can select one of the common spoken commands below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setFeedback('Listening... Speak your command now.');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setFeedback(`Microphone error or permission denied: ${event.error}. You can also use quick commands below.`);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          processVoiceCommand(transcript);
        }
      };

      recognition.start();
    } catch (e: any) {
      setIsListening(false);
      setFeedback(`Could not access microphone: ${e?.message || e}. Try selecting a command below.`);
    }
  };

  const processVoiceCommand = (cmd: string) => {
    const c = cmd.toLowerCase();
    let actionSummary = '';

    if (c.includes('dispute') || c.includes('litigation')) {
      onNavigate('dashboard');
      actionSummary = 'Navigating to National Land Governance Dashboard with active dispute filters.';
    } else if (c.includes('catalog') || c.includes('dataset')) {
      onNavigate('catalog');
      actionSummary = 'Opening the National Land Data Catalog.';
    } else if (c.includes('parcel') || c.includes('map') || c.includes('gis')) {
      onNavigate('gis');
      actionSummary = 'Opening Interactive GIS and highlighting surveyed parcels.';
    } else if (c.includes('workspace') || c.includes('research')) {
      onNavigate('workspace');
      actionSummary = 'Opening Research Workspace.';
    } else if (c.includes('challenge') || c.includes('hackathon')) {
      onNavigate('challenges');
      actionSummary = 'Opening Innovation Challenges.';
    } else if (c.includes('observatory') || c.includes('historical') || c.includes('trend')) {
      onNavigate('observatory');
      actionSummary = 'Opening Land Governance Data Observatory.';
    } else if (c.includes('policy') || c.includes('pipeline')) {
      onNavigate('policy_pipeline');
      actionSummary = 'Opening Evidence-to-Policy analytical pipeline.';
    } else {
      // Query the AI
      onNavigate('ai_assistant');
      onTriggerAI(cmd);
      actionSummary = `Querying Land Intelligence AI for: "${cmd}"`;
    }

    setFeedback(actionSummary);
    speakText(actionSummary);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isOpen) return null;

  const quickPrompts = [
    'Show land disputes',
    'Open the data catalog',
    'Analyze this parcel',
    'Find agricultural land datasets',
    'Open research workspace',
    'Open data observatory',
    'View evidence-to-policy pipeline'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative">
        <button
          onClick={() => {
            stopSpeaking();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Land Intelligence Voice Assistant</h3>
            <p className="text-xs text-slate-400">Speak natural commands or research questions</p>
          </div>
        </div>

        {/* Big Mic Button */}
        <div className="my-6 flex flex-col items-center justify-center">
          <button
            onClick={isListening ? () => setIsListening(false) : handleStartListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/20 shadow-lg shadow-rose-500/30'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
          <div className="mt-3 text-xs font-medium text-slate-300">
            {isListening ? 'Listening... speak clearly' : 'Click microphone to speak'}
          </div>
        </div>

        {/* Live Transcript / Feedback */}
        <div className="min-h-[70px] p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
          {transcript && (
            <div className="text-emerald-400 font-mono">
              <span className="text-slate-500">Heard: </span>&quot;{transcript}&quot;
            </div>
          )}
          {feedback ? (
            <div className="text-slate-200">{feedback}</div>
          ) : (
            <div className="text-slate-500 italic">
              Speak or choose a command below. Voice synthesis will respond automatically.
            </div>
          )}
        </div>

        {/* Speech synthesis controls */}
        {isSpeaking && (
          <div className="mt-2 flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded border border-emerald-800/40">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 animate-bounce" /> Speaking response...
            </span>
            <button
              onClick={stopSpeaking}
              className="text-xs underline hover:text-emerald-300"
            >
              Mute
            </button>
          </div>
        )}

        {/* Quick Voice Suggestions */}
        <div className="mt-4">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Suggested Voice Commands
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setTranscript(prompt);
                  processVoiceCommand(prompt);
                }}
                className="text-left text-xs p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-700/60 transition flex items-center justify-between group"
              >
                <span className="truncate">{prompt}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition transform group-hover:translate-x-0.5 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Supported in Chromium / Edge / Safari</span>
          <span>Web Speech & TTS API</span>
        </div>
      </div>
    </div>
  );
};
