export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-6 bg-black text-slate-100 text-xs">
      All rights reserved © {new Date().getFullYear()}
    </footer>
  );
}
