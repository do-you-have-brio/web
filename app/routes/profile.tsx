import { createFileRoute } from "@tanstack/react-router";
import { repositories } from "@/data/repositories.json";
import { educations } from "@/data/educations.json";
import { jobs } from "@/data/jobs.json";
import { Badge } from "@/components/ui/badge";
import { Education, Job, Repository } from "@/types";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <JobList jobs={jobs} />
        <RepoList repos={repositories} />
        <EducationList educations={educations} />
      </div>
    </div>
  );
}

function EducationList({ educations }: { educations: Education[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">Education</h1>
      <ul>
        {educations.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))}
      </ul>
    </div>
  );
}

function EducationCard({ education }: { education: Education }) {
  return (
    <div className="shadow border p-4" key={education.school}>
      <p>{education.school}</p>
      <p>{education.degree}</p>
      <p>{education.location}</p>
      <div className="flex gap-2">
        <p>{education.start_date}</p>
        <p>{education.end_date}</p>
      </div>
    </div>
  );
}

function RepoList({ repos }: { repos: Repository[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}

function RepoCard({ repo }: { repo: Repository }) {
  return (
    <div className="shadow border p-4" key={repo.id}>
      <p>{repo.name}</p>
      <p>{repo.description}</p>
      <div className="flex gap-2">
        {repo.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}

function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <JobsCard key={job.id} job={job} />
        ))}
      </ul>
    </div>
  );
}

function JobsCard({ job }: { job: Job }) {
  return (
    <div className="shadow border p-4" key={job.id}>
      <p>{job.title}</p>
      <p>{job.description}</p>
      <p>{job.location}</p>
      <div className="flex gap-2">
        <p>{job.start_date}</p>
        to
        <p>{job.end_date}</p>
      </div>
      <div className="flex gap-2">
        {job.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
