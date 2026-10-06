/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PRESET_CLIENTS } from './data/presetClients';
import { ClientConfig, ServiceItem } from './types/client';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HazardStripe } from './components/HazardStripe';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PriceListSection } from './components/PriceListSection';
import { HowItWorks } from './components/HowItWorks';
import { StatsBanner } from './components/StatsBanner';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BrandsSection } from './components/BrandsSection';
import { CouponsSection } from './components/CouponsSection';
import { FaqSection } from './components/FaqSection';
import { CtaBand } from './components/CtaBand';
import { HoursLocation } from './components/HoursLocation';
import { ServicesBookingView } from './components/ServicesBookingView';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ClientCustomizerDrawer } from './components/ClientCustomizerDrawer';

export default function App() {
  const [currentClient, setCurrentClient] = useState<ClientConfig>(PRESET_CLIENTS[0]);
  const [activeView, setActiveView] = useState<'home' | 'services'>('home');
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | undefined>(undefined);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedServiceForModal(serviceName);
    setBookingModalOpen(true);
  };

  const handleSelectServiceFromGrid = (service: ServiceItem) => {
    // Navigate to services page or open booking modal directly
    setSelectedServiceForModal(service.name);
    setBookingModalOpen(true);
  };

  const handleResetClient = () => {
    const original = PRESET_CLIENTS.find((p) => p.id === currentClient.id) || PRESET_CLIENTS[0];
    setCurrentClient({ ...original });
  };

  return (
    <div className="min-h-screen bg-[#121417] text-zinc-100 flex flex-col font-sans selection:bg-[#FF6A1A] selection:text-white">
      {/* Main Header */}
      <Header
        client={currentClient}
        activeView={activeView}
        onNavigateView={(view) => setActiveView(view)}
        onScrollToSection={scrollToSection}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* View Routing */}
      {activeView === 'home' ? (
        <main className="flex-1">
          {/* Hero with quick-quote mini form & trust badges */}
          <Hero
            client={currentClient}
            onOpenBooking={() => handleOpenBooking()}
            onNavigateView={(view) => setActiveView(view)}
            onScrollToSection={scrollToSection}
          />
          <HazardStripe />

          {/* "What we fix" services grid */}
          <ServicesGrid
            client={currentClient}
            onNavigateView={(view) => setActiveView(view)}
            onSelectService={handleSelectServiceFromGrid}
          />

          {/* Why drivers choose us with 4.9 rating badge */}
          <WhyChooseUs client={currentClient} />

          {/* Transparent dot-leader price list */}
          <PriceListSection client={currentClient} />

          {/* Three steps to a fixed car */}
          <HowItWorks client={currentClient} />

          {/* Stats count-up banner with hazard stripes */}
          <StatsBanner client={currentClient} />

          {/* Meet the mechanics crew */}
          <TeamSection client={currentClient} />

          {/* Testimonial slider */}
          <TestimonialsSection client={currentClient} />

          {/* Brands we service chips */}
          <BrandsSection />

          {/* Coupons & monthly specials */}
          <CouponsSection client={currentClient} />

          {/* FAQ accordion */}
          <FaqSection client={currentClient} />

          {/* Hazard diagonal CTA band */}
          <CtaBand
            client={currentClient}
            onOpenBooking={() => handleOpenBooking()}
            onNavigateView={(view) => setActiveView(view)}
          />

          {/* Hours (with auto-highlighted current day) and Location map */}
          <HoursLocation client={currentClient} />
        </main>
      ) : (
        <main className="flex-1">
          {/* Services & Online Booking Page */}
          <ServicesBookingView
            client={currentClient}
            onNavigateHome={() => setActiveView('home')}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        client={currentClient}
        onNavigateView={(view) => setActiveView(view)}
        onScrollToSection={scrollToSection}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        client={currentClient}
        initialService={selectedServiceForModal}
      />

      {/* Client Customizer Drawer for White-labeling */}
      <ClientCustomizerDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        client={currentClient}
        onUpdateClient={(updated) => setCurrentClient(updated)}
        onResetClient={handleResetClient}
      />
    </div>
  );
}
