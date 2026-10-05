"use client";

import { useState, useId, useEffect } from "react";
import {
  Check,
  Clock,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  ArrowRight,
  ArrowLeft,
  User,
  Sparkles,
} from "lucide-react";
import {
  BOOKING_CONFIG,
  SITE_CONFIG,
  BookingServiceItem,
} from "@/lib/data";

interface DayOption {
  dateStr: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
}

export default function Booking() {
  const formId = useId();

  // Steps: 1 = Service & Branch, 2 = Stylist & Time, 3 = Guest Details, 4 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    BOOKING_CONFIG.branches[0].id
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    BOOKING_CONFIG.services[0].id
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>("any");

  // Dates (next 10 days starting tomorrow)
  const [availableDates, setAvailableDates] = useState<DayOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>(
    BOOKING_CONFIG.timeSlots[1]
  );

  // Guest details
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("+971 ");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNotes, setGuestNotes] = useState("");

  // Confirmation state
  const [confirmationRef, setConfirmationRef] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Generate available dates on client
  useEffect(() => {
    const dates: DayOption[] = [];
    const today = new Date();

    for (let i = 1; i <= 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = String(d.getDate()).padStart(2, "0");
      const monthName = d.toLocaleDateString("en-US", { month: "short" });

      dates.push({ dateStr, dayName, dayNumber, monthName });
    }

    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].dateStr);
    }
  }, []);

  // Listen to hash/query for package pre-selection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashOrSearch = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get("service");
        if (serviceParam) {
          const match = BOOKING_CONFIG.services.find(
            (s) => s.id === serviceParam
          );
          if (match) {
            setSelectedCategory(match.category);
            setSelectedServiceId(match.id);
          }
        }
      };

      handleHashOrSearch();
      window.addEventListener("popstate", handleHashOrSearch);
      return () => window.removeEventListener("popstate", handleHashOrSearch);
    }
  }, []);

  // Filtered services
  const filteredServices =
    selectedCategory === "All"
      ? BOOKING_CONFIG.services
      : BOOKING_CONFIG.services.filter(
          (s) => s.category === selectedCategory
        );

  const selectedService =
    BOOKING_CONFIG.services.find((s) => s.id === selectedServiceId) ||
    BOOKING_CONFIG.services[0];

  const selectedBranch =
    BOOKING_CONFIG.branches.find((b) => b.id === selectedBranchId) ||
    BOOKING_CONFIG.branches[0];

  const selectedStylist =
    BOOKING_CONFIG.stylists.find((st) => st.id === selectedStylistId) ||
    BOOKING_CONFIG.stylists[0];

  const selectedDateObj = availableDates.find(
    (d) => d.dateStr === selectedDate
  );

  const formattedDateString = selectedDateObj
    ? `${selectedDateObj.dayName}, ${selectedDateObj.dayNumber} ${selectedDateObj.monthName}`
    : selectedDate;

  // Validation
  const validateGuestDetails = () => {
    const errors: Record<string, string> = {};
    if (!guestName.trim()) {
      errors.name = "Please enter your full name.";
    }
    if (!guestPhone.trim() || guestPhone.trim() === "+971") {
      errors.phone = "Please enter a valid contact number.";
    }
    if (!guestEmail.trim() || !guestEmail.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGuestDetails()) return;

    // Generate reference number
    const refCode = `TSD-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmationRef(refCode);
    setStep(4);
  };

  // WhatsApp formatted confirmation text
  const whatsappBookingMessage = encodeURIComponent(
    `Hello The Salon Dubai,\n\nI have booked an appointment on your website.\n\n` +
      `*Reference:* ${confirmationRef || "TSD-NEW"}\n` +
      `*Guest:* ${guestName}\n` +
      `*Branch:* ${selectedBranch.name}\n` +
      `*Service:* ${selectedService.name} (AED ${selectedService.price})\n` +
      `*Stylist:* ${selectedStylist.name}\n` +
      `*Date & Time:* ${formattedDateString} at ${selectedTime}\n\n` +
      `Please confirm my reservation.`
  );

  const whatsappDirectUrl = `${SITE_CONFIG.whatsappUrl}?text=${whatsappBookingMessage}`;

  // Download .ics Calendar event
  const downloadCalendarFile = () => {
    if (!selectedDate) return;
    const cleanDate = selectedDate.replace(/-/g, "");
    const timeParts = selectedTime.split(" ");
    let hour = parseInt(timeParts[0].split(":")[0], 10);
    const minute = timeParts[0].split(":")[1];
    if (timeParts[1] === "PM" && hour !== 12) hour += 12;
    if (timeParts[1] === "AM" && hour === 12) hour = 0;

    const startHourStr = String(hour).padStart(2, "0");
    const endHourStr = String((hour + 2) % 24).padStart(2, "0");

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The Salon Dubai//Appointment System//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:The Salon Dubai — ${selectedService.name}`,
      `DESCRIPTION:Appointment Ref: ${confirmationRef}\\nStylist: ${selectedStylist.name}\\nTotal: AED ${selectedService.price}`,
      `LOCATION:The Salon Dubai, ${selectedBranch.name}, Dubai, UAE`,
      `DTSTART:${cleanDate}T${startHourStr}${minute}00`,
      `DTEND:${cleanDate}T${endHourStr}${minute}00`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `TheSalonDubai-${confirmationRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetBooking = () => {
    setStep(1);
    setConfirmationRef("");
    setGuestName("");
    setGuestPhone("+971 ");
    setGuestEmail("");
    setGuestNotes("");
    setFormErrors({});
  };

  return (
    <section id="booking" className="bg-white py-24 border-t border-slate-100 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
            {BOOKING_CONFIG.eyebrow}
          </span>
          <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900 mb-3">
            {BOOKING_CONFIG.heading}
          </h2>
          <p className="text-[15px] leading-relaxed text-slate-600 max-w-lg mx-auto">
            {BOOKING_CONFIG.description}
          </p>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-500">
            <div className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-900" />
              <span>{SITE_CONFIG.hoursShort}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-900" />
              <a href={`tel:${SITE_CONFIG.phoneClean}`} className="hover:text-slate-900">
                {SITE_CONFIG.phone}
              </a>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-900" />
              <span>{SITE_CONFIG.locationsSummary}</span>
            </div>
          </div>
        </div>

        {/* Main Booking Container */}
        <div className="border border-slate-200 bg-white rounded-none">
          {/* Step Progress Header */}
          {step < 4 && (
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-medium">
              <div
                className={`py-3.5 px-4 text-center border-r border-slate-200 transition-colors ${
                  step === 1
                    ? "bg-white text-slate-900 border-b-2 border-b-slate-900 -mb-[1px]"
                    : step > 1
                    ? "text-slate-900"
                    : "text-slate-400"
                }`}
              >
                <span className="hidden sm:inline">01. </span>Location & Service
              </div>
              <div
                className={`py-3.5 px-4 text-center border-r border-slate-200 transition-colors ${
                  step === 2
                    ? "bg-white text-slate-900 border-b-2 border-b-slate-900 -mb-[1px]"
                    : step > 2
                    ? "text-slate-900"
                    : "text-slate-400"
                }`}
              >
                <span className="hidden sm:inline">02. </span>Stylist & Time
              </div>
              <div
                className={`py-3.5 px-4 text-center transition-colors ${
                  step === 3
                    ? "bg-white text-slate-900 border-b-2 border-b-slate-900 -mb-[1px]"
                    : "text-slate-400"
                }`}
              >
                <span className="hidden sm:inline">03. </span>Guest Details
              </div>
            </div>
          )}

          {/* STEP 1: Location & Service */}
          {step === 1 && (
            <div className="p-6 sm:p-10 space-y-8">
              {/* Branch Selector */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-3 block">
                  Select Branch
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {BOOKING_CONFIG.branches.map((branch) => {
                    const isSelected = selectedBranchId === branch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => setSelectedBranchId(branch.id)}
                        className={`text-left p-3.5 border rounded-none transition-colors duration-150 flex flex-col justify-between min-h-[72px] ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium tracking-tight">
                            {branch.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span
                          className={`text-[11px] truncate mt-1 ${
                            isSelected ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {branch.neighborhood}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Category Filter Tabs */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-3 block">
                  Choose Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {BOOKING_CONFIG.categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`h-9 px-4 text-xs font-medium rounded-none border transition-colors ${
                        selectedCategory === category
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-900 hover:text-slate-900"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services List */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-3 block">
                  Select Service or Package
                </label>
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {filteredServices.map((service: BookingServiceItem) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-4 border rounded-none cursor-pointer transition-colors duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected
                            ? "border-slate-900 bg-slate-50"
                            : "border-slate-200 bg-white hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-4 h-4 rounded-none border mt-0.5 shrink-0 flex items-center justify-center ${
                              isSelected
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-[13px] font-medium text-slate-900">
                                {service.name}
                              </h4>
                              <span className="text-[11px] text-slate-400">
                                · {service.duration}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-7 sm:pl-0">
                          <span className="text-sm font-medium text-slate-900">
                            AED {service.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Selected:{" "}
                  <strong className="text-slate-900 font-medium">
                    {selectedService.name} (AED {selectedService.price})
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white h-11 px-7 text-[13px] font-medium rounded-none hover:bg-slate-800 transition-colors"
                >
                  <span>Select Time</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Stylist & Date & Time */}
          {step === 2 && (
            <div className="p-6 sm:p-10 space-y-8">
              {/* Stylist Selector */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-3 block">
                  Select Stylist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BOOKING_CONFIG.stylists.map((stylist) => {
                    const isSelected = selectedStylistId === stylist.id;
                    return (
                      <button
                        key={stylist.id}
                        type="button"
                        onClick={() => setSelectedStylistId(stylist.id)}
                        className={`text-left p-4 border rounded-none transition-colors flex items-center justify-between ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                        }`}
                      >
                        <div>
                          <div className="text-[13px] font-medium">
                            {stylist.name}
                          </div>
                          <div
                            className={`text-xs mt-0.5 ${
                              isSelected ? "text-slate-300" : "text-slate-400"
                            }`}
                          >
                            {stylist.role} {stylist.branch !== "All Branches" && `· ${stylist.branch}`}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Selection Horizontal Strip */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-3 block">
                  Select Date
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`py-3 px-1 text-center border rounded-none transition-colors flex flex-col items-center justify-center ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            isSelected ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {item.dayName}
                        </span>
                        <span className="text-base font-medium mt-0.5">
                          {item.dayNumber}
                        </span>
                        <span
                          className={`text-[9px] uppercase ${
                            isSelected ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-3 block">
                  Select Time Slot ({selectedBranch.name} · Open 9AM–9PM)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BOOKING_CONFIG.timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`h-11 px-3 text-xs font-medium border rounded-none transition-colors flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        <Clock className={`w-3 h-3 ${isSelected ? "text-white" : "text-slate-400"}`} />
                        <span>{time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Services</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white h-11 px-7 text-[13px] font-medium rounded-none hover:bg-slate-800 transition-colors"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details & Summary */}
          {step === 3 && (
            <form onSubmit={handleConfirmBooking} className="p-6 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Inputs: 2 cols */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-2 block"
                    >
                      Full Name *
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className={`w-full h-11 px-4 text-[13px] text-slate-900 bg-white border rounded-none transition-colors focus:outline-none ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-slate-200 focus:border-slate-900"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${formId}-phone`}
                        className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-2 block"
                      >
                        Phone Number *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        placeholder="+971 54 000 0000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className={`w-full h-11 px-4 text-[13px] text-slate-900 bg-white border rounded-none transition-colors focus:outline-none ${
                          formErrors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-200 focus:border-slate-900"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-email`}
                        className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-2 block"
                      >
                        Email Address *
                      </label>
                      <input
                        id={`${formId}-email`}
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className={`w-full h-11 px-4 text-[13px] text-slate-900 bg-white border rounded-none transition-colors focus:outline-none ${
                          formErrors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-200 focus:border-slate-900"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-notes`}
                      className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-2 block"
                    >
                      Special Requests / Hair Notes (Optional)
                    </label>
                    <textarea
                      id={`${formId}-notes`}
                      rows={3}
                      placeholder="Any specific requests, previous hair color history, or nail design preferences..."
                      value={guestNotes}
                      onChange={(e) => setGuestNotes(e.target.value)}
                      className="w-full p-4 text-[13px] text-slate-900 bg-white border border-slate-200 rounded-none focus:outline-none focus:border-slate-900 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Summary Sidebar: 1 col */}
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-none space-y-4">
                  <div className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400">
                    Booking Summary
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Location</span>
                      <span className="font-medium text-slate-900">
                        {selectedBranch.name}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Service</span>
                      <span className="font-medium text-slate-900">
                        {selectedService.name}
                      </span>
                      <span className="text-slate-400 block mt-0.5">
                        {selectedService.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Stylist</span>
                      <span className="font-medium text-slate-900">
                        {selectedStylist.name}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Date & Time</span>
                      <span className="font-medium text-slate-900">
                        {formattedDateString} · {selectedTime}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-600">Total Price</span>
                    <span className="text-base font-medium text-slate-900">
                      AED {selectedService.price}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    No advance payment required. Payment is taken at the branch after your treatment.
                  </p>
                </div>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Time</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-slate-900 text-white h-11 px-8 text-[13px] font-medium rounded-none hover:bg-slate-800 transition-colors"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmed State */}
          {step === 4 && (
            <div className="p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
              {/* Reference Pill */}
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[11px] uppercase tracking-[0.15em] font-medium px-3.5 py-1 rounded-none">
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Confirmed #{confirmationRef}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
                You&rsquo;re Booked, {guestName.split(" ")[0]}!
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                We have reserved your appointment at <strong className="text-slate-900">{selectedBranch.name}</strong>. A confirmation has been logged under reference <strong className="text-slate-900">#{confirmationRef}</strong>.
              </p>

              {/* Booking Ticket Card */}
              <div className="border border-slate-200 bg-slate-50 p-6 text-left rounded-none space-y-3.5">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                      Date & Time
                    </span>
                    <span className="font-medium text-slate-900 mt-0.5 block">
                      {formattedDateString} at {selectedTime}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                      Branch
                    </span>
                    <span className="font-medium text-slate-900 mt-0.5 block">
                      {selectedBranch.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                      Service
                    </span>
                    <span className="font-medium text-slate-900 mt-0.5 block">
                      {selectedService.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                      Stylist
                    </span>
                    <span className="font-medium text-slate-900 mt-0.5 block">
                      {selectedStylist.name}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Amount due at salon:</span>
                  <span className="text-sm font-medium text-slate-900">
                    AED {selectedService.price}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white h-11 px-7 text-[13px] font-medium rounded-none hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send Confirmation to WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={downloadCalendarFile}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-slate-900 text-slate-900 h-11 px-6 text-[13px] font-medium rounded-none hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetBooking}
                  className="text-xs text-slate-400 hover:text-slate-900 transition-colors underline underline-offset-4"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
