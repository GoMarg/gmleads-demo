import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-line-soft py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-ink-faint sm:flex-row">
        <span>&copy; {new Date().getFullYear()} GmLeads. Built by GoMarg.</span>
        <span>This page runs the real GmLeads widget against our live production backend.</span>
      </Container>
    </footer>
  );
}
