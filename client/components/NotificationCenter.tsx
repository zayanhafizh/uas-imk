import { useState, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  AlertCircle,
  Info,
  CheckCircle,
  Calendar,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Jawaban Helpdesk #HLP-2024-001",
      message:
        "Untuk reset password, silakan klik 'Lupa Password' di halaman login, masukkan email terdaftar, lalu ikuti instruksi di email.",
      type: "success",
      timestamp: new Date("2024-03-20T14:30:00"),
      read: false,
    },
    {
      id: "2",
      title: "Pengingat Jadwal Antrian Anda",
      message:
        "Jangan lupa! Anda memiliki jadwal antrian untuk pengambilan KTP besok (21 Maret 2024) pukul 10:00 WIB di Loket 2. Nomor antrian: A025.",
      type: "warning",
      timestamp: new Date("2024-03-20T10:15:00"),
      read: false,
    },
    {
      id: "5",
      title: "Pemberitahuan Maintenance Sistem",
      message:
        "Maintenance rutin sistem akan dilakukan pada 25-26 Maret 2024 pukul 01.00-05.00 WIB. Layanan online akan terganggu sementara.",
      type: "warning",
      timestamp: new Date("2024-03-20T09:15:00"),
      read: true,
    },
    {
      id: "3",
      title: "Respon Helpdesk #HLP-2024-003",
      message:
        "Untuk melacak status permohonan, silakan datang ke loket informasi atau gunakan nomor antrian yang diberikan saat pendaftaran.",
      type: "success",
      timestamp: new Date("2024-03-19T16:45:00"),
      read: false,
    },
    {
      id: "4",
      title: "Pengumuman: Layanan Baru E-KTP Express",
      message:
        "MPP Bekasi meluncurkan layanan E-KTP Express dengan waktu penyelesaian hanya 2 jam. Info lebih lanjut di loket 1.",
      type: "info",
      timestamp: new Date("2024-03-19T09:00:00"),
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Function to add new notification (will be called from helpdesk)
  const addNotification = (
    newNotification: Omit<Notification, "id" | "timestamp" | "read">,
  ) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [notification, ...prev]);
  };

  // Make addNotification available globally for helpdesk form
  useEffect(() => {
    (window as any).addNotification = addNotification;
    return () => {
      delete (window as any).addNotification;
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <Wrench className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} hari lalu`;
    if (hours > 0) return `${hours} jam lalu`;
    if (minutes > 0) return `${minutes} menit lalu`;
    return "Baru saja";
  };

  // Simulate occasional new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications (lower frequency)
      if (Math.random() < 0.08) {
        // 8% chance every 30 seconds
        const sampleNotifications = [
          {
            title: "Reminder: Jadwal Antrian Besok",
            message:
              "Pengingat jadwal antrian Anda untuk perpanjangan SIM pada 22 Maret 2024 pukul 14:30 WIB di Loket 1. Nomor antrian: B047.",
            type: "warning" as const,
          },
          {
            title: "Pengumuman: Perpanjangan Jam Layanan",
            message:
              "Mulai 1 April 2024, jam layanan MPP Bekasi diperpanjang hingga pukul 17.00 WIB untuk melayani masyarakat lebih baik.",
            type: "info" as const,
          },
          {
            title: "Jawaban Helpdesk #HLP-2024-004",
            message:
              "Untuk jadwal antrian yang terlewat, silakan ambil nomor antrian baru atau hubungi petugas loket untuk bantuan.",
            type: "success" as const,
          },
        ];

        const randomNotification =
          sampleNotifications[
            Math.floor(Math.random() * sampleNotifications.length)
          ];
        addNotification(randomNotification);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 px-1 min-w-5 h-5 text-xs bg-destructive">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifikasi</CardTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs h-8 px-3"
                >
                  Tandai semua dibaca
                </Button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {unreadCount} notifikasi belum dibaca
              </p>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Tidak ada notifikasi</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                        !notification.read ? "bg-accent/30" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              className={`text-sm font-medium leading-tight ${
                                !notification.read ? "font-semibold" : ""
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 w-6 p-0 hover:bg-accent"
                                  title="Tandai sudah dibaca"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                title="Hapus notifikasi"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed pr-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {notifications.length > 0 && (
              <div className="p-3 border-t bg-muted/20 text-center">
                <Button variant="ghost" size="sm" className="text-xs h-8">
                  Lihat Semua Notifikasi
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
