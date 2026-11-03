import React from 'react';
import { X, Ruler } from 'lucide-react';
import { Product } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  const measurements = product?.measurements || [
    { size: 'M', chest: 59, length: 71, shoulder: 54 },
    { size: 'L', chest: 62, length: 74, shoulder: 56 },
    { size: 'XL', chest: 65, length: 76, shoulder: 58 },
    { size: 'XXL', chest: 68, length: 78, shoulder: 60 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0E0E11] border border-white/15 p-6 md:p-8 text-white shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-4 h-4 text-monver-accent" />
            <h3 className="font-display text-base tracking-[0.2em] uppercase font-semibold text-white">
              Size & Fit Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-white/60 mb-6 leading-relaxed font-light">
          All measurements are taken flat in centimeters (cm). Designed with a tailored {product?.fit.toLowerCase() || 'relaxed fit'}. For an oversized streetwear silhouette, consider taking one size up.
        </p>

        {/* Table */}
        <div className="overflow-x-auto border border-white/10 mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-white/5 uppercase tracking-wider text-[10px] text-white/60 border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest (Half Width)</th>
                <th className="py-3 px-4">Length</th>
                <th className="py-3 px-4">Shoulder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {measurements.map((m) => (
                <tr key={m.size} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-sans font-bold text-white text-sm">{m.size}</td>
                  <td className="py-3 px-4 text-white/80">{m.chest} cm</td>
                  <td className="py-3 px-4 text-white/80">{m.length} cm</td>
                  <td className="py-3 px-4 text-white/80">{m.shoulder} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[11px] text-white/40 tracking-wide font-light flex items-center justify-between">
          <span>Need help finding your size?</span>
          <span className="text-monver-accent">WhatsApp concierge available</span>
        </div>
      </div>
    </div>
  );
};
