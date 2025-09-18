import { atom } from "nanostores";

export type Language = "en" | "th";

export const currentLanguage = atom<Language>("th");

export const translations = {
  en: {
    // Navigation
    services: "Services",
    features: "Features",
    faq: "FAQ",
    contact: "Contact",
    bookNow: "Book Now",

    // Hero Section
    heroTitle: "Book Services",
    heroSubtitle: "Seamlessly",
    heroDescription:
      "The ultimate booking platform for Personal Trainers, Retail, Events, and more.",
    heroTagline: "Enterprise-grade. Simple to use.",
    trustedBy: "Join the first 1,000 early adopters",
    startBookingNow: "Start Booking Now",
    learnMore: "Learn More",
    exploreServices: "Explore Services",
    activeUsers: "Active Users",
    uptime: "Uptime",
    support: "Support",

    // Services Section
    ourServices: "Our Services",
    servicePortfolio: "Complete Service Portfolio",
    servicesDescription:
      "Choose from our comprehensive range of professional services designed to meet your every need with enterprise-grade reliability.",
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

    // Feature translations
    feature1Title: "Automated Booking System",
    feature1Desc:
      "Fast and accurate booking process. Customers can select time and confirm quickly without complications.",
    feature2Title: "Multi-Platform Support",
    feature2Desc:
      "Access from mobile, tablet, and desktop. Manage your business anywhere, anytime.",
    feature3Title: "Reports & Analytics",
    feature3Desc:
      "View revenue data, customer count, and booking statistics in real-time for informed business decisions.",
    feature4Title: "24/7 Professional Support",
    feature4Desc:
      "Expert team ready to provide guidance and resolve issues around the clock, every day.",
    feature5Title: "Flexible Payments",
    feature5Desc:
      "Multiple payment options including credit cards, QR codes, bank transfers, and digital wallets.",
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
    whyChoose: "Why Choose",
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
    chooseService: "Choose Your Service",
    modalDescription:
      "Start your seamless booking experience in just a few clicks",
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
      "Have questions about BookingWhale? We've compiled the most common questions here.",
    stillHaveQuestions: "Still have questions?",
    contactUs: "Contact us anytime 24/7",
    callNow: "Call Now",

    // FAQ Items
    "what-isQuestion": "What is BookingWhale?",
    "what-isAnswer":
      "BookingWhale is a next-generation booking platform designed to simplify service reservations for businesses and customers. We're currently in beta development.",
    "when-launchQuestion": "When will it be available?",
    "when-launchAnswer":
      "We're launching our beta version soon! Join our early access list to be among the first 1,000 users to try the platform.",
    costQuestion: "How much does it cost?",
    costAnswer:
      "BookingWhale will be free during our beta period. Early adopters will get special pricing when we launch our full platform.",
    featuresQuestion: "What features will be included?",
    featuresAnswer:
      "Our platform will include automated booking, secure payments, business analytics, 24/7 support, and seamless integrations with existing tools.",
    supportQuestion: "Do you provide support?",
    supportAnswer:
      "Yes! We provide 24/7 support via chat, email, and phone. Our dedicated team will help you get started and answer any questions.",
    securityQuestion: "Is my data secure?",
    securityAnswer:
      "Absolutely. We use bank-level encryption and follow industry best practices to protect your data. Your information is safe with us.",

    // Team Section
    teamTitle: "Meet Our Team",
    teamDescription: "Meet the experienced team behind BookingWhale",
    founderBadge: "Founder",
    founderName: "Alex Thompson",
    founderTitle: "CEO & Founder",
    founderStory1:
      "After 8 years in the tech industry, I saw the same problems over and over - complex, time-consuming, and non-transparent service booking.",
    founderStory2:
      "BookingWhale was born from the need to solve this problem for businesses and customers worldwide, with modern technology and user-centered design.",
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
      "Be the first to get updates and try BookingWhale before anyone else. Get Early Bird special pricing.",
    emailPlaceholder: "your.email@example.com",
    joinWaitlist: "Join Waitlist",
    subscriptionSuccess: "Thank you! We'll be in touch soon.",
    subscriptionError: "Something went wrong. Please try again.",
    noSpam: "No spam",
    unsubscribeAnytime: "Unsubscribe anytime",
    earlyUsers: "1,000",
    earlyUsersText: "early users",
  },
  th: {
    // Navigation
    services: "บริการหลัก",
    features: "แพลตฟอร์ม",
    faq: "คำถามที่พบบ่อย",
    contact: "ติดต่อ",
    bookNow: "จองเลย",

    // Hero Section
    heroTitle: "ระบบจองผ่าน",
    heroSubtitle: "จองง่าย ขายไว เชื่อมต่อลูกค้าได้ทันที",
    heroDescription:
      "ระบบจองนัดหมาย จัดการคิว เก็บฐานข้อมูลลูกค้า สร้างระบบจองในแบบของคุณ เชื่อมต่อกับ LINE Official Account ใช้งานง่าย พร้อมเริ่มได้ทันที",
    heroTagline: "",
    trustedBy: "เข้าร่วมเป็น 1,000 คนแรกที่ได้ทดลองใช้ก่อนใคร",
    startBookingNow: "เริ่มจองตอนนี้",
    learnMore: "ดูวิธีการใช้",
    exploreServices: "ดูบริการทั้งหมด",
    activeUsers: "ผู้ใช้งาน",
    uptime: "อัพไทม์",
    support: "ซัพพอร์ต",

    // Services Section
    ourServices: "Why Booking Whale",
    servicePortfolio: "บริการครบครัน",
    servicesDescription: "ทำไมต้องใช้ booking whale ระบบจองคิวและนัดหมาย?",
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
    notSureService: "เริ่มใช้ BookingWhale ฟรี",
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
    chooseService: "เลือกบริการของคุณ",
    modalDescription: "เริ่มการจองที่ราบรื่นในไม่กี่คลิก",
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
      "มีคำถามเกี่ยวกับ BookingWhale? เราได้รวบรวมคำถามที่พบบ่อยไว้ที่นี่",
    stillHaveQuestions: "ยังมีคำถามอื่นๆ?",
    contactUs: "ติดต่อเราได้ตลอด 24/7",
    callNow: "โทรเลย",

    // FAQ Items
    "what-isQuestion": "BookingWhale คืออะไร?",
    "what-isAnswer":
      "BookingWhale คือแพลตฟอร์มการจองรุ่นใหม่ที่ออกแบบมาเพื่อทำให้การจองบริการง่ายขึ้นสำหรับธุรกิจและลูกค้า ขณะนี้เรากำลังพัฒนาเวอร์ชัน beta",
    "when-launchQuestion": "เมื่อไหร่จะใช้ได้?",
    "when-launchAnswer":
      "เรากำลังเปิดตัวเวอร์ชัน beta เร็วๆ นี้! เข้าร่วมรายชื่อ early access เพื่อเป็น 1,000 คนแรกที่ได้ทดลองใช้แพลตฟอร์ม",
    costQuestion: "ราคาเท่าไหร่?",
    costAnswer:
      "BookingWhale จะฟรีในช่วง beta ผู้ใช้งานแรกจะได้ราคาพิเศษเมื่อเราเปิดตัวแพลตฟอร์มเต็มรูปแบบ",
    featuresQuestion: "จะมีฟีเจอร์อะไรบ้าง?",
    featuresAnswer:
      "แพลตฟอร์มของเราจะรวมการจองอัตโนมัติ การชำระเงินปลอดภัย วิเคราะห์ธุรกิจ การสนับสนุน 24/7 และการเชื่อมต่อกับเครื่องมือที่มีอยู่",
    supportQuestion: "มีการสนับสนุนไหม?",
    supportAnswer:
      "ใช่! เรามีการสนับสนุน 24/7 ผ่านแชท อีเมล และโทรศัพท์ ทีมงานเฉพาะของเราจะช่วยคุณเริ่มต้นและตอบคำถามต่างๆ",
    securityQuestion: "ข้อมูลของฉันปลอดภัยไหม?",
    securityAnswer:
      "แน่นอน เราใช้การเข้ารหัสระดับธนาคารและปฏิบัติตามมาตรฐานอุตสาหกรรมเพื่อปกป้องข้อมูลของคุณ ข้อมูลของคุณปลอดภัยกับเรา",

    // Team Section
    teamTitle: "ทีมผู้สร้าง",
    teamDescription: "พบกับทีมที่มีประสบการณ์ที่อยู่เบื้องหลัง BookingWhale",
    founderBadge: "ผู้ก่อตั้ง",
    founderName: "อเล็กซ์ ธอมป์สัน",
    founderTitle: "CEO & ผู้ก่อตั้ง",
    founderStory1:
      "หลังจากประสบการณ์ 8 ปีในอุตสาหกรรมเทคโนโลยี ผมเห็นปัญหาเดิมๆ ซ้ำแล้วซ้ำเล่า - การจองบริการที่ซับซ้อน เสียเวลา และไม่โปร่งใส",
    founderStory2:
      "BookingWhale เกิดขึ้นจากความต้องการที่จะแก้ไขปัญหานี้ให้กับธุรกิจและลูกค้าทั่วโลก ด้วยเทคโนโลยีที่ทันสมัยและการออกแบบที่เน้นผู้ใช้เป็นหลัก",
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
      "เป็นคนแรกที่ได้รับข่าวสารและได้ทดลองใช้ BookingWhale ก่อนใคร รับ Early Bird ราคาพิเศษ",
    emailPlaceholder: "your.email@example.com",
    joinWaitlist: "เข้าร่วมรายชื่อรอ",
    subscriptionSuccess: "ขอบคุณ! เราจะติดต่อกลับเร็วๆ นี้",
    subscriptionError: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    noSpam: "ไม่มี spam",
    unsubscribeAnytime: "ยกเลิกได้ตลอดเวลา",
    earlyUsers: "1,000",
    earlyUsersText: "คนแรก",
  },
};

export function t(key: keyof typeof translations.en): string {
  const lang = currentLanguage.get();
  return translations[lang][key] || translations.en[key];
}
