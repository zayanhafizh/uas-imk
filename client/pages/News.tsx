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
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Building,
  Calendar,
  Clock,
  Search,
  Eye,
  ChevronRight,
  Newspaper,
  TrendingUp,
} from "lucide-react";

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");

  const newsData = [
    {
      id: 1,
      title: "Peluncuran Layanan Digital Baru MPP Kota Bekasi",
      excerpt:
        "MPP Kota Bekasi meluncurkan sistem antrian digital yang memudahkan masyarakat dalam mengakses layanan publik...",
      category: "Pengumuman",
      date: "2024-12-10",
      views: 1250,
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      featured: true,
    },
    {
      id: 2,
      title: "Jam Operasional Khusus Periode Libur Natal dan Tahun Baru",
      excerpt:
        "Pemberitahuan perubahan jam operasional MPP Kota Bekasi selama periode libur Natal dan Tahun Baru 2024...",
      category: "Informasi",
      date: "2024-12-08",
      views: 890,
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      featured: false,
    },
    {
      id: 3,
      title: "Peningkatan Fasilitas Ruang Tunggu MPP",
      excerpt:
        "MPP Kota Bekasi telah menyelesaikan renovasi ruang tunggu dengan fasilitas yang lebih nyaman untuk pengunjung...",
      category: "Berita",
      date: "2024-12-05",
      views: 567,
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      featured: false,
    },
    {
      id: 4,
      title: "Workshop Digitalisasi Layanan Publik",
      excerpt:
        "MPP Kota Bekasi mengadakan workshop untuk sosialisasi penggunaan layanan digital kepada masyarakat...",
      category: "Acara",
      date: "2024-12-03",
      views: 432,
      image:
        "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg",
      featured: false,
    },
    {
      id: 5,
      title: "Penghargaan Pelayanan Terbaik Tahun 2024",
      excerpt:
        "MPP Kota Bekasi meraih penghargaan sebagai mal pelayanan publik terbaik di Jawa Barat tahun 2024...",
      category: "Prestasi",
      date: "2024-11-28",
      views: 723,
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
      featured: false,
    },
    {
      id: 6,
      title: "Kerjasama Baru dengan Bank untuk Pembayaran Digital",
      excerpt:
        "MPP Kota Bekasi menjalin kerjasama dengan berbagai bank untuk memudahkan pembayaran layanan secara digital...",
      category: "Pengumuman",
      date: "2024-11-25",
      views: 654,
      image:
        "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg",
      featured: false,
    },
  ];

  const categories = [
    "Semua",
    "Pengumuman",
    "Informasi",
    "Berita",
    "Acara",
    "Prestasi",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredNews = newsData.filter((news) => {
    const matchesSearch = news.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = newsData.find((news) => news.featured);
  const regularNews = filteredNews.filter((news) => !news.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-green-600 text-green-600 hover:bg-green-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured News */}
        {featuredNews && selectedCategory === "Semua" && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Berita Utama</h2>
            </div>
            <Card className="border-green-100 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <Badge className="bg-green-600">
                      {featuredNews.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(featuredNews.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      {featuredNews.views.toLocaleString()}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {featuredNews.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Baca Selengkapnya
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* News Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {selectedCategory === "Semua" ? "Berita Terbaru" : selectedCategory}
          </h2>
          {regularNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((news) => (
                <Card
                  key={news.id}
                  className="border-green-100 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-green-700"
                      >
                        {news.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye className="h-3 w-3 mr-1" />
                        {news.views}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {news.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {news.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(news.date)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        Baca
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada berita ditemukan
                </h3>
                <p className="text-gray-500">
                  Coba ubah kata kunci pencarian atau filter kategori
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Load More */}
        {regularNews.length > 0 && (
          <div className="text-center">
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Muat Lebih Banyak
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
