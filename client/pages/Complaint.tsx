import { useState } from "react";
import { Link } from "react-router-dom";
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
  ArrowLeft,
  Building,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Phone,
  Mail,
} from "lucide-react";

export default function Complaint() {
  const [activeTab, setActiveTab] = useState("buat");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    kategori: "",
    judul: "",
    deskripsi: "",
    bukti: null as File | null,
  });

  const categories = [
    "Pelayanan Staff",
    "Fasilitas",
    "Sistem Online",
    "Waktu Tunggu",
    "Biaya",
    "Lainnya",
  ];

  const complaintHistory = [
    {
      id: "ADU-2024-001",
      judul: "Sistem antrian online error",
      kategori: "Sistem Online",
      status: "Ditindak",
      tanggal: "2024-12-08",
      respon:
        "Terima kasih atas laporannya. Masalah telah diperbaiki pada 10 Desember 2024.",
    },
    {
      id: "ADU-2024-002",
      judul: "AC ruang tunggu tidak dingin",
      kategori: "Fasilitas",
      status: "Ditinjau",
      tanggal: "2024-12-10",
      respon: "Laporan Anda sedang dalam proses perbaikan oleh tim teknis.",
    },
    {
      id: "ADU-2024-003",
      judul: "Pelayanan kurang ramah",
      kategori: "Pelayanan Staff",
      status: "Diterima",
      tanggal: "2024-12-12",
      respon:
        "Laporan Anda telah diterima dan sedang ditinjau oleh supervisor.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle complaint submission
    console.log("Complaint data:", formData);
    // Reset form or show success message
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Ditindak":
        return "bg-green-600 hover:bg-green-600";
      case "Ditinjau":
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
            Buat Aduan
          </button>
          <button
            onClick={() => setActiveTab("riwayat")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "riwayat"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-green-100"
            }`}
          >
            Riwayat Aduan
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
        </div>

        {/* Tab Content */}
        {activeTab === "buat" && (
          <Card className="border-green-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                Buat Aduan Baru
              </CardTitle>
              <CardDescription>
                Sampaikan keluhan atau saran Anda untuk pelayanan yang lebih
                baik
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama" className="text-sm font-medium">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="nama"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                      className="border-green-200 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="border-green-200 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telepon" className="text-sm font-medium">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="telepon"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={formData.telepon}
                      onChange={(e) =>
                        setFormData({ ...formData, telepon: e.target.value })
                      }
                      className="border-green-200 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="kategori" className="text-sm font-medium">
                      Kategori Aduan
                    </Label>
                    <Select
                      value={formData.kategori}
                      onValueChange={(value) =>
                        setFormData({ ...formData, kategori: value })
                      }
                    >
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem 
                            key={category} 
                            value={category}
                            className="focus:bg-green-100 focus:text-green-800"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="judul" className="text-sm font-medium">
                    Judul Aduan
                  </Label>
                  <Input
                    id="judul"
                    type="text"
                    placeholder="Ringkasan singkat tentang aduan Anda"
                    value={formData.judul}
                    onChange={(e) =>
                      setFormData({ ...formData, judul: e.target.value })
                    }
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="deskripsi" className="text-sm font-medium">
                    Deskripsi Aduan
                  </Label>
                  <Textarea
                    id="deskripsi"
                    placeholder="Jelaskan detail aduan Anda..."
                    value={formData.deskripsi}
                    onChange={(e) =>
                      setFormData({ ...formData, deskripsi: e.target.value })
                    }
                    className="border-green-200 focus:border-green-500"
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bukti" className="text-sm font-medium">
                    Upload Bukti (Opsional)
                  </Label>
                  <Input
                    id="bukti"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData({ ...formData, bukti: file });
                    }}
                    className="border-green-200 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: JPG, PNG, PDF. Maksimal 5MB
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Informasi Penting
                      </h4>
                      <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                        <li>• Aduan akan direspon maksimal 3x24 jam</li>
                        <li>• Berikan informasi yang jelas dan detail</li>
                        <li>• Gunakan bahasa yang sopan dan santun</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Aduan
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "riwayat" && (
          <Card className="border-green-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Riwayat Aduan
              </CardTitle>
              <CardDescription>
                Pantau status dan tanggapan aduan yang telah Anda kirim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaintHistory.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {complaint.judul}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ID: {complaint.id}
                        </p>
                      </div>
                      <Badge className={`${getStatusClasses(complaint.status)} text-white`}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="bg-yellow-100 text-green-700 px-2 py-1 rounded text-xs">
                        {complaint.kategori}
                      </span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(complaint.tanggal).toLocaleDateString(
                          "id-ID"
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>Tanggapan:</strong> {complaint.respon}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {complaintHistory.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Belum ada aduan
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Anda belum pernah mengirim aduan
                  </p>
                  <Button
                    onClick={() => setActiveTab("buat")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Buat Aduan Pertama
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "panduan" && (
          <Card className="border-green-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-green-600" />
                Panduan Layanan Aduan
              </CardTitle>
              <CardDescription>
                Pelajari cara menggunakan layanan aduan dengan efektif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Cara Membuat Aduan
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Klik tab "Buat Aduan"</li>
                    <li>Isi semua data yang diperlukan dengan benar</li>
                    <li>Pilih kategori yang sesuai</li>
                    <li>Berikan deskripsi yang jelas dan detail</li>
                    <li>Upload bukti jika diperlukan</li>
                    <li>Klik "Kirim Aduan"</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Kategori Aduan
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="bg-green-50 border border-green-200 rounded-lg p-3"
                      >
                        <h4 className="font-medium text-green-800">
                          {category}
                        </h4>
                        <p className="text-sm text-green-700 mt-1">
                          {category === "Pelayanan Staff" &&
                            "Keluhan tentang sikap atau kinerja petugas"}
                          {category === "Fasilitas" &&
                            "Masalah terkait fasilitas fisik MPP"}
                          {category === "Sistem Online" &&
                            "Kendala pada aplikasi atau website"}
                          {category === "Waktu Tunggu" &&
                            "Keluhan tentang lamanya waktu pelayanan"}
                          {category === "Biaya" &&
                            "Pertanyaan atau keluhan tentang tarif layanan"}
                          {category === "Lainnya" &&
                            "Aduan yang tidak masuk kategori lain"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Status Aduan
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-blue-600 hover:bg-blue-600">Diterima</Badge>
                      <span className="text-gray-700">
                        Aduan telah diterima dan sedang ditinjau
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-yellow-600 hover:bg-yellow-600">Ditinjau</Badge>
                      <span className="text-gray-700">
                        Aduan sedang dalam proses penyelesaian
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-600 hover:bg-green-600">Ditindak</Badge>
                      <span className="text-gray-700">
                        Aduan telah diselesaikan
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">
                        Komitmen Pelayanan
                      </h4>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Respon maksimal 3x24 jam</li>
                        <li>• Tindak lanjut yang transparan</li>
                        <li>• Konfirmasi melalui email dan SMS</li>
                        <li>• Perlindungan data pribadi terjamin</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Kontak Alternatif
                  </h3>
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
                        <p className="text-gray-600">
                          layanan@mpp.bekasikota.go.id
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
