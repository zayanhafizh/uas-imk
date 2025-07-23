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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    nomorTelepon: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateNIK = (nik: string) => {
    if (nik.length !== 16) return "NIK harus 16 digit";
    if (!/^\d+$/.test(nik)) return "NIK hanya boleh berisi angka";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.startsWith("08")) return "Nomor telepon harus dimulai dengan 08";
    if (phone.length < 10 || phone.length > 13)
      return "Nomor telepon tidak valid";
    if (!/^\d+$/.test(phone)) return "Nomor telepon hanya boleh berisi angka";
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password minimal 8 karakter";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password harus mengandung huruf besar, huruf kecil, dan angka";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate NIK
    const nikError = validateNIK(formData.nik);
    if (nikError) newErrors.nik = nikError;

    // Validate phone
    const phoneError = validatePhone(formData.nomorTelepon);
    if (phoneError) newErrors.nomorTelepon = phoneError;

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    // Validate terms
    if (!agreeTerms) {
      newErrors.terms = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle registration logic here
      console.log("Registration data:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />

      {/* Content */}
      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          <Card className="border-green-100 shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Buat Akun Baru
              </CardTitle>
              <CardDescription className="text-gray-600">
                Daftar untuk mengakses layanan dan booking antrian online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NIK */}
                <div className="space-y-2">
                  <Label htmlFor="nik" className="text-sm font-medium">
                    NIK (Nomor Induk Kependudukan) *
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
                        if (errors.nik) {
                          setErrors({ ...errors, nik: "" });
                        }
                      }
                    }}
                    className={`border-green-200 focus:border-green-500 ${errors.nik ? "border-red-500" : ""}`}
                    maxLength={16}
                    required
                  />
                  {errors.nik && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {errors.nik}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    NIK sesuai KTP (16 digit angka)
                  </p>
                </div>

                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <Label htmlFor="namaLengkap" className="text-sm font-medium">
                    Nama Lengkap *
                  </Label>
                  <Input
                    id="namaLengkap"
                    type="text"
                    placeholder="Sesuai KTP"
                    value={formData.namaLengkap}
                    onChange={(e) =>
                      setFormData({ ...formData, namaLengkap: e.target.value })
                    }
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>

                {/* Tempat & Tanggal Lahir */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tempatLahir"
                      className="text-sm font-medium"
                    >
                      Tempat Lahir *
                    </Label>
                    <Input
                      id="tempatLahir"
                      type="text"
                      placeholder="Bekasi"
                      value={formData.tempatLahir}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tempatLahir: e.target.value,
                        })
                      }
                      className="border-green-200 focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="tanggalLahir"
                      className="text-sm font-medium"
                    >
                      Tanggal Lahir *
                    </Label>
                    <Input
                      id="tanggalLahir"
                      type="date"
                      value={formData.tanggalLahir}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggalLahir: e.target.value,
                        })
                      }
                      className="border-green-200 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                {/* Jenis Kelamin */}
                <div className="space-y-2">
                  <Label htmlFor="jenisKelamin" className="text-sm font-medium">
                    Jenis Kelamin *
                  </Label>
                  <Select
                    value={formData.jenisKelamin}
                    onValueChange={(value) =>
                      setFormData({ ...formData, jenisKelamin: value })
                    }
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Alamat */}
                <div className="space-y-2">
                  <Label htmlFor="alamat" className="text-sm font-medium">
                    Alamat Lengkap *
                  </Label>
                  <Input
                    id="alamat"
                    type="text"
                    placeholder="Alamat sesuai KTP"
                    value={formData.alamat}
                    onChange={(e) =>
                      setFormData({ ...formData, alamat: e.target.value })
                    }
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>

                {/* Kontak */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="nomorTelepon"
                      className="text-sm font-medium"
                    >
                      Nomor Telepon *
                    </Label>
                    <Input
                      id="nomorTelepon"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={formData.nomorTelepon}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, nomorTelepon: value });
                        if (errors.nomorTelepon) {
                          setErrors({ ...errors, nomorTelepon: "" });
                        }
                      }}
                      className={`border-green-200 focus:border-green-500 ${errors.nomorTelepon ? "border-red-500" : ""}`}
                      required
                    />
                    {errors.nomorTelepon && (
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {errors.nomorTelepon}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
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

                {/* Password */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 8 karakter"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                          if (errors.password) {
                            setErrors({ ...errors, password: "" });
                          }
                        }}
                        className={`border-green-200 focus:border-green-500 pr-10 ${errors.password ? "border-red-500" : ""}`}
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
                    {errors.password && (
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Konfirmasi Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi password"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          });
                          if (errors.confirmPassword) {
                            setErrors({ ...errors, confirmPassword: "" });
                          }
                        }}
                        className={`border-green-200 focus:border-green-500 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => {
                        setAgreeTerms(checked as boolean);
                        if (errors.terms) {
                          setErrors({ ...errors, terms: "" });
                        }
                      }}
                      className="border-green-300"
                    />
                    <div className="text-sm">
                      <Label htmlFor="terms" className="text-gray-700">
                        Saya menyetujui{" "}
                        <Link
                          to="/terms"
                          className="text-green-600 hover:text-green-500 underline"
                        >
                          Syarat dan Ketentuan
                        </Link>{" "}
                        serta{" "}
                        <Link
                          to="/privacy"
                          className="text-green-600 hover:text-green-500 underline"
                        >
                          Kebijakan Privasi
                        </Link>{" "}
                        MPP Kota Bekasi
                      </Label>
                    </div>
                  </div>
                  {errors.terms && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {errors.terms}
                    </p>
                  )}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">
                        Persyaratan Pendaftaran
                      </h4>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>
                          • NIK harus sesuai dengan KTP yang masih berlaku
                        </li>
                        <li>• Nomor telepon harus aktif untuk verifikasi</li>
                        <li>• Data yang dimasukkan harus benar dan valid</li>
                        <li>
                          • Satu NIK hanya dapat digunakan untuk satu akun
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Daftar Sekarang
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sudah memiliki akun?{" "}
                  <Link
                    to="/login"
                    className="text-green-600 hover:text-green-500 font-medium"
                  >
                    Masuk sekarang
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
