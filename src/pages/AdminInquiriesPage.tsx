import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Trash2, ArrowLeft, Database, HardDrive, RefreshCw } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { getFirestoreInquiries, deleteFirestoreInquiry, clearAllFirestoreInquiries } from "@/firebase/config";
import type { InquiryData } from "@/firebase/config";
import { Button } from "@/components/ui/button";

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const navigate = useNavigate();

  // Load inquiries from Firestore initially
  const loadLeads = async () => {
    const data = await getFirestoreInquiries();
    setInquiries(data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // CSV Export utility
  const exportToCSV = () => {
    if (inquiries.length === 0) return;

    const headers = ["Timestamp", "Client Name", "Email Address", "Phone Number", "Service of Interest", "Message / Brief"];
    const rows = inquiries.map((item) => [
      item.timestamp ? new Date(item.timestamp).toLocaleString() : "N/A",
      item.name || "N/A",
      item.email || "N/A",
      item.phone || "N/A",
      item.service || "N/A",
      `"${(item.message || "").replace(/"/g, '""')}"`, // escape quotes for csv compliance
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Haanav_Eviors_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear single item from Firestore
  const handleDeleteItem = async (id?: string) => {
    if (!id) return;
    try {
      const success = await deleteFirestoreInquiry(id);
      if (success) {
        loadLeads();
      } else {
        alert("Failed to delete lead from Firestore.");
      }
    } catch (err) {
      console.error("Failed to delete Firestore lead:", err);
    }
  };

  // Clear all inquiries from Firestore
  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all lead inquiries from Firestore? This action is irreversible.")) {
      const success = await clearAllFirestoreInquiries();
      if (success) {
        setInquiries([]);
      } else {
        alert("Failed to clear inquiries from Firestore.");
      }
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-stone-950 pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-900 mb-10 text-left">
            <div>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-stone-500 hover:text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans font-semibold transition-colors duration-300 mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Site
              </button>
              <h3 className="text-2xl md:text-4xl font-serif font-light tracking-wide uppercase">
                Inquiries <span className="font-serif italic font-normal text-[#D4AF37]">Pipeline</span>
              </h3>
              <p className="text-stone-500 font-sans text-xs tracking-wide mt-1.5">
                Monitor live incoming customer leads and schedule private consultation replies.
              </p>
            </div>

            {/* Dashboard Control Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-stone-800 text-stone-300 hover:text-white"
                onClick={loadLeads}
                icon={<RefreshCw className="w-3 h-3" />}
              >
                Refresh
              </Button>
              <Button
                variant="gold"
                size="sm"
                disabled={inquiries.length === 0}
                onClick={exportToCSV}
                icon={<Download className="w-3 h-3" />}
              >
                Export CSV Sheet
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-red-950/20 text-red-400 border-red-900/30 hover:bg-red-950/60"
                disabled={inquiries.length === 0}
                onClick={handleClearAll}
                icon={<Trash2 className="w-3 h-3" />}
              >
                Clear Database
              </Button>
            </div>
          </div>

          {/* Database Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 border border-stone-900 bg-stone-950/40 rounded text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                Lead Metric
              </span>
              <h4 className="text-3xl font-serif font-light text-white mt-1.5 mb-1">
                {inquiries.length}
              </h4>
              <p className="text-[10px] text-stone-500 font-sans">
                Total submissions captured.
              </p>
            </div>

            <div className="p-6 border border-stone-900 bg-stone-950/40 rounded text-left">
              <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold">
                Apps Script Sync
              </span>
              <div className="flex items-center gap-2 mt-2 mb-1.5 text-xs text-[#D4AF37] font-semibold">
                <Database className="w-4 h-4" />
                <span>Connected</span>
              </div>
              <p className="text-[10px] text-stone-500 font-sans">
                Auto-appending leads to active Google Sheet.
              </p>
            </div>

            <div className="p-6 border border-stone-900 bg-stone-950/40 rounded text-left">
              <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold">
                Cloud Vault Backups
              </span>
              <div className="flex items-center gap-2 mt-2 mb-1.5 text-xs text-[#D4AF37] font-semibold">
                <HardDrive className="w-4 h-4" />
                <span>Operational</span>
              </div>
              <p className="text-[10px] text-stone-500 font-sans">
                Secure real-time cloud sync is operational.
              </p>
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-stone-900 bg-stone-950/40 divide-y divide-stone-900 rounded overflow-hidden shadow-2xl backdrop-blur-md">
            {inquiries.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-stone-500 font-sans tracking-wide text-xs">
                  Zero lead inquiries have been captured yet. Complete the contact form to populate.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-900/40 text-stone-500 font-semibold uppercase tracking-wider text-[10px] border-b border-stone-900">
                      <th className="p-5">Date</th>
                      <th className="p-5">Client Name</th>
                      <th className="p-5">Inquiry Details</th>
                      <th className="p-5">Contact Details</th>
                      <th className="p-5">Brief / Message</th>
                      <th className="p-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900/60">
                    {inquiries.map((item, index) => (
                      <tr key={index} className="hover:bg-stone-900/10 transition-colors">
                        <td className="p-5 text-stone-500 font-mono text-[10px] whitespace-nowrap">
                          {item.timestamp ? new Date(item.timestamp).toLocaleString() : "N/A"}
                        </td>
                        <td className="p-5 font-semibold text-white uppercase tracking-wide">
                          {item.name}
                        </td>
                        <td className="p-5">
                          <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold font-sans">
                            {item.service}
                          </span>
                        </td>
                        <td className="p-5 font-sans">
                          <a
                            href={`mailto:${item.email}`}
                            className="block text-[#D4AF37] hover:underline"
                          >
                            {item.email}
                          </a>
                          <span className="block text-stone-500 mt-1">{item.phone}</span>
                        </td>
                        <td className="p-5 max-w-sm">
                          <p className="text-stone-300 leading-relaxed font-sans line-clamp-3 text-justify text-balance">
                            {item.message}
                          </p>
                        </td>
                        <td className="p-5 text-center">
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 border border-stone-900 text-stone-500 hover:text-red-400 hover:border-red-950/40 rounded transition-all cursor-pointer bg-transparent"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
export default AdminInquiriesPage;
