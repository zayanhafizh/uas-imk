import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Baby,
  Car,
  CreditCard,
  Briefcase,
  Shield,
  Home,
  Landmark,
  BookUser,
  FileBadge,
  Gavel,
  HeartPulse,
  Banknote,
  Stamp,
  Mailbox,
  Scale,
  Users,
  TrendingUp,
  Sailboat,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    layanan: "",
    tanggal: "",
    waktu: "",
    nama: "",
    nik: "",
    telepon: "",
    email: "",
    keperluan: "",
  });

  // --- PERBAIKAN DI SINI ---
  // Menggunakan daftar layanan yang sama persis dengan halaman Services.tsx
  const allServices = [
    { id: "ktp", icon: <User className="h-6 w-6" />, title: "KTP Elektronik", description: "Pembuatan dan perpanjangan KTP elektronik.", category: "Kependudukan", estimatedTime: "30 menit", requirements: ["Surat Pengantar RT/RW", "Kartu Keluarga"], available: true, code: "DUK-001" },
    { id: "kk", icon: <Users className="h-6 w-6" />, title: "Kartu Keluarga", description: "Pembuatan dan perubahan data Kartu Keluarga.", category: "Kependudukan", estimatedTime: "45 menit", requirements: ["KTP Kepala Keluarga", "Buku Nikah"], available: true, code: "DUK-002" },
    { id: "akta-lahir", icon: <Baby className="h-6 w-6" />, title: "Akta Kelahiran", description: "Pencatatan kelahiran untuk WNI dan penerbitan akta.", category: "Catatan Sipil", estimatedTime: "45 menit", requirements: ["Surat Kelahiran RS", "KTP Orang Tua"], available: true, code: "SIP-001" },
    { id: "akta-mati", icon: <FileBadge className="h-6 w-6" />, title: "Akta Kematian", description: "Pencatatan kematian dan penerbitan akta kematian.", category: "Catatan Sipil", estimatedTime: "30 menit", requirements: ["Surat Kematian RS", "KTP Almarhum"], available: true, code: "SIP-002" },
    { id: "akta-lansia", icon: <User className="h-6 w-6" />, title: "Akta Kelahiran Lansia", description: "Penerbitan akta kelahiran bagi penduduk lanjut usia.", category: "Catatan Sipil", estimatedTime: "1 jam", requirements: ["KTP", "Kartu Keluarga", "Surat Ket. dari Kelurahan"], available: true, code: "SIP-003" },
    { id: "sim", icon: <Car className="h-6 w-6" />, title: "Perpanjangan SIM A & C", description: "Perpanjangan Surat Izin Mengemudi A dan C.", category: "Kepolisian", estimatedTime: "1 jam", requirements: ["SIM Lama", "KTP", "Surat Sehat"], available: true, code: "POL-001" },
    { id: "skck", icon: <Shield className="h-6 w-6" />, title: "Perpanjangan SKCK", description: "Perpanjangan Surat Keterangan Catatan Kepolisian.", category: "Kepolisian", estimatedTime: "45 menit", requirements: ["SKCK Lama", "KTP", "Pas Foto 4x6"], available: true, code: "POL-002" },
    { id: "izin-usaha", icon: <Building className="h-6 w-6" />, title: "Izin Usaha (NIB)", description: "Penerbitan Nomor Induk Berusaha melalui sistem OSS.", category: "DPMPTSP", estimatedTime: "2 jam", requirements: ["KTP", "NPWP", "Akta Perusahaan"], available: true, code: "PZ-001" },
    { id: "imb", icon: <Home className="h-6 w-6" />, title: "Izin Mendirikan Bangunan", description: "Penerbitan IMB (sekarang PBG) untuk bangunan.", category: "DPMPTSP", estimatedTime: "2 minggu", requirements: ["Gambar Bangunan", "Sertifikat Tanah"], available: true, code: "PZ-002" },
    { id: "sip-nakes", icon: <HeartPulse className="h-6 w-6" />, title: "Izin Praktik Tenaga Kesehatan", description: "Penerbitan Surat Izin Praktik (SIP) untuk tenaga kesehatan.", category: "DPMPTSP", estimatedTime: "3 hari", requirements: ["STR", "Ijazah", "Surat Rekomendasi"], available: true, code: "PZ-003" },
    { id: "izin-reklame", icon: <FileText className="h-6 w-6" />, title: "Izin Reklame", description: "Pengurusan izin pemasangan reklame di wilayah kota.", category: "DPMPTSP", estimatedTime: "4 hari", requirements: ["Desain Reklame", "Titik Lokasi", "KTP"], available: true, code: "PZ-004" },
    { id: "sertifikat-tanah", icon: <FileText className="h-6 w-6" />, title: "Peningkatan Hak Sertifikat", description: "Peningkatan hak atas tanah (misal HGB ke SHM).", category: "BPN", estimatedTime: "1 minggu", requirements: ["Sertifikat Asli", "PBB Terakhir", "KTP"], available: true, code: "BPN-001" },
    { id: "roya", icon: <Stamp className="h-6 w-6" />, title: "Penghapusan Hak Tanggungan (Roya)", description: "Pencoretan hak tanggungan pada sertifikat tanah.", category: "BPN", estimatedTime: "5 hari", requirements: ["Sertifikat Asli", "Surat Roya dari Bank"], available: true, code: "BPN-002" },
    { id: "konsultasi-bpn", icon: <Landmark className="h-6 w-6" />, title: "Konsultasi Layanan BPN", description: "Layanan informasi dan konsultasi pertanahan.", category: "BPN", estimatedTime: "15 menit", requirements: ["KTP", "Dokumen Terkait (jika ada)"], available: true, code: "BPN-003" },
    { id: "kartu-ak1", icon: <Briefcase className="h-6 w-6" />, title: "Kartu Pencari Kerja (AK.1)", description: "Penerbitan dan perpanjangan Kartu Kuning.", category: "Disnaker", estimatedTime: "20 menit", requirements: ["KTP", "Ijazah Terakhir", "Pas Foto"], available: true, code: "DSN-001" },
    { id: "paspor-baru", icon: <BookUser className="h-6 w-6" />, title: "Pembuatan Paspor Baru", description: "Layanan pembuatan paspor baru dan penggantian habis berlaku.", category: "Imigrasi", estimatedTime: "4 hari", requirements: ["KTP", "Kartu Keluarga", "Akta Lahir/Ijazah"], available: true, code: "IMG-001" },
    { id: "ambil-paspor", icon: <BookUser className="h-6 w-6" />, title: "Pengambilan Paspor", description: "Pengambilan paspor yang telah selesai diproses.", category: "Imigrasi", estimatedTime: "10 menit", requirements: ["Bukti Pembayaran", "KTP"], available: true, code: "IMG-002" },
    { id: "pajak-kendaraan", icon: <Car className="h-6 w-6" />, title: "Pajak Kendaraan Tahunan", description: "Pembayaran pajak tahunan kendaraan bermotor (Samsat).", category: "Pajak & Retribusi", estimatedTime: "15 menit", requirements: ["STNK Asli", "KTP Asli"], available: true, code: "PAJ-001" },
    { id: "pbb", icon: <Banknote className="h-6 w-6" />, title: "Layanan PBB-P2", description: "Salinan, pembetulan, buka blokir, dan cetak tunggakan SPPT PBB.", category: "Pajak & Retribusi", estimatedTime: "30 menit", requirements: ["SPPT Terakhir", "KTP"], available: true, code: "PAJ-002" },
    { id: "konsultasi-pajak", icon: <Banknote className="h-6 w-6" />, title: "Konsultasi Pajak Daerah", description: "Informasi dan konsultasi seputar pajak daerah dan pusat.", category: "Pajak & Retribusi", estimatedTime: "20 menit", requirements: ["KTP"], available: true, code: "PAJ-003" },
    { id: "pdam", icon: <CreditCard className="h-6 w-6" />, title: "Pembayaran Tagihan PDAM", description: "Pembayaran tagihan air PDAM Tirta Patriot.", category: "PDAM", estimatedTime: "10 menit", requirements: ["Nomor Pelanggan / Tagihan"], available: true, code: "PDM-001" },
    { id: "konsultasi-hukum", icon: <Scale className="h-6 w-6" />, title: "Konsultasi Pengadilan", description: "Konsultasi e-Court, e-Raterang, dan layanan lainnya.", category: "Pengadilan", estimatedTime: "25 menit", requirements: ["KTP"], available: true, code: "PNG-001" },
    { id: "ecourt", icon: <Gavel className="h-6 w-6" />, title: "Pendaftaran Perkara (e-Court)", description: "Pendaftaran perkara gugatan dan permohonan secara elektronik.", category: "Pengadilan", estimatedTime: "40 menit", requirements: ["KTP", "Dokumen Perkara"], available: true, code: "PNG-002" },
    { id: "bpjs-kesehatan", icon: <HeartPulse className="h-6 w-6" />, title: "Layanan BPJS Kesehatan", description: "Pendaftaran, perubahan data, dan informasi BPJS Kesehatan.", category: "BPJS", estimatedTime: "20 menit", requirements: ["KTP", "Kartu Keluarga"], available: true, code: "BPJ-001" },
    { id: "info-beacukai", icon: <Sailboat className="h-6 w-6" />, title: "Informasi Kepabeanan & Cukai", description: "Layanan konsultasi dan informasi terkait bea dan cukai.", category: "Bea Cukai", estimatedTime: "20 menit", requirements: ["KTP", "Dokumen Terkait"], available: true, code: "BC-001" },
    { id: "info-investasi", icon: <TrendingUp className="h-6 w-6" />, title: "Informasi Investasi", description: "Konsultasi peluang investasi dan kewajiban LKPM.", category: "Investasi", estimatedTime: "30 menit", requirements: ["KTP", "Profil Perusahaan (jika ada)"], available: true, code: "INV-001" },
    { id: "info-bprs", icon: <Wallet className="h-6 w-6" />, title: "Informasi Layanan BPRS", description: "Informasi produk dan layanan dari Bank BPRS.", category: "Perbankan", estimatedTime: "15 menit", requirements: ["KTP"], available: true, code: "BNK-001" },
    { id: "pospay", icon: <Mailbox className="h-6 w-6" />, title: "Layanan Kantor Pos", description: "Pembayaran (Pospay), pengiriman, dan pembelian materai.", category: "Lainnya", estimatedTime: "15 menit", requirements: ["KTP (jika perlu)"], available: true, code: "OTH-001" },
    { id: "taspen", icon: <User className="h-6 w-6" />, title: "Layanan Taspen", description: "Pelayanan klim, non-klim, dan otentikasi peserta pensiun.", category: "Lainnya", estimatedTime: "25 menit", requirements: ["Kartu Taspen", "KTP"], available: true, code: "OTH-002" },
    { id: "asabri", icon: <ShieldCheck className="h-6 w-6" />, title: "Layanan ASABRI", description: "Pemberian informasi untuk peserta ASABRI.", category: "Lainnya", estimatedTime: "20 menit", requirements: ["Kartu ASABRI", "KTP"], available: true, code: "OTH-003" },
    { id: "konsultasi-ahu", icon: <Gavel className="h-6 w-6" />, title: "Konsultasi AHU", description: "Layanan konsultasi Administrasi Hukum Umum (AHU).", category: "Lainnya", estimatedTime: "25 menit", requirements: ["KTP"], available: true, code: "OTH-004" },
  ];

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const serviceExists = allServices.find((s) => s.id === serviceParam);
      if (serviceExists && serviceExists.available) {
        setFormData((prev) => ({ ...prev, layanan: serviceParam }));
        setCurrentStep(2); // Langsung ke langkah 2 jika layanan sudah dipilih
      }
    }
  }, [searchParams]);

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  ];

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking data:", formData);
    setCurrentStep(4); // Lanjut ke halaman sukses
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {formData.layanan && searchParams.get("service") && (
          <div className="text-center mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <h2 className="text-lg font-semibold text-green-800 mb-1">
                {allServices.find((s) => s.id === formData.layanan)?.title}
              </h2>
              <p className="text-sm text-green-600">
                Estimasi waktu:{" "}
                {allServices.find((s) => s.id === formData.layanan)?.estimatedTime}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-green-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-green-100 shadow-xl">
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Pilih Layanan
                </CardTitle>
                <CardDescription>
                  Pilih layanan yang ingin Anda akses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto pr-2 mb-6">
                  <div className="grid gap-4">
                    {allServices.map((service) => (
                      <div
                        key={service.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.layanan === service.id ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                        } ${!service.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => {
                          if (service.available) {
                            setFormData({ ...formData, layanan: service.id });
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{service.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Estimasi waktu: {service.estimatedTime}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-yellow-100 text-green-700">{service.category}</Badge>
                            <Badge className={service.available ? "bg-green-600 text-white" : ""}>{service.available ? "Tersedia" : "Tutup"}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={nextStep} disabled={!formData.layanan} className="bg-green-600 hover:bg-green-700">
                    Lanjutkan
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Pilih Jadwal
                </CardTitle>
                <CardDescription>Pilih tanggal dan waktu kunjungan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="tanggal">Tanggal Kunjungan</Label>
                    <Input id="tanggal" type="date" value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} className="border-green-200 focus:border-green-500" min={new Date().toISOString().split("T")[0]} required />
                  </div>
                  <div>
                    <Label htmlFor="waktu">Waktu Kunjungan</Label>
                    <Select value={formData.waktu} onValueChange={(value) => setFormData({ ...formData, waktu: value })}>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Pilih waktu" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="focus:bg-green-100 focus:text-green-800">{time} WIB</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-yellow-800">Informasi Penting</h4>
                            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                                <li>• Harap datang 15 menit sebelum waktu yang dipilih</li>
                                <li>• Bawa dokumen asli dan fotokopi yang diperlukan</li>
                                <li>• Batalkan booking jika tidak bisa hadir</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevStep} className="border-green-600 text-green-600">Kembali</Button>
                  <Button onClick={nextStep} disabled={!formData.tanggal || !formData.waktu} className="bg-green-600 hover:bg-green-700">Lanjutkan</Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  Data Pemohon
                </CardTitle>
                <CardDescription>Lengkapi data diri untuk booking antrian</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nama">Nama Lengkap</Label>
                      <Input id="nama" type="text" placeholder="Masukkan nama lengkap" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="border-green-200 focus:border-green-500" required />
                    </div>
                    <div>
                      <Label htmlFor="nik">NIK</Label>
                      <Input id="nik" type="text" placeholder="Nomor Induk Kependudukan" value={formData.nik} onChange={(e) => setFormData({ ...formData, nik: e.target.value })} className="border-green-200 focus:border-green-500" maxLength={16} required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telepon">Nomor Telepon</Label>
                      <Input id="telepon" type="tel" placeholder="08xxxxxxxxxx" value={formData.telepon} onChange={(e) => setFormData({ ...formData, telepon: e.target.value })} className="border-green-200 focus:border-green-500" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-green-200 focus:border-green-500" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="keperluan">Keperluan (Opsional)</Label>
                    <Textarea id="keperluan" placeholder="Jelaskan keperluan atau informasi tambahan" value={formData.keperluan} onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })} className="border-green-200 focus:border-green-500" rows={3} />
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={prevStep} className="border-green-600 text-green-600">Kembali</Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700"><Calendar className="h-4 w-4 mr-2" />Buat Booking</Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {currentStep === 4 && (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Booking Berhasil!</CardTitle>
                <CardDescription>Antrian Anda telah berhasil dibuat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-green-800 mb-4">Detail Booking Anda:</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Kode Booking:</strong> MPP-2024-001234</p>
                    <p><strong>Layanan:</strong> {allServices.find((s) => s.id === formData.layanan)?.title}</p>
                    <p><strong>Tanggal:</strong> {formData.tanggal}</p>
                    <p><strong>Waktu:</strong> {formData.waktu} WIB</p>
                    <p><strong>Nama:</strong> {formData.nama}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-yellow-800 mb-2">Langkah Selanjutnya:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                    <li>Simpan kode booking Anda</li>
                    <li>Konfirmasi akan dikirim via email dan SMS</li>
                    <li>Datang 15 menit sebelum waktu booking</li>
                    <li>Bawa dokumen yang diperlukan</li>
                  </ul>
                </div>
                <div className="flex justify-center space-x-4">
                  <Link to="/">
                    <Button variant="outline" className="border-green-600 text-green-600">Kembali ke Beranda</Button>
                  </Link>
                  <Button className="bg-green-600 hover:bg-green-700">Download Tiket</Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
