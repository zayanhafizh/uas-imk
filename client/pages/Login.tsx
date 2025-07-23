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
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building, Eye, EyeOff, Shield } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />

      {/* Content */}
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <Card className="border-green-100 shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Masuk ke Akun
              </CardTitle>
              <CardDescription className="text-gray-600">
                Masuk untuk mengakses layanan dan riwayat antrian Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nik" className="text-sm font-medium">
                    NIK (Nomor Induk Kependudukan)
                  </Label>
                  <Input
                    id="nik"
                    type="text"
                    placeholder="3275xxxxxxxxxx"
                    value={formData.nik}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 16) {
                        setFormData({ ...formData, nik: value });
                      }
                    }}
                    className="border-green-200 focus:border-green-500"
                    maxLength={16}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    NIK sesuai KTP (16 digit angka)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password Anda"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="border-green-200 focus:border-green-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-green-300 text-green-600 focus:ring-green-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Ingat saya
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-500"
                  >
                    Lupa password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Masuk
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Belum memiliki akun?{" "}
                  <Link
                    to="/register"
                    className="text-green-600 hover:text-green-500 font-medium"
                  >
                    Daftar sekarang
                  </Link>
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">
                    Persyaratan Login
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• NIK harus terdaftar di sistem MPP</li>
                    <li>
                      • Gunakan password yang telah Anda buat saat registrasi
                    </li>
                    <li>• Pastikan data KTP Anda masih berlaku</li>
                    <li>• Hubungi admin jika lupa password</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
