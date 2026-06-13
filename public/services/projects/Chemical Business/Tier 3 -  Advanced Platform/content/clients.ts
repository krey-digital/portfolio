/**
 * Client Content Model
 * 
 * This file contains the hardcoded client logo data for the chemical business website.
 * All content is static and managed through code updates and redeployment.
 * 
 * Validates Requirements: 9.3, 17.3, 17.5
 */

export interface Client {
  id: string;                    // Unique identifier
  name: string;                  // Company name
  logoUrl: string;               // Path to logo image
}

export const clients: Client[] = [
  {
    id: "client-1",
    name: "Reliance Industries",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Reliance_Foundation_Logo.svg/1280px-Reliance_Foundation_Logo.svg.png?_=20220628191228",
  },
  {
    id: "client-2",
    name: "Tata Chemicals",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png",
  },
  {
    id: "client-3",
    name: "BASF",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/BASF-Logo_bw.svg/1280px-BASF-Logo_bw.svg.png?_=20210601115753",
  },
  {
    id: "client-4",
    name: "Pidilite Industries",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Pidilite_logo.svg/1280px-Pidilite_logo.svg.png",
  },
  {
    id: "client-5",
    name: "Asian Paints",
    logoUrl: "https://logowik.com/content/uploads/images/asian-paints6567.logowik.com.webp",
  },
  {
    id: "client-6",
    name: "Dow Chemical",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG2k1KPpNtc1r2Y9SWLRG3nUsxxGC9tl6mfQ&s",
  },
  {
    id: "client-7",
    name: "DuPont",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJQeJLvaBDb-h2iOae5wAWu5FcsiGr2ntSyg&s",
  },
  {
    id: "client-8",
    name: "Bayer",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8B19aM_d3pe641dioliVYUiP0K5W4eZU7dw&s",
  },
];
