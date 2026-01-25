function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="w-full max-w-[422px] rounded-2xl border border-transparent animate-border
        [background:linear-gradient(45deg,#172033,#1e293b 50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),#94a3b8 80%,#6366f1 86%,#818cf8 90%,#6366f1 94%,#94a3b8)_border-box]"
      style={{ "--border-angle": "0deg" }}
    >
      {children} {/* <-- THIS IS THE FIX */}
    </div>
  );
}

export default BorderAnimatedContainer;
