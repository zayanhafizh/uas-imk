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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Users,
  FileText,
  Calendar,
  Search,
  Shield,
  Building,
  Home,
  Star,
  CheckCircle,
  BookUser,
  Banknote,
} from "lucide-react";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/layanan?search=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  const categories = [
    { name: "Kependudukan", count: 5, icon: <Users className="h-5 w-5" />, linkCategory: "Kependudukan" },
    { name: "Perizinan", count: 4, icon: <FileText className="h-5 w-5" />, linkCategory: "DPMPTSP" },
    { name: "Kepolisian", count: 2, icon: <Shield className="h-5 w-5" />, linkCategory: "Kepolisian" },
    { name: "Imigrasi", count: 2, icon: <BookUser className="h-5 w-5" />, linkCategory: "Imigrasi" },
    { name: "Pertanahan", count: 3, icon: <Home className="h-5 w-5" />, linkCategory: "BPN" },
    { name: "Pajak", count: 3, icon: <Banknote className="h-5 w-5" />, linkCategory: "Pajak & Retribusi" },
  ];
  
  const institutions = [
      { name: "Dinas Kependudukan & Catatan Sipil", abbr: "Dukcapil", services: "KTP, KK, Akta", category: "Kependudukan" },
      { name: "Dinas Penanaman Modal & PTSP", abbr: "DPMPTSP", services: "Izin Usaha, IMB", category: "DPMPTSP" },
      { name: "Polres Metro Bekasi Kota", abbr: "Polres", services: "SIM, SKCK", category: "Kepolisian" },
      { name: "Kantor Imigrasi", abbr: "Imigrasi", services: "Paspor", category: "Imigrasi" },
      { name: "Badan Pertanahan Nasional", abbr: "BPN", services: "Sertifikat", category: "BPN" },
      { name: "Badan Pendapatan Daerah", abbr: "Bapenda", services: "Pajak, PBB", category: "Pajak & Retribusi" },
      { name: "PDAM Tirta Patriot", abbr: "PDAM", services: "Tagihan Air", category: "PDAM" },
      { name: "Dinas Tenaga Kerja", abbr: "Disnaker", services: "Kartu Kuning", category: "Disnaker" },
      { name: "Pengadilan Negeri/Agama", abbr: "Pengadilan", services: "e-Court", category: "Pengadilan" },
      { name: "BPJS Kesehatan", abbr: "BPJS-KES", services: "Info & Daftar", category: "BPJS" },
      { name: "Kantor Pos", abbr: "POS", services: "Pospay", category: "Lainnya" },
      { name: "PT. Taspen", abbr: "Taspen", services: "Layanan Pensiun", category: "Lainnya" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center text-white py-24 lg:py-32"
        style={{ backgroundImage: "url('https://bekasiguide.com/wp-content/uploads/2025/04/WhatsApp-Image-2024-10-21-at-10.54.18-e1745386474842.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                KOTA PATRIOT
              </span>
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight my-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
                Mal Pelayanan Publik
                <span className="block text-yellow-300">Kota Bekasi</span>
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Melayani dengan sepenuh hati untuk masyarakat Kota Bekasi. Akses
                berbagai layanan publik dari puluhan instansi dalam satu lokasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="bg-yellow-400 text-green-900 hover:bg-yellow-300 font-semibold shadow-lg"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Daftar Antrian Online
                  </Button>
                </Link>
                <Link to="/layanan">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/20 text-white hover:bg-white/30 border-white backdrop-blur-sm"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Lihat Semua Layanan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Search Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Cari Layanan Cepat
              </h3>
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Contoh: KTP, SIM, Paspor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-green-500 text-gray-900 placeholder:text-gray-500"
                />
              </form>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/layanan?category=${encodeURIComponent(category.linkCategory)}`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-700 hover:text-green-700 hover:bg-green-50"
                    >
                      {category.icon}
                      <span className="ml-2">{category.name}</span>
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs bg-green-100 text-green-800"
                      >
                        {category.count}
                      </Badge>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutions Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Instansi Tergabung
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Puluhan instansi pemerintah dan BUMN/BUMD siap melayani Anda di Mal Pelayanan Publik Kota Bekasi.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {institutions.map((inst, index) => (
              <Link
                key={index}
                to={`/layanan?category=${encodeURIComponent(inst.category)}`}
              >
                <Card className="text-center hover:shadow-xl hover:-translate-y-1 transition-all border-gray-200 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Building className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-base">
                      {inst.abbr}
                    </h4>
                    <p className="text-xs text-gray-500 mb-3 flex-grow">{inst.name}</p>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-yellow-100 text-yellow-800 font-medium"
                    >
                      {inst.services}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-white" id="kontak">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Location */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Lokasi & Jam Operasional
              </h3>
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Bekasi Trade Center (BTC) Mall
                        </p>
                        <p className="text-gray-600">
                          Lantai 2, Jl. H.M. Joyo Martono
                        </p>
                        <p className="text-gray-600">
                          Bekasi Timur, Kota Bekasi
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Jam Operasional
                        </p>
                        <p className="text-gray-600">
                          Senin - Jumat: 08:00 - 16:00 WIB
                        </p>
                        <p className="text-gray-600">
                          Sabtu: 08:00 - 12:00 WIB
                        </p>
                        <p className="text-gray-600">Minggu: Tutup</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Hubungi Kami
              </h3>
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="space-y-4">
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
                    <Separator />
                    <div className="space-y-3">
                      <p className="font-medium text-gray-900">
                        Fasilitas Tersedia
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Ruang Laktasi
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Ruang Bermain Anak
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Ruang Baca
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Coffee Corner
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-yellow-400 p-2 rounded-lg">
                  <Building className="h-6 w-6 text-green-800" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">MPP Kota Bekasi</h4>
                  <p className="text-green-200 text-sm">Mal Pelayanan Publik</p>
                </div>
              </div>
              <p className="text-green-200 mb-4">
                Melayani masyarakat Kota Bekasi dengan layanan publik yang
                mudah, cepat, dan terpercaya dalam semangat Kota Patriot.
              </p>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">
                  Rating kepuasan: 4.8/5 dari 2,341 pengguna
                </span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Layanan Utama</h5>
              <ul className="space-y-2 text-green-200">
                <li><Link to="/layanan?category=Kependudukan" className="hover:text-white transition-colors">KTP Elektronik</Link></li>
                <li><Link to="/layanan?category=Catatan%20Sipil" className="hover:text-white transition-colors">Akta Kelahiran</Link></li>
                <li><Link to="/layanan?category=DPMPTSP" className="hover:text-white transition-colors">Izin Usaha</Link></li>
                <li><Link to="/layanan?category=Kepolisian" className="hover:text-white transition-colors">Perpanjangan SIM</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Menu</h5>
              <ul className="space-y-2 text-green-200">
                <li><Link to="/berita" className="hover:text-white transition-colors">Berita</Link></li>
                <li><Link to="/aduan" className="hover:text-white transition-colors">Layanan Aduan</Link></li>
                <li><Link to="/booking" className="hover:text-white transition-colors">Booking Antrian</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-green-700" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-200 text-sm">
              © 2024 Pemerintah Kota Bekasi. Seluruh hak cipta dilindungi
              undang-undang.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">Kebijakan Privasi</a>
              <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">Syarat Layanan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
