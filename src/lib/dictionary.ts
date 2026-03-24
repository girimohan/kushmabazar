// src/lib/dictionary.ts
// ──────────────────────────────────────────────────────────────
// Central dictionary for all UI text.
// Add every user-facing string here — never hard-code in components.
// Usage: const t = useLang(); then t.nav.home
// ──────────────────────────────────────────────────────────────

export type Lang = "en" | "ne";

export const dictionary = {
  en: {
    siteName: "KushmaBazar",
    tagline: "Your Local Marketplace",
    nav: {
      home: "Home",
      listings: "Listings",
      submit: "Post a Listing",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "🇳🇵 Kushma, Parbat — Est. 2024",
      heading: "Buy & Sell Locally in Kushma",
      subheading:
        "Connect with your neighbours. Discover goods, services, and opportunities right in your community.",
      cta: "Browse Listings",
      ctaSecondary: "Post Your Listing",
    },
    about_section: {
      heading: "What is KushmaBazar?",
      body: "KushmaBazar is a free, community-driven marketplace for the people of Kushma and surrounding areas in Parbat district. Whether you want to sell a bicycle, rent a room, offer a service, or find fresh produce — this is your place.",
    },
    categories_section: {
      heading: "Browse by Category",
    },
    cta_section: {
      heading: "Have something to sell or offer?",
      body: "Listing on KushmaBazar is completely free. Reach hundreds of buyers in your neighbourhood.",
      button: "Post a Free Listing",
    },
    listings: {
      pageTitle: "All Listings",
      filterCategory: "Filter by Category",
      filterLocation: "Filter by Location",
      allCategories: "All Categories",
      allLocations: "All Locations",
      noResults: "No listings found. Try adjusting your filters.",
      contactSeller: "Contact Seller",
      postedBy: "Posted by",
      location: "Location",
      price: "Price",
      negotiable: "Negotiable",
      free: "Free",
      viewDetails: "View Details",
    },
    detail: {
      backToListings: "← Back to Listings",
      contactSeller: "Contact Seller",
      callSeller: "Call Seller",
      emailSeller: "Email Seller",
      share: "Share",
      category: "Category",
      location: "Location",
      price: "Price",
      postedBy: "Posted by",
    },
    submit: {
      pageTitle: "Post a Listing",
      subtitle:
        "Fill in the details below. Your listing will be reviewed before it goes live.",
      fields: {
        title: "Listing Title",
        titlePlaceholder: "e.g. Second-hand Hero Splendor for sale",
        description: "Description",
        descriptionPlaceholder:
          "Describe your item or service in detail...",
        category: "Category",
        location: "Location",
        locationPlaceholder: "e.g. Kushma Bazaar, Ward 4",
        price: "Price (NPR)",
        pricePlaceholder: "e.g. 15000 (leave blank if free/negotiable)",
        contactName: "Your Name",
        contactNamePlaceholder: "Full name",
        contactPhone: "Phone Number",
        contactPhonePlaceholder: "98XXXXXXXX",
        contactEmail: "Email (optional)",
        contactEmailPlaceholder: "your@email.com",
      },
      submit: "Submit Listing",
      submitting: "Submitting…",
      success:
        "🎉 Your listing has been submitted! It will appear after review.",
      error: "Something went wrong. Please try again.",
    },
    about: {
      pageTitle: "About KushmaBazar",
      mission: "Our Mission",
      missionBody:
        "To empower the local economy of Kushma, Parbat by providing a simple, free, and trustworthy platform where community members can trade goods and services.",
      howItWorks: "How It Works",
      steps: [
        {
          title: "Post a Listing",
          body: "Submit your item or service — it's free and takes 2 minutes.",
        },
        {
          title: "Get Reviewed",
          body: "Our team quickly reviews your listing to keep the marketplace safe.",
        },
        {
          title: "Connect & Trade",
          body: "Buyers contact you directly. No middlemen, no commissions.",
        },
      ],
      team: "The Team",
      teamBody:
        "KushmaBazar is built and maintained by volunteers from the Kushma community who believe in the power of local commerce.",
    },
    contact: {
      pageTitle: "Contact Us",
      subtitle: "Have a question, suggestion, or issue? We'd love to hear from you.",
      fields: {
        name: "Your Name",
        email: "Email Address",
        message: "Message",
        messagePlaceholder: "Write your message here…",
      },
      submit: "Send Message",
      submitting: "Sending…",
      success: "Thank you! We'll get back to you soon.",
      error: "Something went wrong. Please try again.",
      address: "Kushma, Parbat District, Gandaki Province, Nepal",
      email: "hello@kushmabazar.com",
      phone: "+977-9800000000",
    },
    footer: {
      tagline: "Connecting Kushma, one listing at a time.",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    categories: [
      "Vehicles",
      "Electronics",
      "Furniture",
      "Clothing",
      "Agriculture",
      "Real Estate",
      "Services",
      "Jobs",
      "Food & Grocery",
      "Other",
    ],
    locations: [
      "Kushma Bazaar",
      "Ward 1",
      "Ward 2",
      "Ward 3",
      "Ward 4",
      "Ward 5",
      "Ward 6",
      "Ward 7",
      "Ward 8",
      "Ward 9",
      "Phalewas",
      "Other",
    ],
  },

  ne: {
    siteName: "कुश्माबजार",
    tagline: "तपाईंको स्थानीय बजार",
    nav: {
      home: "गृहपृष्ठ",
      listings: "सूचीहरू",
      submit: "सूची राख्नुहोस्",
      about: "हाम्रोबारे",
      contact: "सम्पर्क",
    },
    hero: {
      badge: "🇳🇵 कुश्मा, पर्वत — स्थापित २०२४",
      heading: "कुश्मामा किन्नुस् र बेच्नुस्",
      subheading:
        "आफ्ना छिमेकीसँग जोडिनुहोस्। आफ्नै समुदायमा सामान, सेवा र अवसरहरू खोज्नुहोस्।",
      cta: "सूचीहरू हेर्नुहोस्",
      ctaSecondary: "सूची राख्नुहोस्",
    },
    about_section: {
      heading: "कुश्माबजार के हो?",
      body: "कुश्माबजार पर्वत जिल्लाको कुश्मा र वरपरका क्षेत्रका मानिसहरूको लागि एक निःशुल्क, समुदायमा आधारित बजार हो। साइकल बेच्न, कोठा भाडामा दिन, सेवा प्रदान गर्न वा ताजा उत्पादन खोज्न — यो तपाईंको ठाउँ हो।",
    },
    categories_section: {
      heading: "श्रेणी अनुसार खोज्नुहोस्",
    },
    cta_section: {
      heading: "बेच्न वा प्रदान गर्न केही छ?",
      body: "कुश्माबजारमा सूची राख्नु सम्पूर्ण निःशुल्क छ। आफ्नो छिमेकमा सयौं खरिदकर्ताहरूसम्म पुग्नुहोस्।",
      button: "निःशुल्क सूची राख्नुहोस्",
    },
    listings: {
      pageTitle: "सबै सूचीहरू",
      filterCategory: "श्रेणी अनुसार छान्नुहोस्",
      filterLocation: "स्थान अनुसार छान्नुहोस्",
      allCategories: "सबै श्रेणीहरू",
      allLocations: "सबै स्थानहरू",
      noResults: "कुनै सूची फेला परेन। फिल्टर परिवर्तन गर्नुहोस्।",
      contactSeller: "विक्रेतालाई सम्पर्क गर्नुहोस्",
      postedBy: "राखेका",
      location: "स्थान",
      price: "मूल्य",
      negotiable: "मोलतोल गर्न मिल्छ",
      free: "निःशुल्क",
      viewDetails: "विवरण हेर्नुहोस्",
    },
    detail: {
      backToListings: "← सूचीमा फर्कनुहोस्",
      contactSeller: "विक्रेतालाई सम्पर्क गर्नुहोस्",
      callSeller: "फोन गर्नुहोस्",
      emailSeller: "इमेल गर्नुहोस्",
      share: "सेयर गर्नुहोस्",
      category: "श्रेणी",
      location: "स्थान",
      price: "मूल्य",
      postedBy: "राखेका",
    },
    submit: {
      pageTitle: "सूची राख्नुहोस्",
      subtitle:
        "तलका विवरणहरू भर्नुहोस्। तपाईंको सूची समीक्षा पछि प्रकाशित हुनेछ।",
      fields: {
        title: "सूचीको शीर्षक",
        titlePlaceholder: "जस्तै: बिक्रीको लागि पुरानो हिरो स्प्लेन्डर",
        description: "विवरण",
        descriptionPlaceholder:
          "आफ्नो सामान वा सेवाको विस्तृत विवरण लेख्नुहोस्...",
        category: "श्रेणी",
        location: "स्थान",
        locationPlaceholder: "जस्तै: कुश्मा बजार, वडा ४",
        price: "मूल्य (रू.)",
        pricePlaceholder: "जस्तै: १५०००",
        contactName: "तपाईंको नाम",
        contactNamePlaceholder: "पूरा नाम",
        contactPhone: "फोन नम्बर",
        contactPhonePlaceholder: "९८XXXXXXXX",
        contactEmail: "इमेल (ऐच्छिक)",
        contactEmailPlaceholder: "your@email.com",
      },
      submit: "सूची पठाउनुहोस्",
      submitting: "पठाउँदै…",
      success:
        "🎉 तपाईंको सूची पठाइयो! समीक्षा पछि देखिनेछ।",
      error: "केही गल्ती भयो। कृपया पुन: प्रयास गर्नुहोस्।",
    },
    about: {
      pageTitle: "कुश्माबजारको बारेमा",
      mission: "हाम्रो लक्ष्य",
      missionBody:
        "पर्वत जिल्लाको कुश्माको स्थानीय अर्थतन्त्रलाई सशक्त बनाउन एक सरल, निःशुल्क र भरोसेमय मञ्च प्रदान गर्नु।",
      howItWorks: "कसरी काम गर्छ",
      steps: [
        {
          title: "सूची राख्नुहोस्",
          body: "आफ्नो सामान वा सेवा पेश गर्नुहोस् — निःशुल्क र २ मिनेटमा।",
        },
        {
          title: "समीक्षा हुन्छ",
          body: "हाम्रो टिमले बजार सुरक्षित राख्न तपाईंको सूची छिट्टै समीक्षा गर्छ।",
        },
        {
          title: "जोडिनुस् र व्यापार गर्नुस्",
          body: "खरिदकर्ताहरूले सिधै तपाईंलाई सम्पर्क गर्छन्। कुनै बिचौलिया छैन।",
        },
      ],
      team: "टिम",
      teamBody:
        "कुश्माबजार स्थानीय वाणिज्यको शक्तिमा विश्वास गर्ने कुश्मा समुदायका स्वयंसेवकहरूले बनाएका हुन्।",
    },
    contact: {
      pageTitle: "सम्पर्क गर्नुहोस्",
      subtitle: "प्रश्न, सुझाव वा समस्या छ? हामीलाई सुन्न मन छ।",
      fields: {
        name: "तपाईंको नाम",
        email: "इमेल ठेगाना",
        message: "सन्देश",
        messagePlaceholder: "यहाँ आफ्नो सन्देश लेख्नुहोस्…",
      },
      submit: "सन्देश पठाउनुहोस्",
      submitting: "पठाउँदै…",
      success: "धन्यवाद! हामी चाँडै जवाफ दिनेछौं।",
      error: "केही गल्ती भयो। कृपया पुन: प्रयास गर्नुहोस्।",
      address: "कुश्मा, पर्वत जिल्ला, गण्डकी प्रदेश, नेपाल",
      email: "hello@kushmabazar.com",
      phone: "+977-9800000000",
    },
    footer: {
      tagline: "एक सूचीमा एक पटक कुश्मालाई जोड्दै।",
      quickLinks: "द्रुत लिङ्कहरू",
      contact: "सम्पर्क",
      rights: "सर्वाधिकार सुरक्षित।",
    },
    categories: [
      "सवारी साधन",
      "इलेक्ट्रोनिक्स",
      "फर्निचर",
      "कपडा",
      "कृषि",
      "घरजग्गा",
      "सेवाहरू",
      "जागिर",
      "खाना र किराना",
      "अन्य",
    ],
    locations: [
      "कुश्मा बजार",
      "वडा १",
      "वडा २",
      "वडा ३",
      "वडा ४",
      "वडा ५",
      "वडा ६",
      "वडा ७",
      "वडा ८",
      "वडा ९",
      "फलेवास",
      "अन्य",
    ],
  },
} as const;

export type Dictionary = (typeof dictionary)["en"];
