// components/Projects.tsx
"use client";

import { useEffect, useState } from "react";

export default function Projects() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/MuhammedEl-Sayed/repos")
      .then((res) => res.json())
      .then(setRepos);
  }, []);

  return (
    <section id="projects" className="mt-20 w-full">
      <h3 className="text-3xl font-semibold mb-8">My Projects</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo) => (
          <article
            key={repo.id}
            className="bg-white/30 border border-black/10 rounded-xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <h4 className="text-xl font-semibold">{repo.name}</h4>
            <p className="text-sm text-parchment-ink/70 mt-1">
              {repo.description || "No description"}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              className="text-parchment-accent mt-2 inline-block text-sm"
            >
              View on GitHub →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

