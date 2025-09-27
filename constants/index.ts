import {
  IconAccessible,
  IconActivityHeartbeat,
  IconArrowsMinimize,
  IconBasketMinus,
  IconBriefcase,
  IconClipboardText,
  IconClock,
  IconCreditCardPay,
  IconCreditCardRefund,
  IconEyeClosed,
  IconFileDislike,
  IconFileLike,
  IconFlagExclamation,
  IconLayoutDashboard,
  IconSettings,
  IconUsersGroup,
} from "@tabler/icons-react";
import {
  Banknote,
  BriefcaseBusiness,
  Crown,
  Lightbulb,
  User,
  UserRoundPen,
  Users,
  UsersRound,
} from "lucide-react";

export const EMAIL_ADDRESS = "contact@grabcash.com";
export const PHONE_NUMBER = "+234 800 233 4433";
export const YOUTUBE_URL = "www.youtube.com";
export const INSTAGRAM_URL = "www.instagram.com";
export const FACEBOOK_URL = "www.facebook.com";
export const X_URL = "www.x.com";

export const DEFAULT_PROFILE_PICTURE =
  "http://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

export const identificationTypes = ["NIN", "BVN"];

export const GRABCASH_LOGO =
  "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg";

export const CREDIT_TO_POST_NEW_JOB = 6;

export const DEFAULT_LIMIT = 10;

export const rootNavLinks = [
  {
    slug: "/about",
    label: "About",
  },
  {
    slug: "/blogs",
    label: "Blogs",
  },
  {
    slug: "/faqs",
    label: "FAQs",
  },
  {
    slug: "/contact",
    label: "Contact us",
  },
];

export const memberNavLinks = [
  {
    label: "Jobs and Campaigns",
    submenu: true,
    items: [
      {
        slug: "/available-jobs",
        label: "Available jobs",
      },
      {
        slug: "/submitted-jobs",
        label: "Submitted jobs",
      },
      {
        slug: "/jobs",
        label: "My jobs",
      },
      {
        slug: "/new-job",
        label: "Post new job",
      },
      {
        slug: "/drafts",
        label: "My Drafts",
      },
    ],
  },
  // {
  //   slug: "/credits",
  //   label: "Credits",
  // },
  {
    slug: "/wallet",
    label: "Wallet",
  },
  // {
  //   slug: "/academy",
  //   label: "Academy",
  // },
  // {
  //   slug: "/community",
  //   label: "Community",
  // },
];

export const footer = [
  {
    title: "grabcash",
    links: [
      {
        slug: "/register",
        label: "Get started",
      },
      {
        slug: "/subscriptions",
        label: "Pricing",
      },
      {
        slug: "/help-center",
        label: "Help center",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        slug: "/about",
        label: "About us",
      },
      {
        slug: "/blog",
        label: "Blog",
      },
      {
        slug: "/faqs",
        label: "FAQs",
      },
      {
        slug: "/contact",
        label: "Contact us",
      },
    ],
  },
  {
    title: "Social media",
    links: [
      {
        slug: "www.youtube.com",
        label: "Youtube",
      },
      {
        slug: "www.facebook.com",
        label: "Facebook",
      },
      {
        slug: "www.instagram.com",
        label: "Instagram",
      },
      {
        slug: "www.x.com",
        label: "X",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        slug: "/terms-of-use",
        label: "Terms of use",
      },
      {
        slug: "/privacy-policy",
        label: "Privacy policy",
      },
      {
        slug: "/cookies",
        label: "Cookies",
      },
      {
        slug: "/affiliate-agreement",
        label: "Affiliate agreement",
      },
      {
        slug: "/partner-agreement",
        label: "Partner agreement",
      },
      // {
      //   slug: "/refund-policy",
      //   label: "Refund policy",
      // },
    ],
  },
];

export const howDetails = [
  {
    icon: BriefcaseBusiness,
    title: "Verified Micro-Jobs & Campaigns",
    subTitle:
      "Earn effortlessly by completing simple tasks from verified brands and businesses.",
    description:
      "From engaging with content to reviewing products, every task is beginner-friendly, guided, and pays instantly upon verification. Whether you have 5 minutes or 1 hour, there’s always something you can do to earn real money.",
  },
  {
    icon: Banknote,
    title: "Up to 15% Cashback",
    subTitle:
      "Get rewarded while you shop with exclusive cashback deals from partnered brands.",
    description:
      "Browse through our growing list of partner stores, make purchases through your unique links, and enjoy cashback rewards — up to 15% back on what you spend. Stack savings and turn everyday spending into earning!",
  },
  {
    icon: Lightbulb,
    title: "Learn & Level Up",
    subTitle:
      "Grow your skills while earning with our on-platform learning hub.",
    description:
      "Access bite-sized courses and resources on affiliate marketing, content strategy, digital growth, and social media. Whether you're just starting or looking to grow, you’ll find tools to help you earn smarter.",
  },
  {
    icon: UsersRound,
    title: "Trusted Community",
    subTitle: "Join a vibrant network of digital earners and achievers.",
    description:
      "Connect with others through forums, climb the leaderboard, and unlock champion rewards as you complete tasks. Our platform celebrates your progress, so every effort moves you forward in the community.",
  },
];

export const subjects = [
  "General enquiry",
  "Technical support",
  "Payment support",
];

export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const banks = [
  { bankName: "Access Bank", bankCode: "044" },
  { bankName: "Citibank Nigeria", bankCode: "023" },
  { bankName: "Ecobank Nigeria", bankCode: "050" },
  { bankName: "Fidelity Bank", bankCode: "070" },
  { bankName: "First Bank of Nigeria", bankCode: "011" },
  { bankName: "First City Monument Bank (FCMB)", bankCode: "214" },
  { bankName: "Globus Bank", bankCode: "00103" },
  { bankName: "Guaranty Trust Bank (GTBank)", bankCode: "058" },
  { bankName: "Heritage Bank", bankCode: "030" },
  { bankName: "Keystone Bank", bankCode: "082" },
  { bankName: "Polaris Bank", bankCode: "076" },
  { bankName: "Providus Bank", bankCode: "101" },
  { bankName: "Stanbic IBTC Bank", bankCode: "221" },
  { bankName: "Standard Chartered Bank", bankCode: "068" },
  { bankName: "Sterling Bank", bankCode: "232" },
  { bankName: "SunTrust Bank", bankCode: "100" },
  { bankName: "Titan Trust Bank", bankCode: "102" },
  { bankName: "Union Bank of Nigeria", bankCode: "032" },
  { bankName: "United Bank for Africa (UBA)", bankCode: "033" },
  { bankName: "Unity Bank", bankCode: "215" },
  { bankName: "Wema Bank", bankCode: "035" },
  { bankName: "Zenith Bank", bankCode: "057" },
];

export const filters = [
  {
    value: "high-paying",
    label: "High paying",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
];

export const jobTypes = [
  {
    value: "micro",
    label: "Micro-Job (simple, one-time tasks)",
  },
  {
    value: "bounty",
    label:
      "Bounty Campaign (multi-step or content-based tasks with bigger rewards)",
  },
];

export const jobCategories = [
  // Digital Marketing & Social Media
  {
    value: "Social Media Management",
    label: "Social Media Management",
  },
  {
    value: "Social Media Engagement",
    label: "Social Media Engagement",
  },
  {
    value: "Content Creation",
    label: "Content Creation",
  },
  {
    value: "Instagram Marketing",
    label: "Instagram Marketing",
  },
  {
    value: "TikTok Marketing",
    label: "TikTok Marketing",
  },
  {
    value: "YouTube Marketing",
    label: "YouTube Marketing",
  },
  {
    value: "Facebook Marketing",
    label: "Facebook Marketing",
  },
  {
    value: "Twitter Marketing",
    label: "Twitter Marketing",
  },
  {
    value: "Influencer Marketing",
    label: "Influencer Marketing",
  },
  {
    value: "Brand Promotion",
    label: "Brand Promotion",
  },

  // Content & Writing
  {
    value: "Article Writing",
    label: "Article Writing",
  },
  {
    value: "Blog Writing",
    label: "Blog Writing",
  },
  {
    value: "Copywriting",
    label: "Copywriting",
  },
  {
    value: "Product Descriptions",
    label: "Product Descriptions",
  },
  {
    value: "Reviews & Testimonials",
    label: "Reviews & Testimonials",
  },
  {
    value: "Proofreading & Editing",
    label: "Proofreading & Editing",
  },
  {
    value: "Translation Services",
    label: "Translation Services",
  },
  {
    value: "SEO Content Writing",
    label: "SEO Content Writing",
  },

  // Design & Creative
  {
    value: "Logo Design",
    label: "Logo Design",
  },
  {
    value: "Graphic Design",
    label: "Graphic Design",
  },
  {
    value: "Banner Creation",
    label: "Banner Creation",
  },
  {
    value: "Photo Editing",
    label: "Photo Editing",
  },
  {
    value: "Video Editing",
    label: "Video Editing",
  },
  {
    value: "Thumbnail Design",
    label: "Thumbnail Design",
  },
  {
    value: "UI/UX Design",
    label: "UI/UX Design",
  },
  {
    value: "Illustration",
    label: "Illustration",
  },

  // Technology & Programming
  {
    value: "Web Development",
    label: "Web Development",
  },
  {
    value: "App Development",
    label: "App Development",
  },
  {
    value: "Website Testing",
    label: "Website Testing",
  },
  {
    value: "Bug Testing",
    label: "Bug Testing",
  },
  {
    value: "Data Entry",
    label: "Data Entry",
  },
  {
    value: "Database Management",
    label: "Database Management",
  },
  {
    value: "WordPress Tasks",
    label: "WordPress Tasks",
  },
  {
    value: "Technical Support",
    label: "Technical Support",
  },

  // Business & Administration
  {
    value: "Virtual Assistant",
    label: "Virtual Assistant",
  },
  {
    value: "Lead Generation",
    label: "Lead Generation",
  },
  {
    value: "Market Research",
    label: "Market Research",
  },
  {
    value: "Survey Completion",
    label: "Survey Completion",
  },
  {
    value: "Email Management",
    label: "Email Management",
  },
  {
    value: "Customer Service",
    label: "Customer Service",
  },
  {
    value: "Online Research",
    label: "Online Research",
  },
  {
    value: "Transcription",
    label: "Transcription",
  },

  // Marketing & Sales
  {
    value: "Email Marketing",
    label: "Email Marketing",
  },
  {
    value: "Affiliate Marketing",
    label: "Affiliate Marketing",
  },
  {
    value: "Product Promotion",
    label: "Product Promotion",
  },
  {
    value: "Online Advertising",
    label: "Online Advertising",
  },
  {
    value: "Marketing Research",
    label: "Marketing Research",
  },
  {
    value: "Sales Support",
    label: "Sales Support",
  },
  {
    value: "Link Building",
    label: "Link Building",
  },
  {
    value: "SEO Tasks",
    label: "SEO Tasks",
  },

  // Audio & Video
  {
    value: "Video Creation",
    label: "Video Creation",
  },
  {
    value: "Audio Editing",
    label: "Audio Editing",
  },
  {
    value: "Voiceover Services",
    label: "Voiceover Services",
  },
  {
    value: "Podcast Editing",
    label: "Podcast Editing",
  },
  {
    value: "Music Promotion",
    label: "Music Promotion",
  },
  {
    value: "YouTube Services",
    label: "YouTube Services",
  },
  {
    value: "Live Streaming Support",
    label: "Live Streaming Support",
  },

  // Education & Training
  {
    value: "Online Tutoring",
    label: "Online Tutoring",
  },
  {
    value: "Course Creation",
    label: "Course Creation",
  },
  {
    value: "Educational Content",
    label: "Educational Content",
  },
  {
    value: "Training Material Development",
    label: "Training Material Development",
  },
  {
    value: "Language Teaching",
    label: "Language Teaching",
  },
  {
    value: "Skill Assessment",
    label: "Skill Assessment",
  },

  // E-commerce
  {
    value: "Product Listing",
    label: "Product Listing",
  },
  {
    value: "Store Management",
    label: "Store Management",
  },
  {
    value: "Order Processing",
    label: "Order Processing",
  },
  {
    value: "Customer Reviews",
    label: "Customer Reviews",
  },
  {
    value: "Price Research",
    label: "Price Research",
  },
  {
    value: "Inventory Management",
    label: "Inventory Management",
  },

  // Miscellaneous
  {
    value: "Gaming Tasks",
    label: "Gaming Tasks",
  },
  {
    value: "App Downloads & Reviews",
    label: "App Downloads & Reviews",
  },
  {
    value: "Survey Participation",
    label: "Survey Participation",
  },
  {
    value: "Simple Tasks",
    label: "Simple Tasks",
  },
  {
    value: "Data Collection",
    label: "Data Collection",
  },
  {
    value: "Online Contests",
    label: "Online Contests",
  },
];

export const estimatedTimeUnits = [
  {
    value: "hour",
    label: "Hour",
  },
  {
    value: "day",
    label: "Day",
  },
  {
    value: "month",
    label: "Month",
  },
];

export const estimatedTimes = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export const submissionTypes = [
  { value: "screenshots", label: "Screenshots" },
  // { value: "documents", label: "Documents" },
  // { value: "link", label: "Link" },
  // { value: "shortText", label: "Short Text" },
  // { value: "longParagraph", label: "Long Paragraph" },
];

type ButtonVariant =
  | "outline"
  | "default"
  | "link"
  | "destructive"
  | "secondary"
  | "ghost";

export const subscriptionPlans: {
  name: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
  buttonVariant: ButtonVariant | null | undefined;
  badge: string | null;
}[] = [
  {
    name: "Basic",
    price: {
      monthly: "0",
      annually: "0",
    },
    description:
      "Basic access with essential features — perfect for exploring grabcash and getting started.",
    features: [
      "Limited access to earning opportunities",
      "Basic task feed with concise search",
    ],
    buttonVariant: "default",
    badge: null,
  },
  {
    name: "Pro",
    price: {
      monthly: "900",
      annually: "10000",
    },
    description:
      "Unlock the full grabcash experience — access all earning tools, campaigns, and learning resources.",
    features: [
      "Access real, verified earning tasks",
      "Weekly payouts to your bank or wallet",
      "Join bounty campaigns & create job listings",
      "Earn from referrals & affiliate programs",
      "Full access to the grabcash Academy",
      "Advanced search & filtering tools",
      "Eligibility for Leaderboards & Hall of Champions",
      "Premium customer support",
    ],
    buttonVariant: "default",
    badge: "Popular",
  },
];

export const userDropdownLinks = [
  {
    icon: Crown,
    slug: "/subscriptions",
    label: "Get grabcash+",
  },
  {
    icon: Users,
    slug: "/top-members",
    label: "Top members",
  },
  {
    icon: User,
    slug: "/settings",
    label: "Settings",
  },
];

export const DEFAULT_COMMISSION = 10;

export const adminNavLinks = [
  {
    title: "Dashboard",
    slug: "/admin/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    title: "Users",
    slug: "/admin/users",
    icon: IconUsersGroup,
  },
  {
    title: "Jobs",
    icon: IconBriefcase,
    group: true,
    items: [
      {
        title: "All Jobs",
        slug: "/admin/jobs",
        icon: IconBriefcase,
      },
      {
        title: "Active Jobs",
        slug: "/admin/jobs/active",
        icon: IconActivityHeartbeat,
      },
      {
        title: "Closed Jobs",
        slug: "/admin/jobs/closed",
        icon: IconEyeClosed,
      },
    ],
  },
  {
    title: "Submissions",
    slug: "/admin/submissions",
    icon: IconClipboardText,
  },
  {
    title: "Transactions",
    icon: IconCreditCardPay,
    group: true,
    items: [
      {
        title: "Job Payments",
        slug: "/admin/payments",
        icon: IconCreditCardPay,
      },
      {
        title: "Withdrawals",
        slug: "/admin/withdrawals",
        icon: IconBasketMinus,
      },
      {
        title: "Subscriptions",
        slug: "/admin/subscriptions",
        icon: IconAccessible,
      },
      // {
      //   title: "Refunds / Disputes",
      //   slug: "/admin/refunds",
      //   icon: IconCreditCardRefund,
      // },
    ],
  },
  {
    title: "Exit",
    slug: "/available-jobs",
    icon: IconArrowsMinimize,
  },
];

export const DEFAULT_MINIMUM_PAYOUT = 5000;
export const DEFAULT_WITHDRAWAL_FEE = 5.5;
export const PLATFORM_NAME = "Grabcash";
