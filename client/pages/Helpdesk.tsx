// src/pages/Helpdesk.tsx

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  HelpCircle,
  Search,
  Phone,
  Mail,
} from "lucide-react";

export default function Helpdesk() {
  const [activeTab, setActiveTab] = useState("buat");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    kategori: "",
    judul: "",
    deskripsi: "",
  });
  const [searchFaq, setSearchFaq] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState("Semua");

  const categories = [
    "Informasi Layanan",
    "Cara Penggunaan Aplikasi",
    "Persyaratan Dokumen",
    "Prosedur Pelayanan",
    "Jadwal Operasional",
    "Lainnya",
  ];

  const helpdeskHistory = [
    {
      id: "HLP-2024-001",
      judul: "Cara menggunakan sistem antrian online",
      kategori: "Cara Penggunaan Aplikasi",
      status: "Ditanggapi",
      tanggal: "2024-12-08",
      respon:
        "Untuk menggunakan sistem antrian online, silakan akses menu 'Daftar Antrian' dan pilih layanan yang diinginkan.",
    },
    {
      id: "HLP-2024-002",
      judul: "Persyaratan untuk membuat KTP",
      kategori: "Persyaratan Dokumen",
      status: "Diproses",
      tanggal: "2024-12-10",
      respon: "Pertanyaan Anda sedang diproses oleh tim dukcapil.",
    },
    {
      id: "HLP-2024-003",
      judul: "Jam operasional layanan SIM",
      kategori: "Jadwal Operasional",
      status: "Diterima",
      tanggal: "2024-12-12",
      respon: "Pertanyaan Anda telah diterima dan akan ditanggapi secepatnya.",
    },
  ];

  const faqData = [
    {
      question: "Bagaimana cara mendaftar antrian online?",
      answer:
        "Anda dapat mendaftar antrian online melalui menu 'Daftar Antrian' di website ini. Pilih layanan yang diinginkan, isi data yang diperlukan, dan sistem akan memberikan nomor antrian.",
      category: "Cara Penggunaan Aplikasi",
    },
    {
      question: "Apa saja persyaratan untuk membuat KTP elektronik?",
      answer:
        "Persyaratan untuk KTP elektronik: 1) Surat Pengantar RT/RW, 2) Kartu Keluarga asli, 3) Foto 4x6 sebanyak 2 lembar, 4) Fotokopi KK.",
      category: "Persyaratan Dokumen",
    },
    {
      question: "Berapa lama waktu tunggu untuk layanan SIM?",
      answer:
        "Estimasi waktu tunggu untuk layanan perpanjangan SIM adalah sekitar 1 jam, tergantung antrian. Kami sarankan datang pada pagi hari untuk waktu tunggu yang lebih singkat.",
      category: "Jadwal Operasional",
    },
    {
      question: "Apakah ada biaya untuk layanan di MPP?",
      answer:
        "Sebagian besar layanan di MPP gratis, namun ada beberapa layanan yang dikenakan tarif sesuai peraturan yang berlaku. Informasi biaya akan dijelaskan saat pendaftaran.",
      category: "Informasi Layanan",
    },
    {
      question: "Bagaimana cara mengecek status permohonan?",
      answer:
        "Anda dapat mengecek status permohonan melalui kode tracking yang diberikan saat pendaftaran. Gunakan fitur 'Cek Status' di website atau tanyakan langsung ke petugas.",
      category: "Cara Penggunaan Aplikasi",
    },
    {
      question: "Apa yang harus dilakukan jika dokumen hilang?",
      answer:
        "Jika dokumen persyaratan hilang, Anda perlu membuat surat keterangan kehilangan dari kepolisian terlebih dahulu, kemudian mengurus penggantian dokumen di instansi terkait.",
      category: "Prosedur Pelayanan",
    },
  ];

  const faqCategories = ["Semua", ...new Set(faqData.map(faq => faq.category))];
  
  const filteredFaq = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchFaq.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchFaq.toLowerCase());
    const matchesCategory =
      selectedFaqCategory === "Semua" || faq.category === selectedFaqCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Helpdesk data:", formData);
    if ((window as any).addNotification) {
        (window as any).addNotification({
          title: "Pertanyaan Terkirim",
          message: `Pertanyaan Anda "${formData.judul}" akan segera kami proses.`,
          type: "success",
        });
      }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Ditanggapi":
        return "bg-green-600 hover:bg-green-600";
      case "Diproses":
        return "bg-yellow-600 hover:bg-yellow-600";
      case "Diterima":
        return "bg-blue-600 hover:bg-blue-600";
      default:
        return "bg-gray-600 hover:bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg border border-green-100 mb-8">
          <button
            onClick={() => setActiveTab("buat")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "buat"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-green-100"
            }`}
          >
            Buat Pertanyaan
          </button>
          <button
            onClick={() => setActiveTab("riwayat")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "riwayat"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-green-100"
            }`}
          >
            Riwayat Pertanyaan
          </button>
          <button
            onClick={() => setActiveTab("panduan")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "panduan"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-green-100"
            }`}
          >
            Panduan
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "faq"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-green-100"
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Tab Content: Buat Pertanyaan */}
        {activeTab === "buat" && (
          <Card className="border-green-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
                Ajukan Pertanyaan
              </CardTitle>
              <CardDescription>
                Dapatkan bantuan dan informasi seputar layanan MPP Kota Bekasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama" className="text-sm font-medium">Nama Lengkap</Label>
                    <Input id="nama" type="text" placeholder="Masukkan nama lengkap" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="border-green-200 focus:border-green-500" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input id="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-green-200 focus:border-green-500" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telepon" className="text-sm font-medium">Nomor Telepon</Label>
                    <Input id="telepon" type="tel" placeholder="08xxxxxxxxxx" value={formData.telepon} onChange={(e) => setFormData({ ...formData, telepon: e.target.value })} className="border-green-200 focus:border-green-500" required />
                  </div>
                  <div>
                    <Label htmlFor="kategori" className="text-sm font-medium">Kategori Pertanyaan</Label>
                    <Select value={formData.kategori} onValueChange={(value) => setFormData({ ...formData, kategori: value })}>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} className="focus:bg-green-100 focus:text-green-800">{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="judul" className="text-sm font-medium">Judul Pertanyaan</Label>
                  <Input id="judul" type="text" placeholder="Ringkasan singkat tentang pertanyaan Anda" value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} className="border-green-200 focus:border-green-500" required />
                </div>
                <div>
                  <Label htmlFor="deskripsi" className="text-sm font-medium">Detail Pertanyaan</Label>
                  <Textarea id="deskripsi" placeholder="Jelaskan detail pertanyaan Anda..." value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} className="border-green-200 focus:border-green-500" rows={5} required />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Tips Mengajukan Pertanyaan</h4>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Cek FAQ terlebih dahulu sebelum bertanya</li>
                        <li>• Berikan detail yang jelas dan spesifik</li>
                        <li>• Pilih kategori yang sesuai dengan pertanyaan</li>
                        <li>• Pertanyaan akan dijawab maksimal 2x24 jam</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Pertanyaan
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Tab Content: Riwayat Pertanyaan */}
        {activeTab === "riwayat" && (
          <Card className="border-green-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Riwayat Pertanyaan
              </CardTitle>
              <CardDescription>
                Pantau status dan jawaban pertanyaan yang telah Anda kirim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {helpdeskHistory.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.judul}</h3>
                        <p className="text-sm text-gray-500">ID: {item.id}</p>
                      </div>
                      <Badge className={`${getStatusClasses(item.status)} text-white`}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="bg-yellow-100 text-green-700 px-2 py-1 rounded text-xs">
                        {item.kategori}
                      </span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(item.tanggal).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>Jawaban:</strong> {item.respon}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {helpdeskHistory.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pertanyaan</h3>
                  <p className="text-gray-500 mb-4">Anda belum pernah mengajukan pertanyaan</p>
                  <Button onClick={() => setActiveTab("buat")} className="bg-green-600 hover:bg-green-700">
                    Ajukan Pertanyaan Pertama
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tab Content: Panduan */}
        {activeTab === "panduan" && (
          <Card className="border-green-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-green-600" />
                Panduan Layanan Helpdesk
              </CardTitle>
              <CardDescription>
                Pelajari cara menggunakan layanan helpdesk dengan efektif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Cara Mengajukan Pertanyaan</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Cek FAQ terlebih dahulu untuk jawaban cepat</li>
                    <li>Klik tab "Buat Pertanyaan" jika tidak menemukan jawaban</li>
                    <li>Isi semua data yang diperlukan dengan benar</li>
                    <li>Pilih kategori yang sesuai dengan pertanyaan</li>
                    <li>Berikan detail yang jelas dan spesifik</li>
                    <li>Klik "Kirim Pertanyaan"</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Kategori Pertanyaan</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div key={category} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="font-medium text-green-800">{category}</h4>
                        <p className="text-sm text-green-700 mt-1">
                          {category === "Informasi Layanan" && "Pertanyaan umum tentang layanan yang tersedia"}
                          {category === "Cara Penggunaan Aplikasi" && "Bantuan penggunaan website dan sistem online"}
                          {category === "Persyaratan Dokumen" && "Informasi dokumen yang diperlukan"}
                          {category === "Prosedur Pelayanan" && "Tahapan dan proses pelayanan"}
                          {category === "Jadwal Operasional" && "Informasi jam buka dan jadwal layanan"}
                          {category === "Lainnya" && "Pertanyaan yang tidak masuk kategori lain"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Status Pertanyaan</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-blue-600 hover:bg-blue-600">Diterima</Badge>
                      <span className="text-gray-700">Pertanyaan telah diterima dan menunggu proses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-yellow-600 hover:bg-yellow-600">Diproses</Badge>
                      <span className="text-gray-700">Pertanyaan sedang diproses oleh tim terkait</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-600 hover:bg-green-600">Ditanggapi</Badge>
                      <span className="text-gray-700">Pertanyaan telah dijawab</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Komitmen Pelayanan</h4>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Respon maksimal 2x24 jam</li>
                        <li>• Jawaban yang akurat dan membantu</li>
                        <li>• Notifikasi melalui email</li>
                        <li>• Kerahasiaan data terjamin</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Kontak Alternatif</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Telepon</p>
                        <p className="text-gray-600">(021) 8841-1234</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">layanan@mppbekasikota.go.id</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Tab Content: FAQ */}
        {activeTab === "faq" && (
          <Card className="border-green-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
                Frequently Asked Questions (FAQ)
              </CardTitle>
              <CardDescription>
                Pertanyaan yang sering diajukan beserta jawabannya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Cari FAQ..." value={searchFaq} onChange={(e) => setSearchFaq(e.target.value)} className="pl-10 border-green-200 focus:border-green-500" />
                </div>
                <Select value={selectedFaqCategory} onValueChange={setSelectedFaqCategory}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {faqCategories.map((category) => (
                      <SelectItem key={category} value={category} className="focus:bg-green-100 focus:text-green-800">{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {filteredFaq.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs mb-2">{faq.category}</Badge>
                      <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
              {filteredFaq.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">FAQ tidak ditemukan</h3>
                  <p className="text-gray-500 mb-4">Coba ubah kata kunci pencarian atau kategori</p>
                  <Button onClick={() => setActiveTab("buat")} className="bg-green-600 hover:bg-green-700">
                    Ajukan Pertanyaan Baru
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
