"use client";

import { useState } from "react";
import { Stream } from "@cloudflare/stream-react";
import { PortfolioCarousel } from "@/components/ui/PortfolioCarousel";
import { VideoModal } from "@/components/ui/VideoModal";
import { FadeIn } from "@/components/ui/FadeIn";
import type { SanityImageSource } from "@/sanity/image";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  cloudflareVideoId: string;
  thumbnail: SanityImageSource;
};

type PortfolioProps = {
  projects: Project[];
};

export function Portfolio({ projects }: PortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!projects?.length) return null;

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Nos réalisations
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Découvrez nos dernières productions vidéo.
          </p>
        </FadeIn>

        <PortfolioCarousel
          projects={projects}
          onSelect={setSelectedProject}
        />

        <VideoModal
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <Stream
                controls
                autoplay
                src={selectedProject.cloudflareVideoId}
                className="w-full h-full"
              />
            </div>
          )}
        </VideoModal>
      </div>
    </section>
  );
}
