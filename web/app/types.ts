export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  start_date: string;
  end_date: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  tags: string[];
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
}
