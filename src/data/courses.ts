export interface Course {
  id: string
  name: string
  shortName: string
  price: number
  category: string
  description: string
  features: string[]
  modules: string[]
  thumbnail: string
}

export const courses: Course[] = [
  {
    id: "canva",
    name: "Canva Complete Course",
    shortName: "Canva",
    price: 197,
    category: "Design",
    thumbnail: "canva",
    description:
      "Master Canva and learn how to create professional graphics, social media posts, posters, thumbnails, presentations and other stunning visual content.",
    features: [
      "Canva fundamentals",
      "Professional designs",
      "Social media graphics",
      "Posters & banners",
      "YouTube thumbnails",
      "Practical projects",
    ],
    modules: [
      "Getting started with Canva",
      "Layouts, typography & color",
      "Creating social media graphics",
      "Posters, banners & thumbnails",
      "Presentations & practical design projects",
      "Exporting and sharing your work",
    ],
  },
  {
    id: "video-editing",
    name: "Video Editing Complete Course",
    shortName: "Video Editing",
    price: 197,
    category: "Video",
    thumbnail: "video",
    description:
      "Learn professional video editing techniques and create engaging videos for YouTube, Instagram and other platforms.",
    features: [
      "Video editing basics",
      "Cutting & trimming",
      "Transitions",
      "Text & effects",
      "Audio editing",
      "Social media videos",
    ],
    modules: [
      "Introduction to video editing",
      "Working with footage & timelines",
      "Cutting, trimming & transitions",
      "Text, titles & visual effects",
      "Audio editing essentials",
      "Exporting videos for social media",
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT Complete Course",
    shortName: "ChatGPT",
    price: 197,
    category: "AI & Productivity",
    thumbnail: "chatgpt",
    description:
      "Learn how to use ChatGPT effectively for learning, content creation, productivity, research and everyday work.",
    features: [
      "ChatGPT basics",
      "Prompting",
      "Content creation",
      "Productivity",
      "AI tools",
      "Practical use cases",
    ],
    modules: [
      "Getting to know ChatGPT",
      "Writing effective prompts",
      "Creating & refining content",
      "Research and checking AI outputs",
      "Everyday productivity & AI tools",
      "Practical use cases",
    ],
  },
  {
    id: "facebook-ads",
    name: "Facebook Ads Complete Course",
    shortName: "Facebook Ads",
    price: 197,
    category: "Marketing",
    thumbnail: "facebook",
    description:
      "Learn the fundamentals of Facebook advertising and understand how to create and manage effective ad campaigns.",
    features: [
      "Facebook Ads basics",
      "Campaign creation",
      "Audience targeting",
      "Ad creatives",
      "Budgeting",
      "Campaign optimization",
    ],
    modules: [
      "Introduction to Facebook Ads",
      "Campaign objectives & setup",
      "Understanding your audience",
      "Building effective ad creatives",
      "Budgets & campaign management",
      "Reading results & optimizing campaigns",
    ],
  },
  {
    id: "wordpress",
    name: "WordPress Complete Course",
    shortName: "WordPress",
    price: 197,
    category: "Web Development",
    thumbnail: "wordpress",
    description:
      "Learn how to create and manage professional websites using WordPress.",
    features: [
      "WordPress basics",
      "Website setup",
      "Themes",
      "Plugins",
      "Pages & menus",
      "Website customization",
    ],
    modules: [
      "Introduction to WordPress",
      "Setting up your website",
      "Choosing & customizing a theme",
      "Working with plugins",
      "Creating pages & navigation",
      "Managing and maintaining your site",
    ],
  },
  {
    id: "2d-animation",
    name: "2D Animation Complete Course",
    shortName: "2D Animation",
    price: 197,
    category: "Animation",
    thumbnail: "animation",
    description:
      "Learn the fundamentals of 2D animation and create engaging animated content from scratch.",
    features: [
      "Animation fundamentals",
      "Characters",
      "Motion",
      "Scenes",
      "Basic effects",
      "Practical projects",
    ],
    modules: [
      "Principles of 2D animation",
      "Creating your characters",
      "Working with motion & keyframes",
      "Building scenes",
      "Adding basic effects",
      "Your first animation project",
    ],
  },
]

export const bundle: Course = {
  id: "all-courses",
  name: "Ultimate Digital Skills Bundle",
  shortName: "All 6 Courses",
  price: 99,
  category: "Complete Bundle",
  thumbnail: "bundle",
  description:
    "Get access to all featured courses at one special bundle price. Build your toolkit with design, video, AI, advertising, websites and animation.",
  features: courses.map((course) => course.shortName),
  modules: courses.map((course) => course.name),
}
