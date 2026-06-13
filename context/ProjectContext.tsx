'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface ProjectDetail {
  id: number;
  name: string;
  title: string;
  description: string;
  branding: string;
  bgImage: string;
  coverImage: string;
  marginTopMobile: string;
  marginTopLaptop: string;
  Link: string;
  SiteLink: string;
  cardBgColor?: string;
  cardTextColor?: string;
  img_config?: {
    object_fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    max_width?: string;
    max_height?: string;
  };
  DesignSystem?: {
    colors: {
      primary: string[];
      secondary: string[];
      neutral: string[];
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      sizes: string[];
    };
    spacing: string[];
    borderRadius: string[];
    shadows: {
      name: string;
      value: string;
    }[];
    breakpoints: {
      name: string;
      value: string;
    }[];
    components: string[];
    designPrinciples?: string[];
    pages?: {
      name: string;
      description: string;
      image: string;
      features: string[];
    }[];
  };
  Brand1: string;
  Brand2: string;
  desc1: string;
  desc2: string;
}

const ProjectContext = createContext<ProjectDetail[]>([]);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const ProjectDetails: ProjectDetail[] = [
    {
      id: 1,
      name: "bonusgalaxy",
      title: "Bonus Galaxy",
      description: "Gamified Loyalty Platform",
      branding: "Design & Development",
      bgImage:
        "https://bonus-galaxy-demo.vercel.app/images/captaion-klaus.jpg",
      coverImage: "https://bonus-galaxy-demo.vercel.app/images/bonus-galaxy-logo.png",
      marginTopMobile: "mt-3",
      marginTopLaptop: "mt-12",
      Link: "/work/bonusgalaxy",
      SiteLink: "https://bonus-galaxy-demo.vercel.app/",
      cardBgColor: "#0a0e27",
      cardTextColor: "#ffffff",
      img_config: {
        object_fit: "contain",
        max_width: "700px",
        max_height: "600px",
      },
      DesignSystem: {
        colors: {
          primary: ["#0a0e27", "#1a1f4a", "#2a3f6a"],
          secondary: ["#ff6b35", "#f7931e", "#ffd700"],
          neutral: ["#ffffff", "#f5f5f5", "#333333"]
        },
        typography: {
          headingFont: "Inter, sans-serif",
          bodyFont: "Inter, sans-serif",
          sizes: ["14px", "16px", "18px", "24px", "32px", "48px", "64px"]
        },
        spacing: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"],
        borderRadius: ["4px", "8px", "12px", "16px", "24px", "9999px"],
        shadows: [
          { name: "Small", value: "0 1px 3px rgba(0,0,0,0.12)" },
          { name: "Medium", value: "0 4px 6px rgba(0,0,0,0.16)" },
          { name: "Large", value: "0 10px 20px rgba(0,0,0,0.19)" }
        ],
        breakpoints: [
          { name: "Mobile", value: "320px - 768px" },
          { name: "Tablet", value: "768px - 1024px" },
          { name: "Desktop", value: "1024px+" }
        ],
        components: ["Hero Section", "Character Cards", "Mission Cards", "CTA Buttons", "Partner Marquee", "Stats Display", "Navigation Bar", "Footer"],
        designPrinciples: [
          "Immersive space-themed experience",
          "Gamification-first approach",
          "Clear visual hierarchy",
          "Engaging animations and transitions",
          "Mobile-responsive design"
        ],
        pages: [
          {
            name: "Home Page",
            description: "The main landing page featuring the galactic adventure theme with Captain Klaus and the Nebukadneza spaceship. Introduces the loyalty program concept through storytelling.",
            image: "https://bonus-galaxy-demo.vercel.app/images/captaion-klaus.jpg",
            features: [
              "Hero section with animated background",
              "30 Years of 4-Star Hotel Luxury headline",
              "Partner brand marquee (Red Bull, Swarovski, etc.)",
              "Mission introduction with Captain Klaus",
              "Crew member showcase cards",
              "How it works section",
              "Stats display (200K+ viewers, 30 years prizes)",
              "Waitlist signup form"
            ]
          },
          {
            name: "Mission & Crew",
            description: "Detailed view of the spaceship crew members and their roles in the galactic expedition. Each character has unique personality and responsibilities.",
            image: "https://bonus-galaxy-demo.vercel.app/images/traveling-20joe.jpg",
            features: [
              "Character profile cards",
              "Role descriptions",
              "Interactive hover effects",
              "Crew hierarchy visualization",
              "Mission objectives"
            ]
          },
          {
            name: "Rewards System",
            description: "Explains how users collect Nequada currency and redeem rewards. Shows the gamification mechanics and prize structure.",
            image: "https://bonus-galaxy-demo.vercel.app/images/blockchain-bob.jpg",
            features: [
              "Nequada collection explanation",
              "Reward redemption process",
              "Leaderboard preview",
              "Daily challenges",
              "Prize showcase"
            ]
          }
        ]
      },
      Brand1: "Design",
      Brand2: "Development",
      desc1: "Bonus Galaxy transforms everyday purchases into an immersive space adventure. Help power the Nebukadneza spaceship by turning transactions into experiences with Captain Klaus and his crew.",
      desc2: "A next-generation loyalty program that gamifies rewards through an engaging galactic narrative. Collect Nequada currency, complete missions, and compete for the ultimate prize: 30 years of 4-star hotel vacations."
    },
    {
      id: 2,
      name: "upd",
      title: "Unlimited Perfect Deals",
      description: "Inventory Liquidation Marketplace",
      branding: "Design & Development",
      bgImage:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1500&fit=crop",
      coverImage: "https://demo-upd-123.vercel.app/logo.svg",
      marginTopMobile: "mt-3",
      marginTopLaptop: "mt-12",
      Link: "/work/upd",
      SiteLink: "https://demo-upd-123.vercel.app/",
      cardBgColor: "#f8f9fa",
      cardTextColor: "#1b1c1f",
      img_config: {
        object_fit: "contain",
        max_width: "500px",
        max_height: "450px",
      },
      DesignSystem: {
        colors: {
          primary: ["#1a1a1a", "#2d2d2d", "#404040"],
          secondary: ["#4a90e2", "#5ca0f2", "#6eb0ff"],
          neutral: ["#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6"]
        },
        typography: {
          headingFont: "Inter, sans-serif",
          bodyFont: "Inter, sans-serif",
          sizes: ["12px", "14px", "16px", "18px", "24px", "32px", "48px"]
        },
        spacing: ["4px", "8px", "12px", "16px", "20px", "24px", "32px", "48px"],
        borderRadius: ["4px", "8px", "12px", "16px", "20px"],
        shadows: [
          { name: "Card", value: "0 2px 4px rgba(0,0,0,0.1)" },
          { name: "Hover", value: "0 4px 8px rgba(0,0,0,0.15)" },
          { name: "Modal", value: "0 8px 16px rgba(0,0,0,0.2)" }
        ],
        breakpoints: [
          { name: "Mobile", value: "320px - 640px" },
          { name: "Tablet", value: "640px - 1024px" },
          { name: "Desktop", value: "1024px+" }
        ],
        components: ["Product Cards", "Deal Cards", "Category Filters", "Hero Banner", "Newsletter Form", "Footer Navigation", "Search Bar", "Watchlist Button", "Admin Dashboard", "Data Tables", "Analytics Charts"],
        designPrinciples: [
          "Clean and minimal interface",
          "Trust and transparency",
          "Easy navigation and filtering",
          "Clear pricing and discounts",
          "Fast loading and performance",
          "Secure admin access control"
        ],
        pages: [
          {
            name: "Home Page",
            description: "The main landing page that introduces the inventory liquidation marketplace concept. Features hero section with value proposition and featured deals.",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1500&fit=crop",
            features: [
              "Hero banner with key messaging",
              "Three-column value proposition (Retailers, Consumers, Partners)",
              "Featured product carousel",
              "Category navigation",
              "Deal highlights with discount badges",
              "Newsletter signup",
              "Trust indicators"
            ]
          },
          {
            name: "Deals Page",
            description: "Browse all available deals with filtering and sorting options. Shows products from various retailers with clear pricing and discount information.",
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&fit=crop",
            features: [
              "Category filters (Electronics, Home & Garden, Clothing, etc.)",
              "Product grid layout",
              "Deal cards with images and pricing",
              "Discount percentage badges",
              "Watchlist functionality",
              "Retailer information",
              "Sort and filter options"
            ]
          },
          {
            name: "Product Detail",
            description: "Individual product page showing detailed information, pricing, and retailer details. Includes add to watchlist and purchase options.",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&fit=crop",
            features: [
              "Large product images",
              "Original vs. sale price comparison",
              "Discount percentage highlight",
              "Product description",
              "Retailer information",
              "Add to watchlist button",
              "Related deals section"
            ]
          },
          {
            name: "Admin Panel - Login",
            description: "Secure authentication page for admin access. Clean, professional design with email and password fields for platform management.",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1500&fit=crop",
            features: [
              "Email and password authentication",
              "Secure login form",
              "Admin branding",
              "Password visibility toggle",
              "Remember me option",
              "Forgot password link",
              "Security badge"
            ]
          },
          {
            name: "Admin Dashboard",
            description: "Comprehensive admin dashboard for managing deals, products, retailers, and platform analytics. Provides real-time insights and management tools.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1500&fit=crop",
            features: [
              "Analytics overview (sales, users, deals)",
              "Revenue charts and graphs",
              "Recent orders table",
              "Product management",
              "Deal approval workflow",
              "Retailer management",
              "User management",
              "Category management",
              "Inventory tracking",
              "Reports and exports"
            ]
          }
        ]
      },
      Brand1: "Design",
      Brand2: "Development",
      desc1: "Unlimited Perfect Deals helps retailers recover value from unsold, excess, and slow-moving inventory without damaging brand equity. A controlled marketplace that converts inventory risk into revenue.",
      desc2: "An intelligent liquidation system connecting retailers to consumers with a comprehensive admin panel for platform management. Retailers recover capital and reduce storage costs while consumers access high-quality products at exceptional value from verified retailers."
    },
    {
      id: 3,
      name: "lait911",
      title: "LAIT911",
      description: "Emergency Response Mobile App",
      branding: "Mobile App Development",
      bgImage:
        "https://socalwildfire.org/wp-content/uploads/2025/07/LADRT-Team.jpg",
      coverImage: "https://play-lh.googleusercontent.com/xCF9zkX2VlJozY_3HwVNZPOZorCKYbpveKojPpKJ7mW0vjL8q7VwVCFLEONtECVg5Q=w480-h960-rw",
      marginTopMobile: "mt-3",
      marginTopLaptop: "mt-12",
      Link: "/work/lait911",
      SiteLink: "https://socalwildfire.org/",
      cardBgColor: "#d32f2f",
      cardTextColor: "#ffffff",
      img_config: {
        object_fit: "contain",
        max_width: "300px",
        max_height: "300px",
      },
      DesignSystem: {
        colors: {
          primary: ["#d32f2f", "#c62828", "#b71c1c"],
          secondary: ["#ff6f00", "#ff8f00", "#ffa000"],
          neutral: ["#ffffff", "#f5f5f5", "#212121", "#424242"]
        },
        typography: {
          headingFont: "Roboto, sans-serif",
          bodyFont: "Roboto, sans-serif",
          sizes: ["12px", "14px", "16px", "18px", "20px", "24px", "32px"]
        },
        spacing: ["4px", "8px", "12px", "16px", "20px", "24px", "32px"],
        borderRadius: ["4px", "8px", "12px", "16px", "24px"],
        shadows: [
          { name: "Card", value: "0 2px 4px rgba(0,0,0,0.1)" },
          { name: "Alert", value: "0 4px 12px rgba(211,47,47,0.3)" },
          { name: "Map", value: "0 8px 16px rgba(0,0,0,0.2)" }
        ],
        breakpoints: [
          { name: "Mobile", value: "320px - 768px" },
          { name: "Tablet", value: "768px - 1024px" },
          { name: "Desktop", value: "1024px+" }
        ],
        components: ["Incident Cards", "Interactive Map", "Push Notifications", "Alert Badges", "Location Markers", "Timeline View", "Filter Controls", "Emergency Buttons", "Radio Scanner", "Apparatus Tracker"],
        designPrinciples: [
          "Critical information first",
          "Real-time updates and accuracy",
          "Clear visual hierarchy for emergencies",
          "Accessible during high-stress situations",
          "Minimal data usage for reliability",
          "Location-based intelligence"
        ],
        pages: [
          {
            name: "Active Incidents Map",
            description: "Real-time interactive map showing all active emergency incidents across Los Angeles. Displays fires, traffic collisions, medical emergencies, and police activity as they happen.",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1500&fit=crop",
            features: [
              "Live incident markers on interactive map",
              "Color-coded by incident type (fire, medical, traffic)",
              "Detailed location with cross streets",
              "Responding units and apparatus",
              "Time stamps and incident updates",
              "Zoom and pan controls",
              "Filter by incident type",
              "Neighborhood boundaries"
            ]
          },
          {
            name: "Incident List View",
            description: "Chronological list of active incidents with detailed information. Shows incident type, location, responding units, and time elapsed since dispatch.",
            image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=1500&fit=crop",
            features: [
              "Real-time incident feed",
              "Incident type badges (Fire, Medical, Traffic, Police)",
              "Precise address and cross streets",
              "Responding apparatus list",
              "Time elapsed indicator",
              "Tap to view on map",
              "Pull to refresh",
              "Search and filter options"
            ]
          },
          {
            name: "Push Notifications",
            description: "Time-sensitive emergency alerts sent directly to users' devices. Priority alerts for major incidents, wildfires, and safety-critical events in user's area.",
            image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1500&fit=crop",
            features: [
              "Location-based alerts",
              "Priority/time-sensitive notifications",
              "Incident preview in notification",
              "Long-press for nearby map",
              "Customizable alert radius",
              "Incident type filtering",
              "Do Not Disturb override for critical alerts",
              "SMS backup notifications"
            ]
          },
          {
            name: "Wildfire Tracking",
            description: "Advanced wildfire detection and tracking system. Provides real-time updates on active wildfires, containment status, evacuation zones, and air quality information.",
            image: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?w=1500&fit=crop",
            features: [
              "Active wildfire locations",
              "Fire perimeter mapping",
              "Containment percentage",
              "Evacuation zones and orders",
              "Air quality index (AQI)",
              "Wind speed and direction",
              "Fire weather warnings",
              "Historical fire data"
            ]
          },
          {
            name: "Apparatus Tracker",
            description: "Real-time tracking of fire trucks, ambulances, and emergency vehicles. Shows unit status, location, and incident assignments.",
            image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1500&fit=crop",
            features: [
              "Live apparatus locations",
              "Unit status (available, responding, on-scene)",
              "Incident assignments",
              "Station information",
              "Response times",
              "Unit type and capabilities",
              "Historical response data",
              "Favorite units tracking"
            ]
          },
          {
            name: "Radio Scanner",
            description: "Live fire department radio transmissions. Listen to real-time communications from LAFD and other emergency services during active incidents.",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1500&fit=crop",
            features: [
              "Live radio audio streams",
              "Multiple channel selection",
              "Incident-linked audio",
              "Background playback",
              "Audio quality controls",
              "Channel descriptions",
              "Recording timestamps",
              "Emergency traffic priority"
            ]
          },
          {
            name: "Historical Incidents",
            description: "Search and view past emergency incidents. Analyze patterns, response times, and incident trends across Los Angeles.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1500&fit=crop",
            features: [
              "Date range search",
              "Location-based filtering",
              "Incident type filters",
              "Response time analytics",
              "Incident details and outcomes",
              "Export data functionality",
              "Trend visualization",
              "Neighborhood statistics"
            ]
          }
        ]
      },
      Brand1: "Mobile App",
      Brand2: "Emergency Tech",
      desc1: "LAIT911 (now Southern California Wildfire Response) is a volunteer-driven nonprofit providing real-time emergency alerts and incident tracking across Los Angeles. The mobile app delivers critical safety information during wildfires, floods, medical emergencies, and major incidents.",
      desc2: "The most advanced emergency notification system for Los Angeles, featuring real-time incident mapping, push alerts, wildfire tracking, apparatus monitoring, and live radio scanner. Sourced from official 911 dispatch systems and verified by trained incident analysts to keep communities safe and informed."
    },
    {
      id: 4,
      name: "heatbubble",
      title: "HeatBubble",
      description: "Temperature Monitoring App",
      branding: "Mobile App Development",
      bgImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1500&fit=crop",
      coverImage: "https://play-lh.googleusercontent.com/V4GEkDkF_FggTZ0MHguWctTcsdbLtcrZ4qODXjNZaaITcj36h9t0rmRYn3WsQRM1KPhvwLX25y3x2BA6BsYSr7c=w480-h960-rw",
      marginTopMobile: "mt-3",
      marginTopLaptop: "mt-12",
      Link: "/work/heatbubble",
      SiteLink: "https://play.google.com/store/apps/details?id=com.heatbubble.app",
      cardBgColor: "linear-gradient(to bottom right, #FF6B6B, #4ECDC4)",
      cardTextColor: "#ffffff",
      img_config: {
        object_fit: "contain",
        max_width: "400px",
        max_height: "400px",
      },
      DesignSystem: {
        colors: {
          primary: ["#FF6B6B", "#FF8E53", "#FFA07A"],
          secondary: ["#4ECDC4", "#45B7D1", "#96CEB4"],
          neutral: ["#ffffff", "#f8f9fa", "#2C3E50", "#34495E"]
        },
        typography: {
          headingFont: "Roboto, sans-serif",
          bodyFont: "Roboto, sans-serif",
          sizes: ["12px", "14px", "16px", "18px", "20px", "24px", "32px"]
        },
        spacing: ["4px", "8px", "12px", "16px", "20px", "24px", "32px"],
        borderRadius: ["8px", "12px", "16px", "20px", "24px", "9999px"],
        shadows: [
          { name: "Card", value: "0 2px 8px rgba(0,0,0,0.1)" },
          { name: "Widget", value: "0 4px 12px rgba(255,107,107,0.2)" },
          { name: "Alert", value: "0 6px 16px rgba(255,107,107,0.3)" }
        ],
        breakpoints: [
          { name: "Mobile", value: "320px - 768px" },
          { name: "Tablet", value: "768px - 1024px" },
          { name: "Desktop", value: "1024px+" }
        ],
        components: ["Temperature Display", "Chart Widgets", "Alert Cards", "Home Screen Widget", "Settings Panel", "History Timeline", "Premium Badge", "Gradient Backgrounds"],
        designPrinciples: [
          "Beautiful gradient interface",
          "Intuitive temperature visualization",
          "Smooth animations and transitions",
          "Warm color palette reflecting temperature",
          "Easy-to-read charts and graphs",
          "Battery-efficient background monitoring"
        ],
        pages: [
          {
            name: "Real-Time Temperature Monitor",
            description: "Main dashboard showing current device temperature with live sensor readings. Features an intuitive interface with accurate temperature display.",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1500&fit=crop",
            features: [
              "Live temperature readings from device sensors",
              "Large, easy-to-read temperature display",
              "Celsius, Fahrenheit, and Kelvin units",
              "Battery and CPU temperature tracking",
              "Real-time sensor data updates",
              "Gradient background reflecting temperature",
              "Quick access to settings",
              "Home screen widget support"
            ]
          },
          {
            name: "Charts & History",
            description: "Visualize temperature trends over time with elegant charts. View hourly, daily, and weekly patterns to understand device thermal behavior.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1500&fit=crop",
            features: [
              "Beautiful line charts",
              "Hourly temperature patterns",
              "Daily trend analysis",
              "Weekly thermal overview",
              "Temperature range indicators",
              "Peak temperature markers",
              "Zoom and pan controls",
              "Export chart data"
            ]
          },
          {
            name: "Smart Temperature Alerts",
            description: "Get notified when temperature exceeds safe thresholds. Set custom alerts for specific needs with premium features.",
            image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1500&fit=crop",
            features: [
              "Custom temperature thresholds",
              "Push notifications for alerts",
              "Personalized alert settings (Premium)",
              "Multiple alert levels",
              "Sound and vibration options",
              "Alert history log",
              "Snooze functionality",
              "Critical temperature warnings"
            ]
          },
          {
            name: "AI-Powered Insights",
            description: "Receive intelligent recommendations based on temperature data. AI analyzes patterns and suggests optimal usage habits.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1500&fit=crop",
            features: [
              "Pattern recognition",
              "Usage habit recommendations",
              "Thermal behavior analysis",
              "Optimization suggestions",
              "Gaming session insights",
              "Charging optimization tips",
              "Device health predictions",
              "Personalized advice"
            ]
          },
          {
            name: "Cloud Sync & Backup",
            description: "Sign in to sync data across devices and never lose temperature history. Firebase-powered secure cloud storage.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1500&fit=crop",
            features: [
              "Cross-device synchronization",
              "Automatic cloud backup",
              "Firebase integration",
              "Data encryption in transit and at rest",
              "Restore from backup",
              "Multi-device support",
              "Optional cloud storage",
              "Delete account anytime"
            ]
          },
          {
            name: "Premium Features",
            description: "Upgrade to HeatBubble Premium for advanced features including custom alerts, ad-free experience, and unlimited data history.",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1500&fit=crop",
            features: [
              "Custom temperature alerts with thresholds",
              "Ad-free experience",
              "Advanced analytics and insights",
              "Priority cloud sync",
              "Unlimited data history",
              "Premium support",
              "Early access to new features",
              "Exclusive gradient themes"
            ]
          }
        ]
      },
      Brand1: "Mobile App",
      Brand2: "Utility",
      desc1: "HeatBubble is your pocket temperature tracker that monitors device temperature in real-time using advanced sensor technology. Track temperature readings, analyze trends, and receive intelligent alerts when things heat up.",
      desc2: "A modern, gradient interface with smooth animations and intuitive navigation. Perfect for monitoring device health during intensive tasks, gaming sessions, charging optimization, and understanding thermal patterns. Features AI-powered insights, beautiful charts, cloud sync, and premium upgrades."
    },
  ];

  return (
    <ProjectContext.Provider value={ProjectDetails}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);

export default ProjectContext;
