import React, { createContext, useContext, useReducer, useEffect } from 'react';

const DesignerContext = createContext();

const initialState = {
  designers: [
    {
      id: 1,
      name: "Jaka Designs",
      specialty: "BRIDAL & FORMAL WEAR",
      location: "8MMC+F59, Sunyani",
      phone: "+233 54 717 2208",
      email: "jakadesigns@gmail.com",
      workingHours: "Open ⋅ Closes 5 pm",
      rating: 4.9,
      experience: "10 years",
      description: "Specializing in exquisite bridal gowns and formal wear. Creating timeless pieces that make every bride feel like a princess on their special day.",
      services: ["Bridal Gowns", "Wedding Dresses", "Formal Wear", "Evening Gowns", "Custom Fittings", "Alterations"],
      image: "/images/bijay.jpg",
      portfolio: [
        {
          title: "Elegant Bridal Gown",
          description: "A stunning white bridal gown with intricate lace detailing",
          category: "Bridal",
          image: "/images/Bridal.webp"
        },
        {
          title: "Classic Wedding Dress",
          description: "Timeless wedding dress with modern elegance",
          category: "Bridal",
          image: "/images/Bridal1.webp"
        },
        {
          title: "Formal Evening Gown",
          description: "Sophisticated evening wear for special occasions",
          category: "Formal",
          image: "/images/Bridal2.webp"
        },
        {
          title: "Royal Wedding Dress",
          description: "Regal wedding dress with majestic presence",
          category: "Bridal",
          image: "/images/Bridal%204.webp"
        },
        {
          title: "Modern Bridal Design",
          description: "Contemporary bridal fashion with clean lines",
          category: "Bridal",
          image: "/images/Bridal%205.webp"
        },
        {
          title: "Luxury Bridal Collection",
          description: "Premium bridal wear for the discerning bride",
          category: "Bridal",
          image: "/images/bridal6.webp"
        },
        {
          title: "Elegant Lady in White",
          description: "Graceful white dress for special occasions",
          category: "Formal",
          image: "/images/big%20lady.jpeg"
        },
        {
          title: "Casual Elegance",
          description: "Comfortable yet stylish casual wear",
          category: "Casual",
          image: "/images/casual%20lady.jpeg"
        }
      ]
    },
    {
      id: 2,
      name: "byijay",
      specialty: "DESIGN & FASHION",
      location: "Sunyani, Ghana",
      phone: "+233 59 536 1788",
      email: "byijayfashion@gmail.com",
      workingHours: "8am-6pm (Mon-Fri)",
      rating: 4.8,
      experience: "8 years",
      description: "Creative fashion designer bringing innovative designs to life. Specializing in contemporary fashion that combines style with comfort.",
      services: ["Custom Designs", "Fashion Consultation", "Style Makeovers", "Trend Analysis", "Personal Styling", "Fashion Shows"],
      image: "/images/bijay.jpg",
      portfolio: [
        {
          title: "Contemporary Fashion",
          description: "Modern fashion design with bold statements",
          category: "Contemporary",
          image: "/images/contemp.webp"
        },
        {
          title: "Urban Style",
          description: "City-inspired fashion for the modern woman",
          category: "Contemporary",
          image: "/images/contemp1.jpg"
        },
        {
          title: "Fashion Forward",
          description: "Trendsetting designs for fashion enthusiasts",
          category: "Contemporary",
          image: "/images/contemp2.jpg"
        },
        {
          title: "Modern Elegance",
          description: "Sophisticated contemporary designs",
          category: "Contemporary",
          image: "/images/contemp3.webp"
        },
        {
          title: "Urban Chic",
          description: "City style with contemporary flair",
          category: "Contemporary",
          image: "/images/contemp4.webp"
        }
      ]
    },
    {
      id: 3,
      name: "Elegant Stitches",
      specialty: "CASUAL & EVERYDAY WEAR",
      location: "Sunyani Central",
      phone: "+233 20 123 4567",
      email: "elegantstitches@gmail.com",
      workingHours: "9am-7pm (Daily)",
      rating: 4.7,
      experience: "5 years",
      description: "Creating comfortable and stylish everyday wear. Specializing in casual fashion that's both trendy and practical for daily life.",
      services: ["Casual Wear", "Everyday Dresses", "Comfortable Fashion", "Style Consultation", "Alterations", "Custom Fittings"],
      image: "/images/casual lady.jpeg",
      portfolio: [
        {
          title: "Casual Comfort",
          description: "Comfortable everyday wear with style",
          category: "Casual",
          image: "/images/casual lady.jpeg"
        },
        {
          title: "Everyday Elegance",
          description: "Simple yet elegant daily wear",
          category: "Casual",
          image: "/images/lady.jpeg"
        },
        {
          title: "Relaxed Style",
          description: "Comfortable fashion for daily activities",
          category: "Casual",
          image: "/images/lady2.jpeg"
        },
        {
          title: "Casual Chic",
          description: "Trendy casual wear for modern women",
          category: "Casual",
          image: "/images/ladies.webp"
        },
        {
          title: "Everyday Fashion",
          description: "Practical yet stylish daily wear",
          category: "Casual",
          image: "/images/ladies1.webp"
        }
      ]
    },
    {
      id: 4,
      name: "Traditional Threads",
      specialty: "TRADITIONAL & CULTURAL WEAR",
      location: "Sunyani Traditional Area",
      phone: "+233 24 987 6543",
      email: "traditionalthreads@gmail.com",
      workingHours: "8am-6pm (Mon-Sat)",
      rating: 4.9,
      experience: "15 years",
      description: "Preserving cultural heritage through traditional fashion. Specializing in authentic traditional wear that celebrates Ghanaian culture and heritage.",
      services: ["Traditional Wear", "Cultural Dresses", "Heritage Fashion", "Custom Traditional", "Cultural Consultation", "Traditional Accessories"],
      image: "/images/traditional.webp",
      portfolio: [
        {
          title: "Traditional Elegance",
          description: "Authentic traditional Ghanaian wear",
          category: "Traditional",
          image: "/images/traditional.webp"
        },
        {
          title: "Cultural Heritage",
          description: "Traditional dress celebrating culture",
          category: "Traditional",
          image: "/images/traditional1.jpg"
        },
        {
          title: "Heritage Fashion",
          description: "Cultural wear with modern touches",
          category: "Traditional",
          image: "/images/traditional3.webp"
        },
        {
          title: "Traditional Beauty",
          description: "Authentic traditional designs",
          category: "Traditional",
          image: "/images/traditional4.jpg"
        },
        {
          title: "Cultural Pride",
          description: "Traditional wear for special occasions",
          category: "Traditional",
          image: "/images/traditional5.jpg"
        },
        {
          title: "Heritage Collection",
          description: "Traditional fashion preserving culture",
          category: "Traditional",
          image: "/images/traditional6.jpg"
        },
        {
          title: "Cultural Elegance",
          description: "Traditional wear with cultural significance",
          category: "Traditional",
          image: "/images/traditional8.jpg"
        }
      ]
    },
    {
      id: 5,
      name: "Men's Fashion Hub",
      specialty: "MEN'S FASHION",
      location: "Sunyani Business District",
      phone: "+233 26 456 7890",
      email: "mensfashionhub@gmail.com",
      workingHours: "9am-8pm (Mon-Sat)",
      rating: 4.6,
      experience: "12 years",
      description: "Dedicated to men's fashion and style. Creating sophisticated and modern men's wear that combines comfort with elegance.",
      services: ["Men's Suits", "Formal Wear", "Casual Men's Fashion", "Style Consultation", "Custom Tailoring", "Men's Accessories"],
      image: "/images/men.webp",
      portfolio: [
        {
          title: "Men's Formal",
          description: "Sophisticated men's formal wear",
          category: "Men's Fashion",
          image: "/images/men.webp"
        },
        {
          title: "Modern Men's Style",
          description: "Contemporary men's fashion",
          category: "Men's Fashion",
          image: "/images/men1.webp"
        },
        {
          title: "Men's Casual",
          description: "Comfortable men's casual wear",
          category: "Men's Fashion",
          image: "/images/men6.webp"
        },
        {
          title: "Men's Elegance",
          description: "Elegant men's fashion designs",
          category: "Men's Fashion",
          image: "/images/men7.webp"
        },
        {
          title: "Men's Style",
          description: "Trendy men's fashion",
          category: "Men's Fashion",
          image: "/images/men9.webp"
        },
        {
          title: "Men's Fashion",
          description: "Contemporary men's style",
          category: "Men's Fashion",
          image: "/images/men10.jpeg"
        }
      ]
    },
    {
      id: 6,
      name: "Children's Fashion",
      specialty: "CHILDREN'S WEAR",
      location: "Sunyani Family Center",
      phone: "+233 30 111 2222",
      email: "childrensfashion@gmail.com",
      workingHours: "10am-6pm (Daily)",
      rating: 4.8,
      experience: "8 years",
      description: "Creating adorable and comfortable fashion for children. Specializing in children's wear that's both cute and practical for active kids.",
      services: ["Children's Dresses", "Kids Fashion", "School Uniforms", "Party Wear", "Comfortable Kids Wear", "Custom Children's"],
      image: "/images/child.webp",
      portfolio: [
        {
          title: "Children's Elegance",
          description: "Adorable children's fashion",
          category: "Children's Wear",
          image: "/images/child.webp"
        },
        {
          title: "Kids Fashion",
          description: "Cute and comfortable kids wear",
          category: "Children's Wear",
          image: "/images/child2.webp"
        },
        {
          title: "Children's Style",
          description: "Trendy children's fashion",
          category: "Children's Wear",
          image: "/images/child4.webp"
        },
        {
          title: "Kids Elegance",
          description: "Elegant children's wear",
          category: "Children's Wear",
          image: "/images/child5.webp"
        }
      ]
    },
    {
      id: 7,
      name: "African Prints",
      specialty: "AFRICAN PRINT FASHION",
      location: "Sunyani Cultural Center",
      phone: "+233 27 333 4444",
      email: "africanprints@gmail.com",
      workingHours: "8am-7pm (Mon-Sat)",
      rating: 4.9,
      experience: "10 years",
      description: "Celebrating African culture through vibrant prints and designs. Specializing in African print fashion that showcases the beauty of African textiles.",
      services: ["African Prints", "Cultural Fashion", "Print Dresses", "African Style", "Custom African Wear", "Print Accessories"],
      image: "/images/african print.jpg",
      portfolio: [
        {
          title: "African Beauty",
          description: "Vibrant African print fashion",
          category: "African Print",
          image: "/images/african print.jpg"
        },
        {
          title: "African Elegance",
          description: "Elegant African print designs",
          category: "African Print",
          image: "/images/print shirt.jpg"
        },
        {
          title: "Cultural Prints",
          description: "Traditional African print wear",
          category: "African Print",
          image: "/images/wow african lady.jpeg"
        },
        {
          title: "African Style",
          description: "Modern African print fashion",
          category: "African Print",
          image: "/images/nigerian lady.jpeg"
        }
      ]
    },
    {
      id: 8,
      name: "Lady Shee Fashion",
      specialty: "AFRICAN CLOTHING",
      location: "Sunyani Rd.",
      phone: "+233 322 025628",
      email: "ladysheefashion@gmail.com",
      workingHours: "8am-6pm (Mon-Sat)",
      rating: 4.7,
      experience: "6 years",
      description: "Specializing in beautiful African clothing and traditional wear. Creating authentic African fashion that celebrates culture and heritage with modern elegance.",
      services: ["African Clothing", "Traditional Wear", "Cultural Dresses", "African Prints", "Custom African Wear", "Cultural Consultation"],
      image: "/images/african print.jpg",
      portfolio: [
        {
          title: "African Elegance",
          description: "Beautiful African print dress",
          category: "African Clothing",
          image: "/images/african print.jpg"
        },
        {
          title: "Traditional Beauty",
          description: "Authentic African traditional wear",
          category: "African Clothing",
          image: "/images/wow african lady.jpeg"
        },
        {
          title: "Cultural Fashion",
          description: "African cultural clothing",
          category: "African Clothing",
          image: "/images/nigerian lady.jpeg"
        },
        {
          title: "African Style",
          description: "Modern African fashion",
          category: "African Clothing",
          image: "/images/print shirt.jpg"
        },
        {
          title: "Heritage Wear",
          description: "Traditional African heritage clothing",
          category: "African Clothing",
          image: "/images/traditional.webp"
        },
        {
          title: "African Prints",
          description: "Vibrant African print designs",
          category: "African Clothing",
          image: "/images/traditional1.jpg"
        }
      ]
    },
    {
      id: 9,
      name: "Little Bee Fashion Designs",
      specialty: "WOMEN'S FASHION DESIGN",
      location: "Sunyani",
      phone: "+233 55 504 5688",
      email: "littlebeefashion@gmail.com",
      workingHours: "Open 24 hours",
      rating: 4.8,
      experience: "5+ years",
      description: "Creative women's fashion design with over 5 years of experience. Specializing in beautiful women's fashion that combines style, comfort, and elegance.",
      services: ["Women's Fashion Design", "Custom Dresses", "Fashion Consultation", "Style Makeovers", "Personal Styling", "Alterations"],
      image: "/images/lady.jpeg",
      portfolio: [
        {
          title: "Women's Elegance",
          description: "Beautiful women's fashion design",
          category: "Women's Fashion",
          image: "/images/lady.jpeg"
        },
        {
          title: "Fashion Forward",
          description: "Trendy women's fashion",
          category: "Women's Fashion",
          image: "/images/lady2.jpeg"
        },
        {
          title: "Style & Grace",
          description: "Elegant women's wear",
          category: "Women's Fashion",
          image: "/images/ladies.webp"
        },
        {
          title: "Modern Women",
          description: "Contemporary women's fashion",
          category: "Women's Fashion",
          image: "/images/ladies1.webp"
        },
        {
          title: "Fashion Beauty",
          description: "Beautiful women's designs",
          category: "Women's Fashion",
          image: "/images/ladies2.jpeg"
        },
        {
          title: "Women's Style",
          description: "Stylish women's fashion",
          category: "Women's Fashion",
          image: "/images/ladies3.webp"
        }
      ]
    },
    {
      id: 10,
      name: "Hr Fashion Institute",
      specialty: "WOMEN'S WEAR",
      location: "Sunyani",
      phone: "+233 24 944 1661",
      email: "hrfashioninstitute@gmail.com",
      workingHours: "8am-6pm (Mon-Sat)",
      rating: 4.6,
      experience: "3+ years",
      description: "Professional women's wear institute with 3+ years of experience. Creating sophisticated and elegant women's fashion with attention to detail.",
      services: ["Women's Wear", "Fashion Education", "Custom Designs", "Style Consultation", "Fashion Training", "Professional Wear"],
      image: "/images/ladies5.jpeg",
      portfolio: [
        {
          title: "Professional Elegance",
          description: "Sophisticated women's wear",
          category: "Women's Wear",
          image: "/images/ladies5.jpeg"
        },
        {
          title: "Institute Style",
          description: "Professional women's fashion",
          category: "Women's Wear",
          image: "/images/ladiess.jpeg"
        },
        {
          title: "Fashion Education",
          description: "Educational fashion designs",
          category: "Women's Wear",
          image: "/images/lady.webp"
        },
        {
          title: "Women's Professional",
          description: "Professional women's clothing",
          category: "Women's Wear",
          image: "/images/lady.jpeg"
        },
        {
          title: "Institute Fashion",
          description: "Fashion institute designs",
          category: "Women's Wear",
          image: "/images/lady2.jpeg"
        },
        {
          title: "Women's Elegance",
          description: "Elegant women's wear",
          category: "Women's Wear",
          image: "/images/ladies.webp"
        }
      ]
    },
    {
      id: 11,
      name: "Derby",
      specialty: "WOMEN'S FASHION DESIGN",
      location: "Sunyani",
      phone: "+233 24 036 0092",
      email: "derbyfashion@gmail.com",
      workingHours: "8am-6pm (Mon-Sat)",
      rating: 4.5,
      experience: "4 years",
      description: "Creative women's fashion designer bringing unique designs to life. Specializing in women's fashion that combines creativity with wearability.",
      services: ["Women's Fashion Design", "Custom Creations", "Style Consultation", "Fashion Design", "Personal Styling", "Alterations"],
      image: "/images/lady.jpeg",
      portfolio: [
        {
          title: "Derby Designs",
          description: "Unique women's fashion",
          category: "Women's Fashion",
          image: "/images/lady.jpeg"
        },
        {
          title: "Creative Fashion",
          description: "Creative women's designs",
          category: "Women's Fashion",
          image: "/images/lady2.jpeg"
        },
        {
          title: "Fashion Innovation",
          description: "Innovative women's fashion",
          category: "Women's Fashion",
          image: "/images/ladies.webp"
        },
        {
          title: "Style Creation",
          description: "Creative style designs",
          category: "Women's Fashion",
          image: "/images/ladies1.webp"
        },
        {
          title: "Women's Innovation",
          description: "Innovative women's wear",
          category: "Women's Fashion",
          image: "/images/ladies2.jpeg"
        },
        {
          title: "Fashion Creativity",
          description: "Creative fashion designs",
          category: "Women's Fashion",
          image: "/images/ladies3.webp"
        }
      ]
    },
    {
      id: 12,
      name: "Paykus Fashion",
      specialty: "WOMEN'S FASHION DESIGN",
      location: "Sunyani",
      phone: "+233 50 123 4567",
      email: "paykusfashion@gmail.com",
      workingHours: "9am-7pm (Mon-Sat)",
      rating: 4.7,
      experience: "5+ years",
      description: "Established women's fashion designer with over 5 years of experience. Creating beautiful and trendy women's fashion that makes every woman feel confident.",
      services: ["Women's Fashion Design", "Trendy Designs", "Custom Fashion", "Style Consultation", "Fashion Shows", "Personal Styling"],
      image: "/images/lady.jpeg",
      portfolio: [
        {
          title: "Paykus Style",
          description: "Trendy women's fashion",
          category: "Women's Fashion",
          image: "/images/lady.jpeg"
        },
        {
          title: "Fashion Trends",
          description: "Latest fashion trends",
          category: "Women's Fashion",
          image: "/images/lady2.jpeg"
        },
        {
          title: "Style Confidence",
          description: "Confident women's fashion",
          category: "Women's Fashion",
          image: "/images/ladies.webp"
        },
        {
          title: "Trendy Designs",
          description: "Trendy fashion designs",
          category: "Women's Fashion",
          image: "/images/ladies1.webp"
        },
        {
          title: "Women's Confidence",
          description: "Confident women's wear",
          category: "Women's Fashion",
          image: "/images/ladies2.jpeg"
        },
        {
          title: "Fashion Trends",
          description: "Trendy fashion styles",
          category: "Women's Fashion",
          image: "/images/ladies3.webp"
        }
      ]
    },
    {
      id: 13,
      name: "Julius Classy Designs",
      specialty: "CUSTOM FASHION DESIGN",
      location: "Sunyani",
      phone: "+233 53 988 9789",
      email: "juliusclassy@gmail.com",
      workingHours: "8am-6pm (Mon-Sat)",
      rating: 4.8,
      experience: "7 years",
      description: "Premium custom fashion designer creating sophisticated and classy designs. Specializing in custom fashion for discerning clients who appreciate quality and elegance.",
      services: ["Custom Fashion Design", "Premium Designs", "Classy Fashion", "Personal Consultation", "Custom Tailoring", "Luxury Fashion"],
      image: "/images/suit.jpg",
      portfolio: [
        {
          title: "Classy Elegance",
          description: "Sophisticated custom designs",
          category: "Custom Fashion",
          image: "/images/suit.jpg"
        },
        {
          title: "Premium Fashion",
          description: "Premium custom fashion",
          category: "Custom Fashion",
          image: "/images/lady.jpeg"
        },
        {
          title: "Luxury Designs",
          description: "Luxury custom fashion",
          category: "Custom Fashion",
          image: "/images/lady2.jpeg"
        },
        {
          title: "Classy Style",
          description: "Classy fashion designs",
          category: "Custom Fashion",
          image: "/images/ladies.webp"
        },
        {
          title: "Premium Elegance",
          description: "Premium elegant fashion",
          category: "Custom Fashion",
          image: "/images/ladies1.webp"
        },
        {
          title: "Luxury Classy",
          description: "Luxury classy designs",
          category: "Custom Fashion",
          image: "/images/ladies2.jpeg"
        }
      ]
    }
  ],
  searchFilters: {
    searchTerm: '',
    selectedSpecialty: 'All Specialties'
  },
  loading: false,
  error: null
};

const designerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DESIGNER':
      return {
        ...state,
        designers: [...state.designers, { ...action.payload, id: Date.now() }]
      };
    case 'UPDATE_DESIGNER':
      return {
        ...state,
        designers: state.designers.map(designer =>
          designer.id === action.payload.id ? action.payload : designer
        )
      };
    case 'DELETE_DESIGNER':
      return {
        ...state,
        designers: state.designers.filter(designer => designer.id !== action.payload)
      };
    case 'SET_DESIGNERS':
      return {
        ...state,
        designers: action.payload
      };
    case 'SET_SEARCH_FILTERS':
      return {
        ...state,
        searchFilters: action.payload
      };
    default:
      return state;
  }
};

export const DesignerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(designerReducer, initialState);

  // Load designers from localStorage on component mount
  useEffect(() => {
    // Clear old cache to force reload of new data with correct image paths
    localStorage.removeItem('sunyaniDesigners');
    
    const savedDesigners = localStorage.getItem('sunyaniDesigners');
    if (savedDesigners) {
      dispatch({ type: 'SET_DESIGNERS', payload: JSON.parse(savedDesigners) });
    }
  }, []);

  // Save designers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sunyaniDesigners', JSON.stringify(state.designers));
  }, [state.designers]);

  const addDesigner = (designer) => {
    dispatch({ type: 'ADD_DESIGNER', payload: designer });
  };

  const updateDesigner = (designer) => {
    dispatch({ type: 'UPDATE_DESIGNER', payload: designer });
  };

  const deleteDesigner = (id) => {
    dispatch({ type: 'DELETE_DESIGNER', payload: id });
  };

  const setSearchFilters = (filters) => {
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: filters });
  };

  // Filter designers based on search filters
  const getFilteredDesigners = () => {
    let filtered = state.designers;

    // Filter by search term
    if (state.searchFilters.searchTerm) {
      filtered = filtered.filter(designer =>
        designer.name.toLowerCase().includes(state.searchFilters.searchTerm.toLowerCase()) ||
        designer.specialty.toLowerCase().includes(state.searchFilters.searchTerm.toLowerCase()) ||
        designer.location.toLowerCase().includes(state.searchFilters.searchTerm.toLowerCase())
      );
    }

    // Filter by specialty
    if (state.searchFilters.selectedSpecialty !== 'All Specialties') {
      filtered = filtered.filter(designer =>
        designer.specialty === state.searchFilters.selectedSpecialty
      );
    }

    return filtered;
  };

  return (
    <DesignerContext.Provider value={{
      designers: state.designers,
      filteredDesigners: getFilteredDesigners(),
      searchFilters: state.searchFilters,
      addDesigner,
      updateDesigner,
      deleteDesigner,
      setSearchFilters,
      dispatch
    }}>
      {children}
    </DesignerContext.Provider>
  );
};

export { DesignerContext };
export const useDesigners = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('useDesigners must be used within a DesignerProvider');
  }
  return context;
}; 