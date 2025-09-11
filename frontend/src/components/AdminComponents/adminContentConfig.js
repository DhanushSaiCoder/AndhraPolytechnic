
import UpdatesMarqueeEditor from './HomePageEditors/UpdatesMarqueeEditor';
import NoticeBoardEditor from './HomePageEditors/NoticeBoardEditor';
import CurrentInfoEditor from './HomePageEditors/CurrentInfoEditor';
import CollegeGalleryEditor from './HomePageEditors/CollegeGalleryEditor';
import AboutUsAchievementsEditor from './AboutUsPageEditors/AboutUsAchievementsEditor';
import AboutUsContactEditor from './AboutUsPageEditors/AboutUsContactEditor';
import AcademicAchievementsEditor from './AcademicsPageEditors/AcademicAchievementsEditor';
import AdmissionsPageEditor from './AcademicsPageEditors/AdmissionsPageEditor';
import AlumniSuccessStoriesEditor from './AlumniPageEditors/AlumniSuccessStoriesEditor';
import DepartmentsPageContentEditor from './DepartmentsPageContentEditor';
import EventsPageContentEditor from './EventsPageContentEditor';
import PlacementHeroEditor from './PlacementsPageEditors/PlacementHeroEditor';
import PlacementStatsEditor from './PlacementsPageEditors/PlacementStatsEditor';
import HighestPackagesEditor from './PlacementsPageEditors/HighestPackagesEditor';
import PlacementProcessEditor from './PlacementsPageEditors/PlacementProcessEditor';
import SuccessStoriesEditor from './PlacementsPageEditors/SuccessStoriesEditor';
import TopRecruitersEditor from './PlacementsPageEditors/TopRecruitersEditor';
import PlacementContactEditor from './PlacementsPageEditors/PlacementContactEditor';
import SyllabusPageContentEditor from './SyllabusPageContentEditor';

export const contentSections = [
  {
    title: 'Home Page',
    path: 'home',
    subsections: [
      { title: 'Updates Marquee', path: 'updates-marquee', component: UpdatesMarqueeEditor },
      { title: 'Notice Board', path: 'notice-board', component: NoticeBoardEditor },
      { title: 'Current Info Stats', path: 'current-info', component: CurrentInfoEditor },
      { title: 'College Gallery', path: 'college-gallery', component: CollegeGalleryEditor },
    ],
  },
  {
    title: 'Departments Page',
    path: 'departments',
    subsections: [
      { title: 'Manage Departments', path: 'manage', component: DepartmentsPageContentEditor },
    ],
  },
  {
    title: 'Placements Page',
    path: 'placements',
    subsections: [
      { title: 'Hero Section', path: 'hero', component: PlacementHeroEditor },
      { title: 'Statistics', path: 'stats', component: PlacementStatsEditor },
      { title: 'Highest Packages', path: 'highest-packages', component: HighestPackagesEditor },
      { title: 'Placement Process', path: 'process', component: PlacementProcessEditor },
      { title: 'Success Stories', path: 'success-stories', component: SuccessStoriesEditor },
      { title: 'Top Recruiters', path: 'recruiters', component: TopRecruitersEditor },
      { title: 'Contact', path: 'contact', component: PlacementContactEditor },
    ],
  },

  {
    title: 'Academics Page',
    path: 'academics',
    subsections: [
      { title: 'Academic Achievements', path: 'academic-achievements', component: AcademicAchievementsEditor },
      { title: 'Admissions', path: 'admissions', component: AdmissionsPageEditor },
    ],
  },
  {
    title: 'Events Page',
    path: 'events',
    subsections: [
      { title: 'Manage Events', path: 'manage', component: EventsPageContentEditor },
    ],
  },
  {
    title: 'About Us Page',
    path: 'about-us',
    subsections: [
      { title: 'Achievements', path: 'achievements', component: AboutUsAchievementsEditor },
      { title: 'Contact Info', path: 'contact', component: AboutUsContactEditor },
    ],
  },
  {
    title: 'Alumni Page',
    path: 'alumni',
    subsections: [
      { title: 'Success Stories', path: 'success-stories', component: AlumniSuccessStoriesEditor },
    ],
  },

  {
    title: 'Syllabus Page',
    path: 'syllabus',
    subsections: [
      { title: 'Manage Syllabus', path: 'manage', component: SyllabusPageContentEditor },
    ],
  }

];
