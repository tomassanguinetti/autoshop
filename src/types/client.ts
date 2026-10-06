export interface ServiceItem {
  id: string;
  name: string;
  category: 'maintenance' | 'repair' | 'tires' | 'inspection';
  description: string;
  fromPrice: number;
  duration: string;
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  cert: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  vehicle: string;
  rating: number;
}

export interface CouponItem {
  tag: string;
  title: string;
  description: string;
  code: string;
  note: string;
}

export interface PriceListItem {
  name: string;
  sub: string;
  price: string;
}

export interface ClientConfig {
  id: string;
  businessName: string;
  tagline: string;
  subTagline: string;
  foundedYear: number;
  phone: string;
  emergencyPhone?: string;
  email: string;
  address: string;
  cityStateZip: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  accentTheme: 'orange' | 'red' | 'blue' | 'green' | 'amber';
  warrantyMonths: number;
  warrantyMiles: number;
  rating: number;
  reviewsCount: number;
  services: ServiceItem[];
  priceList: PriceListItem[];
  coupons: CouponItem[];
  team: TeamMember[];
  testimonials: Testimonial[];
}
