import type { Metadata } from "next";
import { DemoWebsite } from "./demo-website";

export const metadata: Metadata = {
  title: "Live Demo — GmLeads in Action",
  description:
    "See GmLeads running on a real business website. The widget is already installed — experience exactly what your visitors will see.",
};

export default function LiveDemoPage() {
  return <DemoWebsite />;
}

