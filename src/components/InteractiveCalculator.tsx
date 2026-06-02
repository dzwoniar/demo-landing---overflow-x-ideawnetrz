import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sparkles, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Percent,
  Calculator
} from 'lucide-react';

interface InteractiveCalculatorProps {
  onSubmitSuccess: (data: {
    metraz: number;
    standard: 'standard' | 'premium' | 'prestige';
    zakres: string;
    start: string;
    name: string;
    email: string;
    phone: string;
    priceEstMin: number;
    priceEstMax: number;
    vatSavings: number;
  }) => void;
  initialRef?: React.RefObject<HTMLDivElement | null>;
}

export default function InteractiveCalculator({
  onSubmitSuccess,
  initialRef
}: InteractiveCalculatorProps) {
  // Inputs
  const [metraz, setMetraz] = useState<number>(65);
  const [standard, setStandard] = useState<'standard' | 'premium' | 'prestige'>('premium');
  const [zakres, setZakres] = useState<string>('mieszkanie');
  const [start, setStart] = useState<string>('3-miesiace');
  
  // Lead info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [rodo, setRodo] = useState<boolean>(false);

  // Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Dynamic calculations
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(0);
  const [vatSavings, setVatSavings] = useState<number>(0);

  useEffect(() => {
    // Basic price ranges per m2 for finishings based on standard
    let basePriceMin = 1300;
    let basePriceMax = 1600;

    if (standard === 'premium') {
      basePriceMin = 1900;
      basePriceMax = 2300;
    } else if (standard === 'prestige') {
      basePriceMin = 2900;
      basePriceMax = 3600;
    }

    // Zakres multiplier factors
    let factor = 1.0;
    if (zakres === 'dom') {
      factor = 1.05; // Slightly more complex plumbing/wiring spacing
    } else if (zakres === 'komercja') {
      factor = 1.2;  // HVAC, commercial codes, fire protection
    } else if (zakres === 'wybrane') {
      factor = 0.7;  // Lower scope
    }

    // Calculations
    const calculatedMin = metraz * basePriceMin * factor;
    const calculatedMax = metraz * basePriceMax * factor;
    
    // Tax savings: buying materials separately carries 23% VAT, contracting together carries 8% VAT.
    // Savings corresponds to roughly 15% reduction in overall gross project cost or 15% VAT relief value
    const savings = ((calculatedMin + calculatedMax) / 2) * 0.15;

    setPriceMin(calculatedMin);
    setPriceMax(calculatedMax);
    setVatSavings(savings);
  }, [metraz, standard, zakres]);

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (metraz <= 0) {
      nextErrors.metraz = 'Podaj prawidłowy metraż';
    }
    if (!name.trim()) {
      nextErrors.name = 'Wpisz swoje imię';
    }
    if (!email.trim() || !email.includes('@')) {
      nextErrors.email = 'Podaj poprawny adres e-mail';
    }
    if (!phone.trim() || phone.replace(/\s/g, '').length < 9) {
      nextErrors.phone = 'Podaj poprawny numer telefonu (min. 9 cyfr)';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmitSuccess({
        metraz,
        standard,
        zakres,
        start,
        name,
        email,
        phone,
        priceEstMin: priceMin,
        priceEstMax: priceMax,
        vatSavings
      });
    } else {
      const errEl = document.getElementById('calc_form_err_anchor');
      if (errEl) {
        errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const formatPLN = (value: number) => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div
      ref={initialRef}
      className="bg-white rounded-3xl border border-[#e5dfd5] shadow-2xl overflow-hidden"
      id="calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Parametry wyceny */}
        <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#e5dfd5]/60 space-y-8">
          
          <div className="flex items-center space-x-3 text-[#121212]">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center border border-[#C5A880]/20 text-[#C5A880]">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-[#C5A880] block">
                Zalecany Krok 1 z 2
              </span>
              <h3 className="font-display font-bold text-gray-950 text-base leading-none">
                Określ parametry swojego projektu
              </h3>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Metraz */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-950 font-sans block">
                  Metraż lokalu:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="15"
                    max="1000"
                    value={metraz}
                    onChange={(e) => setMetraz(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-16 h-8 text-center bg-[#FAF8F5] border border-[#e5dfd5] rounded-lg font-mono text-sm font-bold focus:outline-none focus:border-[#C5A880]"
                  />
                  <span className="font-sans text-xs text-gray-500">m²</span>
                </div>
              </div>
              <input
                type="range"
                min="25"
                max="300"
                step="1"
                value={metraz}
                onChange={(e) => setMetraz(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#e5dfd5] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                <span>25 m²</span>
                <span>100 m²</span>
                <span>200 m²</span>
                <span>300 m²+</span>
              </div>
            </div>

            {/* Standard wykończenia */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-950 font-sans block">
                Standard wykończenia:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', name: 'Standard', desc: 'Gotowe do zamieszkania' },
                  { id: 'premium', name: 'Premium', desc: 'Materiały premium, meble' },
                  { id: 'prestige', name: 'Prestige', desc: 'Indywidualny luksus, wizja' }
                ].map((std) => (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => setStandard(std.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition duration-200 cursor-pointer ${
                      standard === std.id
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-gray-950 ring-1 ring-[#C5A880]'
                        : 'border-[#e5dfd5]/70 bg-white hover:border-[#C5A880]/50 text-gray-700'
                    }`}
                  >
                    <span className="font-display font-extrabold text-sm block leading-none">{std.name}</span>
                    <span className="text-[10px] text-gray-400 block mt-1 leading-tight">{std.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Zakres prac */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-950 font-sans block">
                Zakres prac realizowanych pod klucz:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'mieszkanie', label: 'Wykończenie mieszkania pod klucz' },
                  { id: 'dom', label: 'Wykończenie domu jednorodzinnego pod klucz' },
                  { id: 'komercja', label: 'Fit-out komercyjny (biuro / hotel / lokal)' },
                  { id: 'wybrane', label: 'Tylko wybrane prace wykończeniowe' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setZakres(opt.id)}
                    className={`px-4 py-3 rounded-xl border text-left text-xs transition duration-150 flex items-center space-x-2.5 cursor-pointer ${
                      zakres === opt.id
                        ? 'border-[#C5A880] bg-[#C5A880]/5 text-gray-950 font-semibold'
                        : 'border-[#e5dfd5]/60 bg-white hover:border-[#C5A880]/30 text-gray-600'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      zakres === opt.id ? 'border-[#C5A880]' : 'border-[#e5dfd5]'
                    }`}>
                      {zakres === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />}
                    </div>
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Planowany start */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-950 font-sans block">
                Planowany start inwestycji:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: '3-miesiace', label: 'W ciągu 3 miesięcy' },
                  { id: '3-6-miesiecy', label: 'Za 3–6 miesięcy' },
                  { id: 'orientacyjnie', label: 'Jeszcze planuję' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStart(opt.id)}
                    className={`p-3 rounded-xl border text-center text-xs transition duration-150 cursor-pointer ${
                      start === opt.id
                        ? 'border-gray-950 bg-gray-950 text-white'
                        : 'border-[#e5dfd5]/60 bg-white hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <span className="leading-tight block font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Wyniki i Formularz kontaktowy */}
        <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 border-[#e5dfd5]/60">
          
          <div className="space-y-6">
            
            {/* Live Visualizations of budget estimates */}
            <div className="bg-white p-5 rounded-2xl border border-[#e5dfd5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase font-extrabold block">
                  Szacunek w oparciu o dane
                </span>
                <span className="flex items-center text-[10px] font-mono font-bold text-emerald-600 space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Ceny ryczałtowe</span>
                </span>
              </div>

              <div>
                <span className="text-xs text-[#2E2A25]/60 block mb-1">
                  Materiały z rzetelną robocizną pod klucz:
                </span>
                <span className="font-display font-bold text-2xl text-gray-950 tracking-tight block">
                  {formatPLN(priceMin)} – {formatPLN(priceMax)}
                </span>
              </div>

              {/* VAT calculations */}
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start space-x-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100 mt-0.5">
                  <Percent className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-emerald-700 uppercase block tracking-wider leading-none">
                     Oszczędzasz 15% z prawidłowymi stawkami VAT
                  </span>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                     Dzięki rozliczeniu usługi i materiałów pod jedną umową z Idea Wnętrz (VAT 8% zamiast 23%), Twoja realna oszczędność wynosi <strong className="text-emerald-950 font-bold">{formatPLN(vatSavings)}</strong>. Safe capital returned!
                  </p>
                </div>
              </div>

              {/* Deadline constraint */}
              <div className="flex items-center space-x-2 text-[11px] text-gray-500 pt-1">
                <span className="text-[#C5A880] font-bold">✓</span>
                <span>Gwarantowany termin: <strong>60 dni roboczych</strong> (zapisany w umowie)</span>
              </div>
            </div>

            {/* LEAD FORM SECTION */}
            <div className="pt-2" id="calc_form_err_anchor">
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block mb-3.5">
                Krok 2: Odbierz precyzyjną kalkulację na e-mail
              </span>

              <form onSubmit={handleSubmit} className="space-y-3.5" id="form_calc_calculator">
                <div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Twoje imię"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full h-11 pl-10 pr-3 text-xs rounded-xl bg-white border ${
                        errors.name ? 'border-red-500 focus:ring-red-200' : 'border-[#e5dfd5] focus:ring-[#C5A880]/20'
                      } focus:outline-none focus:ring-1`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Twój adres e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full h-11 pl-10 pr-3 text-xs rounded-xl bg-white border ${
                          errors.email ? 'border-red-500' : 'border-[#e5dfd5]'
                        } focus:outline-none focus:ring-1 focus:ring-[#C5A880]/20`}
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Twój numer telefonu"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full h-11 pl-10 pr-3 text-xs rounded-xl bg-white border ${
                          errors.phone ? 'border-red-500' : 'border-[#e5dfd5]'
                        } focus:outline-none focus:ring-1 focus:ring-[#C5A880]/20`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {metraz < 45 && (
                  <div className="p-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-200 text-[10.5px] text-amber-900 leading-snug">
                    ⚠️ <strong>Możliwość minimalnego metrażu:</strong> Lokale poniżej 45 m² mogą wymagać indywidualnych ustaleń logistycznych. Prosimy o kontakt bezpośredni: +48 500 200 300, lub wyślemy wycenę po zatwierdzeniu.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-12.5 rounded-xl bg-[#121212] hover:bg-[#1c1c1f] text-[#FAF8F5] border border-transparent hover:border-[#C5A880] hover:text-[#C5A880] font-sans font-bold text-xs uppercase tracking-wider shadow-lg transition active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                  id="calc_form_submit_btn"
                >
                  <span>→ WYŚLIJ MI BEZPŁATNĄ WYCENĘ</span>
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                </button>

                <p className="text-[9.5px] text-gray-450 leading-relaxed text-center block pt-1">
                  Dane nie są udostępniane podmiotom trzecim. Wynik jest szacunkowy — precyzyjny kosztorys ustalamy wspólnie podczas bezpłatnej 15-minutowej konsultacji rzutów.
                </p>
              </form>
            </div>

          </div>

          <div className="mt-6 border-t border-[#e5dfd5]/60 pt-4 text-[9.5px] text-gray-400 flex items-center space-x-1.5 leading-snug">
            <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0" />
            <span>Pełna zgodność z regulacjami RODO. Twoje plany i metraże są objęte klauzulą NDA. Nie wysyłamy spamu.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
