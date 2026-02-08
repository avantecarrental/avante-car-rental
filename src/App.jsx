import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Search, 
  ChevronDown, 
  ArrowUpRight, 
  Activity, 
  MapPin, 
  CheckCircle2,
  Mail, 
  Phone, 
  ArrowLeft, 
  Send, 
  Star, 
  ExternalLink, 
  Facebook, 
  Instagram, 
  ChevronRight, 
  Circle, 
  X, 
  Users, 
  Fuel,
  Cpu,
  Gauge,
  Calendar, 
  Briefcase,
  ShieldCheck, 
  Zap,
  Clock,
  Plus, 
  Wallet, 
  AlertCircle,
  Store,
  Navigation,
  Check, 
  Monitor,
  Smartphone,
  MessageCircle,
  Edit3,
  Moon,
  Baby,
  CreditCard,
  Globe,
  User as UserIcon,
  Banknote,
  ShieldAlert,
  HelpCircle,
  Truck,
  LifeBuoy,
  Gift,
  FileText,
  Shield,
  Ban,
  Droplets,
  GaugeCircle,
  Heart,
  Plane
} from 'lucide-react';

// ==========================================
// 1. GAYA & ASET (STYLES & ASSETS)
// ==========================================

const USER_STYLES = {
  fontFamily: "'Segoe UI', Tahoma, Helvetica, Arial, sans-serif",
  headings: {
    color: '#1a1a1a',
    fontWeight: 700,
  },
  body: {
    color: '#444',
    lineHeight: 1.6,
  }
};

const LOGO_URL = "https://www.kualalumpurcarrental.my/img/logo/avante-735x122.png";

const SpeedometerIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 17.5V14" />
    <path d="m14.5 12.5 3-3" />
    <path d="M21 12a9 9 0 1 1-18 0" />
    <path d="M21 12a9 9 0 0 0-18 0" opacity="0.3" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const LanternIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2V5M12 19V22M7 5H17M5 9C5 7 7 5 9 5H15C17 5 19 7 19 9V15C19 17 17 19 15 19H9C7 19 5 17 5 15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 5V19M15 5V19M12 5V19" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
  </svg>
);

const KetupatIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2.5 11.5L12 21L21.5 11.5L12 2Z" />
    <path d="M2.5 11.5H21.5" />
    <path d="M12 2V21" />
  </svg>
);

const GoogleIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.86-2.59 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const TiktokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// ==========================================
// 2. FUNGSI PEMBANTU (HELPER FUNCTIONS)
// ==========================================

const getCDWConfig = (category, carClass) => {
  const cls = carClass ? carClass.toLowerCase() : '';
  const isSUVOrMPV = category === 'SUV' || category === 'MPV';
  const isHatchOrSedan = category === 'Hatchback' || category === 'Sedan';

  if (cls.includes('luxury')) return { rate: 100, amount: 'RM7,000' };
  if (cls.includes('premium')) {
    if (isSUVOrMPV) return { rate: 55, amount: 'RM3,500' };
    if (isHatchOrSedan) return { rate: 50, amount: 'RM3,250' };
    return { rate: 55, amount: 'RM3,500' }; 
  }
  if (isSUVOrMPV) return { rate: 25, amount: 'RM2,000' };
  return { rate: 20, amount: 'RM1,750' };
};

const getDepositAmount = (carClass) => {
  const cls = carClass ? carClass.toLowerCase() : '';
  if (cls.includes('luxury')) return 1000;
  if (cls.includes('premium')) return 500;
  return 200;
};

const getDiscountRate = (days) => {
  if (days >= 180) return 0.70; 
  if (days >= 90) return 0.65;
  if (days >= 60) return 0.60;
  if (days >= 30) return 0.50;
  if (days >= 21) return 0.35;
  if (days >= 14) return 0.25;
  if (days >= 7) return 0.15;
  if (days >= 3) return 0.08; // Strictly 8% for Raya Season logic
  return 0;
};

const splitCarName = (model) => {
  const modelStr = String(model);
  const firstSpaceIndex = modelStr.indexOf(' ');
  if (firstSpaceIndex === -1) return { make: modelStr, remainder: '' };
  return {
    make: modelStr.substring(0, firstSpaceIndex),
    remainder: modelStr.substring(firstSpaceIndex + 1)
  };
};

const getPromoStyles = (theme) => {
  switch(theme) {
    case 'raya': return {
      card: 'bg-emerald-600 border-yellow-400 shadow-lg shadow-emerald-100',
      textTitle: 'text-emerald-200',
      textValue: 'text-yellow-300',
      iconBox: 'bg-emerald-700 text-yellow-300',
      validityIcon: 'text-yellow-300',
      validityText: 'text-white',
      subtext: 'text-emerald-100/80',
      badge: 'bg-white/20 text-white border border-white/20'
    };
    case 'cny': return {
      card: 'bg-red-600 border-yellow-500 shadow-lg shadow-red-100',
      textTitle: 'text-yellow-200',
      textValue: 'text-yellow-400',
      iconBox: 'bg-red-500 text-yellow-400',
      validityIcon: 'text-yellow-400',
      validityText: 'text-white',
      subtext: 'text-yellow-100/80',
      badge: 'bg-white/20 text-white border border-white/20'
    };
    default: return {
      card: 'bg-white border-gray-100 shadow-sm',
      textTitle: 'text-gray-400',
      textValue: 'text-blue-600',
      iconBox: 'bg-blue-50 text-blue-600',
      validityIcon: 'text-green-500',
      validityText: 'text-gray-600',
      subtext: 'text-gray-400',
      badge: 'bg-blue-50 text-blue-600 border border-blue-100'
    };
  }
};

// ==========================================
// 3. DATA STATIK (STATIC DATA)
// ==========================================

const BOOKING_LOCATIONS_EN = [
  "KLIA Terminal 1", "KLIA Terminal 2", "Subang Skypark (Sultan Abdul Aziz Shah)",
  "KL Sentral", "Terminal Bersepadu Selatan (TBS)", "Terminal Bersepadu Gombak (TBG)",
  "Kuala Lumpur City Centre (KLCC)", "Bukit Bintang", "Bangsar / Bangsar South",
  "Mont Kiara / Sri Hartamas", "Cheras", "Setapak / Wangsa Maju", "Kepong",
  "Petaling Jaya (PJ)", "Subang Jaya / USJ", "Shah Alam", "Klang", "Puchong",
  "Damansara", "Sunway / Bandar Sunway", "Ampang Jaya", "Cyberjaya", "Putrajaya",
  "Kajang / Bangi", "Rawang", "Selayang / Batu Caves", "Seri Kembangan", "Sungai Buloh"
];

const BOOKING_LOCATIONS_BM = [
  "KLIA Terminal 1", "KLIA Terminal 2", "Subang Skypark (Sultan Abdul Aziz Shah)",
  "KL Sentral", "Terminal Bersepadu Selatan (TBS)", "Terminal Bersepadu Gombak (TBG)",
  "Pusat Bandar Kuala Lumpur (KLCC)", "Bukit Bintang", "Bangsar / Bangsar South",
  "Mont Kiara / Sri Hartamas", "Cheras", "Setapak / Wangsa Maju", "Kepong",
  "Petaling Jaya (PJ)", "Subang Jaya / USJ", "Shah Alam", "Klang", "Puchong",
  "Damansara", "Sunway / Bandar Sunway", "Ampang Jaya", "Cyberjaya", "Putrajaya",
  "Kajang / Bangi", "Rawang", "Selayang / Batu Caves", "Seri Kembangan", "Sungai Buloh"
];

const TRANSLATIONS = {
  EN: {
    welcome: "Welcome to Avante Car Rental",
    activePromos: "Active Promotions",
    renterReq: "Renter Requirements",
    req1: "MyKad or Passport",
    req2: "Domestic or International Driver's License",
    req3: "No past criminal records",
    payment: "Payment",
    pay1: "Online Banking",
    pay2: "Credit Card",
    pay3: "TnG E-Wallet",
    featuredFleet: "Featured Fleet",
    browseAll: "Browse All",
    deliveryHubs: "Locations",
    deliveryHubMenu: "Locations",
    viewAllLocations: "View All Locations",
    reviews: "Customer Reviews",
    writeReview: "Write a Review",
    backToFleet: "Back to Fleet",
    vehicleSpecs: "Vehicle Specifications",
    vehicleFeatures: "Vehicle Features",
    startingFrom: "Starting from",
    pickupLoc: "Pickup Location",
    startDate: "Start Date",
    endDate: "End Date",
    time: "Time",
    optionalAddons: "Optional Add-ons",
    extraCoverage: "Extra Coverage (CDW)",
    safetySeat: "Safety Seat",
    midnightService: "Midnight Service",
    midnightHours: "(12AM-6AM)",
    midnightInfo1: "• Pick-Up Surcharge applied",
    midnightInfo2: "• Drop-Off Surcharge applied",
    babySeat: "Baby Seat 0-1 Yrs",
    childSeat: "Child Seat 1-4 Yrs",
    boosterSeat: "Booster Seat 4-7 Yrs",
    rental: "Rental",
    estTotal: "Estimated Total",
    bookNow: "BOOK THIS VEHICLE",
    securityDeposit: "All prices shown are inclusive of 8% SST.",
    secDepositLabel: "Security Deposit (Refundable)",
    connect: "Let's Connect",
    mainHub: "Main Hub",
    addressTitle: "Office Address",
    address: "7, Jalan PJS 11/12, Bandar Sunway - USJ, 46150, Selangor, Malaysia",
    voiceText: "Voice & Text",
    digitalInquiries: "Digital Inquiries",
    followJourney: "Follow Our Journey",
    sendInquiry: "Send an Inquiry",
    responseTime: "We usually respond within 2 hours during business hours.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    message: "Message",
    sendMessage: "Send Message",
    inquiryReady: "Inquiry Ready!",
    inquiryInfo: "Your message is ready to be sent. Please finalize the action in your mail client.",
    sendAnother: "Send another message",
    home: "Home",
    fleet: "Fleet",
    support: "Support",
    terms: "Terms",
    termsFull: "Terms & Conditions",
    all: "All",
    day: "day",
    totalVehicles: "Total Vehicles",
    class: "Class",
    searchModels: "Search models...",
    selectMail: "Select Email Service",
    selectMailInfo: "Choose how you would like to send your inquiry.",
    gmail: "Gmail Browser",
    defaultMail: "Default Mail App",
    waBusiness: "WhatsApp Business",
    hubSunway: "Bandar Sunway - USJ",
    hubPJ: "Petaling Jaya",
    hubTBS: "TBS Terminal",
    hubKLIA: "Airports Coverage",
    hubKL: "Kuala Lumpur",
    hubAmpang: "Ampang - Cheras",
    hubShahAlam: "Shah Alam",
    hubCyber: "Cyberjaya / Putrajaya",
    hubKlang: "Klang / Port Klang",
    hubPuchong: "Puchong",
    hubGombak: "Gombak / Setapak",
    hubNationwide: "Nationwide",
    hubPJDesc: "Delivery around PJ & Bandar Utama",
    hubTBSDesc: "Free Delivery when rent 3 days & above",
    hubKLIADesc: "KLIA 1 & 2, Subang Airport, etc.",
    hubKLDesc: "Delivery to KL Sentral & city area",
    hubAmpangDesc: "Delivery to Ampang & Cheras areas",
    hubShahAlamDesc: "Delivery around Shah Alam area",
    hubCyberDesc: "Delivery to Cyberjaya & Putrajaya",
    hubKlangDesc: "Delivery to Klang & Port Klang area",
    hubPuchongDesc: "Delivery to Puchong & Kinrara area",
    hubGombakDesc: "Delivery to Gombak & Setapak",
    hubNationwideDesc: "Penang, Johor, Kelantan, Pahang, etc.",
    bodyType: "Body Type",
    luggage: "Luggage",
    energy: "Energy",
    transmission: "Transmission",
    capacity: "Capacity",
    guests: "Passengers",
    excessInfo: "Minimize responsibility to",
    perDay: "day",
    waMsg: "Hello Avante! I'd like to book:",
    validity: "Validity:",
    promoCode: "Rent from:",
    locations: BOOKING_LOCATIONS_EN,
    faqTitle: "FAQ",
    priceGuide: "Price Guide",
    days: "Days",
    deliveryHours: "Delivery Hours",
    reservationHours: "Reservation Hours",
    deliveryHoursRange: "24 Hours",
    reservationHoursRange: "9AM - 5PM",
    otherServices: "Other Services",
    service1: "Private Driver",
    service2: "Inbound Travel",
    service3: "Airport Transfer",
    service4: "Wedding Services",
    service5: "Corporate Events",
    terms1Title: "Eligibility",
    terms1Text: "Hirer must be aged 21-65 with a valid domestic or international driving license. Probationary (P) license holders are not eligible.",
    terms2Title: "Insurance & CDW",
    terms2Text: "Standard comprehensive protection is included for your journey. For total peace of mind, our optional CDW significantly reduces your out-of-pocket responsibility in the event of unforeseen damage.",
    terms3Title: "Traffic Violations",
    terms3Text: "Hirer is responsible for all traffic/parking summonses incurred during the rental period. Admin fees may apply.",
    terms4Title: "Fuel Policy",
    terms4Text: "Vehicle must be returned with the same fuel level as provided during pickup. Surcharges apply for refueling.",
    terms5Title: "Usage Restrictions",
    terms5Text: "Strictly no smoking, pets, or illegal items inside the vehicle. Border crossing to Singapore/Thailand is prohibited.",
    terms6Title: "Mileage Policy",
    terms6Text: "Standard daily mileage limits apply to ensure vehicle longevity. For long-term rentals, unlimited mileage options are available to support your travel freedom.",
    faq1Q: "What documents do I need to rent a car?",
    faq1A: "You will need a valid MyKad or Passport, a valid driving license (domestic or international), and a utility bill or proof of employment for verification purposes.",
    faq2Q: "How long does it take to get my security deposit back?",
    faq2A: "Security deposits are typically refunded within 3-7 business days after the vehicle is returned, provided there are no damages or summonses.",
    faq3Q: "Is there a mileage limit?",
    faq3A: "Ya, standard rentals come with a mileage cap (e.g., 200km/day). However, we offer specific unlimited mileage promotions for long-term bookings.",
    faq4Q: "Do you deliver the car to my location?",
    faq4A: "Yes, we cover major hubs like KLIA, Subang Airport, PJ, and KL City Centre. Delivery fees may apply depending on the distance, but are often waived for rentals of 3 days or more.",
    faq5Q: "What does the CDW cover?",
    faq5A: "Collision Damage Waiver (CDW) reduces your financial liability in the event of an accident. It does not cover missing items or negligence.",
    faq6Q: "Can I drive the car into Singapore or Thailand?",
    faq6A: "No, our vehicles are strictly for use within Malaysia. Cross-border driving is prohibited due to insurance regulations.",
    faq7Q: "What should I do if the car breaks down?",
    faq7A: "Contact our 24/7 roadside assistance hotline immediately. We will arrange for help or a replacement vehicle if necessary.",
    freeDelivery: "Free Delivery",
    unlimitedMileage: "Unlimited Mileage",
    roadSupport: "Roadside Support",
    promo3Days: "Rent 3 days and get 30KM free delivery.",
    promo5Days: "Rent 5 days and enjoy 65KM free delivery. (Airports Coverage)",
    flashDeals: "Flash Deals",
    flashDealsDesc: "Limited time offers expiring soon!",
    grabDeal: "Grab Deal",
    endsIn: "Ends in",
    min2Days: "Minimum 2 days rental.",
    back: "Back",
    otherCars: "Other",
    discountedAmt: "Discounted Rental"
  },
  BM: {
    welcome: "Hi! Selamat datang ke Avante Car Rental",
    activePromos: "Promo Tengah Onz",
    renterReq: "Dokumen Penyewa",
    req1: "IC atau Pasport",
    req2: "Lesen Memandu Sah (Tempatan/Antarabangsa)",
    req3: "Tiada rekod jenayah lampau",
    payment: "Cara Nak Bayar",
    pay1: "Perbankan Dalam Talian",
    pay2: "Kad Kredit",
    pay3: "TnG E-Wallet",
    featuredFleet: "Koleksi Pilihan",
    browseAll: "Lihat Semua",
    deliveryHubs: "Lokasi Hantar Kereta",
    deliveryHubMenu: "Lokasi",
    viewAllLocations: "Lihat Semua Lokasi",
    reviews: "Apa Kata Pelanggan",
    writeReview: "Tulis Ulasan",
    backToFleet: "Kembali ke Koleksi",
    vehicleSpecs: "Spek Kereta",
    vehicleFeatures: "Ciri Menarik",
    startingFrom: "Bermula dari",
    pickupLoc: "Lokasi Ambil",
    startDate: "Tarikh Mula",
    endDate: "Tarikh Pulang",
    time: "Masa",
    optionalAddons: "Pilihan Tambahan",
    extraCoverage: "Perlindungan Ekstra (CDW)",
    safetySeat: "Kerusi Keselamatan",
    midnightService: "Servis Tengah Malam",
    midnightHours: "(12AM-6AM)",
    midnightInfo1: "• Caj Tambahan Ambil Kereta",
    midnightInfo2: "• Caj Tambahan Pulang Kereta",
    babySeat: "Baby Seat 0-1 Tahun",
    childSeat: "Child Seat 1-4 Tahun",
    boosterSeat: "Booster Seat 4-7 Tahun",
    rental: "Sewa",
    estTotal: "Anggaran Jumlah",
    bookNow: "TEMPAH SEKARANG",
    securityDeposit: "Semua harga yang dipaparkan adalah termasuk 8% SST.",
    secDepositLabel: "Deposit Keselamatan (Refundable)",
    connect: "Roger Kami!",
    mainHub: "Pusat Utama",
    addressTitle: "Alamat Pejabat",
    address: "7, Jalan PJS 11/12, Bandar Sunway - USJ, 46150, Selangor, Malaysia",
    voiceText: "Suara & Teks",
    digitalInquiries: "Pertanyaan Digital",
    followJourney: "Ikuti Kami",
    sendInquiry: "Hantar Pertanyaan",
    responseTime: "Kami biasanya balas dalam tempoh 2 jam semasa waktu bekerja.",
    fullName: "Nama Penuh",
    emailAddress: "Alamat Emel",
    message: "Mesej",
    sendMessage: "Hantar Mesej",
    inquiryReady: "Mesej Dah Sedia!",
    inquiryInfo: "Mesej anda dah sedia untuk dihantar. Sila teruskan dalam aplikasi emel anda.",
    sendAnother: "Hantar mesej lain",
    home: "Utama",
    fleet: "Kereta",
    support: "Bantuan",
    terms: "Terma",
    termsFull: "Terma & Syarat",
    all: "Semua",
    day: "hari",
    totalVehicles: "Jumlah Kereta",
    class: "Class",
    searchModels: "Cari model kereta...",
    selectMail: "Pilih Servis Emel",
    selectMailInfo: "Pilih cara anda nak hantar pertanyaan.",
    gmail: "Pelayar Gmail",
    defaultMail: "Aplikasi Emel Biasa",
    waBusiness: "WhatsApp Business",
    hubSunway: "Bandar Sunway - USJ",
    hubPJ: "Petaling Jaya",
    hubTBS: "Terminal TBS",
    hubKLIA: "Liputan Airport",
    hubKL: "Kuala Lumpur",
    hubAmpang: "Ampang - Cheras",
    hubShahAlam: "Shah Alam",
    hubCyber: "Cyberjaya / Putrajaya",
    hubKlang: "Klang / Port Klang",
    hubPuchong: "Puchong",
    hubGombak: "Gombak / Setapak",
    hubNationwide: "Semenanjung",
    hubPJDesc: "Hantar area PJ & Bandar Utama",
    hubTBSDesc: "Free Delivery bila sewa 3 hari ke atas",
    hubKLIADesc: "KLIA 1 & 2, Subang Airport, dll.",
    hubKLDesc: "Hantar ke KL Sentral & area bandar",
    hubAmpangDesc: "Hantar ke area Ampang & Cheras",
    hubShahAlamDesc: "Hantar ke area Shah Alam",
    hubCyberDesc: "Hantar ke Cyberjaya & Putrajaya",
    hubKlangDesc: "Hantar area Klang & Port Klang",
    hubPuchongDesc: "Hantar area Puchong & Kinrara",
    hubGombakDesc: "Hantar area Gombak & Setapak",
    hubNationwideDesc: "Pulau Pinang, Johor, Kelantan, Pahang, dll.",
    bodyType: "Jenis Badan",
    luggage: "Ruang Beg",
    energy: "Bahan Api",
    transmission: "Transmisi",
    capacity: "Kapasiti",
    guests: "Penumpang",
    excessInfo: "Kurangkan liabiliti sehingga",
    perDay: "hari",
    waMsg: "Halo Avante! Saya nak tempah:",
    validity: "Sah Selama:",
    promoCode: "Sewa dari:",
    locations: BOOKING_LOCATIONS_BM,
    faqTitle: "Soalan Lazim (FAQ)",
    priceGuide: "Panduan Harga",
    days: "Hari",
    deliveryHours: "Waktu Penghantaran",
    reservationHours: "Waktu Tempahan",
    deliveryHoursRange: "24 Jam",
    reservationHoursRange: "9 PG - 5 PTG",
    otherServices: "Perkhidmatan Lain",
    service1: "Pemandu Peribadi",
    service2: "Pelancongan Masuk",
    service3: "Transfer Airport",
    service4: "Servis Perkahwinan",
    service5: "Corporate Events",
    terms1Title: "Kelayakan",
    terms1Text: "Penyewa mestilah berumur 21-65 tahun dengan lesen memandu yang sah. Lesen P tak layak lagi tau.",
    terms2Title: "Insurans & CDW",
    terms2Text: "Perlindungan komprehensif standard disertakan untuk perjalanan anda. Untuk ketenangan minda sepenuhnya, perlindungan CDW pilihan kami mengurangkan liabiliti tunai anda secara drastik sekiranya berlaku kerosakan yang tidak dijangka.",
    terms3Title: "Saman & Pelanggaran",
    terms3Text: "Penyewa bertanggungjawab ke atas semua saman trafik atau parkir masa sewa. Ada caj admin kalau kami uruskan.",
    terms4Title: "Polisi Minyak",
    terms4Text: "Kereta mesti dipulangkan dengan tahap minyak yang sama macam masa ambil tadi. Kalau kurang kena caj.",
    terms5Title: "Pantang Larang",
    terms5Text: "Dilarang merokok, bawa haiwan, atau barang haram. Tak boleh bawa masuk Singapura atau Thailand.",
    terms6Title: "Polisi Perbatuan",
    terms6Text: "Biasanya ada limit mileage harian untuk jaga condition kereta. Tapi kalau anda sewa long-term, ada option unlimited mileage. Barulah boleh jalan jauh tanpa risau!",
    faq1Q: "Apa dokumen yang diperlukan?",
    faq1A: "Anda perlukan MyKad atau Pasport, lesen memandu yang sah, dan bil utiliti atau bukti pekerjaan untuk tujuan pengesahan.",
    faq2Q: "Bila dapat balik deposit?",
    faq2A: "Deposit biasanya dipulangkan dalam masa 3-7 hari bekerja lepas kereta dipulangkan, asalkan tiada kerosakan atau saman.",
    faq3Q: "Ada limit mileage tak?",
    faq3A: "Ya, sewaan standard ada had perjalanan harian. Tapi kami ada promo 'unlimited mileage' untuk sewaan jangka panjang.",
    faq4Q: "Boleh hantar kereta ke tempat saya?",
    faq4A: "Boleh! Kami cover area KLIA, Subang, PJ, dan KL. Caj penghantaran bergantung pada lokasi, tapi selalunya PERCUMA kalau sewa 3 hari ke atas.",
    faq5Q: "Apa yang CDW cover?",
    faq5A: "Collision Damage Waiver (CDW) reduces your financial liability in the event of an accident. It does not cover missing items or negligence.",
    faq6Q: "Boleh bawa kereta masuk Singapore atau Thailand?",
    faq6A: "Tak boleh. Kereta kami untuk kegunaan dalam Malaysia sahaja. Insurans tak cover kalau keluar sempadan.",
    faq7Q: "Macam mana kalau kereta rosak?",
    faq7A: "Terus hubungi hotline bantuan kecemasan 24 jam kami. Kami akan hantar bantuan atau kereta ganti secepat mungkin.",
    freeDelivery: "Hantar Percuma",
    unlimitedMileage: "Mileage Tanpa Had",
    roadSupport: "Bantuan Jalan Raya",
    promo3Days: "Sewa 3 hari dan dapatkan penghantaran percuma 30KM.",
    promo5Days: "Sewa 5 hari dan nikmati penghantaran percuma 65KM. (Liputan Lapangan Terbang)",
    flashDeals: "Tawaran Kilat",
    flashDealsDesc: "Tawaran terhad akan tamat!",
    grabDeal: "Sambar Deal",
    endsIn: "Tamat dalam",
    min2Days: "Minima sewa 2 hari.",
    back: "Kembali",
    otherCars: "Koleksi",
    discountedAmt: "Sewa Selepas Diskaun"
  }
};

const INITIAL_FLEET_DATA = [
  { id: 'bezza-x', model: 'Perodua Bezza X', class: 'Economy', status: 'Available', category: 'Sedan', price: 120, fuel: 'Petrol', transmission: 'Auto', engine: '1.3L', seats: 5, boot: '508L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/bezza-x-side-view-511x339.png', featuresEN: ['Bluetooth Audio', 'USB Charging', 'Reverse Sensors', 'ABS with EBD', 'Eco-Drive Assist', 'ISOFIX Ready'], featuresBM: ['Audio Bluetooth', 'Caj USB', 'Sensor Undur', 'ABS + EBD', 'Bantuan Eco', 'Sedia ISOFIX'] },
  { id: 'saga-vvt', model: 'Proton Saga VVT', class: 'Economy', status: 'Available', category: 'Sedan', price: 110, fuel: 'Petrol', transmission: 'Auto', engine: '1.3L', seats: 5, boot: '420L', image: 'https://kualalumpurcarrental.my/img/cars/proton/saga-vvt-side-view-511x339.png', featuresEN: ['Bluetooth', 'Radio/MP3', 'Reverse Sensors', 'USB Ports', 'ISOFIX Ready', 'Eco Mode'], featuresBM: ['Bluetooth', 'Radio/MP3', 'Sensor Undur', 'Port USB', 'Sedia ISOFIX', 'Mod Eco'] },
  { id: 'saga-mc3', model: 'Proton Saga MC3', class: 'Economy', status: 'Available', category: 'Sedan', price: 115, fuel: 'Petrol', transmission: 'Auto', engine: '1.3L', seats: 5, boot: '420L', image: 'https://kualalumpurcarrental.my/img/cars/proton/saga-mc3-side-view-511x339.png', featuresEN: ['Touchscreen', 'Reverse Camera', 'LED DRL', 'Smart Lock', 'Stability Control', 'Eco-Assist'], featuresBM: ['Skrin Sentuh', 'Kamera Undur', 'LED DRL', 'Kunci Pintar', 'Kawalan Kestabilan', 'Eco-Assist'] },
  { id: 'vios-e', model: 'Toyota Vios E', class: 'Premium', status: 'Available', category: 'Sedan', price: 180, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '475L', image: 'https://kualalumpurcarrental.my/img/cars/toyota/vios-e-side-view-511x339.png', featuresEN: ['Keyless Entry', 'Push Start', '7-inch Display', '7 Airbags', 'Apple CarPlay', 'Parking Sensors'], featuresBM: ['Kemasukan Tanpa Kunci', 'Push Start', 'Paparan 7-inci', '7 Beg Udara', 'Apple CarPlay', 'Sensor Letak Kereta'] },
  { id: 'vios-g', model: 'Toyota Vios G', class: 'Premium', status: 'Available', category: 'Sedan', price: 200, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '475L', image: 'https://kualalumpurcarrental.my/img/cars/toyota/vios-g-side-view-511x339.png', featuresEN: ['360 Camera', 'Leather Seats', 'Paddle Shift', 'Auto Climate Control', 'Blind Spot Monitor', 'LED Projectors'], featuresBM: ['Kamera 360', 'Tempat Duduk Kulit', 'Paddle Shift', 'Kawalan Iklim Auto', 'Monitor Titik Buta', 'Projektor LED'] },
  { id: 'city-e', model: 'Honda City E', class: 'Premium', status: 'Available', category: 'Sedan', price: 190, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '519L', image: 'https://kualalumpurcarrental.my/img/cars/honda/city-e-side-view-511x339.png', featuresEN: ['Rear AC Vents', 'Apple CarPlay', '8 Speakers', 'Smart Entry', 'Hill Start Assist', 'Stability Control'], featuresBM: ['Corong AC Belakang', 'Apple CarPlay', '8 Pembesar Suara', 'Kemasukan Pintar', 'Bantuan Mula Mendaki', 'Kawalan Kestabilan'] },
  { id: 'city-v', model: 'Honda City V', class: 'Premium', status: 'Available', category: 'Sedan', price: 210, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '519L', image: 'https://kualalumpurcarrental.my/img/cars/honda/city-v-side-view-511x339.png', featuresEN: ['LED Headlamps', '6 Airbags', 'Soft Touch Dash', '8 Speakers', 'Honda LaneWatch', 'Cruise Control'], featuresBM: ['Lampu Depan LED', '6 Beg Udara', 'Papan Pemuka Soft Touch', '8 Pembesar Suara', 'Honda LaneWatch', 'Cruise Control'] },
  { id: 'city-rs', model: 'Honda City RS', class: 'Premium', status: 'Available', category: 'Sedan', price: 230, fuel: 'Petrol/Hybrid', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '410L', image: 'https://kualalumpurcarrental.my/img/cars/honda/city-rs-side-view-511x339.png', featuresEN: ['Honda SENSING', 'RS Bodykit', 'Electronic Parking Brake', 'Remote Engine Start', '7-inch TFT Meter', 'Sport Pedals'], featuresBM: ['Honda SENSING', 'Bodykit RS', 'Brek Parkir Elektronik', 'Mula Enjin Jauh', 'Meter TFT 7-inci', 'Pedal Sukan'] },
  { id: 'axia-g', model: 'Perodua Axia G', class: 'Economy', status: 'Available', category: 'Hatchback', price: 100, fuel: 'Petrol', transmission: 'Auto', engine: '1.0L', seats: 5, boot: '265L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/axia-g-side-view-511x339.png', featuresEN: ['Power Windows', 'Safety Seat Anchors', 'Dual Airbags', 'Eco Assist', 'ABS with EBD', 'ISOFIX ready'], featuresBM: ['Tingkap Kuasa', 'Sauh Tempat Duduk Keselamatan', 'Beg Udara Berkembar', 'Eco Assist', 'ABS dengan EBD', 'Sedia ISOFIX'] },
  { id: 'myvi-h', model: 'Perodua Myvi H', class: 'Economy', status: 'Available', category: 'Hatchback', price: 130, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '277L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/myvi-h-side-view-511x339.png', featuresEN: ['Keyless Entry', 'LED Headlamps', 'Eco Idle', 'Built-in Toll Reader', 'Stability Control', 'Reverse Sensors'], featuresBM: ['Kemasukan Tanpa Kunci', 'Lampu Depan LED', 'Eco Idle', 'Pembaca Tol Terbina-dalam', 'Kawalan Kestabilan', 'Sensor Undur'] },
  { id: 'myvi-av', model: 'Perodua Myvi AV', class: 'Premium', status: 'Available', category: 'Hatchback', price: 150, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '277L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/myvi-av-side-view-511x339.png', featuresEN: ['Advanced Safety Assist', 'Leather Seats', 'Apple CarPlay', '6 Airbags', 'Adaptive Cruise', '360 Camera'], featuresBM: ['Advanced Safety Assist', 'Tempat Duduk Kulit', 'Apple CarPlay', '6 Beg Udara', 'Cruise Adaptif', 'Kamera 360'] },
  { id: 'iriz-vvt', model: 'Proton Iriz VVT', class: 'Economy', status: 'Available', category: 'Hatchback', price: 120, fuel: 'Petrol', transmission: 'Auto', engine: '1.3L', seats: 5, boot: '215L', image: 'https://kualalumpurcarrental.my/img/cars/proton/iriz-vvt-side-view-511x339.png', featuresEN: ['Sporty Bodykit', 'Traction Control', 'Hill Hold Assist', 'Eco Mode', 'Bluetooth Audio', 'Reverse Sensors'], featuresBM: ['Sporty Bodykit', 'Traction Control', 'Hill Hold Assist', 'Eco Mode', 'Bluetooth Audio', 'Sensor Undur'] },
  { id: 'alza-x', model: 'Perodua Alza X', class: 'Economy', status: 'Available', category: 'MPV', price: 190, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 7, boot: '498L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/alza-x-side-view-511x339.png', featuresEN: ['7-Seater', 'Rear AC Vents', 'Reverse Sensors', 'Eco-Drive Assist', 'Smart Entry', 'LED Lighting'], featuresBM: ['7-Tempat Duduk', 'Corong AC Belakang', 'Sensor Undur', 'Bantuan Eco-Pemanduan', 'Kemasukan Pintar', 'Lampu LED'] },
  { id: 'alza-av', model: 'Perodua Alza AV', class: 'Premium', status: 'Available', category: 'MPV', price: 220, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 7, boot: '498L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/alza-av-side-view-511x339.png', featuresEN: ['360 Camera', 'Electronic Parking Brake', 'Apple CarPlay', 'Adaptive Cruise', 'Leather Seats', 'Collision Warning'], featuresBM: ['Kamera 360', 'Brek Parkir Elektronik', 'Apple CarPlay', 'Cruise Adaptif', 'Tempat Duduk Kulit', 'Amaran Perlanggaran'] },
  { id: 'traz-h', model: 'Perodua Traz H', class: 'Economy', status: 'Available', category: 'SUV', price: 185, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 5, boot: '370L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/traz-h-side-view-511x339.png', featuresEN: ['Advanced Safety Assist', 'Apple CarPlay', 'LED Headlamps', 'Reverse Camera', 'Auto Climate', 'Hill Start Assist'], featuresBM: ['Advanced Safety Assist', 'Apple CarPlay', 'Lampu Depan LED', 'Kamera Undur', 'Iklim Auto', 'Bantuan Mula Mendaki'] },
  { id: 'aruz-av', model: 'Perodua Aruz AV', class: 'Premium', status: 'Available', category: 'SUV', price: 220, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 7, boot: '514L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/aruz-av-side-view-511x339.png', featuresEN: ['7-Seater', 'Advanced Safety Assist', 'Leather Seats', 'Touchscreen', 'Roof Rails', 'Reverse Sensors'], featuresBM: ['7-Tempat Duduk', 'Advanced Safety Assist', 'Tempat Duduk Kulit', 'Skrin Sentuh', 'Rel Bumbung', 'Sensor Undur'] },
  { id: 'aruz-x', model: 'Perodua Aruz X', class: 'Economy', status: 'Available', category: 'SUV', price: 200, fuel: 'Petrol', transmission: 'Auto', engine: '1.5L', seats: 7, boot: '514L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/aruz-x-side-view-511x339.png', featuresEN: ['7-Seater', 'LED Headlamps', 'Reverse Sensors', 'Keyless Entry', 'ISOFIX Points', 'Eco Mode'], featuresBM: ['7-Tempat Duduk', 'Lampu Depan LED', 'Sensor Undur', 'Kemasukan Tanpa Kunci', 'Poin ISOFIX', 'Mod Eco'] },
  { id: 'ativa-h', model: 'Perodua Ativa H', class: 'Economy', status: 'Available', category: 'SUV', price: 180, fuel: 'Petrol', transmission: 'CVT - Auto', engine: '1.0T', seats: 5, boot: '369L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/ativa-h-side-view-511x339.png', featuresEN: ['Turbocharged', 'LANE Keep Control', 'Adaptive Cruise', 'Smart Entry', 'LED Headlamps', 'Eco Assist'], featuresBM: ['Turbocharged', 'Kawalan Kekal Lorong', 'Cruise Adaptif', 'Kemasukan Pintar', 'Lampu Depan LED', 'Eco Assist'] },
  { id: 'ativa-av', model: 'Perodua Ativa AV', class: 'Economy', status: 'Available', category: 'SUV', price: 195, fuel: 'Petrol', transmission: 'CVT - Auto', engine: '1.0T', seats: 5, boot: '369L', image: 'https://kualalumpurcarrental.my/img/cars/perodua/ativa-av-side-view-511x339.png', featuresEN: ['Adaptive Cruise', 'Blind Spot Monitor', 'Leather Seats', '360 Camera', 'RCTA Safety', 'Parking Assist'], featuresBM: ['Adaptive Cruise', 'Bantuan Titik Buta', 'Tempat Duduk Kulit', 'Kamera 360', 'Keselamatan RCTA', 'Bantuan Parkir'] },
  { id: 'hrv-e', model: 'Honda HR-V E', class: 'Premium', status: 'Available', category: 'SUV', price: 350, fuel: 'Petrol', transmission: 'CVT - Auto', engine: '1.5L', seats: 5, boot: '437L', image: 'https://kualalumpurcarrental.my/img/cars/honda/hrv-e-side-view-511x339.png', featuresEN: ['Honda SENSING', 'Walk Away Auto Lock', 'Reverse Camera', 'Apple CarPlay', 'LED Headlamps', 'Auto AC'], featuresBM: ['Honda SENSING', 'Kunci Auto Berjalan Jauh', 'Kamera Undur', 'Apple CarPlay', 'Lampu Depan LED', 'AC Auto'] },
  { id: 'hrv-v', model: 'Honda HR-V V', class: 'Premium', status: 'Available', category: 'SUV', price: 400, fuel: 'Petrol', transmission: 'CVT - Auto', engine: '1.5L', seats: 5, boot: '437L', image: 'https://kualalumpurcarrental.my/img/cars/honda/hrv-v-side-view-511x339.png', featuresEN: ['LaneWatch', 'Premium Sound', 'Leather Seats', 'Dual Zone Climate', 'Honda SENSING', 'Sequential Indicators'], featuresBM: ['LaneWatch', 'Audio Premium', 'Tempat Duduk Kulit', 'Iklim Zon Berkembar', 'Honda SENSING', 'Indikator Sekuensial'] },
  { id: 'x50-tgdi', model: 'Proton X50 Flagship', class: 'Premium', status: 'Available', category: 'SUV', price: 350, fuel: 'Petrol', transmission: 'DCT - Auto', engine: '1.5T', seats: 5, boot: '330L', image: 'https://kualalumpurcarrental.my/img/cars/proton/x50-flagship-side-view-511x339.png', featuresEN: ['Auto Parking', '360 Camera', 'Sunroof', 'Proton Link', 'N95 Cabin Filter', 'Lane Assist'], featuresBM: ['Auto Parking', 'Kamera 360', 'Bumbung Suria', 'Proton Link', 'Penapis Kabin N95', 'Bantuan Lorong'] },
  { id: 'x50-premium', model: 'Proton X50 Premium', class: 'Premium', status: 'Available', category: 'SUV', price: 300, fuel: 'Petrol', transmission: 'DCT - Auto', engine: '1.5T', seats: 5, boot: '330L', image: 'https://kualalumpurcarrental.my/img/cars/proton/x50-premium-side-view-511x339.png', featuresEN: ['6 Airbags', 'Auto Headlamps', 'TPMS', 'Power Seats', 'Red Interior Accent', 'Voice Command'], featuresBM: ['6 Beg Udara', 'Lampu Depan Auto', 'TPMS', 'Kerusi Berkuasa', 'Aksen Dalaman Merah', 'Arahan Suara'] },
  { id: 'staria-lite', model: 'Hyundai Staria Lite', class: 'Premium', status: 'Available', category: 'MPV', price: 500, fuel: 'Diesel', transmission: 'Auto', engine: '2.2D', seats: 10, boot: '831L', image: 'https://kualalumpurcarrental.my/img/cars/hyundai/staria-lite-side-view-511x339.png', featuresEN: ['10-Seater', '8-inch Display', 'Apple CarPlay', 'Rear AC', 'Electronic Shifter', 'Auto Hold'], featuresBM: ['10-Tempat Duduk', 'Paparan 8-inci', 'Apple CarPlay', 'AC Belakang', 'Penukar Elektronik', 'Auto Hold'] },
  { id: 'staria-plus', model: 'Hyundai Staria Plus', class: 'Premium', status: 'Available', category: 'MPV', price: 600, fuel: 'Diesel', transmission: 'Auto', engine: '2.2D', seats: 10, boot: '831L', image: 'https://kualalumpurcarrental.my/img/cars/hyundai/staria-plus-side-view-511x339.png', featuresEN: ['Smart Power Doors', 'Leather Seats', '10.25-inch Cluster', 'Smart Sense Safety', '360 Camera', 'Wireless Charging'], featuresBM: ['Pintu Kuasa Pintar', 'Tempat Duduk Kulit', 'Kluster 10.25-inci', 'Keselamatan Smart Sense', 'Kamera 360', 'Caj Tanpa Wayar'] },
  { id: 'starex-royale', model: 'Hyundai Grand Starex', class: 'Premium', status: 'Available', category: 'MPV', price: 450, fuel: 'Diesel', transmission: 'Auto', engine: '2.5D', seats: 11, boot: 'Large', image: 'https://kualalumpurcarrental.my/img/cars/hyundai/grand-starex-side-view-511x339.png', featuresEN: ['11-Seater', 'Swivel Seats', 'Roof Monitor', 'Cruise Control', 'Parking Sensors', 'Rear Aircon'], featuresBM: ['11-Tempat Duduk', 'Kerusi Pusing', 'Monitor Bumbung', 'Kawalan Cruise', 'Sensor Parkir', 'Aircon Belakang'] },
  { id: 'vellfire-ah20', model: 'Toyota Vellfire AH20', class: 'Premium', status: 'Available', category: 'MPV', price: 400, fuel: 'Petrol', transmission: 'Auto', engine: '2.4L', seats: 7, boot: 'Large', image: 'https://kualalumpurcarrental.my/img/cars/toyota/vellfire-ah20-side-view-511x339.png', featuresEN: ['7-Seater', 'Power Doors', 'Roof Monitor', 'Pilot Seats', 'Keyless Entry', 'Parking Sensors'], featuresBM: ['7-Tempat Duduk', 'Pintu Kuasa', 'Monitor Bumbung', 'Kerusi Pilot', 'Masuk Tanpa Kunci', 'Sensor Parkir'] },
  { id: 'vellfire-ah30', model: 'Toyota Vellfire AH30', class: 'Premium', status: 'Available', category: 'MPV', price: 600, fuel: 'Petrol', transmission: 'Auto', engine: '2.5L', seats: 7, boot: 'Large', image: 'https://kualalumpurcarrental.my/img/cars/toyota/vellfire-ah30-side-view-511x339.png', featuresEN: ['Pilot Seats', 'Twin Sunroof', 'Pre-Collision System', 'JBL Sound', '360 Camera', 'Power Tailgate'], featuresBM: ['Kerusi Pilot', 'Bumbung Kembar', 'Sistem Pra-Pelanggaran', 'Audio JBL', 'Kamera 360', 'Bonet Kuasa'] },
  { id: 'vellfire-ah40', model: 'Toyota Vellfire AH40', class: 'Luxury', status: 'Available', category: 'MPV', price: 1200, fuel: 'Petrol', transmission: 'Auto', engine: '2.4T', seats: 7, boot: 'Large', image: 'https://kualalumpurcarrental.my/img/cars/toyota/vellfire-ah40-side-view-511x339.png', featuresEN: ['Ottoman Seats', '14-inch Screen', 'Massage Seats', 'Toyota Safety Sense', 'Wireless Charging', 'Smartphone Control'], featuresBM: ['Kerusi Ottoman', 'Skrin 14-inci', 'Kerusi Urut', 'Toyota Safety Sense', 'Caj Tanpa Wayar', 'Kawalan Telefon'] },
  { id: 'alphard-ah20', model: 'Toyota Alphard AH20', class: 'Premium', status: 'Available', category: 'MPV', price: 400, fuel: 'Petrol', transmission: 'Auto', engine: '2.4L', seats: 7, boot: 'Large', image: 'https://kualalumpurcarrental.my/img/cars/toyota/alphard-ah20-side-view-511x339.png', featuresEN: ['7-Seater', 'Power Doors', 'Roof Monitor', 'Pilot Seats', 'Keyless Entry', 'Parking Sensors'], featuresBM: ['7-Tempat Duduk', 'Pintu Kuasa', 'Monitor Bumbung', 'Kerusi Pilot', 'Masuk Tanpa Kunci', 'Sensor Parkir'] },
  { id: 'alphard-ah30', model: 'Toyota Alphard AH30', class: 'Premium', status: 'Available', category: 'MPV', price: 600, fuel: 'Petrol', transmission: 'Auto', engine: '2.5L', seats: 7, boot: 'Large', image: 'https://kualalumpurcarrental.my/img/cars/toyota/alphard-ah30-side-view-511x339.png', featuresEN: ['Pilot Seats', 'Twin Sunroof', 'Pre-Collision System', 'JBL Sound', '360 Camera', 'Power Tailgate'], featuresBM: ['Kerusi Pilot', 'Bumbung Kembar', 'Sistem Pra-Pelanggaran', 'Audio JBL', 'Kamera 360', 'Bonet Kuasa'] },
  { id: 'alphard-ah40', model: 'Toyota Alphard AH40', class: 'Luxury', status: 'Available', category: 'MPV', price: 1200, fuel: 'Petrol', transmission: 'Auto', engine: '2.4T', seats: 7, boot: 'Large', image: 'https://kualalumpurcarrental.my/img/cars/toyota/alphard-ah40-side-view-511x339.png', featuresEN: ['Ottoman Seats', '14-inch Screen', 'Massage Seats', 'Toyota Safety Sense', 'Wireless Charging', 'Smartphone Control'], featuresBM: ['Kerusi Ottoman', 'Skrin 14-inci', 'Kerusi Urut', 'Toyota Safety Sense', 'Caj Tanpa Wayar', 'Kawalan Telefon'] }
];

const PROMOTIONS_DATA = [
  { id: 'raya', titleEN: "Hari Raya Special", titleBM: "Istimewa Hari Raya", valueEN: "8% OFF", valueBM: "8% DISKAUN", subtextEN: "20 - 27 March 2026", subtextBM: "20 - 27 Mac 2026", icon: KetupatIcon, theme: 'raya', conditionEN: "Min. 5 days rental.", conditionBM: "Min. sewa 5 hari." },
  { id: 'cny', titleEN: "Lunar New Year Special", titleBM: "Promo Tahun Baru Cina", valueEN: "8% OFF", valueBM: "8% DISKAUN", subtextEN: "10 - 24 February 2026", subtextBM: "10 - 24 Februari 2026", icon: LanternIcon, theme: 'cny', conditionEN: "Min. 5 days rental.", conditionBM: "Min. sewa 5 hari." },
  { id: 8, titleEN: "Early Bird Deal", titleBM: "Deal Awal Jimat", valueEN: "5% OFF", valueBM: "5% DISKAUN", subtextEN: "3 days & above", subtextBM: "Sewa 3 hari ke atas", icon: Gift },
  { id: 7, titleEN: "Weekly Getaway", titleBM: "Pakej Seminggu", valueEN: "15% OFF", valueBM: "15% DISKAUN", subtextEN: "7 days & above", subtextBM: "Sewa 7 hari ke atas", icon: Clock },
  { id: 6, titleEN: "Fortnightly Deal", titleBM: "Pakej 2 Minggu", valueEN: "25% OFF", valueBM: "25% DISKAUN", subtextEN: "14 days & above", subtextBM: "Sewa 14 hari ke atas", icon: MapPin },
  { id: 5, titleEN: "Triple-Weekly Deal", titleBM: "Pakej 3 Minggu", valueEN: "35% OFF", valueBM: "35% DISKAUN", subtextEN: "21 days & above", subtextBM: "Sewa 21 hari ke atas", icon: Store },
  { id: 4, titleEN: "Monthly Special", titleBM: "Istimewa Sebulan", valueEN: "50% OFF", valueBM: "50% DISKAUN", subtextEN: "30 days & above", subtextBM: "Sewa 30 hari ke atas", icon: Activity },
  { id: 3, titleEN: "Bi-Monthly Deal", titleBM: "Tawaran 2 Bulan", valueEN: "60% OFF", valueBM: "60% DISKAUN", subtextEN: "60 days & above", subtextBM: "Sewa 60 hari ke atas", icon: Calendar },
  { id: 2, titleEN: "Long-term Booking", titleBM: "Booking Jangka Panjang", valueEN: "65% OFF", valueBM: "65% DISKAUN", subtextEN: "90 days & above", subtextBM: "Sewa 90 hari ke atas", icon: Wallet },
  { id: 1, titleEN: "Semi-Annual Deal", titleBM: "Mega Promo 6 Bulan", valueEN: "70% OFF", valueBM: "70% DISKAUN", subtextEN: "180 days & above", subtextBM: "Sewa 180 hari ke atas", icon: Zap },
];

const FLASH_DEALS = [
  { id: 1, car: "Toyota Vios E", image: "https://kualalumpurcarrental.my/img/cars/toyota/vios-e-side-view-511x339.png", vehicleId: 'vios-e' },
  { id: 2, car: "Proton X50 Flagship", image: "https://kualalumpurcarrental.my/img/cars/proton/x50-flagship-side-view-511x339.png", vehicleId: 'x50-tgdi' },
  { id: 3, car: "Perodua Ativa", image: "https://kualalumpurcarrental.my/img/cars/perodua/ativa-av-side-view-511x339.png", vehicleId: 'ativa-av' },
  { id: 4, car: "Proton Saga VVT", image: "https://kualalumpurcarrental.my/img/cars/proton/saga-vvt-side-view-511x339.png", vehicleId: 'saga-vvt' },
  { id: 5, car: "Perodua Alza AV", image: "https://kualalumpurcarrental.my/img/cars/perodua/alza-av-side-view-511x339.png", vehicleId: 'alza-av' },
  { id: 6, car: "Honda HR-V V", image: "https://kualalumpurcarrental.my/img/cars/honda/hrv-v-side-view-511x339.png", vehicleId: 'hrv-v' },
  { id: 7, car: "Honda City V", image: "https://kualalumpurcarrental.my/img/cars/honda/city-v-side-view-511x339.png", vehicleId: 'city-v' },
  { id: 8, car: "Perodua Bezza X", image: "https://kualalumpurcarrental.my/img/cars/perodua/bezza-x-side-view-511x339.png", vehicleId: 'bezza-x' },
  { id: 9, car: "Toyota Vellfire AH30", image: "https://kualalumpurcarrental.my/img/cars/toyota/vellfire-ah30-side-view-511x339.png", vehicleId: 'vellfire-ah30' },
  { id: 10, car: "Hyundai Staria Lite", image: "https://kualalumpurcarrental.my/img/cars/hyundai/staria-lite-side-view-511x339.png", vehicleId: 'staria-lite' },
  { id: 11, car: "Perodua Myvi AV", image: "https://kualalumpurcarrental.my/img/cars/perodua/myvi-av-side-view-511x339.png", vehicleId: 'myvi-av' },
  { id: 12, car: "Perodua Aruz AV", image: "https://kualalumpurcarrental.my/img/cars/perodua/aruz-av-side-view-511x339.png", vehicleId: 'aruz-av' },
];

const MOCK_REVIEWS = [
  { id: 1, name: "Hafiz Ramli", rating: 5, commentEN: "Excellent service! The pick-up process at Bandar Sunway was seamless.", commentBM: "Servis terbaik! Masa ambil kereta kat Bandar Sunway memang laju gila.", date: "25 Jan, 2026", color: "bg-blue-500" },
  { id: 2, name: "Michelle Choong", rating: 5, commentEN: "Highly recommend Avante. The Honda HR-V was perfect for our family trip.", commentBM: "Sangat syorkan Avante ni. Honda HR-V dia memang mantap untuk trip family.", date: "20 Jan, 2026", color: "bg-red-500" },
  { id: 3, name: "Ravindran K.", rating: 5, commentEN: "Great experience overall. Delivery to KLIA was punctual. Will book again.", commentBM: "Pengalaman terbaik. Hantar ke KLIA pun on-time. Nanti saya book lagi.", date: "15 Jan, 2026", color: "bg-emerald-500" },
];

// --- Sub-Komponen ---
const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 group shrink-0">
    <div className="bg-gray-50 p-2 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all duration-300 w-9 h-9 flex items-center justify-center shrink-0">
      <Icon size={18} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{label}</span>
      <span className="text-xs font-black text-gray-800 leading-none">{value}</span>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick, children }) => (
  <div className="w-full">
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
        active 
          ? 'bg-blue-600 text-white font-semibold shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} />
        <span className="text-sm font-bold tracking-tight">{String(label)}</span>
      </div>
      {children && <ChevronDown size={14} className={`transition-transform duration-200 ${active ? 'rotate-180' : ''}`} />}
    </button>
    {(active || children) && children && (
      <div className="mt-1 ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
        {children}
      </div>
    )}
  </div>
);

// --- Aplikasi Utama ---
export default function App() {
  const [lang, setLang] = useState('EN'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [navHistory, setNavHistory] = useState(['dashboard']);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showMailOptions, setShowMailOptions] = useState(false);
  const [timeUntilMidnight, setTimeUntilMidnight] = useState("");
  const [activePhotoView, setActivePhotoView] = useState('side');
   
  const T = TRANSLATIONS[lang];

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); 
      const diff = midnight - now;

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeUntilMidnight(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeTab = (tabId) => {
    if (tabId === activeTab) return;
    if (tabId === 'dashboard') {
      setNavHistory(['dashboard']);
    } else {
      setNavHistory(prev => [...prev, tabId]);
    }
    setActiveTab(tabId);
  };

  const goBack = () => {
    if (navHistory.length <= 1) return;
    const newHistory = [...navHistory];
    newHistory.pop();
    const previousTab = newHistory[newHistory.length - 1];
    setNavHistory(newHistory);
    setActiveTab(previousTab);
  };

  const handleLanguageChange = (newLang) => {
    const oldAll = lang === 'BM' ? 'Semua' : 'All';
    const newAll = newLang === 'BM' ? 'Semua' : 'All';
    if (filterCategory === oldAll) setFilterCategory(newAll);
    if (selectedClass === oldAll) setSelectedClass(newAll);
    setLang(newLang);
  };

  const [bookingData, setBookingData] = useState({
    location: '', 
    startDate: '2026-03-20',
    startTime: '10:00',
    endDate: '2026-03-23',
    endTime: '10:00',
    selectedAddOns: []
  });

  useEffect(() => {
    if (T.locations && T.locations.length > 0) {
      setBookingData(prev => ({ ...prev, location: T.locations[0] }));
    }
  }, [lang, T.locations]);

  const [isSafetySeatEnabled, setIsSafetySeatEnabled] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const reviewSliderRef = useRef(null);
  const [isDownReview, setIsDownReview] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleManageClick = (id) => {
    setSelectedVehicleId(id);
    setActivePhotoView('side'); 
    if (activeTab !== 'vehicle-management') {
      changeTab('vehicle-management');
    } else {
      setSelectedVehicleId(id);
      const scrollTarget = document.querySelector('.rental-container');
      scrollTarget?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    setSelectedClass(lang === 'BM' ? 'Semua' : 'All');
    setSelectedVehicleId(null);
    changeTab('fleet');
  };

  const filteredFleet = useMemo(() => {
    return INITIAL_FLEET_DATA.filter(car => {
        const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryLabel = lang === 'BM' ? 'Semua' : 'All';
        const matchesCategory = filterCategory === categoryLabel || car.category === filterCategory;
        const matchesClass = selectedClass === categoryLabel || car.class === selectedClass;
        return matchesSearch && matchesCategory && matchesClass;
    });
  }, [searchTerm, filterCategory, selectedClass, lang]);

  const selectedVehicle = useMemo(() => {
    return INITIAL_FLEET_DATA.find(v => v.id === selectedVehicleId);
  }, [selectedVehicleId]);

  const otherRelatedCars = useMemo(() => {
    if (!selectedVehicle) return [];
    return INITIAL_FLEET_DATA
      .filter(car => car.category === selectedVehicle.category && car.id !== selectedVehicle.id);
  }, [selectedVehicle]);

  const featuredFleet = useMemo(() => {
    const featuredIds = ['saga-vvt', 'alza-av', 'hrv-v', 'vios-e'];
    return INITIAL_FLEET_DATA.filter(car => featuredIds.includes(car.id));
  }, []);

  const bookingDuration = useMemo(() => {
    const start = new Date(`${bookingData.startDate}T${bookingData.startTime}`);
    const end = new Date(`${bookingData.endDate}T${bookingData.endTime}`);
    const diffTime = end - start;
    const diffHours = diffTime / (1000 * 60 * 60);
    return Math.max(1, Math.ceil((diffHours - 2) / 24));
  }, [bookingData.startDate, bookingData.startTime, bookingData.endDate, bookingData.endTime]);

  const isMidnight = (timeStr) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    return hour >= 0 && hour <= 6;
  };

  const currentCDWConfig = useMemo(() => getCDWConfig(selectedVehicle?.category, selectedVehicle?.class), [selectedVehicle]);
  const discountRate = getDiscountRate(bookingDuration);

  const activeAddOnsList = useMemo(() => {
    const list = [];
    if (bookingData.selectedAddOns.includes('cdw')) list.push({ id: 'cdw', name: T.extraCoverage, price: currentCDWConfig?.rate || 0, info: `${T.excessInfo} ${currentCDWConfig?.amount}` });
    if (isSafetySeatEnabled && bookingData.selectedAddOns.includes('baby-seat')) list.push({ id: 'baby-seat', name: T.babySeat, price: 10 });
    if (isSafetySeatEnabled && bookingData.selectedAddOns.includes('child-seat')) list.push({ id: 'child-seat', name: T.childSeat, price: 10 });
    if (isSafetySeatEnabled && bookingData.selectedAddOns.includes('booster-seat')) list.push({ id: 'booster-seat', name: T.boosterSeat, price: 10 });
    return list;
  }, [bookingData.selectedAddOns, isSafetySeatEnabled, currentCDWConfig, T]);

  const pricingDetails = useMemo(() => {
    if (!selectedVehicle) return { total: 0 };
    const base = selectedVehicle.price * bookingDuration;
    const discount = base * discountRate;
    const addOnsDaily = activeAddOnsList.reduce((sum, item) => sum + item.price, 0);
    const midnightSurcharge = (isMidnight(bookingData.startTime) ? 50 : 0) + (isMidnight(bookingData.endTime) ? 50 : 0);
    const totalAddOns = (addOnsDaily * bookingDuration) + midnightSurcharge;
    const deposit = getDepositAmount(selectedVehicle.class);
    return { 
      base, 
      discount, 
      addOns: totalAddOns, 
      deposit,
      total: base - discount + totalAddOns + deposit 
    };
  }, [selectedVehicle, bookingDuration, discountRate, activeAddOnsList, bookingData.startTime, bookingData.endTime]);

  const handleSliderDownInternal = (e) => {
    if (!reviewSliderRef.current) return;
    setIsDownReview(true);
    setStartX(e.pageX - reviewSliderRef.current.offsetLeft);
    setScrollLeft(reviewSliderRef.current.scrollLeft);
  };

  const handleSliderMoveInternal = (e) => {
    if (!isDownReview || !reviewSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - reviewSliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    reviewSliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleBookingChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppBooking = () => {
    if (!selectedVehicle) return;
    const msg = `${T.waMsg}\nVehicle: ${selectedVehicle.model.toUpperCase()}\nRental Details:\n- Location: ${bookingData.location}\n- Start: ${bookingData.startDate} @ ${bookingData.startTime}\n- End: ${bookingData.endDate} @ ${bookingData.endTime}\n- Duration: ${bookingDuration} ${lang === 'BM' ? 'Hari' : 'Day'}(s)\n\nTotal: RM${pricingDetails.total.toFixed(2)} (Incl. RM${pricingDetails.deposit} deposit)`;
    window.open(`https://wa.me/60167186595?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const toggleAddOn = (id) => setBookingData(prev => ({
    ...prev, selectedAddOns: prev.selectedAddOns.includes(id) ? prev.selectedAddOns.filter(x => x !== id) : [...prev.selectedAddOns, id]
  }));

  const processEmailAction = (type) => {
    const targetEmail = "hello@avantecarrental.com";
    const subject = `Pertanyaan Avante daripada ${contactForm.name}`;
    const body = `Nama: ${contactForm.name}\nEmel: ${contactForm.email}\n\nMesej:\n${contactForm.message}`;
    if (type === 'gmail') {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    } else {
      window.open(`mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
    setShowMailOptions(false);
    setIsMessageSent(true);
    setContactForm({ name: '', email: '', message: '' });
  };

  const GeneralBackButton = () => {
    if (activeTab === 'dashboard' || navHistory.length <= 1) return null;
    return (
      <button 
        onClick={goBack} 
        className="flex items-center text-[11px] font-black text-gray-400 hover:text-gray-900 transition-colors mb-8 tracking-widest uppercase group"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> {T.back}
      </button>
    );
  };

  const renderContent = () => {
    if (activeTab === 'vehicle-management' && selectedVehicle) {
      const { make, remainder } = splitCarName(selectedVehicle.model);

      const photoViews = [
        { id: 'side', label: 'Side View', url: selectedVehicle.image },
        { id: 'front', label: 'Front View', url: selectedVehicle.image.replace('side-view', 'front-view') },
        { id: 'rear', label: 'Rear View', url: selectedVehicle.image.replace('side-view', 'rear-view') },
        { id: 'int1', label: 'Interior 1', url: selectedVehicle.image.replace('side-view', 'interior-view-1') },
        { id: 'int2', label: 'Interior 2', url: selectedVehicle.image.replace('side-view', 'interior-view-2') },
        { id: 'int3', label: 'Interior 3', url: selectedVehicle.image.replace('side-view', 'interior-view-3') },
        { id: 'int4', label: 'Interior 4', url: selectedVehicle.image.replace('side-view', 'interior-view-4') }
      ];

      const currentImageUrl = photoViews.find(v => v.id === activePhotoView)?.url || selectedVehicle.image;

      return (
        <div className="rental-container animate-in py-10">
          <button onClick={() => changeTab('fleet')} className="flex items-center text-[11px] font-black text-gray-400 hover:text-gray-900 transition-colors mb-10 tracking-widest uppercase">
            <ArrowLeft size={16} className="mr-2" /> {T.backToFleet}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8">
              <div className="group relative">
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 p-12 flex items-center justify-center min-h-[400px] relative shadow-sm">
                  <img 
                    key={currentImageUrl}
                    src={currentImageUrl} 
                    alt={`${selectedVehicle.model} ${activePhotoView}`} 
                    className="w-full h-auto object-contain relative z-10 animate-in fade-in zoom-in-95 duration-500" 
                  />
                </div>

                <div className="absolute bottom-6 left-0 right-0 flex flex-wrap justify-center gap-2 px-6 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-500 pointer-events-none group-hover:pointer-events-auto z-20">
                  <div className="bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex gap-2">
                    {photoViews.map((view) => (
                      <button
                        key={view.id}
                        onClick={() => setActivePhotoView(view.id)}
                        className={`w-14 h-10 rounded-lg border-2 transition-all overflow-hidden flex items-center justify-center p-0.5 bg-white ${
                          activePhotoView === view.id ? 'border-blue-600 scale-110' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={view.url} alt={view.label} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 pb-2 border-b border-gray-50">{T.priceGuide}</h3>
                <div className="grid grid-cols-3 gap-2.5">
                  {[3, 5, 7, 14, 21, 30].map(d => {
                    const basePrice = selectedVehicle.price * d;
                    const discount = getDiscountRate(d);
                    const totalEstimated = basePrice * (1 - discount);
                    return (
                      <div key={d} className="bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-blue-50/50 hover:border-blue-100 transition-all duration-300">
                        <span className="text-[11px] font-black text-blue-600 uppercase mb-1 tracking-tight leading-none">{d} {T.days}</span>
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] font-bold text-gray-400 line-through leading-none mb-0.5 opacity-60">RM{basePrice}</span>
                          <span className="text-[14px] font-black text-gray-900 leading-none">RM{Math.round(totalEstimated)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm shadow-blue-100">
                    <SpeedometerIcon size={20}/>
                  </div>
                  <p className="font-black text-gray-900 text-xs mb-1 uppercase tracking-wider">{T.unlimitedMileage}</p>
                  <p className="text-[10px] font-bold text-blue-700/70 leading-tight uppercase">{lang === 'BM' ? 'Jalan jauh tanpa caj tambahan' : 'Drive far without extra charges'}</p>
                </div>
                <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm shadow-emerald-100"><ShieldCheck size={20}/></div>
                  <p className="font-black text-gray-900 text-xs mb-1 uppercase tracking-wider">{lang === 'BM' ? 'Insurans & Keselamatan' : 'Insurance & Safety'}</p>
                  <p className="text-[10px] font-bold text-emerald-700/70 leading-tight uppercase">{lang === 'BM' ? 'Perlindungan asas + pilihan naik taraf' : 'Basic protection + upgrade option'}</p>
                </div>
                <div className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm shadow-orange-100"><Truck size={20}/></div>
                  <p className="font-black text-gray-900 text-xs mb-1 uppercase tracking-wider">{T.freeDelivery}</p>
                  <p className="text-[10px] font-bold text-orange-700/70 leading-tight uppercase">{lang === 'BM' ? 'Sewa 3 hari & ke atas' : 'Rent 3 days & above'}</p>
                </div>
                <div className="bg-purple-50/50 p-6 rounded-[2rem] border border-purple-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm shadow-purple-100"><LifeBuoy size={20}/></div>
                  <p className="font-black text-gray-900 text-xs mb-1 uppercase tracking-wider">{T.roadSupport}</p>
                  <p className="text-[10px] font-bold text-purple-700/70 leading-tight uppercase">{lang === 'BM' ? 'Kami tolong bila-bila masa' : 'Assistance anytime'}</p>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-gray-50">{T.vehicleSpecs}</h3>
                <div className="grid grid-cols-2 gap-y-8 gap-x-10">
                  <SpecItem icon={Car} label={T.bodyType} value={selectedVehicle.category} />
                  <SpecItem icon={Briefcase} label={T.luggage} value={selectedVehicle.boot || '400L'} />
                  <SpecItem icon={Fuel} label={T.energy} value={selectedVehicle.fuel} />
                  <SpecItem icon={Gauge} label={T.transmission} value={selectedVehicle.transmission} />
                  <SpecItem icon={Cpu} label={T.capacity} value={selectedVehicle.engine || '1.5L'} />
                  <SpecItem icon={Users} label={T.guests} value={selectedVehicle.seats} />
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 pb-4 border-b border-gray-50">{T.vehicleFeatures}</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  {(lang === 'EN' ? selectedVehicle.featuresEN : selectedVehicle.featuresBM).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-gray-600 font-bold text-[13px] group shrink-0">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                      </div>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {otherRelatedCars.length > 0 && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 overflow-hidden select-none relative">
                  <div className="mb-8 pb-4 border-b border-gray-50">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      {T.otherCars} {selectedVehicle.category}s
                    </h3>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar -mx-4 px-4 pb-4">
                    <div className="flex space-x-5 w-max">
                      {otherRelatedCars.map((car) => {
                        const { make, remainder } = splitCarName(car.model);
                        return (
                          <div 
                            key={car.id} 
                            onClick={() => handleManageClick(car.id)}
                            className="min-w-[165px] w-[165px] bg-white border border-gray-100 rounded-[2rem] p-4 cursor-pointer hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center"
                          >
                            <div className="h-24 w-full flex items-center justify-center bg-gray-50/50 rounded-2xl mb-3 relative overflow-hidden">
                              <img 
                                src={car.image} 
                                alt={car.model} 
                                className="max-w-[90%] h-auto object-contain p-1 group-hover:scale-110 transition-transform duration-700" 
                              />
                            </div>
                            <div className="w-full">
                              <span className="text-[7px] font-black text-blue-600 uppercase tracking-widest mb-0.5 block">
                                {car.class}
                              </span>
                              <h4 className="text-[11px] font-black text-gray-900 uppercase leading-tight min-h-[26px] flex items-center justify-center">
                                {make} {remainder}
                              </h4>

                              <div className="pt-2 border-t border-gray-50 mt-2">
                                <span className="text-sm font-black text-gray-900 leading-none">RM{car.price}</span>
                                <span className="text-[8px] font-black text-gray-400 uppercase ml-0.5">/{T.day}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-10 space-y-6">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8">
                  <div className="mb-8">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase mr-2">{selectedVehicle.class}</span>
                    <h1 className="rental-h1 mt-2 mb-1 uppercase leading-[1.1]">{make}<br/>{remainder}</h1>
                    <p className="text-2xl font-black">RM{selectedVehicle.price}.00<span className="text-xs text-gray-400">/{T.perDay}</span></p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center"><MapPin size={12} className="mr-1.5" /> {T.pickupLoc}</label>
                      <select value={bookingData.location} onChange={e => handleBookingChange('location', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-xs font-bold focus:bg-white transition-all outline-none appearance-none cursor-pointer">
                        {T.locations.map((loc, idx) => (
                          <option key={idx} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center"><Calendar size={12} className="mr-1.5" /> {T.startDate}</label>
                        <input type="date" value={bookingData.startDate} onChange={e => handleBookingChange('startDate', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-3 pr-1 py-4 text-xs font-bold outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center"><Clock size={12} className="mr-1.5" /> {T.time}</label>
                        <select value={bookingData.startTime} onChange={e => handleBookingChange('startTime', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-xs font-bold outline-none">
                          {[...Array(24)].map((_, i) => <option key={i} value={`${i < 10 ? '0'+i : i}:00`}>{i < 10 ? '0'+i : i}:00</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center"><Calendar size={12} className="mr-1.5" /> {T.endDate}</label>
                        <input type="date" value={bookingData.endDate} onChange={e => handleBookingChange('endDate', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-3 pr-1 py-4 text-xs font-bold outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center"><Clock size={12} className="mr-1.5" /> {T.time}</label>
                        <select value={bookingData.endTime} onChange={e => handleBookingChange('endTime', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-xs font-bold outline-none">
                          {[...Array(24)].map((_, i) => <option key={i} value={`${i < 10 ? '0'+i : i}:00`}>{i < 10 ? '0'+i : i}:00</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest flex items-center"><Plus size={12} className="mr-1.5" /> {T.optionalAddons}</label>
                        <div className="space-y-3">
                          <div className={`w-full p-4 rounded-2xl border transition-all ${bookingData.selectedAddOns.includes('cdw') ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'}`}>
                             <button onClick={() => toggleAddOn('cdw')} className="w-full flex items-center justify-between text-left group">
                                <div className="flex items-center space-x-3">
                                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${bookingData.selectedAddOns.includes('cdw') ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                      {bookingData.selectedAddOns.includes('cdw') && <CheckCircle2 size={14} className="text-white" />}
                                   </div>
                                   <div className="flex items-center space-x-2">
                                      <ShieldCheck size={14} className={bookingData.selectedAddOns.includes('cdw') ? "text-blue-600" : "text-gray-500"} />
                                      <p className={`text-[11px] font-black uppercase tracking-tight ${bookingData.selectedAddOns.includes('cdw') ? "text-blue-900" : "text-gray-500"}`}>{T.extraCoverage}</p>
                                   </div>
                                </div>
                                <ChevronDown size={14} className={`transition-transform duration-300 ${bookingData.selectedAddOns.includes('cdw') ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                             </button>
                             {bookingData.selectedAddOns.includes('cdw') && (
                               <div className="pl-8 pt-4 animate-in slide-in-from-top-2">
                                  <div className="flex justify-between items-center mb-1">
                                     <p className="text-[11px] font-black text-blue-900 uppercase">CDW Protection</p>
                                     <span className="text-[10px] font-black text-blue-600">RM{currentCDWConfig?.rate}/{T.day}</span>
                                  </div>
                                  <p className="text-[10px] font-bold text-blue-700 leading-tight">{T.excessInfo} {currentCDWConfig?.amount}</p>
                               </div>
                             )}
                          </div>

                          <div className={`w-full p-4 rounded-2xl border transition-all ${isSafetySeatEnabled ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'}`}>
                             <button onClick={() => setIsSafetySeatEnabled(!isSafetySeatEnabled)} className="w-full flex items-center justify-between text-left">
                                <div className="flex items-center space-x-3">
                                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSafetySeatEnabled ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-100'}`}>
                                      {isSafetySeatEnabled && <CheckCircle2 size={14} className="text-white" />}
                                   </div>
                                   <div className="flex items-center space-x-2">
                                      <Baby size={14} className={isSafetySeatEnabled ? "text-blue-600" : "text-gray-400"} />
                                      <p className={`text-[11px] font-black uppercase tracking-tight ${isSafetySeatEnabled ? "text-blue-900" : "text-gray-500"}`}>{T.safetySeat}</p>
                                   </div>
                                </div>
                                <ChevronDown size={14} className={`transition-transform duration-300 ${isSafetySeatEnabled ? 'rotate-180' : 'text-gray-400'}`} />
                             </button>
                             {isSafetySeatEnabled && (
                               <div className="pl-8 pt-4 space-y-3 animate-in slide-in-from-top-2">
                                  <button onClick={() => toggleAddOn('baby-seat')} className="w-full flex items-center justify-between text-left group">
                                     <div className="flex items-center space-x-2">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${bookingData.selectedAddOns.includes('baby-seat') ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                           {bookingData.selectedAddOns.includes('baby-seat') && <CheckCircle2 size={14} className="text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-bold ${bookingData.selectedAddOns.includes('baby-seat') ? 'text-blue-700' : 'text-gray-500'}`}>{T.babySeat}</span>
                                     </div>
                                     <span className="text-[10px] font-black text-blue-600">RM10/{T.day}</span>
                                  </button>
                                  <button onClick={() => toggleAddOn('child-seat')} className="w-full flex items-center justify-between text-left group">
                                     <div className="flex items-center space-x-2">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${bookingData.selectedAddOns.includes('child-seat') ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                           {bookingData.selectedAddOns.includes('child-seat') && <CheckCircle2 size={14} className="text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-bold ${bookingData.selectedAddOns.includes('child-seat') ? 'text-blue-700' : 'text-gray-500'}`}>{T.childSeat}</span>
                                     </div>
                                     <span className="text-[10px] font-black text-blue-600">RM10/{T.day}</span>
                                  </button>
                                  <button onClick={() => toggleAddOn('booster-seat')} className="w-full flex items-center justify-between text-left group">
                                     <div className="flex items-center space-x-2">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${bookingData.selectedAddOns.includes('booster-seat') ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                           {bookingData.selectedAddOns.includes('booster-seat') && <CheckCircle2 size={14} className="text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-bold ${bookingData.selectedAddOns.includes('booster-seat') ? 'text-blue-700' : 'text-gray-500'}`}>{T.boosterSeat}</span>
                                     </div>
                                     <span className="text-[10px] font-black text-blue-600">RM10/{T.day}</span>
                                  </button>
                               </div>
                             )}
                          </div>

                          { (isMidnight(bookingData.startTime) || isMidnight(bookingData.endTime)) && (
                            <div className={`w-full p-4 rounded-2xl border transition-all bg-blue-50 border-blue-200 animate-in slide-in-from-top-2`}>
                               <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                     <div className="w-5 h-5 rounded border bg-blue-600 border-blue-600 flex items-center justify-center transition-colors">
                                        <CheckCircle2 size={14} className="text-white" />
                                     </div>
                                     <div className="flex items-center space-x-2">
                                        <Moon size={14} className="text-blue-600" />
                                        <p className="text-[11px] font-black uppercase tracking-tight text-blue-900 leading-tight">
                                          {T.midnightService}<br/>
                                          <span className="text-[9px] opacity-60">{T.midnightHours}</span>
                                        </p>
                                     </div>
                                  </div>
                                  <span className="text-[10px] font-black text-blue-600">RM{((isMidnight(bookingData.startTime) ? 50 : 0) + (isMidnight(bookingData.endTime) ? 50 : 0))}.00</span>
                               </div>
                               <div className="pl-8 pt-4 space-y-2 font-bold text-[10px] text-blue-700">
                                  {isMidnight(bookingData.startTime) && <div>{T.midnightInfo1} (RM50.00)</div>}
                                  {isMidnight(bookingData.endTime) && <div>{T.midnightInfo2} (RM50.00)</div>}
                               </div>
                            </div>
                          )}
                       </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl space-y-2 border border-gray-100">
                      <div className="flex justify-between text-xs font-bold text-gray-500">
                        <span>{T.rental} ({bookingDuration} {lang === 'BM' ? 'Hari' : 'Day'})</span>
                        <span>RM{pricingDetails.base}</span>
                      </div>
                      
                      {discountRate > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-green-600">
                            <span>Promo (-{Math.round(discountRate*100)}%)</span>
                            <span>-RM{pricingDetails.discount.toFixed(2)}</span>
                          </div>
                          {/* Right-aligned discounted amount only */}
                          <div className="flex justify-end">
                            <span className="text-[13px] font-black text-emerald-900 leading-none bg-emerald-100/40 px-3 py-1.5 rounded-lg border border-emerald-100/50">
                               RM{(pricingDetails.base - pricingDetails.discount).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                      {pricingDetails.addOns > 0 && <div className="flex justify-between text-xs font-bold text-blue-600"><span>{lang === 'BM' ? 'Tambahan' : 'Add-ons'}</span><span>+RM{pricingDetails.addOns.toFixed(2)}</span></div>}
                      <div className="flex justify-between text-xs font-bold text-amber-600"><span>{T.secDepositLabel}</span><span>+RM{pricingDetails.deposit.toFixed(2)}</span></div>
                      
                      <div className="flex justify-between pt-2 border-t border-gray-200 font-black text-gray-900 text-lg"><span>{T.estTotal}</span><span className="text-blue-600">RM{pricingDetails.total.toFixed(2)}</span></div>
                    </div>
                    <button onClick={handleWhatsAppBooking} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">{T.bookNow}</button>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                       <AlertCircle size={10} className="text-gray-400" /><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic text-center">{T.securityDeposit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="animate-in fade-in space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <GeneralBackButton />
                <h1 className="rental-h1 mb-2">{T.welcome}</h1>
              </div>
            </header>
            
            <div className="overflow-hidden select-none">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-800 tracking-tight">{T.activePromos}</h3>
              </div>
              
              <div className="overflow-x-auto custom-scrollbar pb-4">
                <div className="grid grid-rows-2 grid-flow-col gap-4 w-max pr-10">
                  {PROMOTIONS_DATA.map(promo => {
                    const PromoIcon = promo.icon;
                    const currentTitle = lang === 'EN' ? promo.titleEN : promo.titleBM;
                    const currentValue = lang === 'EN' ? promo.valueEN : promo.valueBM;
                    const currentSubtext = lang === 'EN' ? promo.subtextEN : promo.subtextBM;
                    const currentCondition = lang === 'EN' ? promo.conditionEN : promo.conditionBM;
                    const isKmPromo = ['50% OFF', '60% OFF', '65% OFF', '70% OFF'].includes(promo.valueEN);
                    const styles = getPromoStyles(promo.theme);

                    return (
                      <div 
                        key={promo.id} 
                        className={`min-w-[280px] p-6 rounded-[2rem] border transition-all hover:shadow-md flex flex-col justify-between ${styles.card}`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${styles.textTitle}`}>{currentTitle}</p>
                              <h3 className={`text-2xl font-black ${styles.textValue}`}>{currentValue}</h3>
                            </div>
                            <div className={`p-2 rounded-lg ${styles.iconBox}`}>
                              <PromoIcon size={18} />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold flex items-center ${styles.validityText}`}>
                              <ArrowUpRight size={14} className={`mr-1 ${styles.validityIcon}`} />
                              {T.validity}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${styles.subtext}`}>{currentSubtext}</span>
                            {currentCondition && (
                                <span className={`text-[9px] font-bold mt-1 ${styles.subtext}`}>{currentCondition}</span>
                            )}
                          </div>
                        </div>

                        <div className={`mt-4 py-1.5 px-3 rounded-xl text-[9px] font-black uppercase tracking-wider text-center ${styles.badge}`}>
                          {T.freeDelivery} & {isKmPromo ? '4000KM' : T.unlimitedMileage}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 mb-8 overflow-hidden select-none relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center border border-yellow-100 shadow-sm">
                        <Zap size={32} className="text-yellow-500 fill-yellow-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-800 tracking-tight">{T.flashDeals}</h3>
                        <p className="rental-body text-gray-400 text-sm font-bold mt-1">{T.flashDealsDesc}</p>
                        <p className="text-xs text-blue-600 font-bold mt-1">{T.min2Days}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-100">
                    <Clock size={16} className="animate-pulse"/>
                    <span className="text-xs font-black uppercase tracking-widest">{T.endsIn} {timeUntilMidnight}</span>
                </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar pb-4">
                  <div className="grid grid-rows-2 grid-flow-col gap-6 w-max pr-6">
                    {FLASH_DEALS.map(deal => {
                        const carData = INITIAL_FLEET_DATA.find(c => c.id === deal.vehicleId);
                        const oldPrice = carData ? carData.price : 0;
                        const newPrice = Math.round(oldPrice * 0.9);

                        return (
                          <div key={deal.id} onClick={() => handleManageClick(deal.vehicleId)} className="w-[240px] p-4 bg-gray-50/80 rounded-[1.5rem] border border border-gray-100 hover:bg-white hover:shadow-lg hover:border-yellow-200 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                              <div className="mt-2 mb-2 flex justify-center">
                                  <img src={deal.image} alt={deal.car} className="h-16 object-contain group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              
                              <h4 className="text-sm font-black text-gray-900 mb-1">{deal.car}</h4>
                              
                              <div className="flex items-center space-x-2 mt-1 mb-2">
                                <span className="text-[10px] font-bold text-gray-400 line-through">RM{oldPrice}</span>
                                <span className="text-sm font-black text-blue-600">RM{newPrice}<span className="text-[9px] text-gray-400">/{T.day}</span></span>
                              </div>
                              
                              <button className="w-full bg-gray-900 text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider group-hover:bg-blue-600 transition-colors">
                                  {T.grabDeal}
                              </button>
                          </div>
                        );
                    })}
                  </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black text-gray-800 tracking-tight">{T.featuredFleet}</h3>
                      <button onClick={() => { handleCategoryFilter(lang === 'BM' ? 'Semua' : 'All'); changeTab('fleet'); }} className="text-xs font-black text-blue-600 flex items-center hover:translate-x-1 transition-transform uppercase tracking-wider">{T.browseAll} <ExternalLink size={14} className="ml-1.5" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {featuredFleet.map(car => (
                        <div key={car.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer group p-1" onClick={() => handleManageClick(car.id)}>
                          <div className="h-40 bg-gray-50/50 rounded-2xl relative flex items-center justify-center overflow-hidden">
                            <img src={car.image} alt={car.model} className="w-[85%] h-[85%] object-contain p-2 transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute top-4 right-4"><div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-gray-100 text-[10px] font-black text-blue-600">RM{String(car.price)}.00/{T.day}</div></div>
                          </div>
                          <div className="p-5">
                            <p className="text-sm font-black text-gray-900 mb-0.5 uppercase truncate">
                              {car.model}
                            </p>
                            <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-4 block">{String(car.class)}</span>
                            <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-50">
                                <div className="flex flex-col items-center"><Gauge size={12} className="text-gray-300 mb-1" /><span className="text-[8px] font-bold text-gray-500 uppercase">{car.transmission === 'Auto' ? 'AT' : String(car.transmission)}</span></div>
                                <div className="flex flex-col items-center border-x border-gray-100"><Cpu size={12} className="text-gray-300 mb-1" /><span className="text-[8px] font-bold text-gray-500 uppercase">{String(car.engine)}</span></div>
                                <div className="flex flex-col items-center"><Users size={12} className="text-gray-300 mb-1" /><span className="text-[8px] font-bold text-gray-500 uppercase">{String(car.seats)}</span></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                    <h3 className="text-xl font-black text-gray-800 mb-8 tracking-tight">{T.deliveryHubs}</h3>
                    <div className="rental-body space-y-4 flex-1 text-sm font-bold">
                      <div className="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 hover:shadow-md transition-all cursor-pointer" onClick={() => changeTab('delivery-hubs')}><div className="p-2 bg-blue-600 rounded-lg text-white shadow-md"><MapPin size={18} /></div><div><p className="font-black text-blue-900 text-sm leading-tight">{T.hubSunway}</p><p className="text-[10px] font-bold text-blue-700/80 uppercase mt-1">Bandar Sunway - USJ</p></div></div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 hover:shadow-md transition-all cursor-pointer" onClick={() => changeTab('delivery-hubs')}><div className="p-2 bg-blue-600 rounded-lg text-white shadow-md"><MapPin size={18} /></div><div><p className="font-black text-blue-900 text-sm leading-tight">{T.hubKL}</p><p className="text-[10px] font-bold text-blue-700/80 uppercase mt-1">{T.hubKLDesc}</p></div></div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 hover:shadow-md transition-all cursor-pointer" onClick={() => changeTab('delivery-hubs')}><div className="p-2 bg-blue-600 rounded-lg text-white shadow-md"><MapPin size={18} /></div><div><p className="font-black text-blue-900 text-sm leading-tight">{T.hubPJ}</p><p className="text-[10px] font-bold text-blue-700/80 uppercase mt-1">{T.hubPJDesc}</p></div></div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 hover:shadow-md transition-all cursor-pointer" onClick={() => changeTab('delivery-hubs')}><div className="p-2 bg-blue-600 rounded-lg text-white shadow-md"><MapPin size={18} /></div><div><p className="font-black text-blue-900 text-sm leading-tight">{T.hubTBS}</p><p className="text-[10px] font-bold text-blue-700/80 uppercase mt-1">{T.hubTBSDesc}</p></div></div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 hover:shadow-md transition-all cursor-pointer" onClick={() => changeTab('delivery-hubs')}><div className="p-2 bg-blue-600 rounded-lg text-white shadow-md"><MapPin size={18} /></div><div><p className="font-black text-blue-900 text-sm leading-tight">{T.hubKLIA}</p><p className="text-[10px] font-bold text-blue-700/80 uppercase mt-1">{T.hubKLIADesc}</p></div></div>
                      
                      <button 
                        onClick={() => changeTab('delivery-hubs')}
                        className="w-full flex items-center justify-between p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-md group mt-2"
                      >
                        <span className="text-xs font-black uppercase tracking-widest">{T.viewAllLocations}</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                    <h3 className="text-xl font-black text-gray-800 mb-6 tracking-tight">{T.renterReq}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><UserIcon size={18} /></div><span className="text-sm font-bold text-gray-600">{T.req1}</span></div>
                      <div className="flex items-center space-x-4"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe size={18} /></div><span className="text-sm font-bold text-gray-600">{T.req2}</span></div>
                      <div className="flex items-center space-x-4"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShieldAlert size={18} /></div><span className="text-sm font-bold text-gray-600">{T.req3}</span></div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                    <h3 className="text-xl font-black text-gray-800 mb-6 tracking-tight">{T.payment}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Monitor size={18} /></div><span className="text-sm font-bold text-gray-600">{T.pay1}</span></div>
                      <div className="flex items-center space-x-4"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CreditCard size={18} /></div><span className="text-sm font-bold text-gray-600">{T.pay2}</span></div>
                      <div className="flex items-center space-x-4"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Banknote size={18} /></div><span className="text-sm font-bold text-gray-600">{T.pay3}</span></div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
               <h3 className="text-xl font-black text-gray-800 mb-8 tracking-tight">{T.otherServices}</h3>
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:shadow-md transition-all group">
                     <div className="p-3 bg-white rounded-2xl text-blue-600 mb-4 shadow-sm group-hover:scale-110 transition-transform"><UserIcon size={24}/></div>
                     <p className="text-xs font-black text-gray-900 uppercase tracking-wider">{T.service1}</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:shadow-md transition-all group">
                     <div className="p-3 bg-white rounded-2xl text-blue-600 mb-4 shadow-sm group-hover:scale-110 transition-transform"><Globe size={24}/></div>
                     <p className="text-xs font-black text-gray-900 uppercase tracking-wider">{T.service2}</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:shadow-md transition-all group">
                     <div className="p-3 bg-white rounded-2xl text-blue-600 mb-4 shadow-sm group-hover:scale-110 transition-transform"><Plane size={24}/></div>
                     <p className="text-xs font-black text-gray-900 uppercase tracking-wider">{T.service3}</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:shadow-md transition-all group">
                     <div className="p-3 bg-white rounded-2xl text-blue-600 mb-4 shadow-sm group-hover:scale-110 transition-transform"><Heart size={24}/></div>
                     <p className="text-xs font-black text-gray-900 uppercase tracking-wider">{T.service4}</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:shadow-md transition-all group">
                     <div className="p-3 bg-white rounded-2xl text-blue-600 mb-4 shadow-sm group-hover:scale-110 transition-transform"><Briefcase size={24}/></div>
                     <p className="text-xs font-black text-gray-900 uppercase tracking-wider">{T.service5}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 mb-8 overflow-hidden select-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm"><GoogleIcon size={32} /></div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-800 tracking-tight">{T.reviews}</h3>
                      <div className="flex items-center gap-3 mt-1">
                         <span className="font-black text-gray-900 text-lg">5.0</span>
                         <div className="flex gap-0.5">
                           {[...Array(5)].map((_, i) => (<Star key={i} size={16} className="text-[#FBBC05] fill-[#FBBC05]" />))}
                         </div>
                      </div>
                    </div>
                </div>
                <a href="https://g.page/r/CZyuBcmD6PwSEAE/review" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#4285F4] text-white font-black py-4 px-8 rounded-2xl hover:bg-[#357ae8] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest text-[11px]"><Edit3 size={18} /><span>{T.writeReview}</span></a>
              </div>
              <div 
                ref={reviewSliderRef} 
                onMouseDown={handleSliderDownInternal} 
                onMouseLeave={() => setIsDownReview(false)} 
                onMouseUp={() => setIsDownReview(false)} 
                onMouseMove={handleSliderMoveInternal} 
                className={`flex overflow-x-auto gap-8 pb-8 custom-scrollbar ${isDownReview ? 'cursor-grabbing' : 'cursor-grab'} scroll-smooth`}
              >
                {MOCK_REVIEWS.map(review => (
                  <div key={review.id} className="min-w-[340px] max-w-[340px] p-8 bg-gray-50/50 rounded-[2.5rem] relative border border-gray-100/50 hover:bg-white hover:border-blue-100 transition-all duration-300">
                    <div className="flex items-center gap-1 mb-4">{[...Array(review.rating)].map((_, i) => (<Star key={i} size={12} className="text-[#FBBC05] fill-[#FBBC05]" />))}</div>
                    <p className="rental-body text-gray-600 text-sm leading-relaxed mb-8 italic">"{lang === 'EN' ? review.commentEN : review.commentBM}"</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${review.color || 'bg-blue-600'} flex items-center justify-center text-white font-black text-xs shadow-md`}>{review.name.charAt(0)}</div>
                        <div><p className="font-black text-gray-900 text-[13px]">{review.name}</p><p className="text-[10px] font-bold text-gray-400 uppercase">{review.date}</p></div>
                      </div>
                      <GoogleIcon size={16} className="opacity-30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               <div className="flex items-center space-x-4 mb-10">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><HelpCircle size={24}/></div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">{T.faqTitle}</h3>
               </div>
               <div className="space-y-4">
                 {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div key={num} className={`border border-gray-50 rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === num ? 'bg-gray-50/50 border-blue-100' : 'bg-white hover:bg-gray-50/30'}`}>
                       <button 
                        onClick={() => setOpenFaq(openFaq === num ? null : num)}
                        className="w-full p-6 flex items-center justify-between text-left group"
                       >
                         <span className={`text-[15px] font-black transition-colors ${openFaq === num ? 'text-blue-600' : 'text-gray-800'}`}>
                            {T[`faq${num}Q`]}
                         </span>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === num ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-gray-900'}`}>
                            <ChevronDown size={18} className={`transition-transform duration-300 ${openFaq === num ? 'rotate-180' : ''}`}/>
                         </div>
                       </button>
                       <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === num ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="px-6 pb-6 pt-0">
                             <p className="rental-body text-gray-500 text-sm leading-relaxed border-l-2 border-blue-200 pl-4">
                                {T[`faq${num}A`]}
                             </p>
                          </div>
                       </div>
                    </div>
                 ))}
               </div>
            </div>

          </div>
        );
      case 'terms':
        return (
          <div className="rental-container animate-in fade-in py-10 space-y-10">
            <div>
              <GeneralBackButton />
              <h1 className="rental-h1">{T.termsFull}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      {num === 1 && <UserIcon size={24}/>}
                      {num === 2 && <Shield size={24}/>}
                      {num === 3 && <ShieldAlert size={24}/>}
                      {num === 4 && <Droplets size={24}/>}
                      {num === 5 && <Ban size={24}/>}
                      {num === 6 && <GaugeCircle size={24}/>}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{T[`terms${num}Title`]}</h3>
                  </div>
                  <p className="rental-body text-gray-500 text-sm leading-relaxed">
                    {T[`terms${num}Text`]}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white flex flex-col items-center text-center space-y-4">
               <AlertCircle size={40} className="text-blue-100"/>
               <h3 className="text-xl font-black">{lang === 'BM' ? 'Penting' : 'Important'}</h3>
               <p className="text-sm font-medium opacity-90 max-w-[600px]">
                  {lang === 'BM' 
                    ? 'Dengan meneruskan tempahan, anda bersetuju dengan semua terma dan syarat yang dinyatakan di atas.' 
                    : 'By proceeding with the booking, you agree to all the terms and conditions stated above.'}
               </p>
            </div>
          </div>
        );
        case 'delivery-hubs':
          return (
            <div className="rental-container animate-in fade-in py-10 space-y-10">
              <div>
                <GeneralBackButton />
                <h1 className="rental-h1">{T.deliveryHubMenu}</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubSunway}</h3><p className="text-xs font-medium text-gray-500">{T.hubPJDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubKL}</h3><p className="text-xs font-medium text-gray-500">{T.hubKLDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubPJ}</h3><p className="text-xs font-medium text-gray-500">{T.hubPJDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubTBS}</h3><p className="text-xs font-medium text-gray-500">{T.hubTBSDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubKLIA}</h3><p className="text-sm font-medium text-gray-500">{T.hubKLIADesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubAmpang}</h3><p className="text-sm font-medium text-gray-500">{T.hubAmpangDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubShahAlam}</h3><p className="text-sm font-medium text-gray-500">{T.hubShahAlamDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubCyber}</h3><p className="text-sm font-medium text-gray-500">{T.hubCyberDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubKlang}</h3><p className="text-xs font-medium text-gray-500">{T.hubKlangDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubPuchong}</h3><p className="text-xs font-medium text-gray-500">{T.hubPuchongDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubGombak}</h3><p className="text-xs font-medium text-gray-500">{T.hubGombakDesc}</p></div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all">
                    <div className="p-2.5 bg-blue-600 rounded-xl text-white"><MapPin size={20}/></div>
                    <div><h3 className="font-black text-base text-gray-900 mb-0.5">{T.hubNationwide}</h3><p className="text-xs font-medium text-gray-500">{T.hubNationwideDesc}</p></div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-center space-x-5 shadow-sm">
                    <div className="p-3 bg-blue-600 rounded-xl text-white shrink-0"><Truck size={24}/></div>
                    <p className="font-black text-blue-900 text-sm leading-snug">{T.promo3Days}</p>
                 </div>
                 <div className="bg-orange-50 border border-orange-100 p-6 rounded-[2rem] flex items-center space-x-5 shadow-sm">
                    <div className="p-3 bg-orange-500 rounded-xl text-white shrink-0"><Plane size={24}/></div>
                    <p className="font-black text-orange-900 text-sm leading-snug">{T.promo5Days}</p>
                 </div>
              </div>

              <div className="mt-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden h-[450px]">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1843.9317585327162!2d101.60172735006931!3d3.0712172617880875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3737298f31ef%3A0x12fce883c905ae9c!2sAvante%20Car%20Rental!5e0!3m2!1sen!2smy!4v1769917704983!5m2!1sen!2smy" width="100%" height="100%" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          );
      case 'fleet':
        return (
          <div className="animate-in fade-in pb-20">
             <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div className="flex flex-col">
                  <GeneralBackButton />
                  <h1 className="rental-h1 mb-1">{T.fleet}</h1>
                  {filterCategory !== (lang === 'BM' ? 'Semua' : 'All') && (
                    <button onClick={() => handleCategoryFilter(lang === 'BM' ? 'Semua' : 'All')} className="flex items-center space-x-2 mt-2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-md w-fit uppercase">
                        <X size={12} /><span>{filterCategory}</span>
                    </button>
                  )}
                </div>
                 
                <div className="flex flex-col items-end w-full md:w-auto">
                    <div className="mb-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-1.5 flex items-center space-x-2 animate-in zoom-in-95">
                        <Car size={14} className="text-blue-600" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">
                            {T.totalVehicles}: {filteredFleet.length}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl shadow-inner">
                          <span className="px-2 text-[8px] font-black text-gray-400 uppercase tracking-tighter">{T.class}:</span>
                          {[lang === 'BM' ? 'Semua' : 'All', 'Economy', 'Premium', 'Luxury'].map(cls => (
                            <button key={cls} onClick={() => setSelectedClass(cls)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all whitespace-nowrap ${selectedClass === cls ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}>{cls}</button>
                          ))}
                        </div>
                        
                        <div className="relative flex-1 md:flex-none">
                          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input type="text" placeholder={T.searchModels} className="pl-12 pr-6 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/10 w-full md:w-80 font-bold text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFleet.map(car => {
                  const { make, remainder } = splitCarName(car.model);
                  return (
                    <div key={car.id} onClick={() => handleManageClick(car.id)} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group">
                      <div className="h-44 bg-gray-50/30 flex items-center justify-center relative overflow-hidden">
                        <img src={car.image} alt={car.model} className="w-[80%] h-[80%] object-contain transition-transform group-hover:scale-110 duration-500" />
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm"><ArrowUpRight size={16} /></div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-[15px] font-black text-gray-900 leading-[1.1] mb-0.5 uppercase">
                          {make}<br/>{remainder}
                        </h3>
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-4 block">{String(car.class)}</span>
                        <div className="mt-4 pt-4 border-t border-gray-50">
                           <p className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">{T.startingFrom}</p>
                           <p className="text-lg font-black text-blue-600">RM{String(car.price)}.00<span className="text-[10px] text-gray-400 lowercase">/{T.day}</span></p>
                        </div>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
        );
      case 'contact':
        return (
          <div className="rental-container animate-in fade-in py-10">
            <div>
              <GeneralBackButton />
              <h1 className="rental-h1">{T.connect}</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
                <div className="flex items-center space-x-5 mb-8">
                  <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100"><Navigation size={28} /></div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{T.mainHub}</h3>
                </div>

                <div className="space-y-8 flex-1">
                  <div className="flex items-start space-x-5">
                    <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-xl"><MapPin size={22} /></div>
                    <div className="rental-body text-gray-600 font-medium">
                      <p className="font-black text-gray-900 text-sm mb-1 uppercase tracking-wider">{T.addressTitle}</p>
                      {T.address}
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 w-full"></div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-5">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Phone size={22} /></div>
                      <div>
                        <p className="font-black text-gray-900 text-[10px] mb-0.5 uppercase tracking-widest opacity-40 leading-none">{T.voiceText}</p>
                        <a href="tel:+60167186595" className="text-xl font-black text-gray-900 tracking-tight hover:text-blue-600 transition-colors">+6016 718 6595</a>
                      </div>
                    </div>
                    <div className="pl-[52px]">
                       <a href="https://wa.me/60167186595" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 uppercase tracking-widest text-[10px] w-full inline-flex"><MessageCircle size={18} /><span>{T.waBusiness}</span></a>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 w-full"></div>

                  <div className="flex items-center space-x-5">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Mail size={22} /></div>
                    <div className="flex-1">
                      <p className="font-black text-gray-900 text-[10px] mb-0.5 uppercase tracking-widest opacity-40 leading-none">{T.digitalInquiries}</p>
                      <button className="text-lg font-black text-blue-600 hover:underline cursor-pointer transition-all" onClick={() => setShowMailOptions(true)}>hello@avantecarrental.com</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl shadow-sm">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">{T.deliveryHours}</p>
                         <p className="text-[13px] font-black text-gray-900 leading-none">{T.deliveryHoursRange}</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl shadow-sm">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">{T.reservationHours}</p>
                         <p className="text-[13px] font-black text-gray-900 leading-none">{T.reservationHoursRange}</p>
                      </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col relative overflow-hidden h-full">
                {isMessageSent && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 p-10 text-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm"><Check size={40} /></div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{T.inquiryReady}</h3>
                    <p className="rental-body text-gray-500 text-sm leading-relaxed max-w-[280px]">{T.inquiryInfo}</p>
                    <button onClick={() => setIsMessageSent(false)} className="mt-8 text-blue-600 font-black text-xs uppercase tracking-widest border-b-2 border-blue-600 pb-1">{T.sendAnother}</button>
                  </div>
                )}
                <div className="mb-10"><h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">{T.sendInquiry}</h3><p className="rental-body text-gray-400 text-sm">{T.responseTime}</p></div>
                <form className="space-y-6 flex-1" onSubmit={(e) => { e.preventDefault(); setShowMailOptions(true); }}>
                  <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">{T.fullName}</label><input type="text" placeholder="Nama penuh anda" required value={contactForm.name} onChange={(e) => handleContactChange('name', e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold outline-none" /></div>
                  <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">{T.emailAddress}</label><input type="email" placeholder="john@example.com" required value={contactForm.email} onChange={(e) => handleContactChange('email', e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold outline-none" /></div>
                  <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">{T.message}</label><textarea rows="4" placeholder={lang === 'BM' ? 'Macam mana kami boleh membantu anda?' : 'How can we help you?'} required value={contactForm.message} onChange={(e) => handleContactChange('message', e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold outline-none"></textarea></div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center space-x-3 transition-all hover:bg-blue-700 shadow-xl uppercase tracking-widest text-xs mt-auto"><Send size={18} /><span>{T.sendMessage}</span></button>
                </form>
              </div>
            </div>
            <div className="mt-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden h-[450px]">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1843.9317585327162!2d101.60172735006931!3d3.0712172617880875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3737298f31ef%3A0x12fce883c905ae9c!2sAvante%20Car%20Rental!5e0!3m2!1sen!2smy!4v1769917704983!5m2!1sen!2smy" width="100%" height="100%" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800" style={USER_STYLES}>
      {showMailOptions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setShowMailOptions(false)}></div>
          <div className="bg-white w-full max-md:max-w-md rounded-[2.5rem] p-10 relative z-10 shadow-2xl animate-in zoom-in-95">
              <button onClick={() => setShowMailOptions(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"><X size={24}/></button>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Mail size={32}/></div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{T.selectMail}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{T.selectMailInfo}</p>
              </div>
              <div className="space-y-4">
                <button onClick={() => processEmailAction('gmail')} className="w-full group flex items-center justify-between p-5 bg-gray-50 border border-blue-600 rounded-2xl hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform"><Monitor size={20}/></div>
                      <div className="text-left"><p className="text-sm font-black text-gray-900 group-hover:text-white uppercase tracking-wider">{T.gmail}</p></div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-white" />
                </button>
                <button onClick={() => processEmailAction('default')} className="w-full group flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-900 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><Smartphone size={20}/></div>
                      <div className="text-left"><p className="text-sm font-black text-gray-900 group-hover:text-white uppercase tracking-wider">{T.defaultMail}</p></div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-white" />
                </button>
              </div>
          </div>
        </div>
      )}
      <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col shrink-0">
        <div className="p-10 border-b border-gray-100 flex items-center justify-center cursor-pointer" onClick={() => changeTab('dashboard')}>
          <img src={LOGO_URL} alt="Avante Logo" className="w-full h-auto" />
        </div>
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={LayoutDashboard} label={T.home} active={activeTab === 'dashboard'} onClick={() => { changeTab('dashboard'); setFilterCategory(lang === 'BM' ? 'Semua' : 'All'); }} />
          <SidebarItem icon={Car} label={T.fleet} active={activeTab === 'fleet' || activeTab === 'vehicle-management'} onClick={() => { setSelectedVehicleId(null); handleCategoryFilter(lang === 'BM' ? 'Semua' : 'All'); }}>
            <div className="flex flex-col space-y-1.5 mt-3">
              {['Sedan', 'Hatchback', 'SUV', 'MPV'].map(cat => (
                <button key={cat} onClick={(e) => { e.stopPropagation(); handleCategoryFilter(cat); }} className={`w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-[11px] font-black tracking-wider uppercase transition-all ${filterCategory === cat ? 'text-blue-600 bg-blue-50 border border-blue-100' : 'text-gray-400 hover:text-gray-900'}`}>
                  <Circle size={filterCategory === cat ? 6 : 4} className={filterCategory === cat ? "fill-blue-600" : "fill-current"} /><span>{cat}</span>
                </button>
              ))}
            </div>
          </SidebarItem>
          <SidebarItem icon={MapPin} label={T.deliveryHubMenu} active={activeTab === 'delivery-hubs'} onClick={() => changeTab('delivery-hubs')} />
          <SidebarItem icon={FileText} label={T.terms} active={activeTab === 'terms'} onClick={() => changeTab('terms')} />
          <SidebarItem icon={Mail} label={T.support} active={activeTab === 'contact'} onClick={() => changeTab('contact')} />
        </nav>
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-black text-gray-900 leading-tight">Avante Car Rental Enterprise</p>
                <p className="text-[10px] font-bold text-gray-500 mt-1">7, Jalan PJS 11/12, Bandar Sunway - USJ</p>
                <div className="mt-2">
                   <a href="tel:+60167186595" className="text-xs font-black text-blue-700 leading-none hover:underline">+6016 718 6595</a>
                   <p className="text-[11px] font-bold text-blue-700 mt-1 italic leading-none">hello@avantecarrental.com</p>
                </div>
              </div>
              <div className="space-y-1.5">
                 <div className="bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em] leading-none mb-1">{T.deliveryHours}</p>
                    <p className="text-[10px] font-black text-gray-900 leading-none">{T.deliveryHoursRange}</p>
                 </div>
                 <div className="bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em] leading-none mb-1">{T.reservationHours}</p>
                    <p className="text-[10px] font-black text-gray-900 leading-none">{T.reservationHoursRange}</p>
                 </div>
              </div>
              <div className="pt-2 border-t border-gray-200/50">
                <p className="text-[9px] font-bold text-gray-400 leading-tight">© 2026 Avante Car Rental Enterprise (4838348-X)</p>
                <p className="text-[9px] font-bold text-gray-400 leading-tight mt-1">Dikuasakan oleh: Avante Management Systems</p>
              </div>
            </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-10 z-10 shrink-0">
          <div className="flex items-center md:hidden" onClick={() => changeTab('dashboard')}>
            <img src={LOGO_URL} alt="Avante Logo" className="h-10 w-auto" />
          </div>
          <div className="hidden md:block"><p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{lang === 'BM' ? 'Hub Sewa Kereta Malaysia' : "Malaysia's Car Rental Hub"}</p></div>
           
          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-gray-100 p-1 rounded-xl shadow-inner group">
              <button 
                onClick={() => handleLanguageChange('EN')} 
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all duration-300 ${lang === 'EN' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
              >
                ENG
              </button>
              <div className="w-px h-3 bg-gray-300 mx-0.5 group-hover:opacity-0 transition-opacity"></div>
              <button 
                onClick={() => handleLanguageChange('BM')} 
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all duration-300 ${lang === 'BM' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
              >
                BM
              </button>
            </div>

            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-all"><Facebook size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-pink-600 transition-all"><Instagram size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-black transition-all"><TiktokIcon size={18} /></button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10 bg-[#F8FAFC]"><div className="mx-auto" style={{maxWidth: '900px'}}>{renderContent()}</div></div>
      </main>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-5 z-50 shadow-2xl">
         <button onClick={() => { changeTab('dashboard'); }} className={`p-2.5 rounded-xl ${activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}><LayoutDashboard size={22}/></button>
         <button onClick={() => { setSelectedVehicleId(null); changeTab('fleet'); }} className={`p-2.5 rounded-xl ${activeTab === 'fleet' || activeTab === 'vehicle-management' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}><Car size={22}/></button>
         <button onClick={() => changeTab('contact')} className={`p-2.5 rounded-xl ${activeTab === 'contact' ? 'text-blue-600' : 'text-gray-400'}`}><Mail size={22}/></button>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .zoom-in-95 { animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        body { margin: 0; color: #444; background-color: #F8FAFC; font-family: ${USER_STYLES.fontFamily}; overflow: hidden; }
        .rental-container { max-width: 900px; margin: 0 auto; padding: 20px; }
        .rental-h1 { font-size: 30pt; font-weight: 700; color: #1a1a1a; margin-bottom: 20px; letter-spacing: -0.02em; }
        .rental-body { font-size: 14pt; color: #444; line-height: 1.6; }
        @media (max-width: 600px) { .rental-h1 { font-size: 22pt !important; } }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .select-none { user-select: none; }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.5; }
      `}} />
    </div>
  );
}
