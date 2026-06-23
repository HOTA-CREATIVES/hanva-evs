import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, CheckCircle, Clock, Trash2, Mail, Phone, Calendar, ArrowUpRight, PlusCircle } from "lucide-react";
import { db, isMock, mockDb } from "../firebase/config";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  moodboard: string;
  timestamp: string;
  status: "New" | "Contacted" | "Completed";
}

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [serviceFilter, setServiceFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Load Inquiries
  const loadInquiries = async () => {
    setLoading(true);
    try {
      let dataList: Inquiry[] = [];
      if (!isMock && db) {
        const snap = await getDocs(collection(db, "inquiries"));
        snap.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() } as Inquiry);
        });
      } else {
        const data = await mockDb.getDocs("inquiries");
        dataList = data as Inquiry[];
      }
      
      // Sort newest first
      dataList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setInquiries(dataList);
      setFilteredInquiries(dataList);
    } catch (error) {
      console.error("Failed to load inquiries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Handle Search and Filters
  useEffect(() => {
    let result = inquiries;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) => i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((i) => i.status === statusFilter);
    }

    if (serviceFilter !== "All") {
      result = result.filter((i) => i.service === serviceFilter);
    }

    setFilteredInquiries(result);
  }, [search, statusFilter, serviceFilter, inquiries]);

  // Update Status
  const handleUpdateStatus = async (id: string, newStatus: "New" | "Contacted" | "Completed") => {
    try {
      if (!isMock && db) {
        const docRef = doc(db, "inquiries", id);
        await updateDoc(docRef, { status: newStatus });
      } else {
        const current = inquiries.find((i) => i.id === id);
        if (current) {
          const updated = { ...current, status: newStatus };
          await mockDb.setDoc("inquiries", id, updated);
        }
      }
      
      // Update local state
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      
      // Update selected modal inquiry
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead from the pipeline?")) return;
    
    try {
      if (!isMock && db) {
        const docRef = doc(db, "inquiries", id);
        await deleteDoc(docRef);
      } else {
        await mockDb.deleteDoc("inquiries", id);
      }
      
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      setSelectedInquiry(null);
    } catch (err) {
      console.error("Failed to delete inquiry", err);
    }
  };

  // Seed Mock Demo Leads
  const handleLoadDemoLeads = async () => {
    const demoLeads = [
      {
        name: "Aria Moretti",
        email: "aria@moretti.com",
        phone: "+91 91234 56789",
        service: "Luxury Interiors",
        message: "Need a high-end luxury upgrade for my residential dining hall and entrance lobby. Pre-loaded moodboard selections suggest custom matte panels and gold highlight trims.",
        moodboard: "Minimalist Alabaster | Textures: Brushed Brass Trims, High-End Italian Stone | Light: WARM Tone",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: "New"
      },
      {
        name: "Marcus Vance",
        email: "marcus.vance@vanguard.com",
        phone: "+91 88776 65544",
        service: "Bespoke Events",
        message: "Requesting a volumetric minimal setup for our vanguard hardware release in Hyderabad. Need strip lighting and custom concrete textures.",
        moodboard: "Volumetric Charcoal | Textures: Raw Concrete Texturing, Brushed Brass Trims | Light: COOL Tone",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: "Contacted"
      },
      {
        name: "Elena Rostova",
        email: "elena@rostov.org",
        phone: "+91 99887 76655",
        service: "Bespoke Events",
        message: "Dream wedding project. Looking for hanging orchid styling, high candle count, warm accents, and emerald velvet backdrops.",
        moodboard: "Royal Gold & Forest | Textures: Suspended Orchids, Velvet Emerald Draping | Light: AMBER Tone",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        status: "Completed"
      }
    ];

    for (const lead of demoLeads) {
      if (!isMock && db) {
        await addDoc(collection(db, "inquiries"), lead);
      } else {
        await mockDb.addDoc("inquiries", lead);
      }
    }
    loadInquiries();
  };

  // Analytics Metrics
  const total = inquiries.length;
  const countNew = inquiries.filter((i) => i.status === "New").length;
  const countContacted = inquiries.filter((i) => i.status === "Contacted").length;
  const countCompleted = inquiries.filter((i) => i.status === "Completed").length;

  return (
    <div className="w-full min-h-screen bg-[#031F12] html-light:bg-[#FAFAFA] text-stone-100 html-light:text-stone-900 transition-colors duration-300 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium font-montserrat text-[#D4AF37] block mb-3">
              Executive Concierge
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-white html-light:text-stone-900 font-light tracking-wide">
              Lead <span className="italic font-normal text-[#D4AF37]">Pipeline Dashboard</span>
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={loadInquiries}
              className="p-3 bg-stone-900 html-light:bg-stone-100 border border-[#073C23] html-light:border-stone-200 text-stone-300 html-light:text-stone-700 hover:text-white rounded-sm transition-colors"
              title="Refresh leads"
            >
              <RefreshCw size={15} className={`${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLoadDemoLeads}
              className="px-4 py-2 bg-[#052A19] border border-[#0A502F] text-[#D4AF37] text-xs font-montserrat font-bold uppercase tracking-wider rounded-sm hover:bg-[#073D25] transition-colors flex items-center gap-2"
            >
              <PlusCircle size={14} />
              Seed Demo Leads
            </button>
          </div>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Leads Captured", val: total, color: "text-[#D4AF37]", icon: <Calendar size={16} /> },
            { label: "New / Uncontacted", val: countNew, color: "text-blue-400", icon: <Clock size={16} /> },
            { label: "Contacted / Active", val: countContacted, color: "text-amber-400", icon: <Clock size={16} /> },
            { label: "Completed Projects", val: countCompleted, color: "text-green-400", icon: <CheckCircle size={16} /> }
          ].map((card, idx) => (
            <div key={idx} className="bg-[#02150C] html-light:bg-stone-50 border border-[#073C23] html-light:border-stone-200 p-5 rounded-sm shadow-md">
              <div className="flex justify-between items-center text-stone-400 text-[10px] uppercase tracking-wider">
                {card.label}
                <span className={card.color}>{card.icon}</span>
              </div>
              <p className={`text-2xl md:text-3xl font-serif mt-2 font-semibold ${card.color}`}>
                {card.val}
              </p>
            </div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#02150C] html-light:bg-stone-50 border border-[#073C23] html-light:border-stone-200 p-4 rounded-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8 shadow-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={14} />
            <input
              type="text"
              placeholder="Search by client name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-xs text-white html-light:text-stone-900 rounded-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-stone-300 html-light:text-stone-800 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Service Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Service:</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-stone-300 html-light:text-stone-800 text-xs rounded-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="All">All</option>
                <option value="Bespoke Events">Bespoke Events</option>
                <option value="Luxury Interiors">Luxury Interiors</option>
                <option value="Renovation Projects">Renovation Projects</option>
                <option value="Custom Design Solutions">Custom Design Solutions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lead Table */}
        <div className="bg-[#02150C] html-light:bg-stone-50 border border-[#073C23] html-light:border-stone-200 rounded-sm overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-[#031C10] html-light:bg-stone-100 border-b border-[#073C23] html-light:border-stone-200 text-stone-400 html-light:text-stone-600 font-montserrat tracking-widest text-[9px] uppercase">
                  <th className="py-4 px-6 font-semibold">Received</th>
                  <th className="py-4 px-6 font-semibold">Client</th>
                  <th className="py-4 px-6 font-semibold">Service</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold">Moodboard</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#073C23]/40 html-light:divide-stone-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-500">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-3 text-[#D4AF37]" />
                      Querying Lead Pipeline...
                    </td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-500 italic">
                      No leads match selected filters. Try loading demo leads to test.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#031C10]/40 html-light:hover:bg-stone-100/50 transition-colors"
                    >
                      <td className="py-4 px-6 text-stone-400 font-light whitespace-nowrap">
                        {new Date(lead.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white html-light:text-stone-900">{lead.name}</div>
                        <div className="text-[10px] text-stone-400 html-light:text-stone-500 font-light mt-0.5">{lead.email}</div>
                      </td>
                      <td className="py-4 px-6 font-medium text-[#D4AF37]">
                        {lead.service}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold font-montserrat ${
                            lead.status === "New"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                              : lead.status === "Contacted"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                              : "bg-green-500/10 text-green-400 border border-green-500/30"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 truncate max-w-[150px] text-stone-400 html-light:text-stone-500 font-light">
                        {lead.moodboard && lead.moodboard !== "None" ? (
                          <span className="text-green-400 font-semibold flex items-center gap-1">
                            <CheckCircle size={10} /> Active
                          </span>
                        ) : (
                          <span className="opacity-40">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedInquiry(lead)}
                          className="px-2.5 py-1.5 bg-stone-900 html-light:bg-stone-200 hover:bg-stone-850 border border-stone-850 html-light:border-stone-300 text-white html-light:text-stone-800 rounded-sm font-semibold hover:border-stone-700 transition-colors text-[10px] uppercase tracking-wider font-montserrat inline-flex items-center gap-1"
                        >
                          Details <ArrowUpRight size={10} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Modal */}
        <AnimatePresence>
          {selectedInquiry && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020F08]/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-[#031F12] html-light:bg-[#FAFAFA] border border-[#D4AF37]/50 rounded-sm p-6 md:p-8 shadow-2xl flex flex-col justify-between max-h-[85vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-[#073C23] html-light:border-stone-200 pb-4 mb-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold block font-montserrat">
                      Lead Details
                    </span>
                    <h3 className="text-xl font-serif text-white html-light:text-stone-900 font-light mt-1">
                      {selectedInquiry.name}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="p-1.5 text-stone-500 hover:text-white html-light:hover:text-stone-900 transition-colors border border-stone-800 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                {/* Details Content */}
                <div className="space-y-6 font-sans text-xs">
                  {/* Contact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#02150C] html-light:bg-stone-50 p-4 border border-[#073C23] html-light:border-stone-200 rounded-sm">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-[#D4AF37] shrink-0" />
                      <a href={`mailto:${selectedInquiry.email}`} className="text-stone-300 html-light:text-stone-700 hover:text-white hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#D4AF37] shrink-0" />
                      <a href={`tel:${selectedInquiry.phone}`} className="text-stone-300 html-light:text-stone-700 hover:text-white hover:underline">
                        {selectedInquiry.phone || "No phone provided"}
                      </a>
                    </div>
                  </div>

                  {/* Service Pillar */}
                  <div>
                    <h4 className="font-montserrat text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1.5">
                      Service Pillar
                    </h4>
                    <p className="text-white html-light:text-stone-900 font-medium">
                      {selectedInquiry.service}
                    </p>
                  </div>

                  {/* Moodboard configuration */}
                  {selectedInquiry.moodboard && selectedInquiry.moodboard !== "None" && (
                    <div>
                      <h4 className="font-montserrat text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1.5">
                        Selected Moodboard Parameters
                      </h4>
                      <p className="text-green-400 font-semibold bg-[#031C10] p-3 border border-[#0A502F] rounded-sm italic">
                        {selectedInquiry.moodboard}
                      </p>
                    </div>
                  )}

                  {/* Message Description */}
                  <div>
                    <h4 className="font-montserrat text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1.5">
                      Client Brief / Description
                    </h4>
                    <div className="bg-[#031C10] html-light:bg-stone-100 p-4 border border-[#073C23] html-light:border-stone-200 text-stone-300 html-light:text-stone-850 rounded-sm leading-relaxed whitespace-pre-line font-light">
                      {selectedInquiry.message || "No brief details provided."}
                    </div>
                  </div>

                  {/* Date details */}
                  <div className="text-[10px] text-stone-500 italic">
                    Registered on: {new Date(selectedInquiry.timestamp).toLocaleString()}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-[#073C23] html-light:border-stone-200 pt-6 mt-8 flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedInquiry.id, "Contacted")}
                      className={`px-3 py-2 text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-colors font-montserrat border ${
                        selectedInquiry.status === "Contacted"
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : "bg-transparent border-stone-800 text-stone-400 hover:border-amber-500/50"
                      }`}
                    >
                      Active / Contacted
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedInquiry.id, "Completed")}
                      className={`px-3 py-2 text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-colors font-montserrat border ${
                        selectedInquiry.status === "Completed"
                          ? "bg-green-500/20 border-green-500 text-green-300 font-bold"
                          : "bg-transparent border-stone-800 text-stone-400 hover:border-green-500/50"
                      }`}
                    >
                      Mark Completed
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    className="p-2 border border-red-900/60 text-red-400 hover:bg-red-950/20 rounded-sm transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default AdminInquiriesPage;
