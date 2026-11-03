import records from "./success-stories.json";

// Recovered from the live published site (https://www.habilesec.com/resources/success-stories).
// Narrative text is the site's own copy, split into introduction/challenge/approach/outcome
// only where the original sentences already support that structure; no facts are invented.
export type SuccessStory = {
  id: string;
  slug: string;
  title: string;
  company: string;
  industry: string;
  category: string;
  excerpt: string;
  introduction: string;
  challenge: string;
  approach: string;
  outcome: string;
  relatedServices: string[];
  image: string | null;
  logo: string | null;
  published: boolean;
  createdAt: string;
};
export function getSuccessStories(): SuccessStory[] {
  return records.filter(story => story.published);
}
export function getSuccessStory(slug: string): SuccessStory | undefined {
  return getSuccessStories().find(story => story.slug === slug);
}
export function getRelatedStories(slug: string, count = 3): SuccessStory[] {
  return getSuccessStories().filter(story => story.slug !== slug).slice(0, count);
}
