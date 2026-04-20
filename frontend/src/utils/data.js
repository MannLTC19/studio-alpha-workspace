export const CURRENT_USER_NAME = 'Alex Rivera';

export const richProfiles = {
  'Alex Rivera': { 
    name: 'Alex Rivera', 
    role: 'Design Lead', 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzqGxBFnPF5UbPLd2SmtuJOxyIv5xRHEwF6DpHVMpj3cYSm7cx3NK9AVjmhmWof3tZjuBpyBkEBi7mu7SpJzJr9UZkCVXDIs1G0snzeL9Eh2SVdKz93UfY9NvKBhl08Vp-aa4x-hSwsBZRYt82Njw98hFyEaOdby-wqUJB4OJTQEYnhiJmgkYbakjrn6tB1-D9lYvoQsCNanCvivK6E0YKVSCpLTiOqGaCCd4vbszLp_kNr4S3AyoukOTZAFoN7CeNxkFYn5hvfPdZ',
    bio: 'Passionate about sustainable urban design and brutalist architecture. I lead the Zenith Residences and coordinate across structural and MEP teams.', 
    skills: ['AutoCAD', 'Revit', 'Urban Planning', 'Sustainability', 'Team Leadership'], 
    location: 'New York, NY',
    banner: 'bg-gradient-to-r from-blue-600 to-indigo-800'
  },
  'Sarah Chen': { 
    name: 'Sarah Chen', 
    role: 'Structural Engineer', 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlDr3o1uH6a7pZk_dfROE5Klrne9Zp8J3eHY-HlqRhSJwtrJOfhxnV3SgCFASubx_lYnkQoCxmSrIGUoOuEqnbssoVLTOaAOxLm2jbfEhAXI3CW7H-1bdaNGYjObbQarzlBv1crvef4v2uGBOXxnYSs-oP42LtmgZZzc0allHSHrDKwRRQIvWXkr6DjG-23Gu7Ui4SevtiAEQuFiOjad6r9DH6kTzEmXfXAa9TL6AtTjNDZmOgHBWav2Ev7hGBk9pfZbnJMQpvZO6f',
    bio: 'Specializing in high-rise structural integrity and advanced material applications like cross-laminated timber.', 
    skills: ['ETABS', 'Steel Design', 'Seismic Analysis', 'Revit'], 
    location: 'Chicago, IL',
    banner: 'bg-gradient-to-r from-emerald-500 to-teal-700'
  },
  'Marcus Thorne': { 
    name: 'Marcus Thorne', 
    role: 'Senior Architect', 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUhnzt7qIog1Tm0HZgLcW6l9KYoggLXudDhAemrbSY1ZaGHgL4Umj8_NikHlBJ49rqsetPH1-nqHHEfzdrmqze_Wc8KzWACUFFCfoUdjmcbBfROmDkgLSA2_MlUYgf0xpeR5nivzY-U64xSUIFwH3D3QGOKYCgBAqb9_FT6IrD2B_kbQv_wM_VhbJ7LfLFxjcVyBxkvRfjJxsnYTPyARvbuy8STpGdDO0AB9u_1oYkHlYxjisYVvh5dc28UnFIzOTyeblRA_A6Da3y',
    bio: 'Over 15 years of experience in commercial real estate and large-scale public infrastructure.', 
    skills: ['BIM', 'Rhino', 'Parametric Design', 'Client Relations'], 
    location: 'London, UK',
    banner: 'bg-gradient-to-r from-slate-700 to-slate-900'
  },
  'Jamie Liu': { 
    name: 'Jamie Liu', 
    role: 'Landscape Architect', 
    avatar: null, 
    bio: 'Bridging the gap between the built environment and natural ecosystems. Lead designer for the Urban Canopy concept.', 
    skills: ['Lumion', 'Planting Design', 'Ecology', 'AutoCAD'], 
    location: 'San Francisco, CA',
    banner: 'bg-gradient-to-r from-amber-500 to-orange-600'
  },
  'Emma Wilson': { name: 'Emma Wilson', role: 'Structural Engineer', avatar: null, bio: 'Focusing on retrofitting historical buildings with modern support systems.', skills: ['Structural Analysis', 'AutoCAD'], location: 'Boston, MA', banner: 'bg-gradient-to-r from-purple-500 to-fuchsia-700' },
  'David Chen': { name: 'David Chen', role: 'Senior Architect', avatar: null, bio: 'Minimalist design advocate. Specialized in residential high-rises.', skills: ['SketchUp', 'Revit', 'V-Ray'], location: 'Toronto, CA', banner: 'bg-gradient-to-r from-blue-400 to-cyan-600' },
  'Sophia Patel': { name: 'Sophia Patel', role: 'Interior Designer', avatar: null, bio: 'Creating functional, inspiring spaces for corporate and tech clients.', skills: ['Space Planning', 'Material Selection', 'Rhino'], location: 'Austin, TX', banner: 'bg-gradient-to-r from-rose-400 to-pink-600' },
  'Michael Ross': { name: 'Michael Ross', role: 'BIM Coordinator', avatar: null, bio: 'Ensuring seamless collaboration between disciplines through robust BIM models.', skills: ['Navisworks', 'Revit', 'Clash Detection'], location: 'Seattle, WA', banner: 'bg-gradient-to-r from-indigo-400 to-cyan-400' },
  'Olivia Torres': { name: 'Olivia Torres', role: 'Landscape Architect', avatar: null, bio: 'Designing public parks and community green spaces.', skills: ['Master Planning', 'Horticulture'], location: 'Miami, TX', banner: 'bg-gradient-to-r from-green-500 to-emerald-700' },
  'James Kim': { name: 'James Kim', role: 'MEP Engineer', avatar: null, bio: 'Expert in sustainable HVAC systems and energy-efficient building mechanics.', skills: ['MEP Systems', 'Energy Modeling', 'AutoCAD'], location: 'Chicago, IL', banner: 'bg-gradient-to-r from-slate-500 to-slate-700' },
};

export const getProfile = (name) => {
  if (name === 'You') name = CURRENT_USER_NAME;
  return richProfiles[name] || {
    name: name,
    role: 'Team Member',
    avatar: null,
    bio: `Collaborator at Studio Alpha. Working on various internal projects and designs.`,
    skills: ['Architecture', 'Design', 'Collaboration'],
    location: 'Remote',
    banner: 'bg-gradient-to-r from-slate-400 to-slate-600'
  };
};

export const initialForums = [
  { name: 'Urban Planning', slug: 'urban-planning' },
  { name: 'BIM Standards', slug: 'bim-standards' },
  { name: 'Materiality', slug: 'materiality' },
];

export const initialMessageGroups = [
  { name: 'Zenith Residences', slug: 'zenith' },
  { name: 'Urban Canopy Team', slug: 'urban-canopy' },
  { name: 'Sustainability Group', slug: 'sustainability' },
];

export const initialDirectMessages = [
  { name: 'Sarah Chen', slug: 'sarah-chen', avatar: richProfiles['Sarah Chen'].avatar },
  { name: 'Marcus Thorne', slug: 'marcus-thorne', avatar: richProfiles['Marcus Thorne'].avatar },
  { name: 'Jamie Liu', slug: 'jamie-liu', avatar: richProfiles['Jamie Liu'].avatar },
];

export const directoryUsers = Object.keys(richProfiles).filter(n => n !== CURRENT_USER_NAME).map(name => ({
  name,
  role: richProfiles[name].role,
  avatar: richProfiles[name].avatar
}));

export const initialMeetings = [
  {
    id: 1, title: 'Weekly Design Sync', date: 'Today', time: '09:30 AM - 10:30 AM',
    attendees: 5, type: 'Internal', link: 'https://teams.microsoft.com/', agendas: [],
  },
  {
    id: 2, title: 'Client: Horizon Tower Phase 1 Review', date: 'Today', time: '02:00 PM - 03:00 PM',
    attendees: 12, type: 'External', link: 'https://teams.microsoft.com/', agendas: [],
  },
];
