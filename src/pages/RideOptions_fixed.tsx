import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users, 
  Car, 
  DollarSign,
  Clock,
  MapPin,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  UserPlus,
  UserMinus,
  Settings,
  TrendingUp,
  Activity
} from "lucide-react";
import { useRideOptions, useCreateRideOption, useUpdateRideOption, useDeleteRideOption, useAssignDriver, useUnassignDriver } from "@/hooks/useRideOptions";
import { useDrivers } from "@/hooks/useDrivers";
import { useState } from "react";
import { format } from "date-fns";

const RideOptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRideOption, setSelectedRideOption] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    ride_class_id: 1,
    base_price: 0,
    price_per_km: 0,
    seat_capacity: 4,
    description: '',
  });

  // API hooks
  const { data: rideOptionsResponse, isLoading, error, refetch } = useRideOptions('en');
  const { data: driversResponse } = useDrivers();
  const createRideOption = useCreateRideOption();
  const updateRideOption = useUpdateRideOption();
  const deleteRideOption = useDeleteRideOption();
  const assignDriver = useAssignDriver();
  const unassignDriver = useUnassignDriver();

  const rideOptions = rideOptionsResponse?.data || [];
  const drivers = driversResponse?.drivers || [];

  // Filter ride options based on search term
  const filteredRideOptions = rideOptions.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.ride_class?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRideOption = async () => {
    try {
      await createRideOption.mutateAsync(formData);
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error creating ride option:', error);
    }
  };

  const handleUpdateRideOption = async () => {
    if (!selectedRideOption) return;
    
    try {
      await updateRideOption.mutateAsync({
        id: selectedRideOption.id,
        data: formData
      });
      setIsEditDialogOpen(false);
      setSelectedRideOption(null);
      resetForm();
    } catch (error) {
      console.error('Error updating ride option:', error);
    }
  };

  const handleDeleteRideOption = async (id: number) => {
    if (confirm('Are you sure you want to delete this ride option?')) {
      try {
        await deleteRideOption.mutateAsync({ id });
      } catch (error) {
        console.error('Error deleting ride option:', error);
      }
    }
  };

  const handleAssignDriver = async () => {
    if (!selectedRideOption || !selectedDriver) return;
    
    try {
      await assignDriver.mutateAsync({
        ride_option_id: selectedRideOption.id,
        driver_id: selectedDriver
      });
      setIsAssignDialogOpen(false);
      setSelectedDriver(null);
    } catch (error) {
      console.error('Error assigning driver:', error);
    }
  };

  const handleUnassignDriver = async (rideOptionId: number, driverId: number) => {
    try {
      await unassignDriver.mutateAsync({
        ride_option_id: rideOptionId,
        driver_id: driverId
      });
    } catch (error) {
      console.error('Error unassigning driver:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      ride_class_id: 1,
      base_price: 0,
      price_per_km: 0,
      seat_capacity: 4,
      description: '',
    });
  };

  const openEditDialog = (rideOption: any) => {
    setSelectedRideOption(rideOption);
    setFormData({
      name: rideOption.name,
      ride_class_id: rideOption.ride_class_id,
      base_price: rideOption.base_price,
      price_per_km: rideOption.price_per_km,
      seat_capacity: rideOption.seat_capacity,
      description: rideOption.description || '',
    });
    setIsEditDialogOpen(true);
  };

  const openAssignDialog = (rideOption: any) => {
    setSelectedRideOption(rideOption);
    setIsAssignDialogOpen(true);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-large">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Loading Ride Options</h3>
                <p className="text-muted-foreground">Please wait while we fetch your ride configuration data...</p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
          <div className="space-y-8 p-6">
            {/* Enhanced Header */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-large">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      Ride Options
                    </h1>
                    <p className="text-muted-foreground text-lg">Manage ride options and driver assignments</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Error State */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
              <div className="relative">
                <Card className="border-destructive/50 bg-destructive/5/80 backdrop-blur-sm shadow-large">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-destructive text-lg">Failed to Load Ride Options</h3>
                        <p className="text-sm text-muted-foreground">
                          {error?.message || "Unable to load ride options data"}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => refetch()}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 transition-all duration-300"
                      >
                        Retry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="space-y-8 p-6">
          {/* Enhanced Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-large">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        Ride Options
                      </h1>
                      <p className="text-muted-foreground text-lg">Manage ride options and driver assignments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-success-light rounded-full">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-success font-medium">{rideOptions.length} Options Available</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => refetch()}
                    className="hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300 hover:scale-105">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Ride Option
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
                      <DialogHeader className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                            <Plus className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <DialogTitle className="text-xl font-bold">Create New Ride Option</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                              Add a new ride option to the platform with pricing and capacity details.
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>
                      <div className="grid gap-6 py-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name" className="text-sm font-semibold text-foreground">Ride Option Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., H-Cab Premium"
                            className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="ride_class_id" className="text-sm font-semibold text-foreground">Ride Class</Label>
                          <Select value={formData.ride_class_id.toString()} onValueChange={(value) => setFormData({ ...formData, ride_class_id: parseInt(value) })}>
                            <SelectTrigger className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20">
                              <SelectValue placeholder="Select ride class" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/20">
                              <SelectItem value="1">Premium</SelectItem>
                              <SelectItem value="2">Economy</SelectItem>
                              <SelectItem value="3">Standard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="base_price" className="text-sm font-semibold text-foreground">Base Price (XAF)</Label>
                            <Input
                              id="base_price"
                              type="number"
                              value={formData.base_price}
                              onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                              placeholder="3000"
                              className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="price_per_km" className="text-sm font-semibold text-foreground">Price per KM (XAF)</Label>
                            <Input
                              id="price_per_km"
                              type="number"
                              value={formData.price_per_km}
                              onChange={(e) => setFormData({ ...formData, price_per_km: parseFloat(e.target.value) || 0 })}
                              placeholder="250"
                              className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                            />
                          </div>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="seat_capacity" className="text-sm font-semibold text-foreground">Seat Capacity</Label>
                          <Input
                            id="seat_capacity"
                            type="number"
                            value={formData.seat_capacity}
                            onChange={(e) => setFormData({ ...formData, seat_capacity: parseInt(e.target.value) || 4 })}
                            placeholder="4"
                            className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description" className="text-sm font-semibold text-foreground">Description</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe this ride option..."
                            className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                      <DialogFooter className="gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsCreateDialogOpen(false)}
                          className="hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleCreateRideOption} 
                          disabled={createRideOption.isPending}
                          className="bg-gradient-primary hover:shadow-medium transition-all duration-300 hover:scale-105"
                        >
                          {createRideOption.isPending ? 'Creating...' : 'Create Ride Option'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Overview</h2>
                <p className="text-muted-foreground">Key metrics for your ride options</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: '0ms' }}>
                  <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3 flex-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Options</p>
                          <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">{rideOptions.length}</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium text-muted-foreground">Available ride types</p>
                          </div>
                        </div>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-large group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
                          <Car className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: '100ms' }}>
                  <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3 flex-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Avg Base Price</p>
                          <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                            XAF {rideOptions.length > 0 
                              ? Math.round(rideOptions.reduce((sum, option) => sum + option.base_price, 0) / rideOptions.length).toLocaleString()
                              : 0
                            }
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium text-muted-foreground">Average starting price</p>
                          </div>
                        </div>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-large group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white">
                          <DollarSign className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: '200ms' }}>
                  <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3 flex-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Capacity</p>
                          <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                            {rideOptions.reduce((sum, option) => sum + option.seat_capacity, 0)}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium text-muted-foreground">Total passenger seats</p>
                          </div>
                        </div>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-large group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white">
                          <Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: '300ms' }}>
                  <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3 flex-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Options</p>
                          <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">{rideOptions.length}</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium text-muted-foreground">Currently available</p>
                          </div>
                        </div>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-large group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
                          <Activity className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Search & Filter</h2>
                <p className="text-muted-foreground">Find and manage your ride options</p>
              </div>
              
              <Card className="shadow-large bg-white/80 backdrop-blur-sm border border-white/20 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search ride options..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                      />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{filteredRideOptions.length} of {rideOptions.length} options</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Ride Options Table */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Ride Options</h2>
                <p className="text-muted-foreground">Manage and configure your ride service options</p>
              </div>
              
              <Card className="shadow-large bg-white/80 backdrop-blur-sm border border-white/20 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-medium">
                        <Car className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">Ride Options</CardTitle>
                        <p className="text-sm text-muted-foreground font-normal">
                          {filteredRideOptions.length} {filteredRideOptions.length === 1 ? 'option' : 'options'} available
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-slate-50/50 via-transparent to-slate-50/50 border-b border-white/20">
                          <TableHead className="font-semibold text-foreground py-4 px-6">Name</TableHead>
                          <TableHead className="font-semibold text-foreground py-4 px-6">Class</TableHead>
                          <TableHead className="font-semibold text-foreground py-4 px-6">Base Price</TableHead>
                          <TableHead className="font-semibold text-foreground py-4 px-6">Price/KM</TableHead>
                          <TableHead className="font-semibold text-foreground py-4 px-6">Seats</TableHead>
                          <TableHead className="font-semibold text-foreground py-4 px-6">Created</TableHead>
                          <TableHead className="w-[100px] py-4 px-6">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRideOptions.map((option, index) => (
                          <TableRow 
                            key={option.id} 
                            className="hover:bg-gradient-to-r hover:from-primary/5 hover:via-transparent hover:to-primary/5 transition-all duration-300 border-b border-white/10"
                          >
                            <TableCell className="py-4 px-6">
                              <div className="space-y-1">
                                <p className="font-semibold text-foreground">{option.name}</p>
                                {option.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">{option.description}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge 
                                variant="outline" 
                                className="bg-primary-light text-primary border-primary/20 font-medium"
                              >
                                {option.ride_class?.name || 'Unknown'}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <DollarSign className="w-3 h-3 text-green-600" />
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-muted-foreground">XAF</span>
                                  <p className="font-semibold text-foreground">{option.base_price.toLocaleString()}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                  <MapPin className="w-3 h-3 text-blue-600" />
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-muted-foreground">XAF</span>
                                  <p className="font-semibold text-foreground">{option.price_per_km}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Users className="w-3 h-3 text-purple-600" />
                                </div>
                                <span className="font-semibold text-foreground">{option.seat_capacity}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                                  <Clock className="w-3 h-3 text-orange-600" />
                                </div>
                                <span className="text-sm font-medium text-foreground">
                                  {format(new Date(option.created_at), 'MMM dd, yyyy')}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border border-white/20">
                                  <DropdownMenuItem 
                                    onClick={() => openEditDialog(option)}
                                    className="hover:bg-primary/10"
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => openAssignDialog(option)}
                                    className="hover:bg-primary/10"
                                  >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Assign Driver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteRideOption(option.id)}
                                    className="text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
              <DialogHeader className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                    <Edit className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">Edit Ride Option</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Update the ride option details and configuration.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="grid gap-3">
                  <Label htmlFor="edit-name" className="text-sm font-semibold text-foreground">Ride Option Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., H-Cab Premium"
                    className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="edit-ride_class_id" className="text-sm font-semibold text-foreground">Ride Class</Label>
                  <Select value={formData.ride_class_id.toString()} onValueChange={(value) => setFormData({ ...formData, ride_class_id: parseInt(value) })}>
                    <SelectTrigger className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20">
                      <SelectValue placeholder="Select ride class" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/20">
                      <SelectItem value="1">Premium</SelectItem>
                      <SelectItem value="2">Economy</SelectItem>
                      <SelectItem value="3">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="edit-base_price" className="text-sm font-semibold text-foreground">Base Price (XAF)</Label>
                    <Input
                      id="edit-base_price"
                      type="number"
                      value={formData.base_price}
                      onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                      placeholder="3000"
                      className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="edit-price_per_km" className="text-sm font-semibold text-foreground">Price per KM (XAF)</Label>
                    <Input
                      id="edit-price_per_km"
                      type="number"
                      value={formData.price_per_km}
                      onChange={(e) => setFormData({ ...formData, price_per_km: parseFloat(e.target.value) || 0 })}
                      placeholder="250"
                      className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="edit-seat_capacity" className="text-sm font-semibold text-foreground">Seat Capacity</Label>
                  <Input
                    id="edit-seat_capacity"
                    type="number"
                    value={formData.seat_capacity}
                    onChange={(e) => setFormData({ ...formData, seat_capacity: parseInt(e.target.value) || 4 })}
                    placeholder="4"
                    className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="edit-description" className="text-sm font-semibold text-foreground">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe this ride option..."
                    className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                  />
                </div>
              </div>
              <DialogFooter className="gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateRideOption} 
                  disabled={updateRideOption.isPending}
                  className="bg-gradient-primary hover:shadow-medium transition-all duration-300 hover:scale-105"
                >
                  {updateRideOption.isPending ? 'Updating...' : 'Update Ride Option'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Enhanced Assign Driver Dialog */}
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
              <DialogHeader className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">Assign Driver</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Assign a driver to <span className="font-semibold text-foreground">{selectedRideOption?.name}</span>.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="grid gap-3">
                  <Label htmlFor="driver-select" className="text-sm font-semibold text-foreground">Select Driver</Label>
                  <Select value={selectedDriver?.toString() || ''} onValueChange={(value) => setSelectedDriver(parseInt(value))}>
                    <SelectTrigger className="bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20">
                      <SelectValue placeholder="Choose a driver" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/20">
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary-light rounded-full flex items-center justify-center">
                              <Users className="w-3 h-3 text-primary" />
                            </div>
                            <span>{driver.name} ({driver.username})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedDriver && (
                  <div className="p-4 bg-primary-light/20 rounded-xl border border-primary/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Driver Selected</p>
                        <p className="text-sm text-muted-foreground">
                          {drivers.find(d => d.id === selectedDriver)?.name} will be assigned to {selectedRideOption?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAssignDialogOpen(false)}
                  className="hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAssignDriver} 
                  disabled={assignDriver.isPending || !selectedDriver}
                  className="bg-gradient-primary hover:shadow-medium transition-all duration-300 hover:scale-105"
                >
                  {assignDriver.isPending ? 'Assigning...' : 'Assign Driver'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RideOptions;
