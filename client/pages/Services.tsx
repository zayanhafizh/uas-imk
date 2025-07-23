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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  Search,
  Clock,
  User,
  Baby,
  Car,
  CreditCard,
  Briefcase,
  Shield,
  FileText,
  Home,
  ChevronRight,
  Filter,
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

export default function Services() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Daftar Kategori yang diperbarui dan lebih lengkap
  const categories = [
    "Semua",
    "Kependudukan",
    "Catatan Sipil",
    "Kepolisian",
    "DPMPTSP", // Perizinan
    "BPN", // Pertanahan
    "Disnaker", // Ketenagakerjaan
    "Imigrasi",
    "Pajak & Retribusi",
    "PDAM",
    "Pengadilan",
    "BPJS",
    "Bea Cukai",
    "Investasi",
    "Perbankan",
    "Lainnya",
  ];
  
  // Daftar Layanan yang jauh lebih lengkap dan terstruktur
  const allServices = [
    // Kependudukan & Catatan Sipil
    { id: "ktp", icon: <User className="h-6 w-6" />, title: "KTP Elektronik", description: "Pembuatan baru, perpanjangan, dan penggantian KTP-EL.", category: "Kependudukan", estimatedTime: "30 menit", requirements: ["Surat Pengantar RT/RW", "Kartu Keluarga"], available: true, code: "DUK-001" },
    { id: "kk", icon: <Users className="h-6 w-6" />, title: "Kartu Keluarga", description: "Pembuatan baru dan perubahan data Kartu Keluarga.", category: "Kependudukan", estimatedTime: "45 menit", requirements: ["KTP Kepala Keluarga", "Buku Nikah"], available: true, code: "DUK-002" },
    { id: "akta-lahir", icon: <Baby className="h-6 w-6" />, title: "Akta Kelahiran", description: "Pencatatan kelahiran untuk WNI dan penerbitan akta.", category: "Catatan Sipil", estimatedTime: "45 menit", requirements: ["Surat Kelahiran RS", "KTP Orang Tua"], available: true, code: "SIP-001" },
    { id: "akta-mati", icon: <FileBadge className="h-6 w-6" />, title: "Akta Kematian", description: "Pencatatan kematian dan penerbitan akta kematian.", category: "Catatan Sipil", estimatedTime: "30 menit", requirements: ["Surat Kematian RS", "KTP Almarhum"], available: true, code: "SIP-002" },
    { id: "akta-lansia", icon: <User className="h-6 w-6" />, title: "Akta Kelahiran Lansia", description: "Penerbitan akta kelahiran bagi penduduk lanjut usia.", category: "Catatan Sipil", estimatedTime: "1 jam", requirements: ["KTP", "Kartu Keluarga", "Surat Ket. dari Kelurahan"], available: true, code: "SIP-003" },
    
    // Kepolisian
    { id: "sim", icon: <Car className="h-6 w-6" />, title: "Perpanjangan SIM A & C", description: "Perpanjangan Surat Izin Mengemudi A dan C.", category: "Kepolisian", estimatedTime: "1 jam", requirements: ["SIM Lama", "KTP", "Surat Sehat"], available: true, code: "POL-001" },
    { id: "skck", icon: <Shield className="h-6 w-6" />, title: "Perpanjangan SKCK", description: "Perpanjangan Surat Keterangan Catatan Kepolisian.", category: "Kepolisian", estimatedTime: "45 menit", requirements: ["SKCK Lama", "KTP", "Pas Foto 4x6"], available: true, code: "POL-002" },
    
    // Perizinan (DPMPTSP)
    { id: "izin-usaha", icon: <Building className="h-6 w-6" />, title: "Izin Usaha (OSS)", description: "Penerbitan Nomor Induk Berusaha (NIB) melalui sistem OSS.", category: "DPMPTSP", estimatedTime: "2 jam", requirements: ["KTP", "NPWP", "Akta Perusahaan"], available: true, code: "PZ-001" },
    { id: "imb", icon: <Home className="h-6 w-6" />, title: "Izin Mendirikan Bangunan", description: "Penerbitan IMB (sekarang PBG) untuk bangunan.", category: "DPMPTSP", estimatedTime: "2 minggu", requirements: ["Gambar Bangunan", "Sertifikat Tanah"], available: true, code: "PZ-002" },
    { id: "sip-nakes", icon: <HeartPulse className="h-6 w-6" />, title: "Izin Praktik Tenaga Kesehatan", description: "Penerbitan Surat Izin Praktik (SIP) untuk tenaga kesehatan.", category: "DPMPTSP", estimatedTime: "3 hari", requirements: ["STR", "Ijazah", "Surat Rekomendasi"], available: true, code: "PZ-003" },
    { id: "izin-reklame", icon: <FileText className="h-6 w-6" />, title: "Izin Reklame", description: "Pengurusan izin pemasangan reklame di wilayah kota.", category: "DPMPTSP", estimatedTime: "4 hari", requirements: ["Desain Reklame", "Titik Lokasi", "KTP"], available: true, code: "PZ-004" },

    // Pertanahan (BPN)
    { id: "sertifikat-tanah", icon: <FileText className="h-6 w-6" />, title: "Peningkatan Hak Sertifikat", description: "Peningkatan hak atas tanah (misal HGB ke SHM).", category: "BPN", estimatedTime: "1 minggu", requirements: ["Sertifikat Asli", "PBB Terakhir", "KTP"], available: true, code: "BPN-001" },
    { id: "roya", icon: <Stamp className="h-6 w-6" />, title: "Penghapusan Hak Tanggungan (Roya)", description: "Pencoretan hak tanggungan pada sertifikat tanah.", category: "BPN", estimatedTime: "5 hari", requirements: ["Sertifikat Asli", "Surat Roya dari Bank"], available: true, code: "BPN-002" },
    { id: "konsultasi-bpn", icon: <Landmark className="h-6 w-6" />, title: "Konsultasi Layanan BPN", description: "Layanan informasi dan konsultasi pertanahan.", category: "BPN", estimatedTime: "15 menit", requirements: ["KTP", "Dokumen Terkait (jika ada)"], available: true, code: "BPN-003" },

    // Ketenagakerjaan (Disnaker)
    { id: "kartu-ak1", icon: <Briefcase className="h-6 w-6" />, title: "Kartu Pencari Kerja (AK.1)", description: "Penerbitan dan perpanjangan Kartu Kuning.", category: "Disnaker", estimatedTime: "20 menit", requirements: ["KTP", "Ijazah Terakhir", "Pas Foto"], available: true, code: "DSN-001" },

    // Imigrasi
    { id: "paspor-baru", icon: <BookUser className="h-6 w-6" />, title: "Pembuatan Paspor Baru", description: "Layanan pembuatan paspor baru dan penggantian habis berlaku.", category: "Imigrasi", estimatedTime: "4 hari", requirements: ["KTP", "Kartu Keluarga", "Akta Lahir/Ijazah"], available: true, code: "IMG-001" },
    { id: "ambil-paspor", icon: <BookUser className="h-6 w-6" />, title: "Pengambilan Paspor", description: "Pengambilan paspor yang telah selesai diproses.", category: "Imigrasi", estimatedTime: "10 menit", requirements: ["Bukti Pembayaran", "KTP"], available: true, code: "IMG-002" },
    
    // Pajak & Retribusi
    { id: "pajak-kendaraan", icon: <Car className="h-6 w-6" />, title: "Pajak Kendaraan Tahunan", description: "Pembayaran pajak tahunan kendaraan bermotor (Samsat).", category: "Pajak & Retribusi", estimatedTime: "15 menit", requirements: ["STNK Asli", "KTP Asli"], available: true, code: "PAJ-001" },
    { id: "pbb", icon: <Banknote className="h-6 w-6" />, title: "Layanan PBB-P2", description: "Salinan, pembetulan, buka blokir, dan cetak tunggakan SPPT PBB.", category: "Pajak & Retribusi", estimatedTime: "30 menit", requirements: ["SPPT Terakhir", "KTP"], available: true, code: "PAJ-002" },
    { id: "konsultasi-pajak", icon: <Banknote className="h-6 w-6" />, title: "Konsultasi Pajak Daerah", description: "Informasi dan konsultasi seputar pajak daerah dan pusat.", category: "Pajak & Retribusi", estimatedTime: "20 menit", requirements: ["KTP"], available: true, code: "PAJ-003" },

    // PDAM
    { id: "pdam", icon: <CreditCard className="h-6 w-6" />, title: "Pembayaran Tagihan PDAM", description: "Pembayaran tagihan air PDAM Tirta Patriot.", category: "PDAM", estimatedTime: "10 menit", requirements: ["Nomor Pelanggan / Tagihan"], available: true, code: "PDM-001" },

    // Pengadilan
    { id: "konsultasi-hukum", icon: <Scale className="h-6 w-6" />, title: "Konsultasi Pengadilan", description: "Konsultasi e-Court, e-Raterang, dan layanan lainnya.", category: "Pengadilan", estimatedTime: "25 menit", requirements: ["KTP"], available: true, code: "PNG-001" },
    { id: "ecourt", icon: <Gavel className="h-6 w-6" />, title: "Pendaftaran Perkara (e-Court)", description: "Pendaftaran perkara gugatan dan permohonan secara elektronik.", category: "Pengadilan", estimatedTime: "40 menit", requirements: ["KTP", "Dokumen Perkara"], available: true, code: "PNG-002" },

    // BPJS
    { id: "bpjs-kesehatan", icon: <HeartPulse className="h-6 w-6" />, title: "Layanan BPJS Kesehatan", description: "Pendaftaran, perubahan data, dan informasi BPJS Kesehatan.", category: "BPJS", estimatedTime: "20 menit", requirements: ["KTP", "Kartu Keluarga"], available: true, code: "BPJ-001" },
    
    // Bea Cukai
    { id: "info-beacukai", icon: <Sailboat className="h-6 w-6" />, title: "Informasi Kepabeanan & Cukai", description: "Layanan konsultasi dan informasi terkait bea dan cukai.", category: "Bea Cukai", estimatedTime: "20 menit", requirements: ["KTP", "Dokumen Terkait"], available: true, code: "BC-001" },

    // Investasi
    { id: "info-investasi", icon: <TrendingUp className="h-6 w-6" />, title: "Informasi Investasi", description: "Konsultasi peluang investasi dan kewajiban LKPM.", category: "Investasi", estimatedTime: "30 menit", requirements: ["KTP", "Profil Perusahaan (jika ada)"], available: true, code: "INV-001" },
    
    // Perbankan
    { id: "info-bprs", icon: <Wallet className="h-6 w-6" />, title: "Informasi Layanan BPRS", description: "Informasi produk dan layanan dari Bank BPRS.", category: "Perbankan", estimatedTime: "15 menit", requirements: ["KTP"], available: true, code: "BNK-001" },

    // Lainnya
    { id: "pospay", icon: <Mailbox className="h-6 w-6" />, title: "Layanan Kantor Pos", description: "Pembayaran (Pospay), pengiriman, dan pembelian materai.", category: "Lainnya", estimatedTime: "15 menit", requirements: ["KTP (jika perlu)"], available: true, code: "OTH-001" },
    { id: "taspen", icon: <User className="h-6 w-6" />, title: "Layanan Taspen", description: "Pelayanan klim, non-klim, dan otentikasi peserta pensiun.", category: "Lainnya", estimatedTime: "25 menit", requirements: ["Kartu Taspen", "KTP"], available: true, code: "OTH-002" },
    { id: "asabri", icon: <ShieldCheck className="h-6 w-6" />, title: "Layanan ASABRI", description: "Pemberian informasi untuk peserta ASABRI.", category: "Lainnya", estimatedTime: "20 menit", requirements: ["Kartu ASABRI", "KTP"], available: true, code: "OTH-003" },
    { id: "konsultasi-ahu", icon: <Gavel className="h-6 w-6" />, title: "Konsultasi AHU", description: "Layanan konsultasi Administrasi Hukum Umum (AHU).", category: "Lainnya", estimatedTime: "25 menit", requirements: ["KTP"], available: true, code: "OTH-004" },
  ];

  useEffect(() => {
    // Logika untuk menangani parameter URL
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const institutionParam = searchParams.get("institution");

    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (institutionParam) {
      const institutionCategoryMap = {
        Dukcapil: "Kependudukan", DPMPTSP: "DPMPTSP", Polres: "Kepolisian",
        PDAM: "PDAM", Disnaker: "Disnaker", BPN: "BPN",
      };
      const category = institutionCategoryMap[institutionParam];
      if (category && categories.includes(category)) {
        setSelectedCategory(category);
      }
    }
  }, [searchParams]);

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Cari dari ${allServices.length} layanan...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48 border-green-200 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="focus:bg-green-100 focus:text-green-800">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Services Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredServices.length} dari {allServices.length}{" "}
            layanan
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="border-green-100 hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 rounded-lg ${
                        service.available ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <div
                        className={
                          service.available
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      >
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge
                        className={service.available ? "bg-green-600 text-white" : ""}
                      >
                        {service.available ? "Tersedia" : "Tutup"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {service.code}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg pt-2">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="bg-yellow-100 text-green-700 px-2 py-1 rounded text-xs">
                        {service.category}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.estimatedTime}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Persyaratan:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {service.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to={
                      service.available
                        ? `/booking?service=${service.id}`
                        : "#"
                    }
                    className="mt-4"
                  >
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={!service.available}
                    >
                      {service.available
                        ? "Daftar Antrian"
                        : "Tidak Tersedia"}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada layanan ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </CardContent>
          </Card>
        )}

        {/* Statistics Section */}
        <div className="mt-12 space-y-8">
          {/* Statistik Layanan */}
          <div className="bg-white rounded-lg border border-green-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Statistik Layanan
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {allServices.filter((s) => s.available).length}
                </div>
                <div className="text-sm text-gray-600">Layanan Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-gray-600">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">22</div>
                <div className="text-sm text-gray-600">Instansi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.8/5</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Statistik Pengunjung */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4 text-center">
              Statistik Pengunjung
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300 mb-1">
                  1,234
                </div>
                <div className="text-sm text-green-100">Hari Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300 mb-1">
                  8,567
                </div>
                <div className="text-sm text-green-100">Minggu Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300 mb-1">
                  32,891
                </div>
                <div className="text-sm text-green-100">Bulan Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300 mb-1">
                  456,789
                </div>
                <div className="text-sm text-green-100">Total</div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-green-100">
                Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}{" "}
                pukul{" "}
                {new Date().toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
