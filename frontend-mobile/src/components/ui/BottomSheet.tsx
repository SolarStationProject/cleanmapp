interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* FONDO OSCURO */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            />

            {/* HOJA INFERIOR CONTENEDORA */}
            <div
                className="relative w-full max-w-md bg-slate-950 rounded-t-[2rem] border-t border-slate-800 shadow-2xl z-10 
               max-h-[85vh] flex flex-col pb-safe transform transition-transform duration-300 ease-out animate-slide-up"
            >
                {/* BARRA DE ARRASTRE */}
                <div onClick={onClose} className="w-full flex justify-center py-3.5 cursor-pointer active:opacity-60">
                    <div className="w-12 h-1.5 rounded-full bg-slate-700/80" />
                </div>

                {/* CONTENIDO INTERNO */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    {children}
                </div>
            </div>
        </div>
    );
}
