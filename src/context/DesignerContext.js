import React, { createContext, useContext, useReducer, useEffect } from 'react';

const DesignerContext = createContext();

const initialState = {
  designers: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterSpecialty: 'all'
};

const designerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DESIGNERS':
      return { ...state, designers: action.payload, loading: false };
    case 'ADD_DESIGNER':
      return { ...state, designers: [...state.designers, action.payload] };
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
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_FILTER_SPECIALTY':
      return { ...state, filterSpecialty: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const DesignerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(designerReducer, initialState);

  // Load initial data from localStorage
  useEffect(() => {
    // Clear old cache to force reload of new data
    localStorage.removeItem('sunyaniDesigners');
    
    const savedDesigners = localStorage.getItem('sunyaniDesigners');
    if (savedDesigners) {
      dispatch({ type: 'SET_DESIGNERS', payload: JSON.parse(savedDesigners) });
    } else {
      // Load real Sunyani designers data
      const sunyaniDesigners = [
        {
          id: 1,
          name: "Jaka Designs",
          specialty: "Bridal & Formal Wear",
          location: "8MMC+F59, Sunyani",
          phone: "+233 54 717 2208",
          email: "jaka.designs@email.com",
          experience: "10 years",
          rating: 4.9,
          description: "Specialized in creating stunning bridal gowns and formal evening wear. Expert in traditional and modern bridal designs with attention to detail and quality craftsmanship.",
          services: ["Bridal Gowns", "Evening Dresses", "Formal Suits", "Traditional Wear"],
          image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop",
          hours: "Open ⋅ Closes 5 pm",
          workingHours: "8am-6pm (Mon-Fri)"
        },
        {
          id: 2,
          name: "byijay",
          specialty: "Design & Fashion",
          location: "Sunyani, Ghana",
          phone: "+233 59 536 1788",
          email: "byijay.designs@email.com",
          experience: "8 years",
          rating: 4.8,
          description: "BRIDAL❕ENGAGEMENT❕OCCASION❕ - Creating beautiful designs for all special occasions. Specialized in bridal wear, engagement dresses, and occasion wear with modern African flair.",
          services: ["Bridal Dresses", "Engagement Wear", "Occasion Dresses", "African Prints"],
          image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop",
          hours: "Open ⋅ Closes 6 pm",
          workingHours: "8am-6pm (Mon-Fri)"
        },
        {
          id: 3,
          name: "Ama Osei",
          specialty: "Traditional African Wear",
          location: "Sunyani Central",
          phone: "+233 24 123 4567",
          email: "ama.osei@email.com",
          experience: "8 years",
          rating: 4.8,
          description: "Specializes in creating beautiful traditional African garments with modern twists. Expert in kente, adinkra, and contemporary African fashion.",
          services: ["Wedding Dresses", "Traditional Wear", "Bridal Accessories", "African Prints"],
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          hours: "Open ⋅ Closes 6 pm",
          workingHours: "8am-6pm (Mon-Sat)"
        },
        {
          id: 4,
          name: "Kwame Mensah",
          specialty: "Contemporary Fashion",
          location: "Sunyani East",
          phone: "+233 20 987 6543",
          email: "kwame.mensah@email.com",
          experience: "5 years",
          rating: 4.5,
          description: "Modern fashion designer creating trendy contemporary pieces for young professionals. Specialized in business attire and casual wear with a modern African touch.",
          services: ["Casual Wear", "Business Attire", "Evening Dresses", "Modern Suits"],
          image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop",
          hours: "Open ⋅ Closes 7 pm",
          workingHours: "9am-7pm (Mon-Sat)"
        },
        {
          id: 5,
          name: "Sarah Addo",
          specialty: "Bridal & Formal Wear",
          location: "Sunyani West",
          phone: "+233 26 555 1234",
          email: "sarah.addo@email.com",
          experience: "12 years",
          rating: 4.9,
          description: "Expert in creating stunning bridal gowns and formal evening wear. Known for elegant designs and exceptional attention to detail in every piece.",
          services: ["Bridal Gowns", "Evening Dresses", "Formal Suits", "Accessories"],
          image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop",
          hours: "Open ⋅ Closes 6 pm",
          workingHours: "8am-6pm (Mon-Fri)"
        },
        {
          id: 6,
          name: "Michael Kofi",
          specialty: "Men's Fashion",
          location: "Sunyani North",
          phone: "+233 27 777 8888",
          email: "michael.kofi@email.com",
          experience: "6 years",
          rating: 4.6,
          description: "Specialized in men's fashion including suits, traditional wear, and casual clothing. Creating sophisticated and stylish men's attire for all occasions.",
          services: ["Men's Suits", "Traditional Wear", "Casual Clothing", "Formal Attire"],
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          hours: "Open ⋅ Closes 6 pm",
          workingHours: "8am-6pm (Mon-Sat)"
        },
        {
          id: 7,
          name: "Grace Asante",
          specialty: "Children's Fashion",
          location: "Sunyani South",
          phone: "+233 23 444 5678",
          email: "grace.asante@email.com",
          experience: "4 years",
          rating: 4.7,
          description: "Creating adorable and comfortable clothing for children of all ages. Specialized in school uniforms, party dresses, and everyday children's wear.",
          services: ["Children's Clothing", "School Uniforms", "Party Dresses", "Casual Wear"],
          image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop",
          hours: "Open ⋅ Closes 5 pm",
          workingHours: "8am-5pm (Mon-Fri)"
        }
      ];
      dispatch({ type: 'SET_DESIGNERS', payload: sunyaniDesigners });
    }
  }, []);

  // Save to localStorage whenever designers change
  useEffect(() => {
    localStorage.setItem('sunyaniDesigners', JSON.stringify(state.designers));
  }, [state.designers]);

  const addDesigner = (designer) => {
    const newDesigner = {
      ...designer,
      id: Date.now(),
      rating: 0,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_DESIGNER', payload: newDesigner });
  };

  const updateDesigner = (designer) => {
    dispatch({ type: 'UPDATE_DESIGNER', payload: designer });
  };

  const deleteDesigner = (id) => {
    dispatch({ type: 'DELETE_DESIGNER', payload: id });
  };

  const getFilteredDesigners = () => {
    let filtered = state.designers;

    if (state.searchTerm) {
      filtered = filtered.filter(designer =>
        designer.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        designer.specialty.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        designer.location.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.filterSpecialty !== 'all') {
      filtered = filtered.filter(designer =>
        designer.specialty === state.filterSpecialty
      );
    }

    return filtered;
  };

  const value = {
    ...state,
    addDesigner,
    updateDesigner,
    deleteDesigner,
    getFilteredDesigners,
    dispatch
  };

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
};

export const useDesigners = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('useDesigners must be used within a DesignerProvider');
  }
  return context;
}; 