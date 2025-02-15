import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background/50 p-6 sm:p-8 md:p-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
        aria-label="Go back to the previous page"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto space-y-8 backdrop-blur-xl bg-background/20 p-8 rounded-lg border border-white/10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gradient">Terms and Conditions</h1>

        {/* Disclaimer */}
        <p className="text-white/70 italic">
          Disclaimer: This document is purely for informational purposes and does not support or promote piracy. Distributing copyrighted material without permission is illegal in many countries.
        </p>

        {/* Section 1: Introduction */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">1. Introduction</h2>
          <p className="text-white/70 leading-relaxed">
            Welcome to DarkStark. By accessing or using this website, you agree to these Terms and Conditions. If you do not agree, please exit the website immediately.
          </p>
        </section>

        {/* Section 2: Nature of Service */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">2. Nature of Service</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>DarkStark is an indexing platform that provides links to content hosted on third-party websites.</li>
            <li>We do not host, store, or distribute any copyrighted material on our servers.</li>
            <li>All links are provided by third-party sources, and we are not responsible for the content they host.</li>
          </ul>
        </section>

        {/* Section 3: Copyright and Intellectual Property */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">3. Copyright and Intellectual Property</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>DarkStark respects copyright laws and does not intend to infringe on any intellectual property rights.</li>
            <li>If you are a copyright owner and believe your material is linked improperly, you may submit a removal request via our contact page.</li>
            <li>We will review and remove content upon receiving valid takedown requests.</li>
          </ul>
        </section>

        {/* Section 4: Use of Website */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">4. Use of Website</h2>
          <p className="text-white/70 leading-relaxed">
            By using DarkStark, you agree:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Not to use the website for any commercial, illegal, or unlawful purposes.</li>
            <li>Not to copy, sell, distribute, or modify content from this website.</li>
            <li>Not to use automated bots, scripts, or scraping tools to access or download links.</li>
          </ul>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">5. Limitation of Liability</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>DarkStark does not control or endorse any content linked on third-party websites.</li>
            <li>We are not responsible for the quality, legality, or security of external links.</li>
            <li>Users access content at their own risk and should verify the authenticity of sources before proceeding.</li>
          </ul>
        </section>

        {/* Section 6: Changes to Terms */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">6. Changes to Terms</h2>
          <p className="text-white/70 leading-relaxed">
            DarkStark reserves the right to modify these Terms and Conditions at any time without prior notice. Continued use of the website after changes means you accept the updated Terms.
          </p>
        </section>

        {/* Section 7: Contact Information */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">7. Contact Information</h2>
          <p className="text-white/70 leading-relaxed">
            For any issues, feedback, or takedown requests, please contact us at{" "}
            <a href="mailto:djgfyfyfjc@gmail.com" className="text-blue-400 hover:underline">
              djgfyfyfjc@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;