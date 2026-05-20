import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import type { Metadata } from "next";

// Enable static generation for all project routes
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Metadata for each project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Proje Bulunamadı",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3dkayhan.com";
  const projectUrl = `${baseUrl}/projects/${project.slug}`;

  return {
    title: `${project.title} | Kayhan Ayas 3D Tasarım`,
    description: project.description || project.subtitle,
    keywords: [
      project.title,
      project.category,
      project.client || "",
      project.software || "",
      "3D Tasarım",
      "3D Görselleştirme",
    ].filter(Boolean),
    authors: [{ name: "Kayhan Ayas" }],
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: projectUrl,
      title: project.title,
      description: project.description || project.subtitle,
      siteName: "Kayhan Ayas - 3D Art Director & Developer",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description || project.subtitle,
      images: [project.image],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
