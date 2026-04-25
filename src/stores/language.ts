import { atom } from "nanostores";

export type Language = "en" | "th";

export const currentLanguage = atom<Language>("th");

export const translations = {
  en: {
    // Navigation
    services: "Services",
    features: "Features",
    faq: "FAQ",
    blog: "Blog",
    blogTitle: "Articles & Insights",
    blogDescription:
      "Tips and strategies to grow your business with online booking systems",
    viewAllBlogs: "View all articles",
    integrations: "Integrations",
    businesses: "Businesses",
    loadMore: "Load More",
    contact: "Contact",
    bookNow: "Book Now",

    // Hero Section
    heroEyebrow: "LINE OA BOOKING PLATFORM",
    heroTitle: "Booking System via",
    heroSubtitle: "Easy booking, instant customer connection",
    heroDescription:
      "Appointment booking system, queue management, customer database collection. Create your own booking system connected to LINE Official Account. Easy to use, ready to start immediately.",
    heroTagline: "",
    trustedBy: "Join the first 1,000 early adopters",
    startBookingNow: "GET STARTED",
    learnMore: "Learn More",
    exploreServices: "Explore Services",
    activeUsers: "Active Users",
    uptime: "Uptime",
    support: "Support",

    // Services Section
    ourServices: "Why Booking Whale",
    servicePortfolio: "Complete Service Portfolio",
    servicesDescription: "Everything You Need in One Place",
    personalTraining: "Personal Training",
    personalTrainingDesc:
      "Book professional personal trainers for customized fitness programs tailored to your goals and lifestyle.",
    retailServices: "Retail Services",
    retailServicesDesc:
      "Schedule shopping appointments and retail consultations with dedicated personal service representatives.",
    eventTickets: "Event Tickets",
    eventTicketsDesc:
      "Book tickets for events, concerts, and activities with instant confirmation and digital delivery.",
    professionalServices: "Professional Services",
    professionalServicesDesc:
      "Book various professional services including meeting rooms, classes, spa treatments, and consultations.",
    mostPopular: "⭐ Most Popular",
    customPrograms: "Custom Programs",
    certifiedTrainers: "Certified Trainers",
    progressTracking: "Progress Tracking",
    personalShopping: "Personal Shopping",
    skipQueue: "Skip the Queue",
    consultation247: "24/7 Consultation",
    digitalTickets: "Digital Tickets",
    freeCancellation: "Free Cancellation",
    bestPrices: "Best Prices",
    wideSelection: "Wide Selection",
    easyBooking: "Easy Booking",
    flexibleScheduling: "Flexible Scheduling",
    notSureService: "Not sure which service fits your needs?",
    expertConsultants:
      "Our expert consultants are here to help you find the perfect solution for your requirements.",
    getFreeConsultation: "Get Free Consultation",

    // Service titles and descriptions
    trainerTitle: "Personal Training",
    trainerDesc:
      "Book professional personal trainers for customized fitness programs tailored to your goals and lifestyle.",
    retailTitle: "Retail Services",
    retailDesc:
      "Schedule shopping appointments and retail consultations with dedicated personal service representatives.",
    ticketTitle: "Event Tickets",
    ticketDesc:
      "Book tickets for events, concerts, and activities with instant confirmation and digital delivery.",
    otherTitle: "Professional Services",
    otherDesc:
      "Book various professional services including meeting rooms, classes, spa treatments, and consultations.",

    // New Services Section - Why Booking Whale
    bookingTitle: "Easy Booking via LINE and All Online Channels",
    bookingDesc:
      "Customers can book instantly through LINE or scan QR codes at your store, with shareable links for Facebook, Instagram, or websites. Accessible anytime, anywhere.",
    scheduleTitle: "Smart Scheduling Never Miss a Queue",
    scheduleDesc:
      "No more worries when customers pile up. The system automatically arranges queues and remembers regular customers' preferred dates and times, making appointments simple and foolproof.",
    noshowTitle: "Reduce No-Shows and Last-Minute Cancellations",
    noshowDesc:
      "Advance notifications via LINE with SLA settings or cancellation fees for late changes. Reduce no-shows, keep queues full, and never miss sales opportunities.",
    rebookingTitle: "Build Customer Relationships, Increase Repeat Bookings",
    rebookingDesc:
      "After service completion, the system automatically sends LINE messages inviting customers to book their next appointment. Simplify decision-making and maintain continuous queue fulfillment.",
    bookingLink: "Learn more",
    scheduleLink: "Learn more",
    noshowLink: "Learn more",
    rebookingLink: "Learn more",

    // Feature translations
    feature1Title: "Instant Online Booking",
    feature1Desc:
      "Customers can easily book through LINE OA, website, or QR Code with Rich Menu buttons in LINE that take customers directly to the booking system.",
    feature2Title: "Smart Queue Management",
    feature2Desc:
      "No matter how many customers you have, the system automatically arranges queues, prevents double bookings or missed appointments. Complete management with confidence in every appointment.",
    feature3Title: "Appointment Reminders & Rebooking Boost",
    feature3Desc:
      "Advance notifications via LINE reduce no-shows with cancellation rules, and automatic rebooking messages after service to keep customers coming back continuously.",
    feature4Title: "Complete Booking Data Collection",
    feature4Desc:
      "Record all booking data with historical records for analysis to increase sales opportunities, plus special digital signature feature to confirm actual service usage.",
    feature5Title: "Real-Time Business Tracking",
    feature5Desc:
      "Real-time booking summary helps you see a clear overview of your business and plan accurately.",
    feature6Title: "Free Cancellation",
    feature6Desc:
      "Cancel your bookings for free with no fees when you notify us 24 hours in advance.",

    // Service feature translations
    customprograms: "Custom Programs",
    certifiedtrainers: "Certified Trainers",
    progresstracking: "Progress Tracking",
    personalshopping: "Personal Shopping",
    skipthequeue: "Skip the Queue",
    "247consultation": "24/7 Consultation",
    digitaltickets: "Digital Tickets",
    freecancellation: "Free Cancellation",
    bestprices: "Best Prices",
    wideselection: "Wide Selection",
    easybooking: "Easy Booking",
    flexiblescheduling: "Flexible Scheduling",

    // Features Section
    whyChoose: "Our Features",
    enterpriseFeatures: "Enterprise Features",
    featuresDescription:
      "Experience the next generation of booking technology with features designed for modern businesses and demanding users who expect excellence.",
    intuitiveInterface: "Intuitive Interface",
    intuitiveDesc:
      "Beautifully designed UI/UX that's simple to use, suitable for everyone from tech-savvy users to seniors.",
    bankLevelSecurity: "Bank-Level Security",
    securityDesc:
      "Enterprise-grade security with end-to-end encryption. Your data is protected with the highest standards.",
    expertSupport: "24/7 Expert Support",
    supportDesc:
      "Our dedicated support team is available around the clock, every day of the year to assist you.",
    crossPlatform: "Cross-Platform Access",
    platformDesc:
      "Seamlessly works across all devices - mobile, tablet, and desktop. Access anywhere, anytime.",
    flexiblePayments: "Flexible Payments",
    paymentsDesc:
      "Multiple payment options including credit cards, QR codes, bank transfers, and digital wallets.",
    cancellationFree: "Free Cancellation",
    cancellationDesc:
      "Cancel your bookings for free with no fees when you notify us 24 hours in advance.",
    freeToStart: "Free to Start",
    startFree: "Join Early Access - FREE",
    freeDescription:
      "Be among the first to experience the future of booking. No setup fees, no commitments. Start your journey with us today.",
    noSetupFees: "No Setup Fees",
    noMonthlyFees: "No Monthly Fees",
    payPerBooking: "Pay Per Booking",
    startFreeToday: "Start Free Today",

    // Booking Modal
    chooseService: "Choose Your Business",
    modalDescription: "Select your business type to get started",
    personalTrainingModal: "Personal Training",
    personalTrainingModalDesc:
      "Professional fitness coaching and personalized workout programs",
    retailServicesModal: "Retail Services",
    retailServicesModalDesc:
      "Personal shopping and retail consultations with experts",
    eventTicketsModal: "Event Tickets",
    eventTicketsModalDesc:
      "Book tickets for concerts, events, and entertainment",
    professionalServicesModal: "Professional Services",
    professionalServicesModalDesc:
      "Meeting rooms, classes, spa treatments, and more",
    needHelp: "Need Help?",
    expertConsultantsAvailable:
      "Our expert consultants are available to assist you",
    callBooking: "Call 080-595-6458",

    // Footer
    footerDescription:
      "Next-generation booking platform designed for modern businesses. Join us as we revolutionize the way services are booked and managed with cutting-edge technology and seamless user experience.",
    readyToStart: "Ready to Get Started?",
    experienceFuture: "Experience the Future of Booking",
    footerCtaDescription:
      "Be part of the future of booking technology. Join our early access program and help shape the platform that will transform how businesses operate with enhanced efficiency and innovation.",
    startBookingNowFooter: "Start Booking Now",
    callUs: "Call Us",
    available247: "Available 24/7",
    responseTime: "Response within 2 hours",
    businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
    weekendHours: "Weekend: 10:00 AM - 4:00 PM",
    timeZone: "All times EST",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqDescription:
      "Have questions about Booking Whale? We've compiled the most common questions here.",
    stillHaveQuestions: "Still have questions?",
    contactUs: "Contact us anytime 24/7",
    callNow: "Call Now",

    // FAQ Items
    "what-isQuestion": "What is Booking Whale?",
    "what-isAnswer":
      "Booking Whale is a next-generation booking platform designed to simplify service reservations for businesses and customers. We're currently in beta development.",
    "when-launchQuestion": "When will it be available?",
    "when-launchAnswer":
      "We're launching our beta version soon! Join our early access list to be among the first 1,000 users to try the platform.",
    costQuestion: "How much does it cost?",
    costAnswer:
      "Booking Whale will be free during our beta period. Early adopters will get special pricing when we launch our full platform.",
    featuresQuestion: "What features will be included?",
    featuresAnswer:
      "Our platform will include automated booking, secure payments, business analytics, 24/7 support, and seamless integrations with existing tools.",
    supportQuestion: "Do you provide support?",
    supportAnswer:
      "Absolutely. Every plan includes dedicated support tailored to your needs:\n\nFree & Starter — Email support with response within 24 hours during business hours\nProfessional — 24/7 priority support with 4-hour response via email, chat, and phone\nEnterprise — Dedicated account manager, custom SLA with 1-hour response, and personalized onboarding",
    securityQuestion: "Is my data secure?",
    securityAnswer:
      "Absolutely. We use bank-level encryption and follow industry best practices to protect your data. Your information is safe with us.",

    // Team Section
    teamTitle: "Meet Our Team",
    teamDescription: "Meet the experienced team behind Booking Whale",
    founderBadge: "Founder",
    founderName: "Alex Thompson",
    founderTitle: "CEO & Founder",
    founderStory1:
      "After 8 years in the tech industry, I saw the same problems over and over - complex, time-consuming, and non-transparent service booking.",
    founderStory2:
      "Booking Whale was born from the need to solve this problem for businesses and customers worldwide, with modern technology and user-centered design.",
    credential1: "8+ Years Tech Experience",
    credential2: "3 Successful Startups",
    credential3: "Stanford MBA",
    missionTitle: "Our Mission",
    missionText:
      "To make service booking simple, fast, and transparent for everyone in the world, with cutting-edge technology and excellent user experience.",
    visionTitle: "Our Vision",
    visionText:
      "To be the #1 booking platform chosen by businesses worldwide, and to be an example of innovation and excellence in the industry.",
    trustIndicator1: "Bootstrap Funded",
    trustIndicator2: "Bank-Level Security",
    trustIndicator3: "Dedicated Team",

    // Newsletter Section
    newsletterTitle: "Join",
    newsletterDescription:
      "Be the first to get updates and try Booking Whale before anyone else. Get Early Bird special pricing.",
    emailPlaceholder: "your.email@example.com",
    joinWaitlist: "Join Waitlist",
    subscriptionSuccess: "Thank you! We'll be in touch soon.",
    subscriptionError: "Something went wrong. Please try again.",
    noSpam: "No spam",
    unsubscribeAnytime: "Unsubscribe anytime",
    earlyUsers: "1,000",
    earlyUsersText: "early users",

    heroNotif1Title: "New Booking!",
    heroNotif1Subtitle: "Thanaporn booked at 14:00",
    heroNotif2Title: "Booking Confirmed",
    heroNotif2Subtitle: "Wipa — Tomorrow 10:30",
    heroNotif3Title: "+24 New Customers",
    heroNotif3Subtitle: "This month",
    heroNotif4Title: "Auto Reminder Sent",
    heroNotif4Subtitle: "Sent to 3 customers",

    businessesTitle: "Businesses We Serve",
    businessesDescription:
      "Booking Whale is designed for a wide range of service businesses",
    bizFoodTitle: "Food & Beverage",
    bizFoodDesc:
      "Restaurants, cafes, and bars with table or queue reservations",
    bizFitnessTitle: "Fitness & Sports",
    bizFitnessDesc: "Gyms, studios, courts, and personal training sessions",
    bizBeautyTitle: "Beauty & Wellness",
    bizBeautyDesc: "Salons, spas, clinics, and wellness centers",
    bizEventTitle: "Event & Ticket",
    bizEventDesc: "Concerts, workshops, and ticketed experiences",
    bizRentalTitle: "Rental Business",
    bizRentalDesc: "Equipment, vehicle, and space rental bookings",
    bizEducationTitle: "Education & Tutoring",
    bizEducationDesc: "Schools, tutors, and class scheduling",
    bizGeneralTitle: "General Services",
    bizGeneralDesc: "Any service-based business that takes appointments",
    bizHospitalityTitle: "Hospitality & Travel",
    bizHospitalityDesc: "Hotels, tours, and travel experience bookings",
    bizOtherTitle: "Others",
    bizOtherDesc: "Other business types not listed above",
    bizBeautyF1: "Online booking",
    bizBeautyF2: "Staff scheduling",
    bizBeautyF3: "Customer profiles",
    bizBeautyF4: "LINE notifications",
    bizFoodF1: "Table reservations",
    bizFoodF2: "Queue management",
    bizFoodF3: "Walk-in tracking",
    bizFoodF4: "LINE notifications",
    bizFitnessF1: "Class booking",
    bizFitnessF2: "Trainer scheduling",
    bizFitnessF3: "Member management",
    bizFitnessF4: "Auto reminders",
    bizEducationF1: "Class scheduling",
    bizEducationF2: "Student profiles",
    bizEducationF3: "Trial bookings",
    bizEducationF4: "Progress tracking",
    bizEventF1: "Ticket sales",
    bizEventF2: "Seat selection",
    bizEventF3: "Check-in system",
    bizEventF4: "Attendee management",
    bizHospitalityF1: "Room booking",
    bizHospitalityF2: "Tour packages",
    bizHospitalityF3: "Guest management",
    bizHospitalityF4: "Multi-channel",
    bizRentalF1: "Availability calendar",
    bizRentalF2: "Rental duration",
    bizRentalF3: "Deposit tracking",
    bizRentalF4: "Return reminders",
    bizGeneralF1: "Appointment booking",
    bizGeneralF2: "Customer database",
    bizGeneralF3: "Auto reminders",
    bizGeneralF4: "LINE integration",

    bizLearnMore: "Learn More",
    bizDetailHeroCta: "Get Started Free",
    bizDetailPainTitle: "Does This Sound Familiar?",
    bizDetailSolutionTitle: "How Booking Whale Fixes This",
    bizDetailCtaTitle: "Ready to fill more seats?",
    bizDetailCtaDesc:
      "Setup takes 5 minutes. Start free today — no credit card, no commitment.",
    bizDetailCtaButton: "Contact Us",
    bizDetailHowTitle: "Start in 3 Simple Steps",
    bizDetailHowStep1Title: "Connect LINE OA",
    bizDetailHowStep1Desc: "Link your LINE Official Account to Booking Whale in just a few clicks.",
    bizDetailHowStep2Title: "Set Up Your Services",
    bizDetailHowStep2Desc: "Add your classes, trainers, courts, or tables — customize to fit your business.",
    bizDetailHowStep3Title: "Customers Start Booking",
    bizDetailHowStep3Desc: "Share your booking link via LINE. Customers book instantly, you manage everything in one place.",
    bizDetailTrust1: "Free during Beta",
    bizDetailTrust2: "Setup in 5 minutes",
    bizDetailTrust3: "No credit card required",
    bizFitnessBizTypesTitle: "Supports Every Business Type",
    bizFitnessBizTypesSub: "No matter what you run — if it has bookings, we've got you covered.",
    bizFoodBizTypesTitle: "Supports Every Business Type",
    bizFoodBizTypesSub: "From fine dining to food trucks — if it takes reservations, we've got you covered.",
    bizFitnessType1Title: "Gym & Fitness Center",
    bizFitnessType1Desc: "Manage trainers, classes & memberships",
    bizFitnessType2Title: "Yoga & Pilates Studio",
    bizFitnessType2Desc: "Class bookings with waitlist",
    bizFitnessType3Title: "HYROX & Functional Race",
    bizFitnessType3Desc: "Session booking & athlete management",
    bizFitnessType4Title: "CrossFit & Functional Training",
    bizFitnessType4Desc: "WOD sign-ups with capacity limits",
    bizFitnessType5Title: "Sports Court & Facility",
    bizFitnessType5Desc: "Court booking with time-slot view",
    bizFitnessType6Title: "Dance & Movement Studio",
    bizFitnessType6Desc: "Class booking & room management",
    bizFoodType1Title: "Restaurant",
    bizFoodType1Desc: "Table reservations & walk-in queue",
    bizFoodType2Title: "Cafe & Coffee Shop",
    bizFoodType2Desc: "Seat booking & peak hour management",
    bizFoodType3Title: "Bar & Pub",
    bizFoodType3Desc: "Table booking & event reservations",
    bizFoodType4Title: "Bakery & Dessert Shop",
    bizFoodType4Desc: "Pre-order & pickup scheduling",
    bizFoodType5Title: "Food Truck & Pop-up",
    bizFoodType5Desc: "Queue management & LINE notifications",
    bizFoodType6Title: "Catering & Private Dining",
    bizFoodType6Desc: "Event booking & menu selection",

    bizFoodPageTitle:
      "Restaurant & Cafe Booking System | Booking Whale",
    bizFoodPageDesc:
      "Online table reservation and queue management system for restaurants, cafes, and bars via LINE OA. Reduce no-shows by 60%, manage walk-ins, and boost repeat bookings.",
    bizFoodPageKeywords:
      "restaurant booking system, cafe reservation, table booking LINE OA, queue management restaurant, food beverage booking Thailand",
    bizFoodHeroHeadline: "The booking system\nevery restaurant needs",
    bizFoodHeroSub:
      "Let customers reserve tables, manage walk-in queues, and receive reminders via LINE. Reduce staff workload, cut no-shows, and increase table utilization.",
    bizFoodPainSub:
      "Sound familiar? These problems cost F&B businesses thousands every month.",
    bizFoodPain1Title: "No-Shows Eat Your Revenue",
    bizFoodPain1Desc:
      "Friday night, 8 PM — three reserved tables sit empty. Customers booked but never showed up. Lost revenue you can't recover.",
    bizFoodPain2Title: "Phone Rings, Nobody Answers",
    bizFoodPain2Desc:
      "Staff can't take calls while plating and serving. Every missed call is a booking that goes straight to your competitor.",
    bizFoodPain3Title: "Walk-Ins Walk Away",
    bizFoodPain3Desc:
      "Customers peek in, see a crowd, and leave. No transparent queue system means you lose walk-in revenue every day.",
    bizFoodSol1Title: "Tables Booked 24/7, Zero Phone Calls",
    bizFoodSol1Desc:
      "Customers tap to reserve a table through LINE — anytime, even at 2 AM. Automatic confirmations go out instantly, and smart reminders 2 hours before cut no-shows by up to 60%.",
    bizFoodSol2Title: "Digital Queues That Keep Customers Happy",
    bizFoodSol2Desc:
      "Walk-in guests scan a QR code, join the queue via LINE, and go browse nearby shops. When their table's ready, they get a ping. No crowded waiting areas, no frustrated customers.",
    bizFoodSol3Title: "Know Your Rush Hours Before They Hit",
    bizFoodSol3Desc:
      "Every walk-in is tracked automatically. See your peak hours, average wait times, and table turnover — then staff smarter and seat faster.",
    bizFoodSol4Title: "Reminders That Actually Get Read",
    bizFoodSol4Desc:
      "Forget SMS that gets ignored. Booking confirmations, reminders, and \"book again?\" follow-ups go straight to LINE — where 90% of Thai customers already chat daily.",
    bizFoodStat1Value: "14%",
    bizFoodStat1Label: "Average restaurant no-show rate",
    bizFoodStat2Value: "56M",
    bizFoodStat2Label: "LINE users in Thailand",
    bizFoodStat3Value: "382K+",
    bizFoodStat3Label: "F&B businesses in Thailand",
    bizFoodStat4Value: "60%",
    bizFoodStat4Label: "Cancel within 24 hours",
    bizFitnessPageTitle:
      "Gym & Fitness Studio Booking System | Booking Whale",
    bizFitnessPageDesc:
      "Class booking and court reservation system for gyms, fitness studios, and sports facilities via LINE OA. Manage trainers, members, and schedules effortlessly.",
    bizFitnessPageKeywords:
      "gym booking system, fitness class booking, court reservation, trainer scheduling, sports facility booking Thailand LINE OA",
    bizFitnessHeroHeadline: "Fill every class,\nbook every session",
    bizFitnessHeroSub:
      "A booking system that lets members reserve classes, book trainers, and claim courts via LINE. Reduce staff workload, increase utilization, and cut no-shows.",
    bizFitnessPainSub:
      "Whether you run a gym, studio, or sports facility — these problems cost you members every week.",
    bizFitnessPain1Title: "Popular Classes Full, Others Empty",
    bizFitnessPain1Desc:
      "Evening classes are packed, daytime ones have 2-3 people. No data to decide which classes to add or cut.",
    bizFitnessPain2Title: "Trainers Get Double-Booked",
    bizFitnessPain2Desc:
      "Two members book the same trainer, same time — because bookings are managed manually. Staff calls to fix it every time.",
    bizFitnessPain3Title: "Booked but Never Showed Up",
    bizFitnessPain3Desc:
      "Members reserve a spot but don't come. Seats sit empty while others want to join. Lost revenue and opportunity add up.",
    bizFitnessSol1Title: "Every Class Fills Up — Without You Lifting a Finger",
    bizFitnessSol1Desc:
      "Members book classes via LINE on their own. The system limits spots automatically. If someone cancels, the next person in line gets notified and moves up.",
    bizFitnessSol2Title: "No More Double-Booked Trainers",
    bizFitnessSol2Desc:
      "Trainers set their available hours. Members pick a slot and book via LINE. The system blocks the same time from being booked twice.",
    bizFitnessSol3Title: "Spot Members Before They Quit",
    bizFitnessSol3Desc:
      "See who's coming regularly and who's starting to slip. If a member hasn't booked in weeks, send them a LINE message to bring them back — before they cancel.",
    bizFitnessSol4Title: "Auto Reminders That Cut No-Shows",
    bizFitnessSol4Desc:
      "Members get a LINE reminder before their class or session. If they can't make it, they cancel in time and the next person moves up. No-shows drop by up to 60%.",
    bizFitnessStat1Value: "฿120B",
    bizFitnessStat1Label: "Thai fitness & sports market",
    bizFitnessStat2Value: "2,499",
    bizFitnessStat2Label: "Registered fitness businesses",
    bizFitnessStat3Value: "18%",
    bizFitnessStat3Label: "Fitness revenue growth YoY",
    bizFitnessStat4Value: "56M",
    bizFitnessStat4Label: "LINE users in Thailand",
    pricingTitle: "Choose Your Plan",
    pricingDescription: "Start free, upgrade as you grow",
    pricingMonthly: "Monthly",
    pricingAnnual: "Annual",
    pricingSaveLabel: "Save up to 20%",
    pricingPerMonth: "/month",
    pricingPerDay: "Only",
    pricingPerDayUnit: "/day",
    pricingFreeName: "FREE",
    pricingFreeSubtitle: "For getting started",
    pricingStarterName: "STARTER",
    pricingStarterSubtitle: "For small businesses",
    pricingProName: "PROFESSIONAL",
    pricingProSubtitle: "For growing businesses",
    pricingEnterpriseName: "ENTERPRISE",
    pricingEnterpriseSubtitle: "For large organizations",
    pricingStartFree: "Start Free",
    pricingChoosePlan: "Choose Plan",
    pricingContactUs: "Contact Us",
    pricingMostPopular: "Most Popular",
    pricingFreeF1: "1 staff account",
    pricingFreeF2: "Up to 30 bookings/month",
    pricingFreeF3: "LINE OA booking link",
    pricingFreeF4: "Basic queue management",
    pricingFreeF5: "Email support",
    pricingStarterF1: "Up to 3 staff accounts",
    pricingStarterF2: "Unlimited bookings",
    pricingStarterF3: "LINE auto-reminders",
    pricingStarterF4: "No-show protection rules",
    pricingStarterF5: "Basic analytics dashboard",
    pricingStarterF6: "QR Code booking",
    pricingProF1: "Up to 10 staff accounts",
    pricingProF2: "Auto rebooking messages",
    pricingProF3: "Advanced analytics & reports",
    pricingProF4: "Digital signature verification",
    pricingProF5: "Priority support",
    pricingProF6: "Custom Rich Menu setup",
    pricingEnterpriseF1: "Unlimited staff accounts",
    pricingEnterpriseF2: "Multi-branch management",
    pricingEnterpriseF3: "API access & integrations",
    pricingEnterpriseF4: "Dedicated account manager",
    pricingEnterpriseF5: "Custom SLA & onboarding",
    pricingEverythingIn: "Everything in {plan}, plus:",
    pricingTrialNote: "14-day free trial of Professional",
    pricingSave17: "Save 17%",
    pricingSave20: "Save 20%",
    pricingFreePrice: "Free",
    pricingCustomPrice: "Custom",

    supportDetailFree:
      "- Email support\n- Response within 24 hours\n- Available during business hours",
    supportDetailPro:
      "- 24/7 availability\n- Response within 4 hours\n- Email, chat & phone channels\n- Priority queue routing",
    supportDetailEnterpriseDedicated:
      "- Dedicated account manager\n- Monthly performance reviews\n- Proactive optimization recommendations",
    supportDetailEnterpriseSLA:
      "- 99.99% uptime guarantee\n- Response within 1 hour\n- Personalized onboarding program",

    contactPageTitle: "Contact Us",
    contactPageEyebrow: "Get Started",
    contactPageHeadline: "Ready to boost\nyour bookings!",
    contactPageSubtitle: "Free consultation. Our team is ready to help you start.",
    contactSalesTitle: "Sales Inquiry",
    contactSalesDesc:
      "Get a personalized demo tailored to your business. Our team will help you get started right away.",
    contactSalesCta: "Call us at 097-016-6045",
    contactSalesCta2: "or 080-595-6458",
    contactLineTitle: "Get in Touch",
    contactLineDesc:
      "Ask about features, get support, or start using the platform. We reply within 5 minutes.",
    contactLineCta: "Add Us On LINE OA",
    contactFormTitle: "Have questions? Send Us a Message",
    contactFormDesc:
      "Fill out the form below and we'll get back to you as soon as possible.",
    contactFormName: "Name",
    contactFormEmail: "Email",
    contactFormPhone: "Phone number",
    contactFormMessage: "Message",
    contactFormSend: "Send Message",
    contactFormSuccessTitle: "Thank you!",
    contactFormSuccessDesc: "Your message has been received. We'll get back to you shortly.",
    footerMenu: "Main Menu",
    footerContact: "Enterprise Contact",
    badgeServices: "Why choose us?",
    badgeFeatures: "Everything in one place",
    badgeFaq: "Got any questions?",
  },
  th: {
    // Navigation
    services: "บริการหลัก",
    features: "แพลตฟอร์ม",
    faq: "คำถามที่พบบ่อย",
    blog: "บทความ",
    blogTitle: "บทความและเคล็ดลับ",
    blogDescription:
      "เคล็ดลับและกลยุทธ์ในการเพิ่มประสิทธิภาพธุรกิจด้วยระบบจองออนไลน์",
    viewAllBlogs: "ดูบทความทั้งหมด",
    integrations: "ระบบที่เชื่อมต่อ",
    businesses: "ธุรกิจ",
    loadMore: "ดูเพิ่มเติม",
    contact: "ติดต่อ",
    bookNow: "จองเลย",

    // Hero Section
    heroEyebrow: "LINE OA BOOKING PLATFORM",
    heroTitle: "ระบบจองผ่าน",
    heroSubtitle: "จองง่าย เชื่อมต่อลูกค้าได้ทันที",
    heroDescription:
      "ระบบจองนัดหมาย จัดการคิว เก็บฐานข้อมูลลูกค้า สร้างระบบจองในแบบของคุณ เชื่อมต่อกับ LINE Official Account ใช้งานง่าย พร้อมเริ่มได้ทันที",
    heroTagline: "",
    trustedBy: "เข้าร่วมเป็น 1,000 คนแรกที่ได้ทดลองใช้ก่อนใคร",
    startBookingNow: "เริ่มใช้งาน",
    learnMore: "ดูวิธีการใช้",
    exploreServices: "ดูบริการทั้งหมด",
    activeUsers: "ผู้ใช้งาน",
    uptime: "อัพไทม์",
    support: "ซัพพอร์ต",

    // Services Section
    ourServices: "ทำไมต้อง Booking Whale",
    servicePortfolio: "บริการครบครัน",
    servicesDescription: "ทุกอย่างที่คุณต้องการ ในที่เดียว",
    personalTraining: "เทรนเนอร์ส่วนตัว",
    personalTrainingDesc:
      "จองเทรนเนอร์มืออาชีพสำหรับโปรแกรมฟิตเนสเฉพาะตัว ที่ออกแบบตามเป้าหมายและไลฟ์สไตล์ของคุณ",
    retailServices: "บริการร้านค้า",
    retailServicesDesc:
      "นัดหมายช้อปปิ้งและปรึกษาจากผู้เชี่ยวชาญด้านค้าปลีกส่วนตัว",
    eventTickets: "ตั๋วอีเวนต์",
    eventTicketsDesc:
      "จองตั๋วงานอีเวนต์ คอนเสิร์ต และกิจกรรมต่างๆ พร้อมการยืนยันทันทีและส่งดิจิทัล",
    professionalServices: "บริการมืออาชีพ",
    professionalServicesDesc:
      "จองบริการมืออาชีพต่างๆ รวมถึงห้องประชุม คลาสเรียน สปา และการปรึกษา",
    mostPopular: "⭐ ยอดนิยม",
    customPrograms: "โปรแกรมเฉพาะตัว",
    certifiedTrainers: "เทรนเนอร์ที่ได้รับการรับรอง",
    progressTracking: "ติดตามผลการออกกำลังกาย",
    personalShopping: "ช้อปปิ้งส่วนตัว",
    skipQueue: "ไม่ต้องรอคิว",
    consultation247: "ปรึกษาได้ 24/7",
    digitalTickets: "ตั๋วดิจิทัล",
    freeCancellation: "ยกเลิกฟรี",
    bestPrices: "ราคาดีที่สุด",
    wideSelection: "บริการหลากหลาย",
    easyBooking: "จองง่าย",
    flexibleScheduling: "ยืดหยุ่นเรื่องเวลา",
    notSureService: "เริ่มใช้ Booking Whale ฟรี",
    expertConsultants:
      "ทีมผู้เชี่ยวชาญของเราพร้อมช่วยเหลือคุณค้นหาโซลูชั่นที่เหมาะสมที่สุด",
    getFreeConsultation: "ปรึกษาฟรี",

    // Service titles and descriptions
    trainerTitle: "เทรนเนอร์ส่วนตัว",
    trainerDesc:
      "จองเทรนเนอร์มืออาชีพสำหรับโปรแกรมฟิตเนสเฉพาะตัว ที่ออกแบบตามเป้าหมายและไลฟ์สไตล์ของคุณ",
    retailTitle: "บริการร้านค้า",
    retailDesc: "นัดหมายช้อปปิ้งและปรึกษาจากผู้เชี่ยวชาญด้านค้าปลีกส่วนตัว",
    ticketTitle: "ตั๋วอีเวนต์",
    ticketDesc:
      "จองตั๋วงานอีเวนต์ คอนเสิร์ต และกิจกรรมต่างๆ พร้อมการยืนยันทันทีและส่งดิจิทัล",
    otherTitle: "บริการมืออาชีพ",
    otherDesc:
      "จองบริการมืออาชีพต่างๆ รวมถึงห้องประชุม คลาสเรียน สปา และการปรึกษา",

    // New Services Section - Why Booking Whale
    bookingTitle: "จองง่ายผ่าน Line และทุกช่องทางออนไลน์",
    bookingDesc:
      "ลูกค้าจองได้ทันทีผ่าน LINE หรือสแกน QR Code หน้าร้าน พร้อมลิงก์แชร์บน Facebook, Instagram หรือเว็บไซต์ เข้าถึงได้ง่ายทุกที่ทุกเวลา",
    scheduleTitle: "จัดตารางอย่างอัจฉริยะไม่พลาดทุกคิว",
    scheduleDesc:
      "หมดกังวลเมื่อมีลูกค้าเข้ามาเยอะ ระบบจะจัดคิวให้อัตโนมัติ พร้อมจองวัน และเวลาเดิมให้ลูกค้าประจำ ให้การนัดหมายเป็นเรื่องง่าย ไม่ตกหล่น",
    noshowTitle: "ลดการผิดนัด (No-Show) และยกเลิกกระทันหัน",
    noshowDesc:
      "แจ้งเตือนล่วงหน้าทาง LINE พร้อมกำหนด SLA หรือค่าปรับเมื่อยกเลิกใกล้เวลานัด ช่วยลด No-Show รักษาคิวให้เต็มและไม่เสียโอกาสทางการขาย",
    rebookingTitle: "สร้างความสัมพันธ์กับลูกค้า เพิ่มการจองซ้ำ",
    rebookingDesc:
      "หลังการใช้บริการ ระบบจะส่งข้อความผ่าน LINE เพื่อชวนลูกค้าจองรอบถัดไปทันที ลดขั้นตอนการตัดสินใจ ช่วยให้คิวเต็มต่อเนื่อง",
    bookingLink: "ดูเพิ่มเติม",
    scheduleLink: "ดูเพิ่มเติม",
    noshowLink: "ดูเพิ่มเติม",
    rebookingLink: "ดูเพิ่มเติม",

    // Feature translations
    feature1Title: "จองออนไลน์ได้ทันที",
    feature1Desc:
      "ลูกค้าจองง่ายผ่าน LINE OA, เว็บไซต์ หรือ QR Code พร้อมปุ่ม Rich Menu ใน LINE ที่พาลูกค้าเข้าสู่ระบบจองได้ทันที",
    feature2Title: "จัดการคิวอัจฉริยะ",
    feature2Desc:
      "ไม่ว่าลูกค้าจะเยอะแค่ไหน ระบบช่วยจัดตารางคิวให้อัตโนมัติ ป้องกันการนัดคิวซ้อนหรือตกหล่น จัดการครบ มั่นใจทุกการนัดหมาย",
    feature3Title: "แจ้งเตือนทุกนัด กระตุ้นการจองซ้ำ",
    feature3Desc:
      "แจ้งเตือนล่วงหน้าผ่าน LINE ลด No-Show พร้อมกติกาการยกเลิก และข้อความชวนจองซ้ำอัตโนมัติหลังใช้บริการ ให้ลูกค้ากลับมาใช้บริการได้ต่อเนื่อง",
    feature4Title: "เก็บข้อมูลการจองครบถ้วน",
    feature4Desc:
      "บันทึกข้อมูลทุกการจองพร้อมประวัติย้อนหลัง เพื่อนำไปวิเคราะห์ต่อยอดเพิ่มโอกาสการขาย พร้อมฟีเจอร์พิเศษ ลายเซ็นดิจิทัล เพื่อยืนยันการใช้บริการจริง",
    feature5Title: "ติดตามผลธุรกิจแบบเรียลไทม์",
    feature5Desc:
      "สรุปข้อมูลการจองแบบเรียลไทม์ ช่วยให้คุณมองเห็นภาพรวมของธุรกิจได้อย่างชัดเจน และวางแผนได้แม่นยำ",
    feature6Title: "ยกเลิกฟรี",
    feature6Desc:
      "ยกเลิกการจองฟรีโดยไม่มีค่าธรรมเนียม เมื่อแจ้ง 24 ชั่วโมงล่วงหน้า",

    // Service feature translations
    customprograms: "โปรแกรมเฉพาะตัว",
    certifiedtrainers: "เทรนเนอร์ที่ได้รับการรับรอง",
    progresstracking: "ติดตามผลการออกกำลังกาย",
    personalshopping: "ช้อปปิ้งส่วนตัว",
    skipthequeue: "ไม่ต้องรอคิว",
    "247consultation": "ปรึกษาได้ 24/7",
    digitaltickets: "ตั๋วดิจิทัล",
    freecancellation: "ยกเลิกฟรี",
    bestprices: "ราคาดีที่สุด",
    wideselection: "บริการหลากหลาย",
    easybooking: "จองง่าย",
    flexiblescheduling: "ยืดหยุ่นเรื่องเวลา",

    // Features Section
    whyChoose: "ฟีเจอร์ของเรา",
    enterpriseFeatures: "คุณสมบัติระดับองค์กร",
    featuresDescription:
      "ระบบจองที่ครบครันด้วยฟีเจอร์ที่ออกแบบมาเพื่อตอบสนองความต้องการของธุรกิจสมัยใหม่",
    intuitiveInterface: "ใช้งานง่าย",
    intuitiveDesc:
      "ออกแบบ UI/UX ที่สวยงามและใช้งานง่าย เหมาะสำหรับทุกคนตั้งแต่ผู้ใช้เทคโนโลยีจนถึงผู้สูงอายุ",
    bankLevelSecurity: "ความปลอดภัยระดับธนาคาร",
    securityDesc:
      "ความปลอดภัยระดับองค์กรพร้อมการเข้ารหัสแบบ end-to-end ข้อมูลของคุณได้รับการปกป้องด้วยมาตรฐานสูงสุด",
    expertSupport: "ซัพพอร์ตผู้เชี่ยวชาญ 24/7",
    supportDesc:
      "ทีมซัพพอร์ตเฉพาะทางของเราพร้อมให้บริการตลอด 24 ชั่วโมง ทุกวันในสัปดาห์",
    crossPlatform: "ใช้งานได้ทุกแพลตฟอร์ม",
    platformDesc:
      "ทำงานได้อย่างราบรื่นบนทุกอุปกรณ์ - มือถือ แท็บเล็ต และเดสก์ท็อป เข้าถึงได้ทุกที่ทุกเวลา",
    flexiblePayments: "ชำระเงินยืดหยุ่น",
    paymentsDesc:
      "ตัวเลือกการชำระเงินหลากหลาย รวมถึงบัตรเครดิต QR Code โอนธนาคาร และกระเป๋าเงินดิจิทัล",
    cancellationFree: "ยกเลิกฟรี",
    cancellationDesc:
      "ยกเลิกการจองฟรีโดยไม่มีค่าธรรมเนียม เมื่อแจ้ง 24 ชั่วโมงล่วงหน้า",
    freeToStart: "เริ่มต้นฟรี",
    startFree: "เข้าร่วม Early Access - ฟรี",
    freeDescription:
      "เป็นคนแรกที่ได้สัมผัสอนาคตของการจอง ไม่มีค่าติดตั้ง ไม่ผูกมัด เริ่มต้นการเดินทางกับเราวันนี้",
    noSetupFees: "ไม่มีค่าติดตั้ง",
    noMonthlyFees: "ไม่มีค่ารายเดือน",
    payPerBooking: "จ่ายตามการจอง",
    startFreeToday: "เริ่มฟรีวันนี้",

    // Booking Modal
    chooseService: "เลือกธุรกิจของคุณ",
    modalDescription: "เลือกประเภทธุรกิจของคุณเพื่อเริ่มต้น",
    personalTrainingModal: "เทรนเนอร์ส่วนตัว",
    personalTrainingModalDesc:
      "โค้ชฟิตเนสมืออาชีพและโปรแกรมออกกำลังกายเฉพาะบุคคล",
    retailServicesModal: "บริการร้านค้า",
    retailServicesModalDesc: "ช้อปปิ้งส่วนตัวและปรึกษาร้านค้าพร้อมผู้เชี่ยวชาญ",
    eventTicketsModal: "ตั๋วอีเวนต์",
    eventTicketsModalDesc: "จองตั๋วคอนเสิร์ต อีเวนต์ และความบันเทิง",
    professionalServicesModal: "บริการมืออาชีพ",
    professionalServicesModalDesc: "ห้องประชุม คลาสเรียน สปา และอื่นๆ",
    needHelp: "ต้องการความช่วยเหลือ?",
    expertConsultantsAvailable: "ผู้เชี่ยวชาญของเราพร้อมให้ความช่วยเหลือ",
    callBooking: "โทร 080-595-6458",

    // Footer
    footerDescription:
      "แพลตฟอร์มการจองรุ่นใหม่ที่ออกแบบมาเพื่อธุรกิจสมัยใหม่ เข้าร่วมกับเราในการเปลี่ยนแปลงวิธีการจองด้วยเทคโนโลยีล้ำสมัย",
    readyToStart: "พร้อมเริ่มต้นแล้วหรือยัง?",
    experienceFuture: "สัมผัสอนาคตของการจอง",
    footerCtaDescription:
      "เป็นส่วนหนึ่งของอนาคตเทคโนโลยีการจอง เข้าร่วมโปรแกรม early access และช่วยสร้างแพลตฟอร์มที่จะเปลี่ยนแปลงวิธีการทำธุรกิจไปสู่ความทันสมัยและมีประสิทธิภาพสูงสุด",
    startBookingNowFooter: "เริ่มจองตอนนี้",
    callUs: "โทรหาเรา",
    available247: "พร้อมบริการ 24/7",
    responseTime: "ตอบกลับภายใน 2 ชั่วโมง",
    businessHours: "จันทร์ - ศุกร์: 09:00 - 18:00 น.",
    weekendHours: "วันหยุดสุดสัปดาห์: 10:00 - 16:00 น.",
    timeZone: "เวลาประเทศไทย",
    allRightsReserved: "สงวนลิขสิทธิ์",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    termsOfService: "ข้อกำหนดการใช้บริการ",
    cookiePolicy: "นโยบายคุกกี้",

    // FAQ Section
    faqTitle: "คำถามที่พบบ่อย",
    faqDescription:
      "มีคำถามเกี่ยวกับ Booking Whale? เราได้รวบรวมคำถามที่พบบ่อยไว้ที่นี่",
    stillHaveQuestions: "ยังมีคำถามอื่นๆ?",
    contactUs: "ติดต่อเราได้ตลอด 24/7",
    callNow: "โทรเลย",

    // FAQ Items
    "what-isQuestion": "Booking Whale คืออะไร?",
    "what-isAnswer":
      "Booking Whale คือแพลตฟอร์มการจองรุ่นใหม่ที่ออกแบบมาเพื่อทำให้การจองบริการง่ายขึ้นสำหรับธุรกิจและลูกค้า ขณะนี้เรากำลังพัฒนาเวอร์ชัน beta",
    "when-launchQuestion": "เมื่อไหร่จะใช้ได้?",
    "when-launchAnswer":
      "เรากำลังเปิดตัวเวอร์ชัน beta เร็วๆ นี้! เข้าร่วมรายชื่อ early access เพื่อเป็น 1,000 คนแรกที่ได้ทดลองใช้แพลตฟอร์ม",
    costQuestion: "ราคาเท่าไหร่?",
    costAnswer:
      "Booking Whale จะฟรีในช่วง beta ผู้ใช้งานแรกจะได้ราคาพิเศษเมื่อเราเปิดตัวแพลตฟอร์มเต็มรูปแบบ",
    featuresQuestion: "จะมีฟีเจอร์อะไรบ้าง?",
    featuresAnswer:
      "แพลตฟอร์มของเราจะรวมการจองอัตโนมัติ การชำระเงินปลอดภัย วิเคราะห์ธุรกิจ การสนับสนุน 24/7 และการเชื่อมต่อกับเครื่องมือที่มีอยู่",
    supportQuestion: "มีการสนับสนุนไหม?",
    supportAnswer:
      "แน่นอน ทุกแพลนมีการสนับสนุนที่ออกแบบมาเพื่อธุรกิจของคุณ:\n\nFree & Starter — ซัพพอร์ตทางอีเมล ตอบกลับภายใน 24 ชั่วโมงในเวลาทำการ\nProfessional — ซัพพอร์ตระดับสูง 24/7 ตอบกลับภายใน 4 ชั่วโมง ผ่านอีเมล แชท และโทรศัพท์\nEnterprise — ผู้ดูแลบัญชีเฉพาะ SLA แบบกำหนดเอง ตอบกลับภายใน 1 ชั่วโมง พร้อมโปรแกรม onboarding เฉพาะองค์กร",
    securityQuestion: "ข้อมูลของฉันปลอดภัยไหม?",
    securityAnswer:
      "แน่นอน เราใช้การเข้ารหัสระดับธนาคารและปฏิบัติตามมาตรฐานอุตสาหกรรมเพื่อปกป้องข้อมูลของคุณ ข้อมูลของคุณปลอดภัยกับเรา",

    // Team Section
    teamTitle: "ทีมผู้สร้าง",
    teamDescription: "พบกับทีมที่มีประสบการณ์ที่อยู่เบื้องหลัง Booking Whale",
    founderBadge: "ผู้ก่อตั้ง",
    founderName: "อเล็กซ์ ธอมป์สัน",
    founderTitle: "CEO & ผู้ก่อตั้ง",
    founderStory1:
      "หลังจากประสบการณ์ 8 ปีในอุตสาหกรรมเทคโนโลยี ผมเห็นปัญหาเดิมๆ ซ้ำแล้วซ้ำเล่า - การจองบริการที่ซับซ้อน เสียเวลา และไม่โปร่งใส",
    founderStory2:
      "Booking Whale เกิดขึ้นจากความต้องการที่จะแก้ไขปัญหานี้ให้กับธุรกิจและลูกค้าทั่วโลก ด้วยเทคโนโลยีที่ทันสมัยและการออกแบบที่เน้นผู้ใช้เป็นหลัก",
    credential1: "ประสบการณ์เทค 8+ ปี",
    credential2: "สตาร์ทอัพสำเร็จ 3 แห่ง",
    credential3: "Stanford MBA",
    missionTitle: "พันธกิจของเรา",
    missionText:
      "ทำให้การจองบริการเป็นเรื่องง่าย รวดเร็ว และโปร่งใส สำหรับทุกคนในโลก ด้วยเทคโนโลจีที่ทันสมัยและประสบการณ์ผู้ใช้ที่ยอดเยี่ยม",
    visionTitle: "วิสัยทัศน์ของเรา",
    visionText:
      "เป็นแพลตฟอร์มการจองอันดับ 1 ที่ธุรกิจทั่วโลกเลือกใช้ และเป็นตัวอย่างของนวัตกรรมและความเป็นเลิศในอุตสาหกรรม",
    trustIndicator1: "ทุนตัวเอง",
    trustIndicator2: "ความปลอดภัยระดับธนาคาร",
    trustIndicator3: "ทีมงานเฉพาะ",

    // Newsletter Section
    newsletterTitle: "เข้าร่วม",
    newsletterDescription:
      "เป็นคนแรกที่ได้รับข่าวสารและได้ทดลองใช้ Booking Whale ก่อนใคร รับ Early Bird ราคาพิเศษ",
    emailPlaceholder: "your.email@example.com",
    joinWaitlist: "เข้าร่วมรายชื่อรอ",
    subscriptionSuccess: "ขอบคุณ! เราจะติดต่อกลับเร็วๆ นี้",
    subscriptionError: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    noSpam: "ไม่มี spam",
    unsubscribeAnytime: "ยกเลิกได้ตลอดเวลา",
    earlyUsers: "1,000",
    earlyUsersText: "คนแรก",

    heroNotif1Title: "การจองใหม่!",
    heroNotif1Subtitle: "คุณธนพร จองคิว 14:00",
    heroNotif2Title: "ยืนยันการจองแล้ว",
    heroNotif2Subtitle: "คุณวิภา — พรุ่งนี้ 10:30",
    heroNotif3Title: "+24 ลูกค้าใหม่",
    heroNotif3Subtitle: "เดือนนี้",
    heroNotif4Title: "แจ้งเตือนอัตโนมัติ",
    heroNotif4Subtitle: "ส่งถึงลูกค้าแล้ว 3 คน",

    businessesTitle: "ธุรกิจที่เราให้บริการ",
    businessesDescription: "Booking Whale ออกแบบมาเพื่อธุรกิจบริการทุกประเภท",
    bizFoodTitle: "ร้านอาหาร & เครื่องดื่ม",
    bizFoodDesc: "ร้านอาหาร คาเฟ่ และบาร์ ที่ต้องการระบบจองโต๊ะหรือคิว",
    bizFitnessTitle: "ฟิตเนส & กีฬา",
    bizFitnessDesc: "ยิม สตูดิโอ สนามกีฬา และเทรนเนอร์ส่วนตัว",
    bizBeautyTitle: "ความงาม & เวลเนส",
    bizBeautyDesc: "ร้านทำผม สปา คลินิก และศูนย์สุขภาพ",
    bizEventTitle: "อีเวนต์ & บัตรเข้างาน",
    bizEventDesc: "คอนเสิร์ต เวิร์คช็อป และกิจกรรมที่ต้องใช้บัตร",
    bizRentalTitle: "ธุรกิจให้เช่า",
    bizRentalDesc: "เช่าอุปกรณ์ ยานพาหนะ และพื้นที่",
    bizEducationTitle: "การศึกษา & การสอน",
    bizEducationDesc: "โรงเรียน ติวเตอร์ และการจัดตารางเรียน",
    bizGeneralTitle: "บริการทั่วไป",
    bizGeneralDesc: "ธุรกิจบริการทุกประเภทที่รับนัดหมาย",
    bizHospitalityTitle: "การท่องเที่ยว & ที่พัก",
    bizHospitalityDesc: "โรงแรม ทัวร์ และประสบการณ์การท่องเที่ยว",
    bizOtherTitle: "อื่นๆ",
    bizOtherDesc: "ธุรกิจประเภทอื่นที่ไม่อยู่ในรายการ",
    bizBeautyF1: "จองออนไลน์",
    bizBeautyF2: "จัดตารางพนักงาน",
    bizBeautyF3: "โปรไฟล์ลูกค้า",
    bizBeautyF4: "แจ้งเตือนผ่าน LINE",
    bizFoodF1: "จองโต๊ะ",
    bizFoodF2: "จัดการคิว",
    bizFoodF3: "ติดตาม Walk-in",
    bizFoodF4: "แจ้งเตือนผ่าน LINE",
    bizFitnessF1: "จองคลาส",
    bizFitnessF2: "ตารางเทรนเนอร์",
    bizFitnessF3: "จัดการสมาชิก",
    bizFitnessF4: "แจ้งเตือนอัตโนมัติ",
    bizEducationF1: "จัดตารางเรียน",
    bizEducationF2: "โปรไฟล์นักเรียน",
    bizEducationF3: "จองเรียนทดลอง",
    bizEducationF4: "ติดตามความก้าวหน้า",
    bizEventF1: "ขายบัตร",
    bizEventF2: "เลือกที่นั่ง",
    bizEventF3: "ระบบ Check-in",
    bizEventF4: "จัดการผู้เข้าร่วม",
    bizHospitalityF1: "จองห้องพัก",
    bizHospitalityF2: "แพ็คเกจทัวร์",
    bizHospitalityF3: "จัดการแขก",
    bizHospitalityF4: "หลายช่องทาง",
    bizRentalF1: "ปฏิทินว่าง",
    bizRentalF2: "ระยะเวลาเช่า",
    bizRentalF3: "ติดตามมัดจำ",
    bizRentalF4: "แจ้งเตือนคืน",
    bizGeneralF1: "จองนัดหมาย",
    bizGeneralF2: "ฐานข้อมูลลูกค้า",
    bizGeneralF3: "แจ้งเตือนอัตโนมัติ",
    bizGeneralF4: "เชื่อมต่อ LINE",

    bizLearnMore: "ดูรายละเอียด",
    bizDetailHeroCta: "เริ่มต้นใช้งานฟรี",
    bizDetailPainTitle: "เคยเจอปัญหาพวกนี้ไหม?",
    bizDetailSolutionTitle: "Booking Whale แก้ปัญหานี้ได้",
    bizDetailCtaTitle: "พร้อมเติมเต็มทุกที่นั่งแล้วหรือยัง?",
    bizDetailCtaDesc:
      "ตั้งค่าแค่ 5 นาที เริ่มใช้ฟรีวันนี้ ไม่ต้องใช้บัตรเครดิต ไม่มีข้อผูกมัด",
    bizDetailCtaButton: "ติดต่อเรา",
    bizDetailHowTitle: "เริ่มต้นใน 3 ขั้นตอน",
    bizDetailHowStep1Title: "เชื่อมต่อ LINE OA",
    bizDetailHowStep1Desc: "เชื่อมต่อ LINE Official Account ของคุณกับ Booking Whale ได้ในไม่กี่คลิก",
    bizDetailHowStep2Title: "ตั้งค่าบริการ",
    bizDetailHowStep2Desc: "เพิ่มคลาส เทรนเนอร์ สนาม หรือโต๊ะ ปรับแต่งให้ตรงกับธุรกิจของคุณ",
    bizDetailHowStep3Title: "ลูกค้าเริ่มจองได้เลย",
    bizDetailHowStep3Desc: "แชร์ลิงก์จองผ่าน LINE ลูกค้าจองได้ทันที คุณจัดการทุกอย่างในที่เดียว",
    bizDetailTrust1: "ใช้งานฟรีช่วง Beta",
    bizDetailTrust2: "ตั้งค่าแค่ 5 นาที",
    bizDetailTrust3: "ไม่ต้องใช้บัตรเครดิต",
    bizFitnessBizTypesTitle: "รองรับทุกประเภทธุรกิจ",
    bizFitnessBizTypesSub: "ไม่ว่าคุณจะเปิดอะไร ถ้ามีการจอง เราช่วยได้",
    bizFoodBizTypesTitle: "รองรับทุกประเภทธุรกิจ",
    bizFoodBizTypesSub: "ตั้งแต่ร้านอาหารจนถึง Food Truck ถ้ามีการจอง เราช่วยได้",
    bizFitnessType1Title: "ยิม & ฟิตเนสเซ็นเตอร์",
    bizFitnessType1Desc: "จัดการเทรนเนอร์ คลาส และสมาชิก",
    bizFitnessType2Title: "โยคะ & พิลาทิส สตูดิโอ",
    bizFitnessType2Desc: "จองคลาสพร้อมคิวรอ",
    bizFitnessType3Title: "HYROX & Functional Race",
    bizFitnessType3Desc: "จองเซสชัน จัดการนักกีฬา",
    bizFitnessType4Title: "CrossFit & Functional Training",
    bizFitnessType4Desc: "จองรอบเรียนพร้อมจำกัดจำนวนคน",
    bizFitnessType5Title: "สนามกีฬา & คอร์ท",
    bizFitnessType5Desc: "จองสนาม ดูตารางว่าง",
    bizFitnessType6Title: "สตูดิโอเต้น & ศิลปะการเคลื่อนไหว",
    bizFitnessType6Desc: "จองคลาส จัดการห้องเรียน",
    bizFoodType1Title: "ร้านอาหาร",
    bizFoodType1Desc: "จองโต๊ะ และคิว Walk-in",
    bizFoodType2Title: "คาเฟ่ & ร้านกาแฟ",
    bizFoodType2Desc: "จองที่นั่ง จัดการช่วงพีค",
    bizFoodType3Title: "บาร์ & ผับ",
    bizFoodType3Desc: "จองโต๊ะ และจองงานอีเวนต์",
    bizFoodType4Title: "เบเกอรี่ & ร้านขนม",
    bizFoodType4Desc: "สั่งล่วงหน้า นัดรับสินค้า",
    bizFoodType5Title: "Food Truck & Pop-up",
    bizFoodType5Desc: "จัดการคิว แจ้งเตือนผ่าน LINE",
    bizFoodType6Title: "จัดเลี้ยง & Private Dining",
    bizFoodType6Desc: "จองงาน เลือกเมนูล่วงหน้า",

    bizFoodPageTitle:
      "ระบบจองร้านอาหาร & คาเฟ่ | Booking Whale",
    bizFoodPageDesc:
      "ระบบจองโต๊ะออนไลน์และจัดการคิวสำหรับร้านอาหาร คาเฟ่ และบาร์ ผ่าน LINE OA ลด No-Show 60% จัดการ Walk-in เพิ่มยอดจองซ้ำ",
    bizFoodPageKeywords:
      "ระบบจองร้านอาหาร, จองโต๊ะออนไลน์, จัดการคิวร้านอาหาร, ระบบจองคาเฟ่, จองโต๊ะผ่าน LINE",
    bizFoodHeroHeadline: "ระบบจองโต๊ะ\nที่ร้านอาหารต้องมี",
    bizFoodHeroSub:
      "ให้ลูกค้าจองโต๊ะ จัดการคิว Walk-in และรับแจ้งเตือนผ่าน LINE ได้เอง ลดภาระพนักงาน ลด No-Show เพิ่มอัตราการเข้าใช้บริการ",
    bizFoodPainSub:
      "ปัญหาเหล่านี้ทำให้ธุรกิจ F&B สูญเสียรายได้หลักหมื่นทุกเดือน",
    bizFoodPain1Title: "No-Show กินรายได้",
    bizFoodPain1Desc:
      "คืนวันศุกร์ 2 ทุ่ม โต๊ะที่จองไว้ 3 โต๊ะว่างเปล่า ลูกค้าจองแต่ไม่มา รายได้หายไปเรียกกลับไม่ได้",
    bizFoodPain2Title: "โทรมา ไม่มีคนรับ",
    bizFoodPain2Desc:
      "พนักงานรับสายไม่ได้ขณะจัดจานและเสิร์ฟอาหาร ทุกสายที่พลาดคือจองที่หลุดไปให้ร้านคู่แข่ง",
    bizFoodPain3Title: "Walk-in เห็นคิวยาว เดินกลับ",
    bizFoodPain3Desc:
      "ลูกค้าเดินเข้ามา เห็นคนเยอะก็เดินกลับ ไม่มีระบบคิวที่โปร่งใส เสียรายได้ Walk-in ทุกวัน",
    bizFoodSol1Title: "จองโต๊ะ 24 ชม. ไม่ต้องรับสาย",
    bizFoodSol1Desc:
      "ลูกค้ากดจองโต๊ะผ่าน LINE ได้ตลอด แม้ตี 2 ยืนยันอัตโนมัติทันที แจ้งเตือนก่อน 2 ชั่วโมง ลด No-Show ได้ถึง 60%",
    bizFoodSol2Title: "คิวดิจิทัลที่ลูกค้าแฮปปี้",
    bizFoodSol2Desc:
      "ลูกค้า Walk-in สแกน QR เข้าคิวผ่าน LINE แล้วไปเดินเล่นรอ พอโต๊ะพร้อมก็ได้รับแจ้งเตือน ไม่ต้องยืนรอแน่นหน้าร้าน",
    bizFoodSol3Title: "รู้ช่วงพีคก่อนลูกค้ามา",
    bizFoodSol3Desc:
      "ติดตาม Walk-in ทุกรายอัตโนมัติ เห็นช่วงเวลาพีค เวลารอเฉลี่ย อัตราหมุนเวียนโต๊ะ แล้วจัดพนักงานได้ถูกจังหวะ",
    bizFoodSol4Title: "แจ้งเตือนที่ถูกเปิดอ่านจริง",
    bizFoodSol4Desc:
      "ลืม SMS ที่ไม่มีใครอ่าน ยืนยันจอง แจ้งเตือน และชวนจองซ้ำ ส่งตรงถึง LINE ที่คนไทย 90% ใช้แชทอยู่ทุกวัน",
    bizFoodStat1Value: "14%",
    bizFoodStat1Label: "อัตรา No-Show เฉลี่ยของร้านอาหาร",
    bizFoodStat2Value: "56M",
    bizFoodStat2Label: "ผู้ใช้ LINE ในไทย",
    bizFoodStat3Value: "382K+",
    bizFoodStat3Label: "ธุรกิจ F&B ในประเทศไทย",
    bizFoodStat4Value: "60%",
    bizFoodStat4Label: "ลูกค้ายกเลิกภายใน 24 ชม.",
    bizFitnessPageTitle:
      "ระบบจองฟิตเนส & สตูดิโอ | Booking Whale",
    bizFitnessPageDesc:
      "ระบบจองคลาสและสนามกีฬาสำหรับยิม ฟิตเนสสตูดิโอ และสนามกีฬา ผ่าน LINE OA จัดการเทรนเนอร์ สมาชิก และตารางเรียนง่าย ๆ",
    bizFitnessPageKeywords:
      "ระบบจองฟิตเนส, จองคลาสออนไลน์, จองสนามกีฬา, ตารางเทรนเนอร์, ระบบจองยิม LINE OA",
    bizFitnessHeroHeadline: "เติมเต็มทุกคลาส\nจองได้ทุกเซสชัน",
    bizFitnessHeroSub:
      "ระบบจองที่ช่วยให้สมาชิกจองคลาส นัดเทรนเนอร์ และจองสนามได้เองผ่าน LINE ลดภาระพนักงาน เพิ่มอัตราเข้าใช้บริการ และลด No-Show ได้จริง",
    bizFitnessPainSub:
      "ไม่ว่าจะเป็นยิม สตูดิโอ หรือสนามกีฬา ปัญหาพวกนี้ทำให้เสียสมาชิกทุกสัปดาห์",
    bizFitnessPain1Title: "คลาสยอดนิยมเต็ม คลาสอื่นว่าง",
    bizFitnessPain1Desc:
      "คลาสช่วงเย็นคนล้น คลาสกลางวันมีแค่ 2-3 คน ไม่มีข้อมูลช่วยตัดสินใจว่าควรเปิดคลาสไหนเพิ่มหรือลด",
    bizFitnessPain2Title: "เทรนเนอร์โดนจองซ้อน",
    bizFitnessPain2Desc:
      "สมาชิก 2 คนจองเทรนเนอร์คนเดียวกัน เวลาเดียวกัน เพราะจัดการจองด้วยมือ ต้องโทรตามแก้ทุกครั้ง",
    bizFitnessPain3Title: "จองแล้วไม่มา",
    bizFitnessPain3Desc:
      "สมาชิกกดจองไว้แต่ไม่มา ที่นั่งว่างทั้งที่คนอื่นอยากเข้า ยิมเสียทั้งรายได้และโอกาสโดยไม่รู้ตัว",
    bizFitnessSol1Title: "คลาสเต็มทุกรอบ โดยไม่ต้องจัดการเอง",
    bizFitnessSol1Desc:
      "สมาชิกจองคลาสผ่าน LINE ได้เอง ระบบจำกัดจำนวนคนให้อัตโนมัติ ถ้ามีคนยกเลิก คนถัดไปในคิวจะได้รับแจ้งเตือนและเลื่อนขึ้นมาเอง",
    bizFitnessSol2Title: "เทรนเนอร์ไม่โดนจองซ้อนอีก",
    bizFitnessSol2Desc:
      "เทรนเนอร์ตั้งเวลาว่างไว้ สมาชิกเลือกจองผ่าน LINE ได้เลย ระบบจะป้องกันไม่ให้เวลาเดียวกันถูกจองซ้ำ",
    bizFitnessSol3Title: "จับสัญญาณสมาชิกที่กำลังจะหาย",
    bizFitnessSol3Desc:
      "ดูได้ว่าใครมาสม่ำเสมอ ใครเริ่มห่างหาย ถ้าสมาชิกไม่ได้จองมาหลายสัปดาห์ ส่งข้อความ LINE ชวนกลับมาก่อนที่จะยกเลิก",
    bizFitnessSol4Title: "แจ้งเตือนอัตโนมัติ ลดคนไม่มา",
    bizFitnessSol4Desc:
      "สมาชิกได้รับแจ้งเตือนผ่าน LINE ก่อนถึงเวลาคลาสหรือเซสชัน ถ้ามาไม่ได้ก็ยกเลิกทัน คนถัดไปเลื่อนขึ้นมาเอง No-Show ลดได้ถึง 60%",
    bizFitnessStat1Value: "฿120B",
    bizFitnessStat1Label: "ตลาดฟิตเนส & กีฬาไทย",
    bizFitnessStat2Value: "2,499",
    bizFitnessStat2Label: "ธุรกิจฟิตเนสจดทะเบียน",
    bizFitnessStat3Value: "18%",
    bizFitnessStat3Label: "การเติบโตรายได้ฟิตเนสต่อปี",
    bizFitnessStat4Value: "56M",
    bizFitnessStat4Label: "ผู้ใช้ LINE ในไทย",
    pricingTitle: "เลือกแพลนที่เหมาะกับคุณ",
    pricingDescription: "เริ่มต้นฟรี อัปเกรดตามการเติบโต",
    pricingMonthly: "รายเดือน",
    pricingAnnual: "รายปี",
    pricingSaveLabel: "ประหยัดสูงสุด 20%",
    pricingPerMonth: "/เดือน",
    pricingPerDay: "เฉลี่ยวันละ",
    pricingPerDayUnit: "/วัน",
    pricingFreeName: "FREE",
    pricingFreeSubtitle: "สำหรับเริ่มต้นใช้งาน",
    pricingStarterName: "STARTER",
    pricingStarterSubtitle: "สำหรับธุรกิจขนาดเล็ก",
    pricingProName: "PROFESSIONAL",
    pricingProSubtitle: "สำหรับธุรกิจที่กำลังเติบโต",
    pricingEnterpriseName: "ENTERPRISE",
    pricingEnterpriseSubtitle: "สำหรับองค์กรขนาดใหญ่",
    pricingStartFree: "เริ่มต้นฟรี",
    pricingChoosePlan: "เลือกแพลน",
    pricingContactUs: "ติดต่อเรา",
    pricingMostPopular: "แนะนำ",
    pricingFreeF1: "1 บัญชีพนักงาน",
    pricingFreeF2: "จองได้สูงสุด 30 ครั้ง/เดือน",
    pricingFreeF3: "ลิงก์จองผ่าน LINE OA",
    pricingFreeF4: "จัดการคิวเบื้องต้น",
    pricingFreeF5: "ซัพพอร์ตทางอีเมล",
    pricingStarterF1: "สูงสุด 3 บัญชีพนักงาน",
    pricingStarterF2: "จองไม่จำกัด",
    pricingStarterF3: "แจ้งเตือนอัตโนมัติผ่าน LINE",
    pricingStarterF4: "กฎป้องกัน No-show",
    pricingStarterF5: "แดชบอร์ดวิเคราะห์เบื้องต้น",
    pricingStarterF6: "จองผ่าน QR Code",
    pricingProF1: "สูงสุด 10 บัญชีพนักงาน",
    pricingProF2: "ข้อความชวนจองซ้ำอัตโนมัติ",
    pricingProF3: "วิเคราะห์ขั้นสูง & รายงาน",
    pricingProF4: "ยืนยันด้วยลายเซ็นดิจิทัล",
    pricingProF5: "ซัพพอร์ตระดับสูง",
    pricingProF6: "ตั้งค่า Rich Menu แบบกำหนดเอง",
    pricingEnterpriseF1: "บัญชีพนักงานไม่จำกัด",
    pricingEnterpriseF2: "จัดการหลายสาขา",
    pricingEnterpriseF3: "เชื่อมต่อ API & Integrations",
    pricingEnterpriseF4: "ผู้ดูแลบัญชีเฉพาะ",
    pricingEnterpriseF5: "SLA & Onboarding แบบกำหนดเอง",
    pricingEverythingIn: "ทุกอย่างใน {plan} รวมถึง:",
    pricingTrialNote: "ทดลองใช้ Professional ฟรี 14 วัน",
    pricingSave17: "ประหยัด 17%",
    pricingSave20: "ประหยัด 20%",
    pricingFreePrice: "ฟรี",
    pricingCustomPrice: "กำหนดเอง",

    supportDetailFree:
      "- ซัพพอร์ตทางอีเมล\n- ตอบกลับภายใน 24 ชั่วโมง\n- ให้บริการในเวลาทำการ",
    supportDetailPro:
      "- พร้อมให้บริการ 24/7\n- ตอบกลับภายใน 4 ชั่วโมง\n- ผ่านอีเมล แชท และโทรศัพท์\n- จัดลำดับความสำคัญพิเศษ",
    supportDetailEnterpriseDedicated:
      "- ผู้ดูแลบัญชีเฉพาะ\n- รีวิวประสิทธิภาพรายเดือน\n- คำแนะนำเชิงรุกเพื่อเพิ่มประสิทธิภาพ",
    supportDetailEnterpriseSLA:
      "- การันตี uptime 99.99%\n- ตอบกลับภายใน 1 ชั่วโมง\n- โปรแกรม onboarding เฉพาะองค์กร",

    contactPageTitle: "ติดต่อเรา",
    contactPageEyebrow: "เริ่มต้นใช้งาน",
    contactPageHeadline: "พร้อมเพิ่มยอดจอง\nให้ธุรกิจของคุณ!",
    contactPageSubtitle: "ปรึกษาฟรี ทีมงานพร้อมช่วยคุณเริ่มต้น",
    contactSalesTitle: "สอบถามการใช้งาน",
    contactSalesDesc:
      "ทีมงานพร้อมสาธิตระบบและให้คำปรึกษาเฉพาะธุรกิจของคุณ เริ่มต้นได้ทันที",
    contactSalesCta: "โทร 097-016-6045",
    contactSalesCta2: "หรือ 080-595-6458",
    contactLineTitle: "แชทกับเรา",
    contactLineDesc:
      "สอบถามฟีเจอร์ ขอความช่วยเหลือ หรือเริ่มต้นใช้งานได้เลย ตอบไวภายใน 5 นาที",
    contactLineCta: "เพิ่มเพื่อน LINE OA",
    contactFormTitle: "มีคำถาม? ส่งข้อความถึงเรา",
    contactFormDesc:
      "กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด",
    contactFormName: "ชื่อ",
    contactFormEmail: "อีเมล",
    contactFormPhone: "เบอร์โทรศัพท์",
    contactFormMessage: "ข้อความ",
    contactFormSend: "ส่งข้อความ",
    contactFormSuccessTitle: "ขอบคุณ!",
    contactFormSuccessDesc: "เราได้รับข้อความของคุณแล้ว จะติดต่อกลับโดยเร็วที่สุด",
    footerMenu: "เมนูหลัก",
    footerContact: "ช่องทางติดต่อ",
    badgeServices: "ทำไมต้องเลือกเรา?",
    badgeFeatures: "ครบจบในที่เดียว",
    badgeFaq: "มีคำถามใช่ไหม?",
  },
};

export function t(key: keyof typeof translations.en): string {
  const lang = currentLanguage.get();
  return translations[lang][key] || translations.en[key];
}
