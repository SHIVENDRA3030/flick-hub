import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
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
        <h1 className="text-4xl font-bold text-gradient">About Dark Stark</h1>

        {/* Introduction */}
        <section className="space-y-4">
          <p className="text-white/70 leading-relaxed">
            Welcome to Dark Stark, an indexing platform that provides links to content hosted on third-party websites. We do <strong>not</strong> host, store, or distribute any copyrighted material on our servers.
          </p>
          <p className="text-white/70 leading-relaxed">
            Our platform is designed to be simple and user-friendly, allowing you to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Browse a wide selection of movies (information and links)</li>
            <li>Search for specific movies</li>
            <li>Find information about cast, crew, and plot</li>
            <li>Discover reviews and ratings</li>
          </ul>
          <p className="text-white/70 leading-relaxed">
            All links are provided by third-party sources, and we are not responsible for the content they host. We respect copyright laws and will review and remove content upon receiving valid takedown requests.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;