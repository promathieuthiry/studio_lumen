"use client";

import { useState } from "react";
import { PortfolioCarousel } from "@/components/ui/PortfolioCarousel";
import { VideoModal } from "@/components/ui/VideoModal";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { SanityImageSource } from "@/sanity/image";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  youtubeVideoId: string;
  thumbnail: SanityImageSource;
};

type PortfolioProps = {
  projects: Project[];
};

export function Portfolio({ projects }: PortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!projects?.length) return null;

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-site">
        <FadeIn>
          <SectionLabel className="block text-center mb-4">
            Portfolio
          </SectionLabel>
          <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white mb-4 text-center leading-[1.18]">
            Nos réalisations
          </h2>
          <p className="text-text-body text-[16px] leading-[26px] text-center max-w-2xl mx-auto mb-14">
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
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeVideoId}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
                title={selectedProject.title}
              />
            </div>
          )}
        </VideoModal>
      </div>
    </section>
  );
}
