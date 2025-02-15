
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "@/components/ThreeBackground";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background/50 p-6">
      <ThreeBackground color="#9b87f5" particleCount={1000} />
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
          <h1 className="text-4xl font-bold text-gradient">About Darkstark</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">Our Mission</h2>
            <p className="text-white/70 leading-relaxed">
              Welcome to Darkstark, your premier destination for discovering and accessing digital content.
              Our platform is designed to provide a seamless and user-friendly experience for content enthusiasts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Extensive collection of digital content</li>
              <li>High-quality streaming options</li>
              <li>Fast and reliable download links</li>
              <li>User-friendly interface</li>
              <li>Regular updates and new releases</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">Contact Us</h2>
            <p className="text-white/70 leading-relaxed">
              Have questions or suggestions? We'd love to hear from you.
              Reach out to us at support@darkstark.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
