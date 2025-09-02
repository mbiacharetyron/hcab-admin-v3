import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable, DataTableColumn } from "@/components/Dashboard/DataTable";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCheck, UserX, Star, Plus, Search, Filter } from "lucide-react";

// Sample riders data  
const ridersData = [
  {
    id: "251",
    name: "Philip",
    email: "philipkoller8@gmail.com",
    phone: "+237654412619", 
    username: "k.paul",
    online: "Active",
    validated: "Validated",
    dateCreated: "2025-08-29"
  },
  {
    id: "249", 
    name: "Effim Ray",
    email: "andersoncurry45@gmail.com",
    phone: "+237671503233",
    username: "Effim@237",
    online: "Active", 
    validated: "Validated",
    dateCreated: "2025-08-26"
  },
  {
    id: "248",
    name: "lee",
    email: "leej79065@gmail.com",
    phone: "+38665700600",
    username: "jhon",
    online: "Active",
    validated: "Not Validated", 
    dateCreated: "2025-08-24"
  },
  {
    id: "247",
    name: "tester", 
    email: "tester@mail.com",
    phone: "+237694677916",
    username: "test",
    online: "Active",
    validated: "Validated",
    dateCreated: "2025-08-22"
  }
];

const ridersColumns: DataTableColumn[] = [
  { key: "id", title: "ID", width: "60px" },
  { key: "name", title: "NAME", width: "200px" },
  { key: "email", title: "EMAIL", width: "220px" },
  { key: "phone", title: "PHONE", width: "140px" }, 
  { key: "username", title: "USERNAME", width: "120px" },
  { key: "online", title: "ONLINE", width: "100px" },
  { key: "validated", title: "VALIDATED", width: "120px" },
  { key: "dateCreated", title: "DATE CREATED", width: "120px" }
];

const Riders = () => {
  const totalRiders = ridersData.length;
  const activeRiders = ridersData.filter(r => r.online === "Active").length;
  const validatedRiders = ridersData.filter(r => r.validated === "Validated").length;
  const inactiveRiders = totalRiders - activeRiders;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Riders</h1>
            <p className="text-muted-foreground">Manage and monitor all registered riders</p>
          </div>
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Add Rider
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Riders"
            value={totalRiders}
            icon={<Users className="w-5 h-5" />}
            variant="blue"
          />
          <StatsCard
            title="Active Riders"
            value={activeRiders}
            icon={<UserCheck className="w-5 h-5" />}
            variant="green"
          />
          <StatsCard
            title="Inactive Riders"
            value={inactiveRiders}
            icon={<UserX className="w-5 h-5" />}
            variant="orange"
          />
          <StatsCard
            title="Validated Riders" 
            value={validatedRiders}
            icon={<Star className="w-5 h-5" />}
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
              <Input placeholder="Search riders..." className="pl-9" />
            </div>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Active Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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

        {/* Riders Table */}
        <DataTable
          title={`Riders (${totalRiders})`}
          columns={ridersColumns}
          data={ridersData}
        />
      </div>
    </AdminLayout>
  );
};

export default Riders;