import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable, DataTableColumn } from "@/components/Dashboard/DataTable";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Users, UserCheck, UserX, Plus, Search, Filter } from "lucide-react";

// Sample drivers data
const driversData = [
  {
    id: "252",
    name: "Garth Tonye Biaga Fog",
    email: "du4life@hotmail.fr", 
    phone: "+237693890763",
    username: "Tony",
    online: "Offline",
    validated: "Not Validated",
    dateCreated: "2025-09-02"
  },
  {
    id: "250",
    name: "nana Kesha",
    email: "ketchalbin@gmail.com",
    phone: "+237651375754", 
    username: "Kesha auto",
    online: "Offline",
    validated: "Not Validated", 
    dateCreated: "2025-08-26"
  },
  {
    id: "243",
    name: "Ndounmen Lucien William",
    email: "ndounmen@gmail.com",
    phone: "+237676222967",
    username: "Lucien", 
    online: "Offline",
    validated: "Not Validated",
    dateCreated: "2025-08-19"
  },
  {
    id: "223",
    name: "Chenwi",
    email: "chenwieddy@gmail.com", 
    phone: "+237679611727",
    username: "edna",
    online: "Offline",
    validated: "Validated",
    dateCreated: "2025-07-17"
  }
];

const driversColumns: DataTableColumn[] = [
  { key: "id", title: "ID", width: "60px" },
  { key: "name", title: "NAME", width: "200px" },
  { key: "email", title: "EMAIL", width: "220px" }, 
  { key: "phone", title: "PHONE", width: "140px" },
  { key: "username", title: "USERNAME", width: "120px" },
  { key: "online", title: "ONLINE", width: "100px" },
  { key: "validated", title: "VALIDATED", width: "120px" },
  { key: "dateCreated", title: "DATE CREATED", width: "120px" }
];

const Drivers = () => {
  const totalDrivers = driversData.length;
  const onlineDrivers = driversData.filter(d => d.online === "Online").length;
  const validatedDrivers = driversData.filter(d => d.validated === "Validated").length;
  const offlineDrivers = totalDrivers - onlineDrivers;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Drivers</h1>
            <p className="text-muted-foreground">Manage and monitor all registered drivers</p>
          </div>
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Drivers"
            value={totalDrivers}
            icon={<Users className="w-5 h-5" />}
            variant="blue"
          />
          <StatsCard
            title="Online Drivers" 
            value={onlineDrivers}
            icon={<UserCheck className="w-5 h-5" />}
            variant="green"
          />
          <StatsCard
            title="Offline Drivers"
            value={offlineDrivers} 
            icon={<UserX className="w-5 h-5" />}
            variant="orange"
          />
          <StatsCard
            title="Validated Drivers"
            value={validatedDrivers}
            icon={<Car className="w-5 h-5" />}
            variant="purple"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter By</span>
          </div>
          
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search drivers..." className="pl-9" />
            </div>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Online Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Validated" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="not-validated">Not Validated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              Reset Filter
            </Button>
          </div>
        </div>

        {/* Drivers Table */}
        <DataTable
          title={`Drivers (${totalDrivers})`}
          columns={driversColumns}
          data={driversData}
        />
      </div>
    </AdminLayout>
  );
};

export default Drivers;