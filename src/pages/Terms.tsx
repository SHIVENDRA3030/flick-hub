
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "@/components/ThreeBackground";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background/50 p-6">
      <ThreeBackground color="#4a9eff" particleCount={1000} />
      <div className="max-w-3xl mx-auto relative z-10">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-8 backdrop-blur-xl bg-background/20 p-8 rounded-lg border border-white/10">
          <h1 className="text-4xl font-bold text-gradient">Terms and Conditions</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">1. Acceptance of Terms</h2>
            <p className="text-white/70 leading-relaxed">
              By accessing and using Darkstark, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
              If you do not agree with any part of these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">2. Use License</h2>
            <p className="text-white/70 leading-relaxed">
              Permission is granted to temporarily access the materials (information or software)
              on Darkstark for personal, non-commercial viewing only.
            </p>
            <div className="pl-4">
              <h3 className="text-xl font-semibold text-white/90 mb-2">This license shall not allow you to:</h3>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">3. Disclaimer</h2>
            <p className="text-white/70 leading-relaxed">
              The materials on Darkstark are provided on an 'as is' basis.
              Darkstark makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property or
              other violation of rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">4. Limitations</h2>
            <p className="text-white/70 leading-relaxed">
              In no event shall Darkstark or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or profit,
              or due to business interruption) arising out of the use or inability
              to use the materials on Darkstark.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
