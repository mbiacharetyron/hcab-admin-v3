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
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Loading ride options...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Ride Options</h1>
          </div>
          
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive">Failed to Load Ride Options</h3>
                  <p className="text-sm text-muted-foreground">
                    {error?.message || "Unable to load ride options data"}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => refetch()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ride Options</h1>
            <p className="text-muted-foreground">Manage ride options and driver assignments</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ride Option
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Ride Option</DialogTitle>
                  <DialogDescription>
                    Add a new ride option to the platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., H-Cab Premium"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ride_class_id">Ride Class</Label>
                    <Select value={formData.ride_class_id.toString()} onValueChange={(value) => setFormData({ ...formData, ride_class_id: parseInt(value) })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ride class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Premium</SelectItem>
                        <SelectItem value="2">Economy</SelectItem>
                        <SelectItem value="3">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="base_price">Base Price</Label>
                      <Input
                        id="base_price"
                        type="number"
                        value={formData.base_price}
                        onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                        placeholder="3000"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price_per_km">Price per KM</Label>
                      <Input
                        id="price_per_km"
                        type="number"
                        value={formData.price_per_km}
                        onChange={(e) => setFormData({ ...formData, price_per_km: parseFloat(e.target.value) || 0 })}
                        placeholder="250"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="seat_capacity">Seat Capacity</Label>
                    <Input
                      id="seat_capacity"
                      type="number"
                      value={formData.seat_capacity}
                      onChange={(e) => setFormData({ ...formData, seat_capacity: parseInt(e.target.value) || 4 })}
                      placeholder="4"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe this ride option..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRideOption} disabled={createRideOption.isPending}>
                    {createRideOption.isPending ? 'Creating...' : 'Create'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Options</p>
                  <p className="text-2xl font-bold">{rideOptions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Base Price</p>
                  <p className="text-2xl font-bold">
                    {rideOptions.length > 0 
                      ? Math.round(rideOptions.reduce((sum, option) => sum + option.base_price, 0) / rideOptions.length)
                      : 0
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                  <p className="text-2xl font-bold">
                    {rideOptions.reduce((sum, option) => sum + option.seat_capacity, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Options</p>
                  <p className="text-2xl font-bold">{rideOptions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search ride options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ride Options Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Ride Options ({filteredRideOptions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Price/KM</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRideOptions.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{option.name}</p>
                        {option.description && (
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{option.ride_class?.name || 'Unknown'}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {option.base_price.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {option.price_per_km}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {option.seat_capacity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(option.created_at), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(option)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAssignDialog(option)}>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Assign Driver
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteRideOption(option.id)}
                            className="text-destructive"
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
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Ride Option</DialogTitle>
              <DialogDescription>
                Update the ride option details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., H-Cab Premium"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-ride_class_id">Ride Class</Label>
                <Select value={formData.ride_class_id.toString()} onValueChange={(value) => setFormData({ ...formData, ride_class_id: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ride class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Premium</SelectItem>
                    <SelectItem value="2">Economy</SelectItem>
                    <SelectItem value="3">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-base_price">Base Price</Label>
                  <Input
                    id="edit-base_price"
                    type="number"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                    placeholder="3000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price_per_km">Price per KM</Label>
                  <Input
                    id="edit-price_per_km"
                    type="number"
                    value={formData.price_per_km}
                    onChange={(e) => setFormData({ ...formData, price_per_km: parseFloat(e.target.value) || 0 })}
                    placeholder="250"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-seat_capacity">Seat Capacity</Label>
                <Input
                  id="edit-seat_capacity"
                  type="number"
                  value={formData.seat_capacity}
                  onChange={(e) => setFormData({ ...formData, seat_capacity: parseInt(e.target.value) || 4 })}
                  placeholder="4"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this ride option..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRideOption} disabled={updateRideOption.isPending}>
                {updateRideOption.isPending ? 'Updating...' : 'Update'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assign Driver Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Driver</DialogTitle>
              <DialogDescription>
                Assign a driver to {selectedRideOption?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="driver-select">Select Driver</Label>
                <Select value={selectedDriver?.toString() || ''} onValueChange={(value) => setSelectedDriver(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id.toString()}>
                        {driver.name} ({driver.username})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAssignDriver} 
                disabled={assignDriver.isPending || !selectedDriver}
              >
                {assignDriver.isPending ? 'Assigning...' : 'Assign Driver'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default RideOptions;
