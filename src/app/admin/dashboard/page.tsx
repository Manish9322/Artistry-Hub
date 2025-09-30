
'use client';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Palette,
  Search,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useGetBookingsQuery } from '@/services/api';
import { useMemo } from 'react';

type Booking = {
  _id: string;
  customer: string;
  service: string;
  date: string;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Canceled';
  total: string;
  artPieceId?: string;
  email: string;
  phone?: string;
  notes?: string;
  bookingTime: string;
};


export default function Dashboard() {
  const { data: bookings = [], isLoading } = useGetBookingsQuery();

  const chartData = useMemo(() => {
    if (!bookings || bookings.length === 0) {
      return { salesData: [], revenueData: [], bookingsData: [] };
    }

    const monthlySales: { [key: string]: number } = {};
    const monthlyRevenue: { [key: string]: { revenue: number, expenses: number } } = {};
    const weeklyBookings: { [key: string]: { [key: string]: number } } = {};

    bookings.forEach((booking: Booking) => {
      const date = new Date(booking.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;
      const day = date.toLocaleString('default', { weekday: 'short' });

      // Aggregate sales
      monthlySales[monthYear] = (monthlySales[monthYear] || 0) + 1;
      
      // Aggregate Revenue
      const revenue = parseFloat(booking.total.replace('$', ''));
      if (!monthlyRevenue[monthYear]) {
        monthlyRevenue[monthYear] = { revenue: 0, expenses: 0 };
      }
      monthlyRevenue[monthYear].revenue += revenue;
      // Dummy expenses for chart
      monthlyRevenue[monthYear].expenses += revenue * 0.4;

      // Aggregate weekly bookings by service
      if (!weeklyBookings[day]) {
          weeklyBookings[day] = {};
      }
      weeklyBookings[day][booking.service] = (weeklyBookings[day][booking.service] || 0) + 1;
    });

    const sortedMonths = Object.keys(monthlySales).sort((a, b) => {
        const [aMonth, aYear] = a.split(' ');
        const [bMonth, bYear] = b.split(' ');
        return new Date(`${aMonth} 1, ${aYear}`).getTime() - new Date(`${bMonth} 1, ${bYear}`).getTime();
    }).slice(-6);

    const salesData = sortedMonths.map(month => ({ name: month.split(' ')[0], sales: monthlySales[month] }));
    const revenueData = sortedMonths.map(month => ({ month: month.split(' ')[0], revenue: monthlyRevenue[month].revenue, expenses: monthlyRevenue[month].expenses }));

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const bookingsData = daysOfWeek.map(day => ({
        day,
        Mehndi: weeklyBookings[day]?.['Mehndi'] || 0,
        Rangoli: weeklyBookings[day]?.['Rangoli'] || 0,
        'Nail Art': weeklyBookings[day]?.['Nail Art'] || 0,
    }));


    return { salesData, revenueData, bookingsData };
  }, [bookings]);

  const recentBookings = useMemo(() => {
    return bookings
      .slice()
      .sort((a: Booking, b: Booking) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [bookings]);

  const totalRevenue = useMemo(() => bookings.reduce((acc: number, b: Booking) => acc + parseFloat(b.total.replace('$', '')), 0), [bookings]);
  const newBookingsCount = useMemo(() => bookings.filter((b: Booking) => {
      const bookingDate = new Date(b.date);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return bookingDate > lastMonth;
  }).length, [bookings]);


  if (isLoading) {
      return <div>Loading dashboard...</div>
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Based on all bookings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Bookings
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newBookingsCount}</div>
            <p className="text-xs text-muted-foreground">
              in the last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{bookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Total number of bookings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{bookings.filter((b:Booking) => b.status === 'Confirmed').length}</div>
            <p className="text-xs text-muted-foreground">
              Confirmed bookings
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs. Expenses</CardTitle>
            <CardDescription>Monthly revenue and expenses overview.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={chartData.revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expenses" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Service</CardTitle>
            <CardDescription>Number of bookings per service for the current week.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={{}} className="h-[300px] w-full">
                  <BarChart accessibilityLayer data={chartData.bookingsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar dataKey="Mehndi" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Rangoli" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Nail Art" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              A chart showing sales over the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.salesData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                Recent bookings from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/bookings">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentBookings.map((booking: Booking) => (
                <div key={booking._id} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person portrait" />
                    <AvatarFallback>{booking.customer.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                    {booking.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                    {booking.email}
                    </p>
                </div>
                <div className="ml-auto font-medium">{booking.total}</div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
