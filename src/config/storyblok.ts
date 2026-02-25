import { storyblokInit, apiPlugin } from "@storyblok/react";

// Blocos do Home
import HomeHero from "../components/HomePage/HomeHero";
import StatsSection from "../components/HomePage/StatsSection";
import AboutSection from "../components/HomePage/AboutSection";
import TrailsLearning from "../components/HomePage/TrailsLearning";
import HowItWorks from "../components/HomePage/HowItWorks";
import NextEventsHome from "../components/HomePage/NextEventsHome";
import TestimonialsSection from "../components/HomePage/TestimonialsSection";
import CallSection from "../components/HomePage/CallSection";

// Blocos Trilhas
import TrailsHeader from "../components/Trails/TrailsHeader";
import TrailsFilter from "../components/Trails/TrailsFilter";

// Blocos Eventos
import AgendaHero from "../components/Eventos/AgendaHero";
import NextEvent from "../components/Eventos/NextEvent";
import CalendarEvents from "../components/Eventos/CalendarEvents";

// Blocos About
import AboutHero from "../components/About/AboutHero";
import ValuesSection from "../components/About/ValuesSection";
import TrajectorySection from "../components/About/TrajectorySection";
import ImpactNumbers from "../components/About/ImpactNumbers";
import OurTeam from "../components/About/OurTeam";
import Partners from "../components/About/Partners";
import CtaSection from "../components/About/CtaSection";

// Blocos Support
import SupportHeader from "../components/Support/SupportHeader";
import ServiceChannels from "../components/Support/ServiceChannels";
import FAQ from "../components/Support/FAQ";
import ContatoSection from "../components/Support/ContatoSection";
import AdditionalResources from "../components/Support/AdditionalResources";

// Blocos Login
import LoginUser from "../components/Login/LoginUser";

// Blocos Register
import CadUser from "../components/Register/CadUser";



storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],

  components: {

    //Home
    HomeHero,
    StatsSection,
    AboutSection,
    TrailsLearning,
    HowItWorks,
    NextEventsHome,
    TestimonialsSection,
    CallSection,

    //Trilhas
    TrailsHeader,
    TrailsFilter,

    //Eventos
    AgendaHero,
    NextEvent,
    CalendarEvents,

    //About
    AboutHero,
    ValuesSection,
    TrajectorySection,
    ImpactNumbers,
    OurTeam,
    Partners,
    CtaSection,

    //Support
    SupportHeader,
    ServiceChannels,
    FAQ,
    ContatoSection,
    AdditionalResources,

    //Login
    LoginUser,

    //Register
    CadUser



  },
});
